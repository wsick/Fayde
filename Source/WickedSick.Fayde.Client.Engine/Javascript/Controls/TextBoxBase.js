/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Control.js"/>
/// CODE
/// <reference path="../Runtime/MulticastEvent.js"/>
/// <reference path="../Primitives/Font.js"/>

//#region TextBoxBase
var TextBoxBase = Nullstone.Create("TextBoxBase", Control);

TextBoxBase.Instance.Init = function () {
    this.Init$super();

    this._SelectionAnchor = 0;
    this._SelectionCursor = 0;
    this._Buffer = new String();

    this._Font = new Font();

    this.ModelChanged = new MulticastEvent();

    this._Batch = 0;
};

TextBoxBase.Instance.HasSelectedText = function () {
    return this._SelectionCursor !== this._SelectionAnchor;
};
TextBoxBase.Instance.GetFont = function () {
    return this._Font;
};
TextBoxBase.Instance.GetTextDecorations = function () {
    return TextDecorations.None;
};
TextBoxBase.Instance.GetCursor = function () {
    return this._SelectionCursor;
};
TextBoxBase.Instance.GetSelectionStart = function () {
    AbstractMethod("TextBoxBase.GetSelectionStart");
};
TextBoxBase.Instance.SetSelectionStart = function (value) {
    AbstractMethod("TextBoxBase.SetSelectionStart");
};
TextBoxBase.Instance.GetSelectionLength = function () {
    AbstractMethod("TextBoxBase.GetSelectionLength");
};
TextBoxBase.Instance.SetSelectionLength = function (value) {
    AbstractMethod("TextBoxBase.SetSelectionLength");
};

TextBoxBase.Instance.OnApplyTemplate = function () {
    this._ContentElement = this.GetTemplateChild("ContentElement");

    if (this._ContentElement == null) {
        Warn("No ContentElement found");
        this.OnApplyTemplate$super();
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
    this.OnApplyTemplate$super();
};

TextBoxBase.Instance._OnPropertyChanged = function (args, error) {
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
        this._OnPropertyChanged$super(args, error);
        return;
    }

    this.PropertyChanged.Raise(this, args);
};
TextBoxBase.Instance._OnSubPropertyChanged = function (sender, args) {
    if (args.Property === Control.BackgroundProperty
        || args.Property === Control.ForegroundProperty) {
        this.ModelChanged.Raise(this, new _TextBoxModelChangedEventArgs(_TextBoxModelChanged.Brush, args));
        this._Invalidate();
    }

    if (args.Property.OwnerType !== TextBoxBase)
        this._OnSubPropertyChanged$super(sender, args);
};

TextBoxBase.Instance._BatchPush = function () {
    this._Batch++;
};
TextBoxBase.Instance._BatchPop = function () {
    if (this._Batch == 0) {
        Warn("TextBoxBase._Batch underflow");
        return;
    }
    this._Batch--;
};
TextBoxBase.Instance._SyncAndEmit = function (syncText) {
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
TextBoxBase.Instance._SyncText = function () {
    AbstractMethod("TextBoxBase._SyncText");
};
TextBoxBase.Instance._SyncSelectedText = function () {
    AbstractMethod("TextBoxBase._SyncSelectedText");
};
TextBoxBase.Instance.ClearSelection = function (start) {
    this._BatchPush();
    this.SetSelectionStart(start);
    this.SetSelectionLength(0);
    this._BatchPop();
};

TextBoxBase.Instance._EmitTextChanged = function () { };
TextBoxBase.Instance._EmitSelectionChanged = function () { };

Nullstone.FinishCreate(TextBoxBase);
//#endregion