/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Primitives/ButtonBase.js"/>
/// CODE
/// <reference path="Style.js"/>
/// <reference path="JsonParser.js"/>
/// <reference path="Brushes.js"/>
/// <reference path="Primitives.js"/>
/// <reference path="VisualStateManager.js"/>
/// <reference path="Animation.js"/>

//#region Button
var Button = Nullstone.Create("Button", ButtonBase);

Button.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$ButtonBase();
    this.UpdateVisualState(false);
};
Button.Instance._ChangeVisualState = function (useTransitions) {
    if (!this.GetIsEnabled()) {
        this._GoToState(useTransitions, "Disabled");
    } else if (this.IsPressed) {
        this._GoToState(useTransitions, "Pressed");
    } else if (this.IsMouseOver) {
        this._GoToState(useTransitions, "MouseOver");
    } else {
        this._GoToState(useTransitions, "Normal");
    }

    if (this.IsFocused && this.GetIsEnabled()) {
        this._GoToState(useTransitions, "Focused");
    } else {
        this._GoToState(useTransitions, "Unfocused");
    }
};
Button.Instance.OnIsEnabledChanged = function (e) {
    this.OnIsEnabledChanged$ButtonBase(e);
    this.SetIsTabStop(e.NewValue);
};

//#region Default Style

Button.Instance.GetDefaultStyle = function () {
    var styleJson = {
        Type: Style,
        Props: {
            TargetType: Button
        },
        Children: [
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(Button, "Background"),
                    Value: new SolidColorBrush(Color.FromHex("#FF1F3B53"))
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(Button, "Foreground"),
                    Value: new SolidColorBrush(Color.FromHex("#FF000000"))
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(Button, "Padding"),
                    Value: new Thickness(3, 3, 3, 3)
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(Button, "BorderThickness"),
                    Value: new Thickness(1, 1, 1, 1)
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(Button, "BorderBrush"),
                    Value: {
                        Type: LinearGradientBrush,
                        Props: {
                            StartPoint: new Point(0.5, 0.0),
                            EndPoint: new Point(0.5, 1.0),
                            GradientStops: [
                                {
                                    Type: GradientStop,
                                    Props: {
                                        Color: Color.FromHex("#FFA3AEB9"),
                                        Offset: 0.0
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
                                        Offset: 1.0
                                    }
                                }
                            ]
                        }
                    }
                }
            },
            {
                Type: Setter,
                Props: {
                    Property: DependencyProperty.GetDependencyProperty(Button, "Template"),
                    Value: new ControlTemplate(Button, {
                        Type: Grid,
                        AttachedProps: [
                            {
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
                                                            Props: { Duration: new Duration(0.0), To: 1.0 },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "BackgroundAnimation" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("Opacity") }
                                                            ]
                                                        },
                                                        {
                                                            Type: ColorAnimation,
                                                            Props: { Duration: new Duration(0.0), To: Color.FromHex("#F2FFFFFF") },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "BackgroundGradient" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)") }
                                                            ]
                                                        },
                                                        {
                                                            Type: ColorAnimation,
                                                            Props: { Duration: new Duration(0.0), To: Color.FromHex("#CCFFFFFF") },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "BackgroundGradient" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)") }
                                                            ]
                                                        },
                                                        {
                                                            Type: ColorAnimation,
                                                            Props: { Duration: new Duration(0.0), To: Color.FromHex("#7FFFFFFF") },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "BackgroundGradient" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)") }
                                                            ]
                                                        }
                                                    ]
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
                                                            Props: { Duration: new Duration(0.0), To: Color.FromHex("#FF6DBDD1") },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "Background" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Border.Background).(SolidColorBrush.Color)") }
                                                            ]
                                                        },
                                                        {
                                                            Type: DoubleAnimation,
                                                            Props: { Duration: new Duration(0.0), To: 1.0 },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "BackgroundAnimation" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("Opacity") }
                                                            ]
                                                        },
                                                        {
                                                            Type: ColorAnimation,
                                                            Props: { Duration: new Duration(0.0), To: Color.FromHex("#D8FFFFFF") },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "BackgroundGradient" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)") }
                                                            ]
                                                        },
                                                        {
                                                            Type: ColorAnimation,
                                                            Props: { Duration: new Duration(0.0), To: Color.FromHex("#C6FFFFFF") },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "BackgroundGradient" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)") }
                                                            ]
                                                        },
                                                        {
                                                            Type: ColorAnimation,
                                                            Props: { Duration: new Duration(0.0), To: Color.FromHex("#8CFFFFFF") },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "BackgroundGradient" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)") }
                                                            ]
                                                        },
                                                        {
                                                            Type: ColorAnimation,
                                                            Props: { Duration: new Duration(0.0), To: Color.FromHex("#3FFFFFFF") },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "BackgroundGradient" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)") }
                                                            ]
                                                        }
                                                    ]
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
                                                            Props: { Duration: new Duration(0.0), To: 0.55 },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "DisabledVisualElement" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("Opacity") }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
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
                                                            Props: { Duration: new Duration(0.0), To: 1.0 },
                                                            AttachedProps: [
                                                                { Owner: Storyboard, Prop: "TargetName", Value: "FocusVisualElement" },
                                                                { Owner: Storyboard, Prop: "TargetProperty", Value: new _PropertyPath("Opacity") }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                Type: VisualState,
                                                Name: "Unfocused"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        Children: [
                            {
                                Type: Border,
                                Name: "Background",
                                Props: {
                                    CornerRadius: new CornerRadius(3, 3, 3, 3),
                                    Background: new SolidColorBrush(Color.FromHex("#FFFFFFFF")),
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
                                                Opacity: 0.0,
                                                Background: new SolidColorBrush(Color.FromHex("#FF448DCA"))
                                            }
                                        },
                                        {
                                            Type: Rectangle,
                                            Name: "BackgroundGradient",
                                            Props: {
                                                Fill: {
                                                    Type: LinearGradientBrush,
                                                    Props: {
                                                        StartPoint: new Point(0.7, 0.0),
                                                        EndPoint: new Point(0.7, 1.0),
                                                        GradientStops: [
                                                            {
                                                                Type: GradientStop,
                                                                Props: {
                                                                    Color: Color.FromHex("#FFFFFFFF"),
                                                                    Offset: 0.0
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
                                                                    Offset: 1.0
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                Type: ContentPresenter,
                                Name: "contentPresenter",
                                Props: {
                                    Content: new TemplateBindingMarkup("Content"),
                                    ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
                                    VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment"),
                                    HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                    Margin: new TemplateBindingMarkup("Padding")
                                }
                            },
                            {
                                Type: Rectangle,
                                Name: "DisabledVisualElement",
                                Props: {
                                    Fill: new SolidColorBrush(Color.FromHex("#FFFFFFFF")),
                                    IsHitTestVisible: false,
                                    Opacity: 0.0,
                                    RadiusX: 3,
                                    RadiusY: 3
                                }
                            },
                            {
                                Type: Rectangle,
                                Name: "FocusVisualElement",
                                Props: {
                                    IsHitTestVisible: false,
                                    Margin: new Thickness(1, 1, 1, 1),
                                    Opacity: 0.0,
                                    RadiusX: 2,
                                    RadiusY: 2,
                                    Stroke: new SolidColorBrush(Color.FromHex("#FF6DBDD1")),
                                    StrokeThickness: 1
                                }
                            }
                        ]
                    })
                }
            }
        ]
    };
    var parser = new JsonParser();
    return parser.CreateObject(styleJson, new NameScope());
};

//#endregion

Nullstone.FinishCreate(Button);
//#endregion