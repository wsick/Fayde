/// <reference path="GradientBrush.ts" />

module Fayde.Media {
    export class LinearGradientBrush extends GradientBrush {
        static StartPointProperty = DependencyProperty.RegisterCore("StartPoint", () => Point, LinearGradientBrush, undefined, (d: LinearGradientBrush, args) => d.InvalidateBrush());
        static EndPointProperty = DependencyProperty.RegisterCore("EndPoint", () => Point, LinearGradientBrush, undefined, (d: LinearGradientBrush, args) => d.InvalidateBrush());
        StartPoint: Point;
        EndPoint: Point;

        _CreatePad (ctx: CanvasRenderingContext2D, bounds: minerva.Rect) {
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

        _CreateRepeat (ctx: CanvasRenderingContext2D, bounds: minerva.Rect) {
            var data = this._GetPointData(bounds);
            var start = data.start;
            var end = data.end;
            var dir = { x: end.x - start.x, y: end.y - start.y };
            var first = { x: start.x, y: start.y };
            var last = { x: end.x, y: end.y };

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

        _CreateReflect (ctx: CanvasRenderingContext2D, bounds: minerva.Rect) {
            var data = this._GetPointData(bounds);
            var start = data.start;
            var end = data.end;
        }

        private _GetPointData (bounds: minerva.Rect) {
            var transform = this._GetMappingModeTransform(bounds);

            var sp = this.StartPoint;
            var ep = this.EndPoint;

            var s = mat3.transformVec2(transform, vec2.createFrom(sp.x, sp.y));
            var e = mat3.transformVec2(transform, vec2.createFrom(ep.x, ep.y));

            return {
                start: new Point(s[0], s[1]),
                end: new Point(e[0], e[1])
            };
        }

        toString (): string {
            var enumerator = this.GradientStops.getEnumerator();
            var ser = [];
            while (enumerator.moveNext()) {
                ser.push(enumerator.current.toString());
            }
            return "LinearGradientBrush(" + this.StartPoint.toString() + " --> " + this.EndPoint.toString() + " [" + ser.toString() + "])";
        }
    }
    Fayde.RegisterType(LinearGradientBrush, "Fayde.Media", Fayde.XMLNS);
}