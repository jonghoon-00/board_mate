import React from 'react';
import styled from 'styled-components';

const StContainer = styled.div`
  width: 650px;
  margin: 0 auto;
  padding: 30px;
  font-family: Arial, sans-serif;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.25);
`;

const StTitleInput = styled.input`
  width: 100%;
  margin-bottom: 1rem;
  font-size: 50px;
  font-weight: bold;
  border: none;
  outline: none;
  box-sizing: border-box;
`;

const StTextArea = styled.textarea`
  width: 100%;
  min-height: 400px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  margin-bottom: 1rem;
  outline: none;
  resize: none;
  box-sizing: border-box;

  &::placeholder {
    color: black;
  }
  &::-webkit-input-placeholder {
    color: black;
  }
  &::-ms-input-placeholder {
    color: black;
  }
`;

const StLabel = styled.label`
  display: flex;
  justify-content: center;
  background-color: black;
  color: white;
  width: 100%;
  height: 40px;
  font-size: 20px;
  font-weight: bold;
  align-items: center;
  border: none;
  margin-bottom: 1rem;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
`;

const StInput = styled.input`
  display: none;
  width: 100%;
`;

const StButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StBackButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  background: none;
  color: black;
  font-size: 18px;
  font-weight: bold;
  padding: 0;

  cursor: pointer;

  &:focus {
    outline: none;
  }

  svg {
    margin-right: 5px;
  }
`;

const StAddButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

function WritingForm() {
  return (
    <StContainer>
      <StTitleInput placeholder="제목을 입력하세요" />
      <StLabel htmlFor="image">이미지 첨부하기</StLabel>
      <StInput type="file" id="image" />
      <StTextArea placeholder="내용을 작성해 주세요 ..." />
      <StButtonContainer>
        <StBackButton>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          나가기
        </StBackButton>

        <StAddButton>등록하기</StAddButton>
      </StButtonContainer>
    </StContainer>
  );
}

export default WritingForm;
