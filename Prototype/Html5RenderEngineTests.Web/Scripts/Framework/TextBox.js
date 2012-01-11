/// <reference path="Control.js"/>
/// <reference path="PropertyValueProviders.js"/>
/// <reference path="Primitives.js"/>
/// <reference path="List.js"/>
/// <reference path="Style.js"/>
/// <reference path="ContentPresenter.js"/>
/// <reference path="ContentControl.js"/>
/// <reference path="Border.js"/>

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

//#endregion

//#region _PasswordBoxDynamicPropertyValueProvider

_PasswordBoxDynamicPropertyValueProvider.prototype = new _TextBoxBaseDynamicPropertyValueProvider;
_PasswordBoxDynamicPropertyValueProvider.prototype.constructor = _PasswordBoxDynamicPropertyValueProvider;
function _PasswordBoxDynamicPropertyValueProvider(obj, propPrecedence) {
    _TextBoxBaseDynamicPropertyValueProvider.call(this, obj, propPrecedence, 
        PasswordBox.SelectionForegroundProperty, PasswordBox.SelectionBackgroundProperty, PasswordBox.BaselineOffsetProperty);
}

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

_TextBoxView.prototype.SetTextBox = function (/* TextBoxBase */value) {
    if (this._TextBox == value)
        return;

    if (this._TextBox) {
        //TODO: Remove ModelChanged handler
    }

    this._TextBox = value;

    if (this._TextBox) {
        //TODO: Add ModelChanged handler

        this._Layout.SetTextAttributes(new List());
        var attrs = new _TextLayoutAttributes(this._TextBox, 0);
        this._Layout.GetTextAttributes().Append(attrs);

        this._Layout.SetTextAlignment(this._TextBox.GetTextAlignment());
        this._Layout.SetTextWrapping(this._TextBox.GetTextWrapping());
        this._HadSelectedText = this._TextBox.HadSelectedText();
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

    this._TextBox._ImCtx.SetCursorLocation(rect);

    if (this._Cursor != current)
        this._TextBox._EmitCursorPositionChanged(this._Cursor.Height, this._Cursor.X, this._Cursor.Y);

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
    this._Providers[_PropertyPrecedence.DynamicValue]._InitializeSelectionBrushes();

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

_TextBoxView.CURSOR_BLINK_DIVIDER = 3;
_TextBoxView.CURSOR_BLINK_OFF_MULTIPLIER = 2;
_TextBoxView.CURSOR_BLINK_DELAY_MULTIPLIER = 3;
_TextBoxView.CURSOR_BLINK_ON_MULTIPLIER = 4;
_TextBoxView.CURSOR_BLINK_TIMEOUT_DEFAULT = 900;

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
}

TextBoxBase.prototype._OnPropertyChanged = function (args, error) {
    //var changed = _TextBoxModelChanged.Nothing;
    if (args.Property === Control.FontFamilyProperty) {
        this._Font.SetFamily(args.NewValue);
        //changed = _TextBoxModelChanged.Font;
    } else if (args.Property === Control.FontSizeProperty) {
        this._Font.SetSize(args.NewValue);
        //changed = _TextBoxModelChanged.Font;
    } else if (args.Property === Control.FontStretchProperty) {
        this._Font.SetStretch(args.NewValue);
        //changed = _TextBoxModelChanged.Font;
    } else if (args.Property === Control.FontStyleProperty) {
        this._Font.SetStyle(args.NewValue);
        //changed = _TextBoxModelChanged.Font;
    } else if (args.Property === Control.FontWeightProperty) {
        this._Font.SetWeight(args.NewValue);
        //changed = _TextBoxModelChanged.Font;
    }

    //TODO: if (changed !== _TextBoxModelChanged.Nothing)
    //TODO: Emit - Model Changed Event

    if (args.Property.OwnerType !== TextBoxBase) {
        Control.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }

    this.PropertyChanged.Raise(this, args);
};
TextBoxBase.prototype._OnSubPropertyChanged = function (sender, args) {
    if (args.Property === Control.BackgroundProperty
        || args.Property === Control.ForegroundProperty) {
        //TODO: Emit - Model Changed Event
        this._Invalidate();
    }

    if (args.Property.OwnerType !== TextBoxBase)
        Control.prototype._OnSubPropertyChanged.call(this, sender, args);
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

//#endregion

//#region TextBox

TextBox.prototype = new TextBoxBase;
TextBox.prototype.constructor = TextBox;
function TextBox() {
    TextBoxBase.call(this);

    this._Providers[_PropertyPrecedence.DynamicValue] = new _TextBoxDynamicPropertyValueProvider(this, _PropertyPrecedence.DynamicValue);
}

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

TextBox.SelectedTextProperty = DependencyProperty.Register("SelectedText", TextBox);
TextBox.prototype.GetSelectedText = function () {
    return this.GetValue(TextBox.SelectedTextProperty);
};
TextBox.prototype.SetSelectedText = function (value) {
    this.SetValue(TextBox.SelectedTextProperty, value);
};

TextBox.SelectionLengthProperty = DependencyProperty.Register("SelectionLength", TextBox);
TextBox.prototype.GetSelectionLength = function () {
    return this.GetValue(TextBox.SelectionLengthProperty);
};
TextBox.prototype.SetSelectionLength = function (value) {
    this.SetValue(TextBox.SelectionLengthProperty, value);
};

TextBox.SelectionStartProperty = DependencyProperty.Register("SelectionStart", TextBox);
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

TextBox.TextAlignmentProperty = DependencyProperty.Register("TextAlignment", TextBox);
TextBox.prototype.GetTextAlignment = function () {
    return this.GetValue(TextBox.TextAlignmentProperty);
};
TextBox.prototype.SetTextAlignment = function (value) {
    this.SetValue(TextBox.TextAlignmentProperty, value);
};

TextBox.TextWrappingProperty = DependencyProperty.Register("TextWrapping", TextBox);
TextBox.prototype.GetTextWrapping = function () {
    return this.GetValue(TextBox.TextWrappingProperty);
};
TextBox.prototype.SetTextWrapping = function (value) {
    this.SetValue(TextBox.TextWrappingProperty, value);
};

TextBox.HorizontalScrollBarVisibilityProperty = DependencyProperty.Register("HorizontalScrollBarVisibility", TextBox);
TextBox.prototype.GetHorizontalScrollBarVisibility = function () {
    return this.GetValue(TextBox.HorizontalScrollBarVisibilityProperty);
};
TextBox.prototype.SetHorizontalScrollBarVisibility = function (value) {
    this.SetValue(TextBox.HorizontalScrollBarVisibilityProperty, value);
};

TextBox.VerticalScrollBarVisibilityProperty = DependencyProperty.Register("VerticalScrollBarVisibility", TextBox);
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

    if (this._ContentElement)
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

TextBox.prototype.SyncSelectedText = function () {
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
TextBox.prototype.SyncText = function () {
    this._SetValue = false;
    this.SetValue(TextBox.TextProperty, this._Buffer);
    this._SetValue = true;
};

TextBox.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== TextBox) {
        TextBoxBase.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }
    NotImplemented("TextBox._OnPropertyChanged");
};

//#endregion

//#region DEFAULT STYLE

TextBox.GetDefaultStyle = function () {
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
}

//#endregion