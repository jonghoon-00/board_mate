// Layout.jsx
import { getSessionWithSupabase, signOutWithSupabase } from '@/api/api.auth';
import imgsrc from '@/assets/main-logo.svg';
import { DemoModeBanner } from '@/components/DemoModeBanner';
import { DEMO_MODE } from '@/config/demoMode';
import { useCallback, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { StBackground, StHeader, StLogo, StNoneBodyBtn, StSignBtn, StSignDiv } from './Layout.styled';

function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const checkLoginStatus = useCallback(async () => {
    try {
      const { session } = await getSessionWithSupabase();
      setIsLoggedIn(!!session);
    } catch (e) {
      console.log(e);
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  useEffect(() => {
    checkLoginStatus();
  }, [location.pathname, checkLoginStatus]);

  const handleLogout = async () => {
    const ok = window.confirm('정말 로그아웃하시겠습니까?');
    if (!ok) return;

    try {
      await signOutWithSupabase();
      setIsLoggedIn(false);
      window.location.replace('/');
    } catch (e) {
      console.log(e);
      alert('로그아웃에 실패했습니다.');
    }
  };

  return (
    <StBackground>
      <StHeader>
        <Link to="/">
          <StLogo src={imgsrc} alt="logo" />
        </Link>

        <Link to="/my-page">
          <StNoneBodyBtn>마이페이지</StNoneBodyBtn>
        </Link>

        <StSignDiv>
          <Link to="/select-place">
            <StNoneBodyBtn color="#F2B564">글 작성</StNoneBodyBtn>
          </Link>

          {isLoggedIn ? (
            <StSignBtn onClick={handleLogout}>로그아웃</StSignBtn>
          ) : (
            <Link to="/log-in">
              <StSignBtn>{DEMO_MODE ? '게스트 로그인' : '로그인'}</StSignBtn>
            </Link>
          )}
        </StSignDiv>
      </StHeader>
      <DemoModeBanner />

      <Outlet />
    </StBackground>
  );
}

export default Layout;
