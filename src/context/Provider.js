import React, { useState } from 'react';
import PropTypes from 'prop-types';
import starWarsContext from './starWarsContext';

function Provider({ children }) {
  const [planetList, setPlanetList] = useState([]);
  const [retornoApi, setRetornoApi] = useState([]);
  const [keys, setKeys] = useState([]);
  const [search, setSearch] = useState('');

  const fetchApi = async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const data = await response.json();
    data.results.forEach((element) => { delete element.residents; });
    setRetornoApi(data.results);
    setPlanetList(data.results);
    setKeys(Object.keys(data.results[0]));
  };

  const contextValue = { planetList,
    keys,
    fetchApi,
    setPlanetList,
    search,
    setSearch,
    retornoApi };
  return (
    <starWarsContext.Provider value={ contextValue }>
      {children}
    </starWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
