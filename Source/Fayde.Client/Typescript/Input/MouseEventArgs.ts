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
    Fayde.RegisterType(MouseEventArgs, {
    	Name: "MouseEventArgs",
    	Namespace: "Fayde.Input",
    	XmlNamespace: Fayde.XMLNS
    });

    export class MouseButtonEventArgs extends MouseEventArgs {
        constructor(absolutePos: Point) {
            super(absolutePos);
        }
    }
    Fayde.RegisterType(MouseButtonEventArgs, {
    	Name: "MouseButtonEventArgs",
    	Namespace: "Fayde.Input",
    	XmlNamespace: Fayde.XMLNS
    });

    export class MouseWheelEventArgs extends MouseEventArgs {
        Delta: number;
        constructor(absolutePos: Point, delta: number) {
            super(absolutePos);
            Object.defineProperty(this, "Delta", { value: delta, writable: false });
        }
    }
    Fayde.RegisterType(MouseWheelEventArgs, {
    	Name: "MouseWheelEventArgs",
    	Namespace: "Fayde.Input",
    	XmlNamespace: Fayde.XMLNS
    });
}