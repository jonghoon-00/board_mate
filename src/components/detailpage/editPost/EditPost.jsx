import { useState } from 'react';
import { StPostImage } from '../readPost/readPost.styled';
import { StButtonDiv, StContainer, StContentSection, StInputDiv } from './editPost.styled';

const EditPost = ({ setIsEdit, targetData }) => {
  //TODO : 모집중 상태 변경 로직 - recruit 상태 받아와서 업데이트

  const { title, image_url, content, is_recruit } = targetData;
  const [recruit, setRecruit] = useState(is_recruit);

  return (
    // TODO 수정되어야할 요소: 모집중, 주소, 제목, 내용, 이미지

    // TODO 지도 사용한 주소 변경 어케할지 생각해야함
    // TODO 이미지 변경 어떻게 할지 고민해야함(에바일경우? 슬랙도 이미지 수정 안된다 주장하기-죄송 ..)
    <StContainer>
      <StInputDiv>
        <label>제목</label>
        <input placeholder={title} />
      </StInputDiv>
      <button onClick={() => setRecruit(!recruit)}>{recruit ? '모집 완료' : '모집중'}</button>
      <button>위치 수정</button>
      <EditPost />
      <StContentSection>
        <StPostImage src={image_url} alt="image" />
        <textarea placeholder={targetData.content} />
      </StContentSection>
      <StButtonDiv>
        <button onClick={() => setIsEdit(false)}>수정 완료</button>
        <button onClick={() => setIsEdit(false)}>취소</button>
      </StButtonDiv>
    </StContainer>
  );
};

export default EditPost;
