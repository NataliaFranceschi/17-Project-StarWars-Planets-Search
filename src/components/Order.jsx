import React, { useState, useContext } from 'react';
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
    <div>
      <select
        data-testid="column-sort"
        onChange={ ({ target }) => setOrderOption({
          ...orderOption, column: target.value }) }
      >
        {
          options.map((column, index) => (
            <option key={ index } value={ column }>{column}</option>
          ))
        }
      </select>
      <input
        type="radio"
        name="typeOrder"
        value="ASC"
        data-testid="column-sort-input-asc"
        onChange={ ({ target }) => setOrderOption({
          ...orderOption, sort: target.value }) }
      />
      Ascendente
      <input
        type="radio"
        name="typeOrder"
        value="DESC"
        data-testid="column-sort-input-desc"
        onChange={ ({ target }) => setOrderOption({
          ...orderOption, sort: target.value }) }
      />
      Descendente
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ orderList }
      >
        Ordenar

      </button>
    </div>
  );
}

export default Order;
