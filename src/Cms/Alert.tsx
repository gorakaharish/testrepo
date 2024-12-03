import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Alert, Snackbar } from '@mui/material';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface AlertProps {
  onClose: () => void; // Function to close the alert
}

const AlertComponent: React.FC<AlertProps> = ({ onClose }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(true); // Manage popup visibility
  const [isConfirmed, setIsConfirmed] = useState(false); // Manage confirmation status
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar visibility

  const handleConfirm = () => {
    setIsConfirmed(true); // Set confirmed to true when the user clicks Confirm
    setTimeout(() => {
      setIsPopupVisible(false);
      setOpenSnackbar(true); // Show success message
    }, 500); // Delay to allow the popup to hide before showing the success message
  };

  const handleCancel = () => {
    setIsPopupVisible(false); // Close the popup when Cancel is clicked
    onClose(); // Close the alert when Cancel is clicked
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close success message
  };

  return (
    <>
      <Dialog open={isPopupVisible} maxWidth="xs"  sx={{
          '& .MuiDialog-paper': {
            width: '70%',
            marginBottom: '17rem'
          }
        }}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <h3>Are you sure you want to proceed?</h3>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="error" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar Message */}
      {isConfirmed && !isPopupVisible && (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            severity="success"
            variant="filled"
            // icon={<CheckCircleIcon fontSize="inherit" />}
            sx={{
              width: '100%', // Adjust the width to 50%
              backgroundColor: '#d4edda',
              color: '#155724',
              borderRadius: '8px',
              padding: '10px 20px',
            }}
          >
            This is a success Alert.
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default AlertComponent;
