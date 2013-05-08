/// <reference path="../Core/FrameworkElement.ts" />
/// CODE
/// <reference path="../Primitives/rect.ts" />
/// <reference path="../Text/TextLayout.ts" />
/// <reference path="../Text/TextAttributes.ts" />
/// <reference path="TextBox.ts" />
/// <reference path="../Core/Enums.ts" />
/// <reference path="TextBoxBase.ts" />

module Fayde.Controls.Internal {
    var CURSOR_BLINK_DIVIDER = 3;
    var CURSOR_BLINK_OFF_MULTIPLIER = 2;
    var CURSOR_BLINK_DELAY_MULTIPLIER = 3;
    var CURSOR_BLINK_ON_MULTIPLIER = 4;
    var CURSOR_BLINK_TIMEOUT_DEFAULT = 900;

    export class TextBoxViewNode extends FENode {
        XObject: TextBoxView;
        constructor(xobj: TextBoxView) {
            super(xobj);
        }
    }
    Nullstone.RegisterType(TextBoxViewNode, "TextBoxViewNode");

    export class TextBoxView extends FrameworkElement implements IMeasurableHidden, IArrangeableHidden, IRenderable, IActualSizeComputable, ITextModelListener {
        XamlNode: TextBoxViewNode;
        CreateNode(): TextBoxViewNode { return new TextBoxViewNode(this); }

        private _Cursor: rect = new rect();
        private _Layout: Text.TextLayout = new Text.TextLayout();
        private _SelectionChanged: bool = false;
        private _HadSelectedText: bool = false;
        private _CursorVisible: bool = false;
        private _EnableCursor: bool = true;
        private _BlinkTimeout: number = 0;
        private _TextBox: TextBoxBase = null;
        private _Dirty: bool = false;
        private Cursor: string = CursorType.IBeam;

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
            lu.UpdateBounds(true);
            lu.InvalidateMeasure();
            lu.Invalidate();
            this._Dirty = true;
        }
        SetEnableCursor(value: bool) {
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
        _ResetCursorBlink(delay: bool) {
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
            var lu = this.XamlNode.LayoutUpdater;
            lu.Invalidate(rect.transform(this._Cursor, lu.AbsoluteXform));
        }
        private _ShowCursor() {
            this._CursorVisible = true;
            this._InvalidateCursor();
        }
        private _HideCursor() {
            this._CursorVisible = false;
            this._InvalidateCursor();
        }
        private _UpdateCursor(invalidate: bool) {
            var cur = this._TextBox.SelectionCursor;
            var current = this._Cursor;

            if (invalidate && this._CursorVisible)
                this._InvalidateCursor();

            this._Cursor = this._Layout.GetSelectionCursor(null, cur);
            //TODO: ...
            // var irect = rect.clone(this._Cursor);
            // rect.transform(irect, this._Xformer.AbsoluteXform);
            // this._TextBox._ImCtx.SetCursorLocation(irect);

            if (!rect.isEqual(this._Cursor, current))
                this._TextBox._EmitCursorPositionChanged(this._Cursor.Height, this._Cursor.X, this._Cursor.Y);

            if (invalidate && this._CursorVisible)
                this._InvalidateCursor();
        }
        private _UpdateText() {
            var text = this._TextBox.DisplayText;
            this._Layout.Text = text ? text : "", -1;
        }

        ComputeActualSize(baseComputer: () => size, lu: LayoutUpdater) {
            if (lu.LayoutSlot !== undefined)
                return baseComputer.call(lu);

            this.Layout(size.createInfinite());
            return this._Layout.ActualExtents;
        }
        private _MeasureOverride(availableSize: size, error: BError) {
            this.Layout(availableSize);
            var desired = size.clone(this._Layout.ActualExtents);
            if (!isFinite(availableSize.Width))
                desired.Width = Math.max(desired.Width, 11);
            size.min(desired, availableSize);
            return desired;
        }
        private _ArrangeOverride(finalSize: size, error: BError) {
            this.Layout(finalSize);
            var arranged = size.clone(this._Layout.ActualExtents);
            size.max(arranged, finalSize);
            return arranged;
        }
        Layout(constraint: size) {
            this._Layout.MaxWidth = constraint.Width;
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

        Render(ctx: RenderContext, lu: LayoutUpdater, region: rect) {
            var renderSize = lu.RenderSize;
            //TODO: Initialize Selection Brushes
            //this._TextBox._Providers[_PropertyPrecedence.DynamicValue]._InitializeSelectionBrushes();

            this._UpdateCursor(false);

            if (this._SelectionChanged) {
                this._Layout.Select(this._TextBox.SelectionStart, this._TextBox.SelectionLength);
                this._SelectionChanged = false;
            }
            ctx.Save();
            lu._RenderLayoutClip(ctx);
            this._Layout.AvailableWidth = renderSize.Width;
            this._RenderImpl(ctx, region);
            ctx.Restore();
        }
        private _RenderImpl(ctx: RenderContext, region: rect) {
            ctx.Save();
            if (this.FlowDirection === Fayde.FlowDirection.RightToLeft) {
                //TODO: Invert
            }
            this._Layout.Render(ctx);
            if (this._CursorVisible) {
                var canvasCtx = ctx.CanvasContext;
                var rect = this._Cursor;
                canvasCtx.beginPath();
                canvasCtx.moveTo(rect.X + 0.5, rect.Y);
                canvasCtx.lineTo(rect.X + 0.5, rect.Y + rect.Height);
                canvasCtx.lineWidth = 1.0;
                var caretBrush = this._TextBox.CaretBrush;
                if (caretBrush) {
                    caretBrush.SetupBrush(canvasCtx, rect);
                    canvasCtx.strokeStyle = caretBrush.ToHtml5Object();
                } else {
                    canvasCtx.strokeStyle = "#000000";
                }
                canvasCtx.stroke();
            }
            ctx.Restore();
        }

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
                lu.InvalidateMeasure();
                lu.UpdateBounds(true);
            }
            lu.Invalidate();
        }
    }
    Nullstone.RegisterType(TextBoxView, "TextBoxView");
}