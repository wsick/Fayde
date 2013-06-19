/// <reference path="../Media/SolidColorBrush.ts" />
/// CODE
/// <reference path="../Core/Enums.ts" />
/// <reference path="../Media/Brush.ts" />
/// <reference path="../Primitives/Font.ts" />

module Fayde.Text {
    export interface ITextAttributes {
        GetBackground(selected: bool): Media.Brush;
        GetForeground(selected: bool): Media.Brush;
        Font: Font;
        Direction: FlowDirection;
        IsUnderlined: bool;
        Start: number;
    }
    export interface ITextAttributesSource {
        SelectionBackground: Media.Brush;
        Background: Media.Brush;
        SelectionForeground: Media.Brush;
        Foreground: Media.Brush;
        Font: Font;
        Direction: FlowDirection;
        TextDecorations: TextDecorations;
    }

    export class TextLayoutAttributes implements ITextAttributes {
        private _Source: ITextAttributesSource;
        Start: number;
        constructor(source: ITextAttributesSource, start?: number) {
            this._Source = source;
            this.Start = (start == null) ? 0 : start;
        }
        private static DEFAULT_SELECTION_BACKGROUND = Media.SolidColorBrush.FromColor(Color.FromRgba(68, 68, 68, 1.0));
        GetBackground(selected: bool): Media.Brush {
            if (selected)
                return this._Source.SelectionBackground || TextLayoutAttributes.DEFAULT_SELECTION_BACKGROUND;
            return undefined;
        }
        private static DEFAULT_SELECTION_FOREGROUND = Media.SolidColorBrush.FromColor(Color.FromRgba(255, 255, 255, 1.0));
        GetForeground(selected: bool): Media.Brush {
            if (selected)
                return this._Source.SelectionForeground || TextLayoutAttributes.DEFAULT_SELECTION_FOREGROUND;
            return this._Source.Foreground;
        }
        get Font(): Font { return this._Source.Font; }
        get Direction(): FlowDirection { return this._Source.Direction; }
        get IsUnderlined(): bool { return (this._Source.TextDecorations & TextDecorations.Underline) === TextDecorations.Underline; }
    }
}