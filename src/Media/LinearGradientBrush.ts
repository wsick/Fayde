/// <reference path="GradientBrush.ts" />

module Fayde.Media {
    export class LinearGradientBrush extends GradientBrush {
        static StartPointProperty = DependencyProperty.RegisterCore("StartPoint", () => Point, LinearGradientBrush, undefined, (d: LinearGradientBrush, args) => d.InvalidateBrush());
        static EndPointProperty = DependencyProperty.RegisterCore("EndPoint", () => Point, LinearGradientBrush, undefined, (d: LinearGradientBrush, args) => d.InvalidateBrush());
        StartPoint: Point;
        EndPoint: Point;

        CreatePad (ctx: CanvasRenderingContext2D, bounds: minerva.Rect) {
            var data = this._GetPointData(bounds);
            var start = data.start;
            var end = data.end;
            var grd = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
            for (var en = this.GradientStops.getEnumerator(); en.moveNext();) {
                var stop: GradientStop = en.current;
                grd.addColorStop(stop.Offset, stop.Color.toString());
            }
            return grd;
        }

        CreateRepeat (ctx: CanvasRenderingContext2D, bounds: minerva.Rect): any {
            var data = this._GetPointData(bounds);
            var interpolator = LinearGradient.createRepeatInterpolator(data.start, data.end, bounds);
            var grd = ctx.createLinearGradient(interpolator.x0, interpolator.y0, interpolator.x1, interpolator.y1);
            var allStops = this.GradientStops.getPaddedEnumerable();
            for (; interpolator.step();) {
                for (var en = allStops.getEnumerator(); en.moveNext();) {
                    var stop = en.current;
                    grd.addColorStop(interpolator.interpolate(stop.Offset), stop.Color.toString());
                }
            }
            return grd;
        }

        CreateReflect (ctx: CanvasRenderingContext2D, bounds: minerva.Rect) {
            var data = this._GetPointData(bounds);
            var start = data.start;
            var end = data.end;
            //TODO: Implement
        }

        private _GetPointData (bounds: minerva.Rect) {
            var start = this.StartPoint;
            start = !start ? new Point(0.0, 0.0) : start.Clone();
            var end = this.EndPoint;
            end = !end ? new Point(1.0, 1.0) : end.Clone();

            if (this.MappingMode !== BrushMappingMode.Absolute) {
                start.x *= bounds.width;
                start.y *= bounds.height;
                end.x *= bounds.width;
                end.y *= bounds.height;
            }
            return {
                start: start,
                end: end
            };
        }

        toString (): string {
            var ser = [];
            for (var en = this.GradientStops.getEnumerator(); en.moveNext();) {
                ser.push(en.current.toString());
            }
            return "LinearGradientBrush(" + this.StartPoint.toString() + " --> " + this.EndPoint.toString() + " [" + ser.toString() + "])";
        }
    }
    Fayde.CoreLibrary.add(LinearGradientBrush);
}