import { addCommentData, getCommentData } from '@/api/api.comment';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { StCommentFormSection, StCommentList, StCommentSaveButton, StTextArea } from './comments.styled';

const Comments = () => {
  const [comment, setComment] = useState('');
  const postId = useParams().id;

  const addComment = async (e) => {
    e.preventDefault();

    setComment(comment);
    addCommentData(postId, comment);
  };

  const {
    data: comments,
    isPending,
    isError
  } = useQuery({
    queryKey: ['comments'],
    queryFn: getCommentData
  });

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
                <p>닉네임</p>
                {comment.created_at},{comment.comment}
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
