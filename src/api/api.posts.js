import supabase from '@/supabase/supabaseClient';

export async function getPosts() {
  const { data: posts, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return posts;
}

export async function addPost(newPost) {
  await supabase.from('posts').insert(newPost).select();
}

export async function deletePost(postId) {
  await supabase.from('posts').delete().eq('id', postId);
}

export async function updatePost(updatePost) {
  await supabase.from('posts').update(updatePost).eq('id', updatePost.id);
}
