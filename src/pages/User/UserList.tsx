import { useEffect, useMemo, useState } from 'react';
import ReactTable from 'ReusableComponents/ReactTable'; // Ensure this is the correct import for ReactTable
import Chip from '@mui/material/Chip';
import { Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Container, Snackbar, Alert } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Cell } from '@tanstack/react-table'; // Import Cell type for typing
import SampleForm from '../dashboard/sampleForm';
import CommonInputField from 'pages/common-components/common-input';
import CommonSelectField from 'pages/common-components/common-select';
import _ from 'lodash';

const DeleteConfirmationDialog = ({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: () => void }) => (
  <Dialog
    open={open}
    // onClose={onClose}
    sx={{
      '& .MuiDialog-paper': {
        width: '30%',
        marginBottom: '19rem'
      }
    }}
  >
    <DialogTitle>Confirm Delete</DialogTitle>
    <DialogContent>Are you sure you want to delete this User?</DialogContent>
    <DialogActions>
      <Button variant="contained" color="error" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="contained" color="primary" onClick={onConfirm}>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);

// The UsersList component now passes actions to the ReactTable component
export default function UserList() {
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
    introducername: {
      label: 'Enter Introducer Name',
      id: 'introducername',
      name: 'introducername',
      type: 'text',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    mobile: {
      label: 'Enter Your Number',
      id: 'number',
      name: 'mobile',
      type: 'number',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    id: {
      label: 'Id',
      id: 'id',
      name: 'id',
      type: 'number',
      value: '',
      error: false,
      helperText: '',
      mandatory: true,
      options: []
    },
    status: {
      label: 'Select Status',
      id: 'status',
      name: 'status',
      type: 'select',
      options: [
        { id: 1, label: 'Active' },
        { id: 2, label: 'Block' }
      ],
      value: { id: null, label: '' },
      error: false,
      helperText: '',
      mandatory: true,
      isMulti: false
    },
    teams: {
      label: 'Select Team',
      id: 'teamsm',
      name: 'teams',
      type: 'select',
      options: [
        { id: 1, label: 'Plots' },
        { id: 2, label: 'House' },
        { id: 3, label: 'Lands' },
        { id: 4, label: 'Apertmant' }
      ],
      value: { id: null, label: '' },
      error: false,
      helperText: '',
      mandatory: true,
      isMulti: false
    }
  };

  const [formData, setFormData] = useState<FormData>(formFields);
  const [open, setOpen] = useState({ flag: false, action: '' });
  const [popupOpen, setPopupOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  console.log(selectedRow);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRowForDeletion, setSelectedRowForDeletion] = useState<any>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  type FormDataKeys = keyof typeof formData;

  const validate = (): boolean => {
    let newFormData = _.cloneDeep(formData);
    let isValid = true;

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        const field = formData[key];

        // Validation for mandatory fields
        if (field.mandatory) {
          const isSelectFieldEmpty =
            field.type === 'select' ? !field.value.id || field.value.id === null : !field.value || field.value === '';

          if (isSelectFieldEmpty) {
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

  const handleInputChange = (name: FormDataKeys, value: any) => {
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

  // const handleSubmit = (e: React.FormEvent) => {
  //   // console.log('Form Submitted', formData);
  //   const sampleObject = {
  //     propertytype: formData.propertytype.value,
  //     status: formData.status.value
  //   };
  //   console.log('sampleObject.........', sampleObject);
  //   e.preventDefault();
  //   if (validate()) {
  //     console.log('Form Submitted', formData);
  //   }
  // };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Submitted:', {
        id: formData.id.value,
        status: formData.status.value,
        name: formData.name.value,
        mobile: formData.mobile.value,
        introducername: formData.introducername.value,
        teams: formData.teams.value
      });
      handlePopupClose();
    }
  };

  // const handlePopupOpen = () => {
  //   setIsEditing(false);
  //   setFormData(formFields);
  //   setPopupOpen(true);
  // };

  const handlePopupClose = () => {
    setPopupOpen(false);
    setIsEditing(false); // Reset editing state when popup is closed
    setSelectedRow(null); // Reset selected row data
  };

  // const handleEdit = (row: any) => {
  //   setIsEditing(true);
  //   setSelectedRow(row);
  //   setFormData({
  //     propertytype: {
  //       label: 'Property Type',
  //       id: 'propertytype',
  //       name: 'propertytype',
  //       type: 'text',
  //       value: row.name,
  //       error: false,
  //       helperText: '',
  //       mandatory: true,
  //       options: []
  //     },
  //     status: {
  //       label: 'Select Status',
  //       id: 'status',
  //       name: 'status',
  //       type: 'select',
  //       options: [
  //         { id: 1, label: 'Active' },
  //         { id: 2, label: 'Block' }
  //       ],
  //       value: row.status === 'Active' ? { id: 1, label: 'Active' } : { id: 2, label: 'Block' },
  //       error: false,
  //       helperText: '',
  //       mandatory: true,
  //       isMulti: false
  //     }
  //   });
  //   setPopupOpen(true);
  // };

  const handleEdit = (row: any) => {
    setIsEditing(true);
    setFormData({
      id: { ...formData.id, value: row.id },
      name: { ...formData.name, value: row.name },
      mobile: { ...formData.mobile, value: row.mobile },
      introducername: { ...formData.introducername, value: row.introducername },
      status: { ...formData.status, value: row.status === 'Active' ? { id: 1, label: 'Active' } : { id: 2, label: 'Block' } },
      teams: { ...formData.teams, value: row.teams === 'Plots' ? { id: 1, label: 'Plots' } : { id: 2, label: 'Lands' } }
    });
    setPopupOpen(true);
  };

  const handleDelete = (row: any) => {
    setSelectedRowForDeletion(row);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log('Deleted row:', selectedRowForDeletion);
    setSnackbarOpen(true);
    setDeleteDialogOpen(false);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const buttonHandler = (action: string, users: any) => {
    if (action === 'delete') {
      handleDelete(users);
    } else if (action === 'block') {
    } else if (action === 'suspend') {
      console.log('action: ', action, 'users: ', users);
    } else if (action === 'activate') {
      console.log('action: ', action, 'users: ', users);
    }
  };

  const data: any = [
    { id: 4256, name: 'Ram', mobile: 8589577785, teams: 'Plots', introducername: 'Mahesh', status: 'Active' },
    { id: 4255, name: 'Ajay', mobile: 8589577785, teams: 'House', introducername: 'Ram', status: 'Block' },
    { id: 4253, name: 'Naveen', mobile: 8589577785, teams: 'Lands', introducername: 'Krishna', status: 'Active' },
    { id: 4252, name: 'Sonali', mobile: 8589577785, teams: 'Apertmants', introducername: 'Hari', status: 'Block' },
    { id: 4251, name: 'Vikram', mobile: 8589577785, teams: 'plots', introducername: 'Shyam', status: 'Active' },
    { id: 4250, name: 'Abhay', mobile: 8589577785, teams: 'plots', introducername: 'Subu', status: 'Block' },
    { id: 4249, name: 'Mahesh', mobile: 8589577785, teams: 'plots', introducername: 'Raghu', status: 'Active' },
    { id: 4248, name: 'Hari', mobile: 8589577785, teams: 'plots', introducername: 'Ravi', status: 'Block' }
  ];

  const ActionMenu = ({ row }: { row: any }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
      console.log('page size: ', rowsPerPage, 'pageNumber: ', pageNumber);
    }, []);

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <IconButton onClick={handleClick}>...</IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              handleEdit(row);
              handleClose();
            }}
          >
            Edit
          </MenuItem>
          <MenuItem onClick={() => handleDelete(row)}>Delete</MenuItem>
        </Menu>
      </>
    );
  };

  const columns = useMemo(
    () => [
      {
        header: 'SNo',
        accessorKey: 'sno',
        cell: (props: Cell<any, any>) => props.row.index + 1,
        enableSorting: false
      },
      { header: ' Id', accessorKey: 'id' },
      { header: ' Teams', accessorKey: 'name' },
      { header: ' Mobile No', accessorKey: 'mobile' },
      { header: ' Teams', accessorKey: 'teams' },
      { header: ' Introducer Name', accessorKey: 'introducername' },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (props: Cell<any, any>) => {
          const status = props.getValue();
          return status === 'Block' ? (
            <Chip color="error" label="Block" size="small" variant="light" />
          ) : (
            <Chip color="success" label="Active" size="small" variant="light" />
          );
        }
      }
    ],
    []
  );

  return (
    <>
      {/* <Grid item style={{ display: 'flex', justifyContent: 'end', margin: '10px 0px', marginRight: '30px' }}>
        <Button variant="contained" color="primary" onClick={handlePopupOpen}>
          Add Teams
        </Button>
      </Grid> */}

      <Dialog
        open={popupOpen}
        sx={{
          '& .MuiDialog-paper': {
            width: '70%',
            marginBottom: '4rem'
          }
        }}
      >
        <DialogTitle>{isEditing ? 'Edit Teams' : ''}</DialogTitle>
        <Container>
          <form onSubmit={handleSubmit} noValidate>
            <DialogContent>
              <Grid item marginBottom={2} xs={12}>
                <CommonInputField inputProps={formData.id} onChange={handleInputChange} />
              </Grid>
              <Grid item marginBottom={2} xs={12}>
                <CommonInputField inputProps={formData.name} onChange={handleInputChange} />
              </Grid>
              <Grid item marginBottom={2} xs={12}>
                <CommonInputField inputProps={formData.mobile} onChange={handleInputChange} />
              </Grid>

              <Grid item xs={12} marginBottom={2}>
                <CommonInputField inputProps={formData.introducername} onChange={handleInputChange} />
              </Grid>

              <Grid item xs={12} marginBottom={2}>
                <CommonSelectField inputProps={formData.teams} onSelectChange={handleSelectChange} />
              </Grid>
              <Grid item xs={12}>
                <CommonSelectField inputProps={formData.status} onSelectChange={handleSelectChange} />
              </Grid>
            </DialogContent>
            <DialogActions sx={{ marginBottom: '0.2rem' }}>
              <Button variant="contained" onClick={handlePopupClose} color="error">
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                {isEditing ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </form>
        </Container>
      </Dialog>

      <DeleteConfirmationDialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} onConfirm={confirmDelete} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Successfully deleted User!
        </Alert>
      </Snackbar>

      <ReactTable
        title={'Users List'}
        data={data}
        columns={columns}
        actions={(row: any) => <ActionMenu row={row} />}
        includeSearch={true}
        needCSV={true}
        pagination={'top'}
        columnVisibility={true}
        needCheckBoxes={true}
        needActivateAndSuspendButtons={true}
        buttonHandler={buttonHandler}
        open={open}
        setOpen={setOpen}
        HandleFormInPopup={SampleForm}
        setRowsPerPage={setRowsPerPage}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
        totalPageCount={60}
      />
    </>
  );
}
