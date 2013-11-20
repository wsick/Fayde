function addCanvas(config) {
    var canvas = document.createElement("canvas");
    canvas.width = config.w;
    canvas.height = config.h;
    canvas.style.background = config.bg;
    document.body.appendChild(canvas);
    return canvas;
}


function drawPoint(ctx, x, y, color) {
    ctx.beginPath();
    if (color) ctx.fillStyle = color;
    ctx.fillRect(x - 2, y - 2, 4, 4);
}
function drawLine(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawStartPoint(ctx, x, y) {
    ctx.fillStyle = "rgb(255,0,0)";
    drawPoint(ctx, x, y);

    ctx.font = "14px Tahoma";
    ctx.fillStyle = "#000000";
    ctx.fillText("S", x + 5, y);
}
function drawControlPoint(ctx, x, y, num) {
    ctx.fillStyle = "rgb(0,0,255)";
    drawPoint(ctx, x, y);

    ctx.font = "14px Tahoma";
    ctx.fillStyle = "#000000";
    ctx.fillText(num, x + 5, y);
}
function drawCenterPoint(ctx, x, y) {
    ctx.fillStyle = "rgb(0,0,255)";
    drawPoint(ctx, x, y);

    ctx.font = "14px Tahoma";
    ctx.fillStyle = "#000000";
    ctx.fillText("C", x + 5, y);
}
function drawEndPoint(ctx, x, y) {
    ctx.fillStyle = "rgb(0,255,0)";
    drawPoint(ctx, x, y);

    ctx.font = "14px Tahoma";
    ctx.fillStyle = "#000000";
    ctx.fillText("E", x + 5, y);
}

function drawGuideLine(ctx, x1, y1, x2, y2, num) {
    var color = [
        "rgba(255,0,0,0.4)",
        "rgba(0,0,255,0.4)",
        "rgba(0,255,0,0.4)"
    ][num - 1];

    ctx.lineWidth = 1;
    if (color) ctx.strokeStyle = color;
    drawLine(ctx, x1, y1, x2, y2);
}

function drawBoundingBox(path, pars) {
    var r = path.CalculateBounds(pars);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(255,0,0)";
    ctx.strokeRect(r.X, r.Y, r.Width, r.Height);
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
function randomPoint(lowx, highx, lowy, highy) {
    return {
        x: randomInt(lowx, highx),
        y:randomInt(lowy,highy)
    };
}


var multipath = (function () {
    function randomEntry(path, config) {
        switch (randomInt(0, 4)) {
            case 0:
                var qb = quadbezier.random(config);
                path.QuadraticBezier(qb.cpx, qb.cpy, qb.x, qb.y);
                break;
            case 1:
                var cb = cubicbezier.random(config);
                path.CubicBezier(cb.cp1x, cb.cp1y, cb.cp2x, cb.cp2y, cb.x, cb.y);
                break;
            case 2:
                var l = randomPoint(0, config.w, 0, config.h);
                path.Line(l.x, l.y);
                break;
            case 3:
                var at = arcto.random(config);
                path.ArcTo(at.cpx, at.cpy, at.ex, at.ey, at.r);
                break;
        }
    }

    return {
        random: function (config) {
            var path = new Fayde.Path.RawPath();
            var s = randomPoint(0, config.w, 0, config.h);
            path.Move(s.x, s.y);

            var count = randomInt(3, 7);
            for (var i = 0; i < count; i++) {
                randomEntry(path, config);
            }

            return path;
        }
    };
})();

var quadbezier = (function () {
    function getMaxima(x1, x2, x3, y1, y2, y3) {
        //change in x direction
        var m1 = {
            t: (x1 - x2) / (x1 - 2 * x2 + x3),
            x: 0,
            y: 0
        };
        m1.x = xoft(x1, x2, x3, m1.t);
        m1.y = xoft(y1, y2, y3, m1.t);

        //change in y direction
        var m2 = {
            t: (y1 - y2) / (y1 - 2 * y2 + y3),
            x: 0,
            y: 0
        };
        m2.y = xoft(y1, y2, y3, m2.t);
        m2.x = xoft(x1, x2, x3, m2.t);

        return [m1, m2];
    }
    function xoft(a, b, c, t) {
        // x(t) = a(1-t)^2 + 2*b(1-t)t + c*t^2
        // "change of direction" point (dx/dt = 0)
        return (a * Math.pow(1 - t, 2)) + (2 * b * (1 - t) * t) + (c * Math.pow(t, 2));
    }

    return {
        random: function (config) {
            var cpx = randomInt(0, config.w);
            var cpy = randomInt(0, config.h);
            var x = randomInt(0, config.w);
            var y = randomInt(0, config.h);

            return {
                cpx: cpx,
                cpy: cpy,
                x: x,
                y: y
            };
        },
        maxima: getMaxima
    };
})();

var cubicbezier = (function () {
    function getMaxima(x1, x2, x3, x4, y1, y2, y3, y4) {
        function x_t(t) {
            var ot = 1 - t;
            return (x1 * ot * ot * ot) + (3 * x2 * t * ot * ot) + (3 * x3 * ot * t * t) + (x4 * t * t * t);
        };
        function y_t(t) {
            var ot = 1 - t;
            return (y1 * ot * ot * ot) + (3 * y2 * t * ot * ot) + (3 * y3 * ot * t * t) + (y4 * t * t * t);
        };
        function createMaxima(t) {
            return {
                t: t,
                x: x_t(t),
                y: y_t(t)
            };
        };

        var m = [{}, {}, {}, {}];

        var txs = d_dt_0(x1, x2, x3, x4);
        if (txs[0] >= 0 && txs[0] <= 1)
            m[0] = createMaxima(txs[0]);
        if (txs[1] >= 0 && txs[1] <= 1)
            m[1] = createMaxima(txs[1]);

        var tys = d_dt_0(y1, y2, y3, y4);
        if (tys[0] >= 0 && tys[0] <= 1)
            m[2] = createMaxima(tys[0]);
        if (tys[1] >= 0 && tys[1] <= 1)
            m[3] = createMaxima(tys[1]);

        return m;
    }
    function d_dt_0(a, b, c, d) {
        var u = 2 * a - 4 * b + 2 * c;
        var v = b - a;
        var w = -a + 3 * b + d - 3 * c;
        var rt = Math.sqrt(u * u - 4 * v * w);
        if (isNaN(rt))
            return [NaN, NaN];
        var z = [
            (-u + rt) / (2 * w),
            (-u - rt) / (2 * w)
        ];
        return z;
    }

    return {
        random: function (config) {
            var cp1x = randomInt(0, config.w);
            var cp1y = randomInt(0, config.h);
            var cp2x = randomInt(0, config.w);
            var cp2y = randomInt(0, config.h);
            var x = randomInt(0, config.w);
            var y = randomInt(0, config.h);

            return {
                cp1x: cp1x,
                cp1y: cp1y,
                cp2x: cp2x,
                cp2y: cp2y,
                x: x,
                y: y
            };
        },
        maxima: getMaxima
    };
})();

var arcto = (function () {
    return {
        random: function (config) {
            var cpx = randomInt(0, config.w);
            var cpy = randomInt(0, config.h);
            var ex = randomInt(0, config.w);
            var ey = randomInt(0, config.h);

            var r = Math.max(10, randomInt(0, 50));

            return {
                cpx: cpx,
                cpy: cpy,
                ex: ex,
                ey: ey,
                r: r
            };
        }
    };
})();

var arc = (function () {
    return {
        random: function (config) {
            var x = randomInt(0, config.w);
            var y = randomInt(0, config.h);
            var rem = Math.min(
                Math.min(x, Math.max(0, config.w - x)),
                Math.min(y, Math.max(0, config.h - y)));
            var radius = Math.max(10, randomInt(0, rem));

            var f = Math.PI * 2;
            var startingAngle = randomInt(0, f);
            var endingAngle = randomInt(0, f);
            var counterclockwise = randomInt(0, 2) === 0;

            return {
                x: x,
                y: y,
                r: radius,
                sa: startingAngle,
                ea: endingAngle,
                cc: counterclockwise
            };
        }
    };
})();

/*
export interface IStrokeParameters {
    thickness: number;
    join: Shapes.PenLineJoin;
    startCap: Shapes.PenLineCap;
    endCap: Shapes.PenLineCap;
    miterLimit: number;
}
*/
function randomStrokeParameters() {
    return {
        thickness: randomInt(1, 35),
        join: randomInt(0, 3),
        startCap: randomInt(0, 3),
        endCap: randomInt(0, 3),
        miterLimit: 10
    };
}
var pathStroke;
var strokeParamsToString;
(function () {
    var caps = [
        "butt", //flat
        "square", //square
        "round", //round
        "butt" //triangle
    ];
    var joins = [
        "miter",
        "bevel",
        "round"
    ];
    pathStroke = function (ctx, stroke, pars) {
        if (!stroke || !pars) return;
        ctx.lineWidth = pars.thickness;
        ctx.lineCap = caps[pars.startCap || pars.endCap || 0] || caps[0];
        ctx.lineJoin = joins[pars.join || 0] || joins[0];
        ctx.miterLimit = pars.miterLimit;
        ctx.strokeStyle = stroke;
        ctx.stroke();
    };
    strokeParamsToString = function (pars) {
        if (!pars) return "thickness: 0";
        var thickness = pars.thickness;
        var scap = caps[pars.startCap || 0] || caps[0];
        var ecap = caps[pars.endCap || 0] || caps[0];
        var join = joins[pars.join || 0] || joins[0];
        var limit = pars.miterLimit;
        return [
            ["thickness", thickness],
            ["startcap", scap],
            ["endcap", ecap],
            ["join", join]
        ].map(function (kvp) { return kvp.join(": "); }).join("; ");
    };
})();