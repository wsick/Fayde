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

    this.Loaded.Subscribe(function () { this._IsLoaded = true; this._UpdateVisualState(); }, this);
    this.SetIsTabStop(true);
}
ButtonBase.GetBaseClass = function () { return ContentControl; };

//#region DEPENDENCY PROPERTIES

ButtonBase.ClickModeProperty = DependencyProperty.Register("ClickMode", ButtonBase, ClickMode.Release);
ButtonBase.prototype.GetClickMode = function () {
    return this.GetValue(ButtonBase.ClickModeProperty);
};
ButtonBase.prototype.SetClickMode = function (value) {
    this.SetValue(ButtonBase.ClickModeProperty, value);
};

ButtonBase.IsPressedProperty = DependencyProperty.Register("IsPressed", ButtonBase, false, function (d, args) { d.OnIsPressedChanged(args); });
ButtonBase.prototype.GetIsPressed = function () {
	return this.GetValue(ButtonBase.IsPressedProperty);
};
ButtonBase.prototype.SetIsPressed = function (value) {
	this.SetValue(ButtonBase.IsPressedProperty, value);
};

ButtonBase.IsFocusedProperty = DependencyProperty.Register("IsFocused", ButtonBase, false);
ButtonBase.prototype.GetIsFocused = function () {
    return this.GetValue(ButtonBase.IsFocusedProperty);
};
ButtonBase.prototype.SetIsFocused = function (value) {
    this.SetValue(ButtonBase.IsFocusedProperty, value);
};

ButtonBase.IsMouseOverProperty = DependencyProperty.Register("IsMouseOver", ButtonBase, false);
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
        this._UpdateVisualState();
    }
};
ButtonBase.prototype.OnIsPressedChanged = function (e) {
    this._UpdateVisualState();
};

//#region MOUSE

ButtonBase.prototype.OnMouseEnter = function (sender, args) {
    this.SetIsMouseOver(true);

    this._SuspendStateChanges = true;
    try {
        if (this.GetClickMode() === ClickMode.Hover && this.GetIsEnabled()) {
            this.SetIsPressed(true);
            this._EmitClick();
        }
    } finally {
        this._SuspendStateChanges = false;
        this._UpdateVisualState();
    }
};
ButtonBase.prototype.OnMouseLeave = function (sender, args) {
    this.SetIsMouseOver(false);

    this._SuspendStateChanges = true;
    try {
        if (this.GetClickMode() === ClickMode.Hover && this.GetIsEnabled())
            this.SetIsPressed(false);
    } finally {
        this._SuspendStateChanges = false;
        this._UpdateVisualState();
    }
};
ButtonBase.prototype.OnMouseMove = function (sender, args) {
    this._MousePosition = args.GetPosition(this);

    if (this._IsMouseLeftButtonDown && this.GetIsEnabled() && this.GetClickMode() !== ClickMode.Hover && this._IsMouseCaptured && !this._IsSpaceKeyDown) {
        this.SetIsPressed(this._IsValidMousePosition());
    }
};
ButtonBase.prototype.OnMouseLeftButtonDown = function (sender, args) {
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
        if (_IsMouseCaptured)
            this.SetIsPressed(true);
    } finally {
        this._SuspendStateChanges = false;
        this._UpdateVisualState();
    }

    if (clickMode === ClickMode.Press)
        this._EmitClick();
};
ButtonBase.prototype.OnMouseLeftButtonUp = function (sender, args) {
    this._IsMouseLeftButtonDown = false;
    if (!this.GetIsEnabled())
        return;
    var clickMode = this.GetClickMode();
    if (clickMode === ClickMode.Hover)
        return;

    //TODO: args.Handled = true;
    if (!this._IsSpaceKeyDown && this.IsPressed && clickMode === ClickMode.Release)
        this._EmitClick();

    if (!this._IsSpaceKeyDown) {
        this._ReleaseMouseCaptureInternal();
        this.SetIsPressed(false);
    }
};
ButtonBase.prototype.OnGotFocus = function (sender, args) {
    this.SetIsFocused(true);
    this._UpdateVisualState();
};
ButtonBase.prototype.OnLostFocus = function (sender, args) {
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
        this._UpdateVisualState();
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
ButtonBase.prototype._IsValidMousePosition = function () {
    var pos = this._MousePosition;
    return pos.X >= 0.0 && pos.X <= this.GetActualWidth()
        && pos.Y >= 0.0 && pos.Y <= this.GetActualHeight();
};

ButtonBase.prototype._UpdateVisualState = function () {
    if (this._SuspendStateChanges)
        return;
    this.ChangeVisualState();
};
ButtonBase.prototype.ChangeVisualState = function () {
    //Nothing to do in ButtonBase
};
ButtonBase.prototype._ChangeVisualState = function (state) {
    var previousState = this._CurrentState;
    if (state.RefEquals(previousState))
        return;

    if (state != null && this._IsLoaded && this._GetLogicalParent() != null) {
        try {
            state.Begin();
            this._CurrentState = state;
            if (previousState != null) {
                previousState.Stop();
            }
        } catch (err) {
        }
    }
};

ButtonBase.prototype._EmitClick = function () {
    this.Click.Raise(this, null);
};

//#endregion

//#endregion