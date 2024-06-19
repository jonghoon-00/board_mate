import supabase from '@/supabase/supabaseClient';

export const addCommentData = async (newComment) => {
  await supabase.from('comments').insert(newComment);
};

export const getCommentData = async (postId) => {
  const { data: comments, error } = await supabase
    .from('comments')
    .select('*')
    .order('created_at', { ascending: false })
    .eq('post_id', postId);
  if (error) {
    console.log(error);
  } else {
    return comments;
  }
};
export const updateCommentData = async (updateComment) => {
  const { error } = await supabase.from('comments').update(updateComment).eq('id', updateComment.id);
  if (error) {
    console.log(error);
  }
};

export const deleteCommentData = async (commentId) => {
  const { error } = await supabase.from('comments').delete().eq('id', commentId);
  if (error) {
    console.log(error);
  }
};
