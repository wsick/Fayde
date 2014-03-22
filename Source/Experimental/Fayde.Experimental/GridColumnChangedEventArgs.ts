module Fayde.Experimental {
    export class GridColumnChangedEventArgs extends EventArgs {
        GridColumn: IGridColumn;
        constructor(col: IGridColumn) {
            super();
            Object.defineProperty(this, "GridColumn", { value: col, writable: false });
        }
    }
}