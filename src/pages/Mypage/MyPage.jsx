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
  StMyPost,
  StNoCard,
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
      <br />
      <StMyPost>내가 작성한 게시물</StMyPost>
      <br />
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
                          <StUserProfileImage src={post.users.image_url} />
                          <StUsername>{post.users.nickname}</StUsername>
                        </StUserInfo>

                        <StPostItem>{post.is_recruit ? '모집 완료' : '모집중'}</StPostItem>
                      </StCardFooter>
                    </StCard>
                  </Link>
                );
              })
          ) : (
            <>
              <div></div>
              <StNoCard>작성된 게시물이 없습니다</StNoCard>
              <div></div>
            </>
          )}
        </StCards>
      </StCardsCotainer>
    </StSection>
  );
};

export { MyPage };
