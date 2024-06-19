import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@/components/Button';

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
          <StyledProfileName>닉네임</StyledProfileName>
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

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledProfile = styled.div`
  width: 920px;
  height: 240px;
  padding: 16px;
  margin-top: 60px;
  border-radius: 20px;
  box-sizing: border-box;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #fcfdff;
  display: flex;
`;

const StyledProfilePic = styled.img`
  height: 170px;
  width: 170px;
  margin: auto 0 auto 80px;
  border-radius: 50%;
  background-color: #f0f0f0;
`;

const StyledProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0 auto 30px;
`;

const StyledProfileName = styled.p`
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 45px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
`;

const StyledProfileIntro = styled.span`
  font-size: 20px;
  font-weight: 900;
  display: flex;
  align-items: center;
`;

const StyledProfileGame = styled.span`
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-left: 5px;
  background-color: #2d2d2d;
  color: #fcfdff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
`;

const StButton = styled.div`
  margin: 0 0 auto auto;
`;

const StCardsCotainer = styled.div`
  width: 1240px;
  margin-top: 80px;
`;

const StCards = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 380px));
  grid-auto-rows: minmax(323px, 0);
  justify-content: space-between;
  row-gap: 60px;
`;

const StCard = styled.div`
  background-color: #fcfdff;
  width: 380px;
  height: 323px;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  /* margin: 0 auto 0 auto; */
  gap: 0.5rem;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  box-sizing: border-box;
`;

const StCardImg = styled.div`
  background-color: black;
  width: 340px;
  height: 200px;
  border-radius: 0.5rem;
`;

const StTitle = styled.p`
  font-size: 2rem;
`;

const StPlace = styled.p`
  font-size: 1.5rem;
`;

const StPostItem = styled.div`
  background-color: #2d2d2d;
  color: #fcfdff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 0 0 auto;
  width: 5.5rem;
  height: 1.7rem;
  border-radius: 0.5rem;
`;

export default MyPage;
