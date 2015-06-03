module Fayde.Media.RadialGradient {
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

    export interface IInterpolator {
        x0: number;
        y0: number;
        x1: number;
        y1: number;
        r1: number;
        balanced: boolean;
        step(): boolean;
        interpolate(offset: number): number;
    }

    export function createRepeatInterpolator (data: IRadialPointData, bounds: minerva.Rect): IInterpolator {
        var numSteps = getNumRings(data.x0, data.y0, data.r1, bounds);
        var rad = numSteps * data.r1;
        var stepSize = 1.0 / numSteps;
        var cur = -stepSize;

        var dx = numSteps * (data.x1 - data.x0);
        var dy = numSteps * (data.y1 - data.y0);

        return {
            x0: data.x0,
            y0: data.y0,
            x1: data.x0 + dx,
            y1: data.y0 + dy,
            r1: rad,
            balanced: data.balanced,
            step (): boolean {
                cur += stepSize;
                return cur < 1;
            },
            interpolate (offset: number): number {
                return cur + (offset / numSteps);
            }
        };
    }

    export function createReflectInterpolator (data: IRadialPointData, bounds: minerva.Rect): IInterpolator {
        var numSteps = getNumRings(data.x0, data.y0, data.r1, bounds);
        var rad = numSteps * data.r1;
        var stepSize = 1.0 / numSteps;
        var cur = -stepSize;
        var inverted = numSteps % 2 === 1;

        var dx = numSteps * (data.x1 - data.x0);
        var dy = numSteps * (data.y1 - data.y0);

        return {
            x0: data.x0,
            y0: data.y0,
            x1: data.x0 + dx,
            y1: data.y0 + dy,
            r1: rad,
            balanced: data.balanced,
            step (): boolean {
                inverted = !inverted;
                cur += stepSize;
                return cur < 1;
            },
            interpolate (offset: number): number {
                var norm = offset / numSteps;
                return !inverted ? cur + norm : cur + (stepSize - norm);
            }
        };
    }

    function getNumRings (cx: number, cy: number, radius: number, bounds: minerva.Rect): number {
        var nw = getLen(cx, cy, bounds.x, bounds.y);
        var ne = getLen(cx, cy, bounds.x + bounds.width, bounds.y);
        var se = getLen(cx, cy, bounds.x + bounds.width, bounds.y + bounds.height);
        var sw = getLen(cx, cy, bounds.x, bounds.y + bounds.height);
        return Math.ceil(Math.max(nw, ne, se, sw) / radius);
    }
    function getLen (x0: number, y0: number, x1: number, y1: number): number {
        var xp = x1 - x0;
        var yp = y1 - y0;
        return Math.sqrt((xp * xp) + (yp * yp));
    }
}