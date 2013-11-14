module Fayde.Path {
    export interface IArcTo extends IPathEntry {
        cpx: number;
        cpy: number;
        x: number;
        y: number;
        r: number;
    }
    export function ArcTo(cpx: number, cpy: number, x: number, y: number, r: number): IArcTo {
        return {
            isSingle: false,
            cpx: cpx,
            cpy: cpy,
            x: x,
            y: y,
            r: r,
            draw: function (ctx: CanvasRenderingContext2D) {
                ctx.arcTo(cpx, cpy, x, y, r);
            },
            extendFillBox: function (box: IBoundingBox, prevX: number, prevY: number) {
                console.warn("[NOT IMPLEMENTED] Measure ArcTo");
            },
            extendStrokeBox: function (box: IBoundingBox, pars: IStrokeParameters, prevX: number, prevY: number, isStart: boolean, isEnd: boolean) {
                console.warn("[NOT IMPLEMENTED] Measure ArcTo (with stroke)");
            },
            toString: function (): string {
                return "";
            }
        };
    }
}