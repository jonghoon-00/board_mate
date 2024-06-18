import styled from 'styled-components';

const StDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
`;

const StLabel = styled.label`
  left: -120px;
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  margin-bottom: 0.5rem;
`;

const StInput = styled.input`
  width: 300px;
  height: 40px;
  padding-left: 10px;
  border: 1px solid #c0c0c0;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #fcfdff;
`;

export const AuthInput = ({ label, name, type, placeholder, value, onChange }) => {
  return (
    <StDiv>
      <StLabel htmlFor={name}>{label}</StLabel>
      <StInput value={value} onChange={onChange} name={name} id={name} type={type} placeholder={placeholder} />
    </StDiv>
  );
};
