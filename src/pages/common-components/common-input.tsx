import React from 'react';
import { TextField } from '@mui/material';

interface InputProps {
  inputProps: {
    label: any;
    id: any;
    name: any;
    type?: any;
    placeholder?: any | undefined;
    value: any;
    error?: boolean | undefined;
    helperText?: any | undefined;
    mandatory?: boolean | undefined;
  };
  onChange: (name: any, value: any) => void;
}

const CommonInputField: React.FC<InputProps> = ({ inputProps, onChange }) => {
  const { label, id, name, type, placeholder, value, error, helperText, mandatory } = inputProps;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, e.target.value);
  };

  return (
    <TextField
      label={label}
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      fullWidth
      required={mandatory}
      error={error}
      helperText={error ? helperText : ''}
    />
  );
};

export default CommonInputField;
