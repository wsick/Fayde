/// <reference path="Block.ts" />

module Fayde.Documents {
    export class Paragraph extends Block {
        CreateNode(): TextElementNode {
            return new TextElementNode(this, "Inlines");
        }

        static InlinesProperty = DependencyProperty.RegisterImmutable<InlineCollection>("Inlines", () => InlineCollection, Paragraph);

        static Annotations = { ContentProperty: Paragraph.InlinesProperty }

        Inlines: InlineCollection;
        constructor() {
            super();
            var coll = Paragraph.InlinesProperty.Initialize(this);
            coll.AttachTo(this);
            coll.Listen(this);
        }
        
        InlinesChanged(newInline: Inline, isAdd: boolean) {
            if (isAdd)
                Providers.InheritedStore.PropagateInheritedOnAdd(this, newInline.XamlNode);
        }
    }
    Fayde.RegisterType(Paragraph, {
    	Name: "Paragraph",
    	Namespace: "Fayde.Documents",
    	XmlNamespace: Fayde.XMLNS
    });
}