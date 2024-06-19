import getDataUrl from '@/utils/getDataUrl';
import resizeAndConvertImage from '@/utils/resizeAndConvertImg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@/components/Button';

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
  const [imgFile, setImgFile] = useState('');

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const convertedImg = await resizeAndConvertImage(file);
        const base64 = await getDataUrl(file);

        console.log(convertedImg);
        setProfileImage(base64);
        setImgFile(convertedImg);
      } catch (error) {
        console.error('이미지 가져오기에 실패하였습니다.', error);
      }
    }
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

    if (imgFile !== user.profile) {
      updatingObj.profile = imgFile;
    }

    console.log(updatingObj);
    // setUser({
    //   nickName: profileName,
    //   email: 'qwer1234@gmail.com',
    //   profile: imgFile,
    //   intro: profileIntro
    // });
  };

  const handleBackClick = () => {
    navigate('/MyPage');
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
              src={profileImage ? profileImage : user.profile}
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

const StFixSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyFixProfile = styled.section`
  width: 920px;
  height: 240px;
  padding: 16px;
  margin-top: 60px;
  border-radius: 20px;
  box-sizing: border-box;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  background-color: #fcfdff;
  display: flex;
`;

const StProfilePics = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: auto 0 auto 80px;
`;

const StProfilePicBox = styled.div`
  width: 170px;
  height: 170px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
  overflow: hidden;
`;

const StyledProfileBox = styled.div`
  width: 400px;
  gap: 45px;
  display: flex;
  flex-direction: column;
  margin: auto 0 auto 30px;
`;

const StLabelNick = styled.label`
  width: 100%;
  font-size: 24px;
  font-weight: 900;
  display: flex;
  align-items: center;
  & input {
    border: none;
    margin-left: 10px;
    font-size: 24px;
  }
`;

const StLabelGame = styled.label`
  width: 100%;
  font-size: 20px;
  font-weight: 900;
  display: flex;
  align-items: center;
  & input {
    border: none;
    margin-left: 10px;
    min-width: 50px;
    max-width: 210px;
    font-size: 20px;
  }
`;

const StButtons = styled.div`
  margin: 0 0 auto auto;
  display: flex;
  gap: 10px;
`;

export default FixMyProfile;
