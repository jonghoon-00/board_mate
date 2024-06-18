import { Page } from '@/Layouts/Page';
import { createProfileWithSupabase, signUpWithSupabase } from '@/api/api.auth';
import { AuthInput } from '@/components/AuthInput/AuthInput';
import { useInputs } from '@/hooks/useInputs';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { StButton, StDiv, StForm, StTitle } from './SignUp.styled';

export const SignUp = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useInputs({
    nickname: '',
    email: '',
    password: '',
    passwordCheck: ''
  });

  const { mutateAsync: signUp } = useMutation({
    mutationFn: (data) => signUpWithSupabase(data),
    onError: () => {},
    onSuccess: async () => {
      const result = await createProfileWithSupabase({ nickname: inputs.nickname });
      console.log(result);
      alert('회원가입 성공');
      navigate('/');
    }
  });

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const result = await signUp({
      email: inputs.email,
      password: inputs.password
    });
    console.log(result);
  };

  return (
    <Page>
      <StDiv>
        <StTitle>회원가입</StTitle>
        <StForm onSubmit={handleSubmitForm}>
          <AuthInput
            label="닉네임"
            name="nickname"
            type="text"
            placeholder="이름을 입력해주세요"
            value={inputs.nickname}
            onChange={setInputs}
          />
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
