import styled from 'styled-components';

export const StSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StProfile = styled.div`
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

export const StProfilePic = styled.img`
  height: 170px;
  width: 170px;
  margin: auto 0 auto 80px;
  border-radius: 50%;
  background-color: #f0f0f0;
`;

export const StProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0 auto 30px;
`;

export const StProfileName = styled.p`
  font-size: 24px;
  font-weight: 900;
  margin-bottom: 45px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
`;

export const StProfileIntro = styled.span`
  font-size: 20px;
  font-weight: 900;
  display: flex;
  align-items: center;
`;

export const StProfileGame = styled.span`
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-left: 5px;
  background-color: #2d2d2d;
  color: #fcfdff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
`;

export const StButton = styled.div`
  margin: 0 0 auto auto;
  cursor: pointer;
`;

export const StCardsCotainer = styled.div`
  width: 1240px;
  margin-top: 80px;
`;

export const StCards = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 380px));
  grid-auto-rows: minmax(323px, 0);
  justify-content: space-between;
  row-gap: 60px;
`;

export const StCard = styled.div`
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

export const StCardImg = styled.div`
  background-color: black;
  width: 340px;
  height: 200px;
  border-radius: 0.5rem;
`;

export const StTitle = styled.p`
  font-size: 2rem;
`;

export const StPlace = styled.p`
  font-size: 1.5rem;
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
