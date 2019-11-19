import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import List from './components/List';
import Modal from './components/Modal';

describe('<App/>', () => {
  it('render without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText('Supermarket List')).toBeInTheDocument();
  });
});

describe('<List />', () => {
  it('show message when list is empty', () => {
    const { getByText } = render(<List list={[]} />);
    expect(
      getByText('Oops! You dont have items in the list, But you can add one!')
    ).toBeInTheDocument();
  });

  it('render list', () => {
    const mockList = [
      {
        id: 0,
        title: 'Product One'
      }
    ];
    const { getByText } = render(<List list={mockList} />);
    expect(getByText('Product One')).toBeInTheDocument();
  });
});

describe('<Modal />', () => {
  it('disabled button if input is empty', () => {
    const mockAdd = jest.fn();
    const { getByText } = render(<Modal addItem={mockAdd} />);
    const button = getByText('Add');
    expect(button).toBeDisabled();
  });
});
