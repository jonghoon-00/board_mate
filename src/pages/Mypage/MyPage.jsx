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

const MyPage = () => {
  // const { blogs } = useBlogs();
  // const { userInfo } = useAuth();
  const navigate = useNavigate();
  // const location = useLocation();
  //   const { email } = location.state;
  //   const [matchedUser, setMatchedUser] = useState(null);

  const onClickProfile = () => {
    navigate('/fix-my-profile');
  };

  //   const filteredBlogs = blogs.filter((blog) => blog.user_id === email);
  //   useEffect(() => {
  //     if (userInfo) {
  //       const matchedUser = userInfo.find((user) => user.email === email);
  //       setMatchedUser(matchedUser);
  //     }
  //   }, [userInfo, email]);

  return (
    <StyledSection>
      <StyledProfile>
        <StyledProfilePic /*src={matchedUser && matchedUser.profile_image}*/ alt="Profile 이미지 사진" />
        <StyledProfileBox>
          {/* {<StyledProfileName>{matchedUser && matchedUser.username}</StyledProfileName> } */}
          <StyledProfileName>닉네임들어갈곳</StyledProfileName>
          <StyledProfileIntro>
            <span>좋아하는 게임 </span>
            <StyledProfileGame>브루마블</StyledProfileGame>
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
