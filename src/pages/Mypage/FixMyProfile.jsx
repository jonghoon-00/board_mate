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

function FixMyProfile() {
  //const { user, upProfile, upNickName } = useAuth();
  const navigate = useNavigate();

  //테스트용 임의 유저정보
  const [user, setUser] = useState({
    nickName: '홍길동',
    email: 'qwer1234@gmail.com',
    profile: '',
    intro: '브루마블'
  });

  console.log(user);

  const [profileImage, setProfileImage] = useState('');
  const [profileName, setProfileName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [profileIntro, setProfileIntro] = useState('');

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setProfileName(e.target.value);
  };

  const handleIntroChange = (e) => {
    setProfileIntro(e.target.value);
  };

  // 닉네임, 프로필사진 변경
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatingObj = {};

    if (!profileName) {
      return alert('변경된 것이 없습니다!');
    }

    if (profileName !== user.nickName) {
      updatingObj.nickName = profileName;
      setProfileName(profileName);
    }

    if (profileIntro !== user.intro) {
      updatingObj.intro = profileIntro;
      setProfileIntro(profileIntro);
    }

    if (profileImage !== user.profile) {
      updatingObj.profile = profileImage;
      setProfileImage(profileImage);
    }

    console.log(updatingObj);

    // setUser({
    //   nickName: profileName,
    //   email: 'qwer1234@gmail.com',
    //   profile: profileImage,
    //   intro: profileIntro
    // });
    // console.log(user);
  };

  const handleBackClick = () => {
    navigate('/my-page');
  };

  useEffect(() => {
    if (user) {
      setProfileImage(user.profile);
      setProfileName(user.nickName);
      setUserEmail(user.email);
      setProfileIntro(user.intro);
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
            좋아하는 게임 <input type="text" value={profileIntro} onChange={handleIntroChange} />
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
