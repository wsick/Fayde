/// <reference path="Shape.ts" />
/// CODE

module Fayde.Shapes {
    export class Line extends Shape {
        static X1Property: DependencyProperty = DependencyProperty.Register("X1", () => Number, Line, 0.0, (d, args) => (<Shape>d)._InvalidateNaturalBounds());
        static Y1Property: DependencyProperty = DependencyProperty.Register("Y1", () => Number, Line, 0.0, (d, args) => (<Shape>d)._InvalidateNaturalBounds());
        static X2Property: DependencyProperty = DependencyProperty.Register("X2", () => Number, Line, 0.0, (d, args) => (<Shape>d)._InvalidateNaturalBounds());
        static Y2Property: DependencyProperty = DependencyProperty.Register("Y2", () => Number, Line, 0.0, (d, args) => (<Shape>d)._InvalidateNaturalBounds());
        X1: number;
        Y1: number;
        X2: number;
        Y2: number;

        _BuildPath(): Shapes.RawPath {
            this._ShapeFlags = ShapeFlags.Normal;

            var x1 = this.X1;
            var y1 = this.Y1;
            var x2 = this.X2;
            var y2 = this.Y2;
            
            var path = new RawPath();
            path.Move(x1, y1);
            path.Line(x2, y2);
            return path;
        }

        _ComputeShapeBounds(logical: boolean): rect {
            var shapeBounds = new rect();

            var thickness = 0;
            if (!logical)
                thickness = this.StrokeThickness;

            if (thickness <= 0.0 && !logical)
                return shapeBounds;

            var x1 = this.X1;
            var y1 = this.Y1;
            var x2 = this.X2;
            var y2 = this.Y2;

            rect.set(shapeBounds,
                Math.min(x1, x2),
                Math.min(y1, y2),
                Math.abs(x2 - x1),
                Math.abs(y2 - y1)
            );
            //TODO: Handle startcap, endcap, thickness

            return shapeBounds;
        }
    }
    Fayde.RegisterType(Line, {
    	Name: "Line",
    	Namespace: "Fayde.Shapes",
    	XmlNamespace: Fayde.XMLNS
    });
}