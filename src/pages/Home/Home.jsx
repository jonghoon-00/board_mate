import { useQuery } from '@tanstack/react-query';
import { StDiv } from './Home.styled';
import styled from 'styled-components';
import { getPosts } from '@/api/api.posts';

export const Home = () => {
  const {
    data: posts,
    isPending,
    isError
  } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  });
  console.log(posts);

  return (
    <StDiv>
      <StHomeSection>
        <StSlideSection>슬라이드 아이템 들어가는 곳</StSlideSection>
        <StCardsSection>
          <StCardsCotainer>
            <StCardsAlignBtn>▼ 최신순</StCardsAlignBtn>
            <StCards>
              {posts &&
                posts.map((post) => {
                  return (
                    <StCard key={post.id}>
                      <StCardImg />
                      <StTitle>{post.title}</StTitle>
                      <StPlace>{post.address}</StPlace>
                      <StContent>{post.content}</StContent>
                      <StPostItem>모집중</StPostItem>
                    </StCard>
                  );
                })}
              {/* <StCard>
                <>
                  <StCardImg />
                  <StTitle>제목</StTitle>
                  <StPlace>장소</StPlace>
                </>
                <StPostItem>모집중</StPostItem>
              </StCard>
              <StCard>
                <StTitle>제목</StTitle>
                <StPlace>장소</StPlace>
                <StPostItem>모집중</StPostItem>
              </StCard>
              <StCard>카드~</StCard>
              <StCard>카드~</StCard> */}
            </StCards>
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
  height: 500px;
  background-color: pink;
  display: flex;
  justify-content: center;
`;

const StCardsSection = styled.section`
  min-height: 300px;
  display: flex;
  justify-content: center;
`;

const StCardsCotainer = styled.div`
  width: 1240px;
  background-color: gray;
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

const StCards = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 380px));
  grid-auto-rows: minmax(323px, 0);
  justify-content: space-between;
  row-gap: 60px;
`;

const StCard = styled.li`
  background-color: #fcfdff;
  width: 380px;
  height: 323px;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  /* margin: 0 auto 0 auto; */
  gap: 0.5rem;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  box-sizing: border-box;
`;

const StCardImg = styled.div`
  background-color: black;
  width: 100%;
  height: 200px;
  border-radius: 0.5rem;
`;

const StTitle = styled.p`
  font-size: 2rem;
`;

const StPlace = styled.p`
  font-size: 1.5rem;
`;

const StContent = styled.p`
  font-size: 16px;
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
