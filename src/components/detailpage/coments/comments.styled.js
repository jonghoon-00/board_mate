import styled from 'styled-components';

export const StCommentFormSection = styled.form`
  height: auto;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 1.2rem 1rem;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 1rem;
`;
export const StTextArea = styled.textarea`
  resize: none;
  border-radius: 0.5rem;
  border: 1px solid #bcbcbc;
  height: 6vh;
`;

export const StCommentSaveButton = styled.button`
  width: 90px;
  height: 32px;
  border-radius: 0.5rem;
  background-color: #2d2d2d;
  color: #fcfdff;
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 0 auto;
`;

export const StCommentList = styled.div`
  height: auto;
  & li {
    border-bottom: 1px solid black;
    padding: 1rem 0;
  }
`;

export const StCommentWriterInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  & p {
    font-size: 1rem;
    font-weight: bold;
  }
`;

export const StCommentP = styled.p`
  font-size: 1.2rem;
`;

export const StCommentUDBtns = styled.div`
  margin-left: auto;
  & button {
    width: 80px;
    height: 25px;
    border-radius: 0.5rem;
    background-color: #2d2d2d;
    color: #fcfdff;
    margin-left: 7px;
  }
`;

export const StCommentCard = styled.section`
  width: 650px;
  height: 180px;
  margin: 40px auto;
  padding: 1.2rem 1rem;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
