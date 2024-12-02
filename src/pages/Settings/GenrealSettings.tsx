import React, { useState } from 'react';
import CommonInputField from 'pages/common-components/common-input';
import { Button, Grid, Container, FormHelperText, Stack, Typography } from '@mui/material';
import _ from 'lodash';
import { Formik } from 'formik';
import UploadAvatar from 'components/third-party/dropzone/Avatar';
import * as yup from 'yup';

const GenrealSettings: React.FC = () => {
  interface FormField {
    label: any;
    id: any;
    name: any;
    type?: any;
    placeholder?: any;
    value: any;
    error?: boolean;
    helperText?: any;
    mandatory?: boolean;
    options: { id: any; label: any }[];
    isMulti?: boolean;
  }

  interface FormData {
    [key: string]: FormField;
  }

  const formFields: FormData = {
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
    number: {
      label: 'Mobile Number',
      id: 'number',
      name: 'number',
      type: 'number',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    titledescription: {
      label: 'Title Description',
      id: 'titledescription',
      name: 'titledescription',
      type: 'text',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    address: {
      label: 'Enter Your Address',
      id: 'address',
      name: 'address',
      type: 'text',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    faveicon: {
      label: 'Upload Your Favorite Icon',
      id: 'faveicon',
      name: 'faveicon',
      type: 'file',
      value: '',
      error: false,
      mandatory: true,
      options: []
    },
    favlogo: {
      label: 'Upload Your Favorite Logo',
      id: 'favlogo',
      name: 'favlogo',
      type: 'file',
      value: '',
      error: false,
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

        if (field.mandatory) {
          if (key === 'email') {
            if (!field.value || !/\S+@\S+\.\S+/.test(field.value)) {
              newFormData[key].error = true;
              newFormData[key].helperText = 'Invalid email address';
              isValid = false;
            } else {
              newFormData[key].error = false;
              newFormData[key].helperText = '';
            }
          } else if (key === 'date') {
            if (!field.value?.day || !field.value?.month || !field.value?.year) {
              newFormData[key].error = true;
              newFormData[key].helperText = 'Please select a complete date';
              isValid = false;
            } else {
              newFormData[key].error = false;
              newFormData[key].helperText = '';
            }
          } else if (field.type === 'select') {
            if (!field.value || field.value.id === null) {
              newFormData[key].error = true;
              // newFormData[key].helperText = `${field.label} is required`;
              isValid = false;
            } else {
              newFormData[key].error = false;
              newFormData[key].helperText = '';
            }
          } else if (!field.value) {
            newFormData[key].error = true;
            newFormData[key].helperText = `${field.label} is required`;
            isValid = false;
          } else {
            newFormData[key].error = false;
            newFormData[key].helperText = '';
          }
        }
      }
    }

    setFormData(newFormData);
    return isValid;
  };

  const handleChange = (name: FormDataKeys, value: any) => {
    const newFormData = _.cloneDeep(formData);
    newFormData[name].value = value;

    if (newFormData[name].error) {
      newFormData[name].error = false;
      newFormData[name].helperText = ''; // Reset error message
    }

    setFormData(newFormData);
  };

  //   const handleSelectChange = (name: FormDataKeys, value: any) => {
  //     const newFormData = _.cloneDeep(formData);
  //     newFormData[name].value = value;
  //     newFormData[name].error = false;
  //     newFormData[name].helperText = '';
  //     setFormData(newFormData);
  //   };

  //   const handleDateChange = (name: string, value: Date | null) => {
  //     // Change to Date | null
  //     const newFormData = _.cloneDeep(formData);
  //     newFormData[name].value = value;
  //     newFormData[name].error = false;
  //     newFormData[name].helperText = '';
  //     setFormData(newFormData);
  //   };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('formData', formData);

    const sampleObject = {
      email: formData.email?.value || '',
      number: formData.number?.value || '',
      address: formData.address?.value || '',
      titledescription: formData.titledescription?.value || '',
      faveicon: formData.faveicon?.value || '',
      favlogo: formData.favlogo?.value || ''
    };

    console.log('Form Submitted:', sampleObject);
    if (!validate()) {
      console.log('Validation failed. Please check all fields.');
      return;
    }
  };

  return (
    <Container
      sx={{
        backgroundColor: '#FFFFFF',
        padding: '40px 30px',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px ,rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        borderRadius: '10px'
      }}
    >
      <form onSubmit={handleSubmit} noValidate>
        <Typography marginBottom={2} fontSize={20} color={'secondary'} fontWeight={'bold'}>
          General Settings
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <CommonInputField inputProps={formData.titledescription} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonInputField inputProps={formData.number} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonInputField inputProps={formData.email} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonInputField inputProps={formData.address} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <Grid
              item
              xs={6}
              sm={6}
              md={4}
              marginTop={1}
              marginBottom={1}
              textAlign={'center'}
              border={1}
              borderColor={'#CECECE'}
              padding={2}
              borderRadius={2}
              margin={0.5}
            >
              <Formik
                initialValues={{ files: null }}
                onSubmit={() => {
                  // submit form
                }}
                validationSchema={yup.object().shape({
                  files: yup.mixed().required('Avatar is a required.')
                })}
              >
                {({ values, handleSubmit, setFieldValue, touched, errors }) => (
                  <form onSubmit={handleSubmit}>
                    <Typography variant="h6" marginBottom={1} color={'#CECECE'} fontSize={15} fontWeight={'medium'} borderBottom={1}>
                      {formData.faveicon.label}
                    </Typography>
                    <Grid container justifyContent="center" alignItems="center">
                      <Grid item xs={12} sm={8} md={4}>
                        <Stack alignItems="center">
                          <Stack spacing={0.5} alignItems="center">
                            <UploadAvatar
                              setFieldValue={setFieldValue}
                              file={values.files}
                              error={touched.files && !!errors.files}
                              sx={{
                                width: '100px',
                                height: '100px'
                              }}
                            />
                          </Stack>
                          {touched.files && errors.files && (
                            <FormHelperText error id="standard-weight-helper-text-password-login">
                              {errors.files as string}
                            </FormHelperText>
                          )}
                        </Stack>
                        <Stack direction="row" justifyContent="flex-end" marginTop={1}>
                          {values.files !== null && (
                            <Button color="error" onClick={() => setFieldValue('files', null)}>
                              Cancel
                            </Button>
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={4}
              marginTop={1}
              marginBottom={1}
              textAlign={'center'}
              border={1}
              borderColor={'#CECECE'}
              padding={2}
              borderRadius={2}
              margin={0.5}
            >
              <Formik
                initialValues={{ files: null }}
                onSubmit={() => {
                  // submit form
                }}
                validationSchema={yup.object().shape({
                  files: yup.mixed().required('Avatar is a required.')
                })}
              >
                {({ values, handleSubmit, setFieldValue, touched, errors }) => (
                  <form onSubmit={handleSubmit}>
                    <Typography variant="h6" marginBottom={1} color={'#CECECE'} fontSize={15} fontWeight={'bold'} borderBottom={1}>
                      {formData.favlogo.label}
                    </Typography>
                    <Grid container justifyContent="center" alignItems="center">
                      <Grid item xs={12} sm={8} md={4}>
                        <Stack alignItems="center">
                          <Stack spacing={0.5} alignItems="center">
                            <UploadAvatar
                              setFieldValue={setFieldValue}
                              file={values.files}
                              error={touched.files && !!errors.files}
                              sx={{
                                width: '100px',
                                height: '100px'
                              }}
                            />
                          </Stack>
                          {touched.files && errors.files && (
                            <FormHelperText error id="standard-weight-helper-text-password-login">
                              {errors.files as string}
                            </FormHelperText>
                          )}
                        </Stack>
                        <Stack direction="row" justifyContent="flex-end" marginTop={1}>
                          {values.files !== null && (
                            <Button color="error" onClick={() => setFieldValue('files', null)}>
                              Cancel
                            </Button>
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </Grid>
          </Grid>
          <Grid item xs={12} textAlign={'end'}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default GenrealSettings;
