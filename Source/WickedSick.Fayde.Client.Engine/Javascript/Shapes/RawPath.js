/// <reference path="../Runtime/Nullstone.js"/>
/// CODE
/// <reference path="Enums.js"/>

//#region RawPath
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
    var kappa = .5522848; // 4 * ((sqrt(2) - 1) / 3)
    var ox = width / 2 * kappa;
    var oy = height / 2 * kappa;
    var right = x + width;
    var bottom = y + height;
    var centerX = x + width / 2;
    var centerY = y + height / 2;
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
};
RawPath.Instance.EllipticalArc = function (width, height, rotationAngle, isLargeArcFlag, sweepDirectionFlag, ex, ey) {
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
RawPath.Instance.ArcTo = function (x1, y1, x2, y2, radius) {
    this._Path.push({
        type: PathEntryType.ArcTo,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        radius: radius
    });
};
RawPath.Instance.Close = function () {
    this._Path.push({
        type: PathEntryType.Close
    });
};

RawPath.Instance.Draw = function (ctx) {
    /// <param name="ctx" type="_RenderContext"></param> 
    var canvasCtx = ctx.GetCanvasContext();
    canvasCtx.beginPath();
    var backing = this._Path;
    for (var i = 0; i < backing.length; i++) {
        var p = backing[i];
        switch (p.type) {
            case PathEntryType.Move:
                canvasCtx.moveTo(p.x, p.y);
                break;
            case PathEntryType.Line:
                canvasCtx.lineTo(p.x, p.y);
                break;
            case PathEntryType.Rect:
                canvasCtx.rect(p.x, p.y, p.width, p.height);
                break;
            case PathEntryType.Quadratic:
                canvasCtx.quadraticCurveTo(p.cpx, p.cpy, p.x, p.y);
                break;
            case PathEntryType.Bezier:
                canvasCtx.bezierCurveTo(p.cp1x, p.cp1y, p.cp2x, p.cp2y, p.x, p.y);
                break;
            case PathEntryType.Arc:
                canvasCtx.arc(p.x, p.y, p.r, p.sAngle, p.eAngle, p.aClockwise);
                break;
            case PathEntryType.ArcTo:
                canvasCtx.arcTo(p.x1, p.y1, p.x2, p.y2, p.radius);
                break;
            case PathEntryType.Close:
                canvasCtx.closePath();
                break;
        }
    }
};
RawPath.Instance.CalculateBounds = function () {
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
            case PathEntryType.Rect:
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
            case PathEntryType.Arc:
                NotImplemented("RawPath.CalculateBounds-Arc");
                break;
            case PathEntryType.ArcTo:
                NotImplemented("RawPath.CalculateBounds-ArcTo");
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

RawPath.Merge = function (path1, path2) {
    /// <param name="path1" type="RawPath"></param>
    /// <param name="path2" type="RawPath"></param>
    NotImplemented("RawPath.Merge");
};

Nullstone.FinishCreate(RawPath);
//#endregion