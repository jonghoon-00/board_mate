import { getUser } from '@/api/api.auth';
import { getPosts } from '@/api/api.posts';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import {
  StButton,
  StCards,
  StCardsCotainer,
  StProfile,
  StProfileBox,
  StProfileGame,
  StProfileIntro,
  StProfileName,
  StProfilePic,
  StSection
} from './MyPage.styled';

const MyPage = () => {
  const navigate = useNavigate();

  const onClickProfile = () => {
    navigate('/fix-my-profile');
  };

  const {
    data: user,
    isPending,
    isError
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUser
  });

  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  });

  if (isPending) return <div>Loading...</div>;

  return (
    <StSection>
      <StProfile>
        <StProfilePic src={user.image_url} alt="" />
        <StProfileBox>
          <StProfileName>{user.nickname}</StProfileName>
          <StProfileIntro>
            <span>좋아하는 게임 </span>
            <StProfileGame>{user.favorite}</StProfileGame>
          </StProfileIntro>
        </StProfileBox>
        <StButton>
          <Button type="button" buttonText="프로필 수정" onClick={onClickProfile} color="#2D2D2D"></Button>
        </StButton>
      </StProfile>
      <StCardsCotainer>
        <StCards>
          {posts && posts.length ? (
            posts
              .filter((post) => {
                return post.user_id === user.id;
              })
              .map((post) => {
                return (
                  <Link style={{ textDecoration: 'none' }} key={post.id} to={`/detail/${post.id}`}>
                    {post.title}
                  </Link>
                );
              })
          ) : (
            <div>안녕</div>
          )}
        </StCards>
      </StCardsCotainer>
      {/* StCardsCotainerd 섹션 자체를 솔님께서 수정하신 버전으로 업데이트 해야 함 일단 넣어두기만 함 */}
    </StSection>
  );
};

export { MyPage };
