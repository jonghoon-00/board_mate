import { StDiv, StInput, StLabel } from './AuthInput.styled';

export const AuthInput = ({ label, name, type, placeholder, value, onChange }) => {
  return (
    <StDiv>
      <StLabel htmlFor={name}>{label}</StLabel>
      <StInput value={value} onChange={onChange} name={name} id={name} type={type} placeholder={placeholder} />
    </StDiv>
  );
};
