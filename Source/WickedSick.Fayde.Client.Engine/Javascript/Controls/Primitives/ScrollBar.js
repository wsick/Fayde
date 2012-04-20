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

ScrollBar.OrientationProperty = DependencyProperty.Register("Orientation", function () { return new Enum(Orientation); }, ScrollBar, Orientation.Horizontal, ScrollBar._OnOrientationPropertyChanged);
ScrollBar.Instance.GetOrientation = function () {
    ///<returns type="Number"></returns>
    return this.$GetValue(ScrollBar.OrientationProperty);
};
ScrollBar.Instance.SetOrientation = function (value) {
    ///<param name="value" type="Number"></param>
    this.$SetValue(ScrollBar.OrientationProperty, value);
};
ScrollBar._OnOrientationPropertyChanged = function (d, args) {
    d._OnOrientationChanged();
};

ScrollBar.ViewportSizeProperty = DependencyProperty.Register("ViewportSize", function () { return Number; }, ScrollBar, 0, ScrollBar._OnViewportSizePropertyChanged);
ScrollBar.Instance.GetViewportSize = function () {
    ///<returns type="Number"></returns>
    return this.$GetValue(ScrollBar.ViewportSizeProperty);
};
ScrollBar.Instance.SetViewportSize = function (value) {
    ///<param name="value" type="Number"></param>
    this.$SetValue(ScrollBar.ViewportSizeProperty, value);
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
        this.$ElementHorizontalLargeIncrease.Click.Subscribe(this._LargeIncrement, this);
    }
    if (this.$ElementHorizontalLargeDecrease != null) {
        this.$ElementHorizontalLargeDecrease.Click.Subscribe(this._LargeDecrement, this);
    }
    if (this.$ElementHorizontalSmallIncrease != null) {
        this.$ElementHorizontalSmallIncrease.Click.Subscribe(this._SmallIncrement, this);
    }
    if (this.$ElementHorizontalSmallDecrease != null) {
        this.$ElementHorizontalSmallDecrease.Click.Subscribe(this._SmallDecrement, this);
    }
    if (this.$ElementVerticalThumb != null) {
        this.$ElementVerticalThumb.DragStarted.Subscribe(this._OnThumbDragStarted, this);
        this.$ElementVerticalThumb.DragDelta.Subscribe(this._OnThumbDragDelta, this);
        this.$ElementVerticalThumb.DragCompleted.Subscribe(this._OnThumbDragCompleted, this);
    }
    if (this.$ElementVerticalLargeIncrease != null) {
        this.$ElementVerticalLargeIncrease.Click.Subscribe(this._LargeIncrement, this);
    }
    if (this.$ElementVerticalLargeDecrease != null) {
        this.$ElementVerticalLargeDecrease.Click.Subscribe(this._LargeDecrement, this);
    }
    if (this.$ElementVerticalSmallIncrease != null) {
        this.$ElementVerticalSmallIncrease.Click.Subscribe(this._SmallIncrement, this);
    }
    if (this.$ElementVerticalSmallDecrease != null) {
        this.$ElementVerticalSmallDecrease.Click.Subscribe(this._SmallDecrement, this);
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

ScrollBar.Instance.GetDefaultStyle = function () {
    var styleJson = {
        Type: Style,
        Props: {
            TargetType: ScrollBar
        },
        Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ScrollBar, "MinWidth"),
        Value: "17"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ScrollBar, "MinHeight"),
        Value: "17"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ScrollBar, "IsTabStop"),
        Value: "False"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ScrollBar, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: "ScrollBar"
            },
            Content: {
                Type: Grid,
                Name: "Root",
                Props: {
                    Name: "Root",
                    Resources: [
{
    Type: ControlTemplate,
    Key: "RepeatButtonTemplate",
    Props: {
        Key: "RepeatButtonTemplate",
        TargetType: "RepeatButton"
    },
    Content: {
        Type: Grid,
        Name: "Root",
        Props: {
            Name: "Root",
            Background: {
                Type: SolidColorBrush,
                Props: {
                    Color: Color.FromHex("#FFFFFF")
                }
            }
        },
        AttachedProps: [{
            Owner: VisualStateManager,
            Prop: "VisualStateGroups",
            Value: [
{
    Type: VisualStateGroup,
    Name: "CommonStates",
    Props: {
        Name: "CommonStates"
    },
    Children: [
{
    Type: VisualState,
    Name: "Normal",
    Props: {
        Name: "Normal"
    }
}]

}]


        }
]
    }
},
{
    Type: ControlTemplate,
    Key: "HorizontalIncrementTemplate",
    Props: {
        Key: "HorizontalIncrementTemplate",
        TargetType: "RepeatButton"
    },
    Content: {
        Type: Grid,
        Name: "Root",
        Props: {
            Name: "Root"
        },
        AttachedProps: [{
            Owner: VisualStateManager,
            Prop: "VisualStateGroups",
            Value: [
{
    Type: VisualStateGroup,
    Name: "CommonStates",
    Props: {
        Name: "CommonStates"
    },
    Children: [
{
    Type: VisualState,
    Name: "Normal",
    Props: {
        Name: "Normal"
    }
},
{
    Type: VisualState,
    Name: "MouseOver",
    Props: {
        Name: "MouseOver"
    },
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Background"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundAnimation"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#7FFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#CCFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#F2FFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

}
]
}]

    }
},
{
    Type: VisualState,
    Name: "Pressed",
    Props: {
        Name: "Pressed"
    },
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Background"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundAnimation"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Highlight"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(UIElement.Opacity)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#6BFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#C6FFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#EAFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#F4FFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

}
]
}]

    }
},
{
    Type: VisualState,
    Name: "Disabled",
    Props: {
        Name: "Disabled"
    },
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 0.7
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "DisabledElement"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
}]

    }
}]

}]


        }
],
        Children: [
{
    Type: Rectangle,
    Name: "Background",
    Props: {
        Name: "Background",
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF1F3B53")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(0.5, 1),
                StartPoint: new Point(0.5, 0)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF647480"),
        Offset: 1
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFAEB7BF"),
        Offset: 0
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF919EA7"),
        Offset: 0.35
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF7A8A99"),
        Offset: 0.35
    }
}]

        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundAnimation",
    Props: {
        Name: "BackgroundAnimation",
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundGradient",
    Props: {
        Name: "BackgroundGradient",
        Opacity: 0,
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1),
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        Fill: {
            Type: LinearGradientBrush,
            Props: {
                StartPoint: new Point(0.7, 0),
                EndPoint: new Point(0.7, 1)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFFFFFFF"),
        Offset: 0.013
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#F9FFFFFF"),
        Offset: 0.375
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#E5FFFFFF"),
        Offset: 0.603
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#C6FFFFFF"),
        Offset: 1
    }
}]

        }
    }
},
{
    Type: Rectangle,
    Name: "Highlight",
    Props: {
        Name: "Highlight",
        Opacity: 0,
        RadiusX: 1,
        RadiusY: 1,
        IsHitTestVisible: false,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF6DBDD1")
            }
        },
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1)
    }
},
{
    Type: Path,
    Props: {
        Stretch: Stretch.Uniform,
        Height: 8,
        Width: 4,
        Data: "F1 M 511.047,352.682L 511.047,342.252L 517.145,347.467L 511.047,352.682 Z",
        Fill: {
            Type: SolidColorBrush,
            Name: "ButtonColor",
            Props: {
                Name: "ButtonColor",
                Color: Color.FromHex("#FF333333")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "DisabledElement",
    Props: {
        Name: "DisabledElement",
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        }
    }
}]

    }
},
{
    Type: ControlTemplate,
    Key: "HorizontalDecrementTemplate",
    Props: {
        Key: "HorizontalDecrementTemplate",
        TargetType: "RepeatButton"
    },
    Content: {
        Type: Grid,
        Name: "Root",
        Props: {
            Name: "Root"
        },
        AttachedProps: [{
            Owner: VisualStateManager,
            Prop: "VisualStateGroups",
            Value: [
{
    Type: VisualStateGroup,
    Name: "CommonStates",
    Props: {
        Name: "CommonStates"
    },
    Children: [
{
    Type: VisualState,
    Name: "Normal",
    Props: {
        Name: "Normal"
    }
},
{
    Type: VisualState,
    Name: "MouseOver",
    Props: {
        Name: "MouseOver"
    },
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Background"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundMouseOver"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#7FFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#CCFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#F2FFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

}
]
}]

    }
},
{
    Type: VisualState,
    Name: "Pressed",
    Props: {
        Name: "Pressed"
    },
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Background"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundPressed"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Highlight"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(UIElement.Opacity)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#6BFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#C6FFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#EAFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#F4FFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

}
]
}]

    }
},
{
    Type: VisualState,
    Name: "Disabled",
    Props: {
        Name: "Disabled"
    },
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 0.7
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "DisabledElement"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
}]

    }
}]

}]


        }
],
        Children: [
{
    Type: Rectangle,
    Name: "Background",
    Props: {
        Name: "Background",
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF1F3B53")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(0.5, 1),
                StartPoint: new Point(0.5, 0)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF647480"),
        Offset: 1
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFAEB7BF"),
        Offset: 0
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF919EA7"),
        Offset: 0.35
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF7A8A99"),
        Offset: 0.35
    }
}]

        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundMouseOver",
    Props: {
        Name: "BackgroundMouseOver",
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundPressed",
    Props: {
        Name: "BackgroundPressed",
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundGradient",
    Props: {
        Name: "BackgroundGradient",
        Opacity: 0,
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1),
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        Fill: {
            Type: LinearGradientBrush,
            Props: {
                StartPoint: new Point(0.7, 0),
                EndPoint: new Point(0.7, 1)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFFFFFFF"),
        Offset: 0.013
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#F9FFFFFF"),
        Offset: 0.375
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#E5FFFFFF"),
        Offset: 0.603
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#C6FFFFFF"),
        Offset: 1
    }
}]

        }
    }
},
{
    Type: Rectangle,
    Name: "Highlight",
    Props: {
        Name: "Highlight",
        Opacity: 0,
        RadiusX: 1,
        RadiusY: 1,
        IsHitTestVisible: false,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF6DBDD1")
            }
        },
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1)
    }
},
{
    Type: Path,
    Props: {
        Stretch: Stretch.Uniform,
        Height: 8,
        Width: 4,
        Data: "F1 M 110.692,342.252L 110.692,352.682L 104.594,347.467L 110.692,342.252 Z",
        Fill: {
            Type: SolidColorBrush,
            Name: "ButtonColor",
            Props: {
                Name: "ButtonColor",
                Color: Color.FromHex("#FF333333")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "DisabledElement",
    Props: {
        Name: "DisabledElement",
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        }
    }
}]

    }
},
{
    Type: ControlTemplate,
    Key: "VerticalIncrementTemplate",
    Props: {
        Key: "VerticalIncrementTemplate",
        TargetType: "RepeatButton"
    },
    Content: {
        Type: Grid,
        Name: "Root",
        Props: {
            Name: "Root"
        },
        AttachedProps: [{
            Owner: VisualStateManager,
            Prop: "VisualStateGroups",
            Value: [
{
    Type: VisualStateGroup,
    Name: "CommonStates",
    Props: {
        Name: "CommonStates"
    },
    Children: [
{
    Type: VisualState,
    Name: "Normal",
    Props: {
        Name: "Normal"
    }
},
{
    Type: VisualState,
    Name: "MouseOver",
    Props: {
        Name: "MouseOver"
    },
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Background"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundMouseOver"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#7FFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#CCFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#F2FFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

}
]
}]

    }
},
{
    Type: VisualState,
    Name: "Pressed",
    Props: {
        Name: "Pressed"
    },
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Background"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundPressed"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Highlight"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(UIElement.Opacity)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#6BFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#C6FFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#EAFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#F4FFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

}
]
}]

    }
},
{
    Type: VisualState,
    Name: "Disabled",
    Props: {
        Name: "Disabled"
    },
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 0.7
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "DisabledElement"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
}]

    }
}]

}]


        }
],
        Children: [
{
    Type: Rectangle,
    Name: "Background",
    Props: {
        Name: "Background",
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF1F3B53")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(1, 0.5),
                StartPoint: new Point(0, 0.5)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF647480"),
        Offset: 1
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFAEB7BF"),
        Offset: 0
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF919EA7"),
        Offset: 0.35
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF7A8A99"),
        Offset: 0.35
    }
}]

        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundMouseOver",
    Props: {
        Name: "BackgroundMouseOver",
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundPressed",
    Props: {
        Name: "BackgroundPressed",
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundGradient",
    Props: {
        Name: "BackgroundGradient",
        Opacity: 0,
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1),
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        Fill: {
            Type: LinearGradientBrush,
            Props: {
                StartPoint: new Point(0, 0.7),
                EndPoint: new Point(1, 0.7)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFFFFFFF"),
        Offset: 0.013
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#F9FFFFFF"),
        Offset: 0.375
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#E5FFFFFF"),
        Offset: 0.603
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#C6FFFFFF"),
        Offset: 1
    }
}]

        }
    }
},
{
    Type: Rectangle,
    Name: "Highlight",
    Props: {
        Name: "Highlight",
        Opacity: 0,
        RadiusX: 1,
        RadiusY: 1,
        IsHitTestVisible: false,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF6DBDD1")
            }
        },
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1)
    }
},
{
    Type: Path,
    Props: {
        Stretch: Stretch.Uniform,
        Height: 4,
        Width: 8,
        Data: "F1 M 531.107,321.943L 541.537,321.943L 536.322,328.042L 531.107,321.943 Z",
        Fill: {
            Type: SolidColorBrush,
            Name: "ButtonColor",
            Props: {
                Name: "ButtonColor",
                Color: Color.FromHex("#FF333333")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "DisabledElement",
    Props: {
        Name: "DisabledElement",
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        }
    }
}]

    }
},
{
    Type: ControlTemplate,
    Key: "VerticalDecrementTemplate",
    Props: {
        Key: "VerticalDecrementTemplate",
        TargetType: "RepeatButton"
    },
    Content: {
        Type: Grid,
        Name: "Root",
        Props: {
            Name: "Root"
        },
        AttachedProps: [{
            Owner: VisualStateManager,
            Prop: "VisualStateGroups",
            Value: [
{
    Type: VisualStateGroup,
    Name: "CommonStates",
    Props: {
        Name: "CommonStates"
    },
    Children: [
{
    Type: VisualState,
    Name: "Normal",
    Props: {
        Name: "Normal"
    }
},
{
    Type: VisualState,
    Name: "MouseOver",
    Props: {
        Name: "MouseOver"
    },
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Background"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundMouseOver"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#7FFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#CCFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#F2FFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

}
]
}]

    }
},
{
    Type: VisualState,
    Name: "Pressed",
    Props: {
        Name: "Pressed"
    },
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Background"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundPressed"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Highlight"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(UIElement.Opacity)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#6BFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#C6FFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#EAFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#F4FFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

}
]
}]

    }
},
{
    Type: VisualState,
    Name: "Disabled",
    Props: {
        Name: "Disabled"
    },
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 0.7
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "DisabledElement"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
}]

    }
}]

}]


        }
],
        Children: [
{
    Type: Rectangle,
    Name: "Background",
    Props: {
        Name: "Background",
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF1F3B53")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(1, 0.5),
                StartPoint: new Point(0, 0.5)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF647480"),
        Offset: 1
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFAEB7BF"),
        Offset: 0
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF919EA7"),
        Offset: 0.35
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF7A8A99"),
        Offset: 0.35
    }
}]

        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundMouseOver",
    Props: {
        Name: "BackgroundMouseOver",
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundPressed",
    Props: {
        Name: "BackgroundPressed",
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundGradient",
    Props: {
        Name: "BackgroundGradient",
        Opacity: 0,
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1),
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        Fill: {
            Type: LinearGradientBrush,
            Props: {
                StartPoint: new Point(0, 0.7),
                EndPoint: new Point(1, 0.7)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFFFFFFF"),
        Offset: 0.013
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#F9FFFFFF"),
        Offset: 0.375
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#E5FFFFFF"),
        Offset: 0.603
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#C6FFFFFF"),
        Offset: 1
    }
}]

        }
    }
},
{
    Type: Rectangle,
    Name: "Highlight",
    Props: {
        Name: "Highlight",
        Opacity: 0,
        RadiusX: 1,
        RadiusY: 1,
        IsHitTestVisible: false,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF6DBDD1")
            }
        },
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1)
    }
},
{
    Type: Path,
    Props: {
        Stretch: Stretch.Uniform,
        Height: 4,
        Width: 8,
        Data: "F1 M 541.537,173.589L 531.107,173.589L 536.322,167.49L 541.537,173.589 Z",
        Fill: {
            Type: SolidColorBrush,
            Name: "ButtonColor",
            Props: {
                Name: "ButtonColor",
                Color: Color.FromHex("#FF333333")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "DisabledElement",
    Props: {
        Name: "DisabledElement",
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        }
    }
}]

    }
},
{
    Type: ControlTemplate,
    Key: "VerticalThumbTemplate",
    Props: {
        Key: "VerticalThumbTemplate",
        TargetType: "Thumb"
    },
    Content: {
        Type: Grid,
        AttachedProps: [{
            Owner: VisualStateManager,
            Prop: "VisualStateGroups",
            Value: [
{
    Type: VisualStateGroup,
    Name: "CommonStates",
    Props: {
        Name: "CommonStates"
    },
    Children: [
{
    Type: VisualState,
    Name: "Normal",
    Props: {
        Name: "Normal"
    }
},
{
    Type: VisualState,
    Name: "MouseOver",
    Props: {
        Name: "MouseOver"
    },
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundMouseOver"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#7FFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#CCFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#F2FFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

}
]
}]

    }
},
{
    Type: VisualState,
    Name: "Pressed",
    Props: {
        Name: "Pressed"
    },
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundPressed"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Highlight"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(UIElement.Opacity)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#6BFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#C6FFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#EAFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#F4FFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

}
]
}]

    }
},
{
    Type: VisualState,
    Name: "Disabled",
    Props: {
        Name: "Disabled"
    },
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 0
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "ThumbVisual"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
}]

    }
}]

}]


        }
],
        Children: [
{
    Type: Grid,
    Name: "ThumbVisual",
    Props: {
        Name: "ThumbVisual",
        Margin: new Thickness(1, 0, 1, 0)
    },
    Children: [
{
    Type: Rectangle,
    Name: "Background",
    Props: {
        Name: "Background",
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF1F3B53")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(1, 0.5),
                StartPoint: new Point(0, 0.5)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF818F99"),
        Offset: 1
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFC2C9CE"),
        Offset: 0
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFB3BBC1"),
        Offset: 0.35
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF96A4B1"),
        Offset: 0.35
    }
}]

        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundMouseOver",
    Props: {
        Name: "BackgroundMouseOver",
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundPressed",
    Props: {
        Name: "BackgroundPressed",
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundGradient",
    Props: {
        Name: "BackgroundGradient",
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1),
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        Fill: {
            Type: LinearGradientBrush,
            Props: {
                StartPoint: new Point(0, 0.7),
                EndPoint: new Point(1, 0.7)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFFFFFFF"),
        Offset: 0
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#F9FFFFFF"),
        Offset: 0.375
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#E5FFFFFF"),
        Offset: 0.6
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#C6FFFFFF"),
        Offset: 1
    }
}]

        }
    }
},
{
    Type: Rectangle,
    Name: "Highlight",
    Props: {
        Name: "Highlight",
        RadiusX: 1,
        RadiusY: 1,
        Opacity: 0,
        IsHitTestVisible: false,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF6DBDD1")
            }
        },
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1)
    }
}]

}]

    }
},
{
    Type: ControlTemplate,
    Key: "HorizontalThumbTemplate",
    Props: {
        Key: "HorizontalThumbTemplate",
        TargetType: "Thumb"
    },
    Content: {
        Type: Grid,
        AttachedProps: [{
            Owner: VisualStateManager,
            Prop: "VisualStateGroups",
            Value: [
{
    Type: VisualStateGroup,
    Name: "CommonStates",
    Props: {
        Name: "CommonStates"
    },
    Children: [
{
    Type: VisualState,
    Name: "Normal",
    Props: {
        Name: "Normal"
    }
},
{
    Type: VisualState,
    Name: "MouseOver",
    Props: {
        Name: "MouseOver"
    },
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundMouseOver"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#7FFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#CCFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#F2FFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

}
]
}]

    }
},
{
    Type: VisualState,
    Name: "Pressed",
    Props: {
        Name: "Pressed"
    },
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundPressed"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
},
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Highlight"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(UIElement.Opacity)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#6BFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#C6FFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#EAFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#F4FFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

}
]
}]

    }
},
{
    Type: VisualState,
    Name: "Disabled",
    Props: {
        Name: "Disabled"
    },
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 0
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "ThumbVisual"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
}]

    }
}]

}]


        }
],
        Children: [
{
    Type: Grid,
    Name: "ThumbVisual",
    Props: {
        Name: "ThumbVisual",
        Margin: new Thickness(0, 1, 0, 1)
    },
    Children: [
{
    Type: Rectangle,
    Name: "Background",
    Props: {
        Name: "Background",
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF1F3B53")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(0.5, 1),
                StartPoint: new Point(0.5, 0)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF818F99"),
        Offset: 1
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFC2C9CE"),
        Offset: 0
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFB3BBC1"),
        Offset: 0.35
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF96A4B1"),
        Offset: 0.35
    }
}]

        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundMouseOver",
    Props: {
        Name: "BackgroundMouseOver",
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundPressed",
    Props: {
        Name: "BackgroundPressed",
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundGradient",
    Props: {
        Name: "BackgroundGradient",
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1),
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        Fill: {
            Type: LinearGradientBrush,
            Props: {
                StartPoint: new Point(0.7, 0),
                EndPoint: new Point(0.7, 1)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFFFFFFF"),
        Offset: 0.013
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#F9FFFFFF"),
        Offset: 0.375
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#E5FFFFFF"),
        Offset: 0.603
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#C6FFFFFF"),
        Offset: 1
    }
}]

        }
    }
},
{
    Type: Rectangle,
    Name: "Highlight",
    Props: {
        Name: "Highlight",
        RadiusX: 1,
        RadiusY: 1,
        Opacity: 0,
        IsHitTestVisible: false,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF6DBDD1")
            }
        },
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1)
    }
}]

}]

    }
}]

                },
                AttachedProps: [{
                    Owner: VisualStateManager,
                    Prop: "VisualStateGroups",
                    Value: [
{
    Type: VisualStateGroup,
    Name: "CommonStates",
    Props: {
        Name: "CommonStates"
    },
    Children: [
{
    Type: VisualState,
    Name: "Normal",
    Props: {
        Name: "Normal"
    }
},
{
    Type: VisualState,
    Name: "MouseOver",
    Props: {
        Name: "MouseOver"
    }
},
{
    Type: VisualState,
    Name: "Disabled",
    Props: {
        Name: "Disabled"
    },
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        To: 0.5,
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Root"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
}]

    }
}]

}]


                }
],
                Children: [
{
    Type: Grid,
    Name: "HorizontalRoot",
    Props: {
        Name: "HorizontalRoot",
        ColumnDefinitions: [
{
    Type: ColumnDefinition,
    Props: {
        Width: new GridLength(1, GridUnitType.Auto)
    }
},
{
    Type: ColumnDefinition,
    Props: {
        Width: new GridLength(1, GridUnitType.Auto)
    }
},
{
    Type: ColumnDefinition,
    Props: {
        Width: new GridLength(1, GridUnitType.Auto)
    }
},
{
    Type: ColumnDefinition,
    Props: {
        Width: new GridLength(1, GridUnitType.Star)
    }
},
{
    Type: ColumnDefinition,
    Props: {
        Width: new GridLength(1, GridUnitType.Auto)
    }
}]

    },
    Children: [
{
    Type: Rectangle,
    Props: {
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        },
        Fill: {
            Type: LinearGradientBrush,
            Props: {
                StartPoint: new Point(0.5, 1),
                EndPoint: new Point(0.5, 0)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFF4F6F7"),
        Offset: 0
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFF0F4F7"),
        Offset: 0.344
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFDFE3E6"),
        Offset: 1
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFE9EEF4"),
        Offset: 0.527
    }
}]

        }
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "ColumnSpan",
        Value: 5
    }
]
},
{
    Type: Rectangle,
    Props: {
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        },
        Fill: new TemplateBindingMarkup("Background")
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "ColumnSpan",
        Value: 5
    }
]
},
{
    Type: Rectangle,
    Props: {
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Opacity: 0.375,
        Stroke: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(0.5, 1),
                StartPoint: new Point(0.5, 0)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFA3AEB9"),
        Offset: 0
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF8399A9"),
        Offset: 0.375
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF718597"),
        Offset: 0.375
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF617584"),
        Offset: 1
    }
}]

        }
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "ColumnSpan",
        Value: 5
    }
]
},
{
    Type: Rectangle,
    Props: {
        RadiusX: 1,
        RadiusY: 1,
        Margin: new Thickness(1, 1, 1, 1),
        Stroke: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(0.5, 0.125),
                StartPoint: new Point(0.5, 0.875)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#33FFFFFF")
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#99FFFFFF"),
        Offset: 1
    }
}]

        }
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "ColumnSpan",
        Value: 5
    }
]
},
{
    Type: RepeatButton,
    Name: "HorizontalSmallDecrease",
    Props: {
        Name: "HorizontalSmallDecrease",
        Width: 16,
        IsTabStop: false,
        Interval: 50,
        Template: new StaticResourceMarkup("HorizontalDecrementTemplate"),
        Margin: new Thickness(1, 1, 1, 1)
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 0
    }
]
},
{
    Type: RepeatButton,
    Name: "HorizontalLargeDecrease",
    Props: {
        Name: "HorizontalLargeDecrease",
        Width: 0,
        Template: new StaticResourceMarkup("RepeatButtonTemplate"),
        Interval: 50,
        IsTabStop: false
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 1
    }
]
},
{
    Type: Thumb,
    Name: "HorizontalThumb",
    Props: {
        Name: "HorizontalThumb",
        Background: new TemplateBindingMarkup("Background"),
        MinWidth: 18,
        Width: 18,
        Template: new StaticResourceMarkup("HorizontalThumbTemplate")
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 2
    }
]
},
{
    Type: RepeatButton,
    Name: "HorizontalLargeIncrease",
    Props: {
        Name: "HorizontalLargeIncrease",
        Template: new StaticResourceMarkup("RepeatButtonTemplate"),
        Interval: 50,
        IsTabStop: false
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 3
    }
]
},
{
    Type: RepeatButton,
    Name: "HorizontalSmallIncrease",
    Props: {
        Name: "HorizontalSmallIncrease",
        Width: 16,
        IsTabStop: false,
        Interval: 50,
        Template: new StaticResourceMarkup("HorizontalIncrementTemplate"),
        Margin: new Thickness(1, 1, 1, 1)
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 4
    }
]
}]

},
{
    Type: Grid,
    Name: "VerticalRoot",
    Props: {
        Name: "VerticalRoot",
        Visibility: Visibility.Collapsed,
        RowDefinitions: [
{
    Type: RowDefinition,
    Props: {
        Height: new GridLength(1, GridUnitType.Auto)
    }
},
{
    Type: RowDefinition,
    Props: {
        Height: new GridLength(1, GridUnitType.Auto)
    }
},
{
    Type: RowDefinition,
    Props: {
        Height: new GridLength(1, GridUnitType.Auto)
    }
},
{
    Type: RowDefinition,
    Props: {
        Height: new GridLength(1, GridUnitType.Star)
    }
},
{
    Type: RowDefinition,
    Props: {
        Height: new GridLength(1, GridUnitType.Auto)
    }
}]

    },
    Children: [
{
    Type: Rectangle,
    Props: {
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        },
        Fill: {
            Type: LinearGradientBrush,
            Props: {
                StartPoint: new Point(1, 0.5),
                EndPoint: new Point(0, 0.5)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFF4F6F7"),
        Offset: 0
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFF0F4F7"),
        Offset: 0.344
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFDFE3E6"),
        Offset: 1
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFE9EEF4"),
        Offset: 0.527
    }
}]

        }
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "RowSpan",
        Value: 5
    }
]
},
{
    Type: Rectangle,
    Props: {
        RadiusX: 1,
        RadiusY: 1,
        StrokeThickness: 1,
        Opacity: 0.375,
        Stroke: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(0.5, 1),
                StartPoint: new Point(0.5, 0)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFA3AEB9"),
        Offset: 0
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF8399A9"),
        Offset: 0.375
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF718597"),
        Offset: 0.375
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF617584"),
        Offset: 1
    }
}]

        }
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "RowSpan",
        Value: 5
    }
]
},
{
    Type: Rectangle,
    Props: {
        RadiusX: 1,
        RadiusY: 1,
        Margin: new Thickness(1, 1, 1, 1),
        Stroke: {
            Type: LinearGradientBrush,
            Props: {
                EndPoint: new Point(0.125, 0.5),
                StartPoint: new Point(0.875, 0.5)
            },
            Children: [
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#33FFFFFF")
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#99FFFFFF"),
        Offset: 1
    }
}]

        }
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "RowSpan",
        Value: 5
    }
]
},
{
    Type: RepeatButton,
    Name: "VerticalSmallDecrease",
    Props: {
        Name: "VerticalSmallDecrease",
        Height: 16,
        IsTabStop: false,
        Interval: 50,
        Template: new StaticResourceMarkup("VerticalDecrementTemplate"),
        Margin: new Thickness(1, 1, 1, 1)
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Row",
        Value: 0
    }
]
},
{
    Type: RepeatButton,
    Name: "VerticalLargeDecrease",
    Props: {
        Name: "VerticalLargeDecrease",
        Height: 0,
        Template: new StaticResourceMarkup("RepeatButtonTemplate"),
        Interval: 50,
        IsTabStop: false
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Row",
        Value: 1
    }
]
},
{
    Type: Thumb,
    Name: "VerticalThumb",
    Props: {
        Name: "VerticalThumb",
        MinHeight: 18,
        Height: 18,
        Template: new StaticResourceMarkup("VerticalThumbTemplate")
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Row",
        Value: 2
    }
]
},
{
    Type: RepeatButton,
    Name: "VerticalLargeIncrease",
    Props: {
        Name: "VerticalLargeIncrease",
        Template: new StaticResourceMarkup("RepeatButtonTemplate"),
        Interval: 50,
        IsTabStop: false
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Row",
        Value: 3
    }
]
},
{
    Type: RepeatButton,
    Name: "VerticalSmallIncrease",
    Props: {
        Name: "VerticalSmallIncrease",
        Height: 16,
        IsTabStop: false,
        Interval: 50,
        Template: new StaticResourceMarkup("VerticalIncrementTemplate"),
        Margin: new Thickness(1, 1, 1, 1)
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Row",
        Value: 4
    }
]
}]

}]

            }
        }
    }
}]

    };
    var parser = new JsonParser();
    return parser.CreateObject(styleJson, new NameScope());
};

Nullstone.FinishCreate(ScrollBar);
//#endregion