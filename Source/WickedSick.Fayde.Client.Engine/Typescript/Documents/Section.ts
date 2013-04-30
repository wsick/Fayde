/// <reference path="TextElement.ts"/>
/// CODE

module Fayde.Documents {
    export class Section extends TextElement {
        static BlocksProperty;
        CreateNode(): TextElementNode {
            return new TextElementNode(this, Section.BlocksProperty);
        }
    }
    Nullstone.RegisterType(Section, "Section");
}