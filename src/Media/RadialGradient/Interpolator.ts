module Fayde.Media.RadialGradient {
    export interface IInterpolator {
        step(): boolean;
        interpolate(offset: number): number;
    }
}