import { addCommentData, getCommentData } from '@/api/api.comment';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  StCommentFormSection,
  StCommentList,
  StCommentP,
  StCommentSaveButton,
  StCommentWriterInfo,
  StTextArea
} from './comments.styled';

const Comments = () => {
  const [comment, setComment] = useState('');
  const { id: postId } = useParams();

  //
  const {
    data: comments,
    isPending,
    isError
  } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getCommentData(postId)
  });
  ``;
  const { mutation } = useMutation({
    mutationFn: (newComment) => addCommentData(newComment),
    onSuccess: () => {
      navigate(0);
      queryClient.invalidateQueries(['comments', postId]);
      setComment('');
    }
  });

  //댓글작성
  const addComment = (e) => {
    e.preventDefault();

    mutation.mutate({ post_id: postId, comment });

    // const newComment = {
    //   post_id: postId,
    //   comment
    // };

    // setComment(comment);
    // addCommentData(postId, comment);
    // mutation.mutate(newComment);
    // setComment('');
  };

  return (
    <StCommentFormSection onSubmit={addComment}>
      {/* TODO comments 테이블에서 해당 postId의 항목 몇개인지 받아오기 */}
      <p>n개의 댓글</p>
      <StTextArea
        type="text"
        placeholder="댓글을 입력해주세요"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <StCommentSaveButton>저장</StCommentSaveButton>

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
                <StCommentP>{comment.comment}</StCommentP>

                <div>
                  {/* TODO 버튼: 작성자 본인에게만 보여야함 */}
                  <button>수정</button>
                  <button>삭제</button>
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
