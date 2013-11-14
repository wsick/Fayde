
module Fayde.Path {
    export interface IMove extends IPathEntry {
        x: number;
        y: number;
    }
    export function Move(x: number, y: number): IMove {
        return {
            isSingle: false,
            x: x,
            y: y,
            draw: function (ctx: CanvasRenderingContext2D) {
                ctx.moveTo(x, y);
            },
            extendFillBox: function (box: IBoundingBox, prevX: number, prevY: number) {
                if (box.l == null || box.t == null) {
                    box.l = box.r = x;
                    box.t = box.b = y;
                    return;
                }
                box.l = Math.min(box.l, x);
                box.r = Math.max(box.r, x);
                box.t = Math.min(box.t, y);
                box.b = Math.max(box.b, y);
            },
            extendStrokeBox: function (box: IBoundingBox, pars: IStrokeParameters, prevX: number, prevY: number, isStart: boolean, isEnd: boolean) {
                if (box.l == null || box.t == null) {
                    box.l = box.r = x;
                    box.t = box.b = y;
                    return;
                }
                box.l = Math.min(box.l, x);
                box.r = Math.max(box.r, x);
                box.t = Math.min(box.t, y);
                box.b = Math.max(box.b, y);
            },
            toString: function (): string {
                return "M" + x.toString() + "," + y.toString();
            }
        };
    }
}