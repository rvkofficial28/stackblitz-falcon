import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as GridActions from './grid.actions';
import { ColDef } from 'ag-grid-community';

@Injectable()
export class GridEffects {
  loadGridData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GridActions.loadGridData),
      mergeMap(({ startRow, endRow }) => {
        console.log('Fetching data');
        return this.http.get<any>('assets/falcondata.json').pipe(
          map(parsedData => {
            console.log('Raw data received:', parsedData);

            // Check if the data is an array of objects
            if (Array.isArray(parsedData) && parsedData.length > 0 && typeof parsedData[0] === 'object') {
              const columnDefs: ColDef[] = Object.keys(parsedData[0]).map(key => ({
                field: key,
                headerName: this.formatHeaderName(key),
                filter: true,
                sortable: true
              }));
              console.log('Generated column definitions:', columnDefs);

              const rows = parsedData.slice(startRow, endRow);
              const totalRows = parsedData.length;

              return GridActions.loadGridDataSuccess({ rows, totalRows, columnDefs });
            } else {
              console.error('Invalid data structure:', parsedData);
              return GridActions.loadGridDataFailure({ error: 'Invalid data structure' });
            }
          }),
          catchError(error => {
            console.error('Error loading data:', error);
            return of(GridActions.loadGridDataFailure({ error }));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  private formatHeaderName(key: string): string {
    return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
}
