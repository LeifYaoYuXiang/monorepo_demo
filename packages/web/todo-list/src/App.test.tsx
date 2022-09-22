import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { TodoModel } from "./models/todoModel";

const model = new TodoModel("todos-react");
test('renders learn react link', () => {
  render(<App  model={model}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
