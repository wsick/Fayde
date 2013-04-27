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

    export class TextLayoutAttributes implements ITextAttributes {
        private _Source;
        Start: number;
        constructor(source, start?: number) {
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
        get Font(): Font { return this._Source.GetFont(); }
        get Direction(): FlowDirection { return this._Source.GetDirection(); }
        get IsUnderlined(): bool { return (this._Source.TextDecorations & TextDecorations.Underline) === TextDecorations.Underline; }
    }
}