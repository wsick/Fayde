/// <reference path="Block.ts" />
/// CODE

module Fayde.Documents {
    export class Paragraph extends Block {
        CreateNode(): TextElementNode {
            return new TextElementNode(this, "Inlines");
        }

        static Annotations = { ContentProperty: "Inlines" }

        Inlines: InlineCollection;
        constructor() {
            super();
            var coll = new InlineCollection();
            coll.AttachTo(this);
            coll.Listen(this);
            Object.defineProperty(this, "Inlines", {
                value: coll,
                writable: false
            });
        }
        
        private InlinesChanged(newInline: Inline, isAdd: bool) {
            if (isAdd)
                this._Store.PropagateInheritedOnAdd(newInline.XamlNode);
        }
    }
    Nullstone.RegisterType(Paragraph, "Paragraph");
}