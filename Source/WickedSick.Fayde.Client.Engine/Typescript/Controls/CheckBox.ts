/// <reference path="Primitives/ToggleButton.ts" />
/// CODE

module Fayde.Controls {
    export class CheckBox extends Primitives.ToggleButton {
        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }
    }
    Nullstone.RegisterType(CheckBox, "CheckBox");
}