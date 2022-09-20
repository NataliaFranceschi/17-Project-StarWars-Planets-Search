import React, { useContext, useEffect, useState } from 'react';
import starWarsContext from '../context/starWarsContext';

function Table() {
  const { planetList, fetchApi, keys } = useContext(starWarsContext);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchApi();
  }, []);

  const filteredApi = search.length > 0
    ? planetList.filter((planet) => planet.name.toLowerCase()
      .includes(search.toLowerCase()))
    : planetList;

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target }) => setSearch(target.value) }
      />
      <table>
        <thead>
          <tr>
            {keys.map((item, index) => (
              <th key={ index }>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredApi.map((planet, index) => (
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
