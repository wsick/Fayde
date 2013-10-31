/// <reference path="../Core/DependencyObject.ts"/>
/// <reference path="../Core/InheritableOwner.ts"/>

module Fayde.Documents {
    export class TextElementNode extends DONode {
        XObject: TextElement;
        constructor(xobj: TextElement, inheritedWalkProperty: string) {
            super(xobj);
            this.InheritedWalkProperty = inheritedWalkProperty;
        }
        InheritedWalkProperty: string;
        GetInheritedEnumerator(): IEnumerator<DONode> {
            if (!this.InheritedWalkProperty)
                return ArrayEx.EmptyEnumerator;
            var coll: XamlObjectCollection<DependencyObject> = this.XObject[this.InheritedWalkProperty];
            if (coll)
                return coll.GetNodeEnumerator<DONode>();
        }
    }
    Fayde.RegisterType(TextElementNode, {
    	Name: "TextElementNode",
    	Namespace: "Fayde.Documents"
    });
    
    export class TextElement extends DependencyObject implements Text.ITextAttributesSource, IFontChangeable, Providers.IIsPropertyInheritable {
        XamlNode: TextElementNode;
        CreateNode(): TextElementNode { return new TextElementNode(this, null); }
        
        static FontFamilyProperty: DependencyProperty = InheritableOwner.FontFamilyProperty.ExtendTo(TextElement);
        static FontSizeProperty: DependencyProperty = InheritableOwner.FontSizeProperty.ExtendTo(TextElement);
        static FontStretchProperty: DependencyProperty = InheritableOwner.FontStretchProperty.ExtendTo(TextElement);
        static FontStyleProperty: DependencyProperty = InheritableOwner.FontStyleProperty.ExtendTo(TextElement);
        static FontWeightProperty: DependencyProperty = InheritableOwner.FontWeightProperty.ExtendTo(TextElement);
        static ForegroundProperty: DependencyProperty = InheritableOwner.ForegroundProperty.ExtendTo(TextElement);
        static TextDecorationsProperty: DependencyProperty = InheritableOwner.TextDecorationsProperty.ExtendTo(TextElement);
        static LanguageProperty: DependencyProperty = InheritableOwner.LanguageProperty.ExtendTo(TextElement);
        Foreground: Media.Brush;
        FontFamily: string;
        FontStretch: string;
        FontStyle: string;
        FontWeight: FontWeight;
        FontSize: number;
        Language: string;
        TextDecorations: TextDecorations;

        IsInheritable(propd: DependencyProperty): boolean {
            return TextElementInheritedProps.indexOf(propd) > -1;
        }

        private _Font: Font = new Font();

        constructor() {
            super();
            this._UpdateFont(true);
        }

        _SerializeText(): string { return undefined; }
        private _UpdateFont(force?: boolean) {
            var f = this._Font;
            f.Family = this.FontFamily;
            f.Stretch = this.FontStretch;
            f.Style = this.FontStyle;
            f.Weight = this.FontWeight;
            f.Size = this.FontSize;
            return f.IsChanged || force;
        }
        
        get Background(): Media.Brush { return null; }
        get SelectionBackground(): Media.Brush { return null; }
        //DP: get Foreground(): Media.Brush { return this.Foreground; }
        get SelectionForeground(): Media.Brush { return this.Foreground; }
        get Font(): Font { return this._Font; }
        get Direction(): FlowDirection { return FlowDirection.LeftToRight; }
        get IsUnderlined(): boolean { return (this.TextDecorations & TextDecorations.Underline) > 0; }
        Start: number;

        Equals(te: TextElement): boolean {
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
            if (this.TextDecorations !== te.TextDecorations)
                return false;
            if (!Nullstone.Equals(this.Foreground, te.Foreground))
                return false;
            return true;
        }

        FontChanged(args: IDependencyPropertyChangedEventArgs) {
            this._UpdateFont(false);
        }
    }
    Fayde.RegisterType(TextElement, {
    	Name: "TextElement",
    	Namespace: "Fayde.Documents",
    	XmlNamespace: Fayde.XMLNS
    });

    var TextElementInheritedProps = [
        TextElement.FontFamilyProperty,
        TextElement.FontSizeProperty,
        TextElement.FontStretchProperty,
        TextElement.FontStyleProperty,
        TextElement.FontWeightProperty,
        TextElement.ForegroundProperty,
        TextElement.TextDecorationsProperty,
        TextElement.LanguageProperty
    ]
}