/// <reference path="Geometry.ts" />

module Fayde.Media {
    export class RectangleGeometry extends Geometry {
        static RectProperty = DependencyProperty.RegisterCore("Rect", () => minerva.Rect, RectangleGeometry, undefined, (d: RectangleGeometry, args) => d.InvalidateGeometry());
        static RadiusXProperty = DependencyProperty.RegisterCore("RadiusX", () => Number, RectangleGeometry, 0, (d: RectangleGeometry, args) => d.InvalidateGeometry());
        static RadiusYProperty = DependencyProperty.RegisterCore("RadiusY", () => Number, RectangleGeometry, 0, (d: RectangleGeometry, args) => d.InvalidateGeometry());
        Rect: minerva.Rect;
        RadiusX: number;
        RadiusY: number;

        _Build (): Path.RawPath {
            var irect = this.Rect;
            if (!irect)
                return;

            var radiusX = this.RadiusX;
            var radiusY = this.RadiusY;

            var p = new Path.RawPath();
            p.RoundedRect(irect.x, irect.y, irect.width, irect.height, radiusX, radiusY);
            return p;
        }
    }
    Fayde.RegisterType(RectangleGeometry, "Fayde.Media", Fayde.XMLNS);
}