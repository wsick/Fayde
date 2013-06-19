/// <reference path="Block.ts" />
/// CODE
/// <reference path="../Core/Providers/InheritedStore.ts" />

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
        
        InlinesChanged(newInline: Inline, isAdd: bool) {
            if (isAdd)
                Providers.InheritedStore.PropagateInheritedOnAdd(this, newInline.XamlNode);
        }
    }
    Nullstone.RegisterType(Paragraph, "Paragraph");
}