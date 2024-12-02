import React, { useState } from 'react';
import CommonInputField from 'Plots/Commonfields/Input';
import CommonSelectField from 'Plots/Commonfields/Select';
import CommonNumberField from 'Plots/Commonfields/Number';
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
const Agents: React.FC = () => {
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
    Selectteam: {
      label: 'Select Team',
      id: 'Selectteam',
      name: 'Selectteam',
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
    designation: {
      label: 'Select Team',
      id: 'designation',
      name: 'designation',
      type: 'select',
      options: [
        { id: 1, label: 'home' },
        { id: 2, label: 'villa' },
        { id: 3, label: 'land' }
      ],
      value: { id: 2, label: '' },
      error: false,
      helperText: '',
      mandatory: true,
      isMulti: false
    },
    numberField: {
      label: 'mobile number',
      id: 'numberField',
      name: 'numberField',
      type: 'number',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    number: {
      label: 'whatsapp number',
      id: 'number',
      name: 'number',
      type: 'number',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    email: {
      label: 'Email Address',
      id: 'email',
      name: 'email',
      type: 'email',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    surname: {
      label: 'surname',
      id: 'surname',
      name: 'surname',
      type: 'text',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    zip: {
      label: 'Area city zip',
      id: 'zip',
      name: 'zip',
      type: 'text',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    username: {
      label: 'user name',
      id: 'username',
      name: 'username',
      type: 'text',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    introducer: {
      label: 'introducer name',
      id: 'introducer',
      name: 'introducer',
      type: 'text',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    address: {
      label: 'address',
      id: 'address',
      name: 'address',
      type: 'text',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    introducercode: {
      label: 'introducer Code',
      id: 'introducercode',
      name: 'introducercode',
      type: 'text',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    password: {
      label: 'password',
      id: 'password',
      name: 'password',
      type: 'text',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
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
        <Grid item xs={12} sm={8}>
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
                    <Grid item xs={6}>
                      <CommonSelectField inputProps={formData.Selectteam} onSelectChange={handleSelectChange} />
                    </Grid>
                    <Grid item xs={6}>
                      <CommonInputField inputProps={formData.surname} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={6}>
                      <CommonInputField inputProps={formData.username} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={6}>
                      <CommonInputField inputProps={formData.email} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={6}>
                      <CommonInputField inputProps={formData.introducer} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={6}>
                      <CommonNumberField
                        inputProps={formData.numberField}
                        onChange={(name, value) => handleNumberChange(name as FormDataKeys, value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CommonSelectField inputProps={formData.designation} onSelectChange={handleSelectChange} />
                    </Grid>
                    <Grid item xs={6}>
                      <CommonInputField inputProps={formData.introducercode} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={6}>
                      <CommonInputField inputProps={formData.address} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={6}>
                      <CommonNumberField
                        inputProps={formData.number}
                        onChange={(name, value) => handleNumberChange(name as FormDataKeys, value)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <CommonInputField inputProps={formData.password} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={6}>
                      <CommonInputField inputProps={formData.zip} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={6}>
                      <Button type="submit" variant="contained" color="primary" style={{ width: '250px', marginLeft: '70%' }}>
                        Add button
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
export default Agents;
