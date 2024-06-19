import { useState } from 'react';

export const useInputs = (initialValue) => {
  const [values, setValues] = useState(initialValue);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const reset = () => setValues(initialValue);

  return [values, onChange, reset];
};
