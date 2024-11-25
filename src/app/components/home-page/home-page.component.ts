import { Component, OnInit } from "@angular/core";
import { Store } from '@ngrx/store';
import { ColDef, GetRowIdFunc, GridReadyEvent, IDatasource, IGetRowsParams, RowModelType, ValueGetterParams } from "ag-grid-community";
import { selectGridRows, selectGridTotalRows, selectGridColumnDefs } from "../store/grid.selectors";
import { GridState } from '../store/grid.reducer';
import * as GridActions from '../store/grid.actions';

@Component({
  selector: "home-page",
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public columnDefs: ColDef[] = [];
  public rowData: any[] = []; 
  

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
    sortable: true,
    resizable: true,
    enableRowGroup: true,
    enableValue: true,
  };

  public autoGroupColumnDef: ColDef = {
    minWidth: 200,
    headerName: 'Group',
    valueGetter: (params: ValueGetterParams) => {
      const groupColumnName = this.columnDefs.find(colDef => colDef.rowGroup)?.field;
      return params.node && groupColumnName ? params.data[groupColumnName] : null;
    },
  };
  getRowId: GetRowIdFunc<any>|undefined;

  public rowModelType: RowModelType = 'clientSide';
  public cacheBlockSize = 100;
  public maxConcurrentDatasourceRequests = 2;
  public infiniteInitialRowCount = 1000;

  public dataSource: IDatasource | undefined;

  public sideBar: any = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
      },
      {
        id: 'filters',
        labelDefault: 'Filters',
        labelKey: 'filters',
        iconKey: 'filter',
        toolPanel: 'agFiltersToolPanel',
      },
    ],
    defaultToolPanel: 'columns'
  };

  public themeClass: string = "ag-theme-quartz";

  constructor(private store: Store<{ grid: GridState }>) {}

  ngOnInit() {
    console.log('Initializing HomePageComponent');
    this.loadData();
    this.setupColumnDefs();
  }

  loadData() {
    console.log('Loading data');
    this.store.dispatch(GridActions.loadGridData({ startRow: 0, endRow: -1 }));
  
    this.store.select(selectGridRows).subscribe(
      rows => {
        console.log('Received rows:', rows);
        if (Array.isArray(rows) && rows.length > 0) {
          this.rowData = rows;
        } else {
          console.warn('No data received from the store');
          this.rowData = []; // Set rowData to an empty array to display the "No rows to show" message
        }
      },
      error => console.error('Error selecting rows:', error)
    );
  }
  

  setupColumnDefs() {
    this.store.select(selectGridColumnDefs).subscribe(
      columnDefs => {
        console.log('Received column definitions:', columnDefs);
        this.columnDefs = columnDefs.map(colDef => {
          const columnName = colDef.field; // Get the column name from the field property
          return {
            ...colDef,
            rowGroup: columnName === 'make' || columnName === 'model', // Set rowGroup based on column name
          };
        });
      },
      error => console.error('Error selecting column definitions:', error)
    );
  }

  onGridReady(params: GridReadyEvent) {
    console.log('Grid ready event fired');
  }

  enableRangeSelection: boolean = true;
  rowSelection: 'multiple' | 'single' | undefined = 'multiple';
  enableCharts: boolean = true;
  rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' | undefined = 'always';
  suppressAggFuncInHeader: boolean = true;
  groupDefaultExpanded = -1;

  colDefs: ColDef[] = [];

  statusBar = {
    statusPanels: [
      { statusPanel: 'agTotalAndFilteredRowCountComponent' },
      { statusPanel: 'agTotalRowCountComponent' },
      { statusPanel: 'agFilteredRowCountComponent' },
      { statusPanel: 'agSelectedRowCountComponent' },
      { statusPanel: 'agAggregationComponent' },
    ],
  };
}
