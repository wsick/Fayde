/// <reference path="../Runtime/RefObject.js" />
/// <reference path="TextBoxBase.js"/>
/// <reference path="../Core/PropertyValueProviders/Enums.js"/>
/// <reference path="PropertyValueProviders/TextBoxDynamicPropertyValueProvider.js"/>
/// <reference path="Enums.js"/>
/// <reference path="../Runtime/MulticastEvent.js"/>
/// CODE
/// <reference path="../Runtime/LinkedList.js"/>
/// <reference path="Style.js"/>
/// <reference path="ContentPresenter.js"/>
/// <reference path="ContentControl.js"/>
/// <reference path="Border.js"/>

//#region TextBox

function TextBox() {
    TextBoxBase.call(this);

    this._Providers[_PropertyPrecedence.DynamicValue] = new _TextBoxDynamicPropertyValueProvider(this, _PropertyPrecedence.DynamicValue);

    this._EventsMask = _TextBoxEmitChanged.TEXT | _TextBoxEmitChanged.SELECTION;

    this.SelectionChanged = new MulticastEvent();
    this.TextChanged = new MulticastEvent();
}
TextBox.InheritFrom(TextBoxBase);

//#region DEPENDENCY PROPERTIES

TextBox.SelectionForegroundProperty = DependencyProperty.Register("SelectionForeground", function () { return Brush; }, TextBox);
TextBox.prototype.GetSelectionForeground = function () {
    return this.GetValue(TextBox.SelectionForegroundProperty);
};
TextBox.prototype.SetSelectionForeground = function (value) {
    this.SetValue(TextBox.SelectionForegroundProperty, value);
};

TextBox.SelectionBackgroundProperty = DependencyProperty.Register("SelectionBackground", function () { return Brush; }, TextBox);
TextBox.prototype.GetSelectionBackground = function () {
    return this.GetValue(TextBox.SelectionBackgroundProperty);
};
TextBox.prototype.SetSelectionBackground = function (value) {
    this.SetValue(TextBox.SelectionBackgroundProperty, value);
};

TextBox.BaselineOffsetProperty = DependencyProperty.Register("BaselineOffset", function () { return Number; }, TextBox);
TextBox.prototype.GetBaselineOffset = function () {
    return this.GetValue(TextBox.BaselineOffsetProperty);
};
TextBox.prototype.SetBaselineOffset = function (value) {
    this.SetValue(TextBox.BaselineOffsetProperty, value);
};

TextBox.SelectedTextProperty = DependencyProperty.Register("SelectedText", function () { return String; }, TextBox, "");
TextBox.prototype.GetSelectedText = function () {
    return this.GetValue(TextBox.SelectedTextProperty);
};
TextBox.prototype.SetSelectedText = function (value) {
    this.SetValue(TextBox.SelectedTextProperty, value);
};

TextBox.SelectionLengthProperty = DependencyProperty.Register("SelectionLength", function () { return Number; }, TextBox, 0);
TextBox.prototype.GetSelectionLength = function () {
    return this.GetValue(TextBox.SelectionLengthProperty);
};
TextBox.prototype.SetSelectionLength = function (value) {
    this.SetValue(TextBox.SelectionLengthProperty, value);
};

TextBox.SelectionStartProperty = DependencyProperty.Register("SelectionStart", function () { return Number; }, TextBox, 0);
TextBox.prototype.GetSelectionStart = function () {
    return this.GetValue(TextBox.SelectionStartProperty);
};
TextBox.prototype.SetSelectionStart = function (value) {
    this.SetValue(TextBox.SelectionStartProperty, value);
};

TextBox.TextProperty = DependencyProperty.Register("Text", function () { return String; }, TextBox);
TextBox.prototype.GetText = function () {
    return this.GetValue(TextBox.TextProperty);
};
TextBox.prototype.SetText = function (value) {
    this.SetValue(TextBox.TextProperty, value);
};

TextBox.TextAlignmentProperty = DependencyProperty.Register("TextAlignment", function () { return Number; }, TextBox, TextAlignment.Left);
TextBox.prototype.GetTextAlignment = function () {
    return this.GetValue(TextBox.TextAlignmentProperty);
};
TextBox.prototype.SetTextAlignment = function (value) {
    this.SetValue(TextBox.TextAlignmentProperty, value);
};

TextBox.TextWrappingProperty = DependencyProperty.Register("TextWrapping", function () { return Number; }, TextBox, TextWrapping.NoWrap);
TextBox.prototype.GetTextWrapping = function () {
    return this.GetValue(TextBox.TextWrappingProperty);
};
TextBox.prototype.SetTextWrapping = function (value) {
    this.SetValue(TextBox.TextWrappingProperty, value);
};

TextBox.HorizontalScrollBarVisibilityProperty = DependencyProperty.Register("HorizontalScrollBarVisibility", function () { return Number; }, TextBox, ScrollBarVisibility.Hidden);
TextBox.prototype.GetHorizontalScrollBarVisibility = function () {
    return this.GetValue(TextBox.HorizontalScrollBarVisibilityProperty);
};
TextBox.prototype.SetHorizontalScrollBarVisibility = function (value) {
    this.SetValue(TextBox.HorizontalScrollBarVisibilityProperty, value);
};

TextBox.VerticalScrollBarVisibilityProperty = DependencyProperty.Register("VerticalScrollBarVisibility", function () { return Number; }, TextBox, ScrollBarVisibility.Hidden);
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
            return new ControlTemplate(TextBox, {
                Type: Grid,
                Name: "RootElement",
                Children: [
                    {
                        Type: Border,
                        Name: "Border",
                        Props: {
                            CornerRadius: new CornerRadius(1, 1, 1, 1),
                            Opacity: 1.0,
                            BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                            Background: new TemplateBindingMarkup("Background"),
                            BorderBrush: new TemplateBindingMarkup("BorderBrush")
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
                                            Padding: new TemplateBindingMarkup("Padding"),
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
                            BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                            Opacity: 0.0,
                            IsHitTestVisible: false
                        }
                    },
                    {
                        Type: Border,
                        Name: "FocusVisualElement",
                        Props: {
                            BorderBrush: new SolidColorBrush(Color.FromHex("#FF6DBDD1")),
                            BorderThickness: new TemplateBindingMarkup("BorderThickness"),
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
