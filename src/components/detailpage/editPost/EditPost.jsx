import { getPost, updatePost } from '@/api/api.posts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { EditPlace } from '../editPlace/EditPlace';
import { StHr, StPostImage } from '../readPost/readPost.styled';
import {
  StButtonDiv,
  StContainer,
  StContentSection,
  StEditPlaceDiv,
  StInputDiv,
  StNowAddressDiv,
  StRecruitDiv,
  StTextAreaDiv
} from './editPost.styled';

const EditPost = ({ setIsEdit }) => {
  const { data: targetData, isPending } = useQuery({
    queryKey: ['post'],
    queryFn: () => getPost(postId)
  });
  const { content, image_url, is_recruit, title } = targetData;

  const [recruit, setRecruit] = useState(is_recruit);
  const [isEditPlace, setIsEditPlace] = useState(false);

  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const queryClient = useQueryClient();

  //게시글 수정
  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    }
  });
  if (!targetData) {
    return <div>Loading...</div>;
  }

  const updatePostHandler = (targetData) => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 전부 입력하세요.');
      return;
    }
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

    console.log(newTitle);
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!targetData) {
    return <div>No data</div>;
  }

  return (
    // TODO 이미지 변경 어떻게 할지 고민해야함
    <StContainer>
      <StRecruitDiv $isRecruit={recruit}>
        <p>모집 현황 (클릭)</p>
        <button onClick={() => setRecruit(!recruit)}>{recruit ? '모집 완료' : '모집중'}</button>
      </StRecruitDiv>
      <StHr />

      <StInputDiv>
        <label>제목</label>
        <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      </StInputDiv>

      <StContentSection>
        {targetData.image_url ? <StPostImage src={image_url} alt="image" /> : null}
        <StTextAreaDiv>
          <label>내용</label>
          <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} />
        </StTextAreaDiv>
      </StContentSection>
      <StNowAddressDiv>
        {localStorage.getItem('address') && <p>현재 지정 위치 : {localStorage.getItem('address')}</p>}
      </StNowAddressDiv>
      <StEditPlaceDiv $isEditPlace={isEditPlace}>
        <button onClick={() => setIsEditPlace(!isEditPlace)}>위치 수정</button>
        {isEditPlace && <EditPlace setIsEditPlace={setIsEditPlace} />}
      </StEditPlaceDiv>

      <StButtonDiv>
        <button onClick={() => updatePostHandler(targetData)}>수정 완료</button>
        <button onClick={() => setIsEdit(false)}>취소</button>
      </StButtonDiv>
    </StContainer>
  );
};

export default EditPost;
