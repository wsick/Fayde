/// <reference path="../Control.js"/>
/// CODE
/// <reference path="DragStartedEventArgs.js"/>
/// <reference path="DragDeltaEventArgs.js"/>
/// <reference path="DragCompletedEventArgs.js"/>

//#region Thumb
var Thumb = Nullstone.Create("Thumb", Control);

Thumb.Instance.Init = function () {
    this.Init$Control();
    this.DragCompleted = new MulticastEvent();
    this.DragDelta = new MulticastEvent();
    this.DragStarted = new MulticastEvent();
};

//#region Dependency Properties

Thumb.IsDraggingProperty = DependencyProperty.RegisterReadOnly("IsDragging", function () { return Boolean; }, Thumb, false, function (d, args) { d.OnDraggingChanged(args); });
Thumb.IsFocusedProperty = DependencyProperty.RegisterReadOnly("IsFocused", function () { return Boolean; }, Thumb);

Nullstone.AutoPropertiesReadOnly(Thumb, [
    Thumb.IsDraggingProperty,
    Thumb.IsFocusedProperty
]);

//#endregion

Thumb.Instance.CancelDrag = function () {
    if (this.IsDragging) {
        this.$SetValueInternal(Thumb.IsDraggingProperty, false);
        this._RaiseDragCompleted(true);
    }
};

Thumb.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$Control();
    this.UpdateVisualState(false);
};

Thumb.Instance._FocusChanged = function (hasFocus) {
    this.$SetValueInternal(Thumb.IsFocusedProperty, hasFocus);
    this.UpdateVisualState();
};

Thumb.Instance.OnDraggingChanged = function (args) {
    this.UpdateVisualState();
};
Thumb.Instance.OnIsEnabledChanged = function (args) {
    this.OnIsEnabledChanged$Control(args);
    if (!this.IsEnabled)
        this._IsMouseOver = false;
    this.UpdateVisualState();
};

//#region Focus

Thumb.Instance.OnGotFocus = function (sender, args) {
    this.OnGotFocus$Control(sender, args);
    this._FocusChanged(this._HasFocus());
};
Thumb.Instance.OnLostFocus = function (sender, args) {
    this.OnLostFocus$Control(sender, args);
    this._FocusChanged(this._HasFocus());
};

//#endregion

//#region Mouse

Thumb.Instance.OnLostMouseCapture = function (sender, args) {
    this.OnLostMouseCapture$Control(sender, args);
    this._RaiseDragCompleted(false);
    this.$SetValueInternal(Thumb.IsDraggingProperty, false);
};
Thumb.Instance.OnMouseEnter = function (sender, args) {
    this.OnMouseEnter$Control(sender, args);
    if (this.IsEnabled) {
        this._IsMouseOver = true;
        this.UpdateVisualState();
    }
};
Thumb.Instance.OnMouseLeave = function (sender, args) {
    this.OnMouseLeave$Control(sender, args);
    if (this.IsEnabled) {
        this._IsMouseOver = false;
        this.UpdateVisualState();
    }
};
Thumb.Instance.OnMouseLeftButtonDown = function (sender, args) {
    this.OnMouseLeftButtonDown$Control(sender, args);
    if (args.Handled)
        return;
    if (!this.IsDragging && this.IsEnabled) {
        args.Handled = true;
        this.CaptureMouse();
        this.$SetValueInternal(Thumb.IsDraggingProperty, true);

        this._Origin = this._PreviousPosition = args.GetPosition(this._GetLogicalParent());
        var success = false;
        try {
            this._RaiseDragStarted();
            success = true;
        } finally {
            if (!success)
                this.CancelDrag();
        }
    }
};
Thumb.Instance.OnMouseMove = function (sender, args) {
    /// <param name="args" type="MouseEventArgs"></param>
    this.OnMouseMove$Control(sender, args);
    if (!this.IsDragging)
        return;
    var p = args.GetPosition(this._GetLogicalParent());
    if (!Point.Equals(p, this._PreviousPosition)) {
        this._RaiseDragDelta(p.X - this._PreviousPosition.X, p.Y - this._PreviousPosition.Y);
        this._PreviousPosition = p;
    }
};

//#endregion

Thumb.Instance.UpdateVisualState = function (useTransitions) {
    if (useTransitions === undefined) useTransitions = true;
    if (!this.IsEnabled) {
        this._GoToState(useTransitions, "Disabled");
    } else if (this.IsDragging) {
        this._GoToState(useTransitions, "Pressed");
    } else if (this._IsMouseOver) {
        this._GoToState(useTransitions, "MouseOver");
    } else {
        this._GoToState(useTransitions, "Normal");
    }

    if (this.IsFocused && this.IsEnabled)
        this._GoToState(useTransitions, "Focused");
    else
        this._GoToState(useTransitions, "Unfocused");
};

Thumb.Instance._RaiseDragStarted = function () {
    this.DragStarted.Raise(this, new DragStartedEventArgs(this._Origin.X, this._Origin.Y));
};
Thumb.Instance._RaiseDragDelta = function (x, y) {
    this.DragDelta.Raise(this, new DragDeltaEventArgs(x, y));
};
Thumb.Instance._RaiseDragCompleted = function (canceled) {
    this.DragCompleted.Raise(this, new DragCompletedEventArgs(this._PreviousPosition.X - this._Origin.X, this._PreviousPosition.Y - this._Origin.Y, canceled));
};

Thumb.Instance.GetDefaultStyle = function () {
    var styleJson = {
        Type: Style,
        Props: {
            TargetType: Thumb
        },
        Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(Thumb, "Background"),
        Value: "#FF1F3B53"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(Thumb, "BorderThickness"),
        Value: "1"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(Thumb, "IsTabStop"),
        Value: "False"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(Thumb, "BorderBrush"),
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
        Property: DependencyProperty.GetDependencyProperty(Thumb, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: Thumb
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
    Children: [
{
    Type: VisualState,
    Name: "Normal"
},
{
    Type: VisualState,
    Name: "MouseOver",
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
        To: Color.FromHex("#F2FFFFFF")
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
        To: Color.FromHex("#CCFFFFFF")
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
        To: Color.FromHex("#7FFFFFFF")
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
}]

    }
},
{
    Type: VisualState,
    Name: "Pressed",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#FF6DBDD1")
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
        To: Color.FromHex("#D8FFFFFF")
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
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#C6FFFFFF")
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
        To: Color.FromHex("#8CFFFFFF")
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
        To: Color.FromHex("#3FFFFFFF")
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
}]

    }
},
{
    Type: VisualState,
    Name: "Disabled",
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
    Children: [
{
    Type: VisualState,
    Name: "Focused",
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
    Name: "Unfocused"
}]

}]


                }
],
                Children: [
{
    Type: Border,
    Name: "Background",
    Props: {
        CornerRadius: new CornerRadius(2, 2, 2, 2),
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
    Type: Rectangle,
    Name: "DisabledVisualElement",
    Props: {
        RadiusX: 2,
        RadiusY: 2,
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
        RadiusX: 1,
        RadiusY: 1,
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
    return JsonParser.Parse(styleJson);
};

Nullstone.FinishCreate(Thumb);
//#endregion