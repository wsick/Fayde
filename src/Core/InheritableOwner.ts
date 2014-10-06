/// <reference path="../Runtime/TypeManagement.ts" />
/// <reference path="Providers/InheritedStore.ts" />
/// <reference path="../Primitives/Font.ts" />

module Fayde {
    export interface IFontChangeable {
        FontChanged(args:IDependencyPropertyChangedEventArgs);
    }

    export class InheritableOwner {
        static UseLayoutRoundingProperty: DependencyProperty = DependencyProperty.RegisterInheritable("UseLayoutRounding", () => Boolean, InheritableOwner, true);
        static FlowDirectionProperty: DependencyProperty = DependencyProperty.RegisterInheritable("FlowDirection", () => new Enum(minerva.FlowDirection), InheritableOwner, minerva.FlowDirection.LeftToRight);

        static _FontFamilyPropertyChanged(dobj: DependencyObject, args: IDependencyPropertyChangedEventArgs) {
            if ((<IFontChangeable><any>dobj).FontChanged)
                (<IFontChangeable><any>dobj).FontChanged(args);
        }
        static FontFamilyProperty: DependencyProperty = DependencyProperty.RegisterInheritable("FontFamily", () => String, InheritableOwner, Font.DEFAULT_FAMILY, InheritableOwner._FontFamilyPropertyChanged);
        static _FontSizePropertyChanged(dobj: DependencyObject, args: IDependencyPropertyChangedEventArgs) {
            if ((<IFontChangeable><any>dobj).FontChanged)
                (<IFontChangeable><any>dobj).FontChanged(args);
        }
        static FontSizeProperty: DependencyProperty = DependencyProperty.RegisterInheritable("FontSize", () => Number, InheritableOwner, Font.DEFAULT_SIZE, InheritableOwner._FontSizePropertyChanged);
        static _FontStretchPropertyChanged(dobj: DependencyObject, args: IDependencyPropertyChangedEventArgs) {
            if ((<IFontChangeable><any>dobj).FontChanged)
                (<IFontChangeable><any>dobj).FontChanged(args);
        }
        static FontStretchProperty: DependencyProperty = DependencyProperty.RegisterInheritable("FontStretch", () => String, InheritableOwner, Font.DEFAULT_STRETCH, InheritableOwner._FontStretchPropertyChanged);
        static _FontStylePropertyChanged(dobj: DependencyObject, args: IDependencyPropertyChangedEventArgs) {
            if ((<IFontChangeable><any>dobj).FontChanged)
                (<IFontChangeable><any>dobj).FontChanged(args);
        }
        static FontStyleProperty: DependencyProperty = DependencyProperty.RegisterInheritable("FontStyle", () => String, InheritableOwner, Font.DEFAULT_STYLE, InheritableOwner._FontStylePropertyChanged);
        static _FontWeightPropertyChanged(dobj: DependencyObject, args: IDependencyPropertyChangedEventArgs) {
            if ((<IFontChangeable><any>dobj).FontChanged)
                (<IFontChangeable><any>dobj).FontChanged(args);
        }
        static FontWeightProperty: DependencyProperty = DependencyProperty.RegisterInheritable("FontWeight", () => new Enum(FontWeight), InheritableOwner, Font.DEFAULT_WEIGHT, InheritableOwner._FontWeightPropertyChanged);

        static _ForegroundPropertyChanged(dobj: DependencyObject, args: IDependencyPropertyChangedEventArgs) {
            if ((<IFontChangeable><any>dobj).FontChanged)
                (<IFontChangeable><any>dobj).FontChanged(args);
        }
        static ForegroundProperty: DependencyProperty = DependencyProperty.RegisterInheritable("Foreground", () => Media.Brush, InheritableOwner, undefined, InheritableOwner._ForegroundPropertyChanged);
        
        static _TextDecorationsPropertyChanged(dobj: DependencyObject, args: IDependencyPropertyChangedEventArgs) {
            if ((<IFontChangeable><any>dobj).FontChanged)
                (<IFontChangeable><any>dobj).FontChanged(args);
        }
        static TextDecorationsProperty: DependencyProperty = DependencyProperty.RegisterInheritable("TextDecorations", () => new Enum(TextDecorations), InheritableOwner, TextDecorations.None, InheritableOwner._TextDecorationsPropertyChanged);
        
        static _LanguagePropertyChanged(dobj: DependencyObject, args: IDependencyPropertyChangedEventArgs) {
            if ((<IFontChangeable><any>dobj).FontChanged)
                (<IFontChangeable><any>dobj).FontChanged(args);
        }
        static LanguageProperty: DependencyProperty = DependencyProperty.RegisterInheritable("Language", () => String, InheritableOwner, undefined, InheritableOwner._LanguagePropertyChanged);

        static AllInheritedProperties: DependencyProperty[];
    }
    InheritableOwner.AllInheritedProperties = [
        InheritableOwner.ForegroundProperty,
        InheritableOwner.FontFamilyProperty,
        InheritableOwner.FontStretchProperty,
        InheritableOwner.FontStyleProperty,
        InheritableOwner.FontWeightProperty,
        InheritableOwner.FontSizeProperty,
        InheritableOwner.LanguageProperty,
        InheritableOwner.FlowDirectionProperty,
        InheritableOwner.UseLayoutRoundingProperty,
        InheritableOwner.TextDecorationsProperty
    ];
    Fayde.RegisterType(InheritableOwner, "Fayde");

    module reactions {
        UIReaction<boolean>(InheritableOwner.UseLayoutRoundingProperty, minerva.core.reactTo.useLayoutRounding, false);
        UIReaction<minerva.FlowDirection>(InheritableOwner.FlowDirectionProperty, minerva.core.reactTo.flowDirection, false);
    }
}