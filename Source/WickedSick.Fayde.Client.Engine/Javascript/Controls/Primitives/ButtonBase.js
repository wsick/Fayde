/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="../ContentControl.js"/>
/// CODE

//#region ButtonBase
var ButtonBase = Nullstone.Create("ButtonBase", ContentControl);

ButtonBase.Instance.Init = function () {
    this.Init$ContentControl();
    this._IsMouseCaptured = false;
    this._IsMouseLeftButtonDown = false;
    this._IsSpaceKeyDown = false;
    this._MousePosition = new Point();

    this.Click = new MulticastEvent();

    this.Loaded.Subscribe(function () { this._IsLoaded = true; this.UpdateVisualState(); }, this);
    this.SetIsTabStop(true);
}

//#region Dependency Properties

ButtonBase.ClickModeProperty = DependencyProperty.Register("ClickMode", function () { return new Enum(ClickMode); }, ButtonBase, ClickMode.Release);
ButtonBase.IsPressedProperty = DependencyProperty.RegisterReadOnly("IsPressed", function () { return Boolean; }, ButtonBase, false, function (d, args) { d.OnIsPressedChanged(args); });
ButtonBase.IsFocusedProperty = DependencyProperty.RegisterReadOnly("IsFocused", function () { return Boolean; }, ButtonBase, false);
ButtonBase.IsMouseOverProperty = DependencyProperty.RegisterReadOnly("IsMouseOver", function () { return Boolean; }, ButtonBase, false);

Nullstone.AutoProperties(ButtonBase, [
    ButtonBase.ClickModeProperty
]);

Nullstone.AutoPropertiesReadOnly(ButtonBase, [
    ButtonBase.IsPressedProperty,
    ButtonBase.IsFocusedProperty,
    ButtonBase.IsMouseOverProperty
]);

//#endregion

ButtonBase.Instance.OnIsEnabledChanged = function (e) {
    this.OnIsEnabledChanged$ContentControl(e);
    var isEnabled = e.NewValue;
    this._SuspendStateChanges = true;
    try {
        if (!isEnabled) {
            this.$SetValueInternal(ButtonBase.IsFocusedProperty, false);
            this.$SetValueInternal(ButtonBase.IsPressedProperty, false);
            this._IsMouseCaptured = false;
            this._IsSpaceKeyDown = false;
            this._IsMouseLeftButtonDown = false;
        }
    } finally {
        this._SuspendStateChanges = false;
        this.UpdateVisualState();
    }
};
ButtonBase.Instance.OnIsPressedChanged = function (e) {
    this.UpdateVisualState();
};

//#region Visual State

ButtonBase.Instance.UpdateVisualState = function (useTransitions) {
    /// <param name="useTransitions" type="Boolean"></param>
    if (this._SuspendStateChanges)
        return;
    this._ChangeVisualState(useTransitions === true);
};
ButtonBase.Instance._ChangeVisualState = function (useTransitions) {
    //Nothing to do in ButtonBase
};

//#endregion

//#region Mouse

ButtonBase.Instance.OnMouseEnter = function (sender, args) {
    this.OnMouseEnter$ContentControl(sender, args);

    this.$SetValueInternal(ButtonBase.IsMouseOverProperty, true);

    this._SuspendStateChanges = true;
    try {
        if (this.ClickMode === ClickMode.Hover && this.IsEnabled) {
            this.$SetValueInternal(ButtonBase.IsPressedProperty, true);
            this.OnClick();
        }
    } finally {
        this._SuspendStateChanges = false;
        this.UpdateVisualState();
    }
};
ButtonBase.Instance.OnMouseLeave = function (sender, args) {
    this.OnMouseLeave$ContentControl(sender, args);

    this.$SetValueInternal(ButtonBase.IsMouseOverProperty, false);

    this._SuspendStateChanges = true;
    try {
        if (this.ClickMode === ClickMode.Hover && this.IsEnabled)
            this.$SetValueInternal(ButtonBase.IsPressedProperty, false);
    } finally {
        this._SuspendStateChanges = false;
        this.UpdateVisualState();
    }
};
ButtonBase.Instance.OnMouseMove = function (sender, args) {
    this.OnMouseMove$ContentControl(sender, args);

    this._MousePosition = args.GetPosition(this);

    if (this._IsMouseLeftButtonDown && this.IsEnabled && this.ClickMode !== ClickMode.Hover && this._IsMouseCaptured && !this._IsSpaceKeyDown) {
        this.$SetValueInternal(ButtonBase.IsPressedProperty, this._IsValidMousePosition());
    }
};
ButtonBase.Instance.OnMouseLeftButtonDown = function (sender, args) {
    this.OnMouseLeftButtonDown$ContentControl(sender, args);

    this._IsMouseLeftButtonDown = true;
    if (!this.IsEnabled)
        return;
    var clickMode = this.ClickMode;
    if (clickMode === ClickMode.Hover)
        return;

    args.Handled = true;
    this._SuspendStateChanges = true;
    try {
        this.Focus();
        this._CaptureMouseInternal();
        if (this._IsMouseCaptured)
            this.$SetValueInternal(ButtonBase.IsPressedProperty, true);
    } finally {
        this._SuspendStateChanges = false;
        this.UpdateVisualState();
    }

    if (clickMode === ClickMode.Press)
        this.OnClick();
};
ButtonBase.Instance.OnMouseLeftButtonUp = function (sender, args) {
    this.OnMouseLeftButtonDown$ContentControl(sender, args);

    this._IsMouseLeftButtonDown = false;
    if (!this.IsEnabled)
        return;
    var clickMode = this.ClickMode;
    if (clickMode === ClickMode.Hover)
        return;

    args.Handled = true;
    if (!this._IsSpaceKeyDown && this.IsPressed && clickMode === ClickMode.Release)
        this.OnClick();

    if (!this._IsSpaceKeyDown) {
        this._ReleaseMouseCaptureInternal();
        this.$SetValueInternal(ButtonBase.IsPressedProperty, false);
    }
};

ButtonBase.Instance.OnClick = function () {
    //TODO: Execute Command
    this.Click.Raise(this, new EventArgs());
};

ButtonBase.Instance._CaptureMouseInternal = function () {
    if (!this._IsMouseCaptured)
        this._IsMouseCaptured = this.CaptureMouse();
};
ButtonBase.Instance._ReleaseMouseCaptureInternal = function () {
    this.ReleaseMouseCapture();
    this._IsMouseCaptured = false;
};
ButtonBase.Instance._IsValidMousePosition = function () {
    /// <returns type="Boolean" />
    var pos = this._MousePosition;
    return pos.X >= 0.0 && pos.X <= this.ActualWidth
        && pos.Y >= 0.0 && pos.Y <= this.ActualHeight;
};

//#endregion

//#region Focus

ButtonBase.Instance.OnGotFocus = function (sender, args) {
    this.OnGotFocus$ContentControl(sender, args);

    this.$SetValueInternal(ButtonBase.IsFocusedProperty, true);
    this.UpdateVisualState();
};
ButtonBase.Instance.OnLostFocus = function (sender, args) {
    this.OnLostFocus$ContentControl(sender, args);

    this.$SetValueInternal(ButtonBase.IsFocusedProperty, false);

    this._SuspendStateChanges = true;
    try {
        if (this.ClickMode !== ClickMode.Hover) {
            this.$SetValueInternal(ButtonBase.IsPressedProperty, false);
            this._ReleaseMouseCaptureInternal();
            this._IsSpaceKeyDown = false;
        }
    } finally {
        this._SuspendStateChanges = false;
        this.UpdateVisualState();
    }
};

//#endregion

ButtonBase._GetVisualRoot = function (d) {
    var parent = d;
    while (parent) {
        d = parent;
        parent = VisualTreeHelper.GetParent(parent);
    }
    return d;
};

Nullstone.FinishCreate(ButtonBase);
//#endregion