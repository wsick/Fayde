/// <reference path="RangeBase.js"/>
/// CODE
/// <reference path="ScrollEventArgs.js"/>
/// <reference path="Enums.js"/>
/// <reference path="DragStartedEventArgs.js"/>
/// <reference path="DragDeltaEventArgs.js"/>
/// <reference path="DragCompletedEventArgs.js"/>

//#region ScrollBar
var ScrollBar = Nullstone.Create("ScrollBar", RangeBase);

ScrollBar.Instance.Init = function () {
    this.Init$RangeBase();
    this.Scroll = new MulticastEvent();
};

//#region Dependency Properties

ScrollBar.OrientationProperty = DependencyProperty.Register("Orientation", function () { return Number; }, ScrollBar, Orientation.Horizontal, ScrollBar._OnOrientationPropertyChanged);
ScrollBar.Instance.GetOrientation = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(ScrollBar.OrientationProperty);
};
ScrollBar.Instance.SetOrientation = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(ScrollBar.OrientationProperty, value);
};
ScrollBar._OnOrientationPropertyChanged = function (d, args) {
    d._OnOrientationChanged();
};

ScrollBar.ViewportSizeProperty = DependencyProperty.Register("ViewportSize", function () { return Number; }, ScrollBar, 0, ScrollBar._OnViewportSizePropertyChanged);
ScrollBar.Instance.GetViewportSize = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(ScrollBar.ViewportSizeProperty);
};
ScrollBar.Instance.SetViewportSize = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(ScrollBar.ViewportSizeProperty, value);
};
ScrollBar._OnViewportSizePropertyChanged = function (d, args) {
    d._UpdateTrackLayout(d._GetTrackLength());
};

//#endregion

//#region Properties

ScrollBar.Instance.GetIsDragging = function () {
    ///<returns type="Boolean"></returns>
    if (this.$ElementHorizontalThumb != null)
        return this.$ElementHorizontalThumb.GetIsDragging();
    if (this.$ElementVerticalThumb != null)
        return this.$ElementVerticalThumb.GetIsDragging();
    return false;
};

//#endregion

ScrollBar.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$RangeBase();
    this.$ElementHorizontalTemplate = Nullstone.As(this.GetTemplateChild("HorizontalRoot"), FrameworkElement);
    this.$ElementHorizontalLargeIncrease = Nullstone.As(this.GetTemplateChild("HorizontalLargeIncrease"), RepeatButton);
    this.$ElementHorizontalLargeDecrease = Nullstone.As(this.GetTemplateChild("HorizontalLargeDecrease"), RepeatButton);
    this.$ElementHorizontalSmallIncrease = Nullstone.As(this.GetTemplateChild("HorizontalSmallIncrease"), RepeatButton);
    this.$ElementHorizontalSmallDecrease = Nullstone.As(this.GetTemplateChild("HorizontalSmallDecrease"), RepeatButton);
    this.$ElementHorizontalThumb = Nullstone.As(this.GetTemplateChild("HorizontalThumb"), Thumb);
    this.$ElementVerticalTemplate = Nullstone.As(this.GetTemplateChild("VerticalRoot"), FrameworkElement);
    this.$ElementVerticalLargeIncrease = Nullstone.As(this.GetTemplateChild("VerticalLargeIncrease"), RepeatButton);
    this.$ElementVerticalLargeDecrease = Nullstone.As(this.GetTemplateChild("VerticalLargeDecrease"), RepeatButton);
    this.$ElementVerticalSmallIncrease = Nullstone.As(this.GetTemplateChild("VerticalSmallIncrease"), RepeatButton);
    this.$ElementVerticalSmallDecrease = Nullstone.As(this.GetTemplateChild("VerticalSmallDecrease"), RepeatButton);
    this.$ElementVerticalThumb = Nullstone.As(this.GetTemplateChild("VerticalThumb"), Thumb);

    if (this.$ElementHorizontalThumb != null) {
        this.$ElementHorizontalThumb.DragStarted.Subscribe(this._OnThumbDragStarted, this);
        this.$ElementHorizontalThumb.DragDelta.Subscribe(this._OnThumbDragDelta, this);
        this.$ElementHorizontalThumb.DragCompleted.Subscribe(this._OnThumbDragCompleted, this);
    }
    if (this.$ElementHorizontalLargeIncrease != null) {
        this.$ElementHorizontalLargeIncrease.Subscribe(this._LargeIncrement, this);
    }
    if (this.$ElementHorizontalLargeDecrease != null) {
        this.$ElementHorizontalLargeDecrease.Subscribe(this._LargeDecrement, this);
    }
    if (this.$ElementHorizontalSmallIncrease != null) {
        this.$ElementHorizontalSmallIncrease.Subscribe(this._SmallIncrement, this);
    }
    if (this.$ElementHorizontalSmallDecrease != null) {
        this.$ElementHorizontalSmallDecrease.Subscribe(this._SmallDecrement, this);
    }
    if (this.$ElementVerticalThumb != null) {
        this.$ElementVerticalThumb.DragStarted.Subscribe(this._OnThumbDragStarted, this);
        this.$ElementVerticalThumb.DragDelta.Subscribe(this._OnThumbDragDelta, this);
        this.$ElementVerticalThumb.DragCompleted.Subscribe(this._OnThumbDragCompleted, this);
    }
    if (this.$ElementVerticalLargeIncrease != null) {
        this.$ElementVerticalLargeIncrease.Subscribe(this._LargeIncrement, this);
    }
    if (this.$ElementVerticalLargeDecrease != null) {
        this.$ElementVerticalLargeDecrease.Subscribe(this._LargeDecrement, this);
    }
    if (this.$ElementVerticalSmallIncrease != null) {
        this.$ElementVerticalSmallIncrease.Subscribe(this._SmallIncrement, this);
    }
    if (this.$ElementVerticalSmallDecrease != null) {
        this.$ElementVerticalSmallDecrease.Subscribe(this._SmallDecrement, this);
    }

    this._OnOrientationChanged();
    this.UpdateVisualState(false);
};

//#region Interaction

ScrollBar.Instance.OnIsEnabledChanged = function (args) {
    this.OnIsEnabledChanged$RangeBase(args);
    if (!this.GetIsEnabled())
        this._IsMouseOver = false;
    this.UpdateVisualState();
};
ScrollBar.Instance.OnLostMouseCapture = function (sender, args) {
    this.UpdateVisualState();
};
ScrollBar.Instance.OnMouseEnter = function (sender, args) {
    this.OnMouseEnter$RangeBase(sender, args);
    this._IsMouseOver = true;
    var orientation = this.GetOrientation();
    var shouldUpdate = false;
    if (orientation === Orientation.Horizontal && this.$ElementHorizontalThumb != null && !this.$ElementHorizontalThumb.GetIsDragging())
        shouldUpdate = true;
    if (orientation === Orientation.Vertical && this.$ElementVerticalThumb != null && !this.$ElementVerticalThumb.GetIsDragging())
        shouldUpdate = true;
    if (shouldUpdate)
        this.UpdateVisualState();
};
ScrollBar.Instance.OnMouseLeave = function (sender, args) {
    this.OnMouseLeave$RangeBase(sender, args);
    this._IsMouseOver = false;
    var orientation = this.GetOrientation();
    var shouldUpdate = false;
    if (orientation === Orientation.Horizontal && this.$ElementHorizontalThumb != null && !this.$ElementHorizontalThumb.GetIsDragging())
        shouldUpdate = true;
    if (orientation === Orientation.Vertical && this.$ElementVerticalThumb != null && !this.$ElementVerticalThumb.GetIsDragging())
        shouldUpdate = true;
    if (shouldUpdate)
        this.UpdateVisualState();
};
ScrollBar.Instance.OnMouseLeftButtonDown = function (sender, args) {
    this.OnMouseLeftButtonDown$RangeBase(sender, args);
    if (args.Handled)
        return;
    args.Handled = true;
    this.CaptureMouse();
};
ScrollBar.Instance.OnMouseLeftButtonUp = function (sender, args) {
    this.OnMouseLeftButtonUp$RangeBase(sender, args);
    args.Handled = true;
};

//#endregion

//#region RangeBase Changes

ScrollBar.Instance._OnMaximumChanged = function (oldMax, newMax) {
    var trackLength = this._GetTrackLength();
    this._OnMaximumChanged$RangeBase(oldMax, newMax);
    this._UpdateTrackLayout(trackLength);
};
ScrollBar.Instance._OnMinimumChanged = function (oldMin, newMin) {
    var trackLength = this._GetTrackLength();
    this._OnMinimumChanged$RangeBase(oldMax, newMax);
    this._UpdateTrackLayout(trackLength);
};
ScrollBar.Instance._OnCurrentValueChanged = function (oldValue, newValue) {
    var trackLength = this._GetTrackLength();
    this._OnCurrentValueChanged$RangeBase(oldValue, newValue);
    this._UpdateTrackLayout(trackLength);
};

//#endregion

//#region Thumb Drag

ScrollBar.Instance._OnThumbDragStarted = function (sender, args) {
    /// <param name="args" type="DragStartedEventArgs"></param>
    this._DragValue = this.GetCurrentValue();
};
ScrollBar.Instance._OnThumbDragDelta = function (sender, args) {
    /// <param name="args" type="DragDeltaEventArgs"></param>
    var change = 0;
    var zoomFactor = 1; //TODO: FullScreen?
    var num = zoomFactor;
    var max = this.GetMaximum();
    var min = this.GetMinimum();
    var diff = max - min;
    var trackLength = this._GetTrackLength();
    if (this.$ElementVerticalThumb != null) {
        change = num * args.VerticalChange / (trackLength - this.$ElementVerticalThumb.GetActualHeight()) * diff;
    }
    if (this.$ElementHorizontalThumb != null) {
        change = num * args.HorizontalChange / (trackLength - this.$ElementHorizontalThumb.GetActualWidth()) * diff;
    }
    if (!isNaN(change) && isFinite(change)) {
        this._DragValue += change;
        var num1 = Math.min(max, Math.max(min, this._DragValue));
        if (num1 !== this.GetCurrentValue()) {
            this.SetCurrentValue(num1);
            this._RaiseScroll(ScrollEventType.ThumbTrack);
        }
    }
};
ScrollBar.Instance._OnThumbDragCompleted = function (sender, args) {
    /// <param name="args" type="DragCompletedEventArgs"></param>
    this._RaiseScroll(ScrollEventType.EndScroll);
};

//#endregion

//#region Movement

ScrollBar.Instance._SmallDecrement = function (sender, args) {
    var curValue = this.GetCurrentValue();
    var num = Math.max(curValue - this.GetSmallChange(), this.GetMinimum());
    if (curValue !== num) {
        this.SetCurrentValue(num);
        this._RaiseScroll(ScrollEventType.SmallDecrement);
    }
};
ScrollBar.Instance._SmallIncrement = function (sender, args) {
    var curValue = this.GetCurrentValue();
    var num = Math.min(curValue + this.GetSmallChange(), this.GetMaximum());
    if (curValue !== num) {
        this.SetCurrentValue(num);
        this._RaiseScroll(ScrollEventType.SmallIncrement);
    }
};
ScrollBar.Instance._LargeDecrement = function (sender, args) {
    var curValue = this.GetCurrentValue();
    var num = Math.max(curValue - this.GetLargeChange(), this.GetMinimum());
    if (curValue !== num) {
        this.SetCurrentValue(num);
        this._RaiseScroll(ScrollEventType.LargeDecrement);
    }
};
ScrollBar.Instance._LargeIncrement = function (sender, args) {
    var curValue = this.GetCurrentValue();
    var num = Math.min(curValue + this.GetLargeChange(), this.GetMaximum());
    if (curValue !== num) {
        this.SetCurrentValue(num);
        this._RaiseScroll(ScrollEventType.LargeIncrement);
    }
};

//#endregion

ScrollBar.Instance._OnOrientationChanged = function () {
    var orientation = this.GetOrientation();
    if (this.$ElementHorizontalTemplate != null) {
        this.$ElementHorizontalTemplate.SetVisibility(orientation === Orientation.Horizontal ? Visibility.Visible : Visibility.Collapsed);
    }
    if (this.$ElementVerticalTemplate != null) {
        this.$ElementHorizontalTemplate.SetVisibility(orientation === Orientation.Horizontal ? Visibility.Collapsed : Visibility.Visible);
    }
    this._UpdateTrackLayout(this._GetTrackLength());
};
ScrollBar.Instance._UpdateTrackLayout = function (trackLength) {
    var max = this.GetMaximum();
    var min = this.GetMinimum();
    var val = this.GetCurrentValue();
    var num = (val - min) / (max - min);
    var num1 = this._UpdateThumbSize(trackLength);
    var orientation = this.GetOrientation();
    if (orientation !== Orientation.Horizontal || this.$ElementHorizontalLargeDecrease == null || this.$ElementHorizontalThumb == null) {
        if (orientation === Orientation.Vertical && this.$ElementVerticalLargeDecrease != null && this.$ElementVerticalThumb != null) {
            this.$ElementVerticalLargeDecrease.SetHeight(Math.max(0, num * (trackLength - num1)));
        }
    } else {
        this.$ElementHorizontalLargeDecrease.SetWidth(Math.max(0, num * (trackLength - num1)));
    }
};
ScrollBar.Instance._UpdateThumbSize = function (trackLength) {
    var num = NaN;
    var flag = trackLength <= 0;
    if (trackLength > 0) {
        var orientation = this.GetOrientation();
        var max = this.GetMaximum();
        var min = this.GetMinimum();
        var diff = max - min;
        if (orientation !== Orientation.Horizontal || this.$ElementHorizontalThumb == null) {
            if (orientation === Orientation.Vertical && this.$ElementVerticalThumb != null) {
                if (diff !== 0) {
                    num = Math.max(this.$ElementVerticalThumb.GetMinHeight(), this._ConvertViewportSizeToDisplayUnits(trackLength));
                }
                if (diff === 0 || num > this.GetActualHeight() || trackLength <= this.$ElementVerticalThumb.GetMinHeight()) {
                    flag = true;
                } else {
                    this.$ElementVerticalThumb.SetVisibility(Visibility.Visible);
                    this.$ElementVerticalThumb.SetHeight(num);
                }
            }
        } else {
            if (diff !== 0) {
                num = Math.max(this.$ElementHorizontalThumb.GetMinWidth(), this._ConvertViewportSizeToDisplayUnits(trackLength));
            }
            if (diff === 0 || num > this.GetActualWidth() || trackLength <= this.$ElementHorizontalThumb.GetMinWidth()) {
                flag = true;
            } else {
                this.$ElementHorizontalThumb.SetVisibility(Visibility.Visible);
                this.$ElementHorizontalThumb.SetWidth(num);
            }
        }
    }
    if (flag) {
        if (this.$ElementHorizontalThumb != null) {
            this.$ElementHorizontalThumb.SetVisibility(Visibility.Collapsed);
        }
        if (this.$ElementVerticalThumb != null) {
            this.$ElementVerticalThumb.SetVisibility(Visibility.Collapsed);
        }
    }
    return num;
};

ScrollBar.Instance._GetTrackLength = function () {
    var actual = NaN;
    if (this.GetOrientation() === Orientation.Horizontal) {
        actual = this.GetActualWidth();
        if (this.$ElementHorizontalSmallDecrease != null) {
            var thickness = this.$ElementHorizontalSmallDecrease.GetMargin();
            actual = actual - this.$ElementHorizontalSmallDecrease.GetActualWidth() + thickness.Left + thickness.Right;
        }
        if (this.$ElementHorizontalSmallIncrease != null) {
            var thickness = this.$ElementHorizontalSmallIncrease.GetMargin();
            actual = actual - this.$ElementHorizontalSmallIncrease.GetActualWidth() + thickness.Left + thickness.Right;
        }
    } else {
        actual = this.GetActualHeight();
        if (this.$ElementHorizontalSmallDecrease != null) {
            var thickness = this.$ElementHorizontalSmallDecrease.GetMargin();
            actual = actual - this.$ElementHorizontalSmallDecrease.GetActualWidth() + thickness.Top + thickness.Bottom;
        }
        if (this.$ElementHorizontalSmallIncrease != null) {
            var thickness = this.$ElementHorizontalSmallIncrease.GetMargin();
            actual = actual - this.$ElementHorizontalSmallIncrease.GetActualWidth() + thickness.Top + thickness.Bottom;
        }
    }
    return actual;
};
ScrollBar.Instance._ConvertViewportSizeToDisplayUnits = function (trackLength) {
    var viewportSize = this.GetViewportSize();
    return trackLength * viewportSize / (viewportSize + this.GetMaximum() - this.GetMinimum());
};

ScrollBar.Instance._RaiseScroll = function (scrollEvtType) {
    var args = new ScrollEventArgs(scrollEvtType, this.GetCurrentValue());
    args.OriginalSource = this;
    this.Scroll.Raise(this, args);
};

ScrollBar.Instance.UpdateVisualState = function (useTransitions) {
    if (useTransitions === undefined) useTransitions = true;
    if (!this.GetIsEnabled()) {
        this._GoToState(useTransitions, "Disabled");
    } else if (this._IsMouseOver) {
        this._GoToState(useTransitions, "MouseOver");
    } else {
        this._GoToState(useTransitions, "Normal");
    }
};

Nullstone.FinishCreate(ScrollBar);
//#endregion