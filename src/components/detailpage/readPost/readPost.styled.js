import styled from 'styled-components';
export const StDiv = styled.div``;

export const StContainer = styled.div`
  border: 1px solid black;
  width: 650px;
  margin: 0 auto;
  padding: 1.2rem 1rem;
  box-sizing: border-box;
`;

export const StTitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  height: 12vh;
`;
export const StTitleH1 = styled.h1`
  font-size: 3.8rem;
`;
export const StRecruitButton = styled.button`
  margin: 2rem 0;
`;

export const StSubSection = styled.div`
  display: flex;
  justify-content: space-between;
  height: 6vh;
`;
export const StButtonDiv = styled.div`
  display: flex;
  & button {
    margin: 0.5rem;
  }
`;

export const StContentSection = styled.div`
  min-height: 40vh;
  & p {
    margin-top: 2rem;
  }
`;
