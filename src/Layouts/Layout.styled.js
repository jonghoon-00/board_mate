import styled from 'styled-components';

export const StBackground = styled.section`
  background-color: #fcfdff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const StHeader = styled.section`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  height: 100px;
  background-color: #2d2d2d;
  color: #fcfdff;
  display: flex;
  align-items: center;
  padding: 5px 20px;
  box-sizing: border-box;
`;

export const StLogo = styled.img`
  width: 340px;
  height: 60px;
  margin-right: 10px;
`;

export const StNoneBodyBtn = styled.button`
  margin: 0.2rem;
  width: 6rem;
  height: 2.2rem;
  border-radius: 0.5rem;
  color: ${(props) => props.color || '#fcfdff'};
  background-color: transparent;
  border: none;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;

export const StSignDiv = styled.div`
  margin-left: auto;
`;

export const StSignBtn = styled.button`
  width: 7rem;
  height: 2.2rem;
  margin-right: 0.2rem;
  border-radius: 0.5rem;
  background-color: #fcfdff;
  color: #2d2d2d;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;
