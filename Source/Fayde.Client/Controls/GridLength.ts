/// <reference path="../Runtime/Nullstone.ts" />

module Fayde.Controls {
    export enum GridUnitType {
        Auto = 0,
        Pixel = 1,
        Star = 2,
    }
    Fayde.RegisterEnum(GridUnitType, "GridUnitType", Fayde.XMLNS);

    export class GridLength implements ICloneable {
        Value: number;
        Type: GridUnitType;
        constructor(value?: number, unitType?: GridUnitType) {
            this.Value = value == null ? 0 : value;
            this.Type = unitType == null ? GridUnitType.Auto : unitType;
        }
        static Equals(gl1: GridLength, gl2: GridLength): boolean {
            return Math.abs(gl1.Value - gl2.Value) < 0.001 && gl1.Type == gl2.Type;
        }
        Clone(): GridLength {
            return new Controls.GridLength(this.Value, this.Type);
        }
    }
    Fayde.RegisterType(GridLength, "Fayde.Controls", Fayde.XMLNS);

    Fayde.RegisterTypeConverter(GridLength, (val: any): GridLength => {
        if (val instanceof GridLength)
            return <GridLength>val;
        if (!val || val.toLowerCase() === "auto")
            return new GridLength();
        var type = GridUnitType.Pixel;
        if (val[val.length - 1] === "*") {
            val = val.substr(0, val.length - 1);
            type = GridUnitType.Star;
        }
        var v = parseFloat(val);
        if (isNaN(v)) v = 1;
        return new GridLength(v, type);
    });
}