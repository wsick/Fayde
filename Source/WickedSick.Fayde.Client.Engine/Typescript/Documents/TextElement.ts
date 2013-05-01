/// <reference path="../Core/DependencyObject.ts"/>
/// CODE
/// <reference path="../Core/XamlObjectCollection.ts"/>
/// <reference path="../Core/Providers/InheritedProviderStore.ts"/>
/// <reference path="../Core/Providers/InheritedProvider.ts"/>
/// <reference path="../Text/TextAttributes.ts"/>
/// <reference path="../Runtime/Enum.ts"/>

module Fayde.Documents {
    export class TextElementNode extends DONode {
        XObject: TextElement;
        constructor(xobj: TextElement, inheritedWalkProperty: DependencyProperty) {
            super(xobj);
            this.InheritedWalkProperty = inheritedWalkProperty;
        }
        InheritedWalkProperty: DependencyProperty;
        GetInheritedEnumerator(): IEnumerator {
            if (!this.InheritedWalkProperty)
                return ArrayEx.EmptyEnumerator;
            var coll = this.XObject.GetValue(this.InheritedWalkProperty);
            if (coll)
                return (<XamlObjectCollection>coll).GetEnumerator();
        }
    }
    Nullstone.RegisterType(TextElementNode, "TextElementNode");

    export class TextElement extends DependencyObject implements Text.ITextAttributesSource {
        _Store: Providers.InheritedProviderStore;
        CreateStore(): Providers.BasicProviderStore {
            var s = new Providers.InheritedProviderStore(this);
            s.SetProviders([null,
                new Providers.LocalValueProvider(),
                null,
                null,
                null,
                new Providers.InheritedProvider(),
                new Providers.InheritedDataContextProvider(s),
                new Providers.DefaultValueProvider(),
                new Providers.AutoCreateProvider()]
            );
            return s;
        }
        XamlNode: TextElementNode;
        CreateNode(): TextElementNode {
            return new TextElementNode(this, null);
        }

        static ForegroundProperty: DependencyProperty = DependencyProperty.RegisterInheritable("Foreground", () => Media.Brush, TextElement, undefined, (d, args) => (<TextElement>d)._UpdateFont(false), undefined, Providers._Inheritable.Foreground);
        static FontFamilyProperty: DependencyProperty = DependencyProperty.RegisterInheritable("FontFamily", () => String, TextElement, Font.DEFAULT_FAMILY, (d, args) => (<TextElement>d)._UpdateFont(false), undefined, Providers._Inheritable.FontFamily);
        static FontStretchProperty: DependencyProperty = DependencyProperty.RegisterInheritable("FontStretch", () => String, TextElement, Font.DEFAULT_STRETCH, (d, args) => (<TextElement>d)._UpdateFont(false), undefined, Providers._Inheritable.FontStretch);
        static FontStyleProperty: DependencyProperty = DependencyProperty.RegisterInheritable("FontStyle", () => String, TextElement, Font.DEFAULT_STYLE, (d, args) => (<TextElement>d)._UpdateFont(false), undefined, Providers._Inheritable.FontStyle);
        static FontWeightProperty: DependencyProperty = DependencyProperty.RegisterInheritable("FontWeight", () => new Enum(FontWeight), TextElement, Font.DEFAULT_WEIGHT, (d, args) => (<TextElement>d)._UpdateFont(false), undefined, Providers._Inheritable.FontWeight);
        static FontSizeProperty: DependencyProperty = DependencyProperty.RegisterInheritable("FontSize", () => Number, TextElement, Font.DEFAULT_SIZE, (d, args) => (<TextElement>d)._UpdateFont(false), undefined, Providers._Inheritable.FontSize);
        static LanguageProperty: DependencyProperty = DependencyProperty.RegisterInheritable("Language", () => String, TextElement, undefined, (d, args) => (<TextElement>d)._UpdateFont(false), undefined, Providers._Inheritable.Language);
        static TextDecorationsProperty: DependencyProperty = DependencyProperty.RegisterInheritable("TextDecorations", () => new Enum(TextDecorations), TextElement, TextDecorations.None, (d, args) => (<TextElement>d)._UpdateFont(false), undefined, Providers._Inheritable.TextDecorations);
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
    }
    Nullstone.RegisterType(TextElement, "TextElement");
}