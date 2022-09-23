import React, { useContext, useState, useEffect } from 'react';
import starWarsContext from '../context/starWarsContext';

function Filter() {
  const { setPlanetList, setSearch,
    retornoApi } = useContext(starWarsContext);
  const [arrayOfFilters, setArrayOfFilters] = useState([]);
  const [filter, setFilter] = useState(
    { column: 'population',
      comparison: 'maior que',
      value: '0' },
  );
  const [arrayColumn, setArrayColumn] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  useEffect(() => {
    setFilter({ column: arrayColumn[0],
      comparison: 'maior que',
      value: '0' });
  }, [arrayColumn]);

  const filterByValue = (param) => {
    const { column, value, comparison } = param;
    switch (comparison) {
    case 'maior que':
      setPlanetList((prevState) => prevState
        .filter((planet) => planet[column] > Number(value)));
      break;
    case 'menor que':
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

  const removeFilter = (column) => {
    setPlanetList(retornoApi);
    setArrayColumn([...arrayColumn, column]);
    const test = arrayOfFilters.filter((element) => element.column !== column);
    setArrayOfFilters(test);
  };

  const removeAllFilters = () => {
    setPlanetList(retornoApi);
    setArrayColumn((['population', 'orbital_period',
      'diameter', 'rotation_period', 'surface_water']));
    setArrayOfFilters([]);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target }) => setSearch(target.value) }
      />
      <select
        data-testid="column-filter"
        value={ filter.column }
        onChange={ ({ target }) => setFilter({ ...filter, column: target.value }) }
      >
        {
          arrayColumn.map((column, index) => (
            <option key={ index } value={ column }>{column}</option>
          ))
        }
      </select>
      <select
        data-testid="comparison-filter"
        value={ filter.comparison }
        onChange={ ({ target }) => setFilter({ ...filter, comparison: target.value }) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ filter.value }
        onChange={ ({ target }) => setFilter({ ...filter, value: target.value }) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ filters }
      >
        {' '}
        Filtrar

      </button>
      {
        arrayOfFilters.map((element, index) => (
          <div data-testid="filter" key={ index }>
            <span>{element.column}</span>
            <span>{element.comparison}</span>
            <span>{element.value}</span>
            <button
              type="button"
              onClick={ () => removeFilter(element.column) }
            >
              Deletar

            </button>
          </div>
        ))
      }
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remover todas filtragens
      </button>
    </div>
  );
}

export default Filter;
