import React, { useState, useContext } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import starWarsContext from '../context/starWarsContext';

function Order() {
  const { planetList, setPlanetList } = useContext(starWarsContext);

  const options = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const [orderOption, setOrderOption] = useState(
    { column: 'population', sort: '' },
  );

  const orderingWithUnknown = () => {
    const { column } = orderOption;
    const unknownList = planetList.filter((planet) => planet[column] === 'unknown');
    const listWithoutUnknown = planetList
      .filter((planet) => planet[column] !== 'unknown');
    const asc = listWithoutUnknown.sort((a, b) => a[column] - b[column]);
    return [...asc, ...unknownList];
  };

  const orderList = () => {
    const { column, sort } = orderOption;
    const desc = planetList
      .sort((a, b) => b[column] - a[column]);
    switch (sort) {
    case 'ASC':
      setPlanetList(orderingWithUnknown());
      break;
    default:
      setPlanetList([...desc]);
    }
  };

  return (
    <>
      <FormControl variant="standard" sx={ { m: 1, minWidth: 120 } }>
        <Select
          data-testid="column-sort"
          value={ orderOption.column }
          onChange={ ({ target }) => setOrderOption({
            ...orderOption, column: target.value }) }
        >
          {
            options.map((column, index) => (
              <MenuItem key={ index } value={ column }>{column}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <FormControl>
        <RadioGroup>
          <FormControlLabel
            type="radio"
            name="typeOrder"
            value="ASC"
            data-testid="column-sort-input-asc"
            onChange={ ({ target }) => setOrderOption({
              ...orderOption, sort: target.value }) }
            label="Ascending"
            control={ <Radio /> }
          />
          <FormControlLabel
            type="radio"
            name="typeOrder"
            value="DESC"
            data-testid="column-sort-input-desc"
            onChange={ ({ target }) => setOrderOption({
              ...orderOption, sort: target.value }) }
            label="Descending"
            control={ <Radio /> }
          />
        </RadioGroup>
      </FormControl>
      <Button
        sx={ { p: 2 } }
        variant="outlined"
        type="button"
        data-testid="column-sort-button"
        onClick={ orderList }
      >
        Sort

      </Button>
    </>
  );
}

export default Order;
