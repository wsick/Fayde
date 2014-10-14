/// <reference path="TextElement.ts" />

module Fayde.Documents {
    export class Inline extends TextElement {
        //Autogen: boolean = false;
        static TextDecorationsProperty = InheritableOwner.TextDecorationsProperty.ExtendTo(Inline);
        TextDecorations: TextDecorations;

        Equals (inline: Inline): boolean {
            if (this.TextDecorations !== inline.TextDecorations)
                return false;
            return super.Equals(inline);
        }

        IsInheritable (propd: DependencyProperty): boolean {
            if (propd === Inline.TextDecorationsProperty)
                return true;
            return super.IsInheritable(propd);
        }
    }
    Fayde.RegisterType(Inline, "Fayde.Documents", Fayde.XMLNS);

    module reactions {
        TextReaction<TextDecorations>(TextElement.TextDecorationsProperty, (upd, ov, nv) => upd.invalidateFont(), false);
    }
}