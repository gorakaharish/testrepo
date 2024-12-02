import React from 'react';
import TextField from '@mui/material/TextField';

interface CommonNumberFieldProps {
  inputProps: {
    label: string;
    id: string;
    name: string;
    value: string | number;
    error?: boolean;
    helperText?: string;
    placeholder?: string;
    mandatory?: boolean;
  };
  onChange: (name: string, value: number | string) => void;
}

const CommonNumberField: React.FC<CommonNumberFieldProps> = ({ inputProps, onChange }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // Validate to ensure only numbers are allowed
    if (!isNaN(Number(value)) || value === '') {
      onChange(name, value);
    }
  };

  return (
    <TextField
      type="number"
      id={inputProps.id}
      name={inputProps.name}
      label={inputProps.label}
      value={inputProps.value}
      placeholder={inputProps.placeholder}
      error={inputProps.error}
      helperText={inputProps.helperText}
      onChange={handleInputChange}
      fullWidth
      variant="outlined"
    />
  );
};

export default CommonNumberField;
