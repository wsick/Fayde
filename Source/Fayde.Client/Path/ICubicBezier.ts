module Fayde.Path {
    export interface ICubicBezier extends IPathEntry {
        cp1x: number;
        cp1y: number;
        cp2x: number;
        cp2y: number;
        x: number;
        y: number;
    }
    export function CubicBezier(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): ICubicBezier {
        return {
            isSingle:false,
            cp1x: cp1x,
            cp1y: cp1y,
            cp2x: cp2x,
            cp2y: cp2y,
            x: x,
            y: y,
            draw: function (ctx: CanvasRenderingContext2D) {
                ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
            },
            extendFillBox: function (box: IBoundingBox) {
            },
            extendStrokeBox: function (box: IBoundingBox, thickness: number, prevX: number, prevY: number, isStart: boolean, isEnd: boolean) {
            },
            toString: function (): string {
                return "C" + cp1x.toString() + "," + cp1y.toString() + " " + cp2x.toString() + "," + cp2y.toString() + " " + x.toString() + "," + y.toString();
            }
        };
    }
}