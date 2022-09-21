import React from 'react';
import { fireEvent, getByTestId, getByText, render, screen } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData'
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  global.fetch = jest.fn().mockReturnValue({
    json: jest.fn().mockReturnValue(testData)
  })
  render(<App />)
});

test('testa se tem o planeta Alderaan e quando filtrado por nome "ta" o planeta não seja mais renderizado', () => {
  const planet = screen.getByText(/Alderaan/i)
  expect(planet).toBeInTheDocument()
  const input = screen.getByTestId('name-filter')
  expect(input).toBeInTheDocument()
  userEvent.type(input, 'ta');
  expect(planet).not.toBeInTheDocument()
  expect(screen.getByText('Tatooine')).toBeInTheDocument()
});

test('testa o filtro "maior que"', () => {
  fireEvent.change(screen.getByTestId('column-filter'), {target: {value: 'diameter'}})
  fireEvent.change(screen.getByTestId('comparison-filter'), {target: {value: 'maior que'}})
  const input = screen.getByTestId('value-filter')
  userEvent.type(input, '12500');
  userEvent.click(screen.getByTestId('button-filter'))
  expect(screen.getByText(/Bespin/i)).toBeInTheDocument()
  const tr = screen.getAllByRole('row')
  expect(tr.length).toBe(3)
});

test('testa o filtro "menor que"', () => {
  fireEvent.change(screen.getByTestId('column-filter'), {target: {value: 'orbital_period'}})
  fireEvent.change(screen.getByTestId('comparison-filter'), {target: {value: 'menor que'}})
  const input = screen.getByTestId('value-filter')
  userEvent.type(input, '350');
  userEvent.click(screen.getByTestId('button-filter'))
  expect(screen.getByText(/Dagobah/i)).toBeInTheDocument()
  const tr = screen.getAllByRole('row')
  expect(tr.length).toBe(4)
});

test('testa o filtro "igual"', () => {
  fireEvent.change(screen.getByTestId('column-filter'), {target: {value: 'rotation_period'}})
  fireEvent.change(screen.getByTestId('comparison-filter'), {target: {value: 'igual a'}})
  const input = screen.getByTestId('value-filter')
  userEvent.type(input, '18');
  userEvent.click(screen.getByTestId('button-filter'))
  expect(screen.getByText(/Endor/i)).toBeInTheDocument()
  const tr = screen.getAllByRole('row')
  expect(tr.length).toBe(2)
});





//teste filtro maior
//teste o filtro menor
//teste o filtro =

//testa se ao filtrar usando population ela sai do array
