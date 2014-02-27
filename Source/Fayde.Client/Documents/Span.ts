/// <reference path="Inline.ts" />

module Fayde.Documents {
    export class Span extends Inline implements IInlinesChangedListener {
        CreateNode(): TextElementNode {
            return new TextElementNode(this, "Inlines");
        }
        
        static InlinesProperty = DependencyProperty.RegisterImmutable<InlineCollection>("Inlines", () => InlineCollection, Span);
        Inlines: InlineCollection;

        constructor() {
            super();
            var coll = Span.InlinesProperty.Initialize(this);
            coll.AttachTo(this);
            coll.Listen(this);
        }
        
        InlinesChanged(newInline: Inline, isAdd: boolean) {
            if (isAdd)
                Providers.InheritedStore.PropagateInheritedOnAdd(this, newInline.XamlNode);
        }

        _SerializeText(): string {
            var str = "";
            var enumerator = this.Inlines.GetEnumerator();
            while (enumerator.MoveNext()) {
                str += (<TextElement>enumerator.Current)._SerializeText();
            }
            return str;
        }
    }
    Fayde.RegisterType(Span, "Fayde.Documents", Fayde.XMLNS);
    Xaml.Content(Span, Span.InlinesProperty);
}