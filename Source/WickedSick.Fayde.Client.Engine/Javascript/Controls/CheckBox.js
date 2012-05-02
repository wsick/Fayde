/// <reference path="Primitives/ToggleButton.js"/>
/// CODE

//#region CheckBox
var CheckBox = Nullstone.Create("CheckBox", ToggleButton);

CheckBox.Instance.GetDefaultStyle = function () {
    var styleJson = {
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
                          True

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
},
{
    Type: Border,
    Name: "ValidationErrorElement",
    Props: {
        Margin: new Thickness(1, 1, 1, 1),
        BorderThickness: new Thickness(1, 1, 1, 1),
        CornerRadius: new CornerRadius(1, 1, 1, 1),
        BorderBrush: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFDB000C")
            }
        },
        Visibility: Visibility.Collapsed
    },
    AttachedProps: [{
        Owner: ToolTipService,
        Prop: "PlacementTarget",
        Value: "{Binding RelativeSource={RelativeSource TemplatedParent}}"
    },
{
    Owner: ToolTipService,
    Prop: "ToolTip",
    Value: {
        Type: ToolTip,
        Name: "validationTooltip",
        Props: {
            Template: new StaticResourceMarkup("ValidationToolTipTemplate"),
            DataContext: new BindingMarkup({ 'Mode': TwoWay })
,
            Placement: PlacementMode.Right,
            PlacementTarget: new BindingMarkup({ 'Mode': TwoWay })
,
            Triggers: [
{
    Type: EventTrigger,
    Props: {
        RoutedEvent: "Canvas.Loaded",
        Actions: [
{
    Type: BeginStoryboard,
    Content: {
        Type: Storyboard,
        Children: [
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
    Value: new _PropertyPath("IsHitTestVisible")

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

    }
}]

        }
    }

}
],
    Content: {
        Type: Grid,
        Props: {
            Width: 10,
            Height: 10,
            HorizontalAlignment: HorizontalAlignment.Right,
            Margin: new Thickness(0, -4, -4, 0),
            VerticalAlignment: VerticalAlignment.Top,
            Background: {
                Type: SolidColorBrush,
                Props: {
                    Color: Color.FromHex("#00FFFFFF")
                }
            }
        },
        Children: [
{
    Type: Path,
    Props: {
        Margin: new Thickness(0, 3, 0, 0),
        Data: "M 1,0 L5,0 A 2,2 90 0 1 7,2 L7,6 z",
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#FFDC000C")
            }
        }
    }
},
{
    Type: Path,
    Props: {
        Margin: new Thickness(0, 3, 0, 0),
        Data: "M 0,0 L2,0 L 7,5 L7,7",
        Fill: {
            Type: SolidColorBrush,
            Props: {
                Color: Color.FromHex("#ffffff")
            }
        }
    }
}]

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

    };
    var parser = new JsonParser();
    return parser.CreateObject(styleJson, new NameScope());
};

Nullstone.FinishCreate(CheckBox);
//#endregion