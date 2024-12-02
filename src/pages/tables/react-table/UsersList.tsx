import { useEffect, useMemo, useState } from 'react';
import ReactTable from 'ReusableComponents/ReactTable'; // Ensure this is the correct import for ReactTable
import Chip from '@mui/material/Chip';
import { Menu, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Cell } from '@tanstack/react-table'; // Import Cell type for typing
import SampleForm from '../../../pages/dashboard/sampleForm';

// The UsersList component now passes actions to the ReactTable component
export default function UsersList() {
  const [open, setOpen] = useState({ flag: false, action: '' });
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const data: any = [
    { empId: '4321', name: 'vamsi', officeNumber: '0987654', role: 'poiu', branch: 'gfds', status: 'Single' },
    { empId: '1234', name: 'ravi', officeNumber: '0987654', role: 'poiu', branch: 'gfds', status: 'Complicated' },
    { empId: '3432', name: 'kiran', officeNumber: '0987654', role: 'poiu', branch: 'gfds', status: 'Relationship' },
    { empId: '123', name: 'vinay', officeNumber: '0987654', role: 'poiu', branch: 'gfds', status: 'Single' },
    { empId: '121', name: 'vinay', officeNumber: '0987654', role: 'poiu', branch: 'gfds', status: 'Single' },
    { empId: '122', name: 'vinay', officeNumber: '0987654', role: 'poiu', branch: 'gfds', status: 'Single' },
    { empId: '124', name: 'vinay', officeNumber: '0987654', role: 'poiu', branch: 'gfds', status: 'Single' },
    { empId: '125', name: 'vinay', officeNumber: '0987654', role: 'poiu', branch: 'gfds', status: 'Single' }
  ];
  // const data2 = [
  //   { empId: '126', name: 'vinay', officeNumber: '0987654', role: 'poiu', branch: 'gfds', status: 'Single' },
  //   { empId: '127', name: 'vinay', officeNumber: '0987654', role: 'poiu', branch: 'gfds', status: 'Single' },
  //   { empId: '128', name: 'vinay', officeNumber: '0987654', role: 'poiu', branch: 'gfds', status: 'Single' },
  //   { empId: '129', name: 'vinay', officeNumber: '0987654', role: 'poiu', branch: 'gfds', status: 'Single' },
  //   { empId: '1210', name: 'vinay', officeNumber: '0987654', role: 'poiu', branch: 'gfds', status: 'Single' }
  // ];

  const handleEdit = (row: any) => {
    console.log('row.........', row);
    const newUrl = '/react/userManagement/editUser';
    const fullPath = `${window.location.origin}${newUrl}`;
    window.open(fullPath, '_blank');
  };

  const handleDelete = (row: any) => {
    console.log('delete row.........', row);
  };

  const handleView = (row: any) => {
    console.log('row.........', row);
    const newUrl = '/react/userManagement/viewUser';
    const fullPath = `${window.location.origin}${newUrl}`;
    window.open(fullPath, '_blank');
  };

  const handleBlock = (row: any) => {
    console.log('block row.........', row);
  };

  const handleLeave = (row: any) => {
    console.log('leave row.........', row);
  };

  const buttonHandler = (action: string, users: any) => {
    if (action === 'delete') {
      handleDelete(users);
    } else if (action === 'block') {
      handleBlock(users);
    } else if (action === 'leave') {
      handleLeave(users);
    } else if (action === 'suspend') {
      console.log('action: ', action, 'users: ', users);
    } else if (action === 'activate') {
      console.log('action: ', action, 'users: ', users);
    }
  };

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
              handleView(row);
              handleClose();
            }}
          >
            View Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleEdit(row);
              handleClose();
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpen({ flag: true, action: 'delete' });
              handleClose();
            }}
          >
            Delete
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpen({ flag: true, action: 'block' });
              handleClose();
            }}
          >
            Block
          </MenuItem>
          <MenuItem
            onClick={() => {
              setOpen({ flag: true, action: 'leave' });
              handleClose();
            }}
          >
            Leave
          </MenuItem>
        </Menu>
      </>
    );
  };

  const columns = useMemo(
    () => [
      { header: 'Employee ID', accessorKey: 'empId' },
      { header: 'Name', accessorKey: 'name' },
      { header: 'Office Number', accessorKey: 'officeNumber' },
      { header: 'Role', accessorKey: 'role' },
      { header: 'Branch', accessorKey: 'branch' },
      {
        header: 'Status',
        accessorKey: 'status',
        // Typing the props parameter
        cell: (props: Cell<any, any>) => {
          const status = props.getValue(); // Use getValue() to get the cell value

          switch (status) {
            case 'Complicated':
              return <Chip color="error" label="Complicated" size="small" variant="light" />;
            case 'Relationship':
              return <Chip color="success" label="Relationship" size="small" variant="light" />;
            default:
              return <Chip color="info" label="Single" size="small" variant="light" />;
          }
        }
      }
    ],
    []
  );

  return (
    <ReactTable
      title={'Users'}
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
  );
}
