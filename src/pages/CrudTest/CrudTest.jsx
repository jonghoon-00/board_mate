import { addPost, deletePost, getPosts, updatePost } from '@/api/api.posts';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const CrudTest = () => {
  const queryClient = useQueryClient();
  const {
    data: posts,
    isPending,
    isError
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  });

  // add mutation 로직
  const addMutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    }
  });

  const addPostHandler = () => {
    // 실제 코드에서는 다 새로 받아와야함
    addMutation.mutate({
      id: uuidv4(),
      address: 'create test address',
      title: 'create test title',
      content: 'create test content',
      image_url: 'create test url',
      is_recruit: false,
      user_id: uuidv4()
    });
  };

  // delete mutation 로직
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    }
  });

  // delete 함수
  const deletePostHandler = (postId) => {
    deleteMutation.mutate(postId);
  };

  // update mutation 로직
  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    }
  });

  // update 함수
  const updatePostHandler = (post) => {
    updateMutation.mutate({
      ...post,
      content: '수정된 내용'
    });
  };

  return (
    <div>
      <h3>CRUD Test!!! 화이팅!!!</h3>
      <h4>READ</h4>
      {posts &&
        posts.map((post) => {
          return (
            <div style={{ border: '1px solid black' }} key={post.id}>
              <p>{post.title}</p>
              <p>{post.content}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  deletePostHandler(post.id);
                }}
              >
                삭제
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  updatePostHandler(post);
                }}
              >
                수정
              </button>
            </div>
          );
        })}

      <h4>CREATE</h4>
      <button onClick={addPostHandler}>추가 버튼</button>
    </div>
  );
};

export default CrudTest;
