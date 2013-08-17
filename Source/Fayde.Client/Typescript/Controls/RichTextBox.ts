/// <reference path="Control.ts" />
/// CODE
/// <reference path="Enums.ts" />

module Fayde.Controls {
    export class _RichTextBoxView {
    }
    Fayde.RegisterType(_RichTextBoxView, {
    	Name: "_RichTextBoxView",
    	Namespace: "Fayde.Controls"
    });

    export class RichTextBox extends Control {
        HorizontalScrollBarVisibility: ScrollBarVisibility;
        TextWrapping: TextWrapping;
    }
    Fayde.RegisterType(RichTextBox, {
    	Name: "RichTextBox",
    	Namespace: "Fayde.Controls",
    	XmlNamespace: Fayde.XMLNS
    });
}