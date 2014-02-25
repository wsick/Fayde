/// <reference path="Block.ts" />

module Fayde.Documents {
    export class Paragraph extends Block {
        CreateNode(): TextElementNode {
            return new TextElementNode(this, "Inlines");
        }

        static InlinesProperty = DependencyProperty.RegisterImmutable<InlineCollection>("Inlines", () => InlineCollection, Paragraph);
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
    Fayde.RegisterType(Paragraph, "Fayde.Documents", Fayde.XMLNS);
    Xaml.Content(Paragraph, Paragraph.InlinesProperty);
}