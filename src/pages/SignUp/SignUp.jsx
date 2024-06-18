import { Page } from '@/Layouts/Page';
import { AuthInput } from '@/components/AuthInput/AuthInput';
import { useInputs } from '@/hooks/useInputs';
import { StButton, StDiv, StForm, StTitle } from './SignUp.styled';

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
          <StButton type="submit">가입하기</StButton>
        </StForm>
      </StDiv>
    </Page>
  );
};
