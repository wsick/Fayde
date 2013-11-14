module Fayde.Path {
    export interface IEllipse extends IPathEntry {
        x: number;
        y: number;
        width: number;
        height: number;
    }
    export function Ellipse(x: number, y: number, width: number, height: number): IEllipse {
        var radiusX = width / 2;
        var radiusY = height / 2;
        var right = x + width;
        var bottom = y + height;
        var centerX = x + radiusX;
        var centerY = y + radiusY;

        return {
            isSingle: true,
            x: x,
            y: y,
            width: width,
            height: height,
            draw: function (ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                if (width === height) { //circle
                    ctx.arc(centerX, centerY, radiusX, 0, Math.PI * 2, false);
                    return;
                }
                
                var kappa = .5522848; // 4 * ((sqrt(2) - 1) / 3)
                var ox = radiusX * kappa;
                var oy = radiusY * kappa;

                //move to left edge, halfway down
                ctx.moveTo(x, centerY);
                //top left bezier curve
                ctx.bezierCurveTo(x, centerY - oy, centerX - ox, y, centerX, y);
                //top right bezier curve
                ctx.bezierCurveTo(centerX + ox, y, right, centerY - oy, right, centerY);
                //bottom right bezier curve
                ctx.bezierCurveTo(right, centerY + oy, centerX + ox, bottom, centerX, bottom);
                //bottom left bezier curve
                ctx.bezierCurveTo(centerX - ox, bottom, x, centerY + oy, x, centerY);
                ctx.closePath();

            },
            extendFillBox: function (box: IBoundingBox) {
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