/// <reference path="../../Runtime/EventArgs.ts" />
/// CODE

module Fayde.Controls.Primitives {
    export class SelectionChangedEventArgs extends EventArgs {
        private _OldValues: any[];
        get OldValues(): any[] { return this._OldValues; }
        private _NewValues: any[];
        get NewValues(): any[] { return this._NewValues; }
        constructor(oldValues: any[], newValues: any[]) {
            super();
            this._OldValues = oldValues.slice(0);
            this._NewValues = newValues.slice(0);
        }
    }
    Nullstone.RegisterType(SelectionChangedEventArgs, "SelectionChangedEventArgs");
}