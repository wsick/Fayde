/// <reference path="ButtonBase.js"/>
/// CODE

//#region RepeatButton
var RepeatButton = Nullstone.Create("RepeatButton", ButtonBase);

RepeatButton.Instance.Init = function () {
    this.Init$ButtonBase();
    this.SetClickMode(ClickMode.Press);
};

//#region Dependency Properties

RepeatButton.DelayProperty = DependencyProperty.Register("Delay", function () { return Number; }, RepeatButton, 500, function (d, args) { d.OnDelayChanged(args); });
RepeatButton.Instance.GetDelay = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(RepeatButton.DelayProperty);
};
RepeatButton.Instance.SetDelay = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(RepeatButton.DelayProperty, value);
};

RepeatButton.IntervalProperty = DependencyProperty.Register("Interval", function () { return Number; }, RepeatButton, 33, function (d, args) { d.OnIntervalChanged(args); });
RepeatButton.Instance.GetInterval = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(RepeatButton.IntervalProperty);
};
RepeatButton.Instance.SetInterval = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(RepeatButton.IntervalProperty, value);
};

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
RepeatButton.Instance.OnKeyDown = function (sender, args) {
    if (args.KeyCode === Keys.Space && this.GetClickMode() !== ClickMode.Hover) {
        this._KeyboardCausingRepeat = true;
        this._UpdateRepeatState();
    }
    this.OnKeyDown$ButtonBase(sender, args);
};
RepeatButton.Instance.OnKeyUp = function (sender, args) {
    this.OnKeyUp$ButtonBase(sender, args);
    if (args.KeyCode === Keys.Space && this.GetClickMode() !== ClickMode.Hover) {
        this._KeyboardCausingRepeat = false;
        this._UpdateRepeatState();
    }
    this.UpdateVisualState();
};
RepeatButton.Instance.OnLostFocus = function (sender, args) {
    this.OnLostFocus$ButtonBase(sender, args);
    if (this.GetClickMode() !== ClickMode.Hover) {
        this._KeyboardCausingRepeat = false;
        this._MouseCausingRepeat = false;
        this._UpdateRepeatState();
    }
};
RepeatButton.Instance.OnMouseEnter = function (sender, args) {
    this.OnMouseEnter$ButtonBase(sender, args);
    if (this.GetClickMode() === ClickMode.Hover) {
        this._MouseCausingRepeat = true;
        this._UpdateRepeatState();
    }
    this.UpdateVisualState();

    var obj = this;
    while (true) {
        if (!(obj instanceof FrameworkElement))
            break;
        obj = obj._Parent;
    }
    this._MousePosition = args.GetPosition(obj);
};
RepeatButton.Instance.OnMouseLeave = function (sender, args) {
    this.OnMouseLeave$ButtonBase(sender, args);
    if (this.GetClickMode() === ClickMode.Hover) {
        this._MouseCausingRepeat = false;
        this._UpdateRepeatState();
    }
    this.UpdateVisualState();
};
RepeatButton.Instance.OnMouseLeftButtonDown = function (sender, args) {
    if (args.Handled)
        return;
    this.OnMouseLeftButtonDown$ButtonBase(sender, args);
    if (this.GetClickMode() !== ClickMode.Hover) {
        this._MouseCausingRepeat = true;
        this._UpdateRepeatState();
    }
};
RepeatButton.Instance.OnMouseLeftButtonUp = function (sender, args) {
    if (args.Handled)
        return;
    this.OnMouseLeftButtonUp$ButtonBase(sender, args);
    if (this.GetClickMode() !== ClickMode.Hover) {
        this._MouseCausingRepeat = false;
        this._UpdateRepeatState();
    }
    this.UpdateVisualState();
};
RepeatButton.Instance.OnMouseMove = function (sender, args) {
    var obj = this;
    while (true) {
        if (!(obj instanceof FrameworkElement))
            break;
        obj = obj._Parent;
    }
    this._MousePosition = args.GetPosition(obj);
};

RepeatButton.Instance._UpdateRepeatState = function () {
    if (this._MouseCausingRepeat || this._KeyboardCausingRepeat)
        this._StartTimer();
    else
        this._StopTimer();
};

RepeatButton.Instance._StartTimer = function () {
    if (this._Timer == null) {
        this._Timer = new Timer();
        this._Timer.Tick.Subscribe(this._OnTimeout, this);
    } else if (this._Timer.IsEnabled) {
        return;
    }
    this._Timer.SetInterval(new TimeSpan(0, 0, 0, 0, this.GetDelay()));
    this._Timer.Start();
};
RepeatButton.Instance._StopTimer = function () {
    if (this._Timer != null)
        this._Timer.Stop();
};
RepeatButton.Instance._OnTimeout = function (sender, e) {
    var interval = this.GetInterval();
    var timespan = this._Timer.GetInterval();
    if (timespan.Milliseconds !== interval) {
        this._Timer.SetInterval(new TimeSpan(0, 0, 0, 0, interval));
    }

    if (this.GetIsPressed() || this._KeyboardCausingRepeat) {
        this.OnClick();
        return;
    }

    var els = VisualTreeHelper.FindElementsInHostCoordinates(this._MousePosition);
    for (var i = 0; i < els.length; i++) {
        if (Nullstone.RefEquals(els[i], this)) {
            this.OnClick();
            break;
        }
    }
};

RepeatButton.Instance._ChangeVisualState = function (useTransitions) {
    if (!this.GetIsEnabled()) {
        this._GoToState(useTransitions, "Disabled");
    } else if (this.GetIsPressed()) {
        this._GoToState(useTransitions, "Pressed");
    } else if (this.GetIsMouseOver()) {
        this._GoToState(useTransitions, "MouseOver");
    } else {
        this._GoToState(useTransitions, "Normal");
    }

    if (this.GetIsFocused() && this.GetIsEnabled()) {
        this._GoToState(useTransitions, "Focused");
    } else {
        this._GoToState(useTransitions, "Unfocused");
    }
};

Nullstone.FinishCreate(RepeatButton);
//#endregion