module Fayde.Path {
    export interface IClose extends IPathEntry {
        isClose: boolean;
    }
    export function Close(): IClose {
        return {
            isSingle: false,
            isClose: true,
            draw: function (ctx: CanvasRenderingContext2D) {
                ctx.closePath();
            },
            extendFillBox: function (box: IBoundingBox, prevX: number, prevY: number) {
                //TODO: Handle line join
            },
            extendStrokeBox: function (box: IBoundingBox, pars: IStrokeParameters, prevX: number, prevY: number) {
                //TODO: Handle line join
            },
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