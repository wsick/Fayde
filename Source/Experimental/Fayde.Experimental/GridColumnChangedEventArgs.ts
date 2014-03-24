module Fayde.Experimental {
    export class GridColumnChangedEventArgs extends EventArgs {
        GridColumn: GridColumn;
        constructor(col: GridColumn) {
            super();
            Object.defineProperty(this, "GridColumn", { value: col, writable: false });
        }
    }
}