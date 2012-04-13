/// <reference path="../Runtime/Nullstone.js" />
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
/// <reference path="../Text/TextBuffer.js"/>
/// <reference path="../Text/History/TextBoxUndoAction.js"/>
/// <reference path="../Text/History/TextBoxUndoActionDelete.js"/>
/// <reference path="../Text/History/TextBoxUndoActionInsert.js"/>
/// <reference path="../Text/History/TextBoxUndoActionReplace.js"/>

//#region TextBox
var TextBox = Nullstone.Create("TextBox", TextBoxBase);

TextBox.Instance.Init = function () {
    this.Init$TextBoxBase();

    this._Providers[_PropertyPrecedence.DynamicValue] = new _TextBoxDynamicPropertyValueProvider(this, _PropertyPrecedence.DynamicValue);

    this._EventsMask = _TextBoxEmitChanged.TEXT | _TextBoxEmitChanged.SELECTION;

    this.SelectionChanged = new MulticastEvent();
    this.TextChanged = new MulticastEvent();
};

//#region Dependency Properties

TextBox.AcceptsReturnProperty = DependencyProperty.RegisterCore("AcceptsReturn", function () { return Boolean; }, TextBox, false);
TextBox.Instance.GetAcceptsReturn = function () {
    ///<returns type="Boolean"></returns>
    return this.GetValue(TextBox.AcceptsReturnProperty);
};
TextBox.Instance.SetAcceptsReturn = function (value) {
    ///<param name="value" type="Boolean"></param>
    this.SetValue(TextBox.AcceptsReturnProperty, value);
};

TextBox.CaretBrushProperty = DependencyProperty.RegisterCore("CaretBrush", function () { return Brush; }, TextBox);
TextBox.Instance.GetCaretBrush = function () {
    ///<returns type="Brush"></returns>
    return this.GetValue(TextBox.CaretBrushProperty);
};
TextBox.Instance.SetCaretBrush = function (value) {
    ///<param name="value" type="Brush"></param>
    this.SetValue(TextBox.CaretBrushProperty, value);
};

TextBox.MaxLengthProperty = DependencyProperty.RegisterFull("MaxLength", function () { return Number; }, TextBox, 0, null, null, null, TextBox.PositiveIntValidator);
TextBox.Instance.GetMaxLength = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(TextBox.MaxLengthProperty);
};
TextBox.Instance.SetMaxLength = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(TextBox.MaxLengthProperty, value);
};
TextBox.PositiveIntValidator = function (instance, propd, value, error) {
    if (typeof value !== 'number')
        return false;
    return value >= 0;
};

TextBox.IsReadOnlyProperty = DependencyProperty.RegisterCore("IsReadOnly", function () { return Boolean; }, TextBox);
TextBox.Instance.GetIsReadOnly = function () {
    ///<returns type="Boolean"></returns>
    return this.GetValue(TextBox.IsReadOnlyProperty);
};
TextBox.Instance.SetIsReadOnly = function (value) {
    ///<param name="value" type="Boolean"></param>
    this.SetValue(TextBox.IsReadOnlyProperty, value);
};

TextBox.SelectionForegroundProperty = DependencyProperty.RegisterCore("SelectionForeground", function () { return Brush; }, TextBox);
TextBox.Instance.GetSelectionForeground = function () {
    return this.GetValue(TextBox.SelectionForegroundProperty);
};
TextBox.Instance.SetSelectionForeground = function (value) {
    this.SetValue(TextBox.SelectionForegroundProperty, value);
};

TextBox.SelectionBackgroundProperty = DependencyProperty.RegisterCore("SelectionBackground", function () { return Brush; }, TextBox);
TextBox.Instance.GetSelectionBackground = function () {
    return this.GetValue(TextBox.SelectionBackgroundProperty);
};
TextBox.Instance.SetSelectionBackground = function (value) {
    this.SetValue(TextBox.SelectionBackgroundProperty, value);
};

TextBox.BaselineOffsetProperty = DependencyProperty.RegisterCore("BaselineOffset", function () { return Number; }, TextBox);
TextBox.Instance.GetBaselineOffset = function () {
    return this.GetValue(TextBox.BaselineOffsetProperty);
};
TextBox.Instance.SetBaselineOffset = function (value) {
    this.SetValue(TextBox.BaselineOffsetProperty, value);
};

TextBox.SelectedTextProperty = DependencyProperty.RegisterFull("SelectedText", function () { return String; }, TextBox, "", null, null, true);
TextBox.Instance.GetSelectedText = function () {
    return this.GetValue(TextBox.SelectedTextProperty);
};

TextBox.SelectionLengthProperty = DependencyProperty.RegisterFull("SelectionLength", function () { return Number; }, TextBox, 0, null, null, true, TextBox.PositiveIntValidator);
TextBox.Instance.GetSelectionLength = function () {
    return this.GetValue(TextBox.SelectionLengthProperty);
};
TextBox.Instance.SetSelectionLength = function (value) {
    this.SetValue(TextBox.SelectionLengthProperty, value);
};

TextBox.SelectionStartProperty = DependencyProperty.RegisterFull("SelectionStart", function () { return Number; }, TextBox, 0, null, null, true, TextBox.PositiveIntValidator);
TextBox.Instance.GetSelectionStart = function () {
    return this.GetValue(TextBox.SelectionStartProperty);
};
TextBox.Instance.SetSelectionStart = function (value) {
    this.SetValue(TextBox.SelectionStartProperty, value);
};

TextBox.TextProperty = DependencyProperty.RegisterCore("Text", function () { return String; }, TextBox);
TextBox.Instance.GetText = function () {
    return this.GetValue(TextBox.TextProperty);
};
TextBox.Instance.SetText = function (value) {
    this.SetValue(TextBox.TextProperty, value);
};

TextBox.TextAlignmentProperty = DependencyProperty.RegisterCore("TextAlignment", function () { return Number; }, TextBox, TextAlignment.Left);
TextBox.Instance.GetTextAlignment = function () {
    return this.GetValue(TextBox.TextAlignmentProperty);
};
TextBox.Instance.SetTextAlignment = function (value) {
    this.SetValue(TextBox.TextAlignmentProperty, value);
};

TextBox.TextWrappingProperty = DependencyProperty.RegisterCore("TextWrapping", function () { return Number; }, TextBox, TextWrapping.NoWrap);
TextBox.Instance.GetTextWrapping = function () {
    return this.GetValue(TextBox.TextWrappingProperty);
};
TextBox.Instance.SetTextWrapping = function (value) {
    this.SetValue(TextBox.TextWrappingProperty, value);
};

TextBox.HorizontalScrollBarVisibilityProperty = DependencyProperty.RegisterCore("HorizontalScrollBarVisibility", function () { return Number; }, TextBox, ScrollBarVisibility.Hidden);
TextBox.Instance.GetHorizontalScrollBarVisibility = function () {
    return this.GetValue(TextBox.HorizontalScrollBarVisibilityProperty);
};
TextBox.Instance.SetHorizontalScrollBarVisibility = function (value) {
    this.SetValue(TextBox.HorizontalScrollBarVisibilityProperty, value);
};

TextBox.VerticalScrollBarVisibilityProperty = DependencyProperty.RegisterCore("VerticalScrollBarVisibility", function () { return Number; }, TextBox, ScrollBarVisibility.Hidden);
TextBox.Instance.GetVerticalScrollBarVisibility = function () {
    return this.GetValue(TextBox.VerticalScrollBarVisibilityProperty);
};
TextBox.Instance.SetVerticalScrollBarVisibility = function (value) {
    this.SetValue(TextBox.VerticalScrollBarVisibilityProperty, value);
};

//#endregion

//#region Properties

TextBox.Instance.GetIsMouseOver = function () {
    ///<returns type="Boolean"></returns>
    return this._IsMouseOver;
};

//#endregion

//#region Instance Methods

TextBox.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$TextBoxBase();

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

//#endregion

//#region Selected Text

TextBox.Instance._SyncSelectedText = function () {
    if (this._SelectionCursor !== this._SelectionAnchor) {
        var start = Math.min(this._SelectionAnchor, this._SelectionCursor);
        var len = Math.abs(this._SelectionCursor - this._SelectionAnchor);
        var text = this._Buffer._Text == null ? '' : this._Buffer._Text.substr(start, len);

        this._SettingValue = false;
        this._SetValueInternal(TextBox.SelectedTextProperty, text);
        this._SettingValue = true;
    } else {
        this._SettingValue = false;
        this._SetValueInternal(TextBox.SelectedTextProperty, "");
        this._SettingValue = true;
    }
};
TextBox.Instance._EmitSelectionChanged = function () {
    this.SelectionChanged.RaiseAsync(this, {});
};

//#endregion

//#region Text

TextBox.Instance.GetDisplayText = function () {
    return this.GetText();
};

TextBox.Instance._SyncText = function () {
    this._SettingValue = false;
    this._SetValueInternal(TextBox.TextProperty, this._Buffer._Text);
    this._SettingValue = true;
};
TextBox.Instance._EmitTextChanged = function () {
    this.TextChanged.RaiseAsync(this, {});
};

//#endregion

//#region Property Change

TextBox.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== TextBox) {
        this._OnPropertyChanged$TextBoxBase(args, error);
        return;
    }

    var changed = _TextBoxModelChanged.Nothing;
    var propd;
    var start;
    var length;
    var action;
    var value;
    var text;
    if (args.Property._ID === TextBox.AcceptsReturnProperty._ID) {
        this._AcceptsReturn = args.NewValue === true;
    } else if (args.Property._ID === TextBox.CaretBrushProperty._ID) {

        //} else if (args.Property._ID === TextBox.FontSourceProperty._ID) {
        //changed = _TextBoxModelChanged.Font;
    } else if (args.Property._ID === TextBox.IsReadOnlyProperty._ID) {
        this._IsReadOnly = args.NewValue === true;
        if (this._IsFocused) {
            if (this._IsReadOnly) {
                this._ResetIMContext();
                //TODO: this._IMCtx.FocusOut();
            } else {
                //TODO: this._IMCtx.FocusIn();
            }
        }
        if (this._View)
            this._View.SetEnableCursor(!this._IsReadOnly);
    } else if (args.Property._ID === TextBox.MaxLengthProperty._ID) {
        this._MaxLength = args.NewValue === true;
    } else if (args.Property._ID === TextBox.SelectedTextProperty._ID) {
        if (this._SettingValue) {
            value = args.NewValue;
            text = !value ? '' : value;

            length = Math.abs(this._SelectionCursor - this._SelectionAnchor);
            start = Math.min(this._SelectionAnchor, this._SelectionCursor);

            if (text) {
                if (length > 0) {
                    action = new _TextBoxUndoActionReplace(this._SelectionAnchor, this._SelectionCursor, this._Buffer, start, length, text);
                    this._Buffer.Replace(start, length, text);
                } else if (text.length > 0) {
                    action = new _TextBoxUndoActionInsert(this._SelectionAnchor, this._SelectionCursor, start, text);
                    this._Buffer.Insert(start, text);
                }
                if (action != null) {
                    this._Emit |= _TextBoxEmitChanged.TEXT;
                    this._Undo.Push(action);
                    this._Redo.Clear();

                    this.ClearSelection(start + text.length);
                    this._ResetIMContext();

                    this._SyncAndEmit();
                }
            }
        }
    } else if (args.Property._ID === TextBox.SelectionStartProperty._ID) {
        length = Math.abs(this._SelectionCursor - this._SelectionAnchor);
        start = args.NewValue;
        if (start > this._Buffer.GetLength()) {
            this.SetSelectionStart(this._Buffer.GetLength());
            return;
        }

        if (start + length > this._Buffer.GetLength()) {
            this._BatchPush();
            length = this._Buffer.GetLength() - start;
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
    } else if (args.Property._ID === TextBox.SelectionLengthProperty._ID) {
        start = Math.min(this._SelectionAnchor, this._SelectionCursor);
        length = args.NewValue;
        if (start + length > this._Buffer.GetLength()) {
            length = this._Buffer.GetLength() - start;
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
    } else if (args.Property._ID === TextBox.SelectionBackgroundProperty._ID) {
        changed = _TextBoxModelChanged.Brush;
    } else if (args.Property._ID === TextBox.SelectionForegroundProperty._ID) {
        changed = _TextBoxModelChanged.Brush;
    } else if (args.Property._ID === TextBox.TextProperty._ID) {
        value = args.NewValue;
        text = !value ? '' : value;
        if (this._SettingValue) {
            if (text) {
                if (this._Buffer.GetLength() > 0) {
                    action = new _TextBoxUndoActionReplace(this._SelectionAnchor, this._SelectionCursor, this._Buffer, 0, this._Buffer.GetLength(), text);
                    this._Buffer.Replace(0, this._Buffer.GetLength(), text);
                } else {
                    action = new _TextBoxUndoActionInsert(this._SelectionAnchor, this._SelectionCursor, 0, text);
                    this._Buffer.Prepend(text);
                }

                this._Undo.Push(action);
                this._Redo.Clear();

                this._Emit |= _TextBoxEmitChanged.TEXT;
                this.ClearSelection(0);
                this._ResetIMContext();

                this._SyncAndEmit(false);
            }
        }
        changed = _TextBoxModelChanged.Text;
    } else if (args.Property._ID === TextBox.TextAlignmentProperty._ID) {
        changed = _TextBoxModelChanged.TextAlignment;
    } else if (args.Property._ID === TextBox.TextWrappingProperty._ID) {
        if (this._ContentElement) {
            if ((propd = this._ContentElement.GetDependencyProperty("HorizontalScrollBarVisibility"))) {
                if (args.NewValue === TextWrapping.Wrap)
                    this._ContentElement.SetValue(propd, ScrollBarVisibility.Disabled);
                else
                    this._ContentElement.SetValue(propd, this.GetValue(TextBox.HorizontalScrollBarVisibilityProperty));
            }
        }
        changed = _TextBoxModelChanged.TextWrapping
    } else if (args.Property._ID === TextBox.HorizontalScrollBarVisibilityProperty._ID) {
        if (this._ContentElement) {
            if ((propd = this._ContentElement.GetDependencyProperty("HorizontalScrollBarVisibility"))) {
                if (this.GetTextWrapping() === TextWrapping.Wrap)
                    this._ContentElement.SetValue(propd, ScrollBarVisibility.Disabled);
                else
                    this._ContentElement.SetValue(propd, args.NewValue);
            }
        }
    } else if (args.Property._ID === TextBox.VerticalScrollBarVisibilityProperty._ID) {
        if (this._ContentElement) {
            if ((propd = this._ContentElement.GetDependencyProperty("VerticalScrollBarVisibility")))
                this._ContentElement.SetValue(propd, args.NewValue);
        }

    }
    if (changed !== _TextBoxModelChanged.Nothing)
        this.ModelChanged.Raise(this, new _TextBoxModelChangedEventArgs(changed, args));

    this.PropertyChanged.Raise(this, args);
};
TextBox.Instance._OnSubPropertyChanged = function (propd, sender, args) {
    if (propd != null && (propd._ID === TextBox.SelectionBackgroundProperty._ID
        || propd._ID === TextBox.SelectionForegroundProperty._ID)) {
        this.ModelChanged.Raise(this, new _TextBoxModelChangedEventArgs(_TextBoxModelChanged.Brush));
        this._Invalidate();
    }

    if (propd == null || propd.OwnerType !== TextBox)
        this._OnSubPropertyChanged$TextBoxBase(propd, sender, args);
};

//#endregion

TextBox.Instance.OnMouseEnter = function (sender, args) {
    this._IsMouseOver = true;
    this._ChangeVisualState(true);
    this.OnMouseEnter$TextBoxBase(sender, args);
};
TextBox.Instance.OnMouseLeave = function (sender, args) {
    this._IsMouseOver = false;
    this._ChangeVisualState(true);
    this.OnMouseLeave$TextBoxBase(sender, args);
};
TextBox.Instance.OnGotFocus = function (sender, args) {
    this.OnGotFocus$TextBoxBase(sender, args);
    this._ChangeVisualState(true);
};
TextBox.Instance.OnLostFocus = function (sender, args) {
    this.OnLostFocus$TextBoxBase(sender, args);
    this._ChangeVisualState(true);
};

TextBox.Instance._ChangeVisualState = function (useTransitions) {
    /// <param name="useTransitions" type="Boolean"></param>
    if (!this.GetIsEnabled()) {
        VisualStateManager.GoToState(this, "Disabled", useTransitions);
    } else if (this.GetIsReadOnly()) {
        VisualStateManager.GoToState(this, "ReadOnly", useTransitions);
    } else if (this.GetIsMouseOver()) {
        VisualStateManager.GoToState(this, "MouseOver", useTransitions);
    } else {
        VisualStateManager.GoToState(this, "Normal", useTransitions);
    }

    if (this.GetIsFocused()) {
        VisualStateManager.GoToState(this, "Focused", useTransitions);
    } else {
        VisualStateManager.GoToState(this, "Unfocused", useTransitions);
    }
};

//#region Default Style

TextBox.Instance.GetDefaultStyle = function () {
    var styleJson = {
        Type: Style,
        Props: {
            TargetType: TextBox
        },
        Children: [
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(TextBox, "Cursor"),
                    Value: CursorType.IBeam
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(TextBox, "BorderThickness"),
                    Value: new Thickness(1, 1, 1, 1)
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(TextBox, "Background"),
                    Value: new SolidColorBrush(Color.FromHex("#FFFFFFFF"))
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(TextBox, "Foreground"),
                    Value: new SolidColorBrush(Color.FromHex("#FF000000"))
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(TextBox, "Padding"),
                    Value: new Thickness(2, 2, 2, 2)
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(TextBox, "BorderBrush"),
                    Value: {
                        Type: LinearGradientBrush,
                        Props: {
                            StartPoint: new Point(0.5, 0),
                            EndPoint: new Point(0.5, 1),
                            GradientStops: [
                                {
                                    Type: GradientStop,
                                    Props: {
                                        Color: Color.FromHex("#FFA3AEB9"),
                                        Offset: 0.0
                                    }
                                },
                                {
                                    Type: GradientStop,
                                    Props: {
                                        Color: Color.FromHex("#FF8399A9"),
                                        Offset: 0.375
                                    }
                                },
                                {
                                    Type: GradientStop,
                                    Props: {
                                        Color: Color.FromHex("#FF718597"),
                                        Offset: 0.375
                                    }
                                },
                                {
                                    Type: GradientStop,
                                    Props: {
                                        Color: Color.FromHex("#FF617584"),
                                        Offset: 1.0
                                    }
                                }
                            ]
                        }
                    }
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(TextBox, "Template"),
                    Value: new ControlTemplate(TextBox, {
                        Type: Grid,
                        Name: "RootElement",
                        AttachedProps: [
                            {
                                Owner: VisualStateManager,
                                Prop: "VisualStateGroups",
                                Value: [
                                    {
                                        Type: VisualStateGroup,
                                        Name: "CommonStates",
                                        Children: [
                                            {
                                                Type: VisualState,
                                                Name: "Normal"
                                            },
                                            {
                                                Type: VisualState,
                                                Name: "MouseOver",
                                                Content: {
                                                    Type: Storyboard,
                                                    Children: [
                                                        {
                                                            Type: ColorAnimation,
                                                            Props: { Duration: new Duration(0.0), To: Color.FromHex("#FF99C1E2") },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "MouseOverBorder" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Border.BorderBrush).(SolidColorBrush.Color)") }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                Type: VisualState,
                                                Name: "Disabled",
                                                Content: {
                                                    Type: Storyboard,
                                                    Children: [
                                                        {
                                                            Type: DoubleAnimation,
                                                            Props: { Duration: new Duration(0.0), To: 1.0 },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "DisabledVisualElement" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("Opacity") }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                Type: VisualState,
                                                Name: "ReadOnly",
                                                Content: {
                                                    Type: Storyboard,
                                                    Children: [
                                                        {
                                                            Type: DoubleAnimation,
                                                            Props: { Duration: new Duration(0.0), To: 1.0 },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "ReadOnlyVisualElement" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("Opacity") }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        Type: VisualStateGroup,
                                        Name: "FocusStates",
                                        Children: [
                                            {
                                                Type: VisualState,
                                                Name: "Focused",
                                                Content: {
                                                    Type: Storyboard,
                                                    Children: [
                                                        {
                                                            Type: DoubleAnimation,
                                                            Props: { Duration: new Duration(0.0), To: 1.0 },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "FocusVisualElement" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("Opacity") }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                Type: VisualState,
                                                Name: "Unfocused",
                                                Content: {
                                                    Type: Storyboard,
                                                    Children: [
                                                        {
                                                            Type: DoubleAnimation,
                                                            Props: { Duration: new Duration(0.0), To: 0.0 },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "FocusVisualElement" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("Opacity") }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
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
                    })
                }
            }
        ]
    };
    var parser = new JsonParser();
    return parser.CreateObject(styleJson, new NameScope());
};

//#endregion

Nullstone.FinishCreate(TextBox);
//#endregion