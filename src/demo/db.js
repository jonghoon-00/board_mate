import { openDB } from 'idb';

/**
 * v1: users/posts/comments store 생성
 * v2: users 스키마 기본값 보정(마이그레이션)
 * v3: posts 스키마 정규화(title/content/address/coordinate/createdAt/authorId)
 * v4: comments 인덱스(by-createdAt) 추가 + snake/camel 혼재 보정
 */
const DB_VERSION = 4;
const DB_NAME = 'boardmate-demo';

let dbPromise = null;

/**
 * getDemoDB()
 * - idb(openDB)를 통해 IndexedDB 연결(또는 생성)합니다.
 * - 같은 탭/세션에서 여러 번 호출해도, dbPromise를 재사용합니다(싱글톤).
 */
export function getDemoDB() {
  if (typeof window === 'undefined') {
    throw new Error('IndexedDB는 브라우저 환경에서만 사용할 수 있습니다.');
  }

  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      /**
       * upgrade(db, oldVersion, newVersion, transaction)
       * - DB_VERSION이 증가했을 때만 호출됩니다.
       * - 이 함수 안에서는 "버전 변경 트랜잭션(versionchange transaction)"이 열려 있고
       *   여기서 objectStore 생성/인덱스 생성/마이그레이션을 수행합니다.
       */
      async upgrade(db, oldVersion, newVersion, transaction) {
        // ---------------------------
        // 1) users store
        // ---------------------------
        if (!db.objectStoreNames.contains('users')) {
          const users = db.createObjectStore('users', { keyPath: 'id' });
          users.createIndex('by-nickname', 'nickname');
        }

        // ---------------------------
        // 2) posts store
        // ---------------------------
        if (!db.objectStoreNames.contains('posts')) {
          const posts = db.createObjectStore('posts', { keyPath: 'id' });
          posts.createIndex('by-authorId', 'authorId');
          posts.createIndex('by-createdAt', 'createdAt');
        } else {
          // 기존 store가 있는데 index가 없을 수도 있으니 보강
          const posts = transaction.objectStore('posts');
          if (!posts.indexNames.contains('by-authorId')) {
            posts.createIndex('by-authorId', 'authorId');
          }
          if (!posts.indexNames.contains('by-createdAt')) {
            posts.createIndex('by-createdAt', 'createdAt');
          }
        }

        // ---------------------------
        // 3) comments store (확장)
        // ---------------------------
        if (!db.objectStoreNames.contains('comments')) {
          const comments = db.createObjectStore('comments', { keyPath: 'id' });

          /**
           * 인덱스 설계
           * - 목록: "특정 게시글의 댓글"을 자주 조회 -> by-postId
           * - 권한/필터: 작성자 기반 -> by-authorId
           * - 정렬: createdAt 기준 정렬 -> by-createdAt
           *
           * 기존 코드에서 post_id / user_id / created_at을 쓰고 있으므로,
           * DB에는 camelCase + snake_case를 함께 저장해서 호환을 최대로 합니다.
           */
          comments.createIndex('by-postId', 'postId');
          comments.createIndex('by-authorId', 'authorId');
          comments.createIndex('by-createdAt', 'createdAt');
        } else {
          // 기존 comments store가 있다면 인덱스를 보강
          const comments = transaction.objectStore('comments');
          if (!comments.indexNames.contains('by-postId')) {
            comments.createIndex('by-postId', 'postId');
          }
          if (!comments.indexNames.contains('by-authorId')) {
            comments.createIndex('by-authorId', 'authorId');
          }
          if (!comments.indexNames.contains('by-createdAt')) {
            comments.createIndex('by-createdAt', 'createdAt');
          }
        }

        // ---------------------------
        // 4) Migration: oldVersion < 3 (posts 보정) - 기존 로직 유지
        // ---------------------------
        if (oldVersion < 3 && db.objectStoreNames.contains('posts')) {
          const store = transaction.objectStore('posts');

          let cursor = await store.openCursor();
          while (cursor) {
            const p = cursor.value;
            const nowIso = new Date().toISOString();

            const next = {
              ...p,

              id: p.id,
              title: p.title ?? '',
              content: p.content ?? '',
              address: p.address ?? '',
              image_url: p.image_url ?? null,
              is_recruit: typeof p.is_recruit === 'boolean' ? p.is_recruit : false,

              coordinate:
                p.coordinate && typeof p.coordinate === 'object'
                  ? { lat: Number(p.coordinate.lat), lng: Number(p.coordinate.lng) }
                  : { lat: 0, lng: 0 },

              createdAt: p.createdAt ?? p.created_at ?? nowIso,
              authorId: p.authorId ?? p.user_id ?? p.userId ?? null
            };

            await cursor.update(next);
            cursor = await cursor.continue();
          }
        }

        // ---------------------------
        // 5) Migration: oldVersion < 4 (comments 보정 추가)
        // ---------------------------
        if (oldVersion < 4 && db.objectStoreNames.contains('comments')) {
          const store = transaction.objectStore('comments');
          let cursor = await store.openCursor();

          while (cursor) {
            const c = cursor.value;
            const nowIso = new Date().toISOString();

            const postId = c.postId ?? c.post_id ?? null;
            const authorId = c.authorId ?? c.user_id ?? null;
            const createdAt = c.createdAt ?? c.created_at ?? nowIso;

            const next = {
              ...c,

              // canonical (내부 정규화)
              id: c.id,
              postId,
              authorId,
              createdAt,

              // legacy (UI/기존 로직 호환)
              post_id: c.post_id ?? postId,
              user_id: c.user_id ?? authorId,
              created_at: c.created_at ?? createdAt,

              // UI 표시용
              content: c.content ?? '',
              writer: c.writer ?? '',
              image_url: c.image_url ?? null,

              // 선택: 업데이트 추적(없던 필드라도 붙여도 무방)
              updated_at: c.updated_at ?? createdAt
            };

            await cursor.update(next);
            cursor = await cursor.continue();
          }
        }
      }
    });
  }

  return dbPromise;
}

/**
 * newId()
 * - crypto.randomUUID가 있으면 uuid를 사용
 * - 없으면 timestamp + random으로 대체(충돌 가능성은 낮지만 0은 아님)
 */
export function newId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
