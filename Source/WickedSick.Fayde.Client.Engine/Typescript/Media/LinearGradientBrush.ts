/// <reference path="GradientBrush.ts" />
/// <reference path="../Primitives/Point.ts" />
/// CODE
/// <reference path="../Primitives/rect.ts" />
/// <reference path="GradientMetrics.ts" />

module Fayde.Media {
    export class LinearGradientBrush extends GradientBrush {
        static StartPointProperty: DependencyProperty = DependencyProperty.RegisterCore("StartPoint", () => Point, LinearGradientBrush, undefined, (d, args) => (<Brush>d).InvalidateBrush());
        static EndPointProperty: DependencyProperty = DependencyProperty.RegisterCore("EndPoint", () => Point, LinearGradientBrush, undefined, (d, args) => (<Brush>d).InvalidateBrush());
        StartPoint: Point;
        EndPoint: Point;

        private _CreatePad(ctx: CanvasRenderingContext2D, bounds: rect) {
            var data = this._GetPointData(bounds);
            var start = data.start;
            var end = data.end;
            var grd = ctx.createLinearGradient(start.X, start.Y, end.X, end.Y);
            var enumerator = this.GradientStops.GetEnumerator();
            while (enumerator.MoveNext()) {
                var stop: GradientStop = enumerator.Current;
                grd.addColorStop(stop.Offset, stop.Color.toString());
            }
            return grd;
        }
        private _CreateRepeat(ctx: CanvasRenderingContext2D, bounds: rect) {
            var data = this._GetPointData(bounds);
            var start = data.start;
            var end = data.end;
            var dir = { x: end.X - start.X, y: end.Y - start.Y };
            var first = { x: start.X, y: start.Y };
            var last = { x: end.X, y: end.Y };

            GradientMetrics.Calculate(dir, first, last, bounds);

            var grd = ctx.createLinearGradient(first.x, first.y, last.x, last.y);

            var steps = (last.x - first.x) / dir.x;
            var curOffset = 0.0;
            for (var i = 0; i < steps; i++) {
                var enumerator = this.GradientStops.GetEnumerator();
                while (enumerator.MoveNext()) {
                    var stop: GradientStop = enumerator.Current;
                    grd.addColorStop(curOffset + (stop.Offset / steps), stop.Color.toString());
                }

                curOffset += (1.0 / steps);
            }
            return grd;
        }
        private _CreateReflect(ctx: CanvasRenderingContext2D, bounds: rect) {
            var data = this._GetPointData(bounds);
            var start = data.start;
            var end = data.end;
        }

        private _GetPointData(bounds: rect) {
            var transform = this._GetMappingModeTransform(bounds);

            var sp = this.StartPoint;
            var ep = this.EndPoint;

            var s = mat3.transformVec2(transform, vec2.createFrom(sp.X, sp.Y));
            var e = mat3.transformVec2(transform, vec2.createFrom(ep.X, ep.Y));

            return {
                start: new Point(s[0], s[1]),
                end: new Point(e[0], e[1])
            };
        }

        toString(): string {
            var enumerator = this.GradientStops.GetEnumerator();
            var ser = [];
            while (enumerator.MoveNext()) {
                ser.push(enumerator.Current.toString());
            }
            return "LinearGradientBrush(" + this.StartPoint.toString() + " --> " + this.EndPoint.toString() + " [" + ser.toString() + "])";
        }
    }
    Nullstone.RegisterType(LinearGradientBrush, "LinearGradientBrush");
}