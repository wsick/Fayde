/// <reference path="../../Core/RoutedEventArgs.ts" />

module Fayde.Controls.Primitives {
    export class DragCompletedEventArgs extends RoutedEventArgs {
        HorizontalChange: number;
        VerticalChange: number;
        Canceled: boolean;
        constructor(horizontal: number, vertical: number, canceled: boolean) {
            super();
            Object.defineProperty(this, "HorizontalChange", { value: horizontal, writable: false });
            Object.defineProperty(this, "VerticalChange", { value: vertical, writable: false });
            Object.defineProperty(this, "Canceled", { value: canceled, writable: false });
        }
    }
    Fayde.RegisterType(DragCompletedEventArgs, {
    	Name: "DragCompletedEventArgs",
    	Namespace: "Fayde.Controls.Primitives",
    	XmlNamespace: Fayde.XMLNS
    });

    export class DragDeltaEventArgs extends RoutedEventArgs {
        HorizontalChange: number;
        VerticalChange: number;
        constructor(horizontal: number, vertical: number) {
            super();
            Object.defineProperty(this, "HorizontalChange", { value: horizontal, writable: false });
            Object.defineProperty(this, "VerticalChange", { value: vertical, writable: false });
        }
    }
    Fayde.RegisterType(DragDeltaEventArgs, {
    	Name: "DragDeltaEventArgs",
    	Namespace: "Fayde.Controls.Primitives",
    	XmlNamespace: Fayde.XMLNS
    });

    export class DragStartedEventArgs extends RoutedEventArgs {
        HorizontalOffset: number;
        VerticalOffset: number;
        constructor(horizontal: number, vertical: number) {
            super();
            Object.defineProperty(this, "HorizontalOffset", { value: horizontal, writable: false });
            Object.defineProperty(this, "VerticalOffset", { value: vertical, writable: false });
        }
    }
    Fayde.RegisterType(DragStartedEventArgs, {
    	Name: "DragStartedEventArgs",
    	Namespace: "Fayde.Controls.Primitives",
    	XmlNamespace: Fayde.XMLNS
    });
}