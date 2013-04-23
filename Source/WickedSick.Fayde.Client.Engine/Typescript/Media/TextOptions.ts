/// <reference path="../Core/DependencyObject.ts" />
/// CODE
/// <reference path="../Runtime/Enum.ts" />
/// <reference path="Enums.ts" />

module Fayde.Media {
    export class TextOptions {
        static TextHintingModeProperty: DependencyProperty = DependencyProperty.RegisterAttached("TextHintingMode", () => new Enum(TextHintingMode), TextOptions);
        static GetTextHintingMode(d: DependencyObject): TextHintingMode { return d.GetValue(TextHintingModeProperty); }
        static SetTextHintingMode(d: DependencyObject, value: TextHintingMode) { d.SetValue(TextHintingModeProperty, value); }
    }
    Nullstone.RegisterType(TextOptions, "TextOptions");
}