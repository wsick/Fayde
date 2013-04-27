var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Controls) {
        /// <reference path="../Core/FrameworkElement.ts" />
        /// CODE
        /// <reference path="../Primitives/rect.ts" />
        /// <reference path="../Text/TextLayout.ts" />
        /// <reference path="../Text/TextAttributes.ts" />
        /// <reference path="TextBox.ts" />
        /// <reference path="../Core/Enums.ts" />
        /// <reference path="TextBoxBase.ts" />
        (function (Internal) {
            var CURSOR_BLINK_DIVIDER = 3;
            var CURSOR_BLINK_OFF_MULTIPLIER = 2;
            var CURSOR_BLINK_DELAY_MULTIPLIER = 3;
            var CURSOR_BLINK_ON_MULTIPLIER = 4;
            var CURSOR_BLINK_TIMEOUT_DEFAULT = 900;
            var TextBoxViewNode = (function (_super) {
                __extends(TextBoxViewNode, _super);
                function TextBoxViewNode(xobj) {
                                _super.call(this, xobj);
                }
                return TextBoxViewNode;
            })(Fayde.FENode);
            Internal.TextBoxViewNode = TextBoxViewNode;            
            Nullstone.RegisterType(TextBoxViewNode, "TextBoxViewNode");
            var TextBoxView = (function (_super) {
                __extends(TextBoxView, _super);
                function TextBoxView() {
                    _super.apply(this, arguments);

                    this._Cursor = new rect();
                    this._Layout = new Fayde.Text.TextLayout();
                    this._SelectionChanged = false;
                    this._HadSelectedText = false;
                    this._CursorVisible = false;
                    this._EnableCursor = true;
                    this._BlinkTimeout = 0;
                    this._TextBox = null;
                    this._Dirty = false;
                    this.Cursor = Fayde.CursorType.IBeam;
                }
                TextBoxView.prototype.CreateNode = function () {
                    return new TextBoxViewNode(this);
                };
                TextBoxView.prototype.SetTextBox = function (textBox) {
                    if(this._TextBox === textBox) {
                        return;
                    }
                    if(this._TextBox) {
                        this._TextBox.Unlisten(this);
                    }
                    this._TextBox = textBox;
                    if(textBox) {
                        textBox.Listen(this);
                        this._Layout.TextAttributes = [
                            new Fayde.Text.TextLayoutAttributes(textBox)
                        ];
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
                };
                TextBoxView.prototype.SetEnableCursor = function (value) {
                    if(this._EnableCursor === value) {
                        return;
                    }
                    this._EnableCursor = value;
                    if(value) {
                        this._ResetCursorBlink(false);
                    } else {
                        this._EndCursorBlink();
                    }
                };
                TextBoxView.prototype._Blink = function () {
                    var multiplier;
                    if(this._CursorVisible) {
                        multiplier = CURSOR_BLINK_OFF_MULTIPLIER;
                        this._HideCursor();
                    } else {
                        multiplier = CURSOR_BLINK_ON_MULTIPLIER;
                        this._ShowCursor();
                    }
                    this._ConnectBlinkTimeout(multiplier);
                    return false;
                };
                TextBoxView.prototype._ConnectBlinkTimeout = function (multiplier) {
                    var _this = this;
                    if(!this.XamlNode.IsAttached) {
                        return;
                    }
                    var timeout = this._GetCursorBlinkTimeout() * multiplier / CURSOR_BLINK_DIVIDER;
                    this._BlinkTimeout = setTimeout(function () {
                        return _this._Blink();
                    }, timeout);
                };
                TextBoxView.prototype._DisconnectBlinkTimeout = function () {
                    if(this._BlinkTimeout !== 0) {
                        if(!this.XamlNode.IsAttached) {
                            return;
                        }
                        clearTimeout(this._BlinkTimeout);
                        this._BlinkTimeout = 0;
                    }
                };
                TextBoxView.prototype._GetCursorBlinkTimeout = function () {
                    return CURSOR_BLINK_TIMEOUT_DEFAULT;
                };
                TextBoxView.prototype._ResetCursorBlink = function (delay) {
                    if(this._TextBox.XamlNode.IsFocused && !this._TextBox.HasSelectedText) {
                        if(this._EnableCursor) {
                            if(delay) {
                                this._DelayCursorBlink();
                            } else {
                                this._BeginCursorBlink();
                            }
                        } else {
                            this._UpdateCursor(false);
                        }
                    } else {
                        this._EndCursorBlink();
                    }
                };
                TextBoxView.prototype._DelayCursorBlink = function () {
                    this._DisconnectBlinkTimeout();
                    this._ConnectBlinkTimeout(CURSOR_BLINK_DELAY_MULTIPLIER);
                    this._UpdateCursor(true);
                    this._ShowCursor();
                };
                TextBoxView.prototype._BeginCursorBlink = function () {
                    if(this._BlinkTimeout === 0) {
                        this._ConnectBlinkTimeout(CURSOR_BLINK_ON_MULTIPLIER);
                        this._UpdateCursor(true);
                        this._ShowCursor();
                    }
                };
                TextBoxView.prototype._EndCursorBlink = function () {
                    this._DisconnectBlinkTimeout();
                    if(this._CursorVisible) {
                        this._HideCursor();
                    }
                };
                TextBoxView.prototype._InvalidateCursor = function () {
                    var lu = this.XamlNode.LayoutUpdater;
                    lu.Invalidate(rect.transform(this._Cursor, lu.AbsoluteXform));
                };
                TextBoxView.prototype._ShowCursor = function () {
                    this._CursorVisible = true;
                    this._InvalidateCursor();
                };
                TextBoxView.prototype._HideCursor = function () {
                    this._CursorVisible = false;
                    this._InvalidateCursor();
                };
                TextBoxView.prototype._UpdateCursor = function (invalidate) {
                    var cur = this._TextBox.SelectionCursor;
                    var current = this._Cursor;
                    if(invalidate && this._CursorVisible) {
                        this._InvalidateCursor();
                    }
                    this._Cursor = this._Layout.GetSelectionCursor(new Point(), cur);
                    //TODO: ...
                    // var irect = rect.clone(this._Cursor);
                    // rect.transform(irect, this._Xformer.AbsoluteXform);
                    // this._TextBox._ImCtx.SetCursorLocation(irect);
                    if(!rect.isEqual(this._Cursor, current)) {
                        this._TextBox._EmitCursorPositionChanged(this._Cursor.Height, this._Cursor.X, this._Cursor.Y);
                    }
                    if(invalidate && this._CursorVisible) {
                        this._InvalidateCursor();
                    }
                };
                TextBoxView.prototype._UpdateText = function () {
                    var text = this._TextBox.DisplayText;
                    this._Layout.Text = text ? text : "" , -1;
                };
                TextBoxView.prototype.ComputeActualSize = function (baseComputer, lu) {
                    if(lu.LayoutSlot !== undefined) {
                        return baseComputer.call(lu);
                    }
                    this.Layout(size.createInfinite());
                    return this._Layout.ActualExtents;
                };
                TextBoxView.prototype._MeasureOverride = function (availableSize, error) {
                    this.Layout(availableSize);
                    var desired = size.clone(this._Layout.ActualExtents);
                    if(!isFinite(availableSize.Width)) {
                        desired.Width = Math.max(desired.Width, 11);
                    }
                    size.min(desired, availableSize);
                    return desired;
                };
                TextBoxView.prototype._ArrangeOverride = function (finalSize, error) {
                    this.Layout(finalSize);
                    var arranged = size.clone(this._Layout.ActualExtents);
                    size.max(arranged, finalSize);
                    return arranged;
                };
                TextBoxView.prototype.Layout = function (constraint) {
                    this._Layout.MaxWidth = constraint.Width;
                    this._Layout.Layout();
                    this._Dirty = false;
                };
                TextBoxView.prototype.GetBaselineOffset = function () {
                    //TODO: GetTransformToUIElementWithError
                    return this._Layout.GetBaselineOffset();
                };
                TextBoxView.prototype.GetLineFromY = function (y) {
                    return this._Layout.GetLineFromY(new Point(), y);
                };
                TextBoxView.prototype.GetLineFromIndex = function (index) {
                    return this._Layout.GetLineFromIndex(index);
                };
                TextBoxView.prototype.GetCursorFromXY = function (x, y) {
                    return this._Layout.GetCursorFromXY(new Point(), x, y);
                };
                TextBoxView.prototype.Render = function (ctx, lu, region) {
                    var renderSize = lu.RenderSize;
                    //TODO: Initialize Selection Brushes
                    //this._TextBox._Providers[_PropertyPrecedence.DynamicValue]._InitializeSelectionBrushes();
                    this._UpdateCursor(false);
                    if(this._SelectionChanged) {
                        this._Layout.Select(this._TextBox.SelectionStart, this._TextBox.SelectionLength);
                        this._SelectionChanged = false;
                    }
                    ctx.Save();
                    lu._RenderLayoutClip(ctx);
                    this._Layout.AvailableWidth = renderSize.Width;
                    this._RenderImpl(ctx, region);
                    ctx.Restore();
                };
                TextBoxView.prototype._RenderImpl = function (ctx, region) {
                    ctx.Save();
                    if(this.FlowDirection === Fayde.FlowDirection.RightToLeft) {
                    }
                    this._Layout.Render(ctx);
                    if(this._CursorVisible) {
                        var caretBrush = this._TextBox.CaretBrush;
                        var canvasCtx = ctx.CanvasContext;
                        var rect = this._Cursor;
                        canvasCtx.beginPath();
                        canvasCtx.moveTo(rect.X + 0.5, rect.Y);
                        canvasCtx.lineTo(rect.X + 0.5, rect.Y + rect.Height);
                        canvasCtx.lineWidth = 1.0;
                        if(caretBrush) {
                            caretBrush.SetupBrush(canvasCtx, rect);
                            canvasCtx.strokeStyle = caretBrush.ToHtml5Object();
                        } else {
                            canvasCtx.strokeStyle = "#000000";
                        }
                        canvasCtx.stroke();
                    }
                    ctx.Restore();
                };
                TextBoxView.prototype.OnLostFocus = function (e) {
                    this._EndCursorBlink();
                };
                TextBoxView.prototype.OnGotFocus = function (e) {
                    this._ResetCursorBlink(false);
                };
                TextBoxView.prototype.OnMouseLeftButtonDown = function (e) {
                    this._TextBox.OnMouseLeftButtonDown(e);
                };
                TextBoxView.prototype.OnMouseLeftButtonUp = function (e) {
                    this._TextBox.OnMouseLeftButtonUp(e);
                };
                TextBoxView.prototype.OnTextModelChanged = function (args) {
                    var lu = this.XamlNode.LayoutUpdater;
                    switch(args.Changed) {
                        case Controls.TextBoxModelChangedType.TextAlignment:
                            if(this._Layout.SetTextAlignment(args.PropArgs.NewValue)) {
                                this._Dirty = true;
                            }
                            break;
                        case Controls.TextBoxModelChangedType.TextWrapping:
                            if(this._Layout.SetTextWrapping(args.PropArgs.NewValue)) {
                                this._Dirty = true;
                            }
                            break;
                        case Controls.TextBoxModelChangedType.Selection:
                            if(this._HadSelectedText || this._TextBox.HasSelectedText) {
                                this._HadSelectedText = this._TextBox.HasSelectedText;
                                this._SelectionChanged = true;
                                this._ResetCursorBlink(false);
                            } else {
                                this._ResetCursorBlink(true);
                                return;
                            }
                            break;
                        case Controls.TextBoxModelChangedType.Brush:
                            break;
                        case Controls.TextBoxModelChangedType.Font:
                            this._Layout.ResetState();
                            this._Dirty = true;
                            break;
                        case Controls.TextBoxModelChangedType.Text:
                            this._UpdateText();
                            this._Dirty = true;
                            break;
                        default:
                            return;
                    }
                    if(this._Dirty) {
                        lu.InvalidateMeasure();
                        lu.UpdateBounds(true);
                    }
                    lu.Invalidate();
                };
                return TextBoxView;
            })(Fayde.FrameworkElement);
            Internal.TextBoxView = TextBoxView;            
            Nullstone.RegisterType(TextBoxView, "TextBoxView");
        })(Controls.Internal || (Controls.Internal = {}));
        var Internal = Controls.Internal;
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=TextBoxView.js.map
