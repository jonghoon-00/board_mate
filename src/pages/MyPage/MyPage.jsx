import { getUser } from '@/api/api.auth';
import { getPosts } from '@/api/api.posts';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import {
  StButton,
  StCard,
  StCardFooter,
  StCardImg,
  StCards,
  StCardsCotainer,
  StContent,
  StContentNoImg,
  StPlace,
  StPostItem,
  StProfile,
  StProfileBox,
  StProfileGame,
  StProfileIntro,
  StProfileName,
  StProfilePic,
  StSection,
  StTitle,
  StUserInfo,
  StUserProfileImage,
  StUsername
} from './MyPage.styled';

const MyPage = () => {
  const navigate = useNavigate();

  const onClickProfile = () => {
    navigate('/fix-my-profile');
  };

  const { data: user, isPending: userPending } = useQuery({
    queryKey: ['user'],
    queryFn: getUser
  });

  const { data: posts, isPending: postsPending } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  });

  if (userPending || postsPending) return <div>Loading...</div>;

  // 데모/로그아웃 상태 방어
  if (!user) {
    return (
      <StSection>
        <div style={{ padding: 20 }}>
          <h3>로그인이 필요합니다.</h3>
          <button onClick={() => navigate('/login')}>로그인 하러가기</button>
        </div>
      </StSection>
    );
  }

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

      <br />
      <br />

      <StCardsCotainer>
        <StCards>
          {posts && posts.length ? (
            posts
              .filter((post) => post.user_id === user.id)
              .map((post) => (
                <Link style={{ textDecoration: 'none' }} key={post.id} to={`/detail/${post.id}`}>
                  <StCard>
                    {post.image_url && <StCardImg src={post.image_url} />}
                    <StTitle>{post.title}</StTitle>
                    <StPlace>{post.address}</StPlace>

                    {post.image_url ? (
                      <StContent>{post.content}</StContent>
                    ) : (
                      <StContentNoImg>{post.content}</StContentNoImg>
                    )}

                    <StCardFooter>
                      <StUserInfo>
                        <StUserProfileImage src={post.users?.image_url} />
                        <StUsername>{post.users?.nickname}</StUsername>
                      </StUserInfo>

                      <StPostItem>{post.is_recruit ? '모집 완료' : '모집중'}</StPostItem>
                    </StCardFooter>
                  </StCard>
                </Link>
              ))
          ) : (
            <>
              <div></div>
              <div></div>
            </>
          )}
        </StCards>
      </StCardsCotainer>
    </StSection>
  );
};

export { MyPage };
