/// <reference path="../Core/RoutedEventArgs.ts" />
/// CODE
/// <reference path="../Primitives/Point.ts" />
/// <reference path="../Core/UIElement.ts" />

module Fayde.Input {
    export class MouseEventArgs extends RoutedEventArgs {
        private _AbsolutePos: Point;
        constructor(absolutePos: Point) {
            super();
            this._AbsolutePos = absolutePos;
        }
        GetPosition(relativeTo: UIElement): Point {
            //TODO: Implement
            return new Point();
        }
    }
    Nullstone.RegisterType(MouseEventArgs, "MouseEventArgs");

    export class MouseButtonEventArgs extends MouseEventArgs {
        constructor(absolutePos: Point) {
            super(absolutePos);
        }
    }
    Nullstone.RegisterType(MouseButtonEventArgs, "MouseButtonEventArgs");

    export class MouseWheelEventArgs extends MouseEventArgs {
        Delta: number;
        constructor(absolutePos: Point, delta: number) {
            super(absolutePos);
            this.Delta = delta;
        }
    }
    Nullstone.RegisterType(MouseWheelEventArgs, "MouseWheelEventArgs");
}