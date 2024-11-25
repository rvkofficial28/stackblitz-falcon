import { createAction, props } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';

export const loadGridData = createAction(
  '[Grid] Load Grid Data',
  props<{ startRow: number, endRow: number }>()
);

export const loadGridDataSuccess = createAction(
  '[Grid] Load Grid Data Success',
  props<{ rows: any[], totalRows: number, columnDefs: ColDef[] }>()
);

export const loadGridDataFailure = createAction(
  '[Grid] Load Grid Data Failure',
  props<{ error: any }>()
);
