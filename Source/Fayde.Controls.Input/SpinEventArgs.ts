/// <reference path="Fayde.d.ts" />
/// CODE
/// <reference path="Enums.ts" />

module Fayde.Controls.Input {
    export class SpinEventArgs extends RoutedEventArgs {
        Direction: SpinDirection;
        constructor(direction: SpinDirection) {
            super();
            Object.defineProperty(this, "Direction", { value: direction, writable: false });
        }
    }
    Fayde.RegisterType(SpinEventArgs, {
        Name: "SpinEventArgs",
        Namespace: "Fayde.Controls.Input"
    });
}