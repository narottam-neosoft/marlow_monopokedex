import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
const PAGE_SIZE = 10;
export type GridColumnDef = GridColDef;
export type RowData = { name: string; url: string };

export interface IDataTableProps{
    rows: RowData[];
    column: GridColDef[];
    onRowClick: ({ row }: { row: RowData }) => void;
    getRowId: (row: RowData) => string | number;
    pageSizeOptions:number[];
    paginationModel:{page:number, pageSize:number},
    paginationModelChange:(arg:GridPaginationModel)=>void,
    isLoading:boolean
    rowCount:number
  };