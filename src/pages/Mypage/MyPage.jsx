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
          <StyledProfileIntro>좋아하는 게임: 브루마블</StyledProfileIntro>
          <StyledButton>
            <Button type="button" buttonText="프로필 수정" onClick={onClickProfile} color="#2D2D2D"></Button>
          </StyledButton>
        </StyledProfileBox>
      </StyledProfile>
      <div>내가 쓴 글</div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #fcfdff;
`;

const StyledProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0rem;
  width: 70%;
  height: 200px;
  border-bottom: 1px solid #fcfdff;
  box-shadow: 0px 1px 1px 0px;
`;

const StyledProfilePic = styled.img`
  height: 170px;
  width: 170px;
  border-radius: 50%;
  background-color: #b1b2e2;
`;

const StyledProfileBox = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 2rem;
`;

const StyledProfileIntro = styled.div`
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
`;

const StyledProfileName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
`;

const StyledButton = styled.div`
  margin-top: 0.3rem;
`;

const StyledUl = styled.ul`
  width: 100%;
  margin-top: 100px;
`;
export default MyPage;
