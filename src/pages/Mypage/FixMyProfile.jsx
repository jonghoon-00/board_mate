import { getUser, updateProfileWithSupabase } from '@/api/api.auth';
import supabase from '@/supabase/supabaseClient';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Button from './Button';
import {
  StButtons,
  StFixProfile,
  StFixSection,
  StLabelGame,
  StLabelNick,
  StProfileBox,
  StProfilePicBox,
  StProfilePics
} from './FixMyProfile.styled';

function FixMyProfile() {
  const queryClient = useQueryClient();
  const {
    data: user,
    isPending,
    isError
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    gcTime: 0
  });

  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState('');
  const [profileName, setProfileName] = useState('');
  const [userId, setUserId] = useState('');
  const [profileFavorite, setProfileFavorite] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
  };

  const handleNameChange = (e) => {
    setProfileName(e.target.value);
  };

  const handleFavoriteChange = (e) => {
    setProfileFavorite(e.target.value);
  };

  // 닉네임, 프로필사진 변경
  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageId = uuidv4();
    const FILE_NAME = 'profile_image';
    const fileUrl = `${FILE_NAME}_${imageId}`;

    const updatingObj = {};

    if (!profileName) {
      return alert('변경된 것이 없습니다!');
    }

    if (profileName !== user.nickname) {
      updatingObj.nickname = profileName;
    }

    if (profileFavorite !== user.favorite) {
      updatingObj.favorite = profileFavorite;
    }

    if (profileImage !== user.image_url) {
      // const existFileName = user.image_url.split('avatars/')[1];
      // console.log(existFileName);
      // const { data, error } = await supabase.storage.from('avatars').remove([existFileName]);
      // console.log(data, error);

      const response = await supabase.storage.from('avatars').upload(fileUrl, profileImage, { upsert: true });
      const publicUrl = supabase.storage.from('avatars').getPublicUrl(fileUrl); //superbase에서 받아온 이미지url

      updatingObj.image_url = publicUrl.data.publicUrl;
    }

    const response = await updateProfileWithSupabase(updatingObj, user.id);

    queryClient.invalidateQueries(['user']);

    alert('프로필 변경이 성공적으로 완료되었습니다!');

    navigate('/my-page');
  };

  const handleBackClick = () => {
    navigate('/my-page');
  };

  useEffect(() => {
    if (user) {
      setProfileImage(user.image_url);
      setProfileName(user.nickname);
      setUserId(user.id);
      setProfileFavorite(user.favorite);
    }
  }, [user]);

  if (isPending) return <div>Loading...</div>;

  return (
    <StFixSection>
      <StFixProfile>
        <StProfilePics>
          <StProfilePicBox>
            <img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={previewUrl ? previewUrl : profileImage}
              alt=""
            />
          </StProfilePicBox>
          <Button
            buttonText={'이미지 변경하기'}
            color={'#2D2D2D'}
            type={'button'}
            onClick={() => document.getElementById('fileInput').click()}
          />
          <input id="fileInput" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
        </StProfilePics>
        <StProfileBox>
          <StLabelNick>
            닉네임 <input type="text" value={profileName} onChange={handleNameChange} />
          </StLabelNick>
          <StLabelGame>
            좋아하는 게임 <input type="text" value={profileFavorite} onChange={handleFavoriteChange} />
          </StLabelGame>
        </StProfileBox>
        <StButtons>
          <Button buttonText={'저장'} type={'button'} color="#2D2D2D" onClick={handleSubmit} />
          <Button buttonText={'돌아가기'} type={'button'} color="#2D2D2D" onClick={handleBackClick} />
        </StButtons>
      </StFixProfile>
    </StFixSection>
  );
}

export { FixMyProfile };
