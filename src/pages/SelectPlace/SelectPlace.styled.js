import styled from 'styled-components';

export const StDiv = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
`;

export const StLeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  flex-shrink: 0;
  flex-basis: 500px;
  width: 500px;
  height: 100%;
`;

export const StSearchBar = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 400px;
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
  justify-content: center;
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
  width: 400px;
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

export const InfoPreview = styled.div`
  border: 1px solid #c0c0c0;
  border-radius: 10px;
  padding: 10px;
  background-color: #fcfdff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 20px;
`;
