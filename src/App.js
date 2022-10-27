import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Filter from './components/Filter';
import Table from './components/Table';
import Provider from './context/Provider';
import logo from './logo.png';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffff00',
    },
    text: {
      primary: '#ffffff',
    },
    background: {
      paper: '#2E3035',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={ theme }>
      <Provider>
        <div className="starWarsPlanet">
          <img src={ logo } alt="logo" width={ 500 } />
          <div className="app">
            <Filter />
            <Table />
          </div>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
