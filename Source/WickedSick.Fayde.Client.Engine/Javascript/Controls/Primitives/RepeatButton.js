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

RepeatButton.Instance.GetDefaultStyle = function () {
    var styleJson = {
        Type: Style,
        Props: {
            TargetType: RepeatButton
        },
        Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "Background"),
        Value: "#FF1F3B53"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "Foreground"),
        Value: "#FF000000"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "Padding"),
        Value: "3"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "BorderThickness"),
        Value: "1"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "BorderBrush"),
        Value: {
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
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: "RepeatButton"
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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

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
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#FF6DBDD1"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "Background"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Border.Background).(SolidColorBrush.Color)")

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
        To: "#D8FFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#8CFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: "#3FFFFFFF"
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

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
        To: 0.55
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "DisabledVisualElement"
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

},
{
    Type: VisualStateGroup,
    Name: "FocusStates",
    Props: {
        Name: "FocusStates"
    },
    Children: [
{
    Type: VisualState,
    Name: "Focused",
    Props: {
        Name: "Focused"
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
        Value: "FocusVisualElement"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Opacity")

}
]
}]

    }
},
{
    Type: VisualState,
    Name: "Unfocused",
    Props: {
        Name: "Unfocused"
    }
}]

}]


                }
],
                Children: [
{
    Type: Border,
    Name: "Background",
    Props: {
        Name: "Background",
        CornerRadius: new CornerRadius(3, 3, 3, 3),
        Background: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
        BorderBrush: new TemplateBindingMarkup("BorderBrush")
    },
    Content: {
        Type: Grid,
        Props: {
            Background: new TemplateBindingMarkup("Background"),
            Margin: new Thickness(1, 1, 1, 1)
        },
        Children: [
{
    Type: Border,
    Name: "BackgroundAnimation",
    Props: {
        Opacity: 0,
        Name: "BackgroundAnimation",
        Background: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "BackgroundGradient",
    Props: {
        Name: "BackgroundGradient",
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
        Offset: 0.625
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
}]

    }
},
{
    Type: ContentPresenter,
    Name: "contentPresenter",
    Props: {
        Name: "contentPresenter",
        ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
        VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment"),
        HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
        Margin: new TemplateBindingMarkup("Padding")
    },
    Content: new TemplateBindingMarkup("Content")
},
{
    Type: Rectangle,
    Name: "DisabledVisualElement",
    Props: {
        Name: "DisabledVisualElement",
        RadiusX: 3,
        RadiusY: 3,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        Opacity: 0,
        IsHitTestVisible: false
    }
},
{
    Type: Rectangle,
    Name: "FocusVisualElement",
    Props: {
        Name: "FocusVisualElement",
        RadiusX: 2,
        RadiusY: 2,
        Margin: new Thickness(1, 1, 1, 1),
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF6DBDD1")
            }
        },
        StrokeThickness: 1,
        Opacity: 0,
        IsHitTestVisible: false
    }
}]

            }
        }
    }
}]

    };
    var parser = new JsonParser();
    return parser.CreateObject(styleJson, new NameScope());
};

Nullstone.FinishCreate(RepeatButton);
//#endregion