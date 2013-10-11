/// <reference path="Fayde.d.ts" />

module Fayde.Controls.Input {
    export enum ValidSpinDirections {
        None= 0,
        Increase= 1,
        Decrease= 2
    }
    Fayde.RegisterEnum(ValidSpinDirections, {
        Name: "ValidSpinDirections",
        Namespace: "Fayde.Controls.Input",
        XmlNamespace: "http://schemas.wsick.com/fayde/input"
    });

    export enum SpinDirection {
        Increase,
        Decrease
    }
    Fayde.RegisterEnum(SpinDirection, {
        Name: "SpinDirection",
        Namespace: "Fayde.Controls.Input",
        XmlNamespace: "http://schemas.wsick.com/fayde/input"
    });
}