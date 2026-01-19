// comments.jsx
import { addCommentData, deleteCommentData, getCommentData, updateCommentData } from '@/api/api.comment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  StButtonDiv,
  StCommentCard,
  StCommentContainer,
  StCommentContentDiv,
  StCommentFormSection,
  StCommentList,
  StCommentProfileImage,
  StCommentProfileSection,
  StCommentSaveButton,
  StCommentWriterInfoDiv,
  StTextArea
} from './comments.styled';

const Comments = ({ setCommentIsEdit, commentIsEdit, userInfo }) => {
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');
  const [newContent, setNewContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);

  const { id: postId } = useParams();

  const { data: comments } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getCommentData(postId)
  });

  const addMutation = useMutation({
    mutationFn: addCommentData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      setContent('');
    }
  });

  const addComment = (e) => {
    e.preventDefault();

    if (!userInfo) return alert('로그인 후 이용 가능합니다');
    if (!content.trim()) return alert('댓글을 입력해주세요.');

    addMutation.mutate({
      post_id: postId,
      content: content.trim(),
      user_id: userInfo.id,
      writer: userInfo.nickname,
      image_url: userInfo.image_url
    });
  };

  const onTextareaKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      // Ctrl+Enter(Windows/Linux) or Cmd+Enter(macOS)
      e.preventDefault();
      // submit 트리거
      e.currentTarget.form?.requestSubmit?.();
    }
  };

  const deleteMutation = useMutation({
    mutationFn: deleteCommentData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    }
  });

  const deleteCommentHandler = (commentId) => {
    if(confirm('댓글을 삭제하시겠습니까?')){
      deleteMutation.mutate(commentId);
    }
  };

  const updateMutation = useMutation({
    mutationFn: updateCommentData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    }
  });

  const updateCommentHandler = (comment) => {
    if (!userInfo) return alert('로그인 후 이용 가능합니다');

    const next = newContent.trim();
    if (!next) return alert('수정할 내용을 입력해주세요.');

    updateMutation.mutate({
      ...comment,
      content: next,
      writer: userInfo.nickname,
      image_url: userInfo.image_url
    });

    setEditingCommentId(null);
    setCommentIsEdit(false);
    setNewContent('');
  };

  const nowEditHandler = (comment) => {
    setEditingCommentId(comment.id);
    setCommentIsEdit(true);
    setNewContent(comment.content ?? '');
  };

  return (
    <StCommentContainer>
      <StCommentFormSection onSubmit={addComment}>
        <p>{comments ? comments.length : 0}개의 댓글</p>

        <StTextArea
          placeholder="댓글을 입력해주세요. (Ctrl/⌘+Enter로 저장)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={onTextareaKeyDown}
        />

        <StCommentSaveButton type="submit" disabled={addMutation.isPending}>
          {addMutation.isPending ? '저장 중...' : '저장'}
        </StCommentSaveButton>
      </StCommentFormSection>

      <StCommentList>
        <ul>
          {comments?.map((comment) => {
            const isOwner = comment.user_id === userInfo?.id;
            const isEditing = commentIsEdit && editingCommentId === comment.id;

            return (
              <StCommentCard key={comment.id}>
                <StCommentProfileSection>
                  <StCommentProfileImage
                    src={comment.image_url === null ? '../../../assets/userProfile.png' : comment.image_url}
                    alt=""
                  />

                  <StCommentWriterInfoDiv>
                    <p>{comment.writer}</p>
                    <p>{dayjs(comment.created_at).locale('ko').format('YYYY-MM-DD HH:mm')}</p>
                  </StCommentWriterInfoDiv>

                  <StButtonDiv $commentEditAuthority={isOwner}>
                    {isEditing ? (
                      <button
                        type="button"
                        onClick={() => updateCommentHandler(comment)}
                        disabled={updateMutation.isPending}
                      >
                        완료
                      </button>
                    ) : (
                      <button type="button" onClick={() => nowEditHandler(comment)} disabled={!isOwner}>
                        수정
                      </button>
                    )}

                    {commentIsEdit ? (
                      <button
                        type="button"
                        onClick={() => {
                          setCommentIsEdit(false);
                          setEditingCommentId(null);
                          setNewContent('');
                        }}
                      >
                        취소
                      </button>
                    ) : (
                      <button type="button" onClick={() => deleteCommentHandler(comment.id)} disabled={!isOwner}>
                        삭제
                      </button>
                    )}
                  </StButtonDiv>
                </StCommentProfileSection>

                <StCommentContentDiv>
                  {isEditing ? (
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
    </StCommentContainer>
  );
};

export default Comments;
