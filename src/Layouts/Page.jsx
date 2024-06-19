import styled from 'styled-components';

const StPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const Page = ({ children }) => {
  return <StPage>{children}</StPage>;
};
