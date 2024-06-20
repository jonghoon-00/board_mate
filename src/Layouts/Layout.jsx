import { signOutWithSupabase } from '@/api/api.auth';
import imgsrc from '@/assets/main-logo.svg';
import supabase from '@/supabase/supabaseClient';
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom/dist';
import styled from 'styled-components';

function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkLoginStatus = async () => {
    const response = await supabase.auth.getUser();
    const user = response.data.user;
    setIsLoggedIn(!!user);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    if (confirm('정말 로그아웃하시겠습니까?')) {
      try {
        await signOutWithSupabase();
        setIsLoggedIn(false);
        window.location.replace('/');
      } catch (error) {
        console.error('Error logging out:', error.message);
      }
    }
  };

  return (
    <StBackground>
      <StHeader>
        <Link to="/">
          <StLogo src={imgsrc} />
        </Link>

        <Link to="/my-page">
          <StNoneBodyBtn>마이페이지</StNoneBodyBtn>
        </Link>

        <StSignDiv>
          <>
            <Link to="/select-place">
              <StNoneBodyBtn color="#F2B564">글 작성</StNoneBodyBtn>
            </Link>
          </>

          <>
            {isLoggedIn ? (
              <StSignBtn onClick={handleLogout}>로그아웃</StSignBtn>
            ) : (
              <Link to="/log-in">
                <StSignBtn>로그인</StSignBtn>
              </Link>
            )}
          </>
        </StSignDiv>
      </StHeader>
      <Outlet />
    </StBackground>
  );
}

const StBackground = styled.section`
  background-color: #fcfdff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StHeader = styled.section`
  height: 100px;
  background-color: #2d2d2d;
  color: #fcfdff;
  display: flex;
  align-items: center;
  padding: 5px 20px 5px 20px;
  box-sizing: border-box;
`;

// 높이 100px 하려고 했는데 못생겨서 75px 정도로 변경

const StLogo = styled.img`
  width: 340px;
  height: 60px;
  margin-right: 10px;
`;

// 반응형 생각했을 땐 로고 너비 20vw 하고 높이를 너비에 따라 고정되게 하면 좋을텐데 방법 찾아본 후 수정

// 나중에 링크 말고 파일 위치로 수정할 예정

const StNoneBodyBtn = styled.button`
  margin: 0.2rem;
  width: 6rem;
  height: 2.2rem;
  border-radius: 0.5rem;
  color: ${(props) => props.color || '#fcfdff'};
  background-color: transparent;
  border: none;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;

const StSignDiv = styled.div`
  margin-left: auto;
`;

const StSignBtn = styled.button`
  width: 7rem;
  height: 2.2rem;
  margin-right: 0.2rem;
  border-radius: 0.5rem;
  background-color: #fcfdff;
  color: #2d2d2d;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;

export default Layout;
