module Fayde.Path {
    export interface IArc extends IPathEntry {
        x: number;
        y: number;
        radius: number;
        sAngle: number;
        eAngle: number;
        aClockwise: boolean;
    }
    export function Arc(x: number, y: number, radius: number, sa: number, ea: number, cc: boolean): IArc {
        var inited = false;
        //start point
        var sx: number;
        var sy: number;
        //end point
        var ex: number;
        var ey: number;
        //cardinal corners
        var l: number;
        var r: number;
        var t: number;
        var b: number;
        //contains cardinal corners
        var cl: boolean;
        var cr: boolean;
        var ct: boolean;
        var cb: boolean;

        function init() {
            if (inited) return;
            sx = x + (radius * Math.cos(sa));
            sy = y + (radius * Math.sin(sa));
            ex = x + (radius * Math.cos(ea));
            ey = y + (radius * Math.sin(ea));

            l = x - radius;
            cl = arcContainsPoint(sx, sy, ex, ey, l, y, cc);

            r = x + radius;
            cr = arcContainsPoint(sx, sy, ex, ey, r, y, cc);

            t = y - radius;
            ct = arcContainsPoint(sx, sy, ex, ey, x, t, cc);

            b = y + radius;
            cb = arcContainsPoint(sx, sy, ex, ey, x, b, cc);

            inited = true;
        }

        return {
            isSingle: true,
            x: x,
            y: y,
            radius: radius,
            sAngle: sa,
            eAngle: ea,
            aClockwise: cc,
            draw: function (ctx: CanvasRenderingContext2D) {
                ctx.arc(x, y, radius, sa, ea, cc);
            },
            extendFillBox: function (box: IBoundingBox, prevX: number, prevY: number) {
                if (ea === sa)
                    return;
                init();

                box.l = Math.min(box.l, sx, ex);
                box.r = Math.max(box.r, sx, ex);
                box.t = Math.min(box.t, sy, ey);
                box.b = Math.max(box.b, sy, ey);

                if (cl)
                    box.l = Math.min(box.l, l);
                if (cr)
                    box.r = Math.max(box.r, r);
                if (ct)
                    box.t = Math.min(box.t, t);
                if (cb)
                    box.b = Math.max(box.b, b);
            },
            extendStrokeBox: function (box: IBoundingBox, pars: IStrokeParameters, prevX: number, prevY: number, isStart: boolean, isEnd: boolean) {
                if (ea === sa)
                    return;
                init();

                //TODO: Extend starting and ending point
                console.warn("[NOT IMPLEMENTED] Measure ArcTo (with stroke)");
                box.l = Math.min(box.l, sx, ex);
                box.r = Math.max(box.r, sx, ex);
                box.t = Math.min(box.t, sy, ey);
                box.b = Math.max(box.b, sy, ey);

                var hs = pars.thickness / 2.0;
                if (cl)
                    box.l = Math.min(box.l, l - hs);
                if (cr)
                    box.r = Math.max(box.r, r + hs);
                if (ct)
                    box.t = Math.min(box.t, t - hs);
                if (cb)
                    box.b = Math.max(box.b, b + hs);
            },
            toString: function (): string {
                return "";
            }
        };
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