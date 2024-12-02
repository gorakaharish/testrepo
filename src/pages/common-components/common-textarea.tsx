import React from 'react';
import { TextField } from '@mui/material';

interface TextAreaProps {
  inputProps: {
    label: string;
    id: string;
    name: string;
    placeholder?: string;
    value: string | number; // More specific than `any`
    error?: boolean;
    helperText?: string;
    mandatory?: boolean;
    rows?: number; // Number of rows for the text area
  };
  onChange: (name: string, value: string | number) => void; // Avoid `any` here
}

const CommonTextArea: React.FC<TextAreaProps> = ({ inputProps, onChange }) => {
  const { label, id, name, placeholder, value, error, helperText, mandatory, rows } = inputProps;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(name, e.target.value); // Value remains a string
  };

  return (
    <TextField
      label={label}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      fullWidth
      required={mandatory}
      error={error}
      helperText={helperText}
      multiline={true}
      rows={rows || 3}
      sx={{
        '& .MuiInputBase-root': {
          padding: '0px'
        },
        '& .MuiInputBase-input': {
          fontSize: '1rem',
          padding: '5px 10px'
        }
      }}
    />
  );
};

export default CommonTextArea;
