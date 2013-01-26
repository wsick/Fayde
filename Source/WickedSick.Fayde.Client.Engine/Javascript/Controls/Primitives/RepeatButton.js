/// <reference path="ButtonBase.js"/>
/// CODE
/// <reference path="../Enums.js"/>

(function (namespace) {
    var RepeatButton = Nullstone.Create("RepeatButton", namespace.ButtonBase);

    RepeatButton.Instance.Init = function () {
        this.Init$ButtonBase();
        this.ClickMode = Fayde.Controls.ClickMode.Press;
        this.DefaultStyleKey = this.constructor;
    };

    //#region Properties

    RepeatButton.DelayProperty = DependencyProperty.Register("Delay", function () { return Number; }, RepeatButton, 500, function (d, args) { d.OnDelayChanged(args); });
    RepeatButton.IntervalProperty = DependencyProperty.Register("Interval", function () { return Number; }, RepeatButton, 33, function (d, args) { d.OnIntervalChanged(args); });

    Nullstone.AutoProperties(RepeatButton, [
        RepeatButton.DelayProperty,
        RepeatButton.IntervalProperty
    ]);

    //#endregion

    RepeatButton.Instance.OnDelayChanged = function (args) {
        if (args.NewValue < 0)
            throw new ArgumentException("Delay Property cannot be negative.");
    };
    RepeatButton.Instance.OnIntervalChanged = function (args) {
        if (args.NewValue < 0)
            throw new ArgumentException("Interval Property cannot be negative.");
    };

    RepeatButton.Instance.OnIsEnabledChanged = function (e) {
        this.OnIsEnabledChanged$ButtonBase(e);
        this._KeyboardCausingRepeat = false;
        this._MouseCausingRepeat = false;
        this._UpdateRepeatState();
    };
    RepeatButton.Instance.OnKeyDown = function (args) {
        if (args.Key === Key.Space && this.ClickMode !== Fayde.Controls.ClickMode.Hover) {
            this._KeyboardCausingRepeat = true;
            this._UpdateRepeatState();
        }
        this.OnKeyDown$ButtonBase(args);
    };
    RepeatButton.Instance.OnKeyUp = function (args) {
        this.OnKeyUp$ButtonBase(args);
        if (args.Key === Key.Space && this.ClickMode !== Fayde.Controls.ClickMode.Hover) {
            this._KeyboardCausingRepeat = false;
            this._UpdateRepeatState();
        }
        this.$UpdateVisualState();
    };
    RepeatButton.Instance.OnLostFocus = function (sender, args) {
        this.OnLostFocus$ButtonBase(sender, args);
        if (this.ClickMode !== Fayde.Controls.ClickMode.Hover) {
            this._KeyboardCausingRepeat = false;
            this._MouseCausingRepeat = false;
            this._UpdateRepeatState();
        }
    };
    RepeatButton.Instance.OnMouseEnter = function (args) {
        this.OnMouseEnter$ButtonBase(args);
        if (this.ClickMode === Fayde.Controls.ClickMode.Hover) {
            this._MouseCausingRepeat = true;
            this._UpdateRepeatState();
        }
        this.$UpdateVisualState();

        var parent = this;
        while (true) {
            var fe = Nullstone.As(parent, FrameworkElement);
            if (!fe)
                break;
            parent = fe._GetLogicalParent();
        }
        this._MousePosition = args.GetPosition(parent);
    };
    RepeatButton.Instance.OnMouseLeave = function (args) {
        this.OnMouseLeave$ButtonBase(args);
        if (this.ClickMode === Fayde.Controls.ClickMode.Hover) {
            this._MouseCausingRepeat = false;
            this._UpdateRepeatState();
        }
        this.$UpdateVisualState();
    };
    RepeatButton.Instance.OnMouseLeftButtonDown = function (sender, args) {
        if (args.Handled)
            return;
        this.OnMouseLeftButtonDown$ButtonBase(sender, args);
        if (this.ClickMode !== Fayde.Controls.ClickMode.Hover) {
            this._MouseCausingRepeat = true;
            this._UpdateRepeatState();
        }
    };
    RepeatButton.Instance.OnMouseLeftButtonUp = function (sender, args) {
        if (args.Handled)
            return;
        this.OnMouseLeftButtonUp$ButtonBase(sender, args);
        if (this.ClickMode !== Fayde.Controls.ClickMode.Hover) {
            this._MouseCausingRepeat = false;
            this._UpdateRepeatState();
        }
        this.$UpdateVisualState();
    };
    RepeatButton.Instance.OnMouseMove = function (sender, args) {
        var parent = this;
        while (true) {
            var fe = Nullstone.As(parent, FrameworkElement);
            if (!fe)
                break;
            parent = fe._GetLogicalParent();
        }
        this._MousePosition = args.GetPosition(parent);
    };

    RepeatButton.Instance._UpdateRepeatState = function () {
        if (this._MouseCausingRepeat || this._KeyboardCausingRepeat)
            this._StartTimer();
        else
            this._StopTimer();
    };

    RepeatButton.Instance._StartTimer = function () {
        if (!this._Timer) {
            this._Timer = new Timer();
            this._Timer.Tick.Subscribe(this._OnTimeout, this);
        } else if (this._Timer.IsEnabled) {
            return;
        }
        this._Timer.SetInterval(new TimeSpan(0, 0, 0, 0, this.Delay));
        this._Timer.Start();
    };
    RepeatButton.Instance._StopTimer = function () {
        if (this._Timer)
            this._Timer.Stop();
    };
    RepeatButton.Instance._OnTimeout = function (sender, e) {
        var interval = this.Interval;
        var timespan = this._Timer.GetInterval();
        if (timespan.Milliseconds !== interval) {
            this._Timer.SetInterval(new TimeSpan(0, 0, 0, 0, interval));
        }

        if (this.IsPressed || this._KeyboardCausingRepeat) {
            this.OnClick();
            return;
        }

        var els = Fayde.VisualTreeHelper.FindElementsInHostCoordinates(this._MousePosition);
        for (var i = 0; i < els.length; i++) {
            if (Nullstone.RefEquals(els[i], this)) {
                this.OnClick();
                break;
            }
        }
    };

    namespace.RepeatButton = Nullstone.FinishCreate(RepeatButton);
})(Nullstone.Namespace("Fayde.Controls.Primitives"));