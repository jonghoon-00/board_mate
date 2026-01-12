import styled from 'styled-components';

const StPage = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  margin-top: 160px;
`;

export const Page = ({ children }) => {
  return <StPage>{children}</StPage>;
};
