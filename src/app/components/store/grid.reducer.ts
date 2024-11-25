import { createReducer, on } from '@ngrx/store';
import * as GridActions from './grid.actions';
import { ColDef } from 'ag-grid-community';

export interface GridState {
  rows: any[];
  totalRows: number;
  columnDefs: ColDef[];
}

export const initialState: GridState = {
  rows: [],
  totalRows: 0,
  columnDefs: []
};

export const gridReducer = createReducer(
  initialState,
  on(GridActions.loadGridDataSuccess, (state, { rows, totalRows, columnDefs }) => ({
    ...state,
    rows,
    totalRows,
    columnDefs
  }))
);
