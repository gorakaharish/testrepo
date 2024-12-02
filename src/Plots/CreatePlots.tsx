import React, { useState } from 'react';
// import CommonDatePicker from './Commonfields/Date';
import CommonSelectField from './Commonfields/Select';
import CommonInputField from './Commonfields/Input';
import CommonNumberField from './Commonfields/Number';
import { Button, Grid, Container } from '@mui/material';
import _ from 'lodash';
import moment from 'moment';
// material-ui

import Stack from '@mui/material/Stack';

import FormLabel from '@mui/material/FormLabel';

import MainCard from 'components/MainCard';
// import { AlignBottom } from 'iconsax-react';
// import { padding } from '@mui/system';

// styles & constant
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
//     }
//   }
// };

// ==============================|| ACCOUNT PROFILE - PERSONAL ||============================== //
const CreatePlots: React.FC = () => {
  interface FormField {
    label: string;
    id: string;
    name: string;
    type?: string;
    placeholder?: string;
    value: any;
    error?: boolean;
    helperText?: string;
    mandatory?: boolean;
    options: { id: number; label: string }[];
    isMulti?: boolean;
  }

  interface FormData {
    [key: string]: FormField;
  }

  const formFields: FormData = {
    SelectVenchure: {
      label: 'Select Venchure',
      id: 'SelectVenchure',
      name: 'SelectVenchure',
      type: 'select',
      options: [
        { id: 10, label: 'home' },
        { id: 20, label: 'villa' },
        { id: 30, label: 'land' }
      ],
      value: { id: 20, label: '' },
      error: false,
      helperText: '',
      mandatory: true,
      isMulti: false
    },
    numberField: {
      label: 'Plot Number',
      id: 'numberField',
      name: 'numberField',
      type: 'number',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    plot: {
      label: 'Plot Tyle',
      id: ' plot',
      name: ' plot',
      type: 'text',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    yards: {
      label: 'Plot Sq.Yards',
      id: 'yards',
      name: 'yards',
      type: 'text',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    facing: {
      label: 'Plot Facing',
      id: ' facing',
      name: ' facing',
      type: 'text',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    plotstatus: {
      label: 'Plot Status',
      id: 'plotstatus',
      name: 'plotstatus',
      type: 'select',
      options: [
        { id: 10, label: 'available' },
        { id: 20, label: 'booked' },
        { id: 30, label: 'marked' }
      ],
      value: { id: 20, label: '' },
      error: false,
      helperText: '',
      mandatory: true,
      isMulti: false
    }
  };

  const [formData, setFormData] = useState<FormData>(formFields);

  type FormDataKeys = keyof typeof formData;

  const validate = (): boolean => {
    let newFormData = _.cloneDeep(formData);
    let isValid = true;

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const field = formData[key];
        if (key === 'numberField' && isNaN(field.value)) {
          newFormData[key].error = true;
          newFormData[key].helperText = 'Must be a valid number';
          isValid = false;
        }

        if (field.mandatory && !field.value) {
          if (!newFormData[key].error) {
            newFormData[key].error = true;
            newFormData[key].helperText = `${field.label} is required`;
            isValid = false;
          }
        } else if (key === 'email' && field.value && !/\S+@\S+\.\S+/.test(field.value)) {
          newFormData[key].error = true;
          newFormData[key].helperText = 'Invalid email address';
          isValid = false;
        } else if (key === 'number' && isNaN(field.value)) {
          newFormData[key].error = true;
          newFormData[key].helperText = 'Must be a valid number';
          isValid = false;
        } else if (key === 'pincode' && !/^\d{6}$/.test(field.value)) {
          newFormData[key].error = true;
          newFormData[key].helperText = 'Must be a valid 6-digit pincode';
          isValid = false;
        } else {
          newFormData[key].error = false;
          newFormData[key].helperText = '';
        }
      }
    }

    setFormData(newFormData);
    return isValid;
  };

  const handleChange = (name: FormDataKeys, value: any) => {
    const newFormData = _.cloneDeep(formData);
    newFormData[name].value = value;
    newFormData[name].error = false;
    newFormData[name].helperText = '';
    setFormData(newFormData);
  };
  const handleNumberChange = (name: FormDataKeys, value: string | number) => {
    const newFormData = _.cloneDeep(formData);
    newFormData[name].value = value;
    newFormData[name].error = false;
    newFormData[name].helperText = '';
    setFormData(newFormData);
  };

  const handleSelectChange = (name: FormDataKeys, value: any) => {
    const newFormData = _.cloneDeep(formData);
    newFormData[name].value = value;
    newFormData[name].error = false;
    newFormData[name].helperText = '';
    setFormData(newFormData);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const sampleObject = {
        plot: formData.plot.value,
        state: formData.state.value,
        SelectVenchure: formData.SelectVenchure.value,
        email: formData.email.value,
        date: moment(formData.date.value).format('YYYY/MM/DD')
      };
      console.log('Form Submitted:', sampleObject);
    }
  };
  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <MainCard title="select venchure">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack
                  spacing={2.5}
                  alignItems="center"
                  sx={{
                    alignItems: 'center'
                  }}
                >
                  <FormLabel
                    htmlFor="change-avtar"
                    sx={{
                      position: 'relative',
                      width: 'w-100 bg-primary text-white',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      '&:hover .MuiBox-root': { opacity: 1 },
                      cursor: 'pointer'
                    }}
                  />
                </Stack>
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} style={{ fontSize: '20px' }}>
                      <CommonSelectField inputProps={formData.SelectVenchure} onSelectChange={handleSelectChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <CommonInputField inputProps={formData.plot} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <CommonInputField inputProps={formData.yards} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <CommonInputField inputProps={formData.facing} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <CommonNumberField
                        inputProps={formData.numberField}
                        onChange={(name, value) => handleNumberChange(name as FormDataKeys, value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <CommonSelectField inputProps={formData.plotstatus} onSelectChange={handleSelectChange} />
                    </Grid>
                    <Grid item xs={12} textAlign={'end'}>
                      <Button type="submit" variant="contained" color="primary">
                        Submit
                      </Button>
                               
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </Container>
  );
};
export default CreatePlots;
