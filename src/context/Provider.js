import React, { useState } from 'react';
import PropTypes from 'prop-types';
import starWarsContext from './starWarsContext';

function Provider({ children }) {
  const [planetList, setPlanetList] = useState([]);
  const [retornoApi, setRetornoApi] = useState([]);
  const [search, setSearch] = useState('');
  const [arrayOfFilters, setArrayOfFilters] = useState([]);
  const [arrayColumn, setArrayColumn] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  const fetchApi = async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    const data = await response.json();
    data.results.forEach((element) => { delete element.residents; });
    setRetornoApi(data.results);
    setPlanetList(data.results);
  };

  const contextValue = { planetList,
    fetchApi,
    setPlanetList,
    search,
    setSearch,
    retornoApi,
    arrayOfFilters,
    setArrayOfFilters,
    arrayColumn,
    setArrayColumn };

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
