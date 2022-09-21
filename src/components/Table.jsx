import React, { useContext, useEffect, useState } from 'react';
import starWarsContext from '../context/starWarsContext';

function Table() {
  const { planetList, fetchApi, keys, setPlanetList } = useContext(starWarsContext);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(
    { column: 'population',
      comparison: 'maior que',
      value: '0' },
  );
  const [arrayOfFilters, setArrayOfFilters] = useState([]);
  const [arrayColumn, setArrayColumn] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);

  useEffect(() => {
    fetchApi();
  }, []);

  const filterByName = search.length > 0
    ? planetList.filter((planet) => planet.name.toLowerCase()
      .includes(search.toLowerCase()))
    : planetList;

  const filterByValue = (param) => {
    const { column, value, comparison } = param;
    switch (comparison) {
    case 'maior que':
      setPlanetList(planetList.filter((planet) => planet[column] > Number(value)));
      break;
    case 'menor que':
      setPlanetList(planetList.filter((planet) => planet[column] < Number(value)));
      break;
    default:
      setPlanetList(planetList
        .filter((planet) => Number(planet[column]) === Number(value)));
    }
  };

  const filters = () => {
    const newArray = arrayOfFilters.concat(filter);
    setArrayOfFilters(newArray);
    newArray.forEach((param) => filterByValue(param));

    setArrayColumn(arrayColumn.filter((item) => item !== filter.column));
  };

  const removeFilter = ({ target }) => {
    setArrayColumn([...arrayColumn, arrayOfFilters[target.id].column]);
    arrayOfFilters.splice(target.id, 1);
    arrayOfFilters.forEach((param) => filterByValue(param));
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
              data-testeid="button-remove-filters"
              id={ index }
              onClick={ removeFilter }
            >
              Deletar

            </button>
          </div>
        ))
      }
      <table>
        <thead>
          <tr>
            {keys.map((item, index) => (
              <th key={ index }>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filterByName.map((planet, index) => (
            <tr key={ index }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>
                {planet.films.map((film, i) => (
                  <li key={ i }>{film}</li>
                ))}

              </td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
