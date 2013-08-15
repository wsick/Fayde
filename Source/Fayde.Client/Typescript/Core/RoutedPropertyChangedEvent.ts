/// <reference path="RoutedEvent.ts" />
/// CODE

module Fayde {
    export class RoutedPropertyChangedEvent<T> extends RoutedEvent<RoutedPropertyChangedEventArgs<T>> {
    }
    Nullstone.RegisterType(RoutedPropertyChangedEvent, "RoutedPropertyChangedEvent");

    export class RoutedPropertyChangedEventArgs<T> extends RoutedEventArgs {
        OldValue: T;
        NewValue: T;
        constructor(oldValue: T, newValue: T) {
            super();
            Object.defineProperty(this, "OldValue", { value: oldValue, writable: false });
            Object.defineProperty(this, "NewValue", { value: newValue, writable: false });
        }
    }
    Nullstone.RegisterType(RoutedPropertyChangedEventArgs, "RoutedPropertyChangedEventArgs");
}