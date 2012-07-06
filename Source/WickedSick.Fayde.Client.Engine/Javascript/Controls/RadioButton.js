/// <reference path="Primitives/ToggleButton.js"/>
/// CODE

//#region RadioButton
var RadioButton = Nullstone.Create("RadioButton", ToggleButton);

RadioButton.Instance.Init = function () {
    this.Init$ToggleButton();
    RadioButton.Register("", this);
};

//#region Dependency Properties

RadioButton.GroupNameProperty = DependencyProperty.RegisterReadOnly("GroupName", function () { return RadioButton; }, RadioButton, false, function (d, args) { d.OnGroupNameChanged(args); });

Nullstone.AutoProperties(RadioButton, [
    RadioButton.GroupNameProperty
]);

//#endregion

RadioButton.Instance.OnGroupNameChanged = function (e) {
    RadioButton.Unregister(e.OldValue, this);
    RadioButton.Register(e.NewValue, this);
};

RadioButton._GroupNameToElements = [];

RadioButton.Register = function(groupName, radioButton) {
    // Treat null as being string.Empty
    if (!groupName) groupName = "";

    var list = RadioButton._GroupNameToElements[groupName];
    if (!list) {
        list = [];
        RadioButton._GroupNameToElements[groupName] = list;
    }
    list.push(radioButton);
};
 
RadioButton.Unregister = function (groupName, radioButton) {
    // Treat null as being string.Empty
    if (!groupName) groupName = "";

    var list = RadioButton._GroupNameToElements[groupName];
    if (list) {
        for (var i = 0; i < list.length; i++) {
            if (Nullstone.RefEquals(radioButton, list[i])) {
                list.splice(i, 1);
                break;
            }
        }
    }
};

RadioButton.Instance.OnIsCheckedChanged = function (e) {
    if (e.NewValue === true) {
        this.UpdateRadioButtonGroup();
    }
    this.OnIsCheckedChanged$ToggleButton(e);
};

RadioButton.Instance.OnToggle = function () {
    this.IsChecked = true;
};

RadioButton.Instance.UpdateRadioButtonGroup = function () {
    var groupName = this.GroupName;
    if (!groupName) groupName = "";

    //if this RadioButton has been assigned a group
    if (groupName) {
        var visualRoot = this.GetVisualRoot();
        var elements = RadioButton._GroupNameToElements[groupName];
        if (elements) {
            for (var i = 0; i < elements.length; i++) {
                if (!Nullstone.RefEquals(elements[i], this) &&
                elements[i].IsChecked &&
                Nullstone.RefEquals(visualRoot, elements[i].GetVisualRoot())) {
                    elements[i].IsChecked = false;
                }
            }
        }
    } else {
        //no group has been assigned
        //it is automatically groups with all RadioButtons with no group and with the same visual root
        var elements = RadioButton._GroupNameToElements[groupName];
        var visualParent = this.GetVisualParent();
        if (elements) {
            for (var i = 0; i < elements.length; i++) {
                if (!Nullstone.RefEquals(elements[i], this) &&
                elements[i].IsChecked &&
                Nullstone.RefEquals(visualParent, elements[i].GetVisualParent())) {
                    elements[i].IsChecked = false;
                }
            }
        }
    }
};

RadioButton.Instance.GetDefaultStyle = function () {
    var styleJson = {
        Type: Style,
        Props: {
            TargetType: RadioButton
        },
        Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RadioButton, "Background"),
        Value: "#FF448DCA"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RadioButton, "Foreground"),
        Value: "#FF000000"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RadioButton, "HorizontalContentAlignment"),
        Value: "Left"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RadioButton, "VerticalContentAlignment"),
        Value: "Top"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RadioButton, "Padding"),
        Value: "4,1,0,0"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RadioButton, "BorderThickness"),
        Value: "1"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RadioButton, "BorderBrush"),
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
        Property: DependencyProperty.GetDependencyProperty(RadioButton, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: RadioButton
            },
            Content: {
                Type: Grid,
                Props: {
                    ColumnDefinitions: [
{
    Type: ColumnDefinition,
    Props: {
        Width: new GridLength(16, GridUnitType.Pixel)
    }
},
{
    Type: ColumnDefinition,
    Props: {
        Width: new GridLength(1, GridUnitType.Star)
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
        Value: "BackgroundOverlay"
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
        Value: "BoxMiddleBackground"
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
        To: Color.FromHex("#7FFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddle"
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
        To: Color.FromHex("#CCFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddle"
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
        To: Color.FromHex("#F2FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddle"
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
        Value: "BackgroundOverlay"
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
        Value: "BoxMiddleBackground"
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
        To: Color.FromHex("#6BFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddle"
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
        To: Color.FromHex("#C6FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddle"
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
        To: Color.FromHex("#EAFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddle"
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
        To: Color.FromHex("#F4FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddle"
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
        To: Color.FromHex("#FF6DBDD1")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddle"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Stroke).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#FF6DBDD1")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddle"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Stroke).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#FF6DBDD1")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddle"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Stroke).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

}
]
},
{
    Type: ColorAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: Color.FromHex("#FF6DBDD1")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BoxMiddle"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Stroke).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

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
        Value: "contentPresenter"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(UIElement.Opacity)")

}
]
},
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
    Value: new _PropertyPath("(UIElement.Opacity)")

}
]
}]

    }
}]

},
{
    Type: VisualStateGroup,
    Name: "CheckStates",
    Children: [
{
    Type: VisualState,
    Name: "Checked",
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
        Value: "CheckIcon"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(UIElement.Opacity)")

}
]
}]

    }
},
{
    Type: VisualState,
    Name: "Unchecked"
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
        Value: "ContentFocusVisualElement"
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

},
{
    Type: VisualStateGroup,
    Name: "ValidationStates",
    Children: [
{
    Type: VisualState,
    Name: "Valid"
},
{
    Type: VisualState,
    Name: "InvalidUnfocused",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: ObjectAnimationUsingKeyFrames,
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "ValidationErrorElement"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Visibility")

}
],
    Children: [
{
    Type: DiscreteObjectKeyFrame,
    Props: {
        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
        Value: Visibility.Visible
    }
}]

}]

    }
},
{
    Type: VisualState,
    Name: "InvalidFocused",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: ObjectAnimationUsingKeyFrames,
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "ValidationErrorElement"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("Visibility")

}
],
    Children: [
{
    Type: DiscreteObjectKeyFrame,
    Props: {
        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
        Value: Visibility.Visible
    }
}]

},
{
    Type: ObjectAnimationUsingKeyFrames,
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "validationTooltip"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("IsOpen")

}
],
    Children: [
{
    Type: DiscreteObjectKeyFrame,
    Props: {
        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
        Value:
                          true

    }
}]

}]

    }
}]

}]


                }
],
                Children: [
{
    Type: Grid,
    Props: {
        HorizontalAlignment: HorizontalAlignment.Left,
        VerticalAlignment: VerticalAlignment.Top
    },
    Children: [
{
    Type: Ellipse,
    Name: "Background",
    Props: {
        Width: 14,
        Height: 14,
        Stroke: new TemplateBindingMarkup("BorderBrush"),
        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        Margin: new Thickness(1, 1, 1, 1)
    }
},
{
    Type: Ellipse,
    Name: "BackgroundOverlay",
    Props: {
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFC4DBEE")
            }
        },
        Opacity: 0,
        Width: 14,
        Height: 14,
        StrokeThickness: 1,
        Margin: new Thickness(1, 1, 1, 1),
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        }
    }
},
{
    Type: Ellipse,
    Name: "BoxMiddleBackground",
    Props: {
        Width: 10,
        Height: 10,
        Fill: new TemplateBindingMarkup("Background"),
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00000000")
            }
        },
        StrokeThickness: 1
    }
},
{
    Type: Ellipse,
    Name: "BoxMiddle",
    Props: {
        Width: 10,
        Height: 10,
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
        Color: Color.FromHex("#FFFFFFFF"),
        Offset: 1
    }
},
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
        Color: Color.FromHex("#FFFFFFFF"),
        Offset: 0.375
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFFFFFFF"),
        Offset: 0.375
    }
}]

        },
        Fill: {
            Type: LinearGradientBrush,
            Props: {
                StartPoint: new Point(0.62, 0.15),
                EndPoint: new Point(0.64, 0.88)
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
        Color: Color.FromHex("#EAFFFFFF"),
        Offset: 0.603
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#D8FFFFFF"),
        Offset: 1
    }
}]

        }
    }
},
{
    Type: Ellipse,
    Name: "BoxMiddleLine",
    Props: {
        Width: 10,
        Height: 10,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF333333")
            }
        },
        StrokeThickness: 1,
        Opacity: 0.2
    }
},
{
    Type: Ellipse,
    Name: "CheckIcon",
    Props: {
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF333333")
            }
        },
        Width: 4,
        Height: 4,
        Opacity: 0
    }
},
{
    Type: Ellipse,
    Name: "DisabledVisualElement",
    Props: {
        Width: 14,
        Height: 14,
        Opacity: 0,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        }
    }
},
{
    Type: Ellipse,
    Name: "ContentFocusVisualElement",
    Props: {
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF6DBDD1")
            }
        },
        StrokeThickness: 1,
        Opacity: 0,
        IsHitTestVisible: false,
        Width: 16,
        Height: 16
    }
},
{
    Type: Grid,
    Name: "ValidationErrorElement",
    Props: {
        Visibility: Visibility.Collapsed
    },
    Children: [
{
    Type: Ellipse,
    Props: {
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFDB000C")
            }
        },
        StrokeThickness: 1,
        Width: 14,
        Height: 14
    }
},
{
    Type: Ellipse,
    Props: {
        HorizontalAlignment: HorizontalAlignment.Right,
        VerticalAlignment: VerticalAlignment.Top,
        Margin: new Thickness(0, -2, -1, 0),
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFDB000C")
            }
        },
        Width: 4,
        Height: 4
    }
},
{
    Type: Ellipse,
    Props: {
        HorizontalAlignment: HorizontalAlignment.Right,
        VerticalAlignment: VerticalAlignment.Top,
        Margin: new Thickness(0, -5, -4, 0),
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00FFFFFF")
            }
        },
        Width: 10,
        Height: 10
    }
}]

}]

},
{
    Type: ContentPresenter,
    Name: "contentPresenter",
    Props: {
        ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
        HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
        VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment"),
        Margin: new TemplateBindingMarkup("Padding")
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 1
    }
],
    Content: new TemplateBindingMarkup("Content")
}]

            }
        }
    }
}]

    };
    return JsonParser.Parse(styleJson);
};

Nullstone.FinishCreate(RadioButton);
//#endregion