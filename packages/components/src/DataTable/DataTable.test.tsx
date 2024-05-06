import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import {DataTable} from './DataTable';

describe('DataTable', () => {
  const mockProps = {
    rows: [
      {name: 'Row 1', url:'https//pokemon.com' },
      {name: 'Row 2', url:'https//pokemon.com' },
    ],
    column: [
      { field: 'name', headerName: 'name' },
      { field: 'url', headerName: 'url' },
    ],
    pageSizeOptions: [5, 10, 20],
    onRowClick: jest.fn(),
    getRowId: (row) => row.name,
    paginationModel: { page: 1, pageSize: 10 },
    paginationModelChange: jest.fn(),
    isLoading: false,
    rowCount: 2,
  };

  it('renders the DataGrid component with correct props', () => {
    const {container} = render(<DataTable {...mockProps} />);

    expect(screen.getByRole('grid')).toBeInTheDocument();
    expect(screen.getByText('Row 1')).toBeInTheDocument();
    expect(screen.getByText('Row 2')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
    
  });

  it('calls onRowClick when a row is clicked', () => {
    const {container} = render(<DataTable {...mockProps} />);
    const row = screen.getByText('Row 1');
    row.click();
   
    expect(mockProps.onRowClick).toHaveBeenCalledTimes(1);
    expect(container).toMatchSnapshot();
});

});
