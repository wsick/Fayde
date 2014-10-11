/// <reference path="Inline.ts" />

module Fayde.Documents {
    export class Span extends Inline {
        CreateNode (): TextElementNode {
            return new TextElementNode(this, "Inlines");
        }

        static InlinesProperty = DependencyProperty.RegisterImmutable<InlineCollection>("Inlines", () => InlineCollection, Span);
        Inlines: InlineCollection;

        constructor () {
            super();
            var coll = Span.InlinesProperty.Initialize(this);
            coll.AttachTo(this);
            ReactTo(coll, this, (obj?) => {
                if (obj.add)
                    Providers.InheritedStore.PropagateInheritedOnAdd(this, obj.item.XamlNode);
            });
        }

        _SerializeText (): string {
            var str = "";
            var enumerator = this.Inlines.getEnumerator();
            while (enumerator.moveNext()) {
                str += (<TextElement>enumerator.current)._SerializeText();
            }
            return str;
        }
    }
    Fayde.RegisterType(Span, "Fayde.Documents", Fayde.XMLNS);
    Xaml.Content(Span, Span.InlinesProperty);
}