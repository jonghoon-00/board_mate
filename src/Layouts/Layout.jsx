import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom/dist';
import styled from 'styled-components';
import { Link } from 'react-router-dom/dist';
import { getSessionWithSupabase } from '@/api/api.auth';

import { signOutWithSupabase } from '@/api/api.auth';
import { useSelector } from 'react-redux';

function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = async () => {
    const user = supabase.auth.user();
    console.log(user);
    setIsLoggedIn(true);
  };

  React.useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      await signOutWithSupabase();
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const [view, setView] = useState('');
  console.log(view);
  useEffect(() => {
    const getData = async () => {
      const data = await getSessionWithSupabase();
      setView(data);
    };
    getData();
  }, []);

  console.log(isLoggedIn);
  return (
    <StBackground>
      <StHeader>
        <Link to="/">
          <StLogo src={imgsrc} />
        </Link>

        <StNoneBodyBtn>둘러보기</StNoneBodyBtn>

        <Link to="/my-page">
          <StNoneBodyBtn>마이페이지</StNoneBodyBtn>
        </Link>

        <StSignDiv>
          <>
            <Link to="/writingpage">
              <StNoneBodyBtn color="#F2B564">글 작성</StNoneBodyBtn>
            </Link>
          </>

          <>
            {isLoggedIn ? (
              <Link to="/">
                <StSignBtn onClick={handleLogout}>로그아웃</StSignBtn>
              </Link>
            ) : (
              <StSignBtn onClick={handleLogin}>로그인</StSignBtn>
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

const imgsrc =
  'https://media.discordapp.net/attachments/868151962623967276/1252433645688459294/boradmate.png?ex=6672333a&is=6670e1ba&hm=3f9290842f3d0008c8835a875662770a36d302c9b412d920b479a4df638c6c30&=&format=webp&quality=lossless';

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
`;

export default Layout;
