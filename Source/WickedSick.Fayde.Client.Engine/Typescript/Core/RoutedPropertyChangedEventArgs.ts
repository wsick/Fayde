/// <reference path="RoutedEventArgs.ts" />
/// CODE

module Fayde {
    export class RoutedPropertyChangedEventArgs extends RoutedEventArgs {
        private _OldValue: any;
        get OldValue(): any { return this._OldValue; }
        private _NewValue: any;
        get NewValue(): any { return this._NewValue; }
        constructor(oldValue: any, newValue: any) {
            super();
            this._OldValue = oldValue;
            this._NewValue = newValue;
        }
    }
    Nullstone.RegisterType(RoutedPropertyChangedEventArgs, "RoutedPropertyChangedEventArgs");
}