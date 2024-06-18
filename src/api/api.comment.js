import supabase from '@/supabase/supabaseClient';

export const addCommentData = async (postId, comment, userId) => {
  const { error } = await supabase.from('comments').insert({
    post_id: postId,
    comment
    // TODO user_id: userId
  });
  if (error) {
    console.log(error);
  }
};

export const getCommentData = async () => {
  const { data, error } = await supabase.from('comments').select('*');
  if (error) {
    console.log(error);
  } else {
    console.log(data);
    return data;
  }
};
export const updateCommentData = async () => {
  // const {error} = await supabase.from("comments").
};
