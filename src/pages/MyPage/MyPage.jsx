import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  StButton,
  StCard,
  StCardImg,
  StCards,
  StCardsCotainer,
  StPlace,
  StPostItem,
  StTitle,
  StyledProfile,
  StyledProfileBox,
  StyledProfileGame,
  StyledProfileIntro,
  StyledProfileName,
  StyledProfilePic,
  StyledSection
} from './MyPage.styled';
import Button from './Button';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/api/api.auth';

const MyPage = () => {
  const navigate = useNavigate();

  const onClickProfile = () => {
    navigate('/fix-my-profile');
  };

  const {
    data: user,
    isPending,
    isError
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUser
  });

  console.log(user);

  if (isPending) return <div>Loading...</div>;

  return (
    <StyledSection>
      <StyledProfile>
        <StyledProfilePic src={user.image_url} alt="" />
        <StyledProfileBox>
          <StyledProfileName>{user.nickname}</StyledProfileName>
          <StyledProfileIntro>
            <span>좋아하는 게임 </span>
            <StyledProfileGame>{user.favorite}</StyledProfileGame>
          </StyledProfileIntro>
        </StyledProfileBox>
        <StButton>
          <Button type="button" buttonText="프로필 수정" onClick={onClickProfile} color="#2D2D2D"></Button>
        </StButton>
      </StyledProfile>
      <StCardsCotainer>
        <StCards>
          <StCard>
            <>
              <StCardImg />
              <StTitle>제목</StTitle>
              <StPlace>장소</StPlace>
            </>
            <StPostItem>모집중</StPostItem>
          </StCard>
          <StCard>
            <StTitle>제목</StTitle>
            <StPlace>장소</StPlace>
            <StPostItem>모집중</StPostItem>
          </StCard>
          <StCard>카드~</StCard>
          <StCard>카드~</StCard>
        </StCards>
      </StCardsCotainer>
      {/* StCardsCotainerd 섹션 자체를 솔님께서 수정하신 버전으로 업데이트 해야 함 일단 넣어두기만 함 */}
    </StyledSection>
  );
};

export { MyPage };
