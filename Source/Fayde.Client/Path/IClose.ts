module Fayde.Path {
    export interface IClose extends IPathEntry {
    }
    export function Close(): IClose {
        return {
            isSingle: false,
            draw: function (ctx: CanvasRenderingContext2D) {
                ctx.closePath();
            },
            extendFillBox: function (box: IBoundingBox) { },
            extendStrokeBox: function (box: IBoundingBox, thickness: number, prevX: number, prevY: number, isStart: boolean, isEnd: boolean) { },
            toString: function (): string {
                return "Z";
            }
        };
    }
}