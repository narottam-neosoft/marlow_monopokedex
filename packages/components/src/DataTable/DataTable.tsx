import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IDataTableProps, RowData } from "./DataTable.types";
import { DataTableStyle, MainStyle } from "./DataTable.styles";
export const DataTable = ({
  rows,
  column,
  pageSizeOptions,
  onRowClick,
  getRowId,
  paginationModel,
  paginationModelChange,
  isLoading = false,
  rowCount,
}: IDataTableProps) => {
  return (
    <div style={MainStyle}>
      <DataGrid
      sx={DataTableStyle}
        rows={rows}
        columns={column}
        pageSizeOptions={pageSizeOptions}
        onRowClick={(row) => onRowClick(row)}
        rowCount={rowCount}
        getRowId={(row: RowData) => getRowId(row)}
        pagination
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={paginationModelChange}
        loading={isLoading}
      />
    </div>
  );
};
