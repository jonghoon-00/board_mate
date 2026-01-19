import { DEMO_MODE } from '@/config/demoMode';
import { getDemoDB, newId } from '@/demo/db';

/**
 * DEMO 모드가 아닐 때만 supabaseClient를 동적 로드합니다.
 */
let _supabase = null;
async function getSupabase() {
  if (_supabase) return _supabase;
  const mod = await import('@/supabase/supabaseClient');
  _supabase = mod.default;
  return _supabase;
}

/** ---------- Demo helpers ---------- */

const SESSION_KEY = 'bm_guest_session';

function getDemoSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function buildUsersMap(db) {
  const users = await db.getAll('users');
  const map = new Map();
  for (const u of users) map.set(u.id, u);
  return map;
}

function pickAuthorId(post) {
  return post.authorId ?? post.user_id ?? post.author_id ?? null;
}

function pickCreatedAt(post) {
  return post.createdAt ?? post.created_at ?? null;
}

function attachUser(post, usersMap) {
  const authorId = pickAuthorId(post);
  const createdAt = pickCreatedAt(post);

  const user = authorId ? usersMap.get(authorId) : null;

  return {
    ...post,

    authorId,
    createdAt,

    // 호환 alias (기존 UI에서 사용 가능)
    user_id: authorId,
    created_at: createdAt,

    // Supabase select(`*, users(image_url, nickname)`) 형태 흉내
    users: user
      ? { image_url: user.image_url ?? null, nickname: user.nickname ?? null }
      : { image_url: null, nickname: null }
  };
}

function normalizeNewPost(input) {
  const now = new Date().toISOString();
  const session = getDemoSession();

  const authorId = input.authorId ?? input.user_id ?? session?.userId ?? null;
  const createdAt = input.createdAt ?? input.created_at ?? now;

  // is_recruit : bool
  const isRecruit =
    typeof input.is_recruit === 'boolean'
      ? input.is_recruit
      : typeof input.isRecruit === 'boolean'
        ? input.isRecruit
        : Boolean(input.is_recruit ?? input.isRecruit ?? false);

  return {
    // 원본 보존
    ...input,

    id: input.id ?? newId(),
    authorId,
    createdAt,
    title: typeof input.title === 'string' ? input.title : input.title ?? '',
    address: typeof input.address === 'string' ? input.address : input.address ?? '',
    content: typeof input.content === 'string' ? input.content : input.content ?? '',
    image_url: input.image_url ?? null,
    is_recruit: isRecruit,

    user_id: authorId,
    created_at: createdAt
  };
}

function paginate(items, pageParam, ITEMS_PER_PAGE) {
  const page = Number(pageParam) || 1;
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = page * ITEMS_PER_PAGE;
  return items.slice(start, end);
}

// TODO : 이미지 URL이 단순 데이터 형식
// - 스토리지 등을 사용하지 않아 로드되지않음
function fileToDataURL(fileObj) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result); // dataURL string
    reader.onerror = () => reject(new Error('이미지 변환에 실패했습니다.'));
    reader.readAsDataURL(fileObj);
  });
}

function sortByCreatedAtDesc(a, b) {
  const A = pickCreatedAt(a) ?? '';
  const B = pickCreatedAt(b) ?? '';
  return String(B).localeCompare(String(A));
}

/** ---------- API: Posts ---------- */

export async function getPosts() {
  if (!DEMO_MODE) {
    const supabase = await getSupabase();
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`*, users(image_url, nickname)`)
      .order('created_at', { ascending: false });
    showingError(error);
    return posts;
  }

  const db = await getDemoDB();
  const usersMap = await buildUsersMap(db);

  const posts = await db.getAll('posts');
  posts.sort(sortByCreatedAtDesc);

  return posts.map((p) => attachUser(p, usersMap));
}

export async function getHomePosts(pageParam, ITEMS_PER_PAGE) {
  if (!DEMO_MODE) {
    const supabase = await getSupabase();

    const { data: posts, error } = await supabase
      .from('posts')
      .select(`*, users(image_url, nickname)`)
      .order('created_at', { ascending: false })
      .range((pageParam - 1) * ITEMS_PER_PAGE, pageParam * ITEMS_PER_PAGE - 1);

    showingError(error);

    const { data: allPosts, error: countError } = await supabase.from('posts').select('*');
    showingError(countError);

    return { posts, postsLength: allPosts.length };
  }

  const db = await getDemoDB();
  const usersMap = await buildUsersMap(db);

  const allPosts = await db.getAll('posts');
  allPosts.sort(sortByCreatedAtDesc);

  const postsLength = allPosts.length;
  const pagePosts = paginate(allPosts, pageParam, ITEMS_PER_PAGE).map((p) => attachUser(p, usersMap));

  return { posts: pagePosts, postsLength };
}

export async function getPost(postId) {
  if (!DEMO_MODE) {
    const supabase = await getSupabase();
    const { data: post, error } = await supabase
      .from('posts')
      .select(`*, users(image_url, nickname)`)
      .eq('id', postId)
      .single();
    showingError(error);
    return post;
  }

  const db = await getDemoDB();
  const post = await db.get('posts', postId);
  if (!post) return null;

  const usersMap = await buildUsersMap(db);
  return attachUser(post, usersMap);
}

export async function addPost(newPost) {
  if (!DEMO_MODE) {
    const supabase = await getSupabase();
    const { error } = await supabase.from('posts').insert(newPost).select();
    showingError(error);
    return;
  }

  const db = await getDemoDB();
  const post = normalizeNewPost(newPost);

  // authorId가 없으면 이후 마이페이지/권한 처리가 불가능
  if (!post.authorId) {
    throw new Error('작성자 정보(authorId)가 없습니다. 먼저 로그인(게스트 로그인) 후 작성해주세요.');
  }

  await db.put('posts', post);
}

export async function deletePost(postId) {
  if (!DEMO_MODE) {
    const supabase = await getSupabase();
    const { error } = await supabase.from('posts').delete().eq('id', postId);
    showingError(error);
    return;
  }

  const db = await getDemoDB();
  await db.delete('posts', postId);

  // 게시글 삭제 시 댓글도 정리
  const tx = db.transaction('comments', 'readwrite');
  const store = tx.objectStore('comments');
  const idx = store.index('by-postId');

  let cursor = await idx.openCursor(postId);
  while (cursor) {
    await cursor.delete();
    cursor = await cursor.continue();
  }

  await tx.done;
}

export async function updatePost(updatePost) {
  if (!DEMO_MODE) {
    const supabase = await getSupabase();
    const { error } = await supabase.from('posts').update(updatePost).eq('id', updatePost.id);
    showingError(error);
    return;
  }

  const db = await getDemoDB();
  const prev = await db.get('posts', updatePost.id);
  if (!prev) throw new Error('게시글이 존재하지 않습니다.');

  // 업데이트에서도 스키마 정규화
  const merged = { ...prev, ...updatePost };
  const next = normalizeNewPost(merged);

  await db.put('posts', next);
}

/**
 * Supabase storage 대체:
 * - 데모에서는 업로드 대신 브라우저에서 바로 렌더 가능한 dataURL을 반환합니다.
 * - 기존 코드가 `addImage(fileObj)` -> 반환값을 받아 image_url에 넣는 형태면,
 *   DEMO에서는 `result.url`을 넣으면 됩니다.
 */
export async function addImage(fileObj) {
  if (!DEMO_MODE) {
    const supabase = await getSupabase();
    const { data, error } = await supabase.storage.from('post_images').upload(`post_${Date.now()}.png`, fileObj);
    if (error) alert('업로드에 실패했습니다.');
    return data;
  }

  const dataUrl = await fileToDataURL(fileObj);

  return {
    path: `local/post_${Date.now()}.png`,
    fullPath: `local/post_${Date.now()}.png`,
    url: dataUrl,
    dataUrl
  };
}

/** 작은 유틸 (supabase 에러 처리) */
function showingError(error) {
  if (error) throw error;
}
