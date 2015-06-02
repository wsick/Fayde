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
            var enumerator = this.GradientStops.getEnumerator();
            while (enumerator.moveNext()) {
                var stop: GradientStop = enumerator.current;
                grd.addColorStop(stop.Offset, stop.Color.toString());
            }
            return grd;
        }

        CreateRepeat (ctx: CanvasRenderingContext2D, bounds: minerva.Rect) {
            var data = this._GetPointData(bounds);
            var start = data.start;
            var end = data.end;
            var dir = {x: end.x - start.x, y: end.y - start.y};
            var first = {x: start.x, y: start.y};
            var last = {x: end.x, y: end.y};

            GradientMetrics.Calculate(dir, first, last, bounds);

            var grd = ctx.createLinearGradient(first.x, first.y, last.x, last.y);

            var steps = (last.x - first.x) / dir.x;
            var curOffset = 0.0;
            for (var i = 0; i < steps; i++) {
                var enumerator = this.GradientStops.getEnumerator();
                while (enumerator.moveNext()) {
                    var stop: GradientStop = enumerator.current;
                    grd.addColorStop(curOffset + (stop.Offset / steps), stop.Color.toString());
                }

                curOffset += (1.0 / steps);
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
            end = !end ? new Point(0.0, 0.0) : end.Clone();

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