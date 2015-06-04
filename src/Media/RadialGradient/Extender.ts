module Fayde.Media.RadialGradient {
    export interface IExtender {
        x0: number;
        y0: number;
        r0: number;
        x1: number;
        y1: number;
        r1: number;
        step(): boolean;
    }
    export interface IRadialPointData {
        x0: number;
        y0: number;
        x1: number;
        y1: number;
        r1: number;
        sx: number;
        sy: number;
        side: number;
        balanced: boolean;
    }
    export function createExtender (data: IRadialPointData, bounds: minerva.Rect): IExtender {
        var started = false;

        var x0 = data.x0;
        var y0 = data.y0;
        var r0 = 0;
        var x1 = data.x1;
        var y1 = data.y1;
        var r1 = data.r1;

        var dx = x1 - x0;
        var dy = y1 - y0;

        var rstep = r1;

        var ext = {
            x0: x0,
            y0: y0,
            r0: r0,
            x1: x1,
            y1: y1,
            r1: r1,
            step (): boolean {
                if (!started) {
                    started = true;
                    return true;
                }
                ext.r0 += rstep;
                ext.r1 += rstep;
                ext.x1 += dx;
                ext.y1 += dy;

                //TEMPORARY
                return ext.r1 < 400;
            }
        };
        return ext;
    }
}