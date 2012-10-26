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

    this.DefaultStyleKey = this.constructor;

    this.AddProvider(new _TextBoxDynamicPropertyValueProvider(this, _PropertyPrecedence.DynamicValue));

    this._EventsMask = _TextBoxEmitChanged.TEXT | _TextBoxEmitChanged.SELECTION;

    this.SelectionChanged = new MulticastEvent();
    this.TextChanged = new MulticastEvent();
};

//#region Properties

TextBox.AcceptsReturnProperty = DependencyProperty.RegisterCore("AcceptsReturn", function () { return Boolean; }, TextBox, false);
TextBox.CaretBrushProperty = DependencyProperty.RegisterCore("CaretBrush", function () { return Brush; }, TextBox);
TextBox.PositiveIntValidator = function (instance, propd, value, error) {
    if (typeof value !== 'number')
        return false;
    return value >= 0;
};
TextBox.MaxLengthProperty = DependencyProperty.RegisterFull("MaxLength", function () { return Number; }, TextBox, 0, undefined, undefined, undefined, undefined, TextBox.PositiveIntValidator);
TextBox.IsReadOnlyProperty = DependencyProperty.RegisterCore("IsReadOnly", function () { return Boolean; }, TextBox);
TextBox.SelectionForegroundProperty = DependencyProperty.RegisterCore("SelectionForeground", function () { return Brush; }, TextBox);
TextBox.SelectionBackgroundProperty = DependencyProperty.RegisterCore("SelectionBackground", function () { return Brush; }, TextBox);
TextBox.BaselineOffsetProperty = DependencyProperty.RegisterCore("BaselineOffset", function () { return Number; }, TextBox);
TextBox.SelectedTextProperty = DependencyProperty.RegisterFull("SelectedText", function () { return String; }, TextBox, "", undefined, undefined, undefined, true);
TextBox.SelectionLengthProperty = DependencyProperty.RegisterFull("SelectionLength", function () { return Number; }, TextBox, 0, undefined, undefined, undefined, true, TextBox.PositiveIntValidator);
TextBox.SelectionStartProperty = DependencyProperty.RegisterFull("SelectionStart", function () { return Number; }, TextBox, 0, undefined, undefined, undefined, true, TextBox.PositiveIntValidator);
TextBox.TextProperty = DependencyProperty.RegisterCore("Text", function () { return String; }, TextBox);
TextBox.TextAlignmentProperty = DependencyProperty.RegisterCore("TextAlignment", function () { return new Enum(TextAlignment); }, TextBox, TextAlignment.Left);
TextBox.TextWrappingProperty = DependencyProperty.RegisterCore("TextWrapping", function () { return new Enum(TextWrapping); }, TextBox, TextWrapping.NoWrap);
TextBox.HorizontalScrollBarVisibilityProperty = DependencyProperty.RegisterCore("HorizontalScrollBarVisibility", function () { return new Enum(ScrollBarVisibility); }, TextBox, ScrollBarVisibility.Hidden);
TextBox.VerticalScrollBarVisibilityProperty = DependencyProperty.RegisterCore("VerticalScrollBarVisibility", function () { return new Enum(ScrollBarVisibility); }, TextBox, ScrollBarVisibility.Hidden);

Nullstone.AutoProperties(TextBox, [
    TextBox.AcceptsReturnProperty,
    TextBox.CaretBrushProperty,
    TextBox.MaxLengthProperty,
    TextBox.IsReadOnlyProperty,
    TextBox.SelectionForegroundProperty,
    TextBox.SelectionBackgroundProperty,
    TextBox.BaselineOffsetProperty,
    TextBox.SelectedTextProperty,
    TextBox.SelectionLengthProperty,
    TextBox.SelectionStartProperty,
    TextBox.TextProperty,
    TextBox.TextAlignmentProperty,
    TextBox.TextWrappingProperty,
    TextBox.HorizontalScrollBarVisibilityProperty,
    TextBox.VerticalScrollBarVisibilityProperty
]);

//#endregion

//#region Instance Methods

TextBox.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$TextBoxBase();

    if (!this._ContentElement)
        return;
    var prop = this._ContentElement.GetDependencyProperty("VerticalScrollBarVisibility");
    if (prop)
        this._ContentElement._SetValue(prop, this._GetValue(TextBox.VerticalScrollBarVisibilityProperty));
    
    prop = this._ContentElement.GetDependencyProperty("HorizontalScrollBarVisibility");
    if (prop) {
        if (this.TextWrapping === TextWrapping.Wrap)
            this._ContentElement._SetValue(prop, ScrollBarVisibility.Disabled);
        else
            this._ContentElement._SetValue(prop, this._GetValue(TextBox.HorizontalScrollBarVisibilityProperty));
    }
};

//#endregion

//#region Selected Text

TextBox.Instance._SyncSelectedText = function () {
    if (this._SelectionCursor !== this._SelectionAnchor) {
        var start = Math.min(this._SelectionAnchor, this._SelectionCursor);
        var len = Math.abs(this._SelectionCursor - this._SelectionAnchor);
        var text = !this._Buffer._Text ? '' : this._Buffer._Text.substr(start, len);

        this._SettingValue = false;
        this._SetValue(TextBox.SelectedTextProperty, text);
        this._SettingValue = true;
    } else {
        this._SettingValue = false;
        this._SetValue(TextBox.SelectedTextProperty, "");
        this._SettingValue = true;
    }
};
TextBox.Instance._EmitSelectionChanged = function () {
    TextDebug("TextBox.SelectionChanged [" + this.SelectionStart + " -- " + this.SelectionLength + "]");
    this.SelectionChanged.RaiseAsync(this, new EventArgs());
};

//#endregion

//#region Text

TextBox.Instance.GetDisplayText = function () {
    return this.Text;
};

TextBox.Instance._SyncText = function () {
    this._SettingValue = false;
    this._SetValue(TextBox.TextProperty, this._Buffer._Text);
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
                if (action) {
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
            this.SelectionStart = this._Buffer.GetLength();
            return;
        }

        if (start + length > this._Buffer.GetLength()) {
            this._BatchPush();
            length = this._Buffer.GetLength() - start;
            this.SelectionLength = length;
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
            this.SelectionLength = length;
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
            propd = this._ContentElement.GetDependencyProperty("HorizontalScrollBarVisibility");
            if (propd) {
                if (args.NewValue === TextWrapping.Wrap)
                    this._ContentElement._SetValue(propd, ScrollBarVisibility.Disabled);
                else
                    this._ContentElement._SetValue(propd, this.$GetValue(TextBox.HorizontalScrollBarVisibilityProperty));
            }
        }
        changed = _TextBoxModelChanged.TextWrapping
    } else if (args.Property._ID === TextBox.HorizontalScrollBarVisibilityProperty._ID) {
        if (this._ContentElement) {
            propd = this._ContentElement.GetDependencyProperty("HorizontalScrollBarVisibility");
            if (propd) {
                if (this.TextWrapping === TextWrapping.Wrap)
                    this._ContentElement._SetValue(propd, ScrollBarVisibility.Disabled);
                else
                    this._ContentElement._SetValue(propd, args.NewValue);
            }
        }
    } else if (args.Property._ID === TextBox.VerticalScrollBarVisibilityProperty._ID) {
        if (this._ContentElement) {
            propd = this._ContentElement.GetDependencyProperty("VerticalScrollBarVisibility");
            if (propd)
                this._ContentElement._SetValue(propd, args.NewValue);
        }

    }
    if (changed !== _TextBoxModelChanged.Nothing)
        this.ModelChanged.Raise(this, new _TextBoxModelChangedEventArgs(changed, args));

    this.PropertyChanged.Raise(this, args);
};
TextBox.Instance._OnSubPropertyChanged = function (propd, sender, args) {
    if (propd && (propd._ID === TextBox.SelectionBackgroundProperty._ID
        || propd._ID === TextBox.SelectionForegroundProperty._ID)) {
        this.ModelChanged.Raise(this, new _TextBoxModelChangedEventArgs(_TextBoxModelChanged.Brush));
        this._Invalidate();
    }

    if (!propd || propd.OwnerType !== TextBox)
        this._OnSubPropertyChanged$TextBoxBase(propd, sender, args);
};

//#endregion

TextBox.Instance.OnMouseEnter = function (args) {
    FocusDebug("TextBox.OnMouseEnter");
    this.OnMouseEnter$TextBoxBase(args);
    this.$UpdateVisualState();
};
TextBox.Instance.OnMouseLeave = function (args) {
    FocusDebug("TextBox.OnMouseLeave");
    this.OnMouseLeave$TextBoxBase(args);
    this.$UpdateVisualState();
};
TextBox.Instance.OnGotFocus = function (e) {
    this.OnGotFocus$TextBoxBase(e);
    this.$UpdateVisualState();
};
TextBox.Instance.OnLostFocus = function (e) {
    this.OnLostFocus$TextBoxBase(e);
    this.$UpdateVisualState();
};

TextBox.Instance.$GetVisualStateCommon = function () {
    if (!this.IsEnabled) {
        return "Disabled";
    } else if (this.IsReadOnly) {
        return "ReadOnly";
    } else if (this.IsMouseOver) {
        return "MouseOver";
    } else {
        return "Normal";
    }
};

Nullstone.FinishCreate(TextBox);
//#endregion