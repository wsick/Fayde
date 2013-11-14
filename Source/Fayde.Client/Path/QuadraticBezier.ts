module Fayde.Path {
    export interface IQuadraticBezier extends IPathEntry {
        cpx: number;
        cpy: number;
        x: number;
        y: number;
    }
    export function QuadraticBezier(cpx: number, cpy: number, x: number, y: number): IQuadraticBezier {
        return {
            isSingle: false,
            cpx: cpx,
            cpy: cpy,
            x: x,
            y: y,
            draw: function (ctx: CanvasRenderingContext2D) {
                ctx.quadraticCurveTo(cpx, cpy, x, y);
            },
            extendFillBox: function (box: IBoundingBox, prevX: number, prevY: number) {
                var xr = range(prevX, cpx, x);
                var yr = range(prevY, cpy, y);
                box.l = Math.min(box.l, xr.min);
                box.r = Math.max(box.r, xr.max);
                box.t = Math.min(box.t, yr.min);
                box.b = Math.max(box.b, yr.max);
            },
            extendStrokeBox: function (box: IBoundingBox, pars: IStrokeParameters, prevX: number, prevY: number, isStart: boolean, isEnd: boolean) {
                var xr = range(prevX, cpx, x);
                var yr = range(prevY, cpy, y);
                box.l = Math.min(box.l, xr.min);
                box.r = Math.max(box.r, xr.max);
                box.t = Math.min(box.t, yr.min);
                box.b = Math.max(box.b, yr.max);
                console.warn("[NOT IMPLEMENTED] Measure QuadraticBezier (with stroke)");
            },
            toString: function (): string {
                return "Q" + cpx.toString() + "," + cpy.toString() + " " + x.toString() + "," + y.toString();
            }
        };
    }

    //http://pomax.nihongoresources.com/pages/bezier/
    interface IRange {
        min: number;
        max: number;
    }
    function range(a: number, b: number, c: number): IRange {
        var min = Math.min(a, c);
        var max = Math.max(a, c);

        // if control point lies between start/end, the bezier curve is bound by the start/end
        if (min <= b && b <= max) {
            return {
                min: min,
                max: max
            };
        }

        // x(t) = a(1-t)^2 + 2*b(1-t)t + c*t^2
        // find "change of direction" point (dx/dt = 0)
        var t = (a - b) / (a - 2 * b + c);
        var xt = (a * Math.pow(1 - t, 2)) + (2 * b * (1 - t) * t) + (c * Math.pow(t, 2));
        if (min > b) {
            //control point is expanding the bounding box to the left
            min = Math.min(min, xt);
        } else {
            //control point is expanding the bounding box to the right
            max = Math.max(max, xt);
        }
        return {
            min: min,
            max: max
        };
    }
}