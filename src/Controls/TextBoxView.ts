/// <reference path="../Core/FrameworkElement.ts" />

module Fayde.Controls.Internal {
    export class TextBoxView extends FrameworkElement implements ITextModelListener {
        CreateLayoutUpdater() {
            return new minerva.core.Updater();
        }

        private _Cursor = new minerva.Rect();
        private _Layout: any;
        private _SelectionChanged: boolean = false;
        private _HadSelectedText: boolean = false;
        private _CursorVisible: boolean = false;
        private _TextBox: TextBoxBase = null;
        private _Dirty: boolean = false;

        setTextBox(tb: TextBoxBase) {
            if (this._TextBox)
                UnreactTo(this._TextBox, this);
            this._TextBox = tb;
            if (tb)
                ReactTo(tb, this, this.$TextBoxChanged);
        }

        private $TextBoxChanged(obj: any) {
            //TODO: React to model changing
        }

        SetTextBox(textBox: TextBoxBase) {
            if (this._TextBox === textBox)
                return;

            if (this._TextBox)
                this._TextBox.Unlisten(this);

            this._TextBox = textBox;

            if (textBox) {
                textBox.Listen(this);

                //this._Layout.TextAttributes = [new Text.TextLayoutAttributes(textBox)];

                this._Layout.TextAlignment = textBox.TextAlignment;
                this._Layout.TextWrapping = textBox.TextWrapping;
                this._HadSelectedText = textBox.HasSelectedText;
                this._SelectionChanged = true;
                this._UpdateText();

            } else {
                this._Layout.TextAttributes = null;
                this._Layout.Text = null;
            }

            var lu = this.XamlNode.LayoutUpdater;
            lu.updateBounds(true);
            lu.invalidateMeasure();
            lu.invalidate();
            this._Dirty = true;
        }

        private _UpdateCursor(invalidate: boolean) {
            var cur = this._TextBox.SelectionCursor;
            var current = this._Cursor;

            if (invalidate && this._CursorVisible)
                this._InvalidateCursor();

            this._Cursor = this._Layout.GetSelectionCursor(null, cur);
            //TODO: ...
            // var irect = rect.copyTo(this._Cursor);
            // rect.transform(irect, this._Xformer.AbsoluteXform);
            // this._TextBox._ImCtx.SetCursorLocation(irect);

            if (!minerva.Rect.isEqual(this._Cursor, current))
                this._TextBox._EmitCursorPositionChanged(this._Cursor.height, this._Cursor.x, this._Cursor.y);

            if (invalidate && this._CursorVisible)
                this._InvalidateCursor();
        }

        private _UpdateText() {
            var text = this._TextBox.DisplayText;
            this._Layout.Text = text ? text : "", -1;
        }

        GetBaselineOffset(): number {
            //TODO: GetTransformToUIElementWithError
            return this._Layout.GetBaselineOffset();
        }

        //GetLineFromY(y: number): Text.TextLayoutLine { return this._Layout.GetLineFromY(null, y); }
        //GetLineFromIndex(index: number): Text.TextLayoutLine { return this._Layout.GetLineFromIndex(index); }
        GetCursorFromXY(x: number, y: number): number {
            return this._Layout.GetCursorFromXY(null, x, y);
        }

        OnLostFocus(e) {
            this._EndCursorBlink();
        }

        OnGotFocus(e) {
            this._ResetCursorBlink(false);
        }

        OnMouseLeftButtonDown(e) {
            this._TextBox.OnMouseLeftButtonDown(e);
        }

        OnMouseLeftButtonUp(e) {
            this._TextBox.OnMouseLeftButtonUp(e);
        }

        OnTextModelChanged(args: ITextModelArgs) {
            var lu = this.XamlNode.LayoutUpdater;
            switch (args.Changed) {
                case TextBoxModelChangedType.TextAlignment:
                    if (this._Layout.SetTextAlignment(args.NewValue))
                        this._Dirty = true;
                    break;
                case TextBoxModelChangedType.TextWrapping:
                    if (this._Layout.SetTextWrapping(args.NewValue))
                        this._Dirty = true;
                    break;
                case TextBoxModelChangedType.Selection:
                    if (this._HadSelectedText || this._TextBox.HasSelectedText) {
                        this._HadSelectedText = this._TextBox.HasSelectedText;
                        this._SelectionChanged = true;
                        this._ResetCursorBlink(false);
                    } else {
                        this._ResetCursorBlink(true);
                        return;
                    }
                    break;
                case TextBoxModelChangedType.Brush:
                    break;
                case TextBoxModelChangedType.Font:
                    this._Layout.ResetState();
                    this._Dirty = true;
                    break;
                case TextBoxModelChangedType.Text:
                    this._UpdateText();
                    this._Dirty = true;
                    break;
                default:
                    return;
            }
            if (this._Dirty) {
                lu.invalidateMeasure();
                lu.updateBounds(true);
            }
            lu.invalidate();
        }
    }
    Fayde.RegisterType(TextBoxView, "Fayde.Controls");
}