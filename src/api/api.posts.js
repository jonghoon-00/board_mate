import supabase from '@/supabase/supabaseClient';

export async function getPosts() {
  const { data: posts, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
  return posts;
}

export async function getHomePosts(pageParam, ITEMS_PER_PAGE) {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .range((pageParam - 1) * ITEMS_PER_PAGE, pageParam * ITEMS_PER_PAGE - 1);

  const { data: allPosts } = await supabase.from('posts').select('*');
  const postsLength = allPosts.length;
  return { posts, postsLength };
}

export async function addPost(newPost) {
  console.log(newPost);
  await supabase.from('posts').insert(newPost).select();
}

export async function deletePost(postId) {
  await supabase.from('posts').delete().eq('id', postId);
}

export async function updatePost(updatePost) {
  await supabase.from('posts').update(updatePost).eq('id', updatePost.id);
}

export async function addImage(fileObj) {
  const { data, error } = await supabase.storage.from('post_images').upload(`post_${Date.now()}.png`, fileObj);
  if (error) alert('업로드에 실패했습니다.');
  return data;
}
