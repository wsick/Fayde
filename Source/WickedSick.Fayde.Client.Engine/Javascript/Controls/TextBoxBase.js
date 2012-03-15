/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Control.js"/>
/// CODE
/// <reference path="../Runtime/MulticastEvent.js"/>
/// <reference path="../Primitives/Font.js"/>
/// <reference path="Enums.js"/>

//#region TextBoxBase
var TextBoxBase = Nullstone.Create("TextBoxBase", Control);

TextBoxBase.Instance.Init = function () {
    this.Init$Control();

    this._SelectionAnchor = 0;
    this._SelectionCursor = 0;
    this._Buffer = new String();

    this._Font = new Font();

    this.ModelChanged = new MulticastEvent();

    this._Batch = 0;

    this._NeedIMReset = false;
    this._Selecting = false;
    this._Captured = false;
    this._IsFocused = false;
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
TextBoxBase.Instance.GetSelectionCursor = function () {
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
        this.OnApplyTemplate$Control();
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
    this.OnApplyTemplate$Control();
};

TextBoxBase.Instance.OnMouseLeftButtonDown = function (sender, args) {
    //TODO: Set handled (routed event)
    this.Focus();

    if (this._View) {
        var p = args.GetPosition(this._View);
        var cursor = this._View.GetCursorFromXY(p.X, p.Y);

        this._ResetIMContext();

        this._Captured = this.CaptureMouse();
        this._Selecting = true;

        this._BatchPush();
        this._Emit = _TextBoxEmitChanged.NOTHING;
        this.SetSelectionStart(cursor);
        this.SetSelectionLength(0);
        this._BatchPop();

        this._SyncAndEmit();
    }
};
TextBoxBase.Instance.OnMouseLeftButtonUp = function (sender, args) {
    if (this._Captured)
        this.ReleaseMouseCapture();

    //TODO: Set handled (routed event)
    this._Selecting = false;
    this._Captured = false;
};
TextBoxBase.Instance.OnMouseMove = function (sender, args) {
    var anchor = this._SelectionAnchor;
    var cursor = this._SelectionCursor;

    if (this._Selecting) {
        var p = args.GetPosition(this._View);
        //TODO: Set handled (routed event)

        cursor = this._View.GetCursorFromXY(p.X, p.Y);

        this._BatchPush();
        this._Emit = _TextBoxEmitChanged.NOTHING;
        this.SetSelectionStart(Math.min(anchor, cursor));
        this.SetSelectionLength(Math.abs(cursor - anchor));
        this._SelectionAnchor = anchor;
        this._SelectionCursor = cursor;
        this._BatchPop();

        this._SyncAndEmit();

        //TODO: 
        //if (!this._Secret && (clipboard = this.GetClipboard(this, Primary))) {
        //  clipboard.SetText(this.GetSelectedText());
        //}
    }
};

TextBoxBase.Instance.OnLostFocus = function (sender, args) {
    this._IsFocused = false;
    if (this._View)
        this._View.OnLostFocus();

    if (!this._IsReadOnly) {
        //this._IMCtx.FocusOut();
        this._NeedIMReset = true;
    }
};
TextBoxBase.Instance.OnGotFocus = function (sender, args) {
    this._IsFocused = true;
    if (this._View)
        this._View.OnGotFocus();
    if (!this._IsReadOnly) {
        //this._IMCtx.FocusIn();
        this._NeedIMReset = true;
    }
};

TextBoxBase.Instance._OnPropertyChanged = function (args, error) {
    var changed = _TextBoxModelChanged.Nothing;
    if (args.Property._ID === Control.FontFamilyProperty._ID) {
        this._Font.SetFamily(args.NewValue);
        changed = _TextBoxModelChanged.Font;
    } else if (args.Property._ID === Control.FontSizeProperty._ID) {
        this._Font.SetSize(args.NewValue);
        changed = _TextBoxModelChanged.Font;
    } else if (args.Property._ID === Control.FontStretchProperty._ID) {
        this._Font.SetStretch(args.NewValue);
        changed = _TextBoxModelChanged.Font;
    } else if (args.Property._ID === Control.FontStyleProperty._ID) {
        this._Font.SetStyle(args.NewValue);
        changed = _TextBoxModelChanged.Font;
    } else if (args.Property._ID === Control.FontWeightProperty._ID) {
        this._Font.SetWeight(args.NewValue);
        changed = _TextBoxModelChanged.Font;
    }

    if (changed !== _TextBoxModelChanged.Nothing)
        this.ModelChanged.Raise(this, new _TextBoxModelChangedEventArgs(changed, args));

    if (args.Property.OwnerType !== TextBoxBase) {
        this._OnPropertyChanged$Control(args, error);
        return;
    }

    this.PropertyChanged.Raise(this, args);
};
TextBoxBase.Instance._OnSubPropertyChanged = function (propd, sender, args) {
    if (propd != null && (propd._ID === Control.BackgroundProperty._ID
        || propd._ID === Control.ForegroundProperty._ID)) {
        this.ModelChanged.Raise(this, new _TextBoxModelChangedEventArgs(_TextBoxModelChanged.Brush, args));
        this._Invalidate();
    }

    if (propd != null && propd.OwnerType !== TextBoxBase)
        this._OnSubPropertyChanged$Control(propd, sender, args);
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

    if (this._Batch != 0 || this._Emit === _TextBoxEmitChanged.NOTHING)
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

TextBoxBase.Instance._ResetIMContext = function () {
    if (this._NeedIMReset) {
        //this._IMCtx.Reset();
        this._NeedIMReset = false;
    }
};

TextBoxBase.Instance._EmitTextChanged = function () { };
TextBoxBase.Instance._EmitSelectionChanged = function () { };

Nullstone.FinishCreate(TextBoxBase);
//#endregion