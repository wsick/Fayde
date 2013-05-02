/// <reference path="../../Core/RoutedEventArgs.ts" />
/// CODE

module Fayde.Controls.Primitives {
    export class DragCompletedEventArgs extends RoutedEventArgs {
        private _HorizontalChange: number;
        get HorizontalChange(): number { return this._HorizontalChange; }
        private _VerticalChange: number;
        get VerticalChange(): number { return this._VerticalChange; }
        private _Canceled: bool;
        get Canceled(): bool { return this._Canceled; }

        constructor(horizontal: number, vertical: number, canceled: bool) {
            super();
            this._HorizontalChange = horizontal;
            this._VerticalChange = vertical;
            this._Canceled = canceled;
        }
    }
    Nullstone.RegisterType(DragCompletedEventArgs, "DragCompletedEventArgs");

    export class DragDeltaEventArgs extends RoutedEventArgs {
        private _HorizontalChange: number;
        get HorizontalChange(): number { return this._HorizontalChange; }
        private _VerticalChange: number;
        get VerticalChange(): number { return this._VerticalChange; }
        constructor(horizontal: number, vertical: number) {
            super();
            this._HorizontalChange = horizontal;
            this._VerticalChange = vertical;
        }
    }
    Nullstone.RegisterType(DragDeltaEventArgs, "DragDeltaEventArgs");

    export class DragStartedEventArgs extends RoutedEventArgs {
        private _HorizontalOffset: number;
        get HorizontalOffset(): number { return this._HorizontalOffset; }
        private _VerticalOffset: number;
        get VerticalOffset(): number { return this._VerticalOffset; }
        constructor(horizontal: number, vertical: number) {
            super();
            this._HorizontalOffset = horizontal;
            this._VerticalOffset = vertical;
        }
    }
    Nullstone.RegisterType(DragStartedEventArgs, "DragStartedEventArgs");
}