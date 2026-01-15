import { getDemoDB, newId } from '@/demo/db';

export async function listPosts() {
  const db = await getDemoDB();
  const posts = await db.getAll('posts');
  return posts.sort((a, b) => b.createdAt - a.createdAt);
}

export async function getPost(id) {
  const db = await getDemoDB();
  return db.get('posts', id);
}

export async function createPost({ authorId, title, content }) {
  const db = await getDemoDB();
  const now = Date.now();

  const post = {
    id: newId(),
    authorId,
    title,
    content,
    createdAt: now,
    updatedAt: now
  };

  await db.put('posts', post);
  return post;
}

export async function updatePost({ id, actorId, title, content }) {
  const db = await getDemoDB();
  const prev = await db.get('posts', id);

  if (!prev) throw new Error('게시글이 존재하지 않습니다.');
  if (prev.authorId !== actorId) throw new Error('작성자만 수정할 수 있습니다.');

  const next = {
    ...prev,
    title,
    content,
    updatedAt: Date.now()
  };

  await db.put('posts', next);
  return next;
}

export async function deletePost({ id, actorId }) {
  const db = await getDemoDB();
  const prev = await db.get('posts', id);
  if (!prev) return;

  if (prev.authorId !== actorId) throw new Error('작성자만 삭제할 수 있습니다.');

  await db.delete('posts', id);

  // 해당 게시글의 댓글도 정리
  const tx = db.transaction('comments', 'readwrite');
  const store = tx.objectStore('comments');
  const idx = store.index('by-postId');

  let cursor = await idx.openCursor(id);
  while (cursor) {
    await cursor.delete();
    cursor = await cursor.continue();
  }

  await tx.done;
}
