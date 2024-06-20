import styled from 'styled-components';

export const StHomeSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const StSlideSection = styled.section`
  height: 700px;
  background-color: #f4b061;
  display: flex;
  justify-content: center;
`;

export const StCardsSection = styled.section`
  min-height: 300px;
  display: flex;
  justify-content: center;
`;

export const StCardsCotainer = styled.div`
  min-width: 1000px;
  margin-bottom: 10px;
  /* background-color: gray; */
`;

export const StCardsAlignBtn = styled.button`
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 10rem;
  height: 2.2rem;
  border-radius: 0.5rem;
  background-color: #fcfdff;
  color: #2d2d2d;
  font-weight: 700;
`;

export const StCards = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 320px));
  grid-auto-rows: minmax(323px, 0);
  justify-content: space-between;
  row-gap: 60px;
`;

export const StNoCard = styled.div`
  text-align: center;
`;

export const StCard = styled.li`
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

export const StCardImg = styled.img`
  background-color: black;
  width: 100%;
  height: 160px;
  border-radius: 0.5rem;
  object-fit: cover;
`;

export const StTitle = styled.p`
  font-size: 18px;
  font-weight: 900;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1; // 원하는 라인수
  -webkit-box-orient: vertical;
`;

export const StPlace = styled.p`
  font-size: 14px;
  font-weight: 900;
`;

export const StContent = styled.p`
  line-height: 1.5;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1; // 원하는 라인수
  -webkit-box-orient: vertical;
`;

export const StContentNoImg = styled.p`
  line-height: 1.5;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 4; // 원하는 라인수
  -webkit-box-orient: vertical;
`;

export const StPostItem = styled.div`
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

export const StMoreButton = styled.button`
  width: 200px;
  height: 80px;
  border-radius: 20px;
  border: none;
  background-color: #2d2d2d;
  color: #fcfdff;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;
export const StButtonBox = styled.div`
  margin: 50px auto;
  width: 100%;
  text-align: center;
`;

export const StDiv = styled.div``;
