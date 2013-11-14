module Fayde.Path {
    export function RectRounded(x: number, y: number, width: number, height: number, radiusX: number, radiusY: number): IRect {
        if (radiusX === 0.0 && radiusY === 0.0)
            return Rect(x, y, width, height);
        
        var left = x;
        var top = y;
        var right = x + width;
        var bottom = y + height;

        return {
            isSingle: true,
            x: x,
            y: y,
            width: width,
            height: height,
            radiusX: radiusX,
            radiusY: radiusY,
            draw: function (ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                ctx.moveTo(left + radiusX, top);
                //top edge
                ctx.lineTo(right - radiusX, top);
                //top right arc
                ctx.quadraticCurveTo(right, top, right, top + radiusY);
                //right edge
                ctx.lineTo(right, bottom - radiusY);
                //bottom right arc
                ctx.quadraticCurveTo(right, bottom, right - radiusX, bottom);
                //bottom edge
                ctx.lineTo(left + radiusX, bottom);
                //bottom left arc
                ctx.quadraticCurveTo(left, bottom, left, bottom - radiusY);
                //left edge
                ctx.lineTo(left, top + radiusY);
                //top left arc
                ctx.quadraticCurveTo(left, top, left + radiusX, top);
                ctx.closePath();
            },
            extendFillBox: function (box: IBoundingBox, prevX: number, prevY: number) {
                box.l = Math.min(box.l, x);
                box.r = Math.max(box.r, x + width);
                box.t = Math.min(box.t, y);
                box.b = Math.max(box.b, y + height);
            },
            extendStrokeBox: function (box: IBoundingBox, pars: IStrokeParameters, prevX: number, prevY: number, isStart: boolean, isEnd: boolean) {
                var hs = pars.thickness / 2.0;
                box.l = Math.min(box.l, x - hs);
                box.r = Math.max(box.r, x + width + hs);
                box.t = Math.min(box.t, y - hs);
                box.b = Math.max(box.b, y + height + hs);
            }
        };
    }
}