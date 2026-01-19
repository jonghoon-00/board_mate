// FixMyProfile.jsx 핵심 부분만 (구조 유지 + submit 정상)
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUser, updateProfileWithSupabase } from '@/api/api.auth';
import { DEMO_MODE } from '@/config/demoMode';
import { useQuery, useQueryClient } from '@tanstack/react-query';

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

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('이미지 변환에 실패했습니다.'));
    reader.readAsDataURL(file);
  });
}

function FixMyProfile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const {
    data: user,
    isPending,
    isError
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    gcTime: 0
  });

  const [profileName, setProfileName] = useState('');
  const [profileFavorite, setProfileFavorite] = useState('');

  const [baseImageUrl, setBaseImageUrl] = useState('');
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (!user) return;
    setProfileName(user.nickname ?? '');
    setProfileFavorite(user.favorite ?? '');
    setBaseImageUrl(user.image_url ?? '');
    setProfileImageFile(null);
    setPreviewUrl('');
  }, [user]);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileImageFile(file);
    const dataUrl = await fileToDataURL(file);
    setPreviewUrl(dataUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const updatingObj = {};

    const nextNickname = (profileName ?? '').trim();
    const prevNickname = (user.nickname ?? '').trim();
    if (nextNickname && nextNickname !== prevNickname) {
      updatingObj.nickname = nextNickname;
    }

    const nextFavorite = (profileFavorite ?? '').trim();
    const prevFavorite = (user.favorite ?? '').trim();
    if (nextFavorite !== prevFavorite) {
      updatingObj.favorite = nextFavorite; // string 고정
    }

    if (profileImageFile instanceof File) {
      if (DEMO_MODE) {
        updatingObj.image_url = previewUrl || (await fileToDataURL(profileImageFile));
      } else {
        const [{ default: supabase }, { v4: uuidv4 }] = await Promise.all([
          import('@/supabase/supabaseClient'),
          import('uuid')
        ]);

        const fileKey = `profile_image_${uuidv4()}`;

        const uploadRes = await supabase.storage.from('avatars').upload(fileKey, profileImageFile, { upsert: true });

        if (uploadRes?.error) {
          alert('업로드에 실패했습니다.');
          return;
        }

        const publicUrl = supabase.storage.from('avatars').getPublicUrl(fileKey);
        updatingObj.image_url = publicUrl.data.publicUrl;
      }
    }

    if (Object.keys(updatingObj).length === 0) {
      alert('변경된 것이 없습니다!');
      return;
    }

    await updateProfileWithSupabase(updatingObj, user.id);
    await queryClient.invalidateQueries({ queryKey: ['user'] });

    alert('프로필 변경이 성공적으로 완료되었습니다!');
    navigate('/my-page');
  };

  if (isPending) return <div>Loading...</div>;
  if (isError || !user) return <div>유저 정보를 불러오지 못했습니다.</div>;

  return (
    <StFixSection>
      {/* ✅ 핵심: DOM 추가 없이 form으로 렌더링 */}
      <StFixProfile as="form" onSubmit={handleSubmit}>
        <StProfilePics>
          <StProfilePicBox>
            <img
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              src={previewUrl || baseImageUrl}
              alt=""
            />
          </StProfilePicBox>

          <Button
            buttonText="이미지 변경하기"
            color="#2D2D2D"
            type="button"
            onClick={() => fileInputRef.current?.click()}
          />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </StProfilePics>

        <StProfileBox>
          <StLabelNick>
            닉네임 <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
          </StLabelNick>

          <StLabelGame>
            좋아하는 게임{' '}
            <input type="text" value={profileFavorite} onChange={(e) => setProfileFavorite(e.target.value)} />
          </StLabelGame>
        </StProfileBox>

        <StButtons>
          {/* ✅ submit 버튼 */}
          <Button buttonText="저장" type="submit" color="#2D2D2D" />
          <Button buttonText="돌아가기" type="button" color="#2D2D2D" onClick={() => navigate('/my-page')} />
        </StButtons>
      </StFixProfile>
    </StFixSection>
  );
}

export { FixMyProfile };
