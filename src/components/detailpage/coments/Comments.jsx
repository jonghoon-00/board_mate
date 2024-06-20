import { addCommentData, deleteCommentData, getCommentData, updateCommentData } from '@/api/api.comment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { StContainer } from '../readPost/readPost.styled';
import {
  StButtonDiv,
  StCommentCard,
  StCommentContentDiv,
  StCommentFormSection,
  StCommentList,
  StCommentProfileImage,
  StCommentProfileSection,
  StCommentSaveButton,
  StTextArea
} from './comments.styled';

const Comments = ({ setCommentIsEdit, commentIsEdit, userInfo }) => {
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');
  const [newContent, setNewContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);

  const { id: postId } = useParams();

  //댓글 불러오기
  const {
    data: comments,
    isPending,
    isError
  } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getCommentData(postId)
  });

  //댓글작성
  const addMutation = useMutation({
    mutationFn: addCommentData,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
      setContent('');
    }
  });

  const addComment = (e) => {
    e.preventDefault();
    addMutation.mutate({
      post_id: postId,
      content,
      user_id: userInfo?.id,
      writer: userInfo?.nickname,
      image_url: userInfo?.image_url
    });
  };

  //댓글삭제
  const deleteMutation = useMutation({
    mutationFn: deleteCommentData,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId]);
    }
  });
  const deleteCommentHandler = (commentId) => {
    deleteMutation.mutate(commentId);
  };

  //댓글수정
  const updateMutation = useMutation({
    mutationFn: updateCommentData,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
    }
  });
  const updateCommentHandler = (comment) => {
    updateMutation.mutate({
      ...comment,
      content: newContent,
      writer: userInfo?.nickname,
      image_url: userInfo?.image_url
    });
    setEditingCommentId(null);
    setCommentIsEdit(false);
  };

  const nowEditHandler = (commentId) => {
    setEditingCommentId(commentId);
    setCommentIsEdit(true);
  };

  return (
    <>
      <StContainer>
        <StCommentFormSection onSubmit={addComment}>
          <p>{comments?.length}개의 댓글</p>
          <StTextArea
            type="text"
            placeholder="댓글을 입력해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <StCommentSaveButton type="submit">저장</StCommentSaveButton>
        </StCommentFormSection>
        <StCommentList>
          <ul>
            {comments?.map((comment) => {
              return (
                <StCommentCard key={comment.id}>
                  <StCommentProfileSection>
                    <StCommentProfileImage
                      src={comment.image_url === null ? '../../../assets/userProfile.png' : comment.image_url}
                      alt=""
                    />
                    <img src="../../" alt="" />
                    <div>
                      <p>{comment.writer}</p>
                      <p>{comment.created_at}</p>
                    </div>
                    <StButtonDiv $commentEditAuthority={comment.user_id === userInfo?.id}>
                      {/* TODO 버튼: 작성자 본인에게만 보여야함 */}
                      {commentIsEdit && editingCommentId === comment.id ? (
                        <button type="button" onClick={() => updateCommentHandler(comment)}>
                          완료
                        </button>
                      ) : (
                        <button type="button" onClick={() => nowEditHandler(comment.id)}>
                          수정
                        </button>
                      )}
                      {commentIsEdit ? (
                        <button type="button" onClick={() => setCommentIsEdit(false)}>
                          취소
                        </button>
                      ) : (
                        <button type="button" onClick={() => deleteCommentHandler(comment.id)}>
                          삭제
                        </button>
                      )}
                    </StButtonDiv>
                  </StCommentProfileSection>

                  <StCommentContentDiv>
                    {commentIsEdit && editingCommentId === comment.id ? (
                      <input
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder={comment.content}
                      />
                    ) : (
                      <p>{comment.content}</p>
                    )}
                  </StCommentContentDiv>
                </StCommentCard>
              );
            })}
          </ul>
        </StCommentList>
      </StContainer>
    </>
  );
};

export default Comments;
