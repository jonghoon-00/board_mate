import { Page } from '@/Layouts/Page';
import { signInWithSupabase } from '@/api/api.auth';
import { AuthInput } from '@/components/AuthInput';
import { useInputs } from '@/hooks/useInputs';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { StButton, StDiv, StForm, StTitle, StSignUpButton } from './LogIn.styled';

export const LogIn = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useInputs({
    email: '',
    password: ''
  });
  const { mutateAsync: signIn } = useMutation({
    mutationFn: () => signInWithSupabase(inputs),
    onError: () => {
      console.log('error');
    },
    onSuccess: () => {
      alert('로그인 성공');
      navigate('/');
    }
  });

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const result = await signIn(inputs);
    console.log(result);
  };

  return (
    <Page>
      <StDiv>
        <StTitle>로그인</StTitle>
        <StForm onSubmit={handleSubmitForm}>
          <AuthInput
            label="이메일"
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요"
            value={inputs.email}
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
          <StSignUpButton>회원가입 페이지로</StSignUpButton>
        </StForm>
      </StDiv>
    </Page>
  );
};
