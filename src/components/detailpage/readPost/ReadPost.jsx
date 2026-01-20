import { useState } from 'react';

import dayjs from 'dayjs';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import { deletePost, getPost } from '@/api/api.posts';
import { dummyPosts } from '@/demo/dummyPosts';
import { useNavigate, useParams } from 'react-router-dom';
import Comments from '../coments/Comments';
import {
  StButtonDiv,
  StContainer,
  StContentSection,
  StDateP,
  StHr,
  StImaDiv,
  StPostImage,
  StPostInfo,
  StRecruitButton,
  StSubSection,
  StTitleH1,
  StTitleSection
} from './readPost.styled';

const ReadPost = ({ setIsEdit, userInfo }) => {
  const navigate = useNavigate();
  const { id: postId } = useParams();
  const queryClient = useQueryClient();
  const [commentIsEdit, setCommentIsEdit] = useState(false);

  //포스트 정보 가져오기
  const {
    data: targetData,
    isPending,
    isError
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost(postId)
  });

  //게시글 삭제
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    }
  });
  const deletePostHandler = (postId) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deletePostMutation.mutate(postId);
      navigate('/');
      alert('삭제가 완료되었습니다.');
    }
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  const fallbackDummy = dummyPosts.find((post) => post.id === postId) ?? null;
  const postData = targetData ?? fallbackDummy;

  if (!postData) {
    return <div>No data</div>;
  }

  const { title, address, image_url, is_recruit, content, user_id, authorId, coordinate, created_at, createdAt } =
    postData;

  localStorage.setItem('address', postData.address);
  localStorage.setItem('x', postData.coordinate?.lng);
  localStorage.setItem('y', postData.coordinate?.lat);

  const date = dayjs(created_at ?? createdAt).locale('ko').format('YYYY-MM-DD HH:mm');
  return (
    <>
      <StContainer>
        <StRecruitButton $is_recruit={is_recruit}>{is_recruit ? '모집완료' : '모집중'}</StRecruitButton>
        <StTitleSection>
          <StTitleH1>{title}</StTitleH1>

          <StPostInfo>
            {/* <p>{targetData.users.nickname}</p> */}
            <StDateP>{date}</StDateP>
          </StPostInfo>

          <p>{address}</p>
        </StTitleSection>

        <StHr />

        <StSubSection>
          <StButtonDiv $postEditAuthority={(user_id ?? authorId) === userInfo?.id}>
            <button onClick={() => setIsEdit(true)}>수정</button>
            <button onClick={() => deletePostHandler(postId)}>삭제</button>
          </StButtonDiv>
        </StSubSection>
        <StContentSection>
          {image_url && (
            <StImaDiv>
              <StPostImage src={image_url} alt="image" />
            </StImaDiv>
          )}

          <p>{content}</p>

          {/* 지도 */}
          {coordinate && (
            <Map // 로드뷰를 표시할 Container
              center={{
                lat: coordinate.lat,
                lng: coordinate.lng
              }}
              style={{
                width: '100%',
                height: '500px'
              }}
              level={2}
              draggable={false}
              zoomable={false}
            >
              <MapMarker
                position={{
                  // 마커가 표시될 위치
                  lat: coordinate.lat,
                  lng: coordinate.lng
                }}
              />
            </Map>
          )}
        </StContentSection>
        <StHr />
      </StContainer>

      <StHr />
      <Comments setCommentIsEdit={setCommentIsEdit} commentIsEdit={commentIsEdit} userInfo={userInfo} />
    </>
  );
};

export default ReadPost;
