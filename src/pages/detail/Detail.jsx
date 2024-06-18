import supabase from '@/supabase/supabaseClient';
import { useEffect } from 'react';
import { StContainer } from './detail.styled';

const Detail = () => {
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('posts').select().eq('id', '7442d551-7525-40c1-80f7-14b15bcd51a0');
      console.log(data);
    };
    fetchData();
  }, []);

  return <StContainer>Detail</StContainer>;
};

export default Detail;
