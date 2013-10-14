/// <reference path="Fayde.d.ts" />
/// <reference path="_.ts" />

module Fayde.Controls.Input {
    export enum ValidSpinDirections {
        None= 0,
        Increase= 1,
        Decrease= 2
    }
    Fayde.RegisterEnum(ValidSpinDirections, {
        Name: "ValidSpinDirections",
        Namespace: "Fayde.Controls.Input",
        XmlNamespace: Input.XMLNS
    });

    export enum SpinDirection {
        Increase,
        Decrease
    }
    Fayde.RegisterEnum(SpinDirection, {
        Name: "SpinDirection",
        Namespace: "Fayde.Controls.Input",
        XmlNamespace: Input.XMLNS
    });

    export enum InvalidInputAction {
        UseFallbackItem,
        TextBoxCannotLoseFocus
    }
    Fayde.RegisterEnum(InvalidInputAction, {
        Name: "InvalidInputAction",
        Namespace: "Fayde.Controls.Input",
        XmlNamespace: Input.XMLNS
    });
}