import React from 'react';
import { Outlet } from 'react-router-dom/dist';
import styled from 'styled-components';

function Layout() {
  return (
    <StBackground>
      <StHeader>
        <StLogo src={imgsrc} />
        <StNoneBodyBtn>둘러보기</StNoneBodyBtn>
        <StNoneBodyBtn>모임만들기</StNoneBodyBtn>
        <StNoneBodyBtn>마이페이지</StNoneBodyBtn>
        <StSignDiv>
          <>
            <StSignBtn>로그아웃</StSignBtn>
          </>
          <>
            <StSignBtn>로그인</StSignBtn>
          </>
        </StSignDiv>
      </StHeader>
      <Outlet />
    </StBackground>
  );
}

const StBackground = styled.section`
  background-color: #fcfdff;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StHeader = styled.section`
  height: 5rem;
  background-color: #2d2d2d;
  color: #fcfdff;
  display: flex;
  align-items: center;
  padding: 5px 20px 5px 20px;
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
  width: 5rem;
  height: 2.2rem;
  border-radius: 0.5rem;
  color: #fcfdff;
  background-color: transparent;
  border: none;
  font-weight: 700;
`;

const StSignDiv = styled.div`
  margin-left: auto;
`;

const StSignBtn = styled.button`
  width: 6.5rem;
  height: 2.2rem;
  margin-right: 0.2rem;
  border-radius: 0.5rem;
  background-color: #fcfdff;
  color: #2d2d2d;
  font-weight: 700;
`;

export default Layout;
