/// <reference path="../Core/DependencyObject.ts"/>
/// <reference path="../Core/Providers/InheritedStore.ts"/>
/// CODE
/// <reference path="../Core/XamlObjectCollection.ts"/>
/// <reference path="../Text/TextAttributes.ts"/>
/// <reference path="../Runtime/Enum.ts"/>

module Fayde.Documents {
    export class TextElementNode extends DONode {
        XObject: TextElement;
        constructor(xobj: TextElement, inheritedWalkProperty: string) {
            super(xobj);
            this.InheritedWalkProperty = inheritedWalkProperty;
        }
        InheritedWalkProperty: string;
        GetInheritedEnumerator(): IEnumerator {
            if (!this.InheritedWalkProperty)
                return ArrayEx.EmptyEnumerator;
            var coll: XamlObjectCollection = this.XObject[this.InheritedWalkProperty];
            if (coll)
                return coll.GetNodeEnumerator();
        }
    }
    Nullstone.RegisterType(TextElementNode, "TextElementNode");

    export class TextElement extends DependencyObject implements Text.ITextAttributesSource, IFontChangeable {
        XamlNode: TextElementNode;
        CreateNode(): TextElementNode { return new TextElementNode(this, null); }
        
        static FontFamilyProperty: DependencyProperty = InheritableOwner.FontFamilyProperty;
        static FontSizeProperty: DependencyProperty = InheritableOwner.FontSizeProperty;
        static FontStretchProperty: DependencyProperty = InheritableOwner.FontStretchProperty;
        static FontStyleProperty: DependencyProperty = InheritableOwner.FontStyleProperty;
        static FontWeightProperty: DependencyProperty = InheritableOwner.FontWeightProperty;
        static ForegroundProperty: DependencyProperty = InheritableOwner.ForegroundProperty;
        static TextDecorationsProperty: DependencyProperty = InheritableOwner.TextDecorationsProperty;
        static LanguageProperty: DependencyProperty = InheritableOwner.LanguageProperty;
        Foreground: Media.Brush;
        FontFamily: string;
        FontStretch: string;
        FontStyle: string;
        FontWeight: FontWeight;
        FontSize: number;
        Language: string;
        TextDecorations: TextDecorations;

        private _Font: Font = new Font();

        constructor() {
            super();
            this._UpdateFont(true);
        }

        _SerializeText(): string { return undefined; };
        private _UpdateFont(force?: bool) {
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
        get IsUnderlined(): bool { return (this.TextDecorations & TextDecorations.Underline) > 0; }
        Start: number;

        Equals(te: TextElement): bool {
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

        private FontChanged(args: IDependencyPropertyChangedEventArgs) {
            this._UpdateFont(false);
        }
    }
    Nullstone.RegisterType(TextElement, "TextElement");
}