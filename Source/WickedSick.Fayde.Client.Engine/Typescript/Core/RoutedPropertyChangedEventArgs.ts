/// <reference path="RoutedEventArgs.ts" />
/// CODE

module Fayde {
    export class RoutedPropertyChangedEventArgs extends RoutedEventArgs {
        OldValue: any;
        NewValue: any;
        constructor(oldValue: any, newValue: any) {
            super();
            Object.defineProperty(this, "OldValue", { value: oldValue, writable: false });
            Object.defineProperty(this, "NewValue", { value: newValue, writable: false });
        }
    }
    Nullstone.RegisterType(RoutedPropertyChangedEventArgs, "RoutedPropertyChangedEventArgs");
}