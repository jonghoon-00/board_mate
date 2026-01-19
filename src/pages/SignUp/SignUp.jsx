import { Page } from '@/Layouts/Page';
import { createProfileWithSupabase, signUpWithSupabase } from '@/api/api.auth';
import { AuthInput } from '@/components/AuthInput/AuthInput';
import { DEMO_MODE } from '@/config/demoMode';
import { useInputs } from '@/hooks/useInputs';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { StButton, StDiv, StForm, StTitle } from './SignUp.styled';

export const SignUp = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useInputs(
    DEMO_MODE ? { nickname: '' } : { nickname: '', email: '', password: '', passwordCheck: '' }
  );

  const { mutateAsync: signUp } = useMutation({
    mutationFn: (data) => signUpWithSupabase(data),
    onError: (e) => {
      console.log(e);
      alert('회원가입에 실패했습니다.');
    },
    onSuccess: async () => {
      // 기존 흐름 유지: 프로필 생성/업데이트
      await createProfileWithSupabase({
        nickname: inputs.nickname
      });

      alert(DEMO_MODE ? '게스트 계정 생성 완료' : '회원가입 성공');
      navigate('/');
    }
  });

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!inputs.nickname?.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    if (!DEMO_MODE) {
      if (!inputs.email?.trim()) {
        alert('이메일을 입력해주세요.');
        return;
      }
      if (!inputs.password?.trim()) {
        alert('비밀번호를 입력해주세요.');
        return;
      }
      if (inputs.password !== inputs.passwordCheck) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
    }

    const payload = DEMO_MODE ? { nickname: inputs.nickname } : { email: inputs.email, password: inputs.password };

    const result = await signUp(payload);
    console.log(result);
  };

  return (
    <Page>
      <StDiv>
        <StTitle>{DEMO_MODE ? '닉네임 설정' : '회원가입'}</StTitle>

        <StForm onSubmit={handleSubmitForm}>
          <AuthInput
            label="닉네임"
            name="nickname"
            type="text"
            placeholder="이름을 입력해주세요"
            value={inputs.nickname}
            onChange={setInputs}
          />

          {!DEMO_MODE && (
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
              <AuthInput
                label="비밀번호 확인"
                name="passwordCheck"
                type="password"
                placeholder="비밀번호를 한 번 더 입력해주세요"
                value={inputs.passwordCheck}
                onChange={setInputs}
              />
            </>
          )}

          <StButton type="submit">{DEMO_MODE ? '시작하기' : '가입하기'}</StButton>
        </StForm>
      </StDiv>
    </Page>
  );
};
