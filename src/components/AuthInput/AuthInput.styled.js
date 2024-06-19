import styled from 'styled-components';

export const StDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
`;

export const StLabel = styled.label`
  left: -120px;
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  margin-bottom: 0.5rem;
`;

export const StInput = styled.input`
  width: 300px;
  height: 40px;
  padding-left: 10px;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #fcfdff;
  &::placeholder {
    color: #9e9e9e;
  }
`;
