/// <reference path="Control.ts" />
/// CODE
/// <reference path="../Core/Enums.ts" />
/// <reference path="Enums.ts" />

module Fayde.Controls {
    export enum TextBoxModelChangedType {
        Nothing = 0,
        TextAlignment = 1,
        TextWrapping = 2,
        Selection = 3,
        Brush = 4,
        Font = 5,
        Text = 6,
    }

    export interface ITextModelArgs {
        Changed: TextBoxModelChangedType;
        PropArgs: IDependencyPropertyChangedEventArgs;
    }

    export interface ITextModelListener {
        OnTextModelChanged(args: ITextModelArgs);
    }

    export class TextBoxBase extends Control {
        private _SelectionCursor: number = 0;
        private _SelectionAnchor: number = 0;

        get SelectionCursor(): number { return this._SelectionCursor; }
        get HasSelectedText(): bool { return this._SelectionCursor !== this._SelectionAnchor; }
        get CaretBrush(): Media.Brush { return undefined; }
        get TextAlignment(): TextAlignment { return undefined; }
        get TextWrapping(): TextWrapping { return undefined; }
        get SelectionStart(): number { return undefined; }
        get SelectionLength(): number { return undefined; }
        get DisplayText(): string { return undefined; }

        Listen(listener: ITextModelListener) { }
        Unlisten(listener: ITextModelListener) { }

        _EmitCursorPositionChanged(height: number, x: number, y: number) {
            //LOOKS USELESS
        }
    }
    Nullstone.RegisterType(TextBoxBase, "TextBoxBase");
}