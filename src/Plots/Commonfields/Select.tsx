import React from 'react';
import { Autocomplete, TextField, Checkbox, ListItemText, FormControl } from '@mui/material';

interface Option {
  id: any;
  label: string;
}

interface SelectInputProps {
  label: string;
  id: string;
  name: string;
  value: Option | Option[] | null;
  options: Option[];
  error?: boolean;
  helperText?: string;
  mandatory?: boolean;
  isMulti?: boolean;
}

interface CommonSelectProps {
  inputProps: SelectInputProps;
  onSelectChange: (name: string, value: Option | Option[] | null) => void;
}

const CommonSelectField: React.FC<CommonSelectProps> = ({ inputProps, onSelectChange }) => {
  const { label, id, name, value, options, error, helperText, mandatory, isMulti } = inputProps;

  const handleSelectChange = (event: any, selectedOption: Option | Option[] | null) => {
    // Ensure selectedOption is properly formatted
    onSelectChange(name, selectedOption);
  };

  return (
    <FormControl fullWidth error={error} required={mandatory}>
      <Autocomplete
        multiple={isMulti}
        id={id}
        options={options}
        value={isMulti ? (Array.isArray(value) ? value : []) : value || null}
        onChange={handleSelectChange}
        getOptionLabel={(option: Option) => option.label}
        isOptionEqualToValue={(option: Option, value: Option) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder="Search..."
            error={error}
            helperText={helperText}
            sx={{
              '& .MuiInputBase-root': {
                height: '48px' // Adjust the input field height
              }
            }}
          />
        )}
        renderOption={(props, option, state) => (
          <li {...props}>
            {isMulti && <Checkbox checked={Array.isArray(value) && value.some((val: Option) => val.id === option.id)} />}
            <ListItemText primary={option.label} />
          </li>
        )}
      />
    </FormControl>
  );
};

export default CommonSelectField;
