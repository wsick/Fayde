/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="../ContentControl.js"/>
/// CODE
/// <reference path="../Enums.js"/>

(function (namespace) {
    var ButtonBase = Nullstone.Create("ButtonBase", Fayde.Controls.ContentControl);

    ButtonBase.Instance.Init = function () {
        this.Init$ContentControl();
        this._IsMouseCaptured = false;
        this._IsMouseLeftButtonDown = false;
        this._IsSpaceKeyDown = false;
        this._MousePosition = new Point();

        this.Click = new MulticastEvent();

        this.Loaded.Subscribe(function () { this._IsLoaded = true; this.$UpdateVisualState(); }, this);
        this.IsTabStop = true;
    }

    //#region Properties

    ButtonBase.ClickModeProperty = DependencyProperty.Register("ClickMode", function () { return new Enum(Fayde.Controls.ClickMode); }, ButtonBase, Fayde.Controls.ClickMode.Release);
    ButtonBase.IsPressedProperty = DependencyProperty.RegisterReadOnly("IsPressed", function () { return Boolean; }, ButtonBase, false, function (d, args) { d.OnIsPressedChanged(args); });
    ButtonBase.IsFocusedProperty = DependencyProperty.RegisterReadOnly("IsFocused", function () { return Boolean; }, ButtonBase, false);

    ButtonBase.CommandProperty = DependencyProperty.RegisterCore("Command", function () { return ICommand; }, ButtonBase, undefined, function (d, args) { d.OnCommandPropertyChanged(args); });
    ButtonBase.CommandParameterProperty = DependencyProperty.RegisterCore("CommandParameter", function () { return Object; }, ButtonBase, undefined, function (d, args) { d.OnCommandParameterPropertyChanged(args); });

    ButtonBase.Instance.OnCommandPropertyChanged = function (args) {
        var cmd = Nullstone.As(args.OldValue, ICommand);
        if (cmd != null)
            cmd.CanExecuteChanged.Unsubscribe(this.OnCommandCanExecuteChanged, this);

        cmd = Nullstone.As(args.NewValue, ICommand);
        if (cmd != null) {
            cmd.CanExecuteChanged.Subscribe(this.OnCommandCanExecuteChanged, this);
            this.IsEnabled = cmd.CanExecute(this.CommandParameter);
        }
    };
    ButtonBase.Instance.OnCommandCanExecuteChanged = function (sender, e) {
        this.IsEnabled = this.Command.CanExecute(this.CommandParameter);
    };
    ButtonBase.Instance.OnCommandParameterPropertyChanged = function (args) {
        var cmd = this.Command;
        if (cmd == null)
            return;
        this.IsEnabled = cmd.CanExecute(args.NewValue);
    };

    Nullstone.AutoProperties(ButtonBase, [
        ButtonBase.ClickModeProperty,
        ButtonBase.CommandProperty,
        ButtonBase.CommandParameterProperty
    ]);

    Nullstone.AutoPropertiesReadOnly(ButtonBase, [
        ButtonBase.IsPressedProperty
    ]);
    Nullstone.AutoProperty(ButtonBase, ButtonBase.IsFocusedProperty, undefined, true);

    //#endregion

    ButtonBase.Instance.OnIsEnabledChanged = function (e) {
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
            this.$UpdateVisualState();
        }
    };
    ButtonBase.Instance.OnIsPressedChanged = function (e) {
        this.$UpdateVisualState();
    };

    //#region Visual State

    ButtonBase.Instance.$UpdateVisualState = function (useTransitions) {
        /// <param name="useTransitions" type="Boolean"></param>
        if (this._SuspendStateChanges)
            return;
        this.$UpdateVisualState$ContentControl(useTransitions);
    };
    ButtonBase.Instance.$GetVisualStateCommon = function () {
        if (!this.IsEnabled) {
            return "Disabled";
        } else if (this.IsPressed) {
            return "Pressed";
        } else if (this.IsMouseOver) {
            return "MouseOver";
        } else {
            return "Normal";
        }
    };

    //#endregion

    //#region Mouse

    ButtonBase.Instance.OnMouseEnter = function (args) {
        this.OnMouseEnter$ContentControl(args);

        this._SuspendStateChanges = true;
        try {
            if (this.ClickMode === Fayde.Controls.ClickMode.Hover && this.IsEnabled) {
                this.$SetValueInternal(ButtonBase.IsPressedProperty, true);
                this.OnClick();
            }
        } finally {
            this._SuspendStateChanges = false;
            this.$UpdateVisualState();
        }
    };
    ButtonBase.Instance.OnMouseLeave = function (args) {
        this.OnMouseLeave$ContentControl(args);

        this._SuspendStateChanges = true;
        try {
            if (this.ClickMode === Fayde.Controls.ClickMode.Hover && this.IsEnabled)
                this.$SetValueInternal(ButtonBase.IsPressedProperty, false);
        } finally {
            this._SuspendStateChanges = false;
            this.$UpdateVisualState();
        }
    };
    ButtonBase.Instance.OnMouseMove = function (sender, args) {
        this.OnMouseMove$ContentControl(sender, args);

        this._MousePosition = args.GetPosition(this);

        if (this._IsMouseLeftButtonDown && this.IsEnabled && this.ClickMode !== Fayde.Controls.ClickMode.Hover && this._IsMouseCaptured && !this._IsSpaceKeyDown) {
            this.$SetValueInternal(ButtonBase.IsPressedProperty, this._IsValidMousePosition());
        }
    };
    ButtonBase.Instance.OnMouseLeftButtonDown = function (sender, args) {
        this.OnMouseLeftButtonDown$ContentControl(sender, args);

        this._IsMouseLeftButtonDown = true;
        if (!this.IsEnabled)
            return;
        var clickMode = this.ClickMode;
        if (clickMode === Fayde.Controls.ClickMode.Hover)
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
            this.$UpdateVisualState();
        }

        if (clickMode === Fayde.Controls.ClickMode.Press)
            this.OnClick();
    };
    ButtonBase.Instance.OnMouseLeftButtonUp = function (sender, args) {
        this.OnMouseLeftButtonDown$ContentControl(sender, args);

        this._IsMouseLeftButtonDown = false;
        if (!this.IsEnabled)
            return;
        var clickMode = this.ClickMode;
        if (clickMode === Fayde.Controls.ClickMode.Hover)
            return;

        args.Handled = true;
        if (!this._IsSpaceKeyDown && this.IsPressed && clickMode === Fayde.Controls.ClickMode.Release)
            this.OnClick();

        if (!this._IsSpaceKeyDown) {
            this._ReleaseMouseCaptureInternal();
            this.$SetValueInternal(ButtonBase.IsPressedProperty, false);
        }
    };

    ButtonBase.Instance.OnClick = function () {
        var cmd = this.Command;
        var par = this.CommandParameter;
        if (cmd != null && cmd.CanExecute(par))
            cmd.Execute(par);

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

    ButtonBase.Instance.OnGotFocus = function (e) {
        this.OnGotFocus$ContentControl(e);
        this.$SetValueInternal(ButtonBase.IsFocusedProperty, true);
        this.$UpdateVisualState();
    };
    ButtonBase.Instance.OnLostFocus = function (e) {
        this.OnLostFocus$ContentControl(e);
        this.$SetValueInternal(ButtonBase.IsFocusedProperty, false);

        this._SuspendStateChanges = true;
        try {
            if (this.ClickMode !== Fayde.Controls.ClickMode.Hover) {
                this.$SetValueInternal(ButtonBase.IsPressedProperty, false);
                this._ReleaseMouseCaptureInternal();
                this._IsSpaceKeyDown = false;
            }
        } finally {
            this._SuspendStateChanges = false;
            this.$UpdateVisualState();
        }
    };

    //#endregion

    namespace.ButtonBase = Nullstone.FinishCreate(ButtonBase);
})(Nullstone.Namespace("Fayde.Controls.Primitives"));