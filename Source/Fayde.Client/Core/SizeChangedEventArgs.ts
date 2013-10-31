/// <reference path="RoutedEventArgs.ts" />

module Fayde {
    export class SizeChangedEventArgs extends RoutedEventArgs {
        PreviousSize: size;
        NewSize: size;
        constructor(previousSize: size, newSize: size) {
            super();
            Object.defineProperty(this, "PreviousSize", { value: size.copyTo(previousSize), writable: false });
            Object.defineProperty(this, "NewSize", { value: size.copyTo(newSize), writable: false });
        }
    }
    Fayde.RegisterType(SizeChangedEventArgs, {
    	Name: "SizeChangedEventArgs",
    	Namespace: "Fayde",
    	XmlNamespace: Fayde.XMLNS
    });
}