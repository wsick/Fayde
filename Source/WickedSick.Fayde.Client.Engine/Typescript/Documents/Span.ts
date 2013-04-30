/// <reference path="Inline.ts" />
/// CODE

module Fayde.Documents {
    export class Span extends Inline {
        static InlinesProperty;
        Inlines: XamlObjectCollection;
        CreateNode(): TextElementNode {
            return new TextElementNode(this, Span.InlinesProperty);
        }
    }
    Nullstone.RegisterType(Span, "Span");
}