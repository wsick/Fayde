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

    if (color) ctx.strokeStyle = color;
    drawLine(ctx, x1, y1, x2, y2);
}

function drawBoundingBox(path, sx, sy, strokePars) {
    var box = { l: Number.POSITIVE_INFINITY, r: Number.NEGATIVE_INFINITY, t: Number.POSITIVE_INFINITY, b: Number.NEGATIVE_INFINITY };
    if (strokePars)
        path.extendStrokeBox(box, strokePars, sx, sy, true, true);
    else
        path.extendFillBox(box, sx, sy);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(255,0,0)";
    ctx.strokeRect(box.l, box.t, box.r - box.l, box.b - box.t);
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

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
    var pars = {
        thickness: randomInt(1, 15),
        join: randomInt(0, 3),
        startCap: randomInt(0, 3),
        endCap: randomInt(0, 3),
        miterLimit: 10
    };
    return (pars.thickness <= 1) ? null : pars;
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