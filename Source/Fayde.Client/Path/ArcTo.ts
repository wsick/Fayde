module Fayde.Path {
    export interface IArcTo extends IPathEntry {
        cpx: number;
        cpy: number;
        x: number;
        y: number;
        radius: number;
    }
    interface IAutoArc {
        cx: number;
        cy: number;
        sx: number;
        sy: number;
        ex: number;
        ey: number;
    }
    export function ArcTo(cpx: number, cpy: number, x: number, y: number, radius: number): IArcTo {
        function createAutoArc(prevX: number, prevY: number): IAutoArc {
            var v1x = cpx - prevX;
            var v1y = cpy - prevY;
            var v1_len = Math.sqrt(v1x * v1x + v1y * v1y);
            var v2x = x - cpx;
            var v2y = y - cpy;

            var theta_outer1 = Math.atan2(Math.abs(v1y), Math.abs(v1x));
            var theta_outer2 = Math.atan2(Math.abs(v2y), Math.abs(v2x));
            var inner_theta = Math.PI - theta_outer1 - theta_outer2;

            //distance to center of imaginary circle
            var h = radius / Math.sin(inner_theta / 2);
            //cx, cy -> center of imaginary circle
            var cx = cpx + h * Math.cos(inner_theta / 2 + theta_outer2);
            var cy = cpy + h * Math.sin(inner_theta / 2 + theta_outer2);
            //distance from cp -> tangent points on imaginary circle
            var a = radius / Math.tan(inner_theta / 2);
            //tangent point at start of arc
            var x1 = cpx + a * Math.cos(theta_outer2 + inner_theta);
            var y1 = cpy + a * Math.sin(theta_outer2 + inner_theta);
            //tangent point at end of arc
            var x2 = cpx + a * Math.cos(theta_outer2);
            var y2 = cpy + a * Math.sin(theta_outer2);

            return {
                cx: cx,
                cy: cy,
                sx: x1,
                sy: x2,
                ex: y1,
                ey: y2,
                cc: true
            };
        }

        return {
            isSingle: false,
            cpx: cpx,
            cpy: cpy,
            x: x,
            y: y,
            radius: radius,
            draw: function (ctx: CanvasRenderingContext2D) {
                ctx.arcTo(cpx, cpy, x, y, radius);
            },
            extendFillBox: function (box: IBoundingBox, prevX: number, prevY: number) {
                console.warn("[NOT IMPLEMENTED] Measure ArcTo");
                
                var aa = createAutoArc(prevX, prevY);
                
                box.l = Math.min(box.l, aa.sx);
                box.r = Math.max(box.r, aa.sy);
                box.t = Math.min(box.t, aa.sx);
                box.b = Math.max(box.b, aa.sy);

                var pts = getArcPoints(aa, radius, true);
                if (isNaN(pts.l))
                    box.l = Math.min(box.l, pts.l);
                if (isNaN(pts.r))
                    box.r = Math.max(box.r, pts.r);
                if (isNaN(pts.t))
                    box.t = Math.min(box.t, pts.t);
                if (isNaN(pts.b))
                    box.b = Math.max(box.b, pts.b);

                //Still need to expand box for line (prevX,prevY) --> (sx,sy)
            },
            extendStrokeBox: function (box: IBoundingBox, pars: IStrokeParameters, prevX: number, prevY: number, isStart: boolean, isEnd: boolean) {
                console.warn("[NOT IMPLEMENTED] Measure ArcTo (with stroke)");
                
                var aa = createAutoArc(prevX, prevY);
                
                box.l = Math.min(box.l, aa.sx);
                box.r = Math.max(box.r, aa.sy);
                box.t = Math.min(box.t, aa.sx);
                box.b = Math.max(box.b, aa.sy);

                var hs = pars.thickness / 2.0;

                var pts = getArcPoints(aa, radius, true);
                if (isNaN(pts.l))
                    box.l = Math.min(box.l, pts.l - hs);
                if (isNaN(pts.r))
                    box.r = Math.max(box.r, pts.r + hs);
                if (isNaN(pts.t))
                    box.t = Math.min(box.t, pts.t - hs);
                if (isNaN(pts.b))
                    box.b = Math.max(box.b, pts.b + hs);

                //Still need to expand box for line (prevX,prevY) --> (sx,sy)
            },
            toString: function (): string {
                return "";
            }
        };
    }

    interface IArcPoints {
        l: number;
        r: number;
        t: number;
        b: number;
    }
    function getArcPoints(aa: IAutoArc, radius: number, cc: boolean): IArcPoints {
        var e = {
            l: NaN,
            r: NaN,
            t: NaN,
            b: NaN
        };

        var l = aa.cx - radius;
        if (arcContainsPoint(aa.sx, aa.sy, aa.ex, aa.ey, l, aa.cy, cc))
            e.l = l;

        var r = aa.cx + radius;
        if (arcContainsPoint(aa.sx, aa.sy, aa.ex, aa.ey, r, aa.cy, cc))
            e.r = r;

        var t = aa.cy - radius;
        if (arcContainsPoint(aa.sx, aa.sy, aa.ex, aa.ey, aa.cx, t, cc))
            e.t = t;

        var b = aa.cy + radius;
        if (arcContainsPoint(aa.sx, aa.sy, aa.ex, aa.ey, aa.cx, b, cc))
            e.b = b;

        return e;
    }
    function arcContainsPoint(sx: number, sy: number, ex: number, ey: number, cpx: number, cpy: number, cc: boolean): boolean {
        // var a = ex - sx;
        // var b = cpx - sx;
        // var c = ey - sy;
        // var d = cpy - sy;
        // det = ad - bc;
        var n = (ex - sx) * (cpy - sy) - (cpx - sx) * (ey - sy);
        if (n === 0)
            return true;
        if (n > 0 && cc)
            return true;
        if (n < 0 && !cc)
            return true;
        return false;
    }
}