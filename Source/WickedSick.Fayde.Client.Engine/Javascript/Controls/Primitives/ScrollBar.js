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
    if (this._ElementHorizontalThumb != null)
        return this._ElementHorizontalThumb.GetIsDragging();
    if (this._ElementVerticalThumb != null)
        return this._ElementVerticalThumb.GetIsDragging();
    return false;
};

//#endregion

ScrollBar.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$RangeBase();
    this._ElementHorizontalTemplate = Nullstone.As(this.GetTemplateChild("HorizontalRoot"), FrameworkElement);
    this._ElementHorizontalLargeIncrease = Nullstone.As(this.GetTemplateChild("HorizontalLargeIncrease"), RepeatButton);
    this._ElementHorizontalLargeDecrease = Nullstone.As(this.GetTemplateChild("HorizontalLargeDecrease"), RepeatButton);
    this._ElementHorizontalSmallIncrease = Nullstone.As(this.GetTemplateChild("HorizontalSmallIncrease"), RepeatButton);
    this._ElementHorizontalSmallDecrease = Nullstone.As(this.GetTemplateChild("HorizontalSmallDecrease"), RepeatButton);
    this._ElementHorizontalThumb = Nullstone.As(this.GetTemplateChild("HorizontalThumb"), Thumb);
    this._ElementVerticalTemplate = Nullstone.As(this.GetTemplateChild("VerticalRoot"), FrameworkElement);
    this._ElementVerticalLargeIncrease = Nullstone.As(this.GetTemplateChild("VerticalLargeIncrease"), RepeatButton);
    this._ElementVerticalLargeDecrease = Nullstone.As(this.GetTemplateChild("VerticalLargeDecrease"), RepeatButton);
    this._ElementVerticalSmallIncrease = Nullstone.As(this.GetTemplateChild("VerticalSmallIncrease"), RepeatButton);
    this._ElementVerticalSmallDecrease = Nullstone.As(this.GetTemplateChild("VerticalSmallDecrease"), RepeatButton);
    this._ElementVerticalThumb = Nullstone.As(this.GetTemplateChild("VerticalThumb"), Thumb);

    if (this._ElementHorizontalThumb != null) {
        this._ElementHorizontalThumb.DragStarted.Subscribe(this._OnThumbDragStarted, this);
        this._ElementHorizontalThumb.DragDelta.Subscribe(this._OnThumbDragDelta, this);
        this._ElementHorizontalThumb.DragCompleted.Subscribe(this._OnThumbDragCompleted, this);
    }
    if (this._ElementHorizontalLargeIncrease != null) {
        this._ElementHorizontalLargeIncrease.Subscribe(this._LargeIncrement, this);
    }
    if (this._ElementHorizontalLargeDecrease != null) {
        this._ElementHorizontalLargeDecrease.Subscribe(this._LargeDecrement, this);
    }
    if (this._ElementHorizontalSmallIncrease != null) {
        this._ElementHorizontalSmallIncrease.Subscribe(this._SmallIncrement, this);
    }
    if (this._ElementHorizontalSmallDecrease != null) {
        this._ElementHorizontalSmallDecrease.Subscribe(this._SmallDecrement, this);
    }
    if (this._ElementVerticalThumb != null) {
        this._ElementVerticalThumb.DragStarted.Subscribe(this._OnThumbDragStarted, this);
        this._ElementVerticalThumb.DragDelta.Subscribe(this._OnThumbDragDelta, this);
        this._ElementVerticalThumb.DragCompleted.Subscribe(this._OnThumbDragCompleted, this);
    }
    if (this._ElementVerticalLargeIncrease != null) {
        this._ElementVerticalLargeIncrease.Subscribe(this._LargeIncrement, this);
    }
    if (this._ElementVerticalLargeDecrease != null) {
        this._ElementVerticalLargeDecrease.Subscribe(this._LargeDecrement, this);
    }
    if (this._ElementVerticalSmallIncrease != null) {
        this._ElementVerticalSmallIncrease.Subscribe(this._SmallIncrement, this);
    }
    if (this._ElementVerticalSmallDecrease != null) {
        this._ElementVerticalSmallDecrease.Subscribe(this._SmallDecrement, this);
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
    if (orientation === Orientation.Horizontal && this._ElementHorizontalThumb != null && !this._ElementHorizontalThumb.GetIsDragging())
        shouldUpdate = true;
    if (orientation === Orientation.Vertical && this._ElementVerticalThumb != null && !this._ElementVerticalThumb.GetIsDragging())
        shouldUpdate = true;
    if (shouldUpdate)
        this.UpdateVisualState();
};
ScrollBar.Instance.OnMouseLeave = function (sender, args) {
    this.OnMouseLeave$RangeBase(sender, args);
    this._IsMouseOver = false;
    var orientation = this.GetOrientation();
    var shouldUpdate = false;
    if (orientation === Orientation.Horizontal && this._ElementHorizontalThumb != null && !this._ElementHorizontalThumb.GetIsDragging())
        shouldUpdate = true;
    if (orientation === Orientation.Vertical && this._ElementVerticalThumb != null && !this._ElementVerticalThumb.GetIsDragging())
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
    if (this._ElementVerticalThumb != null) {
        change = num * args.VerticalChange / (trackLength - this._ElementVerticalThumb.GetActualHeight()) * diff;
    }
    if (this._ElementHorizontalThumb != null) {
        change = num * args.HorizontalChange / (trackLength - this._ElementHorizontalThumb.GetActualWidth()) * diff;
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
    if (this._ElementHorizontalTemplate != null) {
        this._ElementHorizontalTemplate.SetVisibility(orientation === Orientation.Horizontal ? Visibility.Visible : Visibility.Collapsed);
    }
    if (this._ElementVerticalTemplate != null) {
        this._ElementHorizontalTemplate.SetVisibility(orientation === Orientation.Horizontal ? Visibility.Collapsed : Visibility.Visible);
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
    if (orientation !== Orientation.Horizontal || this._ElementHorizontalLargeDecrease == null || this._ElementHorizontalThumb == null) {
        if (orientation === Orientation.Vertical && this._ElementVerticalLargeDecrease != null && this._ElementVerticalThumb != null) {
            this._ElementVerticalLargeDecrease.SetHeight(Math.max(0, num * (trackLength - num1)));
        }
    } else {
        this._ElementHorizontalLargeDecrease.SetWidth(Math.max(0, num * (trackLength - num1)));
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
        if (orientation !== Orientation.Horizontal || this._ElementHorizontalThumb == null) {
            if (orientation === Orientation.Vertical && this._ElementVerticalThumb != null) {
                if (diff !== 0) {
                    num = Math.max(this._ElementVerticalThumb.GetMinHeight(), this._ConvertViewportSizeToDisplayUnits(trackLength));
                }
                if (diff === 0 || num > this.GetActualHeight() || trackLength <= this._ElementVerticalThumb.GetMinHeight()) {
                    flag = true;
                } else {
                    this._ElementVerticalThumb.SetVisibility(Visibility.Visible);
                    this._ElementVerticalThumb.SetHeight(num);
                }
            }
        } else {
            if (diff !== 0) {
                num = Math.max(this._ElementHorizontalThumb.GetMinWidth(), this._ConvertViewportSizeToDisplayUnits(trackLength));
            }
            if (diff === 0 || num > this.GetActualWidth() || trackLength <= this._ElementHorizontalThumb.GetMinWidth()) {
                flag = true;
            } else {
                this._ElementHorizontalThumb.SetVisibility(Visibility.Visible);
                this._ElementHorizontalThumb.SetWidth(num);
            }
        }
    }
    if (flag) {
        if (this._ElementHorizontalThumb != null) {
            this._ElementHorizontalThumb.SetVisibility(Visibility.Collapsed);
        }
        if (this._ElementVerticalThumb != null) {
            this._ElementVerticalThumb.SetVisibility(Visibility.Collapsed);
        }
    }
    return num;
};

ScrollBar.Instance._GetTrackLength = function () {
    var actual = NaN;
    if (this.GetOrientation() === Orientation.Horizontal) {
        actual = this.GetActualWidth();
        if (this._ElementHorizontalSmallDecrease != null) {
            var thickness = this._ElementHorizontalSmallDecrease.GetMargin();
            actual = actual - this._ElementHorizontalSmallDecrease.GetActualWidth() + thickness.Left + thickness.Right;
        }
        if (this._ElementHorizontalSmallIncrease != null) {
            var thickness = this._ElementHorizontalSmallIncrease.GetMargin();
            actual = actual - this._ElementHorizontalSmallIncrease.GetActualWidth() + thickness.Left + thickness.Right;
        }
    } else {
        actual = this.GetActualHeight();
        if (this._ElementHorizontalSmallDecrease != null) {
            var thickness = this._ElementHorizontalSmallDecrease.GetMargin();
            actual = actual - this._ElementHorizontalSmallDecrease.GetActualWidth() + thickness.Top + thickness.Bottom;
        }
        if (this._ElementHorizontalSmallIncrease != null) {
            var thickness = this._ElementHorizontalSmallIncrease.GetMargin();
            actual = actual - this._ElementHorizontalSmallIncrease.GetActualWidth() + thickness.Top + thickness.Bottom;
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