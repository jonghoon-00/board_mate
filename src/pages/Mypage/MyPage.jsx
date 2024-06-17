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
          {<StyledProfileName>"닉네임"</StyledProfileName>}
          <StyledButton>
            <Button type="button" buttonText="프로필 수정" onClick={onClickProfile} color="#a055ff"></Button>
          </StyledButton>
        </StyledProfileBox>
      </StyledProfile>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem 0rem;
  width: 100%;
  height: 200px;
  border-bottom: 1px solid #d3d3d3;
`;

const StyledProfilePic = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background-color: #b1b2e2;
`;

const StyledProfileBox = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 2rem;
`;

const StyledButton = styled.div`
  margin-top: 0.3rem;
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
const StyledUl = styled.ul`
  width: 100%;
  margin-top: 100px;
`;
export default MyPage;
