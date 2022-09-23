import React, { useContext, useEffect } from 'react';
import starWarsContext from '../context/starWarsContext';

function Table() {
  const { planetList, fetchApi, search, keys } = useContext(starWarsContext);

  useEffect(() => {
    fetchApi();
  }, []);

  const filterByName = search.length > 0
    ? planetList.filter((planet) => planet.name.toLowerCase()
      .includes(search.toLowerCase()))
    : planetList;

  return (
    <div>
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
              <td data-testid="planet-name">{planet.name}</td>
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
