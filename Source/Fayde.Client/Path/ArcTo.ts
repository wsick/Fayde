function radToDegrees(rad) {
    return rad * 180 / Math.PI;
}

module Fayde.Path {
    var EPSILON = 1e-10;

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
        cc: boolean;
    }
    export function ArcTo(cpx: number, cpy: number, x: number, y: number, radius: number): IArcTo {
        function discoverArcPart(prevX: number, prevY: number): IAutoArc {
            var v1 = [cpx - prevX, cpy - prevY];
            var v2 = [x - cpx, y - cpy];
            var inner_theta = angleBetweenVectors(v1, v2);
            //find 2 points tangent to imaginary circle along guide lines
            var a = getTangentPoint(inner_theta, radius, [prevX, prevY], v1, true);
            var b = getTangentPoint(inner_theta, radius, [cpx, cpy], v2, false);
            //find center point
            var c = getPerpendicularIntersections(a, v1, b, v2);

            return {
                cx: c[0],
                cy: c[1],
                sx: a[0],
                sy: a[1],
                ex: b[0],
                ey: b[1],
                cc: isCounterClockwise([-v1[0], -v1[1]], v2, inner_theta)
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
                var aa = discoverArcPart(prevX, prevY);
                
                box.l = Math.min(box.l, prevX, aa.sx, aa.ex);
                box.r = Math.max(box.r, prevX, aa.sx, aa.ex);
                box.t = Math.min(box.t, prevY, aa.sy, aa.ey);
                box.b = Math.max(box.b, prevY, aa.sy, aa.ey);

                var pts = getArcPoints(aa, radius, aa.cc);
                if (!isNaN(pts.l))
                    box.l = Math.min(box.l, pts.l);
                if (!isNaN(pts.r))
                    box.r = Math.max(box.r, pts.r);
                if (!isNaN(pts.t))
                    box.t = Math.min(box.t, pts.t);
                if (!isNaN(pts.b))
                    box.b = Math.max(box.b, pts.b);
            },
            extendStrokeBox: function (box: IBoundingBox, pars: IStrokeParameters, prevX: number, prevY: number, isStart: boolean, isEnd: boolean) {
                console.warn("[NOT IMPLEMENTED] Measure ArcTo (with stroke)");
                
                var aa = discoverArcPart(prevX, prevY);
                
                box.l = Math.min(box.l, prevX, aa.sx, aa.ex);
                box.r = Math.max(box.r, prevX, aa.sx, aa.ex);
                box.t = Math.min(box.t, prevY, aa.sy, aa.ey);
                box.b = Math.max(box.b, prevY, aa.sy, aa.ey);

                var hs = pars.thickness / 2.0;

                var pts = getArcPoints(aa, radius, aa.cc);
                if (!isNaN(pts.l))
                    box.l = Math.min(box.l, pts.l - hs);
                if (!isNaN(pts.r))
                    box.r = Math.max(box.r, pts.r + hs);
                if (!isNaN(pts.t))
                    box.t = Math.min(box.t, pts.t - hs);
                if (!isNaN(pts.b))
                    box.b = Math.max(box.b, pts.b + hs);

                //Need to handle line cap and line join
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

    function angleBetweenVectors(u: number[], v: number[]): number {
        var num = u[0] * v[0] + u[1] * v[1];
        var den = Math.sqrt(u[0] * u[0] + u[1] * u[1]) * Math.sqrt(v[0] * v[0] + v[1] * v[1]);
        return Math.PI - Math.acos(num / den);
    }
    function getTangentPoint(theta: number, radius: number, s: number[], d: number[], invert: boolean): number[] {
        var len = Math.sqrt(d[0] * d[0] + d[1] * d[1]);
        var f = radius / Math.tan(theta / 2);
        var t = f / len;
        if (invert)
            t = 1 - t;
        return [s[0] + t * d[0], s[1] + t * d[1]];
    }
    function getPerpendicularIntersections(s1: number[], d1: number[], s2: number[], d2: number[]): number[] {
        var x1 = s1[0];
        var y1 = s1[1];
        var x2 = s1[0] - d1[1];
        var y2 = s1[1] + d1[0];

        var x3 = s2[0];
        var y3 = s2[1];
        var x4 = s2[0] - d2[1];
        var y4 = s2[1] + d2[0];

        var det = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (det === 0)
            return null;

        var xn = ((x1 * y2 - y1 * x2) * (x3 - x4)) - ((x1 - x2) * (x3 * y4 - y3 * x4));
        var yn = ((x1 * y2 - y1 * x2) * (y3 - y4)) - ((y1 - y2) * (x3 * y4 - y3 * x4));
        return [xn / det, yn / det];
    }

    function isCounterClockwise(v1: number[], v2: number[], theta: number) {
        var nv1 = normalizeVector(v1);
        var nv2 = normalizeVector(v2);
        var ccv1 = rotateVector(nv1, theta);
        var nx = Math.abs(ccv1[0] - nv2[0]);
        var ny = Math.abs(ccv1[1] - nv2[1]);
        var tau = angleBetweenVectors(ccv1, nv2);
        return nx < EPSILON
            && ny < EPSILON;
    }
    function normalizeVector(v: number[]): number[] {
        var len = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
        return [v[0] / len, v[1] / len];
    }
    function rotateVector(v: number[], angle: number): number[] {
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        var x = v[0];
        var y = v[1];
        return [x * c - y * s, x * s + y * c];
    }
}