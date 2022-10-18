import React from 'react';
import { Container, Stack } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Header from "components/display/Header";
import Footer from "components/display/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeView from "views/Home";
import RegisterService from "views/RegisterService";
import InforView from "views/Infor";

import AppContext from './AppContext';

const THEME = createTheme({
  typography: {
    fontFamily: `"Rubik", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const [errorMessage, setErrorMessage] = React.useState('');
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorMessage('');
  };

  const showError = (message) => {
    setErrorMessage(message);
  };

  const contextValue = {
    showError
  }

  return (
    <ThemeProvider theme={THEME}>
      <AppContext.Provider value={contextValue}> 
      <BrowserRouter>
        <Container maxWidth="xl">
          <Stack minHeight="100vh" justifyContent="space-between">
            <Header />
            <Routes>
              <Route path="/my-profile" element={<InforView />} />
              <Route
                path="/register-service/:domain"
                element={<RegisterService />}
              />
              <Route path="/" element={<HomeView />} />
            </Routes>
            <Footer />
          </Stack>
          <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
        </Container>
      </BrowserRouter>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
