import { getHomePosts } from '@/api/api.posts';
import img from '@/assets/mainitem.png';
import { dummyPosts } from '@/demo/dummyPosts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  StButtonBox,
  StCard,
  StCardFooter,
  StCardImg,
  StCards,
  StCardsAlignBtn,
  StCardsCotainer,
  StCardsSection,
  StContent,
  StContentNoImg,
  StDiv,
  StHomeSection,
  StMoreButton,
  StNoCard,
  StPlace,
  StPostItem,
  StSlideSection,
  StTitle,
  StUserInfo,
  StUsername
} from './Home.styled';

const ITEMS_PER_PAGE = 3;

const pickCreatedAt = (post) => post.createdAt ?? post.created_at ?? '';
const sortByCreatedAtDesc = (a, b) =>
  String(pickCreatedAt(b)).localeCompare(String(pickCreatedAt(a)));
const sortByCreatedAtAsc = (a, b) =>
  String(pickCreatedAt(a)).localeCompare(String(pickCreatedAt(b)));

export const Home = () => {
  const [isLatest, setIsLatest] = useState(true);
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    error
  } = useInfiniteQuery({
    queryKey: ['infinitePosts'],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await getHomePosts(pageParam, ITEMS_PER_PAGE);
      return {
        posts: response.posts,
        totalPages: Math.ceil(response.postsLength / ITEMS_PER_PAGE)
      };
    },
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      // console.log(lastPage, allPages, lastPageParam);
      if (lastPage.length === 0) {
        return undefined;
      }
      const nextPage = lastPageParam + 1;
      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
    select: ({ pages }) => {
      return pages.map((postsPerPage) => postsPerPage.posts).flat();
    }
  });

  const mergedPosts = useMemo(() => {
    const combined = [...dummyPosts, ...(posts ?? [])];
    return combined.sort(isLatest ? sortByCreatedAtDesc : sortByCreatedAtAsc);
  }, [isLatest, posts]);

  if (error) return <div>{error}</div>;
  if (isPending && !posts?.length) return <div>Loading...</div>;

  return (
    <StDiv>
      <StHomeSection>
        <StSlideSection>
          <img src={img} />
        </StSlideSection>
        <StCardsSection>
          <StCardsCotainer>
            <StCardsAlignBtn onClick={() => setIsLatest((prev) => !prev)}>
              ▼ {isLatest ? '최신순' : '오래된순'}
            </StCardsAlignBtn>
            {mergedPosts.length ? (
              <StCards>
                {mergedPosts.map((post) => {
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
                            {/* <StUserProfileImage src={post.users.image_url} /> */}
                            <StUsername>{post.users.nickname}</StUsername>
                          </StUserInfo>

                          <StPostItem>{post.is_recruit ? '모집 완료' : '모집중'}</StPostItem>
                        </StCardFooter>
                      </StCard>
                    </Link>
                  );
                })}
              </StCards>
            ) : (
              <StNoCard>작성된 게시물이 없습니다.</StNoCard>
            )}
            {hasNextPage && (
              <StButtonBox>
                <StMoreButton onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                  더 불러오기
                </StMoreButton>
              </StButtonBox>
            )}
          </StCardsCotainer>
        </StCardsSection>
      </StHomeSection>
    </StDiv>
  );
};
