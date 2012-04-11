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

//#region DEPENDENCY PROPERTIES

ButtonBase.ClickModeProperty = DependencyProperty.Register("ClickMode", function () { return Number; }, ButtonBase, ClickMode.Release);
ButtonBase.Instance.GetClickMode = function () {
    return this.GetValue(ButtonBase.ClickModeProperty);
};
ButtonBase.Instance.SetClickMode = function (value) {
    this.SetValue(ButtonBase.ClickModeProperty, value);
};

ButtonBase.IsPressedProperty = DependencyProperty.Register("IsPressed", function () { return Boolean; }, ButtonBase, false, function (d, args) { d.OnIsPressedChanged(args); });
ButtonBase.Instance.GetIsPressed = function () {
	return this.GetValue(ButtonBase.IsPressedProperty);
};
ButtonBase.Instance.SetIsPressed = function (value) {
	this.SetValue(ButtonBase.IsPressedProperty, value);
};

ButtonBase.IsFocusedProperty = DependencyProperty.Register("IsFocused", function () { return Boolean; }, ButtonBase, false);
ButtonBase.Instance.GetIsFocused = function () {
    return this.GetValue(ButtonBase.IsFocusedProperty);
};
ButtonBase.Instance.SetIsFocused = function (value) {
    this.SetValue(ButtonBase.IsFocusedProperty, value);
};

ButtonBase.IsMouseOverProperty = DependencyProperty.Register("IsMouseOver", function () { return Boolean; }, ButtonBase, false);
ButtonBase.Instance.GetIsMouseOver = function () {
    return this.GetValue(ButtonBase.IsMouseOverProperty);
};
ButtonBase.Instance.SetIsMouseOver = function (value) {
    this.SetValue(ButtonBase.IsMouseOverProperty, value);
};

//#endregion

ButtonBase.Instance.OnIsEnabledChanged = function (e) {
    this.OnIsEnabledChanged$ContentControl(e);
    var isEnabled = e.NewValue;
    this._SuspendStateChanges = true;
    try {
        if (!isEnabled) {
            this.SetIsFocused(false);
            this.SetIsPressed(false);
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

//#region MOUSE

ButtonBase.Instance.OnMouseEnter = function (sender, args) {
    this.OnMouseEnter$ContentControl(sender, args);

    this.SetIsMouseOver(true);

    this._SuspendStateChanges = true;
    try {
        if (this.GetClickMode() === ClickMode.Hover && this.GetIsEnabled()) {
            this.SetIsPressed(true);
            this.OnClick();
        }
    } finally {
        this._SuspendStateChanges = false;
        this.UpdateVisualState();
    }
};
ButtonBase.Instance.OnMouseLeave = function (sender, args) {
    this.OnMouseLeave$ContentControl(sender, args);

    this.SetIsMouseOver(false);

    this._SuspendStateChanges = true;
    try {
        if (this.GetClickMode() === ClickMode.Hover && this.GetIsEnabled())
            this.SetIsPressed(false);
    } finally {
        this._SuspendStateChanges = false;
        this.UpdateVisualState();
    }
};
ButtonBase.Instance.OnMouseMove = function (sender, args) {
    this.OnMouseMove$ContentControl(sender, args);

    this._MousePosition = args.GetPosition(this);

    if (this._IsMouseLeftButtonDown && this.GetIsEnabled() && this.GetClickMode() !== ClickMode.Hover && this._IsMouseCaptured && !this._IsSpaceKeyDown) {
        this.SetIsPressed(this._IsValidMousePosition());
    }
};
ButtonBase.Instance.OnMouseLeftButtonDown = function (sender, args) {
    this.OnMouseLeftButtonDown$ContentControl(sender, args);

    this._IsMouseLeftButtonDown = true;
    if (!this.GetIsEnabled())
        return;
    var clickMode = this.GetClickMode();
    if (clickMode === ClickMode.Hover)
        return;

    //TODO: args.Handled = true;
    this._SuspendStateChanges = true;
    try {
        this.Focus();
        this._CaptureMouseInternal();
        if (this._IsMouseCaptured)
            this.SetIsPressed(true);
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
    if (!this.GetIsEnabled())
        return;
    var clickMode = this.GetClickMode();
    if (clickMode === ClickMode.Hover)
        return;

    //TODO: args.Handled = true;
    if (!this._IsSpaceKeyDown && this.GetIsPressed() && clickMode === ClickMode.Release)
        this.OnClick();

    if (!this._IsSpaceKeyDown) {
        this._ReleaseMouseCaptureInternal();
        this.SetIsPressed(false);
    }
};

ButtonBase.Instance.OnClick = function () {
    //TODO: Execute Command
    this.Click.Raise(this, null);
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
    return pos.X >= 0.0 && pos.X <= this.GetActualWidth()
        && pos.Y >= 0.0 && pos.Y <= this.GetActualHeight();
};

//#endregion

//#region FOCUS

ButtonBase.Instance.OnGotFocus = function (sender, args) {
    this.OnGotFocus$ContentControl(sender, args);

    this.SetIsFocused(true);
    this.UpdateVisualState();
};
ButtonBase.Instance.OnLostFocus = function (sender, args) {
    this.OnLostFocus$ContentControl(sender, args);

    this.SetIsFocused(false);

    this._SuspendStateChanges = true;
    try {
        if (this.GetClickMode() !== ClickMode.Hover) {
            this.SetIsPressed(false);
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
    while (parent != null) {
        d = parent;
        parent = VisualTreeHelper.GetParent(parent);
    }
    return d;
};

Nullstone.FinishCreate(ButtonBase);
//#endregion