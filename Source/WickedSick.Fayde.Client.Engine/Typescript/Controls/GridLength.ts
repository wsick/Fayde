/// <reference path="../Runtime/Nullstone.ts" />
/// CODE

module Fayde.Controls {
    export enum GridUnitType {
        Auto = 0,
        Pixel = 1,
        Star = 2,
    }

    export class GridLength implements ICloneable {
        Value: number;
        Type: GridUnitType;
        constructor(value?: number, unitType?: GridUnitType) {
            this.Value = value == null ? 0 : value;
            this.Type = unitType == null ? GridUnitType.Auto : unitType;
        }
        static Equals(gl1: GridLength, gl2: GridLength): bool {
            return Math.abs(gl1.Value - gl2.Value) < 0.001 && gl1.Type == gl2.Type;
        }
        Clone(): GridLength {
            return new Controls.GridLength(this.Value, this.Type);
        }
    }
    Nullstone.RegisterType(GridLength, "GridLength");
}