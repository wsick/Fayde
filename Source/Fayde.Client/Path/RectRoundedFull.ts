module Fayde.Path {
    export function RectRoundedFull(x: number, y: number, width: number, height: number, topLeft: number, topRight: number, bottomRight: number, bottomLeft: number): IRect {
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
            draw: function (ctx: CanvasRenderingContext2D) {
                var right = left + width;
                var bottom = top + height;
                ctx.beginPath();
                ctx.moveTo(left + topLeft, top);
                //top edge
                ctx.lineTo(right - topRight, top);
                //top right arc
                if (topRight > 0)
                    ctx.quadraticCurveTo(right, top, right, top + topRight);
                //right edge
                ctx.lineTo(right, bottom - bottomRight);
                //bottom right arc
                if (bottomRight > 0)
                    ctx.quadraticCurveTo(right, bottom, right - bottomRight, bottom);
                //bottom edge
                ctx.lineTo(left + bottomLeft, bottom);
                //bottom left arc
                if (bottomLeft > 0)
                    ctx.quadraticCurveTo(left, bottom, left, bottom - bottomLeft);
                //left edge
                ctx.lineTo(left, top + topLeft);
                //top left arc
                if (topLeft > 0)
                    ctx.quadraticCurveTo(left, top, left + topLeft, top);
                ctx.closePath();
            },
            extendFillBox: function (box: IBoundingBox, prevX: number, prevY: number) {
                box.l = Math.min(box.l, x);
                box.r = Math.max(box.r, x + width);
                box.t = Math.min(box.t, y);
                box.b = Math.max(box.b, y + height);
            },
            extendStrokeBox: function (box: IBoundingBox, pars: IStrokeParameters, prevX: number, prevY: number) {
                var hs = pars.thickness / 2.0;
                box.l = Math.min(box.l, x - hs);
                box.r = Math.max(box.r, x + width + hs);
                box.t = Math.min(box.t, y - hs);
                box.b = Math.max(box.b, y + height + hs);
            },
            getStartVector: function (): number[] {
                return null;
            },
            getEndVector: function (): number[] {
                return null;
            }
        };
    }
}