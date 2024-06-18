import { StContainer, StContentSection } from './editPost.styled';

const EditPost = ({ setIsEdit }) => {
  return (
    <StContainer>
      <div>
        <label>제목</label>
        <input placeholder="수정할 제목을 입력해주세요" />
      </div>
      <div>
        <label>지역</label>
        <input placeholder="수정할 제목을 입력해주세요" />
      </div>
      <StContentSection>
        <img src="" alt="image" />
        <textarea />
      </StContentSection>
      <div>
        <button onClick={() => setIsEdit(false)}>수정 완료</button>
        <button onClick={() => setIsEdit(false)}>취소</button>
      </div>
    </StContainer>
  );
};

export default EditPost;
