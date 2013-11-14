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
            extendFillBox: function (box: IBoundingBox, prevX: number, prevY: number) {
                box.l = Math.min(box.l, x);
                box.r = Math.max(box.r, x);
                box.t = Math.min(box.t, y);
                box.b = Math.max(box.b, y);
            },
            extendStrokeBox: function (box: IBoundingBox, pars: IStrokeParameters, prevX: number, prevY: number, isStart: boolean, isEnd: boolean) {
                var hs = pars.thickness / 2.0;
                if (prevX === x) {
                    if (prevY === y)
                        return;
                    box.l = Math.min(box.l, x - hs);
                    box.r = Math.max(box.r, x + hs);
                    //TODO: Finish y expand
                    console.warn("[NOT IMPLEMENTED] Measure Line (with stroke)");
                    return;
                }
                if (prevY === y) {
                    //TODO: Finish x expand
                    console.warn("[NOT IMPLEMENTED] Measure Line (with stroke)");
                    box.t = Math.min(box.t, y - hs);
                    box.b = Math.max(box.b, y + hs);
                    return;
                }
                
                box.l = Math.min(box.l, x);
                box.r = Math.max(box.r, x);
                box.t = Math.min(box.t, y);
                box.b = Math.max(box.b, y);
                console.warn("[NOT IMPLEMENTED] Measure Line (with stroke)");
            },
            toString: function (): string {
                return "L" + x.toString() + "," + y.toString();
            }
        };
    }
}