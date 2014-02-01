/// <reference path="Fayde.d.ts" />

module Fayde.Controls.Input {
    export enum ValidSpinDirections {
        None = 0,
        Increase = 1,
        Decrease = 2
    }
    Fayde.RegisterEnum(ValidSpinDirections, "ValidSpinDirections");

    export enum SpinDirection {
        Increase,
        Decrease
    }
    Fayde.RegisterEnum(SpinDirection, "SpinDirection");

    export enum InvalidInputAction {
        UseFallbackItem,
        TextBoxCannotLoseFocus
    }
    Fayde.RegisterEnum(InvalidInputAction, "InvalidInputAction");
}