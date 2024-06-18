import { signOutWithSupabase } from '@/api/api.auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { StDiv } from './Home.styled';

export const Home = () => {
  const navigate = useNavigate();
  const { mutate: signOut } = useMutation({
    mutationFn: signOutWithSupabase,
    onError: () => {
      console.log('error');
    },
    onSuccess: () => {
      alert('로그아웃');
      navigate('/');
    }
  });
  return (
    <>
      <button onClick={signOut}>로그아웃</button>
      <StDiv>Home</StDiv>
    </>
  );
};
