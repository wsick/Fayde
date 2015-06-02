/// <reference path="GradientBrush.ts" />

module Fayde.Media {
    interface IRadialPointData {
        center: Point;
        origin: Point;
        radiusX: number;
        radiusY: number;
    }

    var tmpCanvas: HTMLCanvasElement = document.createElement('canvas');
    var tmpCtx: CanvasRenderingContext2D = <CanvasRenderingContext2D>tmpCanvas.getContext('2d');

    export class RadialGradientBrush extends GradientBrush {
        static CenterProperty = DependencyProperty.RegisterCore("Center", () => Point, RadialGradientBrush, undefined, (d: RadialGradientBrush, args) => d.InvalidateBrush());
        static GradientOriginProperty = DependencyProperty.RegisterCore("GradientOrigin", () => Point, RadialGradientBrush, undefined, (d: RadialGradientBrush, args) => d.InvalidateBrush());
        static RadiusXProperty = DependencyProperty.RegisterCore("RadiusX", () => Number, RadialGradientBrush, 0.5, (d: RadialGradientBrush, args) => d.InvalidateBrush());
        static RadiusYProperty = DependencyProperty.RegisterCore("RadiusY", () => Number, RadialGradientBrush, 0.5, (d: RadialGradientBrush, args) => d.InvalidateBrush());
        Center: Point; //undefined should be treated as 0.5,0.5
        GradientOrigin: Point; //undefined should be treated as 0.5,0.5
        RadiusX: number;
        RadiusY: number;

        CreatePad (ctx: CanvasRenderingContext2D, bounds: minerva.Rect) {
            var pdata = this._GetPointData(bounds);
            //TODO: Implement
            return "";
        }

        CreateRepeat (ctx: CanvasRenderingContext2D, bounds: minerva.Rect) {
            //TODO: Implement
            return "";
        }

        CreateReflect (ctx: CanvasRenderingContext2D, bounds: minerva.Rect) {
            //TODO: Implement
            return "";
        }

        private _GetPointData (bounds: minerva.Rect): IRadialPointData {
            var center = this.Center;
            center = !center ? new Point(0.5, 0.5) : center.Clone();
            var origin = this.GradientOrigin;
            origin = !origin ? new Point(0.5, 0.5) : origin.Clone();
            var rx = this.RadiusX;
            if (rx == null)
                rx = 0.5;
            var ry = this.RadiusY;
            if (ry == null)
                ry = 0.5;

            if (this.MappingMode !== BrushMappingMode.Absolute) {
                center.x *= bounds.width;
                center.y *= bounds.height;
                origin.x *= bounds.width;
                origin.y *= bounds.height;
                rx *= bounds.width;
                ry *= bounds.height;
            }

            return {
                center: center,
                origin: origin,
                radiusX: rx,
                radiusY: ry
            };
        }
    }
    Fayde.CoreLibrary.add(RadialGradientBrush);
}