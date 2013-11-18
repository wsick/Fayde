module Fayde.Path {
    export interface IRect extends IPathEntry {
        x: number;
        y: number;
        width: number;
        height: number;
    }
    export function Rect(x: number, y: number, width: number, height: number): IRect {
        return {
            isSingle: true,
            x: x,
            y: y,
            width: width,
            height: height,
            draw: function (ctx: CanvasRenderingContext2D) { ctx.rect(x, y, width, height); },
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