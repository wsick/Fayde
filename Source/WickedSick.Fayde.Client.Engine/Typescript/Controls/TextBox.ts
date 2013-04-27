/// <reference path="TextBoxBase.ts" />
/// CODE
/// <reference path="Enums.ts" />

module Fayde.Controls {
    export class TextBox extends TextBoxBase {
        HorizontalScrollBarVisibility: ScrollBarVisibility;
        TextWrapping: TextWrapping;
    }
    Nullstone.RegisterType(TextBox, "TextBox");
}