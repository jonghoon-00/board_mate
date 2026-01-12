import { openDB } from 'idb';

const DB_NAME = 'boardmate-demo';
const DB_VERSION = 2;

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
        }

        // comments
        if (!db.objectStoreNames.contains('comments')) {
          const comments = db.createObjectStore('comments', { keyPath: 'id' });
          comments.createIndex('by-postId', 'postId');
          comments.createIndex('by-authorId', 'authorId');
        }

        /**
         * 데이터 보정(마이그레이션)
         */
        if (oldVersion < 2) {
          // 업그레이드 트랜잭션 컨텍스트에서 접근
          const tx = db.transaction(['users'], 'readwrite');
          const store = tx.objectStore('users');

          let cursor = await store.openCursor();
          while (cursor) {
            const user = cursor.value;

            const next = {
              // 기존 값 유지
              ...user,

              // 스키마 기본값 보정
              id: user.id,
              nickname: user.nickname ?? '게스트',

              favorite: user.favorite,

              image_url: user.image_url ?? null
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
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
