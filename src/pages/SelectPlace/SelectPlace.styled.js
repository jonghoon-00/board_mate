import styled from 'styled-components';

export const StContainer = styled.div`
  margin: 0 auto;
`;
export const StMapTitle = styled.h2`
  font-size: 30px;
  font-weight: bold;
  margin: 50px 0;
`;
export const StDiv = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
  width: 1000px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

export const StLeftSide = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  flex-shrink: 0;
  flex-basis: 320px;
  /* width: 400px; */
  height: 100%;
`;

export const StSearchBar = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 300px;
  height: 60px;
  padding: 10px;
  background-color: #fcfdff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-bottom: 20px;

  & input {
    flex: 1 1 0;
    border: none;
    height: 100%;
    font-size: 18px;
    &:focus {
      outline: none;
    }
  }

  & button {
    box-sizing: border-box;
    flex-basis: 40px;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: none;
    background-color: #2d2d2d;
    color: white;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const StUl = styled.ul`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StLi = styled.li`
  display: flex;
`;

export const StDummyImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: #d9d9d9;
`;

export const StPlaceInfo = styled.div`
  & h3 {
    font-size: 16px;
    font-weight: 700;
  }
  p {
    margin-top: 4px;
    font-size: 12px;
  }
`;

export const StButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  & a {
    text-decoration: none;
    border: none;
    background-color: #2d2d2d;
    color: white;
    font-size: 12px;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }

  & button {
    border: none;
    background-color: #2d2d2d;
    color: white;
    font-size: 12px;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const StListItem = styled.div`
  box-sizing: border-box;
  width: 300px;
  height: 160px;
  padding: 20px;
  background-color: ${(props) => (props.$isSelected ? '#c6c6c6' : '#FCFDFF')};
  box-shadow: 0 4px 4px ${(props) => (props.$isSelected ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.25)')};
  border-radius: 10px;
  list-style: none;
  margin: 10px 0;
  display: flex;
  gap: 20px;
`;

export const StInfoWindow = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -70px;
  width: 200px;
  height: 50px;
  border-radius: 25px;
  box-sizing: border-box;
  padding: 10px;
  font-weight: 700;
  background-color: #fcfdff;
  border: 2px solid black;
  & h3 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;

export const StInfoPreview = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  gap: 10px;
  text-align: center;
  width: 1000px;
  margin: 20px auto 0;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 20px;
  background-color: #fcfdff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 20px;
  hr {
    width: 100%;
  }
`;

export const StInfoTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
`;
export const StInfoContent = styled.p`
  font-size: 20px;
`;

export const StMapAddButton = styled.button`
  border: none;
  background-color: #2d2d2d;
  color: white;
  font-size: 20px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
`;
export const StBackButton = styled.button`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  background: none;
  color: black;
  font-size: 18px;
  font-weight: bold;
  padding: 0;

  cursor: pointer;

  &:focus {
    outline: none;
  }

  svg {
    margin-right: 5px;
  }
`;
