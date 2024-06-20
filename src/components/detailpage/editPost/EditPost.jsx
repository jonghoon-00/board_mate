import { updatePost } from '@/api/api.posts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { EditPlace } from '../editPlace/EditPlace';
import { StHr, StPostImage } from '../readPost/readPost.styled';
import {
  StButtonDiv,
  StContainer,
  StContentSection,
  StEditPlaceDiv,
  StInputDiv,
  StRecruitDiv
} from './editPost.styled';

const EditPost = ({ setIsEdit, targetData }) => {
  if (!targetData) {
    return <div>Loading...</div>;
  }

  const [recruit, setRecruit] = useState(targetData.is_recruit);
  const [isEditPlace, setIsEditPlace] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const { address, content, coordinate, created_at, id, image_url, is_recruit, title, user_id } = targetData;

  //게시글 수정

  const queryClient = useQueryClient();

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    }
  });

  const updatePostHandler = (targetData) => {
    updatePostMutation.mutate({
      ...targetData,
      is_recruit: recruit,
      address: localStorage.getItem('address'),
      title: newTitle,
      content: newContent,
      coordinate: {
        lat: localStorage.getItem('y'),
        lng: localStorage.getItem('x')
      }
    });

    setIsEdit(false);
    alert('수정 완료');
    localStorage.removeItem('address');
    localStorage.removeItem('x');
    localStorage.removeItem('y');
  };

  return (
    // TODO 수정되어야할 요소: 모집중, 주소, 제목, 내용, 이미지

    // TODO 지도 사용한 주소 변경 어케할지 생각해야함
    // TODO 이미지 변경 어떻게 할지 고민해야함
    <StContainer>
      <StRecruitDiv $isRecruit={recruit}>
        <button onClick={() => setRecruit(!recruit)}>{recruit ? '모집 완료' : '모집중'}</button>
      </StRecruitDiv>
      <StHr />

      <StInputDiv>
        <label>제목</label>
        <input placeholder={title} value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      </StInputDiv>

      <StContentSection>
        {targetData.image_url ? <StPostImage src={image_url} alt="image" /> : null}
        <textarea placeholder={content} value={newContent} onChange={(e) => setNewContent(e.target.value)} />
      </StContentSection>

      <StEditPlaceDiv $isEditPlace={isEditPlace}>
        <button onClick={() => setIsEditPlace(!isEditPlace)}>위치 수정</button>
        {isEditPlace && <EditPlace setIsEditPlace={setIsEditPlace} />}
      </StEditPlaceDiv>
      <div>{localStorage.getItem('address') && <div>현재 지정 위치 : {localStorage.getItem('address')}</div>}</div>

      <StButtonDiv>
        <button onClick={() => updatePostHandler(targetData)}>수정 완료</button>
        <button onClick={() => setIsEdit(false)}>취소</button>
      </StButtonDiv>
    </StContainer>
  );
};

export default EditPost;
