import styled from 'styled-components';

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 680px;
  height: 600px;
  border-radius: 20px;
  background-color: #fcfdff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;

const StTitle = styled.h1`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 40px;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const StButton = styled.button`
  width: 300px;
  height: 40px;
  background-color: #2d2d2d;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  opacity: 1;
  margin-top: 20px;

  &:hover {
    opacity: 0.8;
  }
`;

export const StSignUpButton = styled.button`
  width: 300px;
  height: 40px;
  background-color: #a1a1a1;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  opacity: 1;

  &:hover {
    opacity: 0.8;
  }
`;

export { StDiv, StTitle, StForm, StButton };
