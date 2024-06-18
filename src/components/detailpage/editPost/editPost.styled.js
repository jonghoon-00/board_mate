import styled from 'styled-components';

export const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  margin: 2rem;

  & label {
    font-weight: bold;
  }
  & input {
    width: 85%;
  }
`;

export const StInputDiv = styled.div`
  display: flex;
  gap: 1rem;
`;

export const StContentSection = styled.div`
  display: flex;
  flex-direction: column;

  & textarea {
    resize: none;
    width: 94%;
    height: 20vh;
    margin-top: 2rem;
  }
`;

export const StButtonDiv = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: end;
  margin-right: 1.5rem;
  & button {
    background-color: #2d2d2d;
    color: #fcfdff;
    border-radius: 0.5rem;
    width: 90px;
    height: 32px;
  }
`;
