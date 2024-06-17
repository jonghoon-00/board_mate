import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const ImageInputButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const MapImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

function WritingForm() {
  return (
    <Container>
      <Title>제목을 입력하세요</Title>
      <Input placeholder="제목을 입력하세요" />
      <ImageInputButton>이미지 입력 버튼</ImageInputButton>
      <TextArea placeholder="내용을 작성해 주세요 ..." />
      <MapImage src="/path/to/map/image.png" alt="Map" />
      <ButtonContainer>
        <Button>나가기</Button>
        <Button>모집중</Button>
        <Button>완료</Button>
        <Button>+ Button</Button>
      </ButtonContainer>
    </Container>
  );
}

export default WritingForm;
