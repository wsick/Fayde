/// <reference path="RoutedEventArgs.ts" />
/// CODE
/// <reference path="../Primitives/size.ts" />

module Fayde {
    export class SizeChangedEventArgs extends RoutedEventArgs {
        PreviousSize: size;
        NewSize: size;
        constructor(previousSize: size, newSize: size) {
            super();
            Object.defineProperty(this, "PreviousSize", { value: size.clone(previousSize), writable: false });
            Object.defineProperty(this, "NewSize", { value: size.clone(newSize), writable: false });
        }
    }
    Nullstone.RegisterType(SizeChangedEventArgs, "SizeChangedEventArgs");
}