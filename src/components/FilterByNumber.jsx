import React, { useContext, useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import starWarsContext from '../context/starWarsContext';

function FilterByNumber() {
  const GREATER_THAN = 'greater than';
  const { setPlanetList, retornoApi, arrayColumn, setArrayColumn,
    setArrayOfFilters, arrayOfFilters } = useContext(starWarsContext);
  const [filter, setFilter] = useState(
    { column: 'population',
      comparison: GREATER_THAN,
      value: '0' },
  );

  useEffect(() => {
    setFilter({ column: arrayColumn[0],
      comparison: GREATER_THAN,
      value: '0' });
  }, [arrayColumn]);

  const filterByValue = (param) => {
    const { column, value, comparison } = param;
    switch (comparison) {
    case GREATER_THAN:
      setPlanetList((prevState) => prevState
        .filter((planet) => planet[column] > Number(value)));
      break;
    case 'less than':
      setPlanetList((prevState) => prevState
        .filter((planet) => planet[column] < Number(value)));
      break;
    default:
      setPlanetList((prevState) => prevState
        .filter((planet) => Number(planet[column]) === Number(value)));
    }
  };

  const filters = () => {
    setArrayColumn(arrayColumn.filter((item) => item !== filter.column));

    const newArray = arrayOfFilters.concat(filter);
    setArrayOfFilters(newArray);
  };

  useEffect(() => {
    arrayOfFilters.forEach((param) => filterByValue(param));
  }, [arrayOfFilters]);

  const removeAllFilters = () => {
    setPlanetList(retornoApi);
    setArrayColumn((['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water']));
    setArrayOfFilters([]);
  };

  return (
    <div className="number">
      <FormControl variant="standard" sx={ { m: 1, minWidth: 120 } }>
        <Select
          data-testid="column-filter"
          value={ filter.column }
          onChange={ ({ target }) => setFilter({ ...filter, column: target.value }) }
        >
          {
            arrayColumn.map((column, index) => (
              <MenuItem key={ index } value={ column }>{column}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={ { m: 1, minWidth: 120 } }>
        <Select
          data-testid="comparison-filter"
          value={ filter.comparison }
          onChange={ ({ target }) => setFilter({ ...filter,
            comparison: target.value }) }
        >
          <MenuItem value="greater than">greater than</MenuItem>
          <MenuItem value="less than">less than</MenuItem>
          <MenuItem value="equal to">equal to</MenuItem>
        </Select>
      </FormControl>
      <TextField
        sx={ { m: 1, width: 180 } }
        type="number"
        data-testid="value-filter"
        value={ filter.value }
        onChange={ ({ target }) => setFilter({ ...filter, value: target.value }) }
      />
      <Button
        sx={ { m: 1, p: 2 } }
        variant="outlined"
        type="button"
        data-testid="button-filter"
        onClick={ filters }
      >
        Filter
      </Button>
      <Button
        sx={ { m: 1, p: 2 } }
        variant="outlined"
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remove All Filters
      </Button>
    </div>
  );
}

export default FilterByNumber;
