import { createSelector, createFeatureSelector } from '@ngrx/store';
import { GridState } from './grid.reducer';

export const selectGridState = createFeatureSelector<GridState>('grid');

export const selectGridRows = createSelector(
  selectGridState,
  (state: GridState) => state.rows
);

export const selectGridTotalRows = createSelector(
  selectGridState,
  (state: GridState) => state.totalRows
);

export const selectGridColumnDefs = createSelector(
  selectGridState,
  (state: GridState) => state.columnDefs
);

export function selectGridLoading(selectGridLoading: any): import("rxjs").Observable<boolean> {
  throw new Error("Function not implemented.");
}
