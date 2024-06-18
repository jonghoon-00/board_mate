import supabase from '@/supabase/supabaseClient';

export const addCommentData = async (newComment) => {
  const { error } = await supabase.from('comments').insert(newComment);
  if (error) {
    console.log(error);
  }
};

export const getCommentData = async () => {
  const { data, error } = await supabase.from('comments').select('*');
  if (error) {
    console.log(error);
  } else {
    return data;
  }
};
export const updateCommentData = async () => {
  // const {error} = await supabase.from("comments").
};
