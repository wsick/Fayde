/// <reference path="Control.ts" />
/// CODE
/// <reference path="Enums.ts" />

module Fayde.Controls {
    export class _RichTextBoxView {
    }
    Nullstone.RegisterType(_RichTextBoxView, "_RichTextBoxView");

    export class RichTextBox extends Control {
        HorizontalScrollBarVisibility: ScrollBarVisibility;
        TextWrapping: TextWrapping;
    }
    Nullstone.RegisterType(RichTextBox, "RichTextBox");
}