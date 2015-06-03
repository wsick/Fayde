/// <reference path="GradientBrush.ts" />

module Fayde.Media {
    interface IRadialPointData {
        x0: number;
        y0: number;
        x1: number;
        y1: number;
        r1: number;
        sx: number;
        sy: number;
        side: number;
        balanced: boolean;
    }

    var tmpCanvas: HTMLCanvasElement = document.createElement('canvas');
    var tmpCtx: CanvasRenderingContext2D = <CanvasRenderingContext2D>tmpCanvas.getContext('2d');
    var epsilon = 1E-10;

    export class RadialGradientBrush extends GradientBrush {
        static CenterProperty = DependencyProperty.RegisterCore("Center", () => Point, RadialGradientBrush, undefined, (d: RadialGradientBrush, args) => d.InvalidateBrush());
        static GradientOriginProperty = DependencyProperty.RegisterCore("GradientOrigin", () => Point, RadialGradientBrush, undefined, (d: RadialGradientBrush, args) => d.InvalidateBrush());
        static RadiusXProperty = DependencyProperty.RegisterCore("RadiusX", () => Number, RadialGradientBrush, 0.5, (d: RadialGradientBrush, args) => d.InvalidateBrush());
        static RadiusYProperty = DependencyProperty.RegisterCore("RadiusY", () => Number, RadialGradientBrush, 0.5, (d: RadialGradientBrush, args) => d.InvalidateBrush());
        Center: Point; //undefined should be treated as 0.5,0.5
        GradientOrigin: Point; //undefined should be treated as 0.5,0.5
        RadiusX: number;
        RadiusY: number;

        CreatePad (ctx: CanvasRenderingContext2D, bounds: minerva.Rect): any {
            var data = this._GetPointData(bounds);
            var grd = (!data.balanced ? tmpCtx : ctx).createRadialGradient(data.x0, data.y0, 0, data.x1, data.y1, data.r1);
            for (var en = this.GradientStops.getEnumerator(); en.moveNext();) {
                var stop: GradientStop = en.current;
                grd.addColorStop(stop.Offset, stop.Color.toString());
            }
            return this.CreatePattern(ctx, grd, data, bounds);
        }

        CreateRepeat (ctx: CanvasRenderingContext2D, bounds: minerva.Rect) {
            var data = this._GetPointData(bounds);
            var interpolator = RadialGradient.createRepeatInterpolator();
            //TODO: Implement
            return "";
        }

        CreateReflect (ctx: CanvasRenderingContext2D, bounds: minerva.Rect) {
            var data = this._GetPointData(bounds);
            var interpolator = RadialGradient.createReflectInterpolator();
            //TODO: Implement
            return "";
        }

        private CreatePattern (ctx: CanvasRenderingContext2D, grd: CanvasGradient, data: IRadialPointData, bounds: minerva.Rect) {
            if (data.balanced)
                return grd;

            tmpCanvas.width = bounds.width;
            tmpCanvas.height = bounds.height;

            tmpCtx.save();
            tmpCtx.scale(data.sx, data.sy);
            tmpCtx.fillStyle = grd;
            tmpCtx.fillRect(0, 0, data.side, data.side);
            var pattern = ctx.createPattern(tmpCanvas, "no-repeat");
            tmpCtx.restore();
            return pattern;
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

            var rad = Math.max(rx, ry);
            var side = Math.max(bounds.width, bounds.height),
                sx = bounds.width / side,
                sy = bounds.height / side;
            return {
                x0: origin.x / sx,
                y0: origin.y / sy,
                x1: center.x / sx,
                y1: center.y / sy,
                r1: rad,
                side: side,
                sx: bounds.width / side,
                sy: bounds.height / side,
                balanced: Math.abs(rx - ry) < epsilon
            };
        }
    }
    Fayde.CoreLibrary.add(RadialGradientBrush);
}