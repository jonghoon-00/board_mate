import { getUser } from '@/api/api.auth';
import EditPost from '@/components/detailpage/editPost/EditPost';
import ReadPost from '@/components/detailpage/readPost/ReadPost';
import supabase from '@/supabase/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Detail = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [targetData, setTargetData] = useState({});
  const [userInfo, setUserInfo] = useState(null);

  const postId = useParams().id;

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getUser
  });

  //유저 정보 받아오기
  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  //포스트 정보 가져오기
  useEffect(() => {
    const fetchThisData = async () => {
      const { data, error } = await supabase.from('posts').select('*').eq('id', postId).single();
      if (error) {
        console.log(error);
      } else {
        setTargetData(data);
      }
    };

    fetchThisData();
  }, []);
  return (
    <>
      {isEdit ? (
        <EditPost setIsEdit={setIsEdit} />
      ) : (
        <ReadPost setIsEdit={setIsEdit} targetData={targetData} userInfo={userInfo} />
      )}
    </>
  );
};
