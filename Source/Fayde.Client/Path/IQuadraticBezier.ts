module Fayde.Path {
    export interface IQuadraticBezier extends IPathEntry {
        cpx: number;
        cpy: number;
        x: number;
        y: number;
    }
    export function QuadraticBezier(cpx: number, cpy: number, x: number, y: number): IQuadraticBezier {
        return {
            isSingle: false,
            cpx: cpx,
            cpy: cpy,
            x: x,
            y: y,
            draw: function (ctx: CanvasRenderingContext2D) {
                ctx.quadraticCurveTo(cpx, cpy, x, y);
            },
            extendFillBox: function (box: IBoundingBox) {
            },
            extendStrokeBox: function (box: IBoundingBox, thickness: number, prevX: number, prevY: number, isStart: boolean, isEnd: boolean) {
            },
            toString: function (): string {
                return "Q" + cpx.toString() + "," + cpy.toString() + " " + x.toString() + "," + y.toString();
            }
        };
    }
}