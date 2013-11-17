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
                var m = getMaxima(prevX, cp1x, cp2x, x, prevY, cp1y, cp2y, y);
                if (m.x[0] != null) {
                    box.l = Math.min(box.l, m.x[0]);
                    box.r = Math.max(box.r, m.x[0]);
                }
                if (m.x[1] != null) {
                    box.l = Math.min(box.l, m.x[1]);
                    box.r = Math.max(box.r, m.x[1]);
                }
                if (m.y[0] != null) {
                    box.t = Math.min(box.t, m.y[0]);
                    box.b = Math.max(box.b, m.y[0]);
                }
                if (m.y[1] != null) {
                    box.t = Math.min(box.t, m.y[1]);
                    box.b = Math.max(box.b, m.y[1]);
                }

                box.l = Math.min(box.l, x);
                box.r = Math.max(box.r, x);
                box.t = Math.min(box.t, y);
                box.b = Math.max(box.b, y);
            },
            extendStrokeBox: function (box: IBoundingBox, pars: IStrokeParameters, prevX: number, prevY: number, isStart: boolean, isEnd: boolean) {
                var hs = pars.thickness / 2.0;

                var m = getMaxima(prevX, cp1x, cp2x, x, prevY, cp1y, cp2y, y);
                if (m.x[0] != null) {
                    box.l = Math.min(box.l, m.x[0] - hs);
                    box.r = Math.max(box.r, m.x[0] + hs);
                }
                if (m.x[1] != null) {
                    box.l = Math.min(box.l, m.x[1] - hs);
                    box.r = Math.max(box.r, m.x[1] + hs);
                }
                if (m.y[0] != null) {
                    box.t = Math.min(box.t, m.y[0] - hs);
                    box.b = Math.max(box.b, m.y[0] + hs);
                }
                if (m.y[1] != null) {
                    box.t = Math.min(box.t, m.y[1] - hs);
                    box.b = Math.max(box.b, m.y[1] + hs);
                }

                box.l = Math.min(box.l, x);
                box.r = Math.max(box.r, x);
                box.t = Math.min(box.t, y);
                box.b = Math.max(box.b, y);

                console.warn("[NOT IMPLEMENTED] Measure CubicBezier (with stroke)");
            },
            toString: function (): string {
                return "C" + cp1x.toString() + "," + cp1y.toString() + " " + cp2x.toString() + "," + cp2y.toString() + " " + x.toString() + "," + y.toString();
            },
            getStartAngle: function (): number {
                return null;
            },
            getEndAngle: function (): number {
                return null;
            }
        };
    }
    
    //http://pomax.nihongoresources.com/pages/bezier/
    /* Cubic Bezier curve is defined by parameteric curve:
     * F(t)x = 
     * F(t)y = 
     * where
     *  s = start point
     *  cp1 = control point 1
     *  cp2 = control point 2
     *  e = end point
     *
     * We find the coordinates (4) where F(t)x/dt = 0, F(t)y/dt = 0
     * (within the constraints of the curve (0 <= t <= 1)
     * These points will expand the bounding box
     */

    interface IMaxima {
        x: number[];
        y: number[];
    }
    function getMaxima(x1: number, x2: number, x3: number, x4: number, y1: number, y2: number, y3: number, y4: number): IMaxima {
        return {
            x: cod(x1, x2, x3, x4),
            y: cod(y1, y2, y3, y4)
        };
    }
    function cod(a: number, b: number, c: number, d: number): number[] {
        var u = 2 * a - 4 * b + 2 * c;
        var v = b - a;
        var w = -a + 3 * b + d - 3 * c;
        var rt = Math.sqrt(u * u - 4 * v * w);
        
        var cods: number[] = [null, null];
        if (isNaN(rt))
            return cods;
        
        var t: number,
            ot: number;

        t = (-u + rt) / (2 * w);
        if (t >= 0 && t <= 1) {
            ot = 1 - t;
            cods[0] = (a * ot * ot * ot) + (3 * b * t * ot * ot) + (3 * c * ot * t * t) + (d * t * t * t);
        }

        t = (-u - rt) / (2 * w);
        if (t >= 0 && t <= 1) {
            ot = 1 - t;
            cods[1] = (a * ot * ot * ot) + (3 * b * t * ot * ot) + (3 * c * ot * t * t) + (d * t * t * t);
        }

        return cods;
    }
}