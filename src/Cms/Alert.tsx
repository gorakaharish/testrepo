// Alert.tsx
import React from 'react';

interface AlertProps {
  type: 'success' | 'error' | 'info'; // Type of the alert
  message: string; // The alert message
  onClose: () => void; // Function to close the alert
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const getAlertStyle = () => {
    switch (type) {
      case 'success':
        return { backgroundColor: 'white', color: 'black', margin: '20px', paddingTop: '40px' };
      case 'error':
        return { color: 'black', backgroundColor: 'white', border: '1pxsolid#ccc', margin: '20px', paddingTop: '40px' };
      case 'info':
        return { backgroundColor: '#2196F3', color: 'white' };
      default:
        return {};
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '30%',
        left: '50%',
        textAlign: 'center',
        transform: 'translate(-50%, -50%)', // Centering the modal
        padding: '10px',
        borderRadius: '10px',
        height: '150px',
        zIndex: 1000,
        maxWidth: '400px', // Optional: set max width
        width: '150%', // Ensure it doesn't overflow
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Optional: add shadow for better UI
        ...getAlertStyle()
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{message}</span>
        <button
          onClick={onClose}
          style={{
            marginLeft: '10px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Alert;
