/// <reference path="Control.ts" />

module Fayde.Controls {
    export class _RichTextBoxView {
    }
    Fayde.RegisterType(_RichTextBoxView, "Fayde.Controls");

    export class RichTextBox extends Control {
        HorizontalScrollBarVisibility: ScrollBarVisibility;
        TextWrapping: TextWrapping;
    }
    Fayde.RegisterType(RichTextBox, "Fayde.Controls", Fayde.XMLNS);
}