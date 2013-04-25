/// <reference path="Shape.ts" />
/// CODE

module Fayde.Shapes {
    function extendLine(p1: Point, p2: Point, thickness: number) {
        var t5 = thickness * 5.0;
        var dx = p1.X - p2.X;
        var dy = p1.Y - p2.Y;

        if (dy === 0.0) {
            t5 -= thickness / 2.0;
            if (dx > 0.0) {
                p1.X += t5;
                p2.X -= t5;
            } else {
                p1.X -= t5;
                p2.X += t5;
            }
        } else if (dx === 0.0) {
            t5 -= thickness / 2.0;
            if (dy > 0.0) {
                p1.Y += t5;
                p2.Y -= t5;
            } else {
                p1.Y -= t5;
                p2.Y += t5;
            }
        } else {
            var angle = Math.atan2(dy, dx);
            var ax = Math.abs(Math.sin(angle) * t5);
            if (dx > 0.0) {
                p1.X += ax;
                p2.X -= ax;
            } else {
                p1.X -= ax;
                p2.X += ax;
            }
            var ay = Math.abs(Math.sin(Math.PI / 2 - angle)) * t5;
            if (dy > 0.0) {
                p1.Y += ay;
                p2.Y -= ay;
            } else {
                p1.Y -= ay;
                p2.Y += ay;
            }
        }
    }
    export class Polyline extends Shape {
        private _Path: RawPath; //defined in Shape
        private _ShapeFlags: ShapeFlags; //defined in Shape
        private _Stroke: Media.Brush; //defined in Shape

        static FillRuleProperty: DependencyProperty = DependencyProperty.RegisterCore("FillRule", () => new Enum(FillRule), Polyline, FillRule.EvenOdd, (d, args) => (<Polyline>d)._FillRuleChanged(args));
        //TODO: Points Converter
        static PointsProperty: DependencyProperty = DependencyProperty.RegisterFull("Points", () => PointCollection, Polyline, undefined, (d, args) => (<Shape>d)._InvalidateNaturalBounds());
        FillRule: FillRule;
        Points: PointCollection;

        private _BuildPath() {
            var points = this.Points;
            var count;
            if (!points || (count = points.Count) < 2) {
                this._ShapeFlags = ShapeFlags.Empty;
                return;
            }

            this._ShapeFlags = ShapeFlags.Normal;

            var path = new RawPath();
            var enumerator = points.GetEnumerator();
            enumerator.MoveNext();
            var p = <Point>enumerator.Current;
            path.Move(p.X, p.Y);
            while (enumerator.MoveNext()) {
                p = enumerator.Current;
                path.Line(p.X, p.Y);
            }
            path.Close();
            this._Path = path;
        }
        private _FillRuleChanged(args: IDependencyPropertyChangedEventArgs) {
            this.XamlNode.LayoutUpdater.Invalidate();
        }
    }
    Nullstone.RegisterType(Polyline, "Polyline");
}