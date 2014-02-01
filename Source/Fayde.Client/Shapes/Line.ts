/// <reference path="Shape.ts" />

module Fayde.Shapes {
    export class Line extends Shape {
        CreateLayoutUpdater(node: UINode) { return new LineLayoutUpdater(node); }

        private static _InvalidateCoordinate(dobj: DependencyObject, args: IDependencyPropertyChangedEventArgs) {
            var lu = <LineLayoutUpdater>(<Line>dobj).XamlNode.LayoutUpdater;
            lu[args.Property.Name] = args.NewValue || 0;
            lu.InvalidateNaturalBounds();
        }

        static X1Property: DependencyProperty = DependencyProperty.Register("X1", () => Number, Line, 0.0, Line._InvalidateCoordinate);
        static Y1Property: DependencyProperty = DependencyProperty.Register("Y1", () => Number, Line, 0.0, Line._InvalidateCoordinate);
        static X2Property: DependencyProperty = DependencyProperty.Register("X2", () => Number, Line, 0.0, Line._InvalidateCoordinate);
        static Y2Property: DependencyProperty = DependencyProperty.Register("Y2", () => Number, Line, 0.0, Line._InvalidateCoordinate);
        X1: number;
        Y1: number;
        X2: number;
        Y2: number;
    }
    Fayde.RegisterType(Line, "Fayde.Shapes", Fayde.XMLNS);

    export class LineLayoutUpdater extends ShapeLayoutUpdater {
        X1: number = 0;
        Y1: number = 0;
        X2: number = 0;
        Y2: number = 0;

        BuildPath(): Fayde.Path.RawPath {
            this.SFlags = ShapeFlags.Normal;

            var x1 = this.X1;
            var y1 = this.Y1;
            var x2 = this.X2;
            var y2 = this.Y2;
            
            var path = new Fayde.Path.RawPath();
            path.Move(x1, y1);
            path.Line(x2, y2);
            return path;
        }
    }
}