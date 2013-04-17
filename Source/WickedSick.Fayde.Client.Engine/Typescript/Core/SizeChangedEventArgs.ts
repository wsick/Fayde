/// <reference path="RoutedEventArgs.ts" />
/// CODE
/// <reference path="../Primitives/size.ts" />

module Fayde {
    export class SizeChangedEventArgs extends RoutedEventArgs {
        PreviousSize: size;
        NewSize: size;
        constructor(previousSize: size, newSize: size) {
            super();
            Object.defineProperty(this, "PreviousSize", {
                get: function () { return size.clone(previousSize); }
            });
            Object.defineProperty(this, "NewSize", {
                get: function () { return size.clone(newSize); }
            });
        }
    }
}