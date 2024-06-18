import {
  StButtonDiv,
  StCommentSaveButton,
  StContentSection,
  StRecruitButton,
  StSubSection,
  StTextArea,
  StTitleH1,
  StTitleSection,
  StWriteCommentSection
} from './readPost.styled';

const ReadPost = ({ setIsEdit, targetData }) => {
  const { title, address, image_url, is_recruit, content } = targetData;

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
      <StWriteCommentSection>
        {/* TODO comments 테이블에서 해당 게시물 아이디의 항목 몇개인지 받아오기 */}
        <p>n개의 댓글</p>
        <StTextArea type="text" placeholder="댓글을 입력해주세요" />
        <StCommentSaveButton>저장</StCommentSaveButton>
      </StWriteCommentSection>
    </>
  );
};

export default ReadPost;
