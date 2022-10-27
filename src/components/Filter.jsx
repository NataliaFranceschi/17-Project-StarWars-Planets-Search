import React, { useContext } from 'react';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import starWarsContext from '../context/starWarsContext';
import Order from './Order';
import FilterByNumber from './FilterByNumber';

function Filter() {
  const { setPlanetList, setSearch, arrayColumn, setArrayColumn,
    retornoApi, arrayOfFilters, setArrayOfFilters } = useContext(starWarsContext);

  const removeFilter = (column) => {
    setPlanetList(retornoApi);
    setArrayColumn([...arrayColumn, column]);
    const test = arrayOfFilters.filter((element) => element.column !== column);
    setArrayOfFilters(test);
  };

  return (
    <div className="filter">
      <TextField
        label="Planet Name"
        type="text"
        data-testid="name-filter"
        onChange={ ({ target }) => setSearch(target.value) }
      />
      <div className="filterNumberAndOrder">
        <FilterByNumber />
        <Order />
      </div>
      {
        arrayOfFilters.map((element, index) => (
          <div data-testid="filter" className="usedFilter" key={ index }>
            <span>{`${element.column} ${element.comparison} ${element.value}`}</span>
            <DeleteIcon
              onClick={ () => removeFilter(element.column) }
            />
          </div>
        ))
      }
    </div>
  );
}

export default Filter;
