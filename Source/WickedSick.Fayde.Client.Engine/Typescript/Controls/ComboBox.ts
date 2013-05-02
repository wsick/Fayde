/// <reference path="Primitives/Selector.ts" />
/// CODE

module Fayde.Controls {
    export class ComboBox extends Primitives.Selector {
        IsDropDownOpen: bool;
    }
    Nullstone.RegisterType(ComboBox, "ComboBox");
}