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
                if (m.x) {
                    box.l = Math.min(box.l, m.x);
                    box.r = Math.max(box.r, m.x);
                }
                if (m.y) {
                    box.t = Math.min(box.t, m.y);
                    box.b = Math.max(box.b, m.y);
                }

                box.l = Math.min(box.l, x);
                box.r = Math.max(box.r, x);
                box.t = Math.min(box.t, y);
                box.b = Math.max(box.b, y);
            },
            extendStrokeBox: function (box: IBoundingBox, pars: IStrokeParameters, prevX: number, prevY: number, isStart: boolean, isEnd: boolean) {
                var hs = pars.thickness / 2.0;
                
                var m = getMaxima(prevX, cpx, x, prevY, cpy, y);
                if (m.x) {
                    box.l = Math.min(box.l, m.x - hs);
                    box.r = Math.max(box.r, m.x + hs);
                }
                if (m.y) {
                    box.t = Math.min(box.t, m.y - hs);
                    box.b = Math.max(box.b, m.y + hs);
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
        x: number;
        y: number;
    }
    function getMaxima(x1: number, x2: number, x3: number, y1: number, y2: number, y3: number): IMaxima {
        //change in x direction
        return {
            x: cod(x1, x2, x3),
            y: cod(y1, y2, y3)
        };
    }
    function cod(a: number, b: number, c: number): number {
        var t = (a - b) / (a - 2 * b + c);
        if (t < 0 || t > 1)
            return null;
        return (a * Math.pow(1 - t, 2)) + (2 * b * (1 - t) * t) + (c * Math.pow(t, 2));
    }   
}