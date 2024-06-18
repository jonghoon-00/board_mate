import { Page } from '@/Layouts/Page';
import { AuthInput } from '@/components/AuthInput';
import { useInputs } from '@/hooks/useInputs';
import { StButton, StDiv, StForm, StTitle } from './LogIn.styled';

export const LogIn = () => {
  const [inputs, setInputs] = useInputs({
    accountId: '',
    password: ''
  });

  const handleSubmitForm = (e) => {
    e.preventDefault();
    // 서버로 요청 날리는 로직
  };

  return (
    <Page>
      <StDiv>
        <StTitle>로그인</StTitle>
        <StForm onSubmit={handleSubmitForm}>
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
          <StButton type="submit">로그인</StButton>
        </StForm>
      </StDiv>
    </Page>
  );
};
