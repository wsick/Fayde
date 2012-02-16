/// <reference path="../Runtime/RefObject.js" />
/// <reference path="Control.js"/>
/// <reference path="../Runtime/MulticastEvent.js"/>
/// <reference path="../Primitives/Font.js"/>
/// CODE

//#region TextBoxBase

function TextBoxBase() {
    Control.call(this);
    this._SelectionAnchor = 0;
    this._SelectionCursor = 0;
    this._Buffer = new String();

    this._Font = new Font();

    this.ModelChanged = new MulticastEvent();

    this._Batch = 0;
}
TextBoxBase.InheritFrom(Control);

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
    this._ContentElement = this.GetTemplateChild("ContentElement");

    if (this._ContentElement == null) {
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

    if (this._ContentElement instanceof ContentPresenter) {
        this._ContentElement.SetContent(this._View);
    } else if (this._ContentElement instanceof ContentControl) {
        this._ContentElement.SetContent(this._View);
    } else if (this._ContentElement instanceof Border) {
        this._ContentElement.SetChild(this._View);
    } else if (this._ContentElement instanceof Panel) {
        this._ContentElement.GetChildren().Add(this._View);
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
