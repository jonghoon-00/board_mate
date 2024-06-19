import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  StButtons,
  StFixSection,
  StLabelGame,
  StLabelNick,
  StProfilePicBox,
  StProfilePics,
  StyFixProfile,
  StyledProfileBox
} from './FixMyProfile.styled';
import Button from './Button';
import supabase from '@/supabase/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/api/api.auth';

function FixMyProfile() {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState('');
  const [profileName, setProfileName] = useState('');
  const [userId, setUserId] = useState('');
  const [profileFavorite, setProfileFavorite] = useState('');

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
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

    const avatar = 'profile_image';
    const FILE_NAME = 'profileImage';
    const fileUrl = `${FILE_NAME}_${user.id}`;

    const updatingObj = {};

    if (!profileName) {
      return alert('변경된 것이 없습니다!');
    }

    if (profileName !== user.nickname) {
      updatingObj.nickname = profileName;
      setProfileName(profileName);
    }

    if (profileFavorite !== user.intro) {
      updatingObj.intro = profileFavorite;
      setProfileFavorite(profileFavorite);
    }

    if (profileImage !== user.profile) {
      updatingObj.profile = profileImage;
      setProfileImage(profileImage);
      const response = await supabase.storage.from('avatars').upload(fileUrl, profileImage);
      const publicUrl = supabase.storage.from('avatars').getPublicUrl(fileUrl);
      console.log(response);
      console.log(publicUrl);
    }

    console.log('updatingObj =', updatingObj);

    // setUser({
    //   nickName: profileName,
    //   id: 'qwer1234@gmail.com',
    //   profile: profileImage,
    //   intro: profileIntro
    // });
    // console.log(user);
  };

  const handleBackClick = () => {
    navigate('/my-page');
  };

  const {
    data: user,
    isPending,
    isError
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUser
  });

  if (isPending) return <div>Loading...</div>;

  console.log(user);

  useEffect(() => {
    if (user) {
      setProfileImage(user.image_url);
      setProfileName(user.nickname);
      setUserId(user.id);
      setProfileFavorite(user.favorite);
    }
  }, [user]);

  return (
    <StFixSection>
      <StyFixProfile>
        <StProfilePics>
          <StProfilePicBox>
            <img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={profileImage ? URL.createObjectURL(profileImage) : ''}
              alt="profile image"
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
        <StyledProfileBox>
          <StLabelNick>
            닉네임 <input type="text" value={profileName} onChange={handleNameChange} />
          </StLabelNick>
          <StLabelGame>
            좋아하는 게임 <input type="text" value={profileFavorite} onChange={handleFavoriteChange} />
          </StLabelGame>
        </StyledProfileBox>
        <StButtons>
          <Button buttonText={'저장'} type={'button'} color="#2D2D2D" onClick={handleSubmit} />
          <Button buttonText={'돌아가기'} type={'button'} color="#2D2D2D" onClick={handleBackClick} />
        </StButtons>
      </StyFixProfile>
    </StFixSection>
  );
}

export { FixMyProfile };
