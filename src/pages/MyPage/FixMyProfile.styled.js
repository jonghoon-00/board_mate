import styled from 'styled-components';

export const StFixSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StFixProfile = styled.section`
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

export const StProfilePics = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: auto 0 auto 80px;
`;

export const StProfilePicBox = styled.div`
  width: 170px;
  height: 170px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
  overflow: hidden;
`;

export const StProfileBox = styled.div`
  width: 400px;
  gap: 45px;
  display: flex;
  flex-direction: column;
  margin: auto 0 auto 30px;
`;

export const StLabelNick = styled.label`
  width: 100%;
  font-size: 24px;
  font-weight: 900;
  display: flex;
  align-items: center;
  & input {
    border: none;
    margin-left: 10px;
    font-size: 24px;
  }
`;

export const StLabelGame = styled.label`
  width: 100%;
  font-size: 20px;
  font-weight: 900;
  display: flex;
  align-items: center;
  & input {
    border: none;
    margin-left: 10px;
    min-width: 50px;
    max-width: 210px;
    font-size: 20px;
  }
`;

export const StButtons = styled.div`
  margin: 0 0 auto auto;
  display: flex;
  gap: 10px;
`;
