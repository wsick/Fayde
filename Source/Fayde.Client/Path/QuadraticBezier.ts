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
                var m = getMaxima(prevX, cpx, x, prevY, cpy, y);
                if (m[0]) {
                    box.l = Math.min(box.l, m[0].x);
                    box.r = Math.max(box.r, m[0].x);
                }
                if (m[1]) {
                    box.t = Math.min(box.t, m[1].y);
                    box.b = Math.max(box.b, m[1].y);
                }

                box.l = Math.min(box.l, x);
                box.r = Math.max(box.r, x);
                box.t = Math.min(box.t, y);
                box.b = Math.max(box.b, y);
            },
            extendStrokeBox: function (box: IBoundingBox, pars: IStrokeParameters, prevX: number, prevY: number, isStart: boolean, isEnd: boolean) {
                var hs = pars.thickness / 2.0;
                
                var m = getMaxima(prevX, cpx, x, prevY, cpy, y);
                if (m[0]) {
                    box.l = Math.min(box.l, m[0].x - hs);
                    box.r = Math.max(box.r, m[0].x + hs);
                }
                if (m[1]) {
                    box.t = Math.min(box.t, m[1].y - hs);
                    box.b = Math.max(box.b, m[1].y + hs);
                }

                box.l = Math.min(box.l, x);
                box.r = Math.max(box.r, x);
                box.t = Math.min(box.t, y);
                box.b = Math.max(box.b, y);

                console.warn("[NOT IMPLEMENTED] Measure QuadraticBezier (with stroke)");
            },
            toString: function (): string {
                return "Q" + cpx.toString() + "," + cpy.toString() + " " + x.toString() + "," + y.toString();
            }
        };
    }

    //http://pomax.nihongoresources.com/pages/bezier/
    interface IMaxima {
        t: number;
        x: number;
        y: number;
    }
    function getMaxima(x1: number, x2: number, x3: number, y1: number, y2: number, y3: number): IMaxima[] {
        //change in x direction
        var m1: IMaxima = null;
        var m1t = (x1 - x2) / (x1 - 2 * x2 + x3);
        if (m1t >= 0 && m1t <= 1) {
            m1 = {
                t: m1t,
                x: xoft(x1, x2, x3, m1t),
                y: xoft(y1, y2, y3, m1t)
            };
        }

        //change in y direction
        var m2: IMaxima = null;
        var m2t = (y1 - y2) / (y1 - 2 * y2 + y3);
        if (m2t >= 0 && m2t <= 1) {
            m2 = {
                t: m2t,
                x: xoft(x1, x2, x3, m2t),
                y: xoft(y1, y2, y3, m2t)
            };
        }

        return [m1, m2];
    }
    function xoft(a: number, b: number, c: number, t: number) {
        // x(t) = a(1-t)^2 + 2*b(1-t)t + c*t^2
        // "change of direction" point (dx/dt = 0)
        return (a * Math.pow(1 - t, 2)) + (2 * b * (1 - t) * t) + (c * Math.pow(t, 2));
    }
}