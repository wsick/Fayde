/// <reference path="../Core/FrameworkElement.ts" />

module Fayde.Controls.Internal {
    var CURSOR_BLINK_DIVIDER = 3;
    var CURSOR_BLINK_OFF_MULTIPLIER = 2;
    var CURSOR_BLINK_DELAY_MULTIPLIER = 3;
    var CURSOR_BLINK_ON_MULTIPLIER = 4;
    var CURSOR_BLINK_TIMEOUT_DEFAULT = 900;

    export class TextBoxView extends FrameworkElement implements ITextModelListener {
        CreateLayoutUpdater() { return new minerva.core.Updater(); }
        //TODO: Implement textbox view updater
        //CreateLayoutUpdater() { return new minerva.controls.textbox.TextBoxUpdater(); }

        private _Cursor = new minerva.Rect();
        private _Layout: Text.TextLayout = new Text.TextLayout();
        private _SelectionChanged: boolean = false;
        private _HadSelectedText: boolean = false;
        private _CursorVisible: boolean = false;
        private _EnableCursor: boolean = true;
        private _BlinkTimeout: number = 0;
        private _TextBox: TextBoxBase = null;
        private _Dirty: boolean = false;

        SetTextBox(textBox: TextBoxBase) {
            if (this._TextBox === textBox)
                return;

            if (this._TextBox)
                this._TextBox.Unlisten(this);

            this._TextBox = textBox;

            if (textBox) {
                textBox.Listen(this);

                this._Layout.TextAttributes = [new Text.TextLayoutAttributes(textBox)];

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
        SetEnableCursor(value: boolean) {
            if (this._EnableCursor === value)
                return;
            this._EnableCursor = value;
            if (value)
                this._ResetCursorBlink(false);
            else
                this._EndCursorBlink();
        }

        _Blink() {
            var multiplier;
            if (this._CursorVisible) {
                multiplier = CURSOR_BLINK_OFF_MULTIPLIER;
                this._HideCursor();
            } else {
                multiplier = CURSOR_BLINK_ON_MULTIPLIER;
                this._ShowCursor();
            }
            this._ConnectBlinkTimeout(multiplier);
            return false;
        }
        _ConnectBlinkTimeout(multiplier) {
            if (!this.XamlNode.IsAttached)
                return;
            var timeout = this._GetCursorBlinkTimeout() * multiplier / CURSOR_BLINK_DIVIDER;
            this._BlinkTimeout = setTimeout(() => this._Blink(), timeout);
        }
        _DisconnectBlinkTimeout() {
            if (this._BlinkTimeout !== 0) {
                if (!this.XamlNode.IsAttached)
                    return;
                clearTimeout(this._BlinkTimeout);
                this._BlinkTimeout = 0;
            }
        }
        _GetCursorBlinkTimeout() { return CURSOR_BLINK_TIMEOUT_DEFAULT; }
        _ResetCursorBlink(delay: boolean) {
            if (this._TextBox.$IsFocused && !this._TextBox.HasSelectedText) {
                if (this._EnableCursor) {
                    if (delay)
                        this._DelayCursorBlink();
                    else
                        this._BeginCursorBlink();
                } else {
                    this._UpdateCursor(false);
                }
            } else {
                this._EndCursorBlink();
            }
        }
        private _DelayCursorBlink() {
            this._DisconnectBlinkTimeout();
            this._ConnectBlinkTimeout(CURSOR_BLINK_DELAY_MULTIPLIER);
            this._UpdateCursor(true);
            this._ShowCursor();
        }
        private _BeginCursorBlink() {
            if (this._BlinkTimeout === 0) {
                this._ConnectBlinkTimeout(CURSOR_BLINK_ON_MULTIPLIER);
                this._UpdateCursor(true);
                this._ShowCursor();
            }
        }
        private _EndCursorBlink() {
            this._DisconnectBlinkTimeout();
            if (this._CursorVisible)
                this._HideCursor();
        }
        private _InvalidateCursor() {
            //TODO: Invalidate cursor
            //var lu = this.XamlNode.LayoutUpdater;
            //lu.invalidate(rect.transform(this._Cursor, lu.AbsoluteXform));
        }
        private _ShowCursor() {
            this._CursorVisible = true;
            this._InvalidateCursor();
        }
        private _HideCursor() {
            this._CursorVisible = false;
            this._InvalidateCursor();
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

        /*
        MeasureOverride(availableSize: minerva.Size) {
            this.Layout(availableSize);
            var desired = size.copyTo(this._Layout.ActualExtents);
            if (!isFinite(availableSize.width))
                desired.Width = Math.max(desired.Width, 11);
            size.min(desired, availableSize);
            return desired;
        }
        ArrangeOverride(finalSize: minerva.Size) {
            this.Layout(finalSize);
            var arranged = size.copyTo(this._Layout.ActualExtents);
            size.max(arranged, finalSize);
            return arranged;
        }
        */
        Layout(constraint: minerva.Size) {
            this._Layout.MaxWidth = constraint.width;
            this._Layout.Layout();
            this._Dirty = false;
        }

        GetBaselineOffset(): number {
            //TODO: GetTransformToUIElementWithError
            return this._Layout.GetBaselineOffset();
        }
        GetLineFromY(y: number): Text.TextLayoutLine { return this._Layout.GetLineFromY(null, y); }
        GetLineFromIndex(index: number): Text.TextLayoutLine { return this._Layout.GetLineFromIndex(index); }
        GetCursorFromXY(x: number, y: number): number { return this._Layout.GetCursorFromXY(null, x, y); }

        OnLostFocus(e) { this._EndCursorBlink(); }
        OnGotFocus(e) { this._ResetCursorBlink(false); }
        OnMouseLeftButtonDown(e) { this._TextBox.OnMouseLeftButtonDown(e); }
        OnMouseLeftButtonUp(e) { this._TextBox.OnMouseLeftButtonUp(e); }

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

        //TODO: Implement render and actual size
        /*
        ComputeActualExtents(): size {
            this.Layout(size.createInfinite());
            return this._Layout.ActualExtents;
        }
        PreRender() {
            this._UpdateCursor(false);

            if (this._SelectionChanged) {
                this._Layout.Select(this._TextBox.SelectionStart, this._TextBox.SelectionLength);
                this._SelectionChanged = false;
            }
        }
        Render(ctx: RenderContextEx, region: rect, renderSize: size) {
            this._Layout.AvailableWidth = renderSize.Width;

            if (this.FlowDirection === Fayde.FlowDirection.RightToLeft) {
                //TODO: Invert
            }
            this._Layout.Render(ctx);
            if (this._CursorVisible) {
                var rect = this._Cursor;
                ctx.beginPath();
                ctx.moveTo(rect.X + 0.5, rect.Y);
                ctx.lineTo(rect.X + 0.5, rect.Y + rect.Height);
                ctx.lineWidth = 1.0;
                var caretBrush = this._TextBox.CaretBrush;
                if (caretBrush) {
                    caretBrush.SetupBrush(ctx, rect);
                    ctx.strokeStyle = caretBrush.ToHtml5Object();
                } else {
                    ctx.strokeStyle = "#000000";
                }
                ctx.stroke();
            }
        }
        */
    }
    Fayde.RegisterType(TextBoxView, "Fayde.Controls");

    //TODO: Implement textboxview updater
    /*
    export class TextBoxViewLayoutUpdater extends LayoutUpdater {
        ComputeActualSize() {
            if (this.LayoutSlot !== undefined)
                return super.ComputeActualSize();
            return (<TextBoxView>this.Node.XObject).ComputeActualExtents();
        }
        
        Render(ctx: RenderContextEx, region: rect) {
            var tbv = <TextBoxView>this.Node.XObject;
            tbv.PreRender();
            ctx.save();
            this.RenderLayoutClip(ctx);
            tbv.Render(ctx, region, this.RenderSize);
            ctx.restore();
        }
    }
    */
}