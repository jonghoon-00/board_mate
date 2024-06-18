import { addCommentData, deleteCommentData, getCommentData, updateCommentData } from '@/api/api.comment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  StCommentFormSection,
  StCommentList,
  StCommentSaveButton,
  StCommentWriterInfo,
  StTextArea
} from './comments.styled';

const Comments = ({ setCommentIsEdit, commentIsEdit }) => {
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');
  const [newContent, setNewContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);

  const { id: postId } = useParams();

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
    addMutation.mutate({ post_id: postId, content });
    console.log('first');
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
      content: newContent
    });
    setCommentIsEdit(false);
    setEditingCommentId(comment.id);
  };

  return (
    <StCommentFormSection onSubmit={addComment}>
      {/* TODO comments 테이블에서 해당 postId의 항목 몇개인지 받아오기 */}
      <p>{comments?.length}개의 댓글</p>
      <StTextArea
        type="text"
        placeholder="댓글을 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <StCommentSaveButton type="submit">저장</StCommentSaveButton>

      <StCommentList>
        <ul>
          {comments?.map((comment) => {
            return (
              <li key={comment.id}>
                {/* TODO user 닉네임 가져와야함 */}
                <StCommentWriterInfo>
                  <p>닉네임</p>
                  <p>{comment.created_at}</p>
                </StCommentWriterInfo>
                {!commentIsEdit && editingCommentId === comment.id ? (
                  <input
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder={comment.content}
                  />
                ) : (
                  <p>{comment.content}</p>
                )}
                <div>
                  {/* TODO 버튼: 작성자 본인에게만 보여야함 */}
                  {!commentIsEdit && editingCommentId === comment.id ? (
                    <button type="button" onClick={() => updateCommentHandler(comment)}>
                      완료
                    </button>
                  ) : (
                    <button type="button" onClick={() => setCommentIsEdit(true)}>
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
                </div>
              </li>
            );
          })}
        </ul>
      </StCommentList>
    </StCommentFormSection>
  );
};

export default Comments;
