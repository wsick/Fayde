/// <reference path="../Core/DependencyObject.ts"/>
/// <reference path="../Core/InheritableOwner.ts"/>

module Fayde.Documents {
    export class TextElementNode extends DONode {
        XObject: TextElement;

        constructor (xobj: TextElement, inheritedWalkProperty: string) {
            super(xobj);
            this.InheritedWalkProperty = inheritedWalkProperty;
        }

        InheritedWalkProperty: string;

        GetInheritedEnumerator (): IEnumerator<DONode> {
            if (!this.InheritedWalkProperty)
                return ArrayEx.EmptyEnumerator;
            var coll: XamlObjectCollection<DependencyObject> = this.XObject[this.InheritedWalkProperty];
            if (coll)
                return coll.GetNodeEnumerator<DONode>();
        }
    }
    Fayde.RegisterType(TextElementNode, "Fayde.Documents");

    export class TextElement extends DependencyObject implements Providers.IIsPropertyInheritable {
        XamlNode: TextElementNode;

        CreateNode (): TextElementNode {
            return new TextElementNode(this, null);
        }

        static FontFamilyProperty = InheritableOwner.FontFamilyProperty.ExtendTo(TextElement);
        static FontSizeProperty = InheritableOwner.FontSizeProperty.ExtendTo(TextElement);
        static FontStretchProperty = InheritableOwner.FontStretchProperty.ExtendTo(TextElement);
        static FontStyleProperty = InheritableOwner.FontStyleProperty.ExtendTo(TextElement);
        static FontWeightProperty = InheritableOwner.FontWeightProperty.ExtendTo(TextElement);
        static ForegroundProperty = InheritableOwner.ForegroundProperty.ExtendTo(TextElement);
        static LanguageProperty = InheritableOwner.LanguageProperty.ExtendTo(TextElement);
        Foreground: Media.Brush;
        FontFamily: string;
        FontStretch: string;
        FontStyle: string;
        FontWeight: FontWeight;
        FontSize: number;
        Language: string;

        IsInheritable (propd: DependencyProperty): boolean {
            return TextElementInheritedProps.indexOf(propd) > -1;
        }

        _SerializeText (): string {
            return undefined;
        }

        Start: number;

        Equals (te: TextElement): boolean {
            if (this.FontFamily !== te.FontFamily)
                return false;
            if (this.FontSize !== te.FontSize)
                return false;
            if (this.FontStyle !== te.FontStyle)
                return false;
            if (this.FontWeight !== te.FontWeight)
                return false;
            if (this.FontStretch !== te.FontStretch)
                return false;
            if (!Nullstone.Equals(this.Foreground, te.Foreground))
                return false;
            return true;
        }
    }
    Fayde.RegisterType(TextElement, "Fayde.Documents", Fayde.XMLNS);

    var TextElementInheritedProps = [
        TextElement.FontFamilyProperty,
        TextElement.FontSizeProperty,
        TextElement.FontStretchProperty,
        TextElement.FontStyleProperty,
        TextElement.FontWeightProperty,
        TextElement.ForegroundProperty,
        TextElement.LanguageProperty
    ];

    /*
    module reactions {
        TextReaction<Media.Brush>(TextElement.ForegroundProperty, (upd, ov, nv) => upd.invalidate());
        TextReaction<string>(TextElement.FontFamilyProperty, (upd, ov, nv) => upd.invalidateFont(), false);
        TextReaction<number>(TextElement.FontSizeProperty, (upd, ov, nv) => upd.invalidateFont(), false);
        TextReaction<string>(TextElement.FontStretchProperty, (upd, ov, nv) => upd.invalidateFont(), false);
        TextReaction<string>(TextElement.FontStyleProperty, (upd, ov, nv) => upd.invalidateFont(), false);
        TextReaction<FontWeight>(TextElement.FontWeightProperty, (upd, ov, nv) => upd.invalidateFont(), false);
    }
    */
}