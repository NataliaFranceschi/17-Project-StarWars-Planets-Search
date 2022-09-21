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

  useEffect(() => {
    fetchApi();
  }, []);

  const filterByName = search.length > 0
    ? planetList.filter((planet) => planet.name.toLowerCase()
      .includes(search.toLowerCase()))
    : planetList;

  const filterByValue = () => {
    const { column, value } = filter;
    switch (filter.comparison) {
    case 'maior que':
      setPlanetList(filterByName.filter((planet) => planet[column] > Number(value)));
      break;
    case 'menor que':
      setPlanetList(filterByName.filter((planet) => planet[column] < Number(value)));
      break;
    default:
      setPlanetList(filterByName.filter((planet) => planet[column] === value));
    }
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
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
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
        onClick={ filterByValue }
      >
        {' '}
        Filtrar

      </button>
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
