/// <reference path="../Core/RoutedEventArgs.ts" />
/// CODE
/// <reference path="../Primitives/Point.ts" />
/// <reference path="../Core/UIElement.ts" />

module Fayde.Input {
    export class MouseEventArgs extends RoutedEventArgs {
        AbsolutePos: Point;
        constructor(absolutePos: Point) {
            super();
            Object.defineProperty(this, "AbsolutePos", { value: absolutePos, writable: false });
        }
        GetPosition(relativeTo: UIElement): Point {
            var p = this.AbsolutePos.Clone();
            if (!relativeTo)
                return p;
            if (!(relativeTo instanceof UIElement))
                throw new ArgumentException("Specified relative object must be a UIElement.");
            //TODO: If attached, should we run ProcessDirtyElements
            relativeTo.XamlNode.LayoutUpdater.TransformPoint(p);
            return p;
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
            Object.defineProperty(this, "Delta", { value: delta, writable: false });
        }
    }
    Nullstone.RegisterType(MouseWheelEventArgs, "MouseWheelEventArgs");
}