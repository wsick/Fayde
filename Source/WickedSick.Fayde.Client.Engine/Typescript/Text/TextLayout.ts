/// CODE
/// <reference path="../Primitives/size.ts" />

module Fayde.Text {
    export interface ITextAttributes {
    }

    export class TextLayoutLine {
    }

    export class TextLayout {
        private _Attrs: ITextAttributes[];
        AvailableWidth: number = Number.POSITIVE_INFINITY;

        get ActualExtents(): size {
            return new size();
        }

        set MaxWidth(maxWidth: number) {
        }

        set TextAlignment(align) {
        }
        SetTextAlignment(align): bool {
            return undefined;
        }

        set TextWrapping(wrapping) {
        }
        SetTextWrapping(wrapping): bool {
            return undefined;
        }

        get TextAttributes(): ITextAttributes[] { return this._Attrs; }
        set TextAttributes(attrs) {
        }
        set Text(text: string) {
            var len = -1;
            if (text) len = text.length;
        }

        GetSelectionCursor(offset: Point, pos: number): rect {
            return undefined;
        }
        GetBaselineOffset():number {
            return undefined;
        }
        GetLineFromY(p: Point, y: number): TextLayoutLine {
            return undefined;
        }
        GetLineFromIndex(index: number): TextLayoutLine {
            return undefined;
        }
        GetCursorFromXY(p: Point, x: number, y: number): number {
            return undefined;
        }
        Select(start: number, length: number) {
        }

        Layout() {
        }

        Render(ctx: RenderContext, origin?: Point, offset?: Point) {
            //if origin is null -> {0,0}
            //if offset is null -> {0,0}
        }

        ResetState() {
        }
    }
}