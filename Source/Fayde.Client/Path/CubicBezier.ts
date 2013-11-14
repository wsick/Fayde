module Fayde.Path {
    export interface ICubicBezier extends IPathEntry {
        cp1x: number;
        cp1y: number;
        cp2x: number;
        cp2y: number;
        x: number;
        y: number;
    }
    export function CubicBezier(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): ICubicBezier {
        return {
            isSingle:false,
            cp1x: cp1x,
            cp1y: cp1y,
            cp2x: cp2x,
            cp2y: cp2y,
            x: x,
            y: y,
            draw: function (ctx: CanvasRenderingContext2D) {
                ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
            },
            extendFillBox: function (box: IBoundingBox, prevX: number, prevY: number) {
                var xr = range(prevX, cp1x, cp2x, x);
                var yr = range(prevY, cp1y, cp2y, y);
                box.l = Math.min(box.l, xr.min);
                box.r = Math.max(box.r, xr.max);
                box.t = Math.min(box.t, yr.min);
                box.b = Math.max(box.b, yr.max);
            },
            extendStrokeBox: function (box: IBoundingBox, pars: IStrokeParameters, prevX: number, prevY: number, isStart: boolean, isEnd: boolean) {
                var xr = range(prevX, cp1x, cp2x, x);
                var yr = range(prevY, cp1y, cp2y, y);
                box.l = Math.min(box.l, xr.min);
                box.r = Math.max(box.r, xr.max);
                box.t = Math.min(box.t, yr.min);
                box.b = Math.max(box.b, yr.max);
                console.warn("[NOT IMPLEMENTED] Measure CubicBezier (with stroke)");
            },
            toString: function (): string {
                return "C" + cp1x.toString() + "," + cp1y.toString() + " " + cp2x.toString() + "," + cp2y.toString() + " " + x.toString() + "," + y.toString();
            }
        };
    }
    
    //http://pomax.nihongoresources.com/pages/bezier/
    interface IRange {
        min: number;
        max: number;
    }
    function range(a: number, b: number, c: number, d: number): IRange {
            var min = Math.min(a, d);
            var max = Math.max(a, d);

            // if control points lie between start/end, the bezier curve is bound by the start/end
            if ((min <= b && b <= max) && (min <= c && c <= max)) {
                return {
                    min: min,
                    max: max
                };
            }

            // find "change of direction" points (dx/dt = 0)
            //xt = a(1-t)^3 + 3b(t)(1-t)^2 + 3c(1-t)(t)^2 + dt^3
            var u = 2 * a - 4 * b + 2 * c;
            var v = b - a;
            var w = -a + 3 * b + d - 3 * c;
            var rt = Math.sqrt(u * u - 4 * v * w);
            if (!isNaN(rt)) {
                var t;

                t = (-u + rt) / (2 * w);
                //f(t) is only defined in [0,1]
                if (t >= 0 && t <= 1) {
                    var ot = 1 - t;
                    var xt = (a * ot * ot * ot) + (3 * b * t * ot * ot) + (3 * c * ot * t * t) + (d * t * t * t);
                    min = Math.min(min, xt);
                    max = Math.max(max, xt);
                }

                t = (-u - rt) / (2 * w);
                //f(t) is only defined in [0,1]
                if (t >= 0 && t <= 1) {
                    var ot = 1 - t;
                    var xt = (a * ot * ot * ot) + (3 * b * t * ot * ot) + (3 * c * ot * t * t) + (d * t * t * t);
                    min = Math.min(min, xt);
                    max = Math.max(max, xt);
                }
            }

            return {
                min: min,
                max: max
            };
        }
}