import styled from 'styled-components';

export const StCommentFormSection = styled.form`
  width: 100%;
  /* height: 20vh; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
export const StTextArea = styled.textarea`
  resize: none;
  height: 6vh;
`;
export const StCommentSaveButton = styled.button`
  margin: 1rem 0 1rem 90%;
`;

export const StCommentList = styled.div`
  height: auto;

  & li {
    border-bottom: 1px solid black;
    padding: 1rem 0;
  }
`;
export const StCommentWriterInfo = styled.div`
  & p {
    font-size: 1rem;
    font-weight: bold;
  }
`;
export const StCommentP = styled.p`
  font-size: 1.2rem;
`;
