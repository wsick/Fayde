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

    export function createRepeatInterpolator (data: IRadialPointData): IInterpolator {
        return {
            x0: data.x0,
            y0: data.y0,
            x1: data.x1,
            y1: data.y1,
            r1: data.r1,
            balanced: data.balanced,
            step (): boolean {
                return false;
            },
            interpolate (offset: number): number {
                return offset;
            }
        };
    }

    export function createReflectInterpolator (data: IRadialPointData): IInterpolator {
        return {
            x0: data.x0,
            y0: data.y0,
            x1: data.x1,
            y1: data.y1,
            r1: data.r1,
            balanced: data.balanced,
            step (): boolean {
                return false;
            },
            interpolate (offset: number): number {
                return offset;
            }
        };
    }
}