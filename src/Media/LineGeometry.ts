/// <reference path="Geometry.ts" />

module Fayde.Media {
    export class LineGeometry extends Geometry {
        static StartPointProperty = DependencyProperty.Register("StartPoint", () => Point, LineGeometry, undefined, (d: Geometry, args) => d.InvalidateGeometry());
        static EndPointProperty = DependencyProperty.Register("EndPoint", () => Point, LineGeometry, undefined, (d: Geometry, args) => d.InvalidateGeometry());
        StartPoint: Point;
        EndPoint: Point;

        _Build (): Path.RawPath {
            var p1 = this.StartPoint;
            var p2 = this.EndPoint;

            var p = new Path.RawPath();
            p.Move(p1.x, p1.y);
            p.Line(p2.x, p2.y);
            return p;
        }
    }
    Fayde.RegisterType(LineGeometry, "Fayde.Media", Fayde.XMLNS);
}