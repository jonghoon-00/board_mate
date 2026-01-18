import { DEMO_MODE } from '@/config/demoMode';
import { getDemoDB, newId } from '@/demo/db';

/** supabase는 데모 모드에서 제거될 수도 있으니 동적 import */
let _supabase = null;
async function getSupabase() {
  if (_supabase) return _supabase;
  const mod = await import('@/supabase/supabaseClient');
  _supabase = mod.default;
  return _supabase;
}

/**
 * 댓글 데이터 정규화
 * - UI/기존 로직에서 쓰는 snake_case 유지
 * - IndexedDB 인덱싱/정렬을 위해 camelCase도 함께 저장
 */
function normalizeComment(input) {
  const nowIso = new Date().toISOString();

  const id = input.id ?? newId();
  const post_id = String(input.post_id ?? '');
  const user_id = String(input.user_id ?? '');

  const created_at = input.created_at ?? nowIso;

  return {
    // 기본키
    id,

    // 기존 호환 필드
    post_id,
    user_id,
    content: input.content ?? '',
    writer: input.writer ?? '',
    image_url: input.image_url ?? null,
    created_at,
    updated_at: input.updated_at ?? created_at,

    // 인덱스/정렬용 canonical 필드
    postId: input.postId ?? post_id,
    authorId: input.authorId ?? user_id,
    createdAt: input.createdAt ?? created_at
  };
}

export const addCommentData = async (newComment) => {
  if (!DEMO_MODE) {
    const supabase = await getSupabase();
    const { error } = await supabase.from('comments').insert(newComment);
    if (error) throw error;
    return;
  }

  // DEMO: IndexedDB에 저장
  const db = await getDemoDB();
  const comment = normalizeComment(newComment);
  await db.put('comments', comment);
};

export const getCommentData = async (postId) => {
  if (!DEMO_MODE) {
    const supabase = await getSupabase();
    const { data: comments, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: true })
      .eq('post_id', postId);

    if (error) throw error;
    return comments;
  }

  // DEMO: 인덱스(by-postId)로 조회 후 createdAt/created_at 기준 오름차순 정렬
  const db = await getDemoDB();

  // idb는 getAllFromIndex를 제공 -> index로 빠르게 조회 가능
  const comments = await db.getAllFromIndex('comments', 'by-postId', postId);

  comments.sort((a, b) => String(a.createdAt ?? a.created_at).localeCompare(String(b.createdAt ?? b.created_at)));
  return comments;
};

export const updateCommentData = async (updateComment) => {
  if (!DEMO_MODE) {
    const supabase = await getSupabase();
    const { error } = await supabase.from('comments').update(updateComment).eq('id', updateComment.id);
    if (error) throw error;
    return;
  }

  const db = await getDemoDB();
  const prev = await db.get('comments', updateComment.id);
  if (!prev) throw new Error('댓글이 존재하지 않습니다.');

  const nowIso = new Date().toISOString();

  // 기존 값 + 업데이트 덮어쓰기
  // 정렬/호환 필드 함께 갱신
  const next = normalizeComment({
    ...prev,
    ...updateComment,
    updated_at: nowIso,
    created_at: prev.created_at ?? prev.createdAt ?? nowIso
  });

  await db.put('comments', next);
};

export const deleteCommentData = async (commentId) => {
  if (!DEMO_MODE) {
    const supabase = await getSupabase();
    const { error } = await supabase.from('comments').delete().eq('id', commentId);
    if (error) throw error;
    return;
  }

  const db = await getDemoDB();
  await db.delete('comments', commentId);
};
