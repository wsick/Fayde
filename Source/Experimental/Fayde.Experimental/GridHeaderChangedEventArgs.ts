module Fayde.Experimental {
    export class GridHeaderChangedEventArgs extends EventArgs {
        GridHeader: GridHeader;
        constructor(header: GridHeader) {
            super();
            Object.defineProperty(this, "GridHeader", { value: header, writable: false });
        }
    }
}