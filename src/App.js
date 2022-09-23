import React from 'react';
import './App.css';
import Filter from './components/Filter';
import Order from './components/Order';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Filter />
      <Order />
      <Table />
    </Provider>
  );
}

export default App;
