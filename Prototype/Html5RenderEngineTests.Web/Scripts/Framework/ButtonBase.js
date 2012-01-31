/// <reference path="ContentControl.js"/>

//#region ButtonBase

ButtonBase.prototype = new ContentControl;
ButtonBase.prototype.constructor = ButtonBase;
function ButtonBase() {
    ContentControl.call(this);

    this._IsMouseCaptured = false;
    this._IsMouseLeftButtonDown = false;
    this._IsSpaceKeyDown = false;
    this._MousePosition = new Point();

    this.Click = new MulticastEvent();

    this.Loaded.Subscribe(function () { this._IsLoaded = true; this.UpdateVisualState(); }, this);
    this.SetIsTabStop(true);
}
ButtonBase.GetBaseClass = function () { return ContentControl; };

//#region DEPENDENCY PROPERTIES

ButtonBase.ClickModeProperty = DependencyProperty.Register("ClickMode", function () { return Number; }, ButtonBase, ClickMode.Release);
ButtonBase.prototype.GetClickMode = function () {
    return this.GetValue(ButtonBase.ClickModeProperty);
};
ButtonBase.prototype.SetClickMode = function (value) {
    this.SetValue(ButtonBase.ClickModeProperty, value);
};

ButtonBase.IsPressedProperty = DependencyProperty.Register("IsPressed", function () { return Boolean; }, ButtonBase, false, function (d, args) { d.OnIsPressedChanged(args); });
ButtonBase.prototype.GetIsPressed = function () {
	return this.GetValue(ButtonBase.IsPressedProperty);
};
ButtonBase.prototype.SetIsPressed = function (value) {
	this.SetValue(ButtonBase.IsPressedProperty, value);
};

ButtonBase.IsFocusedProperty = DependencyProperty.Register("IsFocused", function () { return Boolean; }, ButtonBase, false);
ButtonBase.prototype.GetIsFocused = function () {
    return this.GetValue(ButtonBase.IsFocusedProperty);
};
ButtonBase.prototype.SetIsFocused = function (value) {
    this.SetValue(ButtonBase.IsFocusedProperty, value);
};

ButtonBase.IsMouseOverProperty = DependencyProperty.Register("IsMouseOver", function () { return Boolean; }, ButtonBase, false);
ButtonBase.prototype.GetIsMouseOver = function () {
    return this.GetValue(ButtonBase.IsMouseOverProperty);
};
ButtonBase.prototype.SetIsMouseOver = function (value) {
    this.SetValue(ButtonBase.IsMouseOverProperty, value);
};

//#endregion

ButtonBase.prototype.OnIsEnabledChanged = function (e) {
    ContentControl.prototype.OnIsEnabledChanged.call(this, e);
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
ButtonBase.prototype.OnIsPressedChanged = function (e) {
    this.UpdateVisualState();
};
ButtonBase.prototype._IsValidMousePosition = function () {
    var pos = this._MousePosition;
    return pos.X >= 0.0 && pos.X <= this.GetActualWidth()
        && pos.Y >= 0.0 && pos.Y <= this.GetActualHeight();
};

ButtonBase.prototype.UpdateVisualState = function (useTransitions) {
    if (this._SuspendStateChanges)
        return;
    this.ChangeVisualState(useTransitions === undefined ? true : useTransitions);
};
ButtonBase.prototype.ChangeVisualState = function (useTransitions) {
    //Nothing to do in ButtonBase
};
ButtonBase.prototype._GoToState = function (useTransitions, stateName) {
    return VisualStateManager.GoToState(this, stateName, useTransitions);
};

//#region MOUSE

ButtonBase.prototype.OnMouseEnter = function (sender, args) {
    ContentControl.prototype.OnMouseEnter.call(this, sender, args);

    this.SetIsMouseOver(true);

    this._SuspendStateChanges = true;
    try {
        if (this.GetClickMode() === ClickMode.Hover && this.GetIsEnabled()) {
            this.SetIsPressed(true);
            this._EmitClick();
        }
    } finally {
        this._SuspendStateChanges = false;
        this.UpdateVisualState();
    }
};
ButtonBase.prototype.OnMouseLeave = function (sender, args) {
    ContentControl.prototype.OnMouseLeave.call(this, sender, args);

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
ButtonBase.prototype.OnMouseMove = function (sender, args) {
    ContentControl.prototype.OnMouseMove.call(this, sender, args);

    this._MousePosition = args.GetPosition(this);

    if (this._IsMouseLeftButtonDown && this.GetIsEnabled() && this.GetClickMode() !== ClickMode.Hover && this._IsMouseCaptured && !this._IsSpaceKeyDown) {
        this.SetIsPressed(this._IsValidMousePosition());
    }
};
ButtonBase.prototype.OnMouseLeftButtonDown = function (sender, args) {
    ContentControl.prototype.OnMouseLeftButtonDown.call(this, sender, args);

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
        this._EmitClick();
};
ButtonBase.prototype.OnMouseLeftButtonUp = function (sender, args) {
    ContentControl.prototype.OnMouseLeftButtonUp.call(this, sender, args);

    this._IsMouseLeftButtonDown = false;
    if (!this.GetIsEnabled())
        return;
    var clickMode = this.GetClickMode();
    if (clickMode === ClickMode.Hover)
        return;

    //TODO: args.Handled = true;
    if (!this._IsSpaceKeyDown && this.GetIsPressed() && clickMode === ClickMode.Release)
        this._EmitClick();

    if (!this._IsSpaceKeyDown) {
        this._ReleaseMouseCaptureInternal();
        this.SetIsPressed(false);
    }
};
ButtonBase.prototype.OnGotFocus = function (sender, args) {
    ContentControl.prototype.OnGotFocus.call(this, sender, args);

    this.SetIsFocused(true);
    this.UpdateVisualState();
};
ButtonBase.prototype.OnLostFocus = function (sender, args) {
    ContentControl.prototype.OnLostFocus.call(this, sender, args);

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

ButtonBase.prototype._CaptureMouseInternal = function () {
    if (!this._IsMouseCaptured)
        this._IsMouseCaptured = this.CaptureMouse();
};
ButtonBase.prototype._ReleaseMouseCaptureInternal = function () {
    this.ReleaseMouseCapture();
    this._IsMouseCaptured = false;
};

ButtonBase.prototype._EmitClick = function () {
    //TODO: Execute Command
    this.Click.Raise(this, null);
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

//#endregion