/// <reference path="GradientBrush.ts" />

module Fayde.Media {
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
            var grd = this.CreateInterpolated(ctx, RadialGradient.createRepeatInterpolator(data, bounds));
            return this.CreatePattern(ctx, grd, data, bounds);
        }

        CreateReflect (ctx: CanvasRenderingContext2D, bounds: minerva.Rect) {
            var data = this._GetPointData(bounds);
            var grd = this.CreateInterpolated(ctx, RadialGradient.createReflectInterpolator(data, bounds));
            return this.CreatePattern(ctx, grd, data, bounds);
        }

        private CreatePattern (ctx: CanvasRenderingContext2D, grd: CanvasGradient, data: RadialGradient.IRadialPointData, bounds: minerva.Rect) {
            //NOTE:
            //  This will return the CanvasGradient if bounds are square
            //  Otherwise, it will create a CanvasPattern by scaling square coordinate space into bounds
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

        private CreateInterpolated (ctx: CanvasRenderingContext2D, interpolator: RadialGradient.IInterpolator): CanvasGradient {
            var grd = (!interpolator.balanced ? tmpCtx : ctx).createRadialGradient(interpolator.x0, interpolator.y0, 0, interpolator.x1, interpolator.y1, interpolator.r1);
            var allStops = this.GradientStops.getPaddedEnumerable();
            for (; interpolator.step();) {
                for (var en = allStops.getEnumerator(); en.moveNext();) {
                    var stop = en.current;
                    var offset = interpolator.interpolate(stop.Offset);
                    if (offset >= 0 && offset <= 1)
                        grd.addColorStop(offset, stop.Color.toString());
                }
            }
            return grd;
        }

        private _GetPointData (bounds: minerva.Rect): RadialGradient.IRadialPointData {
            //NOTE:
            //  This function will translate relative coordinates to absolute coordinates
            //  It will then map non-square metrics into square coordinate space
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