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
        GetBackground(selected: bool): Media.Brush {
            if (selected)
                return this._Source.SelectionBackground;
            return null;
        }
        GetForeground(selected: bool): Media.Brush {
            if (selected)
                return this._Source.SelectionForeground;
            return this._Source.Foreground;
        }
        get Font(): Font { return this._Source.Font; }
        get Direction(): FlowDirection { return this._Source.Direction; }
        get IsUnderlined(): bool { return (this._Source.TextDecorations & TextDecorations.Underline) === TextDecorations.Underline; }
    }
}