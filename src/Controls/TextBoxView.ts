/// <reference path="../Core/FrameworkElement.ts" />

module Fayde.Controls.Internal {
    import TextBoxViewUpdater = minerva.controls.textboxview.TextBoxViewUpdater;

    export class TextBoxViewNode extends FENode {
        LayoutUpdater: TextBoxViewUpdater;
    }

    export class TextBoxView extends FrameworkElement implements ITextModelListener {
        XamlNode: TextBoxViewNode;

        CreateLayoutUpdater () {
            return new TextBoxViewUpdater();
        }

        private _AutoRun = new Documents.Run();

        constructor () {
            super();
            ReactTo(this._AutoRun, this, this._InlineChanged);
        }

        private _InlineChanged (obj?: any) {
            var updater = this.XamlNode.LayoutUpdater;
            switch (obj.type) {
                case 'font':
                    updater.invalidateFont(obj.full);
                    break;
                case 'text':
                    updater.invalidateTextMetrics();
                    break;
            }
        }

        setFontProperty (propd: DependencyProperty, value: any) {
            this._AutoRun.SetValue(propd, value);
        }

        setCaretBrush (value: Media.Brush) {
            var updater = this.XamlNode.LayoutUpdater;
            updater.assets.caretBrush = value;
            updater.invalidateCaret();
        }

        setIsFocused (isFocused: boolean) {
            var updater = <TextBoxViewUpdater>this.XamlNode.LayoutUpdater;
            if (updater.assets.isFocused === isFocused)
                return;
            updater.assets.isFocused = isFocused;
            updater.resetCaretBlinker(false);
        }

        setIsReadOnly (isReadOnly: boolean) {
            var updater = this.XamlNode.LayoutUpdater;
            if (updater.assets.isReadOnly === isReadOnly)
                return;
            updater.assets.isReadOnly = isReadOnly;
            updater.resetCaretBlinker(false);
        }

        setTextAlignment (textAlignment: TextAlignment) {
            var lu = this.XamlNode.LayoutUpdater;
            if (lu.assets.textAlignment === textAlignment)
                return;
            lu.assets.textAlignment = textAlignment;
            lu.invalidateMeasure();
            lu.updateBounds(true);
            lu.invalidate();
        }

        setTextWrapping (textWrapping: TextWrapping) {
            var lu = this.XamlNode.LayoutUpdater;
            if (lu.assets.textWrapping === textWrapping)
                return;
            lu.assets.textWrapping = textWrapping;
            lu.invalidateMeasure();
            lu.updateBounds(true);
            lu.invalidate();
        }

        setSelectionStart (selectionStart: number) {
            var lu = this.XamlNode.LayoutUpdater;
            if (lu.assets.selectionStart === selectionStart)
                return;
            lu.assets.selectionStart = selectionStart;
            //TODO: Invalidate only?
        }

        setSelectionLength (selectionLength: number) {
            var lu = this.XamlNode.LayoutUpdater;
            if (lu.assets.selectionLength === selectionLength)
                return;
            var switching = (lu.assets.selectionLength === 0) !== (selectionLength === 0);
            lu.assets.selectionLength = selectionLength;
            lu.resetCaretBlinker(switching);
            if (!switching)
                return;
            lu.invalidateCaretRegion();
            //TODO: Perhaps we can be more clever (instead of measure, can we just invalidate render?)
            lu.invalidateMeasure();
            lu.updateBounds(true);
            lu.invalidate();
        }

        setText (text: string) {
            this._AutoRun.Text = text || "";
        }

        private _TextBox: TextBoxBase = null;

        setTextBox (tb: TextBoxBase) {
            if (this._TextBox)
                UnreactTo(this._TextBox, this);
            this._TextBox = tb;
            if (tb)
                ReactTo(tb, this, this.$TextBoxChanged);
        }

        private $TextBoxChanged (obj: any) {
            var updater = this.XamlNode.LayoutUpdater;
            switch (obj.type) {
                case TextBoxModelChangedType.Selection:
                    if (true /* caret region invalidated */) {
                        //TODO: How do we handle caret region?
                        updater.resetCaretBlinker(false);
                    } else {
                        updater.resetCaretBlinker(true);
                        return;
                    }
                    break;
                case TextBoxModelChangedType.Font:
                    this._Layout.ResetState();
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
            //TODO: React to model changing
        }

        private _UpdateCursor (invalidate: boolean) {
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

        GetCursorFromPoint (point: Point): number {
            this.XamlNode.LayoutUpdater.tree.getCursorFromPoint(point);
        }

        OnMouseLeftButtonDown (e) {
            this._TextBox.OnMouseLeftButtonDown(e);
        }

        OnMouseLeftButtonUp (e) {
            this._TextBox.OnMouseLeftButtonUp(e);
        }
    }
    Fayde.RegisterType(TextBoxView, "Fayde.Controls");
}