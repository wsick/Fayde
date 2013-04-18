/// <reference path="TextElement.ts"/>
/// CODE

module Fayde.Documents {
    export class Section extends TextElement {
        static BlocksProperty;
        CreateNode(): XamlNode {
            var tenode = new TextElementNode(this);
            tenode.InheritedWalkProperty = Section.BlocksProperty;
            return tenode;
        }
    }
    Nullstone.RegisterType(Section, "Section");
}