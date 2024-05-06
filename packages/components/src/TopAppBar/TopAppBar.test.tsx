import React from 'react';
import { render, screen } from '@testing-library/react';
import {TopAppBar} from './TopAppBar';

describe('TopAppBar', () => {
  const mockProps = {
    name: 'pokedex',
  };

  it('renders the app bar with correct props', () => {
    const {container} = render(<TopAppBar {...mockProps} />);

    expect(screen.getByText('pokedex')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
