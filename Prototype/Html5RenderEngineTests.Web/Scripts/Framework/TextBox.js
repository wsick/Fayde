/// <reference path="Control.js"/>
/// <reference path="PropertyValueProviders.js"/>
/// <reference path="Primitives.js"/>
/// <reference path="List.js"/>
/// <reference path="Style.js"/>
/// <reference path="ContentPresenter.js"/>
/// <reference path="ContentControl.js"/>
/// <reference path="Border.js"/>
/// <reference path="Templates.js"/>

//#region _TextBoxBaseDynamicPropertyValueProvider

_TextBoxBaseDynamicPropertyValueProvider.prototype = new _FrameworkElementProvider;
_TextBoxBaseDynamicPropertyValueProvider.prototype.constructor = _TextBoxBaseDynamicPropertyValueProvider;
function _TextBoxBaseDynamicPropertyValueProvider(obj, propPrecedence, foregroundPropd, backgroundPropd, baselineOffsetPropd) {
    _FrameworkElementProvider.call(this, obj, propPrecedence, _ProviderFlags.RecomputesOnClear | _ProviderFlags.RecomputesOnLowerPriorityChange);
    this._ForegroundPropd = foregroundPropd;
    this._BackgroundPropd = backgroundPropd;
    this._BaselineOffsetPropd = baselineOffsetPropd;
    this._SelectionBackground = undefined;
    this._SelectionForeground = undefined;
    this._BaselineOffset = undefined;
}
_TextBoxBaseDynamicPropertyValueProvider.GetBaseClass = function () { return _FrameworkElementProvider; };

_TextBoxBaseDynamicPropertyValueProvider.prototype.RecomputePropertyValue = function (propd, providerFlags, error) {
    if (propd == this._BackgroundPropd)
        this._SelectionBackground = undefined;
    else if (propd == this._ForegroundPropd)
        this._SelectionForeground = undefined;

    _FrameworkElementProvider.prototype.RecomputePropertyValue.call(this, propd, providerFlags, error);
};
_TextBoxBaseDynamicPropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    var v;
    if (propd == this._BackgroundPropd) {
        v = this._Object.GetValue(propd, this._PropertyPrecedence + 1);
        if (!v)
            v = this._SelectionBackground;
    } else if (propd == this._ForegroundPropd) {
        v = this._Object.GetValue(propd, this._PropertyPrecedence + 1);
        if (!v)
            v = this._SelectionForeground;
    } else if (propd == this._BaselineOffsetPropd) {
        var _TextBoxView = this._Object._View;
        this._BaselineOffset = _TextBoxView == null ? 0 : _TextBoxView.GetBaselineOffset();
        v = this._BaselineOffset;
    }
    if (v != undefined)
        return v;
    return _FrameworkElementProvider.prototype.GetPropertyValue.call(this, propd);
};

_TextBoxBaseDynamicPropertyValueProvider.prototype._InitializeSelectionBrushes = function () {
    if (this._SelectionBackground == null)
        this._SelectionBackground = new SolidColorBrush(new Color(68, 68, 68));
    if (this._SelectionForeground == null)
        this._SelectionForeground = new SolidColorBrush(new Color(255, 255, 255));
};

//#endregion

//#region _TextBoxDynamicPropertyValueProvider

_TextBoxDynamicPropertyValueProvider.prototype = new _TextBoxBaseDynamicPropertyValueProvider;
_TextBoxDynamicPropertyValueProvider.prototype.constructor = _TextBoxDynamicPropertyValueProvider;
function _TextBoxDynamicPropertyValueProvider(obj, propPrecedence) {
    _TextBoxBaseDynamicPropertyValueProvider.call(this, obj, propPrecedence, 
        TextBox.SelectionForegroundProperty, TextBox.SelectionBackgroundProperty, TextBox.BaselineOffsetProperty);
}
_TextBoxDynamicPropertyValueProvider.GetBaseClass = function () { return _TextBoxBaseDynamicPropertyValueProvider; };

//#endregion

//#region _PasswordBoxDynamicPropertyValueProvider

_PasswordBoxDynamicPropertyValueProvider.prototype = new _TextBoxBaseDynamicPropertyValueProvider;
_PasswordBoxDynamicPropertyValueProvider.prototype.constructor = _PasswordBoxDynamicPropertyValueProvider;
function _PasswordBoxDynamicPropertyValueProvider(obj, propPrecedence) {
    _TextBoxBaseDynamicPropertyValueProvider.call(this, obj, propPrecedence, 
        PasswordBox.SelectionForegroundProperty, PasswordBox.SelectionBackgroundProperty, PasswordBox.BaselineOffsetProperty);
}
_PasswordBoxDynamicPropertyValueProvider.GetBaseClass = function () { return _TextBoxBaseDynamicPropertyValueProvider; };

//#endregion

//#region _TextBoxView

_TextBoxView.prototype = new FrameworkElement;
_TextBoxView.prototype.constructor = _TextBoxView;
function _TextBoxView() {
    FrameworkElement.call(this);

    this._Cursor = new Rect();
    this._Layout = new TextLayout();
    this._SelectionChanged = false;
    this._HadSelectedText = false;
    this._CursorVisible = false;
    this._EnableCursor = true;
    this._BlinkTimeout = 0;
    this._TextBox = null;
    this._Dirty = false;
}
_TextBoxView.GetBaseClass = function () { return FrameworkElement; };

_TextBoxView.prototype.SetTextBox = function (/* TextBoxBase */value) {
    if (this._TextBox == value)
        return;

    if (this._TextBox) {
        this._TextBox.ModelChanged.Unsubscribe(this._OnModelChanged, this);
    }

    this._TextBox = value;

    if (this._TextBox) {
        this._TextBox.ModelChanged.Subscribe(this._OnModelChanged, this);

        this._Layout.SetTextAttributes(new List());
        var attrs = new _TextLayoutAttributes(this._TextBox, 0);
        this._Layout.GetTextAttributes().Append(attrs);

        this._Layout.SetTextAlignment(this._TextBox.GetTextAlignment());
        this._Layout.SetTextWrapping(this._TextBox.GetTextWrapping());
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
_TextBoxView.prototype.SetEnableCursor = function (value) {
    if (this._EnableCursor == value)
        return;
    this._EnableCursor = value;
    if (value)
        this._ResetCursorBlink(false);
    else
        this._EndCursorBlink();
};

_TextBoxView.prototype._Blink = function () {
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
_TextBoxView.prototype._ConnectBlinkTimeout = function (multiplier) {
    if (!this._IsAttached)
        return;
    var func = NotImplemented;
    var timeout = this._GetCursorBlinkTimeout() * multiplier / _TextBoxView.CURSOR_BLINK_DIVIDER;
    this._BlinkTimeout = setTimeout(func, timeout);
};
_TextBoxView.prototype._DisconnectBlinkTimeout = function () {
    if (this._BlinkTimeout != 0) {
        if (!this._IsAttached)
            return;
        clearTimeout(this._BlinkTimeout);
        this._BlinkTimeout = 0;
    }
};
_TextBoxView.prototype._GetCursorBlinkTimeout = function () {
    return _TextBoxView.CURSOR_BLINK_TIMEOUT_DEFAULT;
};
_TextBoxView.prototype._ResetCursorBlink = function (delay) {
    if (this._TextBox.IsFocused() && !this._TextBox.HasSelectedText()) {
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
_TextBoxView.prototype._DelayCursorBlink = function () {
    this._DisconnectBlinkTimeout();
    this._ConnectBlinkTimeout(_TextBoxView.CURSOR_BLINK_DELAY_MULTIPLIER);
    this._UpdateCursor(true);
    this._ShowCursor();
};
_TextBoxView.prototype._BeginCursorBlink = function () {
    if (this._BlinkTimeout == 0) {
        this._ConnectBlinkTimeout(_TextBoxView.CURSOR_BLINK_ON_MULTIPLIER);
        this._UpdateCursor(true);
        this._ShowCursor();
    }
};
_TextBoxView.prototype._EndCursorBlink = function () {
    this._DisconnectBlinkTimeout();
    if (this._CursorVisible)
        this._HideCursor();
};
_TextBoxView.prototype._InvalidateCursor = function () {
    this._Invalidate(this._Cursor/*.Transform(this._AbsoluteTransform)*/);
};
_TextBoxView.prototype._ShowCursor = function () {
    this._CursorVisible = true;
    this._InvalidateCursor();
};
_TextBoxView.prototype._HideCursor = function () {
    this._CursorVisible = false;
    this._InvalidateCursor();
};
_TextBoxView.prototype._UpdateCursor = function (invalidate) {
    var cur = this._TextBox.GetCursor();
    var current = this._Cursor;
    var rect;

    if (invalidate && this._CursorVisible)
        this._InvalidateCursor();

    this._Cursor = this._Layout.GetCursor(new Point(), cur);
    rect = this._Cursor; //.Transform(this._AbsoluteTransform);

    //TODO: this._TextBox._ImCtx.SetCursorLocation(rect);

    //TODO: if (this._Cursor != current)
        //TODO: this._TextBox._EmitCursorPositionChanged(this._Cursor.Height, this._Cursor.X, this._Cursor.Y);

    if (invalidate && this._CursorVisible)
        this._InvalidateCursor();
};
_TextBoxView.prototype._UpdateText = function () {
    var text = this._TextBox.GetDisplayText();
    this._Layout.SetText(text ? text : "", -1);
};

_TextBoxView.prototype._ComputeActualSize = function () {
    if (this._ReadLocalValue(LayoutInformation.LayoutSlotProperty))
        return FrameworkElement.prototype._ComputeActualSize.call(this);

    this.Layout(new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY));
    return this._Layout.GetActualExtents();
};
_TextBoxView.prototype._MeasureOverrideWithError = function (availableSize, error) {
    this.Layout(availableSize);
    var desired = this._Layout.GetActualExtents();
    if (!isFinite(availableSize.Width))
        desired.Width = Math.max(desired.Width, 11);
    return desired.Min(availableSize);
};
_TextBoxView.prototype._ArrangeOverrideWithError = function (finalSize, error) {
    this.Layout(finalSize);
    var arranged = this._Layout.GetActualExtents();
    arranged = arranged.Max(finalSize);
    return arranged;
};
_TextBoxView.prototype.Layout = function (constraint) {
    this._Layout.SetMaxWidth(constraint.Width);
    this._Layout.Layout();
    this._Dirty = false;
};

_TextBoxView.prototype.GetBaselineOffset = function () {
    //TODO: GetTransformToUIElementWithError
    return this._Layout.GetBaselineOffset();
};
_TextBoxView.prototype.GetLineFromY = function (y) {
    return this._Layout.GetLineFromY(new Point(), y);
};
_TextBoxView.prototype.GetLineFromIndex = function (index) {
    return this._Layout.GetLineFromIndex(index);
};
_TextBoxView.prototype.GetCursorFromXY = function (x, y) {
    return this._Layout.GetCursorFromXY(new Point(), x, y);
};

_TextBoxView.prototype._Render = function (ctx, region) {
    var renderSize = this._RenderSize;
    this._TextBox._Providers[_PropertyPrecedence.DynamicValue]._InitializeSelectionBrushes();

    this._UpdateCursor(false);

    if (this._SelectionChanged) {
        this._Layout.Select(this._TextBox.GetSelectionStart(), this._TextBox.GetSelectionLength());
        this._SelectionChanged = false;
    }
    ctx.Save();
    this._RenderLayoutClip(ctx);
    this._Layout.SetAvailableWidth(renderSize.Width);
    this._RenderImpl(ctx, region);
    ctx.Restore();
};
_TextBoxView.prototype._RenderImpl = function (ctx, region) {
    ctx.Save();
    if (this.GetFlowDirection() === FlowDirection.RightToLeft) {
        //TODO: Invert
    }
    this._Layout._Render(ctx, this._GetOriginPoint(), new Point());
    if (this._CursorVisible) {
        var caretBrush = this._TextBox.GetCaretBrush();
        if (!caretBrush)
            caretBrush = new SolidColorBrush(new Color(0, 0, 0));
        //TODO: Draw cursor
    }
    ctx.Restore();
};

_TextBoxView.prototype.OnLostFocus = function () {
    this._EndCursorBlink();
};
_TextBoxView.prototype.OnGotFocus = function () {
    this._ResetCursorBlink(false);
};
_TextBoxView.prototype.OnMouseLeftButtonDown = function (args) {
    this._TextBox.OnMouseLeftButtonDown(args);
};
_TextBoxView.prototype.OnMouseLeftButtonUp = function (args) {
    this._TextBox.OnMouseLeftButtonUp(args);
};

_TextBoxView.prototype._OnModelChanged = function (sender, args) {
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

//#endregion

var _TextBoxModelChanged = {
    Nothing: 0,
    TextAlignment: 1,
    TextWrapping: 2,
    Selection: 3,
    Brush: 4,
    Font: 5,
    Text: 6
};
var _TextBoxEmitChanged = {
    NOTHING: 0,
    SELECTION: 1 << 0,
    TEXT: 1 << 1
};

//#region _TextBoxModelChangedEventArgs

_TextBoxModelChangedEventArgs.prototype = new RefObject;
_TextBoxModelChangedEventArgs.prototype.constructor = _TextBoxModelChangedEventArgs;
function _TextBoxModelChangedEventArgs(changed, propArgs) {
    RefObject.call(this);
    this.Changed = changed;
    this.PropArgs = propArgs;
}
_TextBoxModelChangedEventArgs.GetBaseClass = function () { return RefObject; };

//#endregion

//#region TextBoxBase

TextBoxBase.prototype = new Control;
TextBoxBase.prototype.constructor = TextBoxBase;
function TextBoxBase() {
    Control.call(this);
    this._SelectionAnchor = 0;
    this._SelectionCursor = 0;
    this._Buffer = new String();

    this._Font = new Font();

    this.ModelChanged = new MulticastEvent();

    this._Batch = 0;
}
TextBoxBase.GetBaseClass = function () { return Control; };

TextBoxBase.prototype.HasSelectedText = function () {
    return this._SelectionCursor !== this._SelectionAnchor;
};
TextBoxBase.prototype.GetFont = function () {
    return this._Font;
};
TextBoxBase.prototype.GetTextDecorations = function () {
    return TextDecorations.None;
};
TextBoxBase.prototype.GetCursor = function () {
    return this._SelectionCursor;
};
TextBoxBase.prototype.GetSelectionStart = function () {
    AbstractMethod("TextBoxBase.GetSelectionStart");
};
TextBoxBase.prototype.SetSelectionStart = function (value) {
    AbstractMethod("TextBoxBase.SetSelectionStart");
};
TextBoxBase.prototype.GetSelectionLength = function () {
    AbstractMethod("TextBoxBase.GetSelectionLength");
};
TextBoxBase.prototype.SetSelectionLength = function (value) {
    AbstractMethod("TextBoxBase.SetSelectionLength");
};

TextBoxBase.prototype.OnApplyTemplate = function () {
    var contentElement = this.GetTemplateChild("ContentElement");

    if (contentElement == null) {
        Warn("No ContentElement found");
        Control.prototype.OnApplyTemplate.call(this);
        return;
    }

    if (this._View != null) {
        this._View.SetTextBox(null);
    }

    this._View = new _TextBoxView();
    this._View.SetEnableCursor(!this._IsReadOnly);
    this._View.SetTextBox(this);

    if (contentElement instanceof ContentPresenter) {
        contentElement.SetContent(this._View);
    } else if (contentElement instanceof ContentControl) {
        contentElement.SetContent(this._View);
    } else if (contentElement instanceof Border) {
        contentElement.SetChild(this._View);
    } else if (contentElement instanceof Panel) {
        contentElement.GetChildren().Add(this._View);
    } else {
        Warn("Can't handle ContentElement.");
        this._View.SetTextBox(null);
        this._View = null;
    }
    Control.prototype.OnApplyTemplate.call(this);
};

TextBoxBase.prototype._OnPropertyChanged = function (args, error) {
    var changed = _TextBoxModelChanged.Nothing;
    if (args.Property === Control.FontFamilyProperty) {
        this._Font.SetFamily(args.NewValue);
        changed = _TextBoxModelChanged.Font;
    } else if (args.Property === Control.FontSizeProperty) {
        this._Font.SetSize(args.NewValue);
        changed = _TextBoxModelChanged.Font;
    } else if (args.Property === Control.FontStretchProperty) {
        this._Font.SetStretch(args.NewValue);
        changed = _TextBoxModelChanged.Font;
    } else if (args.Property === Control.FontStyleProperty) {
        this._Font.SetStyle(args.NewValue);
        changed = _TextBoxModelChanged.Font;
    } else if (args.Property === Control.FontWeightProperty) {
        this._Font.SetWeight(args.NewValue);
        changed = _TextBoxModelChanged.Font;
    }

    if (changed !== _TextBoxModelChanged.Nothing)
        this.ModelChanged.Raise(this, new _TextBoxModelChangedEventArgs(changed, args));

    if (args.Property.OwnerType !== TextBoxBase) {
        Control.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }

    this.PropertyChanged.Raise(this, args);
};
TextBoxBase.prototype._OnSubPropertyChanged = function (sender, args) {
    if (args.Property === Control.BackgroundProperty
        || args.Property === Control.ForegroundProperty) {
        this.ModelChanged.Raise(this, new _TextBoxModelChangedEventArgs(_TextBoxModelChanged.Brush, args));
        this._Invalidate();
    }

    if (args.Property.OwnerType !== TextBoxBase)
        Control.prototype._OnSubPropertyChanged.call(this, sender, args);
};

TextBoxBase.prototype._BatchPush = function () {
    this._Batch++;
};
TextBoxBase.prototype._BatchPop = function () {
    if (this._Batch == 0) {
        Warn("TextBoxBase._Batch underflow");
        return;
    }
    this._Batch--;
};
TextBoxBase.prototype._SyncAndEmit = function (syncText) {
    if (syncText == undefined)
        syncText = true;

    if (this._Batch != 0 || this._Emit == _TextBoxEmitChanged.NOTHING)
        return;

    if (syncText && (this._Emit & _TextBoxEmitChanged.TEXT))
        this._SyncText();

    if (this._Emit & _TextBoxEmitChanged.SELECTION)
        this._SyncSelectedText();

    if (this._IsLoaded) {
        this._Emit &= this._EventsMask;
        if (this._Emit & _TextBoxEmitChanged.TEXT)
            this._EmitTextChanged();
        if (this._Emit & _TextBoxEmitChanged.SELECTION)
            this._EmitSelectionChanged();
    }

    this._Emit = _TextBoxEmitChanged.NOTHING;
};
TextBoxBase.prototype._SyncText = function () {
    AbstractMethod("TextBoxBase._SyncText");
};
TextBoxBase.prototype._SyncSelectedText = function () {
    AbstractMethod("TextBoxBase._SyncSelectedText");
};
TextBoxBase.prototype.ClearSelection = function (start) {
    this._BatchPush();
    this.SetSelectionStart(start);
    this.SetSelectionLength(0);
    this._BatchPop();
};

TextBoxBase.prototype._EmitTextChanged = function () { };
TextBoxBase.prototype._EmitSelectionChanged = function () { };

//#endregion

//#region TextBox

TextBox.prototype = new TextBoxBase;
TextBox.prototype.constructor = TextBox;
function TextBox() {
    TextBoxBase.call(this);

    this._Providers[_PropertyPrecedence.DynamicValue] = new _TextBoxDynamicPropertyValueProvider(this, _PropertyPrecedence.DynamicValue);

    this._EventsMask = _TextBoxEmitChanged.TEXT | _TextBoxEmitChanged.SELECTION;

    this.SelectionChanged = new MulticastEvent();
    this.TextChanged = new MulticastEvent();
}
TextBox.GetBaseClass = function () { return TextBoxBase; };

//#region DEPENDENCY PROPERTIES

TextBox.SelectionForegroundProperty = DependencyProperty.Register("SelectionForeground", TextBox);
TextBox.prototype.GetSelectionForeground = function () {
    return this.GetValue(TextBox.SelectionForegroundProperty);
};
TextBox.prototype.SetSelectionForeground = function (value) {
    this.SetValue(TextBox.SelectionForegroundProperty, value);
};

TextBox.SelectionBackgroundProperty = DependencyProperty.Register("SelectionBackground", TextBox);
TextBox.prototype.GetSelectionBackground = function () {
    return this.GetValue(TextBox.SelectionBackgroundProperty);
};
TextBox.prototype.SetSelectionBackground = function (value) {
    this.SetValue(TextBox.SelectionBackgroundProperty, value);
};

TextBox.BaselineOffsetProperty = DependencyProperty.Register("BaselineOffset", TextBox);
TextBox.prototype.GetBaselineOffset = function () {
    return this.GetValue(TextBox.BaselineOffsetProperty);
};
TextBox.prototype.SetBaselineOffset = function (value) {
    this.SetValue(TextBox.BaselineOffsetProperty, value);
};

TextBox.SelectedTextProperty = DependencyProperty.Register("SelectedText", TextBox, "");
TextBox.prototype.GetSelectedText = function () {
    return this.GetValue(TextBox.SelectedTextProperty);
};
TextBox.prototype.SetSelectedText = function (value) {
    this.SetValue(TextBox.SelectedTextProperty, value);
};

TextBox.SelectionLengthProperty = DependencyProperty.Register("SelectionLength", TextBox, 0);
TextBox.prototype.GetSelectionLength = function () {
    return this.GetValue(TextBox.SelectionLengthProperty);
};
TextBox.prototype.SetSelectionLength = function (value) {
    this.SetValue(TextBox.SelectionLengthProperty, value);
};

TextBox.SelectionStartProperty = DependencyProperty.Register("SelectionStart", TextBox, 0);
TextBox.prototype.GetSelectionStart = function () {
    return this.GetValue(TextBox.SelectionStartProperty);
};
TextBox.prototype.SetSelectionStart = function (value) {
    this.SetValue(TextBox.SelectionStartProperty, value);
};

TextBox.TextProperty = DependencyProperty.Register("Text", TextBox);
TextBox.prototype.GetText = function () {
    return this.GetValue(TextBox.TextProperty);
};
TextBox.prototype.SetText = function (value) {
    this.SetValue(TextBox.TextProperty, value);
};

TextBox.TextAlignmentProperty = DependencyProperty.Register("TextAlignment", TextBox, TextAlignment.Left);
TextBox.prototype.GetTextAlignment = function () {
    return this.GetValue(TextBox.TextAlignmentProperty);
};
TextBox.prototype.SetTextAlignment = function (value) {
    this.SetValue(TextBox.TextAlignmentProperty, value);
};

TextBox.TextWrappingProperty = DependencyProperty.Register("TextWrapping", TextBox, TextWrapping.NoWrap);
TextBox.prototype.GetTextWrapping = function () {
    return this.GetValue(TextBox.TextWrappingProperty);
};
TextBox.prototype.SetTextWrapping = function (value) {
    this.SetValue(TextBox.TextWrappingProperty, value);
};

TextBox.HorizontalScrollBarVisibilityProperty = DependencyProperty.Register("HorizontalScrollBarVisibility", TextBox, ScrollBarVisibility.Hidden);
TextBox.prototype.GetHorizontalScrollBarVisibility = function () {
    return this.GetValue(TextBox.HorizontalScrollBarVisibilityProperty);
};
TextBox.prototype.SetHorizontalScrollBarVisibility = function (value) {
    this.SetValue(TextBox.HorizontalScrollBarVisibilityProperty, value);
};

TextBox.VerticalScrollBarVisibilityProperty = DependencyProperty.Register("VerticalScrollBarVisibility", TextBox, ScrollBarVisibility.Hidden);
TextBox.prototype.GetVerticalScrollBarVisibility = function () {
    return this.GetValue(TextBox.VerticalScrollBarVisibilityProperty);
};
TextBox.prototype.SetVerticalScrollBarVisibility = function (value) {
    this.SetValue(TextBox.VerticalScrollBarVisibilityProperty, value);
};

//#endregion

//#region INSTANCE METHODS

TextBox.prototype.OnApplyTemplate = function () {
    TextBoxBase.prototype.OnApplyTemplate.call(this);

    if (!this._ContentElement)
        return;
    var prop;
    if ((prop = this._ContentElement.GetDependencyProperty("VerticalScrollBarVisibility")))
        this._ContentElement.SetValue(prop, this.GetValue(TextBox.VerticalScrollBarVisibilityProperty));

    if ((prop = this._ContentElement.GetDependencyProperty("HorizontalScrollBarVisibility"))) {
        if (this.GetTextWrapping() === TextWrapping.Wrap)
            this._ContentElement.SetValue(prop, ScrollBarVisibility.Disabled);
        else
            this._ContentElement.SetValue(prop, this.GetValue(TextBox.HorizontalScrollBarVisibilityProperty));
    }
};

TextBox.prototype.GetDisplayText = function () {
    return this.GetText();
};

TextBox.prototype._SyncSelectedText = function () {
    if (this._SelectionCursor != this._SelectionAnchor) {
        var start = Math.min(this._SelectionAnchor, this._SelectionCursor);
        var end = Math.max(this._SelectionAnchor, this._SelectionCursor);
        var text = this._Buffer.slice(start, end);

        this._SetValue = false;
        this.SetSelectedText(TextBox.SelectedTextProperty, text);
        this._SetValue = true;
    } else {
        this._SetValue = false;
        this.SetSelectedText("");
        this._SetValue = true;
    }
};
TextBox.prototype._SyncText = function () {
    this._SetValue = false;
    this.SetValue(TextBox.TextProperty, this._Buffer);
    this._SetValue = true;
};

TextBox.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== TextBox) {
        TextBoxBase.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }

    var changed = _TextBoxModelChanged.Nothing;
    var propd;
    var start;
    var length;
    var textLen;
    /*if (args.Property === TextBox.AcceptsReturnProperty) {
    NotImplemented("TextBox._OnPropertyChanged");
    } else if (args.Property === TextBox.CaretBrushProperty) {
    NotImplemented("TextBox._OnPropertyChanged");
    } else if (args.Property === TextBox.FontSourceProperty) {
    NotImplemented("TextBox._OnPropertyChanged");
    } else if (args.Property === TextBox.IsReadOnlyProperty) {
    NotImplemented("TextBox._OnPropertyChanged");
    } else if (args.Property === TextBox.MaxLengthProperty) {
    NotImplemented("TextBox._OnPropertyChanged");
    } else */
    if (args.Property === TextBox.SelectedTextProperty) {
        if (this._SetValue) {
            length = Math.abs(this._SelectionCursor - this._SelectionAnchor);
            start = Math.min(this._SelectionAnchor, this._SelectionCursor);

            //TODO: Create undo
            //TODO: Clear redos
            this.ClearSelection(start + textLen);
            //TODO: ResetIMContext();
            this._SyncAndEmit();
            NotImplemented("TextBox._OnPropertyChanged");
        }
    } else if (args.Property === TextBox.SelectionStartProperty) {
        length = Math.abs(this._SelectionCursor - this._SelectionAnchor);
        start = args.NewValue;
        if (start > this._Buffer.length) {
            this.SetSelectionStart(this._Buffer.length);
            return;
        }

        if (start + length > this._Buffer.length) {
            this._BatchPush();
            length = this._Buffer.length - start;
            this.SetSelectionLength(length);
            this._BatchPop();
        }

        if (this._SelectionAnchor != start) {
            changed = _TextBoxModelChanged.Selection;
            this._HaveOffset = false;
        }

        this._SelectionCursor = start + length;
        this._SelectionAnchor = start;

        this._Emit |= _TextBoxEmitChanged.SELECTION;
        this._SyncAndEmit();
    } else if (args.Property === TextBox.SelectionLengthProperty) {
        start = Math.min(this._SelectionAnchor, this._SelectionCursor);
        length = args.NewValue;
        if (start + length > this._Buffer.length) {
            length = this._Buffer.length - start;
            this.SetSelectionLength(length);
            return;
        }
        if (this._SelectionCursor != (start + length)) {
            changed = _TextBoxModelChanged.Selection;
            this._HaveOffset = false;
        }

        this._SelectionCursor = start + length;
        this._SelectionAnchor = start;
        this._Emit |= _TextBoxEmitChanged.SELECTION;
        this._SyncAndEmit();
    } else if (args.Property === TextBox.SelectionBackgroundProperty) {
        changed = _TextBoxModelChanged.Brush;
    } else if (args.Property === TextBox.SelectionForegroundProperty) {
        changed = _TextBoxModelChanged.Brush;
    } else if (args.Property === TextBox.TextProperty) {
        if (this._SetValue) {
            //TODO: Build undo action
            //TODO: Clear redo stack

            this._Emit |= _TextBoxEmitChanged.TEXT;
            this.ClearSelection(0);
            //TODO: ResetIMContext();
            this._SyncAndEmit(false);
            NotImplemented("TextBox._OnPropertyChanged");
        }
        changed = _TextBoxModelChanged.Text;
    } else if (args.Property === TextBox.TextAlignmentProperty) {
        changed = _TextBoxModelChanged.TextAlignment;
    } else if (args.Property === TextBox.TextWrappingProperty) {
        if (this._ContentElement) {
            if ((propd = this._ContentElement.GetDependencyProperty("HorizontalScrollBarVisibility"))) {
                if (args.NewValue === TextWrapping.Wrap)
                    this._ContentElement.SetValue(propd, ScrollBarVisibility.Disabled);
                else
                    this._ContentElement.SetValue(propd, this.GetValue(TextBox.HorizontalScrollBarVisibilityProperty));
            }
        }
        changed = _TextBoxModelChanged.TextWrapping
    } else if (args.Property === TextBox.HorizontalScrollBarVisibilityProperty) {
        if (this._ContentElement) {
            if ((propd = this._ContentElement.GetDependencyProperty("HorizontalScrollBarVisibility"))) {
                if (this.GetTextWrapping() === TextWrapping.Wrap)
                    this._ContentElement.SetValue(propd, ScrollBarVisibility.Disabled);
                else
                    this._ContentElement.SetValue(propd, args.NewValue);
            }
        }
    } else if (args.Property === TextBox.VerticalScrollBarVisibilityProperty) {
        if (this._ContentElement) {
            if ((propd = this._ContentElement.GetDependencyProperty("VerticalScrollBarVisibility")))
                this._ContentElement.SetValue(propd, args.NewValue);
        }
    }

    this.ModelChanged.Raise(this, new _TextBoxModelChangedEventArgs(changed, args));

    this.PropertyChanged.Raise(this, args);
};
TextBox.prototype._OnSubPropertyChanged = function (sender, args) {
    if (args.Property && (args.Property === TextBox.SelectionBackgroundProperty
        || args.Property === TextBox.SelectionForegroundProperty)) {
        this.ModelChanged.Raise(this, new _TextBoxModelChangedEventArgs(_TextBoxModelChanged.Brush));
        this._Invalidate();
    }

    if (args.Property.OwnerType !== TextBox)
        TextBoxBase.prototype._OnSubPropertyChanged.call(this, sender, args);
};

TextBox.prototype._EmitTextChanged = function () {
    this.SelectionChanged.RaiseAsync(this, {});
};
TextBox.prototype._EmitSelectionChanged = function () {
    this.TextChanged.RaiseAsync(this, {});
};

//#endregion

//#region DEFAULT STYLE

TextBox.prototype.GetDefaultStyle = function () {
    var style = new Style();

    style.GetSetters().Add((function () {
        var setter = new Setter();
        setter.SetProperty(Control.BorderThicknessProperty);
        setter.SetValue_Prop(new Thickness(1, 1, 1, 1));
        return setter;
    })());

    style.GetSetters().Add((function () {
        var setter = new Setter();
        setter.SetProperty(Control.BackgroundProperty);
        setter.SetValue_Prop(new SolidColorBrush(new Color(255, 255, 255, 1.0)));
        return setter;
    })());

    style.GetSetters().Add((function () {
        var setter = new Setter();
        setter.SetProperty(Control.ForegroundProperty);
        setter.SetValue_Prop(new SolidColorBrush(new Color(0, 0, 0, 1.0)));
        return setter;
    })());

    style.GetSetters().Add((function () {
        var setter = new Setter();
        setter.SetProperty(Control.PaddingProperty);
        setter.SetValue_Prop(new Thickness(2, 2, 2, 2));
        return setter;
    })());

    style.GetSetters().Add((function () {
        var setter = new Setter();
        setter.SetProperty(Control.BorderBrushProperty);
        setter.SetValue_Prop((function () {
            var brush = new LinearGradientBrush();
            brush.GetGradientStops().Add((function () {
                var stop = new GradientStop();
                stop.SetColor(new Color(163, 174, 185));
                stop.SetOffset(0.0);
                return stop;
            })());
            brush.GetGradientStops().Add((function () {
                var stop = new GradientStop();
                stop.SetColor(new Color(131, 153, 169));
                stop.SetOffset(0.375);
                return stop;
            })());
            brush.GetGradientStops().Add((function () {
                var stop = new GradientStop();
                stop.SetColor(new Color(113, 133, 151));
                stop.SetOffset(0.375);
                return stop;
            })());
            brush.GetGradientStops().Add((function () {
                var stop = new GradientStop();
                stop.SetColor(new Color(97, 117, 132));
                stop.SetOffset(1.0);
                return stop;
            })());
            return brush;
        })());
        return setter;
    })());

    style.GetSetters().Add((function () {
        var setter = new Setter();
        setter.SetProperty(Control.TemplateProperty);
        setter.SetValue_Prop((function () {
            return ControlTemplate.CreateTemplateFromJson({
                Type: Grid,
                Name: "RootElement",
                Children: [
                    {
                        Type: Border,
                        Name: "Border",
                        Props: {
                            CornerRadius: new CornerRadius(1, 1, 1, 1),
                            Opacity: 1.0,
                            BorderThickness: new TemplateBinding("BorderThickness"),
                            Background: new TemplateBinding("Background"),
                            BorderBrush: new TemplateBinding("BorderBrush")
                        },
                        Content: {
                            Type: Grid,
                            Children: [
                                {
                                    Type: Border,
                                    Name: "ReadOnlyVisualElement",
                                    Props: {
                                        Opacity: 0.0,
                                        Background: new SolidColorBrush(Color.FromHex("#5EC9C9C9"))
                                    }
                                },
                                {
                                    Type: Border,
                                    Name: "MouseOverBorder",
                                    Props: {
                                        BorderThickness: new Thickness(1, 1, 1, 1),
                                        BorderBrush: new SolidColorBrush(Color.FromHex("#00000000"))
                                    },
                                    Content: {
                                        Type: Border,
                                        Name: "ContentElement",
                                        Props: {
                                            Padding: new TemplateBinding("Padding"),
                                            //IsTabStop: false,
                                            BorderThickness: new Thickness(0, 0, 0, 0)
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        Type: Border,
                        Name: "DisabledVisualElement",
                        Props: {
                            Background: new SolidColorBrush(Color.FromHex("#A5F7F7F7")),
                            BorderBrush: new SolidColorBrush(Color.FromHex("#A5F7F7F7")),
                            BorderThickness: new TemplateBinding("BorderThickness"),
                            Opacity: 0.0,
                            IsHitTestVisible: false
                        }
                    },
                    {
                        Type: Border,
                        Name: "FocusVisualElement",
                        Props: {
                            BorderBrush: new SolidColorBrush(Color.FromHex("#FF6DBDD1")),
                            BorderThickness: new TemplateBinding("BorderThickness"),
                            Margin: new Thickness(1, 1, 1, 1),
                            Opacity: 0.0,
                            IsHitTestVisible: false
                        }
                    }
                ]
            });
        })());
        return setter;
    })());

    return style;
};

//#endregion

//#endregion

//#region PasswordBox

PasswordBox.prototype = new TextBoxBase;
PasswordBox.prototype.constructor = PasswordBox;
function PasswordBox() {
    TextBoxBase.call(this);

    this._Providers[_PropertyPrecedence.DynamicValue] = new _PasswordBoxDynamicPropertyValueProvider(this, _PropertyPrecedence.DynamicValue);
    this._EventsMask = _TextBoxEmitChanged.TEXT;
}
PasswordBox.GetBaseClass = function () { return TextBoxBase; };

//#endregion