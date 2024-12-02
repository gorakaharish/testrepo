import React from 'react';
import { Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface DatePickerProps {
  inputProps: {
    label: any;
    id: any;
    name: any;
    value: Date | null;
    error?: boolean;
    helperText?: any;
    mandatory?: boolean;
    format?: string;
  };
  onDateChange: (name: string, value: Date | null) => void; // Ensure this accepts Date or null
}

const CommonDatePicker: React.FC<DatePickerProps> = ({ inputProps, onDateChange }) => {
  const { label, id, name, value, error, helperText, mandatory, format } = inputProps;

  const handleDateChange = (newValue: Date | null) => {
    onDateChange(name, newValue); // newValue will be of type Date | null
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={1}>
        {/* {label && <InputLabel>{label}</InputLabel>} */}
        <DatePicker
          value={value}
          label={label}
          onChange={handleDateChange}
          format={format || 'dd-MM-yyyy'}
          slotProps={{
            textField: {
              id,
              fullWidth: true,
              required: mandatory,
              error: error,
              helperText: error ? helperText : ''
            }
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default CommonDatePicker;
