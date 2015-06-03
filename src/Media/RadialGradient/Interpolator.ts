module Fayde.Media.RadialGradient {
    export interface IInterpolator {
        step(): boolean;
        interpolate(offset: number): number;
    }

    export function createRepeatInterpolator (): IInterpolator {

        return {
            step (): boolean {
                return false;
            },
            interpolate (offset: number): number {
                return offset;
            }
        };
    }

    export function createReflectInterpolator (): IInterpolator {

        return {
            step (): boolean {
                return false;
            },
            interpolate (offset: number): number {
                return offset;
            }
        };
    }
}