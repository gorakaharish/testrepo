import React, { useState } from 'react';
import CommonInputField from 'pages/common-components/common-input';
import CommonSelectField from 'pages/common-components/common-select';
import {
  Button,
  Grid,
  Container,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  Typography,
  // Divider,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  // IconButton,
  FormHelperText
} from '@mui/material';
import _ from 'lodash';
import moment from 'moment';
import CommonDatePicker from 'pages/common-components/common-date';
import MainCard from 'components/MainCard';
// import { Category, TableDocument } from 'iconsax-react';
import { Formik } from 'formik';
import * as yup from 'yup';
import UploadAvatar from 'components/third-party/dropzone/Avatar';
import UploadMultiFile from 'components/third-party/dropzone/MultiFile';

// import SvgIcon from '@mui/joy/SvgIcon';
// import style from '@mui/material'

const CreateStaff: React.FC = () => {
  // Define the structure of form data for type safety
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
      label: 'Enter Your Email ID',
      id: 'email',
      name: 'email',
      type: 'email',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    personalemail: {
      label: 'Enter Your Personal Email ID',
      id: 'personalemail',
      name: 'personalemail',
      type: 'email',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    name: {
      label: 'Enter Your Name',
      id: 'name',
      name: 'name',
      type: 'text',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    surname: {
      label: 'Enter Your SurName',
      id: 'surname',
      name: 'surname',
      type: 'text',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    state: {
      label: 'Select State',
      id: 'selectState',
      name: 'state',
      type: 'select',
      options: [
        { id: 1, label: 'Select Your State' },
        { id: 2, label: 'Mumbi' },
        { id: 3, label: 'Hyderabad' }
      ],
      value: { id: null, label: '' },
      error: false,
      helperText: '',
      mandatory: true,
      isMulti: false
    },
    branch: {
      label: 'Select Branch',
      id: 'selectbranch',
      name: 'branch',
      type: 'select',
      options: [
        { id: 1, label: 'Odisha' },
        { id: 2, label: 'Mumbi' },
        { id: 3, label: 'Hyderabad' }
      ],
      value: { id: null, label: '' },
      error: false,
      helperText: '',
      mandatory: true,
      isMulti: false
    },
    religion: {
      label: 'Select Religion',
      id: 'selectreligion',
      name: 'religion',
      type: 'select',
      options: [
        { id: 1, label: 'Hindu' },
        { id: 2, label: 'Shik' }
      ],
      value: { id: null, label: '' },
      error: false,
      helperText: '',
      mandatory: true,
      isMulti: false
    },
    caste: {
      label: 'Select Caste',
      id: 'selectcaste',
      name: 'caste',
      type: 'select',
      options: [
        { id: 1, label: 'cats' },
        { id: 2, label: 'Mumbi' },
        { id: 3, label: 'Hyderabad' }
      ],
      value: { id: null, label: '' },
      error: false,
      helperText: '',
      mandatory: true,
      isMulti: false
    },
    role: {
      label: 'Select Role',
      id: 'selectrole',
      name: 'role',
      type: 'select',
      options: [
        { id: 1, label: 'Workers' },
        { id: 2, label: 'Manager' },
        { id: 3, label: 'BPO' }
      ],
      value: { id: null, label: '' },
      error: false,
      helperText: '',
      mandatory: true,
      isMulti: false
    },
    city: {
      label: 'Select City',
      id: 'selectCity',
      name: 'city',
      type: 'select',
      options: [
        { id: 1, label: 'Madhapur' },
        { id: 2, label: 'Mumbi' },
        { id: 3, label: 'Hyderabad' }
      ],
      value: { id: null, label: '' },
      error: false,
      helperText: '',
      mandatory: true,
      isMulti: false
    },
    number: {
      label: ' Enter Mobile Number',
      id: 'number',
      name: 'number',
      type: 'number',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    officenumber: {
      label: ' Enter office Number',
      id: 'officenumber',
      name: 'officenumber',
      type: 'number',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    pincode: {
      label: ' Enter Pin Code',
      id: 'pincode',
      name: 'pincode',
      type: 'number',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    address: {
      label: ' Enter Your Address',
      id: 'adress',
      name: 'address',
      type: 'text',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    gender: {
      label: 'Select Gender',
      id: 'gender',
      name: 'gender',
      type: 'radio',
      value: 'male',
      error: false,
      helperText: '',
      mandatory: true,
      options: [
        { id: 'male', label: 'Male' },
        { id: 'female', label: 'Female' }
      ]
    },
    maritalstatus: {
      label: 'Select Marital status',
      id: 'maritalstatus',
      name: 'maritalstatus',
      type: 'radio',
      value: 'unmarried',
      error: false,
      helperText: '',
      mandatory: true,
      options: [
        { id: 'married', label: 'Married' },
        { id: 'unmarried', label: 'Unmarried' }
      ]
    },
    education: {
      label: 'Select Education Level ',
      id: 'selecteducation',
      name: 'education',
      type: 'radio',
      value: 'regular',
      error: false,
      helperText: '',
      mandatory: true,
      options: [
        { id: 'regular', label: 'Regular' },
        { id: 'distance', label: 'Distance' }
      ]
    },
    dateofbirth: {
      label: ' Date of Birth',
      id: 'dateofbirth',
      name: 'dateofbirth',
      value: '',
      error: false,
      helperText: 'Please select date',
      mandatory: true,
      options: []
    },
    qualification: {
      label: 'Select  Qualification',
      id: 'selectqualification',
      name: 'qualification',
      type: 'select',
      options: [
        { id: 1, label: 'BSc' },
        { id: 2, label: 'B.tech' },
        { id: 3, label: 'B.com' }
      ],
      value: { id: null, label: '' },
      error: false,
      helperText: '',
      mandatory: true,
      isMulti: false
    },
    temporaryaddress: {
      label: 'Enter Your Address',
      id: 'temporaryaddress',
      name: 'temporaryaddress',
      type: 'text',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    aadharcard: {
      label: ' Enter Your AAdhar No',
      id: 'aadharcard',
      name: 'aadharcard',
      type: 'number',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    fathername: {
      label: 'Enter Your Father Name',
      id: 'fathername',
      name: 'fathername',
      type: 'text',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    fatherno: {
      label: ' Enter Your Father Mobie No',
      id: 'fatherno',
      name: 'fatherno',
      type: 'number',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    fatheraddress: {
      label: 'Enter Your Father Address',
      id: 'fatheraddress',
      name: 'fatheraddress',
      type: 'text',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    referenceno: {
      label: 'Enter refrence Number',
      id: 'referenceno',
      name: 'referenceno',
      type: 'number',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    referenceaddress: {
      label: 'Enter refrence Address',
      id: 'referenceaddress',
      name: 'referenceaddress',
      type: 'text',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    referencename: {
      label: 'Enter refrence Name',
      id: 'referenceaddress',
      name: 'referencename',
      type: 'text',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    source: {
      label: 'Select Source',
      id: 'source',
      name: 'source',
      type: 'select',
      options: [
        { id: 1, label: 'Source' },
        { id: 2, label: 'Website' },
        { id: 3, label: 'Self' },
        { id: 4, label: 'Tv 9' },
        { id: 5, label: 'Tv 9' },
        { id: 6, label: 'Etv Telangana' }
      ],
      value: { id: null, label: '' },
      error: false,
      helperText: '',
      mandatory: true,
      isMulti: false
    },
    joiningdate: {
      label: 'Joining Date',
      id: 'joiningdate',
      name: 'joiningdate',
      value: '',
      error: false,
      helperText: 'Please select date',
      mandatory: true,
      options: []
    },
    expereince: {
      label: 'Your Past Expereince',
      id: 'expereince',
      name: 'expereince',
      value: '',
      error: false,
      helperText: 'Please select date',
      mandatory: true,
      options: []
    },
    ssccertificate: {
      label: 'Upload Your Ssc Certificate',
      id: 'ssccertificate',
      name: 'ssccertificate',
      type: 'file',
      value: '',
      error: false,
      mandatory: true,
      options: []
    },
    highercertificate: {
      label: 'Upload Your Higher Certificate',
      id: 'highercertificate',
      name: 'highercertificate',
      type: 'file',
      value: '',
      error: false,
      mandatory: true,
      options: []
    },
    aadharcardphoto: {
      label: 'Upload Your Aadhar Card',
      id: 'aadharcardphoto',
      name: 'aadharcardphoto',
      type: 'file',
      value: '',
      error: false,
      mandatory: true,
      options: []
    },
    pancard: {
      label: ' Upload Your Pan card',
      id: 'pancard',
      name: 'pancard',
      type: 'file',
      value: '',
      error: false,
      mandatory: true,
      options: []
    },
    profile: {
      label: 'Upload You Profile',
      id: 'profile',
      name: 'profile',
      type: 'file',
      value: '',
      error: false,
      mandatory: true,
      options: []
    },
    passbook: {
      label: 'Upload Your Bank PassBook',
      id: 'passbook',
      name: 'passbook',
      type: 'file',
      value: '',
      error: false,
      mandatory: true,
      options: []
    }
  };

  const months = ['January', 'February', 'March'];
  const years = [2020, 2021, 2022];
  // const days = [1, 2, 3];

  const [formData, setFormData] = useState<FormData>(formFields);
  const [list, setList] = useState(false);
  console.log(setList);

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

  const handleSelectChange = (name: FormDataKeys, value: any) => {
    const newFormData = _.cloneDeep(formData);
    newFormData[name].value = value;
    newFormData[name].error = false;
    newFormData[name].helperText = '';

    setFormData(newFormData);
  };

  const handleDateChange = (name: keyof FormData, value: Date | null) => {
    const newFormData = _.cloneDeep(formData);
    newFormData[name].value = value;
    newFormData[name].error = false;
    newFormData[name].helperText = '';
    setFormData(newFormData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('formData', formData);

    const expDate = formData.expereincedate?.value ? moment(formData.expereincedate.value) : null;

    const experienceYear = expDate ? expDate.year() : null;
    const experienceMonth = expDate ? expDate.month() + 1 : null;

    const sampleObject = {
      name: formData.name?.value || '',
      surname: formData.surname?.value || '',
      email: formData.email?.value || '',
      personalEmail: formData.personalemail?.value || '',
      address: formData.address?.value || '',
      state: formData.state?.value?.label || '',
      branch: formData.branch?.value?.label || '',
      religion: formData.religion?.value?.label || '',
      caste: formData.caste?.value?.label || '',
      role: formData.role?.value?.label || '',
      city: formData.city?.value?.label || '',
      qualification: formData.qualification?.value?.label || '',
      source: formData.source?.value?.label || '',
      gender: formData.gender?.value?.label || '',
      education: formData.education?.value?.label || '',
      maritalstatus: formData.maritalstatus?.value?.label || '',
      number: formData.number?.value || '',
      aadharcard: formData.aadharcard?.value || '',
      officenumber: formData.officenumber?.value || '',
      fathernumber: formData.fatherno?.value || '',
      fathername: formData.fathername?.value || '',
      referenceno: formData.referenceno?.value || '',
      referencename: formData.referencename?.value || '',
      referenceaddress: formData.referenceaddress?.value || '',
      fatheraddress: formData.fatheraddress?.value || '',
      ssccertificate: formData.ssccertificate?.value || '',
      aadharcardphoto: formData.aadharcardphoto?.value || '',
      pancard: formData.pancard?.value || '',
      highercertificate: formData.highercertificate?.value || '',
      profile: formData.profile?.value || '',
      dateofbirth: formData.dateofbirth?.value ? moment(formData.dateofbirth.value).format('YYYY/MM/DD') : '',
      joiningdate: formData.joiningdate?.value ? moment(formData.joiningdate.value).format('YYYY/MM/DD') : '',
      expereincedate: experienceYear && experienceMonth ? `${experienceYear}-${String(experienceMonth).padStart(2, '0')}` : ''
    };

    console.log('Form Submitted:', sampleObject);
    if (!validate()) {
      console.log('Validation failed. Please check all fields.');
      return;
    }
  };

  return (
    <Container
      style={{
        backgroundColor: '#FFF',
        padding: '40px 30px',
        boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px ,rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        borderRadius: '10px'
      }}
    >
      <Typography variant="h3" marginBottom={2}>
        Create New Agent
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <Grid item xs={12} sm={6} md={6} marginBottom={2} textAlign={'center'}>
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
                <Typography variant="h6" marginBottom={0.5}>
                  {formData.profile.label}
                </Typography>
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item xs={12} sm={8} md={4}>
                    <Stack alignItems="center">
                      <Stack spacing={0.5} alignItems="center">
                        <UploadAvatar
                          setFieldValue={setFieldValue}
                          file={values.files}
                          error={touched.files && !!errors.files}
                          // inputProps={{
                          //   label: formData?.profile?.label || 'Upload Profile Picture',
                          //   accept: 'image/*'
                          // }}
                          sx={{
                            width: '80px',
                            height: '80px'
                          }}
                        />
                        {/* <Stack>
                          <Typography align="center" variant="caption" color="secondary">
                            Allowed &apos;image/*&apos;
                          </Typography>
                          <Typography align="center" variant="caption" color="secondary">
                            *.png, *.jpeg, *.jpg, *.gif
                          </Typography>
                        </Stack> */}
                      </Stack>
                      {touched.files && errors.files && (
                        <FormHelperText error id="standard-weight-helper-text-password-login">
                          {errors.files as string}
                        </FormHelperText>
                      )}
                    </Stack>
                    <Stack direction="row" justifyContent="flex-end">
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
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CommonSelectField inputProps={formData.role} onSelectChange={handleSelectChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonInputField inputProps={formData.name} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonInputField inputProps={formData.surname} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonInputField inputProps={formData.number} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonInputField inputProps={formData.email} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={3} textAlign="left">
            <FormControl component="fieldset">
              <FormLabel component="legend">{formData.gender.label}</FormLabel>
              <RadioGroup row value={formData.gender.value} onChange={(e) => handleChange('gender', e.target.value)}>
                {formData.gender.options.map((option) => (
                  <FormControlLabel key={option.id} value={option.id} control={<Radio />} label={option.label} />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3} textAlign="left">
            <FormControl component="fieldset">
              <FormLabel component="legend">{formData.maritalstatus.label}</FormLabel>
              <RadioGroup row value={formData.maritalstatus.value} onChange={(e) => handleChange('maritalstatus', e.target.value)}>
                {formData.maritalstatus.options.map((option) => (
                  <FormControlLabel key={option.id} value={option.id} control={<Radio />} label={option.label} />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonInputField inputProps={formData.officenumber} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonInputField inputProps={formData.personalemail} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonSelectField inputProps={formData.state} onSelectChange={handleSelectChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonSelectField inputProps={formData.city} onSelectChange={handleSelectChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonSelectField inputProps={formData.branch} onSelectChange={handleSelectChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonSelectField inputProps={formData.religion} onSelectChange={handleSelectChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonSelectField inputProps={formData.caste} onSelectChange={handleSelectChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonDatePicker inputProps={formData.dateofbirth} onDateChange={handleDateChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} textAlign="left">
            <FormControl component="fieldset">
              <FormLabel component="legend">{formData.education.label}</FormLabel>
              <RadioGroup row value={formData.education.value} onChange={(e) => handleChange('education', e.target.value)}>
                {formData.education.options.map((option) => (
                  <FormControlLabel key={option.id} value={option.id} control={<Radio />} label={option.label} />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonSelectField inputProps={formData.qualification} onSelectChange={handleSelectChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonInputField inputProps={formData.temporaryaddress} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonInputField inputProps={formData.aadharcard} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonInputField inputProps={formData.fathername} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonInputField inputProps={formData.fatherno} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonInputField inputProps={formData.fatheraddress} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonInputField inputProps={formData.referencename} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonInputField inputProps={formData.referenceno} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonInputField inputProps={formData.referenceaddress} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CommonSelectField inputProps={formData.source} onSelectChange={handleSelectChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} marginTop={2}>
            <CommonDatePicker inputProps={formData.joiningdate} onDateChange={handleDateChange} />
          </Grid>
          <Grid container item xs={12} sm={6} md={6} marginBottom={1} textAlign={'center'}>
            <InputLabel>{formData.expereince.label}</InputLabel>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <FormControl fullWidth error={formData.expereince.error}>
                  <InputLabel>Month</InputLabel>
                  <Select
                    value={formData.expereince.value.month || ''}
                    onChange={(e) => handleSelectChange('expereince', { ...formData.expereince.value, month: e.target.value })}
                  >
                    {months.map((month, index) => (
                      <MenuItem key={index + 1} value={index + 1}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth error={formData.expereince.error}>
                  <InputLabel>Year</InputLabel>
                  <Select
                    value={formData.expereince.value.year || ''}
                    onChange={(e) => handleSelectChange('expereince', { ...formData.expereince.value, year: e.target.value })}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <MainCard title={formData.ssccertificate.label}>
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
                    <Grid spacing={3}>
                      <Grid item xs={12}>
                        <Stack spacing={1.5} alignItems="center">
                          <UploadMultiFile
                            showList={list}
                            setFieldValue={setFieldValue}
                            files={values.files}
                            error={touched.files && !!errors.files}
                          />
                        </Stack>
                        {touched.files && errors.files && (
                          <FormHelperText error id="standard-weight-helper-text-password-login">
                            {errors.files as string}
                          </FormHelperText>
                        )}
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </MainCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <MainCard title={formData.highercertificate.label}>
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
                    <Grid spacing={3}>
                      <Grid item xs={12}>
                        <Stack spacing={1.5} alignItems="center">
                          <UploadMultiFile
                            showList={list}
                            setFieldValue={setFieldValue}
                            files={values.files}
                            error={touched.files && !!errors.files}
                          />
                        </Stack>
                        {touched.files && errors.files && (
                          <FormHelperText error id="standard-weight-helper-text-password-login">
                            {errors.files as string}
                          </FormHelperText>
                        )}
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </MainCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <MainCard title={formData.aadharcardphoto.label}>
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
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Stack spacing={1.5} alignItems="center">
                          <UploadMultiFile
                            showList={list}
                            setFieldValue={setFieldValue}
                            files={values.files}
                            error={touched.files && !!errors.files}
                          />
                        </Stack>
                        {touched.files && errors.files && (
                          <FormHelperText error id="standard-weight-helper-text-password-login">
                            {errors.files as string}
                          </FormHelperText>
                        )}
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </MainCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <MainCard title={formData.pancard.label}>
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
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Stack spacing={1.5} alignItems="center">
                          <UploadMultiFile
                            showList={list}
                            setFieldValue={setFieldValue}
                            files={values.files}
                            error={touched.files && !!errors.files}
                          />
                        </Stack>
                        {touched.files && errors.files && (
                          <FormHelperText error id="standard-weight-helper-text-password-login">
                            {errors.files as string}
                          </FormHelperText>
                        )}
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </MainCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <MainCard
              title={formData.passbook.label}
              sx={{
                width: '100%',
                height: '100%'
              }}
            >
              <Formik
                initialValues={{ files: [] }}
                onSubmit={(values) => {
                  console.log('Submitted files:', values.files);
                }}
                validationSchema={yup.object().shape({
                  files: yup.array().min(1, 'At least one file is required.').required('Files are required.')
                })}
              >
                {({ values, handleSubmit, setFieldValue, touched, errors }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Stack spacing={0} alignItems="center">
                          <UploadMultiFile
                            showList={list}
                            setFieldValue={setFieldValue}
                            files={values.files}
                            error={touched.files && !!errors.files}
                            // inputProps={{
                            //   label: formData.passbook.label,
                            //   accept: 'image/*,application/pdf',
                            //   multiple: true
                            // }}
                            sx={{
                              width: '100%',
                              height: '100%'
                            }}
                          />
                        </Stack>
                        {touched.files && errors.files && (
                          <FormHelperText error id="standard-weight-helper-text-password-login">
                            {errors.files as string}
                          </FormHelperText>
                        )}
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </MainCard>
          </Grid>
          <Grid item xs={12} textAlign={'end'}>
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateStaff;
