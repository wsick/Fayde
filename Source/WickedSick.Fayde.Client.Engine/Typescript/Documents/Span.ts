/// <reference path="Inline.ts" />
/// CODE

module Fayde.Documents {
    export class Span extends Inline {
        static InlinesProperty;
        CreateNode(): XamlNode {
            var tenode = new TextElementNode(this);
            tenode.InheritedWalkProperty = Span.InlinesProperty;
            return tenode;
        }
    }
}