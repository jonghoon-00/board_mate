import { postsRepo } from '@/repositories';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const QUERY_KEY = {
  posts: () => ['posts'],
  post: (id) => ['post', id]
};

export function usePosts() {
  return useQuery({
    queryKey: QUERY_KEY.posts(),
    queryFn: () => postsRepo.getPosts(),
    staleTime: Infinity, // IDB가 원천이면 무효화로 갱신하는 패턴이 깔끔합니다.
    refetchOnWindowFocus: false
  });
}

export function usePost(id) {
  return useQuery({
    queryKey: QUERY_KEY.post(id),
    queryFn: () => postsRepo.getPost(id),
    enabled: !!id,
    staleTime: Infinity,
    refetchOnWindowFocus: false
  });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: postsRepo.createPost,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: QUERY_KEY.posts() });
    }
  });
}

export function useUpdatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: postsRepo.updatePost,
    onSuccess: async (post) => {
      await qc.invalidateQueries({ queryKey: QUERY_KEY.posts() });
      await qc.invalidateQueries({ queryKey: QUERY_KEY.post(post.id) });
    }
  });
}

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: postsRepo.deletePost,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: QUERY_KEY.posts() });
    }
  });
}
