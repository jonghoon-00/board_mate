import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { Page } from '@/Layouts/Page';
import { AuthInput } from '@/components/AuthInput';
import { StButton, StDiv, StForm, StSignUpButton, StTitle } from './LogIn.styled';

import { signInWithSupabase } from '@/api/api.auth';
import { DEMO_MODE } from '@/config/demoMode';
import { useInputs } from '@/hooks/useInputs';

export const LogIn = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useInputs(DEMO_MODE ? { nickname: '' } : { email: '', password: '' });

  const { mutateAsync: signIn } = useMutation({
    mutationFn: () => signInWithSupabase(inputs),
    onError: (e) => {
      console.log(e);
      alert('로그인에 실패했습니다.');
    },
    onSuccess: () => {
      alert('로그인 성공');
      navigate('/');
    }
  });

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (DEMO_MODE) {
      if (!inputs.nickname?.trim()) {
        alert('닉네임을 입력해주세요.');
        return;
      }
    }

    const result = await signIn(inputs);
    console.log(result);
  };

  return (
    <Page>
      <StDiv>
        <StTitle>{DEMO_MODE ? '게스트 로그인' : '로그인'}</StTitle>

        <StForm onSubmit={handleSubmitForm}>
          {DEMO_MODE ? (
            <AuthInput
              label="닉네임"
              name="nickname"
              type="text"
              placeholder="닉네임을 입력해주세요"
              value={inputs.nickname}
              onChange={setInputs}
            />
          ) : (
            <>
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
            </>
          )}

          <StButton type="submit">{DEMO_MODE ? '입장하기' : '로그인'}</StButton>

          {/* 데모 모드에서는 회원가입이 의미가 약하니 숨기거나, '닉네임 변경' 용도로 유지 */}
          {!DEMO_MODE && <StSignUpButton onClick={() => navigate('/sign-up')}>회원가입 페이지로</StSignUpButton>}
        </StForm>
      </StDiv>
    </Page>
  );
};
