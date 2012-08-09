/// <reference path="Fayde.js"/>

App.GetGenericXaml = function () {
    var json = {
        Type: ResourceDictionary,
        Children: [
{
    Type: Style,
    Props: {
        TargetType: Button
    },
    Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(Button, "Background"),
        Value: "#FF1F3B53"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(Button, "Foreground"),
        Value: "#FF000000"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(Button, "Padding"),
        Value: "3"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(Button, "BorderThickness"),
        Value: "1"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(Button, "BorderBrush"),
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
        Property: DependencyProperty.GetDependencyProperty(Button, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: Button
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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

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
    Type: ContentPresenter,
    Name: "contentPresenter",
    Props: {
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

},
{
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
                TargetType: RepeatButton
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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

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
    Type: ContentPresenter,
    Name: "contentPresenter",
    Props: {
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

},
{
    Type: Style,
    Props: {
        TargetType: ToggleButton
    },
    Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Background"),
        Value: "#FF1F3B53"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Foreground"),
        Value: "#FF000000"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Padding"),
        Value: "3"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "BorderThickness"),
        Value: "1"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "BorderBrush"),
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
        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: ToggleButton
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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

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
    Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

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
    Name: "CheckStates",
    Children: [
{
    Type: VisualState,
    Name: "Checked",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: PointAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: new Point(0.7, 1)
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Rectangle.Fill).(LinearGradientBrush.StartPoint)")

}
]
},
{
    Type: PointAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: new Point(0.7, 0)
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Rectangle.Fill).(LinearGradientBrush.EndPoint)")

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
    Type: ContentPresenter,
    Name: "contentPresenter",
    Props: {
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

},
{
    Type: Style,
    Props: {
        TargetType: HyperlinkButton
    },
    Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "Foreground"),
        Value: "#FF73A9D8"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "Padding"),
        Value: "2,0,2,0"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "Cursor"),
        Value: "Hand"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "HorizontalContentAlignment"),
        Value: "Left"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "VerticalContentAlignment"),
        Value: "Top"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "Background"),
        Value: "Transparent"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: HyperlinkButton
            },
            Content: {
                Type: Grid,
                Props: {
                    Cursor: new TemplateBindingMarkup("Cursor"),
                    Background: new TemplateBindingMarkup("Background")
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
    Type: ObjectAnimationUsingKeyFrames,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "UnderlineTextBlock"
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
    Name: "Pressed",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: ObjectAnimationUsingKeyFrames,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "UnderlineTextBlock"
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
    Name: "Disabled",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: ObjectAnimationUsingKeyFrames,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "DisabledOverlay"
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
    Type: TextBlock,
    Name: "UnderlineTextBlock",
    Props: {
        HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
        VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment"),
        Margin: new TemplateBindingMarkup("Padding"),
        TextDecorations: TextDecorations.Underline,
        Visibility: Visibility.Collapsed
    },
    Content: new TemplateBindingMarkup("Content")
},
{
    Type: TextBlock,
    Name: "DisabledOverlay",
    Props: {
        Foreground: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFAAAAAA")
            }
        },
        HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
        VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment"),
        Margin: new TemplateBindingMarkup("Padding"),
        Visibility: Visibility.Collapsed
    },
    AttachedProps: [{
        Owner: Canvas,
        Prop: "ZIndex",
        Value: 1
    }
],
    Content: new TemplateBindingMarkup("Content")
},
{
    Type: ContentPresenter,
    Name: "contentPresenter",
    Props: {
        ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
        VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment"),
        HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
        Margin: new TemplateBindingMarkup("Padding")
    },
    Content: new TemplateBindingMarkup("Content")
},
{
    Type: Rectangle,
    Name: "FocusVisualElement",
    Props: {
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

},
{
    Type: Style,
    Props: {
        TargetType: CheckBox
    },
    Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(CheckBox, "Background"),
        Value: "#FF448DCA"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(CheckBox, "Foreground"),
        Value: "#FF000000"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(CheckBox, "HorizontalContentAlignment"),
        Value: "Left"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(CheckBox, "VerticalContentAlignment"),
        Value: "Top"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(CheckBox, "Padding"),
        Value: "4,1,0,0"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(CheckBox, "BorderThickness"),
        Value: "1"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(CheckBox, "BorderBrush"),
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
        Property: DependencyProperty.GetDependencyProperty(CheckBox, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: CheckBox
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
},
{
    Type: VisualState,
    Name: "Indeterminate",
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
        Value: "IndeterminateIcon"
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
    Type: Rectangle,
    Name: "Background",
    Props: {
        Width: 14,
        Height: 14,
        RadiusX: 1,
        RadiusY: 1,
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
    Type: Rectangle,
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
        RadiusX: 1,
        RadiusY: 1,
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
    Type: Rectangle,
    Name: "BoxMiddleBackground",
    Props: {
        Width: 10,
        Height: 10,
        RadiusX: 1,
        RadiusY: 1,
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
    Type: Rectangle,
    Name: "BoxMiddle",
    Props: {
        Width: 10,
        Height: 10,
        RadiusX: 1,
        RadiusY: 1,
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
    Type: Rectangle,
    Name: "BoxMiddleLine",
    Props: {
        Width: 10,
        Height: 10,
        RadiusX: 1,
        RadiusY: 1,
        Stroke: new TemplateBindingMarkup("BorderBrush"),
        StrokeThickness: 1,
        Opacity: 0.2
    }
},
{
    Type: Path,
    Name: "CheckIcon",
    Props: {
        Margin: new Thickness(1, 1, 0, 1.5),
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF333333")
            }
        },
        Stretch: Stretch.Fill,
        Opacity: 0,
        Width: 10.5,
        Height: 10,
        Data: "M102.03442,598.79645 L105.22962,597.78918 L106.78825,600.42358 C106.78825,600.42358 108.51028,595.74304 110.21724,593.60419 C112.00967,591.35822 114.89314,591.42316 114.89314,591.42316 C114.89314,591.42316 112.67844,593.42645 111.93174,594.44464 C110.7449,596.06293 107.15683,604.13837 107.15683,604.13837 z",
        FlowDirection: FlowDirection.LeftToRight
    }
},
{
    Type: Rectangle,
    Name: "IndeterminateIcon",
    Props: {
        Height: 2,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF333333")
            }
        },
        Opacity: 0,
        Width: 6
    }
},
{
    Type: Rectangle,
    Name: "DisabledVisualElement",
    Props: {
        RadiusX: 1,
        RadiusY: 1,
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
    Type: Rectangle,
    Name: "ContentFocusVisualElement",
    Props: {
        RadiusX: 2,
        RadiusY: 2,
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

},
{
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

},
{
    Type: Style,
    Props: {
        TargetType: ContentControl
    },
    Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ContentControl, "Foreground"),
        Value: "#FF000000"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ContentControl, "HorizontalContentAlignment"),
        Value: "Left"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ContentControl, "VerticalContentAlignment"),
        Value: "Top"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ContentControl, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: ContentControl
            },
            Content: {
                Type: ContentPresenter,
                Props: {
                    ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
                    Cursor: new TemplateBindingMarkup("Cursor"),
                    Margin: new TemplateBindingMarkup("Padding"),
                    HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                    VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment")
                },
                Content: new TemplateBindingMarkup("Content")
            }
        }
    }
}]

},
{
    Type: Style,
    Props: {
        TargetType: ContentPresenter
    },
    Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ContentPresenter, "HorizontalAlignment"),
        Value: "Left"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ContentPresenter, "VerticalAlignment"),
        Value: "Top"
    }
}]

},
{
    Type: Style,
    Props: {
        TargetType: ListBox
    },
    Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ListBox, "Padding"),
        Value: "1"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ListBox, "Background"),
        Value: "#FFFFFFFF"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ListBox, "Foreground"),
        Value: "#FF000000"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ListBox, "HorizontalContentAlignment"),
        Value: "Left"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ListBox, "VerticalContentAlignment"),
        Value: "Top"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ListBox, "IsTabStop"),
        Value: "False"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ListBox, "BorderThickness"),
        Value: "1"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ListBox, "TabNavigation"),
        Value: "Once"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ListBox, "ScrollViewer.HorizontalScrollBarVisibility"),
        Value: "Auto"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ListBox, "ScrollViewer.VerticalScrollBarVisibility"),
        Value: "Auto"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ListBox, "BorderBrush"),
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
        Property: DependencyProperty.GetDependencyProperty(ListBox, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: ListBox
            },
            Content: {
                Type: Grid,
                Children: [
{
    Type: Border,
    Props: {
        CornerRadius: new CornerRadius(2, 2, 2, 2),
        BorderBrush: new TemplateBindingMarkup("BorderBrush"),
        BorderThickness: new TemplateBindingMarkup("BorderThickness")
    },
    Content: {
        Type: ScrollViewer,
        Name: "ScrollViewer",
        Props: {
            Padding: new TemplateBindingMarkup("Padding"),
            Background: new TemplateBindingMarkup("Background"),
            BorderBrush: {
                Type: SolidColorBrush,
                Props: {
                    Color: Color.FromHex("#00FFFFFF")
                }
            },
            BorderThickness: new Thickness(0, 0, 0, 0),
            TabNavigation: new TemplateBindingMarkup("TabNavigation")
        },
        Content: {
            Type: ItemsPresenter
        }
    }
}]

            }
        }
    }
}]

},
{
    Type: Style,
    Props: {
        TargetType: ListBoxItem
    },
    Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ListBoxItem, "Padding"),
        Value: "3"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ListBoxItem, "HorizontalContentAlignment"),
        Value: "Left"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ListBoxItem, "VerticalContentAlignment"),
        Value: "Top"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ListBoxItem, "Background"),
        Value: "Transparent"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ListBoxItem, "BorderThickness"),
        Value: "1"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ListBoxItem, "TabNavigation"),
        Value: "Local"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ListBoxItem, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: ListBoxItem
            },
            Content: {
                Type: Grid,
                Props: {
                    Background: new TemplateBindingMarkup("Background")
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
        To: 0.35
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "fillColor"
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
    Value: new _PropertyPath("Opacity")

}
]
}]

    }
}]

},
{
    Type: VisualStateGroup,
    Name: "SelectionStates",
    Children: [
{
    Type: VisualState,
    Name: "Unselected"
},
{
    Type: VisualState,
    Name: "Selected",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 0.75
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "fillColor2"
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
    Type: ObjectAnimationUsingKeyFrames,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "FocusVisualElement"
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
    Name: "Unfocused"
}]

}]


                }
],
                Children: [
{
    Type: Rectangle,
    Name: "fillColor",
    Props: {
        Opacity: 0,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFBADDE9")
            }
        },
        IsHitTestVisible: false,
        RadiusX: 1,
        RadiusY: 1
    }
},
{
    Type: Rectangle,
    Name: "fillColor2",
    Props: {
        Opacity: 0,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFBADDE9")
            }
        },
        IsHitTestVisible: false,
        RadiusX: 1,
        RadiusY: 1
    }
},
{
    Type: ContentPresenter,
    Name: "contentPresenter",
    Props: {
        ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
        HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
        Margin: new TemplateBindingMarkup("Padding")
    },
    Content: new TemplateBindingMarkup("Content")
},
{
    Type: Rectangle,
    Name: "FocusVisualElement",
    Props: {
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF6DBDD1")
            }
        },
        StrokeThickness: 1,
        Visibility: Visibility.Collapsed,
        RadiusX: 1,
        RadiusY: 1
    }
}]

            }
        }
    }
}]

},
{
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

},
{
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
                TargetType: ScrollBar
            },
            Content: {
                Type: Grid,
                Name: "Root",
                Props: {
                    Resources: [
{
    Type: ControlTemplate,
    Key: "RepeatButtonTemplate",
    Props: {
        TargetType: RepeatButton
    },
    Content: {
        Type: Grid,
        Name: "Root",
        Props: {
            Background: {
                Type: SolidColorBrush,
                Props: {
                    Color: Color.FromHex("#00FFFFFF")
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
    Children: [
{
    Type: VisualState,
    Name: "Normal"
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
        TargetType: RepeatButton
    },
    Content: {
        Type: Grid,
        Name: "Root",
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
        To: Color.FromHex("#6BFFFFFF")
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
        To: Color.FromHex("#F4FFFFFF")
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
                Color: Color.FromHex("#FF333333")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "DisabledElement",
    Props: {
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
        TargetType: RepeatButton
    },
    Content: {
        Type: Grid,
        Name: "Root",
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
        To: Color.FromHex("#6BFFFFFF")
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
        To: Color.FromHex("#F4FFFFFF")
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
                Color: Color.FromHex("#FF333333")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "DisabledElement",
    Props: {
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
        TargetType: RepeatButton
    },
    Content: {
        Type: Grid,
        Name: "Root",
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
        To: Color.FromHex("#6BFFFFFF")
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
        To: Color.FromHex("#F4FFFFFF")
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
                Color: Color.FromHex("#FF333333")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "DisabledElement",
    Props: {
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
        TargetType: RepeatButton
    },
    Content: {
        Type: Grid,
        Name: "Root",
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
        To: Color.FromHex("#6BFFFFFF")
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
        To: Color.FromHex("#F4FFFFFF")
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
                Color: Color.FromHex("#FF333333")
            }
        }
    }
},
{
    Type: Rectangle,
    Name: "DisabledElement",
    Props: {
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
        To: Color.FromHex("#6BFFFFFF")
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
        To: Color.FromHex("#F4FFFFFF")
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
        Margin: new Thickness(1, 0, 1, 0)
    },
    Children: [
{
    Type: Rectangle,
    Name: "Background",
    Props: {
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
        To: Color.FromHex("#6BFFFFFF")
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
        To: Color.FromHex("#F4FFFFFF")
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
        Margin: new Thickness(0, 1, 0, 1)
    },
    Children: [
{
    Type: Rectangle,
    Name: "Background",
    Props: {
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
    Children: [
{
    Type: VisualState,
    Name: "Normal"
},
{
    Type: VisualState,
    Name: "MouseOver"
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

},
{
    Type: Style,
    Props: {
        TargetType: ScrollViewer
    },
    Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "HorizontalContentAlignment"),
        Value: "Left"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "VerticalContentAlignment"),
        Value: "Top"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "VerticalScrollBarVisibility"),
        Value: "Visible"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "Padding"),
        Value: "4"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "BorderThickness"),
        Value: "1"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "BorderBrush"),
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
        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: ScrollViewer
            },
            Content: {
                Type: Border,
                Props: {
                    CornerRadius: new CornerRadius(2, 2, 2, 2),
                    BorderBrush: new TemplateBindingMarkup("BorderBrush"),
                    BorderThickness: new TemplateBindingMarkup("BorderThickness")
                },
                Content: {
                    Type: Grid,
                    Props: {
                        Background: new TemplateBindingMarkup("Background"),
                        RowDefinitions: [
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
,
                        ColumnDefinitions: [
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
    Type: ScrollContentPresenter,
    Name: "ScrollContentPresenter",
    Props: {
        Cursor: new TemplateBindingMarkup("Cursor"),
        Margin: new TemplateBindingMarkup("Padding"),
        ContentTemplate: new TemplateBindingMarkup("ContentTemplate")
    }
},
{
    Type: Rectangle,
    Props: {
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFE9EEF4")
            }
        }
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 1
    },
{
    Owner: Grid,
    Prop: "Row",
    Value: 1
}
]
},
{
    Type: ScrollBar,
    Name: "VerticalScrollBar",
    Props: {
        Width: 18,
        IsTabStop: false,
        Visibility: new TemplateBindingMarkup("ComputedVerticalScrollBarVisibility"),
        Orientation: Orientation.Vertical,
        ViewportSize: new TemplateBindingMarkup("ViewportHeight"),
        Maximum: new TemplateBindingMarkup("ScrollableHeight"),
        Minimum: 0,
        Value: new TemplateBindingMarkup("VerticalOffset"),
        Margin: new Thickness(0, -1, -1, -1)
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 1
    },
{
    Owner: Grid,
    Prop: "Row",
    Value: 0
}
]
},
{
    Type: ScrollBar,
    Name: "HorizontalScrollBar",
    Props: {
        Height: 18,
        IsTabStop: false,
        Visibility: new TemplateBindingMarkup("ComputedHorizontalScrollBarVisibility"),
        Orientation: Orientation.Horizontal,
        ViewportSize: new TemplateBindingMarkup("ViewportWidth"),
        Maximum: new TemplateBindingMarkup("ScrollableWidth"),
        Minimum: 0,
        Value: new TemplateBindingMarkup("HorizontalOffset"),
        Margin: new Thickness(-1, 0, -1, -1)
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 0
    },
{
    Owner: Grid,
    Prop: "Row",
    Value: 1
}
]
}]

                }
            }
        }
    }
}]

},
{
    Type: Style,
    Props: {
        TargetType: ComboBox
    },
    Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ComboBox, "Padding"),
        Value: "6,2,25,2"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ComboBox, "Background"),
        Value: "#FF1F3B53"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ComboBox, "HorizontalContentAlignment"),
        Value: "Left"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ComboBox, "BorderThickness"),
        Value: "1"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ComboBox, "TabNavigation"),
        Value: "Once"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ComboBox, "ScrollViewer.HorizontalScrollBarVisibility"),
        Value: "Auto"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ComboBox, "ScrollViewer.VerticalScrollBarVisibility"),
        Value: "Auto"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ComboBox, "BorderBrush"),
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
        Property: DependencyProperty.GetDependencyProperty(ComboBox, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: ComboBox
            },
            Content: {
                Type: Grid,
                Props: {
                    Resources: [
{
    Type: Style,
    Name: "comboToggleStyle",
    Props: {
        TargetType: ToggleButton
    },
    Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Foreground"),
        Value: "#FF333333"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Background"),
        Value: "#FF1F3B53"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "BorderBrush"),
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
        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "BorderThickness"),
        Value: "1"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Padding"),
        Value: "3"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: ToggleButton
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
        Value: "BackgroundOverlay2"
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
        To: Color.FromHex("#E5FFFFFF")
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
        To: Color.FromHex("#BCFFFFFF")
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
        To: Color.FromHex("#6BFFFFFF")
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
    Value: new _PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

}
]
}]

    }
},
{
    Type: VisualState,
    Name: "Disabled"
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
        Value: "BackgroundOverlay3"
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
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
        To: 1
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient2"
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
        To: Color.FromHex("#E5FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient2"
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
        To: Color.FromHex("#BCFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient2"
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
        To: Color.FromHex("#6BFFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient2"
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
        To: Color.FromHex("#F2FFFFFF")
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "BackgroundGradient2"
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
    Type: ObjectAnimationUsingKeyFrames,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "FocusVisualElement"
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
    Name: "Unfocused"
}]

}]


                }
],
                Children: [
{
    Type: Rectangle,
    Name: "Background",
    Props: {
        RadiusX: 3,
        RadiusY: 3,
        Fill: new TemplateBindingMarkup("Background"),
        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
        Stroke: new TemplateBindingMarkup("BorderBrush")
    }
},
{
    Type: Rectangle,
    Name: "BackgroundOverlay",
    Props: {
        Opacity: 0,
        RadiusX: 3,
        RadiusY: 3,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
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
    Name: "BackgroundOverlay2",
    Props: {
        Opacity: 0,
        RadiusX: 3,
        RadiusY: 3,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
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
        RadiusX: 2,
        RadiusY: 2,
        StrokeThickness: 1,
        Margin: new TemplateBindingMarkup("BorderThickness"),
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
},
{
    Type: Rectangle,
    Name: "BackgroundOverlay3",
    Props: {
        Opacity: 0,
        RadiusX: 3,
        RadiusY: 3,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
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
    Name: "BackgroundGradient2",
    Props: {
        Opacity: 0,
        RadiusX: 2,
        RadiusY: 2,
        StrokeThickness: 1,
        Margin: new TemplateBindingMarkup("BorderThickness"),
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
},
{
    Type: Rectangle,
    Name: "Highlight",
    Props: {
        RadiusX: 2,
        RadiusY: 2,
        Opacity: 0,
        IsHitTestVisible: false,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF6DBDD1")
            }
        },
        StrokeThickness: 1,
        Margin: new TemplateBindingMarkup("BorderThickness")
    }
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
    Content: new TemplateBindingMarkup("Content")
},
{
    Type: Rectangle,
    Name: "FocusVisualElement",
    Props: {
        RadiusX: 3.5,
        Margin: new Thickness(1, 1, 1, 1),
        RadiusY: 3.5,
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF6DBDD1")
            }
        },
        StrokeThickness: 1,
        Visibility: Visibility.Collapsed,
        IsHitTestVisible: false
    }
}]

            }
        }
    }
}]

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
    Name: "MouseOver"
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
    Value: new _PropertyPath("(UIElement.Opacity)")

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
    Value: new _PropertyPath("(UIElement.Opacity)")

}
]
}]

    }
},
{
    Type: VisualState,
    Name: "Unfocused"
},
{
    Type: VisualState,
    Name: "FocusedDropDown",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: ObjectAnimationUsingKeyFrames,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "PopupBorder"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(UIElement.Visibility)")

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
}]

}]


                }
],
                Children: [
{
    Type: Border,
    Name: "ContentPresenterBorder",
    Content: {
        Type: Grid,
        Children: [
{
    Type: ToggleButton,
    Name: "DropDownToggle",
    Props: {
        Style: new StaticResourceMarkup("comboToggleStyle"),
        HorizontalAlignment: HorizontalAlignment.Stretch,
        VerticalAlignment: VerticalAlignment.Stretch,
        Margin: new Thickness(0, 0, 0, 0),
        HorizontalContentAlignment: HorizontalAlignment.Right,
        Background: new TemplateBindingMarkup("Background"),
        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
        BorderBrush: new TemplateBindingMarkup("BorderBrush")
    },
    Content: {
        Type: Path,
        Name: "BtnArrow",
        Props: {
            Height: 4,
            Width: 8,
            Stretch: Stretch.Uniform,
            Data: "F1 M 301.14,-189.041L 311.57,-189.041L 306.355,-182.942L 301.14,-189.041 Z",
            Margin: new Thickness(0, 0, 6, 0),
            HorizontalAlignment: HorizontalAlignment.Right,
            Fill: {
                Type: SolidColorBrush,
                Name: "BtnArrowColor",
                Props: {
                    Color: Color.FromHex("#FF333333")
                }
            }
        }
    }
},
{
    Type: ContentPresenter,
    Name: "ContentPresenter",
    Props: {
        Margin: new TemplateBindingMarkup("Padding"),
        HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
        VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment")
    },
    Content: {
        Type: TextBlock,
        Props: {
            Text: " "
        }
    }
}]

    }
},
{
    Type: Rectangle,
    Name: "DisabledVisualElement",
    Props: {
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
},
{
    Type: Popup,
    Name: "Popup",
    Content: {
        Type: Border,
        Name: "PopupBorder",
        Props: {
            HorizontalAlignment: HorizontalAlignment.Stretch,
            Height: NaN,
            BorderThickness: new TemplateBindingMarkup("BorderThickness"),
            BorderBrush: new TemplateBindingMarkup("BorderBrush"),
            CornerRadius: new CornerRadius(3, 3, 3, 3),
            Background: {
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
        Offset: 0
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFFEFEFE"),
        Offset: 1
    }
}]

            }
        },
        Content: {
            Type: ScrollViewer,
            Name: "ScrollViewer",
            Props: {
                BorderThickness: new Thickness(0, 0, 0, 0),
                Padding: new Thickness(1, 1, 1, 1)
            },
            Content: {
                Type: ItemsPresenter
            }
        }
    }
}]

            }
        }
    }
}]

},
{
    Type: Style,
    Props: {
        TargetType: Slider
    },
    Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(Slider, "BorderThickness"),
        Value: "1"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(Slider, "Maximum"),
        Value: "10"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(Slider, "Minimum"),
        Value: "0"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(Slider, "Value"),
        Value: "0"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(Slider, "BorderBrush"),
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
        Property: DependencyProperty.GetDependencyProperty(Slider, "IsTabStop"),
        Value: "False"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(Slider, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: Slider
            },
            Content: {
                Type: Grid,
                Name: "Root",
                Props: {
                    Resources: [
{
    Type: ControlTemplate,
    Key: "RepeatButtonTemplate",
    Content: {
        Type: Grid,
        Name: "Root",
        Props: {
            Opacity: 0,
            Background: {
                Type: SolidColorBrush,
                Props: {
                    Color: Color.FromHex("#00FFFFFF")
                }
            }
        }
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
    Name: "MouseOver"
},
{
    Type: VisualState,
    Name: "Disabled",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: ObjectAnimationUsingKeyFrames,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "HorizontalTrackRectangleDisabledOverlay"
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
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "ThumbDisabledOverlay"
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
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "VerticalTrackRectangleDisabledOverlay"
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
}]

}]


                }
],
                Children: [
{
    Type: Grid,
    Name: "HorizontalTemplate",
    Props: {
        Background: new TemplateBindingMarkup("Background"),
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
        Width: new GridLength(1, GridUnitType.Star)
    }
}]

    },
    Children: [
{
    Type: Rectangle,
    Name: "TrackRectangle",
    Props: {
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFA3AEB9")
            }
        },
        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFE6EFF7")
            }
        },
        Height: 3,
        RadiusX: 1,
        RadiusY: 1,
        Margin: new Thickness(5, 0, 5, 0)
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 0
    },
{
    Owner: Grid,
    Prop: "ColumnSpan",
    Value: 3
}
]
},
{
    Type: Rectangle,
    Name: "HorizontalTrackRectangleDisabledOverlay",
    Props: {
        Visibility: Visibility.Collapsed,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        Opacity: 0.55,
        Height: 3,
        RadiusX: 1,
        RadiusY: 1,
        Margin: new Thickness(5, 0, 5, 0)
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 0
    },
{
    Owner: Grid,
    Prop: "ColumnSpan",
    Value: 3
}
]
},
{
    Type: RepeatButton,
    Name: "HorizontalTrackLargeChangeDecreaseRepeatButton",
    Props: {
        Height: 18,
        IsTabStop: false,
        Template: new StaticResourceMarkup("RepeatButtonTemplate")
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 0
    }
]
},
{
    Type: Thumb,
    Name: "HorizontalThumb",
    Props: {
        Height: 18,
        Width: 11,
        IsTabStop: true
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 1
    }
]
},
{
    Type: Rectangle,
    Name: "ThumbDisabledOverlay",
    Props: {
        RadiusX: 2,
        RadiusY: 2,
        Width: 11,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        Opacity: 0.55,
        Visibility: Visibility.Collapsed
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 1
    }
]
},
{
    Type: RepeatButton,
    Name: "HorizontalTrackLargeChangeIncreaseRepeatButton",
    Props: {
        Height: 18,
        IsTabStop: false,
        Template: new StaticResourceMarkup("RepeatButtonTemplate")
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Column",
        Value: 2
    }
]
}]

},
{
    Type: Grid,
    Name: "VerticalTemplate",
    Props: {
        Visibility: Visibility.Collapsed,
        Background: new TemplateBindingMarkup("Background"),
        RowDefinitions: [
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
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFA3AEB9")
            }
        },
        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFE6EFF7")
            }
        },
        Width: 3,
        RadiusX: 1,
        RadiusY: 1,
        Margin: new Thickness(0, 5, 0, 5)
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Row",
        Value: 0
    },
{
    Owner: Grid,
    Prop: "RowSpan",
    Value: 3
}
]
},
{
    Type: Rectangle,
    Name: "VerticalTrackRectangleDisabledOverlay",
    Props: {
        Visibility: Visibility.Collapsed,
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        Opacity: 0.55,
        Width: 3,
        RadiusX: 1,
        RadiusY: 1,
        Margin: new Thickness(0, 5, 0, 5)
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Row",
        Value: 0
    },
{
    Owner: Grid,
    Prop: "RowSpan",
    Value: 3
}
]
},
{
    Type: RepeatButton,
    Name: "VerticalTrackLargeChangeDecreaseRepeatButton",
    Props: {
        Width: 18,
        IsTabStop: false,
        Template: new StaticResourceMarkup("RepeatButtonTemplate")
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Row",
        Value: 2
    }
]
},
{
    Type: Thumb,
    Name: "VerticalThumb",
    Props: {
        Height: 11,
        Width: 18,
        IsTabStop: true
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Row",
        Value: 1
    }
]
},
{
    Type: RepeatButton,
    Name: "VerticalTrackLargeChangeIncreaseRepeatButton",
    Props: {
        Width: 18,
        IsTabStop: false,
        Template: new StaticResourceMarkup("RepeatButtonTemplate")
    },
    AttachedProps: [{
        Owner: Grid,
        Prop: "Row",
        Value: 0
    }
]
}]

}]

            }
        }
    }
}]

},
{
    Type: Style,
    Props: {
        TargetType: ProgressBar
    },
    Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ProgressBar, "Foreground"),
        Value: "#FF027DB8"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ProgressBar, "Background"),
        Value: "#FFD2D5D8"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ProgressBar, "BorderThickness"),
        Value: "1"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ProgressBar, "Maximum"),
        Value: "100"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ProgressBar, "IsTabStop"),
        Value: "False"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ProgressBar, "BorderBrush"),
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
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FF647480"),
        Offset: 1
    }
}]

        }
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(ProgressBar, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: ProgressBar
            },
            Content: {
                Type: Grid,
                Name: "Root",
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
    Name: "Determinate"
},
{
    Type: VisualState,
    Name: "Indeterminate",
    Content: {
        Type: Storyboard,
        Props: {
            RepeatBehavior: RepeatBehavior.FromForever()
        },
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 500)),
        From: 0,
        To: 20
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "IndeterminateGradientFill"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Shape.Fill).(LinearGradientBrush.Transform).(TransformGroup.Children)[0].X")

}
]
},
{
    Type: ObjectAnimationUsingKeyFrames,
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "IndeterminateRoot"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(UIElement.Visibility)")

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
    Props: {
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "DeterminateRoot"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(UIElement.Visibility)")

}
],
    Children: [
{
    Type: DiscreteObjectKeyFrame,
    Props: {
        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
        Value: Visibility.Collapsed
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
    Type: Border,
    Name: "ProgressBarTrack",
    Props: {
        CornerRadius: new CornerRadius(3, 3, 3, 3),
        Background: new TemplateBindingMarkup("Background"),
        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
        BorderBrush: new TemplateBindingMarkup("BorderBrush")
    }
},
{
    Type: Grid,
    Name: "ProgressBarRootGrid",
    Children: [
{
    Type: Rectangle,
    Name: "ProgressBarRootGradient",
    Props: {
        StrokeThickness: 1,
        Margin: new TemplateBindingMarkup("BorderThickness"),
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFFFFFFF")
            }
        },
        RadiusX: 1.5,
        RadiusY: 1.5,
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
        Color: Color.FromHex("#B2FFFFFF"),
        Offset: 0
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#C6FFFFFF"),
        Offset: 0.15
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#D1FFFFFF"),
        Offset: 0.275
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#C6FFFFFF"),
        Offset: 0.4
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#BFFFFFFF"),
        Offset: 0.65
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#A5FFFFFF"),
        Offset: 0.75
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#91FFFFFF"),
        Offset: 0.85
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#72FFFFFF"),
        Offset: 1
    }
}]

        }
    },
    AttachedProps: [{
        Owner: Canvas,
        Prop: "ZIndex",
        Value: 1
    }
]
},
{
    Type: Grid,
    Name: "IndeterminateRoot",
    Props: {
        Visibility: Visibility.Collapsed
    },
    Children: [
{
    Type: Rectangle,
    Name: "IndeterminateSolidFill",
    Props: {
        Stroke: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF448DCA")
            }
        },
        RadiusX: 2,
        RadiusY: 2,
        StrokeThickness: 0,
        Margin: new TemplateBindingMarkup("BorderThickness"),
        Fill: new TemplateBindingMarkup("Foreground"),
        Opacity: 1,
        RenderTransformOrigin: new Point(0.5, 0.5)
    }
},
{
    Type: Rectangle,
    Name: "IndeterminateGradientFill",
    Props: {
        RadiusX: 2,
        RadiusY: 2,
        StrokeThickness: 1,
        Margin: new TemplateBindingMarkup("BorderThickness"),
        Opacity: 0.7,
        Fill: {
            Type: LinearGradientBrush,
            Props: {
                SpreadMethod: GradientSpreadMethod.Repeat,
                MappingMode: BrushMappingMode.Absolute,
                EndPoint: new Point(0, 1),
                StartPoint: new Point(20, 1),
                Transform: {
                    Type: TransformGroup,
                    Children: [
{
    Type: TranslateTransform,
    Props: {
        X: 0
    }
},
{
    Type: SkewTransform,
    Props: {
        AngleX: -30
    }
}]

                }
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
        Color: Color.FromHex("#00FFFFFF"),
        Offset: 0.25
    }
},
{
    Type: GradientStop,
    Props: {
        Color: Color.FromHex("#FFFFFFFF"),
        Offset: 0.85
    }
}]

        }
    }
}]

},
{
    Type: Grid,
    Name: "DeterminateRoot",
    Props: {
        Margin: new Thickness(1, 1, 1, 1)
    },
    Children: [
{
    Type: Rectangle,
    Name: "ProgressBarIndicator",
    Props: {
        HorizontalAlignment: HorizontalAlignment.Left,
        Margin: new TemplateBindingMarkup("BorderThickness"),
        StrokeThickness: 0.5,
        RadiusX: 1.5,
        RadiusY: 1.5,
        Fill: new TemplateBindingMarkup("Foreground")
    }
}]

}]

}]

            }
        }
    }
}]

},
{
    Type: Style,
    Props: {
        TargetType: TextBox
    },
    Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(TextBox, "BorderThickness"),
        Value: "1"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(TextBox, "Background"),
        Value: "#FFFFFFFF"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(TextBox, "Foreground"),
        Value: "#FF000000"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(TextBox, "Padding"),
        Value: "2"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(TextBox, "BorderBrush"),
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
        Property: DependencyProperty.GetDependencyProperty(TextBox, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: TextBox
            },
            Content: {
                Type: Grid,
                Name: "RootElement",
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
    Type: ColorAnimation,
    Props: {
        To: Color.FromHex("#FF99C1E2"),
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "MouseOverBorder"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Border.BorderBrush).(SolidColorBrush.Color)")

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
        To: 1,
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
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
},
{
    Type: VisualState,
    Name: "ReadOnly",
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        To: 1,
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "ReadOnlyVisualElement"
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
        To: 1,
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
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
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        To: 0,
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
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
}]

}]


                }
],
                Children: [
{
    Type: Border,
    Name: "Border",
    Props: {
        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
        CornerRadius: new CornerRadius(1, 1, 1, 1),
        Opacity: 1,
        Background: new TemplateBindingMarkup("Background"),
        BorderBrush: new TemplateBindingMarkup("BorderBrush")
    },
    Content: {
        Type: Grid,
        Children: [
{
    Type: Border,
    Name: "ReadOnlyVisualElement",
    Props: {
        Opacity: 0,
        Background: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#5EC9C9C9")
            }
        }
    }
},
{
    Type: Border,
    Name: "MouseOverBorder",
    Props: {
        BorderThickness: new Thickness(1, 1, 1, 1),
        BorderBrush: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#00FFFFFF")
            }
        }
    },
    Content: {
        Type: ScrollViewer,
        Name: "ContentElement",
        Props: {
            Padding: new TemplateBindingMarkup("Padding"),
            BorderThickness: new Thickness(0, 0, 0, 0),
            IsTabStop: false
        }
    }
}]

    }
},
{
    Type: Border,
    Name: "DisabledVisualElement",
    Props: {
        Background: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#A5F7F7F7")
            }
        },
        BorderBrush: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#A5F7F7F7")
            }
        },
        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
        Opacity: 0,
        IsHitTestVisible: false
    }
},
{
    Type: Border,
    Name: "FocusVisualElement",
    Props: {
        BorderBrush: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF6DBDD1")
            }
        },
        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
        Margin: new Thickness(1, 1, 1, 1),
        Opacity: 0,
        IsHitTestVisible: false
    }
}]

            }
        }
    }
}]

},
{
    Type: Style,
    Props: {
        TargetType: PasswordBox
    },
    Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(PasswordBox, "BorderThickness"),
        Value: "1"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(PasswordBox, "Background"),
        Value: "#FFFFFFFF"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(PasswordBox, "Foreground"),
        Value: "#FF000000"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(PasswordBox, "Padding"),
        Value: "2"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(PasswordBox, "BorderBrush"),
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
        Property: DependencyProperty.GetDependencyProperty(PasswordBox, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: PasswordBox
            },
            Content: {
                Type: Grid,
                Name: "RootElement",
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
    Type: ColorAnimation,
    Props: {
        To: Color.FromHex("#FF99C1E2"),
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "MouseOverBorder"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Border.BorderBrush).(SolidColorBrush.Color)")

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
        To: 1,
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
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
        To: 1,
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
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
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        To: 0,
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
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
}]

}]


                }
],
                Children: [
{
    Type: Border,
    Name: "Border",
    Props: {
        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
        CornerRadius: new CornerRadius(1, 1, 1, 1),
        Opacity: 1,
        Background: new TemplateBindingMarkup("Background"),
        BorderBrush: new TemplateBindingMarkup("BorderBrush")
    },
    Content: {
        Type: Border,
        Name: "MouseOverBorder",
        Props: {
            BorderThickness: new Thickness(1, 1, 1, 1),
            BorderBrush: {
                Type: SolidColorBrush,
                Props: {
                    Color: Color.FromHex("#00FFFFFF")
                }
            }
        },
        Content: {
            Type: Border,
            Name: "ContentElement",
            Props: {
                Margin: new TemplateBindingMarkup("Padding")
            }
        }
    }
},
{
    Type: Border,
    Name: "DisabledVisualElement",
    Props: {
        Background: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#A5F7F7F7")
            }
        },
        BorderBrush: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#A5F7F7F7")
            }
        },
        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
        Opacity: 0,
        IsHitTestVisible: false
    }
},
{
    Type: Border,
    Name: "FocusVisualElement",
    Props: {
        BorderBrush: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF6DBDD1")
            }
        },
        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
        Margin: new Thickness(1, 1, 1, 1),
        Opacity: 0,
        IsHitTestVisible: false
    }
}]

            }
        }
    }
}]

},
{
    Type: Style,
    Props: {
        TargetType: RichTextBox
    },
    Children: [
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RichTextBox, "BorderThickness"),
        Value: "1"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RichTextBox, "Background"),
        Value: "#FFFFFFFF"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RichTextBox, "Foreground"),
        Value: "#FF000000"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RichTextBox, "Padding"),
        Value: "2"
    }
},
{
    Type: Setter,
    Props: {
        Property: DependencyProperty.GetDependencyProperty(RichTextBox, "BorderBrush"),
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
        Property: DependencyProperty.GetDependencyProperty(RichTextBox, "Template"),
        Value: {
            Type: ControlTemplate,
            Props: {
                TargetType: RichTextBox
            },
            Content: {
                Type: Grid,
                Name: "RootElement",
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
    Type: ColorAnimation,
    Props: {
        To: Color.FromHex("#FF99C1E2"),
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
    },
    AttachedProps: [{
        Owner: Storyboard,
        Prop: "TargetName",
        Value: "MouseOverBorder"
    },
{
    Owner: Storyboard,
    Prop: "TargetProperty",
    Value: new _PropertyPath("(Border.BorderBrush).(SolidColorBrush.Color)")

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
        To: 1,
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
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
},
{
    Type: VisualState,
    Name: "ReadOnly"
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
        To: 1,
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
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
    Content: {
        Type: Storyboard,
        Children: [
{
    Type: DoubleAnimation,
    Props: {
        To: 0,
        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
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
}]

}]


                }
],
                Children: [
{
    Type: Border,
    Name: "Border",
    Props: {
        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
        CornerRadius: new CornerRadius(1, 1, 1, 1),
        Opacity: 1,
        Background: new TemplateBindingMarkup("Background"),
        BorderBrush: new TemplateBindingMarkup("BorderBrush")
    },
    Content: {
        Type: Border,
        Name: "MouseOverBorder",
        Props: {
            BorderThickness: new Thickness(1, 1, 1, 1),
            BorderBrush: {
                Type: SolidColorBrush,
                Props: {
                    Color: Color.FromHex("#00FFFFFF")
                }
            }
        },
        Content: {
            Type: ScrollViewer,
            Name: "ContentElement",
            Props: {
                Padding: new TemplateBindingMarkup("Padding"),
                BorderThickness: new Thickness(0, 0, 0, 0),
                IsTabStop: false
            }
        }
    }
},
{
    Type: Border,
    Name: "DisabledVisualElement",
    Props: {
        Background: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#A5F7F7F7")
            }
        },
        BorderBrush: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#A5F7F7F7")
            }
        },
        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
        Opacity: 0,
        IsHitTestVisible: false
    }
},
{
    Type: Border,
    Name: "FocusVisualElement",
    Props: {
        BorderBrush: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FF6DBDD1")
            }
        },
        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
        Margin: new Thickness(1, 1, 1, 1),
        Opacity: 0,
        IsHitTestVisible: false
    }
}]

            }
        }
    }
}]

}]

    };
    return JsonParser.Parse(json);
};