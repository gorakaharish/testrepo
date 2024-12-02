import React, { useState } from 'react';
import CommonInputField from 'pages/agents/commoninputs/Input';
import CommonSelectField from 'pages/agents/commoninputs/Select';
import CommonNumberField from 'pages/agents/commoninputs/Number';
import { Button, Grid, Container } from '@mui/material';
import _ from 'lodash';
import moment from 'moment';

import MainCard from 'components/MainCard';
const CreateAgents: React.FC = () => {
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
      value: { id: null, label: '' },
      error: false,
      helperText: '',
      mandatory: true,
      isMulti: false
    },
    surname: {
      label: 'Sur Name',
      id: 'surname',
      name: 'surname',
      type: 'text',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
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
      label: 'Mobile Number',
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
      label: 'Whatsapp Number',
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
      label: 'User Name',
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
      label: 'Introducer Name',
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
      label: 'Address',
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
      label: 'Introducer Code',
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
      label: 'Password',
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
        <Grid item xs={12} sm={12}>
          <MainCard title="Create Agents">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                      <CommonSelectField inputProps={formData.Selectteam} onSelectChange={handleSelectChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <CommonInputField inputProps={formData.surname} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <CommonInputField inputProps={formData.username} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <CommonInputField inputProps={formData.email} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <CommonInputField inputProps={formData.introducer} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <CommonNumberField
                        inputProps={formData.numberField}
                        onChange={(name, value) => handleNumberChange(name as FormDataKeys, value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <CommonSelectField inputProps={formData.designation} onSelectChange={handleSelectChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <CommonInputField inputProps={formData.introducercode} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <CommonInputField inputProps={formData.address} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <CommonNumberField
                        inputProps={formData.number}
                        onChange={(name, value) => handleNumberChange(name as FormDataKeys, value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <CommonInputField inputProps={formData.password} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <CommonInputField inputProps={formData.zip} onChange={handleChange} />
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
export default CreateAgents;
