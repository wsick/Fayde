/// <reference path="Inline.ts" />
/// CODE

module Fayde.Documents {
    export class Span extends Inline implements IInlinesChangedListener {
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

        private _SerializeText(): string {
            var str = "";
            var enumerator = this.Inlines.GetEnumerator();
            while (enumerator.MoveNext()) {
                str += (<TextElement>enumerator.Current)._SerializeText();
            }
            return str;
        }
    }
    Nullstone.RegisterType(Span, "Span");
}