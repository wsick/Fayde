/// <reference path="Geometry.ts" />

module Fayde.Media {
    export class EllipseGeometry extends Geometry {
        static CenterProperty: DependencyProperty = DependencyProperty.Register("Center", () => Point, EllipseGeometry, undefined, (d, args) => (<Geometry>d)._InvalidateGeometry());
        static RadiusXProperty: DependencyProperty = DependencyProperty.Register("RadiusX", () => Number, EllipseGeometry, 0.0, (d, args) => (<Geometry>d)._InvalidateGeometry());
        static RadiusYProperty: DependencyProperty = DependencyProperty.Register("RadiusY", () => Number, EllipseGeometry, 0.0, (d, args) => (<Geometry>d)._InvalidateGeometry());
        Center: Point;
        RadiusX: number;
        RadiusY: number;

        _Build(): Path.RawPath {
            var rx = this.RadiusX;
            var ry = this.RadiusY;
            var center = this.Center;
            var x = center ? center.X : 0.0;
            var y = center ? center.Y : 0.0;

            var p = new Path.RawPath();
            p.Ellipse(x - rx, y - ry, rx * 2.0, ry * 2.0);
            return p;
        }
    }
    Fayde.RegisterType(EllipseGeometry, {
    	Name: "EllipseGeometry",
    	Namespace: "Fayde.Media",
    	XmlNamespace: Fayde.XMLNS
    });
}