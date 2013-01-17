/// <reference path="../Runtime/Nullstone.js"/>
/// CODE
/// <reference path="Enums.js"/>

(function (namespace) {
    var RawPath = Nullstone.Create("RawPath");

    RawPath.Instance.Init = function () {
        this._Path = [];
    };

    RawPath.Instance.Move = function (x, y) {
        this._Path.push({
            type: PathEntryType.Move,
            x: x,
            y: y
        });
    };
    RawPath.Instance.Line = function (x, y) {
        this._Path.push({
            type: PathEntryType.Line,
            x: x,
            y: y
        });
    };
    RawPath.Instance.Rect = function (x, y, width, height) {
        this._Path.push({
            type: PathEntryType.Rect,
            x: x,
            y: y,
            width: width,
            height: height
        });
    };
    RawPath.Instance.RoundedRectFull = function (left, top, width, height, topLeft, topRight, bottomRight, bottomLeft) {
        var right = left + width;
        var bottom = top + height;

        this.Move(left + topLeft, top);
        //top edge
        this.Line(right - topRight, top);
        //top right arc
        if (topRight > 0)
            this.Quadratic(right, top, right, top + topRight);
        //right edge
        this.Line(right, bottom - bottomRight);
        //bottom right arc
        if (bottomRight > 0)
            this.Quadratic(right, bottom, right - bottomRight, bottom);
        //bottom edge
        this.Line(left + bottomLeft, bottom);
        //bottom left arc
        if (bottomLeft > 0)
            this.Quadratic(left, bottom, left, bottom - bottomLeft);
        //left edge
        this.Line(left, top + topLeft);
        //top left arc
        if (topLeft > 0)
            this.Quadratic(left, top, left + topLeft, top);
        this.Close();
    };
    RawPath.Instance.RoundedRect = function (left, top, width, height, radiusX, radiusY) {
        if (radiusX === 0.0 && radiusY === 0.0) {
            this.Rect(left, top, width, height);
            return;
        }
        var right = left + width;
        var bottom = top + height;
        this.Move(left + radiusX, top);
        //top edge
        this.Line(right - radiusX, top);
        //top right arc
        this.Quadratic(right, top, right, top + radiusY);
        //right edge
        this.Line(right, bottom - radiusY);
        //bottom right arc
        this.Quadratic(right, bottom, right - radiusX, bottom);
        //bottom edge
        this.Line(left + radiusX, bottom);
        //bottom left arc
        this.Quadratic(left, bottom, left, bottom - radiusY);
        //left edge
        this.Line(left, top + radiusY);
        //top left arc
        this.Quadratic(left, top, left + radiusX, top);
        this.Close();
    };
    RawPath.Instance.Quadratic = function (cpx, cpy, x, y) {
        this._Path.push({
            type: PathEntryType.Quadratic,
            cpx: cpx,
            cpy: cpy,
            x: x,
            y: y
        });
    };
    RawPath.Instance.Bezier = function (cp1x, cp1y, cp2x, cp2y, x, y) {
        this._Path.push({
            type: PathEntryType.Bezier,
            cp1x: cp1x,
            cp1y: cp1y,
            cp2x: cp2x,
            cp2y: cp2y,
            x: x,
            y: y
        });
    };
    RawPath.Instance.Ellipse = function (x, y, width, height) {
        var radiusX = width / 2;
        var radiusY = height / 2;
        var right = x + width;
        var bottom = y + height;
        var centerX = x + radiusX;
        var centerY = y + radiusY;
        if (width === height) { //circle
            this.Arc(centerX, centerY, radiusX, 0, Math.PI * 2, false);
        } else { //oval
            var kappa = .5522848; // 4 * ((sqrt(2) - 1) / 3)
            var ox = radiusX * kappa;
            var oy = radiusY * kappa;

            //move to left edge, halfway down
            this.Move(x, centerY);
            //top left bezier curve
            this.Bezier(x, centerY - oy, centerX - ox, y, centerX, y);
            //top right bezier curve
            this.Bezier(centerX + ox, y, right, centerY - oy, right, centerY);
            //bottom right bezier curve
            this.Bezier(right, centerY + oy, centerX + ox, bottom, centerX, bottom);
            //bottom left bezier curve
            this.Bezier(centerX - ox, bottom, x, centerY + oy, x, centerY);
            this.Close();
        }
    };
    RawPath.Instance.EllipticalArc = function (width, height, rotationAngle, isLargeArcFlag, sweepDirectionFlag, ex, ey) {
        NotImplemented("EllipticalArc");
    };
    RawPath.Instance.Arc = function (x, y, r, sAngle, eAngle, aClockwise) {
        this._Path.push({
            type: PathEntryType.Arc,
            x: x,
            y: y,
            r: r,
            sAngle: sAngle,
            eAngle: eAngle,
            aClockwise: aClockwise
        });
    };
    RawPath.Instance.ArcTo = function (cpx, cpy, x, y, radius) {
        this._Path.push({
            type: PathEntryType.ArcTo,
            cpx: cpx,
            cpy: cpy,
            x: x,
            y: y,
            r: radius
        });
    };
    RawPath.Instance.Close = function () {
        this._Path.push({
            type: PathEntryType.Close
        });
    };

    RawPath.Instance.Draw = function (ctx) {
        var canvasCtx = ctx;
        if (ctx instanceof _RenderContext)
            canvasCtx = ctx.CanvasContext;
        canvasCtx.beginPath();
        var backing = this._Path;
        for (var i = 0; i < backing.length; i++) {
            var p = backing[i];
            switch (p.type) {
                case PathEntryType.Move:
                    canvasCtx.moveTo(p.x, p.y);
                    DrawDebug("\t\tMoveTo: [X = " + p.x + "; Y = " + p.y + "]");
                    break;
                case PathEntryType.Line:
                    canvasCtx.lineTo(p.x, p.y);
                    DrawDebug("\t\tLineTo: [X = " + p.x + "; Y = " + p.y + "]");
                    break;
                case PathEntryType.Rect:
                    canvasCtx.rect(p.x, p.y, p.width, p.height);
                    DrawDebug("\t\tRect: [X = " + p.x + "; Y = " + p.y + "; Width = " + p.width + "; Height = " + p.height + "]");
                    break;
                case PathEntryType.Quadratic:
                    canvasCtx.quadraticCurveTo(p.cpx, p.cpy, p.x, p.y);
                    DrawDebug("\t\tQuadratic: [CPX = " + p.cpx + "; CPY = " + p.cpy + "; X = " + p.x + "; Y = " + p.y + "]");
                    break;
                case PathEntryType.Bezier:
                    canvasCtx.bezierCurveTo(p.cp1x, p.cp1y, p.cp2x, p.cp2y, p.x, p.y);
                    break;
                case PathEntryType.Arc:
                    canvasCtx.arc(p.x, p.y, p.r, p.sAngle, p.eAngle, p.aClockwise);
                    break;
                case PathEntryType.ArcTo:
                    canvasCtx.arcTo(p.cpx, p.cpy, p.x, p.y, p.r);
                    break;
                case PathEntryType.Close:
                    canvasCtx.closePath();
                    break;
            }
        }
    };
    RawPath.Instance.CalculateBounds = function (thickness) {
        /// <param name="thickness" type="Number">Stroke Thickness</param>
        /// <returns type="Rect" />
        var backing = this._Path;
        var startX, startY;
        var xMin = xMax = yMin = yMax = null;
        var xRange, yRange;
        for (var i = 0; i < backing.length; i++) {
            var p = backing[i];
            switch (p.type) {
                case PathEntryType.Move:
                    if (xMin == null && yMin == null) {
                        xMin = xMax = p.x;
                        yMin = yMax = p.y;
                    } else {
                        xMin = Math.min(p.x, xMin);
                        yMin = Math.min(p.y, yMin);
                        xMax = Math.max(p.x, xMax);
                        yMax = Math.max(p.y, yMax);
                    }
                    startX = p.x;
                    startY = p.y;
                    break;
                case PathEntryType.Line:
                    xMin = Math.min(p.x, xMin);
                    yMin = Math.min(p.y, yMin);
                    xMax = Math.max(p.x, xMax);
                    yMax = Math.max(p.y, yMax);
                    startX = p.x;
                    startY = p.y;
                    break;
                case PathEntryType.Rect: //does not use current x,y
                    xMin = Math.min(p.x, xMin);
                    yMin = Math.min(p.y, yMin);
                    xMax = Math.max(p.x + p.width, xMax);
                    yMax = Math.max(p.y + p.height, yMax);
                    break;
                case PathEntryType.Quadratic:
                    xRange = RawPath._CalculateQuadraticBezierRange(startX, p.cpx, p.x);
                    xMin = Math.min(xMin, xRange.min);
                    xMax = Math.max(xMax, xRange.max);
                    yRange = RawPath._CalculateQuadraticBezierRange(startY, p.cpy, p.y);
                    yMin = Math.min(yMin, yRange.min);
                    yMax = Math.max(yMax, yRange.max);
                    startX = p.x;
                    startY = p.y;
                    break;
                case PathEntryType.Bezier:
                    xRange = RawPath._CalculateCubicBezierRange(startX, p.cp1x, p.cp2x, p.x);
                    xMin = Math.min(xMin, xRange.min);
                    xMax = Math.max(xMax, xRange.max);
                    yRange = RawPath._CalculateCubicBezierRange(startY, p.cp1y, p.cp2y, p.y);
                    yMin = Math.min(yMin, yRange.min);
                    yMax = Math.max(yMax, yRange.max);
                    startX = p.x;
                    startY = p.y;
                    break;
                case PathEntryType.Arc: //does not use current x,y
                    if (p.sAngle !== p.eAngle) {
                        var r = RawPath._CalculateArcRange(p.x, p.y, p.r, p.sAngle, p.eAngle, p.aClockwise);
                        xMin = Math.min(xMin, r.xMin);
                        xMax = Math.max(xMax, r.xMax);
                        yMin = Math.min(yMin, r.yMin);
                        yMax = Math.max(yMax, r.yMax);
                    }
                    break;
                case PathEntryType.ArcTo:
                    var r = RawPath._CalculateArcToRange(startX, startY, p.cpx, p.cpy, p.x, p.y, p.r);
                    xMin = Math.min(xMin, r.xMin);
                    xMax = Math.max(xMax, r.xMax);
                    yMin = Math.min(yMin, r.yMin);
                    yMax = Math.max(yMax, r.yMax);
                    startX = p.x;
                    startY = p.y;
                    break;
            }
        }
        return new Rect(xMin, yMin, xMax - xMin, yMax - yMin);
    };

    //http://pomax.nihongoresources.com/pages/bezier/
    RawPath._CalculateQuadraticBezierRange = function (a, b, c) {
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
    };
    //http://pomax.nihongoresources.com/pages/bezier/
    RawPath._CalculateCubicBezierRange = function (a, b, c, d) {
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
    };
    RawPath._CalculateArcRange = function (cx, cy, r, sa, ea, cc) {
        //start point
        var sx = cx + (r * Math.cos(sa));
        var sy = cy + (r * Math.sin(sa));
        //end point
        var ex = cx + (r * Math.cos(ea));
        var ey = cy + (r * Math.sin(ea));
        return RawPath._CalculateArcPointsRange(cx, cy, sx, sy, ex, ey, r, cc);
    };
    RawPath._CalculateArcToRange = function (sx, sy, cpx, cpy, ex, ey, r) {
        NotImplemented("RawPath._CalculateArcToRange");
        return {
            xMin: sx,
            xMax: sx,
            yMin: sy,
            yMax: sy
        };

        var v1x = cpx - sx;
        var v1y = cpy - sy;
        var v2x = ex - cpx;
        var v2y = ey - cpy;

        var theta_outer1 = Math.atan2(Math.abs(v1y), Math.abs(v1x));
        var theta_outer2 = Math.atan2(Math.abs(v2y), Math.abs(v2x));
        var inner_theta = Math.PI - theta_outer1 - theta_outer2;

        //distance to center of imaginary circle
        var h = r / Math.sin(inner_theta / 2);
        //cx, cy -> center of imaginary circle
        var cx = cpx + h * Math.cos(inner_theta / 2 + theta_outer2);
        var cy = cpy + h * Math.sin(inner_theta / 2 + theta_outer2);
        //distance from cp -> tangent points on imaginary circle
        var a = r / Math.tan(inner_theta / 2);
        //tangent point at start of arc
        var sx = cpx + a * Math.cos(theta_outer2 + inner_theta);
        var sy = cpy + a * Math.sin(theta_outer2 + inner_theta);
        //tangent point at end of arc
        var ex = cpx + a * Math.cos(theta_outer2);
        var ey = cpy + a * Math.sin(theta_outer2);

        var cc = true;

        var r = RawPath._CalculateArcPointsRange(cx, cy, sx, sy, ex, ey, r, cc);
        return {
            xMin: Math.min(sx, r.xMin),
            xMax: Math.max(sx, r.xMax),
            yMin: Math.min(sy, r.yMin),
            yMax: Math.max(sy, r.yMax)
        };
    };
    RawPath._CalculateArcPointsRange = function (cx, cy, sx, sy, ex, ey, r, cc) {
        var xMin = Math.min(sx, ex);
        var xMax = Math.max(sx, ex);
        var yMin = Math.min(sy, ey);
        var yMax = Math.max(sy, ey);

        var xLeft = cx - r;
        if (RawPath._ArcContainsPoint(sx, sy, ex, ey, xLeft, cy, cc)) {
            //arc contains left edge of circle
            xMin = Math.min(xMin, xLeft);
        }

        var xRight = cx + r;
        if (RawPath._ArcContainsPoint(sx, sy, ex, ey, xRight, cy, cc)) {
            //arc contains right edge of circle
            xMax = Math.max(xMax, xRight);
        }

        var yTop = cy - r;
        if (RawPath._ArcContainsPoint(sx, sy, ex, ey, cx, yTop, cc)) {
            //arc contains top edge of circle
            yMin = Math.min(yMin, yTop);
        }

        var yBottom = cy + r;
        if (RawPath._ArcContainsPoint(sx, sy, ex, ey, cx, yBottom, cc)) {
            //arc contains bottom edge of circle
            yMax = Math.max(yMax, yBottom);
        }

        return {
            xMin: xMin,
            xMax: xMax,
            yMin: yMin,
            yMax: yMax
        };
    };
    RawPath._ArcContainsPoint = function (sx, sy, ex, ey, cpx, cpy, cc) {
        // var a = ex - sx;
        // var b = cpx - sx;
        // var c = ey - sy;
        // var d = cpy - sy;
        // det = ad - bc;
        var n = (ex - sx) * (cpy - sy) - (cpx - sx) * (ey - sy);
        if (n === 0)
            return true;
        // if det > 0 && counterclockwise arc --> point is on the arc
        if (n > 0 && cc)
            return true;
        // if det < 0 && clockwise arc --> point is on the arc
        if (n < 0 && !cc)
            return true;
        return false;
    };

    RawPath.Merge = function (path1, path2) {
        /// <param name="path1" type="RawPath"></param>
        /// <param name="path2" type="RawPath"></param>
        NotImplemented("RawPath.Merge");
    };

    namespace.RawPath = Nullstone.FinishCreate(RawPath);
})(window);