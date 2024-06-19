import { useState } from 'react';
import Comments from '../coments/Comments';
import {
  Hr,
  StButtonDiv,
  StContentSection,
  StRecruitButton,
  StSubSection,
  StTitleH1,
  StTitleSection
} from './readPost.styled';

import { deletePost } from '@/api/api.posts';
import { StContainer } from '@/pages/detail/detail.styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

const ReadPost = ({ setIsEdit, targetData, userInfo }) => {
  const navigate = useNavigate();
  const { id: postId } = useParams();
  const queryClient = useQueryClient();
  const { title, address, image_url, is_recruit, content, user_id } = targetData;
  const [commentIsEdit, setCommentIsEdit] = useState(false);

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    }
  });
  const deletePostHandler = (postId) => {
    deletePostMutation.mutate(postId);
    navigate('/');
    alert('삭제되었습니다');
  };

  return (
    <>
      <StContainer>
        <StRecruitButton>{is_recruit ? '모집완료' : '모집중'}</StRecruitButton>
        <StTitleSection>
          <StTitleH1>{title}</StTitleH1>
        </StTitleSection>
        <StSubSection>
          <p>{address}</p>
          <StButtonDiv $postEditAuthority={user_id === userInfo?.id}>
            <button onClick={() => setIsEdit(true)}>수정</button>
            <button onClick={() => deletePostHandler(postId)}>삭제</button>
          </StButtonDiv>
        </StSubSection>
        <StContentSection>
          <img src={image_url} alt="image" />
          <p>{content}</p>
        </StContentSection>
        <Hr />
      </StContainer>

      <hr />
      <Comments setCommentIsEdit={setCommentIsEdit} commentIsEdit={commentIsEdit} userInfo={userInfo} />
    </>
  );
};

export default ReadPost;
