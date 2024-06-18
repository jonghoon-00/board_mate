import { useState } from 'react';
import Comments from '../coments/Comments';
import {
  StButtonDiv,
  StContentSection,
  StRecruitButton,
  StSubSection,
  StTitleH1,
  StTitleSection
} from './readPost.styled';

const ReadPost = ({ setIsEdit, targetData }) => {
  const { title, address, image_url, is_recruit, content } = targetData;
  const [commentIsEdit, setCommentIsEdit] = useState(false);

  return (
    <>
      <StTitleSection>
        <StTitleH1>{title}</StTitleH1>
        <StRecruitButton>{is_recruit ? '모집완료' : '모집중'}</StRecruitButton>
      </StTitleSection>
      <StSubSection>
        <p>{address}</p>
        <StButtonDiv>
          <button onClick={() => setIsEdit(true)}>수정</button>
          <button>삭제</button>
        </StButtonDiv>
      </StSubSection>
      <StContentSection>
        <img src={image_url} alt="image" />
        <p>{content}</p>
      </StContentSection>

      <hr />
      <Comments setCommentIsEdit={setCommentIsEdit} commentIsEdit={commentIsEdit} />
    </>
  );
};

export default ReadPost;
