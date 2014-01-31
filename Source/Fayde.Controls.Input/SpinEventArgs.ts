/// <reference path="Fayde.d.ts" />

module Fayde.Controls.Input {
    export class SpinEventArgs extends RoutedEventArgs {
        Direction: SpinDirection;
        constructor(direction: SpinDirection) {
            super();
            Object.defineProperty(this, "Direction", { value: direction, writable: false });
        }
    }
}