/// <reference path="Block.ts" />
/// CODE

module Fayde.Documents {
    export class Paragraph extends Block {
        static InlinesProperty;
        CreateNode(): XamlNode {
            var tenode = new TextElementNode(this)
            tenode.InheritedWalkProperty = Paragraph.InlinesProperty;
            return tenode;
        }
    }
}