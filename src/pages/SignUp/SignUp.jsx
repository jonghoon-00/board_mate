import { Page } from '@/Layouts/Page';
import { AuthInput } from '@/components/AuthInput/AuthInput';
import { useInputs } from '@/hooks/useInputs';
import styled from 'styled-components';

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 680px;
  height: 600px;
  border-radius: 20px;
  background-color: #fcfdff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;

const StTitle = styled.h1`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 40px;
`;

const StForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const StButton = styled.button`
  width: 300px;
  height: 40px;
  background-color: #2d2d2d;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  opacity: 1;
  margin-top: 20px;

  &:hover {
    opacity: 0.8;
  }
`;

export const SignUp = () => {
  const [inputs, setInputs] = useInputs({
    nickname: '',
    accountId: '',
    password: '',
    passwordCheck: ''
  });

  return (
    <Page>
      <StDiv>
        <StTitle>회원가입</StTitle>
        <StForm>
          <AuthInput
            label="닉네임"
            name="nickname"
            type="text"
            placeholder="이름을 입력해주세요"
            value={inputs.nickname}
            onChange={setInputs}
          />
          <AuthInput
            label="아이디"
            name="accountId"
            type="text"
            placeholder="아이디를 입력해주세요"
            value={inputs.accountId}
            onChange={setInputs}
          />
          <AuthInput
            label="비밀번호"
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={inputs.password}
            onChange={setInputs}
          />
          <AuthInput
            label="비밀번호 확인"
            name="passwordCheck"
            type="password"
            placeholder="비밀번호를 한 번 더 입력해주세요"
            value={inputs.passwordCheck}
            onChange={setInputs}
          />
          <StButton>가입하기</StButton>
        </StForm>
      </StDiv>
    </Page>
  );
};
