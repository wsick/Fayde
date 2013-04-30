/// <reference path="Block.ts" />
/// CODE

module Fayde.Documents {
    export class Paragraph extends Block {
        static InlinesProperty;
        CreateNode(): TextElementNode {
            return new TextElementNode(this, Paragraph.InlinesProperty)
        }
    }
    Nullstone.RegisterType(Paragraph, "Paragraph");
}