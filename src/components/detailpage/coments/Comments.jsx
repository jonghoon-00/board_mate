import { addCommentData, deleteCommentData, getCommentData, updateCommentData } from '@/api/api.comment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  StCommentFormSection,
  StCommentList,
  StCommentSaveButton,
  StCommentWriterInfo,
  StTextArea,
  StCommentCard,
  StCommentUDBtns
} from './comments.styled';

const Comments = ({ setCommentIsEdit, commentIsEdit }) => {
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
    setEditingCommentId(null);
    setCommentIsEdit(false);
  };

  const nowEditHandler = (commentId) => {
    console.log(commentId);
    setEditingCommentId(commentId);
    setCommentIsEdit(true);
  };

  return (
<<<<<<< HEAD
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

=======
    <>
      <StCommentFormSection onSubmit={addComment}>
        {/* TODO comments 테이블에서 해당 postId의 항목 몇개인지 받아오기 */}
        <p style={{ color: '#495057', fontWeight: 700 }}>n개의 댓글</p>
        <StTextArea
          type="text"
          placeholder="댓글을 입력해주세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <StCommentSaveButton>저장</StCommentSaveButton>
      </StCommentFormSection>
>>>>>>> 4464750c755971de689f5ec54e10f2e98213d063
      <StCommentList>
        <ul>
          {comments?.map((comment) => {
            return (
              <StCommentCard key={comment.id}>
                {/* TODO user 닉네임 가져와야함 */}
                <StCommentWriterInfo>
                  <div>
                    <p>닉네임</p>
                    <p>{comment.created_at}</p>
                  </div>
                  <StCommentUDBtns>
                    {/* TODO 버튼: 작성자 본인에게만 보여야함 */}
                    <button>수정</button>
                    <button>삭제</button>
                  </StCommentUDBtns>
                </StCommentWriterInfo>
<<<<<<< HEAD
                {commentIsEdit && editingCommentId === comment.id ? (
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
                </div>
              </li>
=======
                <StCommentP>{comment.comment}</StCommentP>
              </StCommentCard>
>>>>>>> 4464750c755971de689f5ec54e10f2e98213d063
            );
          })}
        </ul>
      </StCommentList>
    </>
  );
};

export default Comments;
