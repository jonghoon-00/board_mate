import { openDB } from 'idb';

const DB_NAME = 'boardmate-demo';
const DB_VERSION = 3;

let dbPromise = null;

export function getDemoDB() {
  if (typeof window === 'undefined') {
    throw new Error('IndexedDB는 브라우저 환경에서만 사용할 수 있습니다.');
  }

  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      async upgrade(db, oldVersion) {
        // users
        if (!db.objectStoreNames.contains('users')) {
          const users = db.createObjectStore('users', { keyPath: 'id' });
          users.createIndex('by-nickname', 'nickname');
        }

        // posts
        if (!db.objectStoreNames.contains('posts')) {
          const posts = db.createObjectStore('posts', { keyPath: 'id' });
          posts.createIndex('by-authorId', 'authorId');
          posts.createIndex('by-createdAt', 'createdAt');
        } else {
          // 기존 store가 있는데 index가 없을 수도 있으니 보강
          const posts = db.transaction.objectStore('posts');
          if (!posts.indexNames.contains('by-authorId')) {
            posts.createIndex('by-authorId', 'authorId');
          }
          if (!posts.indexNames.contains('by-createdAt')) {
            posts.createIndex('by-createdAt', 'createdAt');
          }
        }

        // comments
        if (!db.objectStoreNames.contains('comments')) {
          const comments = db.createObjectStore('comments', { keyPath: 'id' });
          comments.createIndex('by-postId', 'postId');
          comments.createIndex('by-authorId', 'authorId');
        }

        // --------- Migration: oldVersion < 3 ----------
        if (oldVersion < 3 && db.objectStoreNames.contains('posts')) {
          const tx = db.transaction(['posts'], 'readwrite');
          const store = tx.objectStore('posts');

          let cursor = await store.openCursor();
          while (cursor) {
            const p = cursor.value;
            const nowIso = new Date().toISOString();

            const next = {
              ...p,

              // canonical fields
              id: p.id,
              title: p.title ?? '',
              content: p.content ?? '',
              address: p.address ?? '',
              image_url: p.image_url ?? null,
              is_recruit: typeof p.is_recruit === 'boolean' ? p.is_recruit : false,

              // coordinate 보정: 없으면 기본값
              coordinate:
                p.coordinate && typeof p.coordinate === 'object'
                  ? {
                      lat: Number(p.coordinate.lat),
                      lng: Number(p.coordinate.lng)
                    }
                  : { lat: 0, lng: 0 },

              // createdAt 보정: snake_case 혼재 대응
              createdAt: p.createdAt ?? p.created_at ?? nowIso,

              // 작성자 보정: user_id 혼재 대응
              authorId: p.authorId ?? p.user_id ?? p.userId ?? null
            };

            await cursor.update(next);
            cursor = await cursor.continue();
          }

          await tx.done;
        }
      }
    });
  }

  return dbPromise;
}

export function newId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
