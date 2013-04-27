/// <reference path="Control.ts" />
/// CODE
/// <reference path="Enums.ts" />

module Fayde.Controls {
    export class _TextBoxView {
    }
    Nullstone.RegisterType(_TextBoxView, "_TextBoxView");

    export class TextBox extends Control {
        HorizontalScrollBarVisibility: ScrollBarVisibility;
        TextWrapping: TextWrapping;
    }
    Nullstone.RegisterType(TextBox, "TextBox");
}