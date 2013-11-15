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

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}