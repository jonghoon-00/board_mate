import { getUser } from '@/api/api.auth';
import { addImage, addPost } from '@/api/api.posts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

function WritingForm() {
  const {
    data: user,
    isPending,
    isError
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUser
  });

  const {
    state: { info: mapInfo }
  } = useLocation();
  // console.log(state.info);
  console.log(mapInfo);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const fileObj = e.target.files[0];
    const data = await addImage(fileObj);
    setImageUrl(`https://hiovftevpmlwqfamjnpe.supabase.co/storage/v1/object/public/post_images/${data.path}`);
  };

  // add mutation 로직
  const addMutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      navigate('/');
    }
  });

  const addPostHandler = () => {
    addMutation.mutate({
      id: uuidv4(),
      address: mapInfo.address_name,
      title,
      content,
      image_url: imageUrl,
      is_recruit: false,
      user_id: user.id,
      coordinate: {
        lat: mapInfo.y,
        lng: mapInfo.x
      }
    });
  };
  return (
    <StContainer>
      <StTitleInput
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder="제목을 입력하세요"
      />
      <StLabel htmlFor="image">이미지 첨부하기</StLabel>
      <StInput type="file" id="image" onChange={handleImageUpload} />
      <StTextArea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        placeholder="내용을 작성해 주세요 ..."
      />

      <StMapApi>지도api</StMapApi>

      <StLine />
      <StButtonContainer>
        <StBackButton>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          나가기
        </StBackButton>
        <StAddButton onClick={addPostHandler}>등록하기</StAddButton>
      </StButtonContainer>
    </StContainer>
  );
}

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
  font-size: 42px;
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
  background-color: #2d2d2d;
  color: white;
  width: 100%;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  align-items: center;
  border: none;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
`;

const StInput = styled.input`
  display: none;
  width: 100%;
`;

const StMapApi = styled.div`
  height: 244px;
`;

const StLine = styled.div`
  border-top: 1px solid #bdbdbd;
`;

const StButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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

export default WritingForm;
