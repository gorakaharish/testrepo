import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Container, Grid, Button, Stack, FormLabel } from '@mui/material';
import MainCard from 'components/MainCard'; // Assuming MainCard is a component in your project
import Alert from './Alert'; // Import Alert component

function About() {
  const [text, setText] = useState<string>('');
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleTextChange = (value: string) => {
    setText(value);
  };

  const handleSubmit = () => {
    if (!text.trim()) {
      setAlert({ type: 'error', message: 'Content cannot be empty! Please enter some text.' });
      return;
    }
    setAlert({ type: 'success', message: 'Content Submitted Successfully!' });
  };

  const handleCancel = () => {
    setText(''); // Clear the editor
  };

  const handleCloseAlert = () => {
    setAlert(null); // Close the alert
  };

  return (
    <Container sx={{ padding: '20px' }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <MainCard title="About">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={2.5} alignItems="center" sx={{ alignItems: 'center' }}>
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
                <ReactQuill
                  theme="snow"
                  value={text}
                  onChange={handleTextChange}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, false] }],
                      [{ size: '10px' }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ color: [] }, { background: [] }],
                      [{ list: 'ordered' }, { list: 'bullet' }],
                      ['link', 'image'],
                      [{ align: [] }],
                      ['blockquote', 'code-block'],
                      ['clean']
                    ]
                  }}
                  formats={[
                    'header',
                    'size',
                    'bold',
                    'italic',
                    'underline',
                    'strike',
                    'color',
                    'background',
                    'blockquote',
                    'code-block',
                    'list',
                    'align',
                    'bullet',
                    'link',
                    'image'
                  ]}
                />
                <Grid sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '10px' }}>
                  <Button
                    onClick={handleCancel}
                    variant="contained"
                    // sx={{
                    //   padding: '10px 20px',
                    //   backgroundColor: '#f44336',
                    //   color: 'white',
                    //   border: 'none',
                    //   borderRadius: '5px',
                    //   cursor: 'pointer'
                    // }}
                    color="error"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    // sx={{
                    //   padding: '10px 20px',
                    //   backgroundColor: '#4CAF50',
                    //   color: 'white',
                    //   border: 'none',
                    //   borderRadius: '5px',
                    //   cursor: 'pointer'
                    // }}
                    color="success"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>

      {/* Render Alert if available */}
      {alert && <Alert type={alert.type} message={alert?.message} onClose={handleCloseAlert} />}
    </Container>
  );
}

export default About;
