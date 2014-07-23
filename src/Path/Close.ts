module Fayde.Path {
    export interface IClose extends IPathEntry {
        isClose: boolean;
    }
    export function Close(): IClose {
        return {
            sx: null,
            sy: null,
            ex: null,
            ey: null,
            isSingle: false,
            isClose: true,
            draw: function (ctx: CanvasRenderingContext2D) {
                ctx.closePath();
            },
            extendFillBox: function (box: IBoundingBox) { },
            extendStrokeBox: function (box: IBoundingBox, pars: IStrokeParameters) { },
            toString: function (): string {
                return "Z";
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