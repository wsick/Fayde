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

    export class MouseButtonEventArgs extends MouseEventArgs {
        constructor(absolutePos: Point) {
            super(absolutePos);
        }
    }

    export class MouseWheelEventArgs extends MouseEventArgs {
        Delta: number;
        constructor(absolutePos: Point, delta: number) {
            super(absolutePos);
            this.Delta = delta;
        }
    }
}