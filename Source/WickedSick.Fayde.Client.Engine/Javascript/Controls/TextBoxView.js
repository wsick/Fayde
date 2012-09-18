/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/FrameworkElement.js"/>
/// CODE
/// <reference path="../Primitives/Rect.js"/>
/// <reference path="../Text/TextLayout.js"/>
/// <reference path="TextBoxBase.js"/>
/// <reference path="../Primitives/Enums.js"/>
/// <reference path="../Engine/RenderContext.js"/>

//#region _TextBoxView
var _TextBoxView = Nullstone.Create("_TextBoxView", FrameworkElement);

_TextBoxView.Instance.Init = function () {
    this.Init$FrameworkElement();
    this._Cursor = new Rect();
    this._Layout = new TextLayout();
    this._SelectionChanged = false;
    this._HadSelectedText = false;
    this._CursorVisible = false;
    this._EnableCursor = true;
    this._BlinkTimeout = 0;
    this._TextBox = null;
    this._Dirty = false;
    this.Cursor = CursorType.IBeam;
};

_TextBoxView.Instance.SetTextBox = function (value) {
    /// <param name="value" type="TextBoxBase"></param>
    if (this._TextBox == value)
        return;

    if (this._TextBox) {
        this._TextBox.ModelChanged.Unsubscribe(this._OnModelChanged, this);
    }

    this._TextBox = value;

    if (this._TextBox) {
        this._TextBox.ModelChanged.Subscribe(this._OnModelChanged, this);

        this._Layout.SetTextAttributes(new LinkedList());
        var attrs = new _TextLayoutAttributes(this._TextBox, 0);
        this._Layout.GetTextAttributes().Append(attrs);

        this._Layout.SetTextAlignment(this._TextBox.TextAlignment);
        this._Layout.SetTextWrapping(this._TextBox.TextWrapping);
        this._HadSelectedText = this._TextBox.HasSelectedText();
        this._SelectionChanged = true;
        this._UpdateText();

    } else {
        this._Layout.SetTextAttributes(null);
        this._Layout.SetText(null, -1);
    }

    this._UpdateBounds(true);
    this._InvalidateMeasure();
    this._Invalidate();
    this._Dirty = true;
};
_TextBoxView.Instance.SetEnableCursor = function (value) {
    if (this._EnableCursor == value)
        return;
    this._EnableCursor = value;
    if (value)
        this._ResetCursorBlink(false);
    else
        this._EndCursorBlink();
};

_TextBoxView.Instance._Blink = function () {
    var multiplier;
    if (this._CursorVisible) {
        multiplier = _TextBoxView.CURSOR_BLINK_OFF_MULTIPLIER;
        this._HideCursor();
    } else {
        multiplier = _TextBoxView.CURSOR_BLINK_ON_MULTIPLIER;
        this._ShowCursor();
    }
    this._ConnectBlinkTimeout(multiplier);
    return false;
};
_TextBoxView.Instance._ConnectBlinkTimeout = function (multiplier) {
    if (!this._IsAttached)
        return;
    var view = this;
    var timeout = this._GetCursorBlinkTimeout() * multiplier / _TextBoxView.CURSOR_BLINK_DIVIDER;
    this._BlinkTimeout = setTimeout(function () { view._Blink(); }, timeout);
};
_TextBoxView.Instance._DisconnectBlinkTimeout = function () {
    if (this._BlinkTimeout != 0) {
        if (!this._IsAttached)
            return;
        clearTimeout(this._BlinkTimeout);
        this._BlinkTimeout = 0;
    }
};
_TextBoxView.Instance._GetCursorBlinkTimeout = function () {
    return _TextBoxView.CURSOR_BLINK_TIMEOUT_DEFAULT;
};
_TextBoxView.Instance._ResetCursorBlink = function (delay) {
    if (this._TextBox._IsFocused && !this._TextBox.HasSelectedText()) {
        if (this._EnableCursor) {
            if (this._Delay)
                this._DelayCursorBlink();
            else
                this._BeginCursorBlink();
        } else {
            this._UpdateCursor(false);
        }
    } else {
        this._EndCursorBlink();
    }
};
_TextBoxView.Instance._DelayCursorBlink = function () {
    this._DisconnectBlinkTimeout();
    this._ConnectBlinkTimeout(_TextBoxView.CURSOR_BLINK_DELAY_MULTIPLIER);
    this._UpdateCursor(true);
    this._ShowCursor();
};
_TextBoxView.Instance._BeginCursorBlink = function () {
    if (this._BlinkTimeout == 0) {
        this._ConnectBlinkTimeout(_TextBoxView.CURSOR_BLINK_ON_MULTIPLIER);
        this._UpdateCursor(true);
        this._ShowCursor();
    }
};
_TextBoxView.Instance._EndCursorBlink = function () {
    this._DisconnectBlinkTimeout();
    if (this._CursorVisible)
        this._HideCursor();
};
_TextBoxView.Instance._InvalidateCursor = function () {
    this._Invalidate(this._Cursor.Transform(this._AbsoluteXform));
};
_TextBoxView.Instance._ShowCursor = function () {
    this._CursorVisible = true;
    this._InvalidateCursor();
};
_TextBoxView.Instance._HideCursor = function () {
    this._CursorVisible = false;
    this._InvalidateCursor();
};
_TextBoxView.Instance._UpdateCursor = function (invalidate) {
    var cur = this._TextBox.GetSelectionCursor();
    var current = this._Cursor;
    var rect;

    if (invalidate && this._CursorVisible)
        this._InvalidateCursor();

    this._Cursor = this._Layout.GetSelectionCursor(new Point(), cur);
    rect = this._Cursor.Transform(this._AbsoluteXform);

    //TODO: this._TextBox._ImCtx.SetCursorLocation(rect);

    if (!Rect.Equals(this._Cursor, current))
        this._TextBox._EmitCursorPositionChanged(this._Cursor.Height, this._Cursor.X, this._Cursor.Y);

    if (invalidate && this._CursorVisible)
        this._InvalidateCursor();
};
_TextBoxView.Instance._UpdateText = function () {
    var text = this._TextBox.GetDisplayText();
    this._Layout.SetText(text ? text : "", -1);
};

_TextBoxView.Instance._ComputeActualSize = function () {
    if (this._ReadLocalValue(LayoutInformation.LayoutSlotProperty) !== undefined)
        return this._ComputeActualSize$FrameworkElement();

    this.Layout(new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY));
    return this._Layout.GetActualExtents();
};
_TextBoxView.Instance._MeasureOverrideWithError = function (availableSize, error) {
    this.Layout(availableSize);
    var desired = this._Layout.GetActualExtents();
    if (!isFinite(availableSize.Width))
        desired.Width = Math.max(desired.Width, 11);
    return desired.Min(availableSize);
};
_TextBoxView.Instance._ArrangeOverrideWithError = function (finalSize, error) {
    this.Layout(finalSize);
    var arranged = this._Layout.GetActualExtents();
    arranged = arranged.Max(finalSize);
    return arranged;
};
_TextBoxView.Instance.Layout = function (constraint) {
    this._Layout.SetMaxWidth(constraint.Width);
    this._Layout.Layout();
    this._Dirty = false;
};

_TextBoxView.Instance.GetBaselineOffset = function () {
    //TODO: GetTransformToUIElementWithError
    return this._Layout.GetBaselineOffset();
};
_TextBoxView.Instance.GetLineFromY = function (y) {
    return this._Layout.GetLineFromY(new Point(), y);
};
_TextBoxView.Instance.GetLineFromIndex = function (index) {
    return this._Layout.GetLineFromIndex(index);
};
_TextBoxView.Instance.GetCursorFromXY = function (x, y) {
    return this._Layout.GetCursorFromXY(new Point(), x, y);
};

_TextBoxView.Instance._Render = function (ctx, region) {
    var renderSize = this._RenderSize;
    this._TextBox._Providers[_PropertyPrecedence.DynamicValue]._InitializeSelectionBrushes();

    this._UpdateCursor(false);

    if (this._SelectionChanged) {
        this._Layout.Select(this._TextBox.SelectionStart, this._TextBox.SelectionLength);
        this._SelectionChanged = false;
    }
    ctx.Save();
    this._RenderLayoutClip(ctx);
    this._Layout.SetAvailableWidth(renderSize.Width);
    this._RenderImpl(ctx, region);
    ctx.Restore();
};
_TextBoxView.Instance._RenderImpl = function (ctx, region) {
    /// <param name="ctx" type="_RenderContext"></param>
    ctx.Save();
    if (this.FlowDirection === FlowDirection.RightToLeft) {
        //TODO: Invert
    }
    this._Layout._Render(ctx, this._GetOriginPoint(), new Point());
    if (this._CursorVisible) {
        var caretBrush = this._TextBox.CaretBrush;
        if (!caretBrush)
            caretBrush = new SolidColorBrush(new Color(0, 0, 0));

        var canvasCtx = ctx.CanvasContext;
        var rect = this._Cursor;
        canvasCtx.beginPath();
        canvasCtx.moveTo(rect.X + 0.5, rect.Y);
        canvasCtx.lineTo(rect.X + 0.5, rect.Y + rect.Height);
        canvasCtx.lineWidth = 1.0;
        caretBrush.SetupBrush(canvasCtx, rect);
        canvasCtx.strokeStyle = caretBrush.ToHtml5Object();
        canvasCtx.stroke();
    }
    ctx.Restore();
};

_TextBoxView.Instance.OnLostFocus = function (e) {
    this._EndCursorBlink();
};
_TextBoxView.Instance.OnGotFocus = function (e) {
    this._ResetCursorBlink(false);
};
_TextBoxView.Instance.OnMouseLeftButtonDown = function (sender, args) {
    this._TextBox.OnMouseLeftButtonDown(sender, args);
};
_TextBoxView.Instance.OnMouseLeftButtonUp = function (sender, args) {
    this._TextBox.OnMouseLeftButtonUp(sender, args);
};

_TextBoxView.Instance._OnModelChanged = function (sender, args) {
    switch (args.Changed) {
        case _TextBoxModelChanged.TextAlignment:
            if (this._Layout.SetTextAlignment(args.NewValue))
                this._Dirty = true;
            break;
        case _TextBoxModelChanged.TextWrapping:
            if (this._Layout.SetTextWrapping(args.NewValue))
                this._Dirty = true;
            break;
        case _TextBoxModelChanged.Selection:
            if (this._HadSelectedText || this._TextBox.HasSelectedText()) {
                this._HadSelectedText = this._TextBox.HasSelectedText();
                this._SelectionChanged = true;
                this._ResetCursorBlink(false);
            } else {
                this._ResetCursorBlink(true);
                return;
            }
            break;
        case _TextBoxModelChanged.Brush:
            break;
        case _TextBoxModelChanged.Font:
            this._Layout._ResetState();
            this._Dirty = true;
            break;
        case _TextBoxModelChanged.Text:
            this._UpdateText();
            this._Dirty = true;
            break;
        default:
            return;
    }
    if (this._Dirty) {
        this._InvalidateMeasure();
        this._UpdateBounds(true);
    }
    this._Invalidate();
};

_TextBoxView.CURSOR_BLINK_DIVIDER = 3;
_TextBoxView.CURSOR_BLINK_OFF_MULTIPLIER = 2;
_TextBoxView.CURSOR_BLINK_DELAY_MULTIPLIER = 3;
_TextBoxView.CURSOR_BLINK_ON_MULTIPLIER = 4;
_TextBoxView.CURSOR_BLINK_TIMEOUT_DEFAULT = 900;

Nullstone.FinishCreate(_TextBoxView);
//#endregion