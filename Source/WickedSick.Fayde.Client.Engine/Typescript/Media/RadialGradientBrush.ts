/// <reference path="GradientBrush.ts" />
/// <reference path="../Primitives/Point.ts" />
/// CODE

module Fayde.Media {
    export class RadialGradientBrush extends GradientBrush {
        static CenterProperty: DependencyProperty = DependencyProperty.RegisterCore("Center", () => Point, RadialGradientBrush, new Point(0.5, 0.5));
        static GradientOriginProperty: DependencyProperty = DependencyProperty.RegisterCore("GradientOrigin", () => Point, RadialGradientBrush, new Point(0.5, 0.5));
        static RadiusXProperty: DependencyProperty = DependencyProperty.RegisterCore("RadiusX", () => Number, RadialGradientBrush, 0.5);
        static RadiusYProperty: DependencyProperty = DependencyProperty.RegisterCore("RadiusY", () => Number, RadialGradientBrush, 0.5);
        Center: Point;
        GradientOrigin: Point;
        RadiusX: number;
        RadiusY: number;

        CreateBrush(ctx: CanvasRenderingContext2D, bounds: rect): any {
            //TODO: Implement
            return undefined;
        }
    }
}