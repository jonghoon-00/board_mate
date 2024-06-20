import styled from 'styled-components';
export const StDiv = styled.div``;

export const StContainer = styled.div`
  width: 60%;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin: 2rem auto;
  padding: 2rem;
  box-sizing: border-box;
`;

export const StTitleSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0 1rem;
  gap: 0.5rem;
  & p {
    font-weight: bold;
    font-size: 1.1rem;
  }
`;
export const StDateP = styled.div`
  font-size: 1.2rem;
  color: grey;
`;
export const StTitleH1 = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  white-space: normal;
  word-wrap: break-word;
  margin-bottom: 1rem;
`;
export const StRecruitButton = styled.button`
  width: 90px;
  color: ${(props) => (props.$is_recruit ? '#12B886' : '#f2b564')};
  background-color: #fcfdff;
  border-radius: 1rem;
  border: 2px solid;
  font-size: 14px;
  font-weight: 700;
`;

export const StSubSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
`;

export const StButtonDiv = styled.div`
  display: ${(props) => (props.$postEditAuthority ? 'flex' : 'none')};
  gap: 20px;
  & button {
    width: 5.3rem;
    height: 2rem;
    border-radius: 0.5rem;
    background-color: #2d2d2d;
    color: #fcfdff;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }
`;
export const StPostInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;
export const StContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 2rem;
  min-height: 40vh;
  & p {
    padding: 20px 0 20px 0;
    word-wrap: break-word;
  }
`;

export const StImaDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const StPostImage = styled.img`
  max-width: 24rem;
`;

export const StHr = styled.hr`
  border: 1px solid #b4b4b4;
`;
