import { getPosts } from '@/api/api.posts';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import img from '@/assets/mainitem.png';
import styled from 'styled-components';
import { StDiv } from './Home.styled';

export const Home = () => {
  const {
    data: posts,
    isPending,
    isError
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  });

  return (
    <StDiv>
      <StHomeSection>
        <StSlideSection>
          <img src={img} />
        </StSlideSection>
        <StCardsSection>
          <StCardsCotainer>
            <StCardsAlignBtn>▼ 최신순</StCardsAlignBtn>

            {posts && posts.length ? (
              posts.map((post) => {
                return (
                  <StCards>
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

                        <StPostItem>모집중</StPostItem>
                      </StCard>
                    </Link>
                  </StCards>
                );
              })
            ) : (
              <StNoCard>작성된 게시물이 없습니다.</StNoCard>
            )}
          </StCardsCotainer>
        </StCardsSection>
      </StHomeSection>
    </StDiv>
  );
};

const StHomeSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
`;

const StSlideSection = styled.section`
  height: 700px;
  display: flex;
  justify-content: center;
`;

const StCardsSection = styled.section`
  min-height: 300px;
  display: flex;
  justify-content: center;
`;

const StCardsCotainer = styled.div`
  min-width: 1000px;
  margin-bottom: 10px;
  /* background-color: gray; */
`;

const StCardsAlignBtn = styled.button`
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 10rem;
  height: 2.2rem;
  border-radius: 0.5rem;
  background-color: #fcfdff;
  color: #2d2d2d;
  font-weight: 700;
`;

const StNoCard = styled.div`
  text-align: center;
`;

const StCards = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 320px));
  grid-auto-rows: minmax(323px, 0);
  justify-content: space-between;
  row-gap: 60px;
`;

const StCard = styled.li`
  background-color: #fcfdff;
  width: 320px;
  height: 323px;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  /* margin: 0 auto 0 auto; */
  gap: 0.5rem;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  box-sizing: border-box;
  color: #000;
`;

const StCardImg = styled.img`
  background-color: black;
  width: 100%;
  height: 160px;
  border-radius: 0.5rem;
  object-fit: cover;
`;

const StTitle = styled.p`
  font-size: 2rem;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1; // 원하는 라인수
  -webkit-box-orient: vertical;
`;

const StPlace = styled.p`
  font-size: 1.5rem;
`;

const StContent = styled.p`
  line-height: 1.5;
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1; // 원하는 라인수
  -webkit-box-orient: vertical;
`;

const StContentNoImg = styled.p`
  line-height: 1.5;
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 4; // 원하는 라인수
  -webkit-box-orient: vertical;
`;

const StPostItem = styled.div`
  background-color: #2d2d2d;
  color: #fcfdff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 0 0 auto;
  width: 5.5rem;
  height: 1.7rem;
  border-radius: 0.5rem;
`;

// 스크롤 계속 생김 왜?
