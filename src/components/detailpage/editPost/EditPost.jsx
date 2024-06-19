import { StButtonDiv, StContainer, StContentSection, StInputDiv } from './editPost.styled';

const EditPost = ({ setIsEdit }) => {
  return (
    <StContainer>
      <StInputDiv>
        <label>제목</label>
        <input placeholder="수정할 제목을 입력해주세요" />
      </StInputDiv>
      <StInputDiv>
        <label>지역</label>
        <input placeholder="수정할 제목을 입력해주세요" />
      </StInputDiv>
      <StContentSection>
        <img src="" alt="image" />
        <textarea />
      </StContentSection>
      <StButtonDiv>
        <button onClick={() => setIsEdit(false)}>수정 완료</button>
        <button onClick={() => setIsEdit(false)}>취소</button>
      </StButtonDiv>
    </StContainer>
  );
};

export default EditPost;
