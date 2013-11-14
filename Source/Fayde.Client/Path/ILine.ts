module Fayde.Path {
    export interface ILine extends IPathEntry {
        x: number;
        y: number;
    }
    export function Line(x: number, y: number): ILine {
        return {
            isSingle: false,
            x: x,
            y: y,
            draw: function (ctx: CanvasRenderingContext2D) {
                ctx.lineTo(x, y);
            },
            extendFillBox: function (box: IBoundingBox) {
            },
            extendStrokeBox: function (box: IBoundingBox, thickness: number, prevX: number, prevY: number, isStart: boolean, isEnd: boolean) {
            },
            toString: function (): string {
                return "L" + x.toString() + "," + y.toString();
            }
        };
    }
}