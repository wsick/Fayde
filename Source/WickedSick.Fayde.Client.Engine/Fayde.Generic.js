/// <reference path="Fayde.js"/>

App.GetGenericResourceDictionaryImpl = function () {
    var ResourceDictionary = Fayde.ResourceDictionary;
    var Style = Fayde.Style;
    var Button = Fayde.Controls.Button;
    var Setter = Fayde.Setter;
    var LinearGradientBrush = Fayde.Media.LinearGradientBrush;
    var GradientStop = Fayde.Media.GradientStop;
    var ControlTemplate = Fayde.Controls.ControlTemplate;
    var Grid = Fayde.Controls.Grid;
    var VisualStateManager = Fayde.Media.VisualStateManager.VisualStateManager;
    var VisualStateGroup = Fayde.Media.VisualStateManager.VisualStateGroup;
    var VisualState = Fayde.Media.VisualStateManager.VisualState;
    var Storyboard = Fayde.Media.Animation.Storyboard;
    var DoubleAnimation = Fayde.Media.Animation.DoubleAnimation;
    var PropertyPath = Fayde.Data.PropertyPath;
    var ColorAnimation = Fayde.Media.Animation.ColorAnimation;
    var Border = Fayde.Controls.Border;
    var SolidColorBrush = Fayde.Media.SolidColorBrush;
    var TemplateBindingMarkup = Fayde.TemplateBindingMarkup;
    var Rectangle = Fayde.Shapes.Rectangle;
    var ContentPresenter = Fayde.Controls.ContentPresenter;
    var RepeatButton = Fayde.Controls.Primitives.RepeatButton;
    var ToggleButton = Fayde.Controls.Primitives.ToggleButton;
    var PointAnimation = Fayde.Media.Animation.PointAnimation;
    var HyperlinkButton = Fayde.Controls.HyperlinkButton;
    var ObjectAnimationUsingKeyFrames = Fayde.Media.Animation.ObjectAnimationUsingKeyFrames;
    var DiscreteObjectKeyFrame = Fayde.Media.Animation.DiscreteObjectKeyFrame;
    var Visibility = Fayde.Visibility;
    var TextBlock = Fayde.Controls.TextBlock;
    var Canvas = Fayde.Controls.Canvas;
    var CheckBox = Fayde.Controls.CheckBox;
    var ColumnDefinition = Fayde.Controls.ColumnDefinition;
    var GridLength = Fayde.Controls.GridLength;
    var GridUnitType = Fayde.Controls.GridUnitType;
    var HorizontalAlignment = Fayde.HorizontalAlignment;
    var VerticalAlignment = Fayde.VerticalAlignment;
    var Path = Fayde.Shapes.Path;
    var Stretch = Fayde.Media.Stretch;
    var FlowDirection = Fayde.FlowDirection;
    var RadioButton = Fayde.Controls.RadioButton;
    var Ellipse = Fayde.Shapes.Ellipse;
    var ContentControl = Fayde.Controls.ContentControl;
    var ListBox = Fayde.Controls.ListBox;
    var ScrollViewer = Fayde.Controls.ScrollViewer;
    var ItemsPresenter = Fayde.Controls.ItemsPresenter;
    var ListBoxItem = Fayde.Controls.ListBoxItem;
    var Thumb = Fayde.Controls.Primitives.Thumb;
    var ScrollBar = Fayde.Controls.Primitives.ScrollBar;
    var StaticResourceMarkup = Fayde.StaticResourceMarkup;
    var RowDefinition = Fayde.Controls.RowDefinition;
    var ScrollContentPresenter = Fayde.Controls.ScrollContentPresenter;
    var Orientation = Fayde.Orientation;
    var ComboBox = Fayde.Controls.ComboBox;
    var Popup = Fayde.Controls.Primitives.Popup;
    var Slider = Fayde.Controls.Slider;
    var ProgressBar = Fayde.Controls.ProgressBar;
    var RepeatBehavior = Fayde.Media.Animation.RepeatBehavior;
    var GradientSpreadMethod = Fayde.Media.GradientSpreadMethod;
    var BrushMappingMode = Fayde.Media.BrushMappingMode;
    var TransformGroup = Fayde.Media.TransformGroup;
    var TranslateTransform = Fayde.Media.TranslateTransform;
    var SkewTransform = Fayde.Media.SkewTransform;
    var TextBox = Fayde.Controls.TextBox;
    var PasswordBox = Fayde.Controls.PasswordBox;

    var json = {
        ParseType: ResourceDictionary,
        Children: [
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: Button
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Button, "Background"),
                        Value: "#FF1F3B53"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Button, "Foreground"),
                        Value: "#FF000000"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Button, "Padding"),
                        Value: "3"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Button, "BorderThickness"),
                        Value: "1"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Button, "BorderBrush"),
                        Value: {
                            ParseType: LinearGradientBrush,
                            Props: {
                                EndPoint: new Point(0.5, 1),
                                StartPoint: new Point(0.5, 0)
                            },
                            Children: [
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FFA3AEB9"),
                                    Offset: 0
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF8399A9"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF718597"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF617584"),
                                    Offset: 1
                                }
                            }]

                        }
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Button, "Template"),
                        Value: {
                            ParseType: ControlTemplate,
                            Props: {
                                TargetType: Button
                            },
                            Content: {
                                ParseType: Grid,
                                AttachedProps: [{
                                    Owner: VisualStateManager,
                                    Prop: "VisualStateGroups",
                                    Value: [
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "CommonStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Normal"
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "MouseOver",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Pressed",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Border.Background).(SolidColorBrush.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Disabled",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                }]

                                            }
                                        }]

                                    },
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "FocusStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Focused",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Unfocused"
                                        }]

                                    }]


                                }
                                ],
                                Children: [
                                {
                                    ParseType: Border,
                                    Name: "Background",
                                    Props: {
                                        CornerRadius: new CornerRadius(3, 3, 3, 3),
                                        Background: {
                                            ParseType: SolidColorBrush,
                                            Props: {
                                                Color: Color.FromHex("#FFFFFFFF")
                                            }
                                        },
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        BorderBrush: new TemplateBindingMarkup("BorderBrush")
                                    },
                                    Content: {
                                        ParseType: Grid,
                                        Props: {
                                            Background: new TemplateBindingMarkup("Background"),
                                            Margin: new Thickness(1, 1, 1, 1)
                                        },
                                        Children: [
                                        {
                                            ParseType: Border,
                                            Name: "BackgroundAnimation",
                                            Props: {
                                                Opacity: 0,
                                                Background: {
                                                    ParseType: SolidColorBrush,
                                                    Props: {
                                                        Color: Color.FromHex("#FF448DCA")
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            ParseType: Rectangle,
                                            Name: "BackgroundGradient",
                                            Props: {
                                                Fill: {
                                                    ParseType: LinearGradientBrush,
                                                    Props: {
                                                        StartPoint: new Point(0.7, 0),
                                                        EndPoint: new Point(0.7, 1)
                                                    },
                                                    Children: [
                                                    {
                                                        ParseType: GradientStop,
                                                        Props: {
                                                            Color: Color.FromHex("#FFFFFFFF"),
                                                            Offset: 0
                                                        }
                                                    },
                                                    {
                                                        ParseType: GradientStop,
                                                        Props: {
                                                            Color: Color.FromHex("#F9FFFFFF"),
                                                            Offset: 0.375
                                                        }
                                                    },
                                                    {
                                                        ParseType: GradientStop,
                                                        Props: {
                                                            Color: Color.FromHex("#E5FFFFFF"),
                                                            Offset: 0.625
                                                        }
                                                    },
                                                    {
                                                        ParseType: GradientStop,
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
                                    ParseType: ContentPresenter,
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
                                    ParseType: Rectangle,
                                    Name: "DisabledVisualElement",
                                    Props: {
                                        RadiusX: 3,
                                        RadiusY: 3,
                                        Fill: {
                                            ParseType: SolidColorBrush,
                                            Props: {
                                                Color: Color.FromHex("#FFFFFFFF")
                                            }
                                        },
                                        Opacity: 0,
                                        IsHitTestVisible: false
                                    }
                                },
                                {
                                    ParseType: Rectangle,
                                    Name: "FocusVisualElement",
                                    Props: {
                                        RadiusX: 2,
                                        RadiusY: 2,
                                        Margin: new Thickness(1, 1, 1, 1),
                                        Stroke: {
                                            ParseType: SolidColorBrush,
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

            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: RepeatButton
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "Background"),
                        Value: "#FF1F3B53"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "Foreground"),
                        Value: "#FF000000"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "Padding"),
                        Value: "3"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "BorderThickness"),
                        Value: "1"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "BorderBrush"),
                        Value: {
                            ParseType: LinearGradientBrush,
                            Props: {
                                EndPoint: new Point(0.5, 1),
                                StartPoint: new Point(0.5, 0)
                            },
                            Children: [
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FFA3AEB9"),
                                    Offset: 0
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF8399A9"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF718597"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF617584"),
                                    Offset: 1
                                }
                            }]

                        }
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "Template"),
                        Value: {
                            ParseType: ControlTemplate,
                            Props: {
                                TargetType: RepeatButton
                            },
                            Content: {
                                ParseType: Grid,
                                AttachedProps: [{
                                    Owner: VisualStateManager,
                                    Prop: "VisualStateGroups",
                                    Value: [
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "CommonStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Normal"
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "MouseOver",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Pressed",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Border.Background).(SolidColorBrush.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Disabled",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                }]

                                            }
                                        }]

                                    },
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "FocusStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Focused",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Unfocused"
                                        }]

                                    }]


                                }
                                ],
                                Children: [
                                {
                                    ParseType: Border,
                                    Name: "Background",
                                    Props: {
                                        CornerRadius: new CornerRadius(3, 3, 3, 3),
                                        Background: {
                                            ParseType: SolidColorBrush,
                                            Props: {
                                                Color: Color.FromHex("#FFFFFFFF")
                                            }
                                        },
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        BorderBrush: new TemplateBindingMarkup("BorderBrush")
                                    },
                                    Content: {
                                        ParseType: Grid,
                                        Props: {
                                            Background: new TemplateBindingMarkup("Background"),
                                            Margin: new Thickness(1, 1, 1, 1)
                                        },
                                        Children: [
                                        {
                                            ParseType: Border,
                                            Name: "BackgroundAnimation",
                                            Props: {
                                                Opacity: 0,
                                                Background: {
                                                    ParseType: SolidColorBrush,
                                                    Props: {
                                                        Color: Color.FromHex("#FF448DCA")
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            ParseType: Rectangle,
                                            Name: "BackgroundGradient",
                                            Props: {
                                                Fill: {
                                                    ParseType: LinearGradientBrush,
                                                    Props: {
                                                        StartPoint: new Point(0.7, 0),
                                                        EndPoint: new Point(0.7, 1)
                                                    },
                                                    Children: [
                                                    {
                                                        ParseType: GradientStop,
                                                        Props: {
                                                            Color: Color.FromHex("#FFFFFFFF"),
                                                            Offset: 0
                                                        }
                                                    },
                                                    {
                                                        ParseType: GradientStop,
                                                        Props: {
                                                            Color: Color.FromHex("#F9FFFFFF"),
                                                            Offset: 0.375
                                                        }
                                                    },
                                                    {
                                                        ParseType: GradientStop,
                                                        Props: {
                                                            Color: Color.FromHex("#E5FFFFFF"),
                                                            Offset: 0.625
                                                        }
                                                    },
                                                    {
                                                        ParseType: GradientStop,
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
                                    ParseType: ContentPresenter,
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
                                    ParseType: Rectangle,
                                    Name: "DisabledVisualElement",
                                    Props: {
                                        RadiusX: 3,
                                        RadiusY: 3,
                                        Fill: {
                                            ParseType: SolidColorBrush,
                                            Props: {
                                                Color: Color.FromHex("#FFFFFFFF")
                                            }
                                        },
                                        Opacity: 0,
                                        IsHitTestVisible: false
                                    }
                                },
                                {
                                    ParseType: Rectangle,
                                    Name: "FocusVisualElement",
                                    Props: {
                                        RadiusX: 2,
                                        RadiusY: 2,
                                        Margin: new Thickness(1, 1, 1, 1),
                                        Stroke: {
                                            ParseType: SolidColorBrush,
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

            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: ToggleButton
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Background"),
                        Value: "#FF1F3B53"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Foreground"),
                        Value: "#FF000000"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Padding"),
                        Value: "3"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "BorderThickness"),
                        Value: "1"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "BorderBrush"),
                        Value: {
                            ParseType: LinearGradientBrush,
                            Props: {
                                EndPoint: new Point(0.5, 1),
                                StartPoint: new Point(0.5, 0)
                            },
                            Children: [
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FFA3AEB9"),
                                    Offset: 0
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF8399A9"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF718597"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF617584"),
                                    Offset: 1
                                }
                            }]

                        }
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Template"),
                        Value: {
                            ParseType: ControlTemplate,
                            Props: {
                                TargetType: ToggleButton
                            },
                            Content: {
                                ParseType: Grid,
                                AttachedProps: [{
                                    Owner: VisualStateManager,
                                    Prop: "VisualStateGroups",
                                    Value: [
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "CommonStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Normal"
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "MouseOver",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Pressed",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Border.Background).(SolidColorBrush.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Rectangle.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Disabled",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                }]

                                            }
                                        }]

                                    },
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "CheckStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Checked",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: PointAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Rectangle.Fill).(LinearGradientBrush.StartPoint)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: PointAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Rectangle.Fill).(LinearGradientBrush.EndPoint)")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Unchecked"
                                        }]

                                    },
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "FocusStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Focused",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Unfocused"
                                        }]

                                    }]


                                }
                                ],
                                Children: [
                                {
                                    ParseType: Border,
                                    Name: "Background",
                                    Props: {
                                        CornerRadius: new CornerRadius(3, 3, 3, 3),
                                        Background: {
                                            ParseType: SolidColorBrush,
                                            Props: {
                                                Color: Color.FromHex("#FFFFFFFF")
                                            }
                                        },
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        BorderBrush: new TemplateBindingMarkup("BorderBrush")
                                    },
                                    Content: {
                                        ParseType: Grid,
                                        Props: {
                                            Background: new TemplateBindingMarkup("Background"),
                                            Margin: new Thickness(1, 1, 1, 1)
                                        },
                                        Children: [
                                        {
                                            ParseType: Border,
                                            Name: "BackgroundAnimation",
                                            Props: {
                                                Opacity: 0,
                                                Background: {
                                                    ParseType: SolidColorBrush,
                                                    Props: {
                                                        Color: Color.FromHex("#FF448DCA")
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            ParseType: Rectangle,
                                            Name: "BackgroundGradient",
                                            Props: {
                                                Fill: {
                                                    ParseType: LinearGradientBrush,
                                                    Props: {
                                                        StartPoint: new Point(0.7, 0),
                                                        EndPoint: new Point(0.7, 1)
                                                    },
                                                    Children: [
                                                    {
                                                        ParseType: GradientStop,
                                                        Props: {
                                                            Color: Color.FromHex("#FFFFFFFF"),
                                                            Offset: 0
                                                        }
                                                    },
                                                    {
                                                        ParseType: GradientStop,
                                                        Props: {
                                                            Color: Color.FromHex("#F9FFFFFF"),
                                                            Offset: 0.375
                                                        }
                                                    },
                                                    {
                                                        ParseType: GradientStop,
                                                        Props: {
                                                            Color: Color.FromHex("#E5FFFFFF"),
                                                            Offset: 0.625
                                                        }
                                                    },
                                                    {
                                                        ParseType: GradientStop,
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
                                    ParseType: ContentPresenter,
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
                                    ParseType: Rectangle,
                                    Name: "DisabledVisualElement",
                                    Props: {
                                        RadiusX: 3,
                                        RadiusY: 3,
                                        Fill: {
                                            ParseType: SolidColorBrush,
                                            Props: {
                                                Color: Color.FromHex("#FFFFFFFF")
                                            }
                                        },
                                        Opacity: 0,
                                        IsHitTestVisible: false
                                    }
                                },
                                {
                                    ParseType: Rectangle,
                                    Name: "FocusVisualElement",
                                    Props: {
                                        RadiusX: 2,
                                        RadiusY: 2,
                                        Margin: new Thickness(1, 1, 1, 1),
                                        Stroke: {
                                            ParseType: SolidColorBrush,
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

            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: HyperlinkButton
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "Foreground"),
                        Value: "#FF73A9D8"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "Padding"),
                        Value: "2,0,2,0"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "Cursor"),
                        Value: "Hand"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "HorizontalContentAlignment"),
                        Value: "Left"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "VerticalContentAlignment"),
                        Value: "Top"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "Background"),
                        Value: "Transparent"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "Template"),
                        Value: {
                            ParseType: ControlTemplate,
                            Props: {
                                TargetType: HyperlinkButton
                            },
                            Content: {
                                ParseType: Grid,
                                Props: {
                                    Cursor: new TemplateBindingMarkup("Cursor"),
                                    Background: new TemplateBindingMarkup("Background")
                                },
                                AttachedProps: [{
                                    Owner: VisualStateManager,
                                    Prop: "VisualStateGroups",
                                    Value: [
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "CommonStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Normal"
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "MouseOver",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: ObjectAnimationUsingKeyFrames,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "UnderlineTextBlock"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        ParseType: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                            Value: Visibility.Visible
                                                        }
                                                    }]

                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Pressed",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: ObjectAnimationUsingKeyFrames,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "UnderlineTextBlock"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        ParseType: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                            Value: Visibility.Visible
                                                        }
                                                    }]

                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Disabled",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: ObjectAnimationUsingKeyFrames,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "DisabledOverlay"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        ParseType: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                            Value: Visibility.Visible
                                                        }
                                                    }]

                                                }]

                                            }
                                        }]

                                    },
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "FocusStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Focused",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Unfocused"
                                        }]

                                    }]


                                }
                                ],
                                Children: [
                                {
                                    ParseType: TextBlock,
                                    Name: "UnderlineTextBlock",
                                    Props: {
                                        Text: new TemplateBindingMarkup("Content"),
                                        HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                        VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment"),
                                        Margin: new TemplateBindingMarkup("Padding"),
                                        TextDecorations: Fayde.TextDecorations.Underline,
                                        Visibility: Visibility.Collapsed
                                    }
                                },
                                {
                                    ParseType: TextBlock,
                                    Name: "DisabledOverlay",
                                    Props: {
                                        Text: new TemplateBindingMarkup("Content"),
                                        Foreground: {
                                            ParseType: SolidColorBrush,
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
                                    ]
                                },
                                {
                                    ParseType: ContentPresenter,
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
                                    ParseType: Rectangle,
                                    Name: "FocusVisualElement",
                                    Props: {
                                        Stroke: {
                                            ParseType: SolidColorBrush,
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

            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: CheckBox
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(CheckBox, "Background"),
                        Value: "#FF448DCA"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(CheckBox, "Foreground"),
                        Value: "#FF000000"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(CheckBox, "HorizontalContentAlignment"),
                        Value: "Left"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(CheckBox, "VerticalContentAlignment"),
                        Value: "Top"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(CheckBox, "Padding"),
                        Value: "4,1,0,0"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(CheckBox, "BorderThickness"),
                        Value: "1"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(CheckBox, "BorderBrush"),
                        Value: {
                            ParseType: LinearGradientBrush,
                            Props: {
                                EndPoint: new Point(0.5, 1),
                                StartPoint: new Point(0.5, 0)
                            },
                            Children: [
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FFA3AEB9"),
                                    Offset: 0
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF8399A9"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF718597"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF617584"),
                                    Offset: 1
                                }
                            }]

                        }
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(CheckBox, "Template"),
                        Value: {
                            ParseType: ControlTemplate,
                            Props: {
                                TargetType: CheckBox
                            },
                            Content: {
                                ParseType: Grid,
                                Props: {
                                    ColumnDefinitions: [
                                    {
                                        ParseType: ColumnDefinition,
                                        Props: {
                                            Width: new GridLength(16, GridUnitType.Pixel)
                                        }
                                    },
                                    {
                                        ParseType: ColumnDefinition,
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
                                        ParseType: VisualStateGroup,
                                        Name: "CommonStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Normal"
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "MouseOver",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Pressed",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Stroke).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Stroke).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Stroke).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Stroke).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Disabled",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    }
                                                    ]
                                                }]

                                            }
                                        }]

                                    },
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "CheckStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Checked",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Unchecked"
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Indeterminate",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    }
                                                    ]
                                                }]

                                            }
                                        }]

                                    },
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "FocusStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Focused",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Unfocused"
                                        }]

                                    }]


                                }
                                ],
                                Children: [
                                {
                                    ParseType: Grid,
                                    Props: {
                                        HorizontalAlignment: HorizontalAlignment.Left,
                                        VerticalAlignment: VerticalAlignment.Top
                                    },
                                    Children: [
                                    {
                                        ParseType: Rectangle,
                                        Name: "Background",
                                        Props: {
                                            Width: 14,
                                            Height: 14,
                                            RadiusX: 1,
                                            RadiusY: 1,
                                            Stroke: new TemplateBindingMarkup("BorderBrush"),
                                            StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                            Fill: {
                                                ParseType: SolidColorBrush,
                                                Props: {
                                                    Color: Color.FromHex("#FFFFFFFF")
                                                }
                                            },
                                            Margin: new Thickness(1, 1, 1, 1)
                                        }
                                    },
                                    {
                                        ParseType: Rectangle,
                                        Name: "BackgroundOverlay",
                                        Props: {
                                            Fill: {
                                                ParseType: SolidColorBrush,
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
                                                ParseType: SolidColorBrush,
                                                Props: {
                                                    Color: Color.FromHex("#00000000")
                                                }
                                            }
                                        }
                                    },
                                    {
                                        ParseType: Rectangle,
                                        Name: "BoxMiddleBackground",
                                        Props: {
                                            Width: 10,
                                            Height: 10,
                                            RadiusX: 1,
                                            RadiusY: 1,
                                            Fill: new TemplateBindingMarkup("Background"),
                                            Stroke: {
                                                ParseType: SolidColorBrush,
                                                Props: {
                                                    Color: Color.FromHex("#00000000")
                                                }
                                            },
                                            StrokeThickness: 1
                                        }
                                    },
                                    {
                                        ParseType: Rectangle,
                                        Name: "BoxMiddle",
                                        Props: {
                                            Width: 10,
                                            Height: 10,
                                            RadiusX: 1,
                                            RadiusY: 1,
                                            StrokeThickness: 1,
                                            Stroke: {
                                                ParseType: LinearGradientBrush,
                                                Props: {
                                                    EndPoint: new Point(0.5, 1),
                                                    StartPoint: new Point(0.5, 0)
                                                },
                                                Children: [
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FFFFFFFF"),
                                                        Offset: 1
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FFFFFFFF"),
                                                        Offset: 0
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FFFFFFFF"),
                                                        Offset: 0.375
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FFFFFFFF"),
                                                        Offset: 0.375
                                                    }
                                                }]

                                            },
                                            Fill: {
                                                ParseType: LinearGradientBrush,
                                                Props: {
                                                    StartPoint: new Point(0.62, 0.15),
                                                    EndPoint: new Point(0.64, 0.88)
                                                },
                                                Children: [
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FFFFFFFF"),
                                                        Offset: 0.013
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#F9FFFFFF"),
                                                        Offset: 0.375
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#EAFFFFFF"),
                                                        Offset: 0.603
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#D8FFFFFF"),
                                                        Offset: 1
                                                    }
                                                }]

                                            }
                                        }
                                    },
                                    {
                                        ParseType: Rectangle,
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
                                        ParseType: Path,
                                        Name: "CheckIcon",
                                        Props: {
                                            Margin: new Thickness(1, 1, 0, 1.5),
                                            Fill: {
                                                ParseType: SolidColorBrush,
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
                                        ParseType: Rectangle,
                                        Name: "IndeterminateIcon",
                                        Props: {
                                            Height: 2,
                                            Fill: {
                                                ParseType: SolidColorBrush,
                                                Props: {
                                                    Color: Color.FromHex("#FF333333")
                                                }
                                            },
                                            Opacity: 0,
                                            Width: 6
                                        }
                                    },
                                    {
                                        ParseType: Rectangle,
                                        Name: "DisabledVisualElement",
                                        Props: {
                                            RadiusX: 1,
                                            RadiusY: 1,
                                            Width: 14,
                                            Height: 14,
                                            Opacity: 0,
                                            Fill: {
                                                ParseType: SolidColorBrush,
                                                Props: {
                                                    Color: Color.FromHex("#FFFFFFFF")
                                                }
                                            }
                                        }
                                    },
                                    {
                                        ParseType: Rectangle,
                                        Name: "ContentFocusVisualElement",
                                        Props: {
                                            RadiusX: 2,
                                            RadiusY: 2,
                                            Stroke: {
                                                ParseType: SolidColorBrush,
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
                                    ParseType: ContentPresenter,
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

            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: RadioButton
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RadioButton, "Background"),
                        Value: "#FF448DCA"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RadioButton, "Foreground"),
                        Value: "#FF000000"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RadioButton, "HorizontalContentAlignment"),
                        Value: "Left"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RadioButton, "VerticalContentAlignment"),
                        Value: "Top"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RadioButton, "Padding"),
                        Value: "4,1,0,0"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RadioButton, "BorderThickness"),
                        Value: "1"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RadioButton, "BorderBrush"),
                        Value: {
                            ParseType: LinearGradientBrush,
                            Props: {
                                EndPoint: new Point(0.5, 1),
                                StartPoint: new Point(0.5, 0)
                            },
                            Children: [
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FFA3AEB9"),
                                    Offset: 0
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF8399A9"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF718597"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF617584"),
                                    Offset: 1
                                }
                            }]

                        }
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RadioButton, "Template"),
                        Value: {
                            ParseType: ControlTemplate,
                            Props: {
                                TargetType: RadioButton
                            },
                            Content: {
                                ParseType: Grid,
                                Props: {
                                    ColumnDefinitions: [
                                    {
                                        ParseType: ColumnDefinition,
                                        Props: {
                                            Width: new GridLength(16, GridUnitType.Pixel)
                                        }
                                    },
                                    {
                                        ParseType: ColumnDefinition,
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
                                        ParseType: VisualStateGroup,
                                        Name: "CommonStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Normal"
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "MouseOver",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Pressed",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Stroke).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Stroke).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Stroke).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Stroke).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Disabled",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    }
                                                    ]
                                                }]

                                            }
                                        }]

                                    },
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "CheckStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Checked",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Unchecked"
                                        }]

                                    },
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "FocusStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Focused",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Unfocused"
                                        }]

                                    }]


                                }
                                ],
                                Children: [
                                {
                                    ParseType: Grid,
                                    Props: {
                                        HorizontalAlignment: HorizontalAlignment.Left,
                                        VerticalAlignment: VerticalAlignment.Top
                                    },
                                    Children: [
                                    {
                                        ParseType: Ellipse,
                                        Name: "Background",
                                        Props: {
                                            Width: 14,
                                            Height: 14,
                                            Stroke: new TemplateBindingMarkup("BorderBrush"),
                                            StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                            Fill: {
                                                ParseType: SolidColorBrush,
                                                Props: {
                                                    Color: Color.FromHex("#FFFFFFFF")
                                                }
                                            },
                                            Margin: new Thickness(1, 1, 1, 1)
                                        }
                                    },
                                    {
                                        ParseType: Ellipse,
                                        Name: "BackgroundOverlay",
                                        Props: {
                                            Fill: {
                                                ParseType: SolidColorBrush,
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
                                                ParseType: SolidColorBrush,
                                                Props: {
                                                    Color: Color.FromHex("#00000000")
                                                }
                                            }
                                        }
                                    },
                                    {
                                        ParseType: Ellipse,
                                        Name: "BoxMiddleBackground",
                                        Props: {
                                            Width: 10,
                                            Height: 10,
                                            Fill: new TemplateBindingMarkup("Background"),
                                            Stroke: {
                                                ParseType: SolidColorBrush,
                                                Props: {
                                                    Color: Color.FromHex("#00000000")
                                                }
                                            },
                                            StrokeThickness: 1
                                        }
                                    },
                                    {
                                        ParseType: Ellipse,
                                        Name: "BoxMiddle",
                                        Props: {
                                            Width: 10,
                                            Height: 10,
                                            StrokeThickness: 1,
                                            Stroke: {
                                                ParseType: LinearGradientBrush,
                                                Props: {
                                                    EndPoint: new Point(0.5, 1),
                                                    StartPoint: new Point(0.5, 0)
                                                },
                                                Children: [
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FFFFFFFF"),
                                                        Offset: 1
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FFFFFFFF"),
                                                        Offset: 0
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FFFFFFFF"),
                                                        Offset: 0.375
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FFFFFFFF"),
                                                        Offset: 0.375
                                                    }
                                                }]

                                            },
                                            Fill: {
                                                ParseType: LinearGradientBrush,
                                                Props: {
                                                    StartPoint: new Point(0.62, 0.15),
                                                    EndPoint: new Point(0.64, 0.88)
                                                },
                                                Children: [
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FFFFFFFF"),
                                                        Offset: 0.013
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#F9FFFFFF"),
                                                        Offset: 0.375
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#EAFFFFFF"),
                                                        Offset: 0.603
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#D8FFFFFF"),
                                                        Offset: 1
                                                    }
                                                }]

                                            }
                                        }
                                    },
                                    {
                                        ParseType: Ellipse,
                                        Name: "BoxMiddleLine",
                                        Props: {
                                            Width: 10,
                                            Height: 10,
                                            Stroke: {
                                                ParseType: SolidColorBrush,
                                                Props: {
                                                    Color: Color.FromHex("#FF333333")
                                                }
                                            },
                                            StrokeThickness: 1,
                                            Opacity: 0.2
                                        }
                                    },
                                    {
                                        ParseType: Ellipse,
                                        Name: "CheckIcon",
                                        Props: {
                                            Fill: {
                                                ParseType: SolidColorBrush,
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
                                        ParseType: Ellipse,
                                        Name: "DisabledVisualElement",
                                        Props: {
                                            Width: 14,
                                            Height: 14,
                                            Opacity: 0,
                                            Fill: {
                                                ParseType: SolidColorBrush,
                                                Props: {
                                                    Color: Color.FromHex("#FFFFFFFF")
                                                }
                                            }
                                        }
                                    },
                                    {
                                        ParseType: Ellipse,
                                        Name: "ContentFocusVisualElement",
                                        Props: {
                                            Stroke: {
                                                ParseType: SolidColorBrush,
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
                                    ParseType: ContentPresenter,
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

            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: ContentControl
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ContentControl, "Foreground"),
                        Value: "#FF000000"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ContentControl, "HorizontalContentAlignment"),
                        Value: "Left"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ContentControl, "VerticalContentAlignment"),
                        Value: "Top"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ContentControl, "Template"),
                        Value: {
                            ParseType: ControlTemplate,
                            Props: {
                                TargetType: ContentControl
                            },
                            Content: {
                                ParseType: ContentPresenter,
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

            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: ContentPresenter
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ContentPresenter, "HorizontalAlignment"),
                        Value: "Left"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ContentPresenter, "VerticalAlignment"),
                        Value: "Top"
                    }
                }]

            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: ListBox
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBox, "Padding"),
                        Value: "1"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBox, "Background"),
                        Value: "#FFFFFFFF"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBox, "Foreground"),
                        Value: "#FF000000"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBox, "HorizontalContentAlignment"),
                        Value: "Left"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBox, "VerticalContentAlignment"),
                        Value: "Top"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBox, "IsTabStop"),
                        Value: "False"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBox, "BorderThickness"),
                        Value: "1"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBox, "TabNavigation"),
                        Value: "Once"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "HorizontalScrollBarVisibility"),
                        Value: "Auto"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "VerticalScrollBarVisibility"),
                        Value: "Auto"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBox, "BorderBrush"),
                        Value: {
                            ParseType: LinearGradientBrush,
                            Props: {
                                EndPoint: new Point(0.5, 1),
                                StartPoint: new Point(0.5, 0)
                            },
                            Children: [
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FFA3AEB9"),
                                    Offset: 0
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF8399A9"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF718597"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF617584"),
                                    Offset: 1
                                }
                            }]

                        }
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBox, "Template"),
                        Value: {
                            ParseType: ControlTemplate,
                            Props: {
                                TargetType: ListBox
                            },
                            Content: {
                                ParseType: Grid,
                                Children: [
                                {
                                    ParseType: Border,
                                    Props: {
                                        CornerRadius: new CornerRadius(2, 2, 2, 2),
                                        BorderBrush: new TemplateBindingMarkup("BorderBrush"),
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness")
                                    },
                                    Content: {
                                        ParseType: ScrollViewer,
                                        Name: "ScrollViewer",
                                        Props: {
                                            Padding: new TemplateBindingMarkup("Padding"),
                                            Background: new TemplateBindingMarkup("Background"),
                                            BorderBrush: {
                                                ParseType: SolidColorBrush,
                                                Props: {
                                                    Color: Color.FromHex("#00FFFFFF")
                                                }
                                            },
                                            BorderThickness: new Thickness(0, 0, 0, 0),
                                            TabNavigation: new TemplateBindingMarkup("TabNavigation")
                                        },
                                        Content: {
                                            ParseType: ItemsPresenter
                                        }
                                    }
                                }]

                            }
                        }
                    }
                }]

            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: ListBoxItem
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBoxItem, "Padding"),
                        Value: "3"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBoxItem, "HorizontalContentAlignment"),
                        Value: "Left"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBoxItem, "VerticalContentAlignment"),
                        Value: "Top"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBoxItem, "Background"),
                        Value: "Transparent"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBoxItem, "BorderThickness"),
                        Value: "1"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBoxItem, "TabNavigation"),
                        Value: "Local"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBoxItem, "Template"),
                        Value: {
                            ParseType: ControlTemplate,
                            Props: {
                                TargetType: ListBoxItem
                            },
                            Content: {
                                ParseType: Grid,
                                Props: {
                                    Background: new TemplateBindingMarkup("Background")
                                },
                                AttachedProps: [{
                                    Owner: VisualStateManager,
                                    Prop: "VisualStateGroups",
                                    Value: [
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "CommonStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Normal"
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "MouseOver",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Disabled",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                }]

                                            }
                                        }]

                                    },
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "SelectionStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Unselected"
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Selected",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                }]

                                            }
                                        }]

                                    },
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "FocusStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Focused",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: ObjectAnimationUsingKeyFrames,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "FocusVisualElement"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        ParseType: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                            Value: Visibility.Visible
                                                        }
                                                    }]

                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Unfocused"
                                        }]

                                    }]


                                }
                                ],
                                Children: [
                                {
                                    ParseType: Rectangle,
                                    Name: "fillColor",
                                    Props: {
                                        Opacity: 0,
                                        Fill: {
                                            ParseType: SolidColorBrush,
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
                                    ParseType: Rectangle,
                                    Name: "fillColor2",
                                    Props: {
                                        Opacity: 0,
                                        Fill: {
                                            ParseType: SolidColorBrush,
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
                                    ParseType: ContentPresenter,
                                    Name: "contentPresenter",
                                    Props: {
                                        ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
                                        HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                        Margin: new TemplateBindingMarkup("Padding")
                                    },
                                    Content: new TemplateBindingMarkup("Content")
                                },
                                {
                                    ParseType: Rectangle,
                                    Name: "FocusVisualElement",
                                    Props: {
                                        Stroke: {
                                            ParseType: SolidColorBrush,
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

            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: Thumb
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Thumb, "Background"),
                        Value: "#FF1F3B53"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Thumb, "BorderThickness"),
                        Value: "1"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Thumb, "IsTabStop"),
                        Value: "False"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Thumb, "BorderBrush"),
                        Value: {
                            ParseType: LinearGradientBrush,
                            Props: {
                                EndPoint: new Point(0.5, 1),
                                StartPoint: new Point(0.5, 0)
                            },
                            Children: [
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FFA3AEB9"),
                                    Offset: 0
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF8399A9"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF718597"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF617584"),
                                    Offset: 1
                                }
                            }]

                        }
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Thumb, "Template"),
                        Value: {
                            ParseType: ControlTemplate,
                            Props: {
                                TargetType: Thumb
                            },
                            Content: {
                                ParseType: Grid,
                                AttachedProps: [{
                                    Owner: VisualStateManager,
                                    Prop: "VisualStateGroups",
                                    Value: [
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "CommonStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Normal"
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "MouseOver",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Pressed",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Border.Background).(SolidColorBrush.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Disabled",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                }]

                                            }
                                        }]

                                    },
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "FocusStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Focused",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Unfocused"
                                        }]

                                    }]


                                }
                                ],
                                Children: [
                                {
                                    ParseType: Border,
                                    Name: "Background",
                                    Props: {
                                        CornerRadius: new CornerRadius(2, 2, 2, 2),
                                        Background: {
                                            ParseType: SolidColorBrush,
                                            Props: {
                                                Color: Color.FromHex("#FFFFFFFF")
                                            }
                                        },
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        BorderBrush: new TemplateBindingMarkup("BorderBrush")
                                    },
                                    Content: {
                                        ParseType: Grid,
                                        Props: {
                                            Background: new TemplateBindingMarkup("Background"),
                                            Margin: new Thickness(1, 1, 1, 1)
                                        },
                                        Children: [
                                        {
                                            ParseType: Border,
                                            Name: "BackgroundAnimation",
                                            Props: {
                                                Opacity: 0,
                                                Background: {
                                                    ParseType: SolidColorBrush,
                                                    Props: {
                                                        Color: Color.FromHex("#FF448DCA")
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            ParseType: Rectangle,
                                            Name: "BackgroundGradient",
                                            Props: {
                                                Fill: {
                                                    ParseType: LinearGradientBrush,
                                                    Props: {
                                                        StartPoint: new Point(0.7, 0),
                                                        EndPoint: new Point(0.7, 1)
                                                    },
                                                    Children: [
                                                    {
                                                        ParseType: GradientStop,
                                                        Props: {
                                                            Color: Color.FromHex("#FFFFFFFF"),
                                                            Offset: 0
                                                        }
                                                    },
                                                    {
                                                        ParseType: GradientStop,
                                                        Props: {
                                                            Color: Color.FromHex("#F9FFFFFF"),
                                                            Offset: 0.375
                                                        }
                                                    },
                                                    {
                                                        ParseType: GradientStop,
                                                        Props: {
                                                            Color: Color.FromHex("#E5FFFFFF"),
                                                            Offset: 0.625
                                                        }
                                                    },
                                                    {
                                                        ParseType: GradientStop,
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
                                    ParseType: Rectangle,
                                    Name: "DisabledVisualElement",
                                    Props: {
                                        RadiusX: 2,
                                        RadiusY: 2,
                                        Fill: {
                                            ParseType: SolidColorBrush,
                                            Props: {
                                                Color: Color.FromHex("#FFFFFFFF")
                                            }
                                        },
                                        Opacity: 0,
                                        IsHitTestVisible: false
                                    }
                                },
                                {
                                    ParseType: Rectangle,
                                    Name: "FocusVisualElement",
                                    Props: {
                                        RadiusX: 1,
                                        RadiusY: 1,
                                        Margin: new Thickness(1, 1, 1, 1),
                                        Stroke: {
                                            ParseType: SolidColorBrush,
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

            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: ScrollBar
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollBar, "MinWidth"),
                        Value: "17"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollBar, "MinHeight"),
                        Value: "17"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollBar, "IsTabStop"),
                        Value: "False"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollBar, "Template"),
                        Value: {
                            ParseType: ControlTemplate,
                            Props: {
                                TargetType: ScrollBar
                            },
                            Content: {
                                ParseType: Grid,
                                Name: "Root",
                                Props: {
                                    Resources: {
                                        ParseType: ResourceDictionary,
                                        Children: [
                                        {
                                            Key: "RepeatButtonTemplate", Value: {
                                                ParseType: ControlTemplate,
                                                Props: {
                                                    TargetType: RepeatButton
                                                },
                                                Content: {
                                                    ParseType: Grid,
                                                    Name: "Root",
                                                    Props: {
                                                        Background: {
                                                            ParseType: SolidColorBrush,
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
                                                            ParseType: VisualStateGroup,
                                                            Name: "CommonStates",
                                                            Children: [
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "Normal"
                                                            }]

                                                        }]


                                                    }
                                                    ]
                                                }
                                            }
                                        },
                                        {
                                            Key: "HorizontalIncrementTemplate", Value: {
                                                ParseType: ControlTemplate,
                                                Props: {
                                                    TargetType: RepeatButton
                                                },
                                                Content: {
                                                    ParseType: Grid,
                                                    Name: "Root",
                                                    AttachedProps: [{
                                                        Owner: VisualStateManager,
                                                        Prop: "VisualStateGroups",
                                                        Value: [
                                                        {
                                                            ParseType: VisualStateGroup,
                                                            Name: "CommonStates",
                                                            Children: [
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "Normal"
                                                            },
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "MouseOver",
                                                                Content: {
                                                                    ParseType: Storyboard,
                                                                    Children: [
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    }]

                                                                }
                                                            },
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "Pressed",
                                                                Content: {
                                                                    ParseType: Storyboard,
                                                                    Children: [
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(UIElement.Opacity)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    }]

                                                                }
                                                            },
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "Disabled",
                                                                Content: {
                                                                    ParseType: Storyboard,
                                                                    Children: [
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

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
                                                        ParseType: Rectangle,
                                                        Name: "Background",
                                                        Props: {
                                                            Opacity: 0,
                                                            RadiusX: 2,
                                                            RadiusY: 2,
                                                            Fill: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#FF1F3B53")
                                                                }
                                                            },
                                                            StrokeThickness: 1,
                                                            Stroke: {
                                                                ParseType: LinearGradientBrush,
                                                                Props: {
                                                                    EndPoint: new Point(0.5, 1),
                                                                    StartPoint: new Point(0.5, 0)
                                                                },
                                                                Children: [
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FF647480"),
                                                                        Offset: 1
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FFAEB7BF"),
                                                                        Offset: 0
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FF919EA7"),
                                                                        Offset: 0.35
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FF7A8A99"),
                                                                        Offset: 0.35
                                                                    }
                                                                }]

                                                            }
                                                        }
                                                    },
                                                    {
                                                        ParseType: Rectangle,
                                                        Name: "BackgroundAnimation",
                                                        Props: {
                                                            Opacity: 0,
                                                            RadiusX: 2,
                                                            RadiusY: 2,
                                                            Fill: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#FF448DCA")
                                                                }
                                                            },
                                                            StrokeThickness: 1,
                                                            Stroke: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#00000000")
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        ParseType: Rectangle,
                                                        Name: "BackgroundGradient",
                                                        Props: {
                                                            Opacity: 0,
                                                            RadiusX: 1,
                                                            RadiusY: 1,
                                                            StrokeThickness: 1,
                                                            Margin: new Thickness(1, 1, 1, 1),
                                                            Stroke: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#FFFFFFFF")
                                                                }
                                                            },
                                                            Fill: {
                                                                ParseType: LinearGradientBrush,
                                                                Props: {
                                                                    StartPoint: new Point(0.7, 0),
                                                                    EndPoint: new Point(0.7, 1)
                                                                },
                                                                Children: [
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FFFFFFFF"),
                                                                        Offset: 0.013
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#F9FFFFFF"),
                                                                        Offset: 0.375
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#E5FFFFFF"),
                                                                        Offset: 0.603
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#C6FFFFFF"),
                                                                        Offset: 1
                                                                    }
                                                                }]

                                                            }
                                                        }
                                                    },
                                                    {
                                                        ParseType: Rectangle,
                                                        Name: "Highlight",
                                                        Props: {
                                                            Opacity: 0,
                                                            RadiusX: 1,
                                                            RadiusY: 1,
                                                            IsHitTestVisible: false,
                                                            Stroke: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#FF6DBDD1")
                                                                }
                                                            },
                                                            StrokeThickness: 1,
                                                            Margin: new Thickness(1, 1, 1, 1)
                                                        }
                                                    },
                                                    {
                                                        ParseType: Path,
                                                        Props: {
                                                            Stretch: Stretch.Uniform,
                                                            Height: 8,
                                                            Width: 4,
                                                            Data: "F1 M 511.047,352.682L 511.047,342.252L 517.145,347.467L 511.047,352.682 Z",
                                                            Fill: {
                                                                ParseType: SolidColorBrush,
                                                                Name: "ButtonColor",
                                                                Props: {
                                                                    Color: Color.FromHex("#FF333333")
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        ParseType: Rectangle,
                                                        Name: "DisabledElement",
                                                        Props: {
                                                            Opacity: 0,
                                                            RadiusX: 2,
                                                            RadiusY: 2,
                                                            Fill: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#FFFFFFFF")
                                                                }
                                                            }
                                                        }
                                                    }]

                                                }
                                            }
                                        },
                                        {
                                            Key: "HorizontalDecrementTemplate", Value: {
                                                ParseType: ControlTemplate,
                                                Props: {
                                                    TargetType: RepeatButton
                                                },
                                                Content: {
                                                    ParseType: Grid,
                                                    Name: "Root",
                                                    AttachedProps: [{
                                                        Owner: VisualStateManager,
                                                        Prop: "VisualStateGroups",
                                                        Value: [
                                                        {
                                                            ParseType: VisualStateGroup,
                                                            Name: "CommonStates",
                                                            Children: [
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "Normal"
                                                            },
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "MouseOver",
                                                                Content: {
                                                                    ParseType: Storyboard,
                                                                    Children: [
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    }]

                                                                }
                                                            },
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "Pressed",
                                                                Content: {
                                                                    ParseType: Storyboard,
                                                                    Children: [
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(UIElement.Opacity)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    }]

                                                                }
                                                            },
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "Disabled",
                                                                Content: {
                                                                    ParseType: Storyboard,
                                                                    Children: [
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

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
                                                        ParseType: Rectangle,
                                                        Name: "Background",
                                                        Props: {
                                                            Opacity: 0,
                                                            RadiusX: 2,
                                                            RadiusY: 2,
                                                            Fill: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#FF1F3B53")
                                                                }
                                                            },
                                                            StrokeThickness: 1,
                                                            Stroke: {
                                                                ParseType: LinearGradientBrush,
                                                                Props: {
                                                                    EndPoint: new Point(0.5, 1),
                                                                    StartPoint: new Point(0.5, 0)
                                                                },
                                                                Children: [
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FF647480"),
                                                                        Offset: 1
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FFAEB7BF"),
                                                                        Offset: 0
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FF919EA7"),
                                                                        Offset: 0.35
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FF7A8A99"),
                                                                        Offset: 0.35
                                                                    }
                                                                }]

                                                            }
                                                        }
                                                    },
                                                    {
                                                        ParseType: Rectangle,
                                                        Name: "BackgroundMouseOver",
                                                        Props: {
                                                            Opacity: 0,
                                                            RadiusX: 2,
                                                            RadiusY: 2,
                                                            Fill: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#FF448DCA")
                                                                }
                                                            },
                                                            StrokeThickness: 1,
                                                            Stroke: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#00000000")
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        ParseType: Rectangle,
                                                        Name: "BackgroundPressed",
                                                        Props: {
                                                            Opacity: 0,
                                                            RadiusX: 2,
                                                            RadiusY: 2,
                                                            Fill: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#FF448DCA")
                                                                }
                                                            },
                                                            StrokeThickness: 1,
                                                            Stroke: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#00000000")
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        ParseType: Rectangle,
                                                        Name: "BackgroundGradient",
                                                        Props: {
                                                            Opacity: 0,
                                                            RadiusX: 1,
                                                            RadiusY: 1,
                                                            StrokeThickness: 1,
                                                            Margin: new Thickness(1, 1, 1, 1),
                                                            Stroke: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#FFFFFFFF")
                                                                }
                                                            },
                                                            Fill: {
                                                                ParseType: LinearGradientBrush,
                                                                Props: {
                                                                    StartPoint: new Point(0.7, 0),
                                                                    EndPoint: new Point(0.7, 1)
                                                                },
                                                                Children: [
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FFFFFFFF"),
                                                                        Offset: 0.013
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#F9FFFFFF"),
                                                                        Offset: 0.375
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#E5FFFFFF"),
                                                                        Offset: 0.603
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#C6FFFFFF"),
                                                                        Offset: 1
                                                                    }
                                                                }]

                                                            }
                                                        }
                                                    },
                                                    {
                                                        ParseType: Rectangle,
                                                        Name: "Highlight",
                                                        Props: {
                                                            Opacity: 0,
                                                            RadiusX: 1,
                                                            RadiusY: 1,
                                                            IsHitTestVisible: false,
                                                            Stroke: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#FF6DBDD1")
                                                                }
                                                            },
                                                            StrokeThickness: 1,
                                                            Margin: new Thickness(1, 1, 1, 1)
                                                        }
                                                    },
                                                    {
                                                        ParseType: Path,
                                                        Props: {
                                                            Stretch: Stretch.Uniform,
                                                            Height: 8,
                                                            Width: 4,
                                                            Data: "F1 M 110.692,342.252L 110.692,352.682L 104.594,347.467L 110.692,342.252 Z",
                                                            Fill: {
                                                                ParseType: SolidColorBrush,
                                                                Name: "ButtonColor",
                                                                Props: {
                                                                    Color: Color.FromHex("#FF333333")
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        ParseType: Rectangle,
                                                        Name: "DisabledElement",
                                                        Props: {
                                                            Opacity: 0,
                                                            RadiusX: 2,
                                                            RadiusY: 2,
                                                            Fill: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#FFFFFFFF")
                                                                }
                                                            }
                                                        }
                                                    }]

                                                }
                                            }
                                        },
                                        {
                                            Key: "VerticalIncrementTemplate", Value: {
                                                ParseType: ControlTemplate,
                                                Props: {
                                                    TargetType: RepeatButton
                                                },
                                                Content: {
                                                    ParseType: Grid,
                                                    Name: "Root",
                                                    AttachedProps: [{
                                                        Owner: VisualStateManager,
                                                        Prop: "VisualStateGroups",
                                                        Value: [
                                                        {
                                                            ParseType: VisualStateGroup,
                                                            Name: "CommonStates",
                                                            Children: [
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "Normal"
                                                            },
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "MouseOver",
                                                                Content: {
                                                                    ParseType: Storyboard,
                                                                    Children: [
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    }]

                                                                }
                                                            },
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "Pressed",
                                                                Content: {
                                                                    ParseType: Storyboard,
                                                                    Children: [
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(UIElement.Opacity)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    }]

                                                                }
                                                            },
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "Disabled",
                                                                Content: {
                                                                    ParseType: Storyboard,
                                                                    Children: [
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

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
                                                        ParseType: Rectangle,
                                                        Name: "Background",
                                                        Props: {
                                                            Opacity: 0,
                                                            RadiusX: 2,
                                                            RadiusY: 2,
                                                            Fill: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#FF1F3B53")
                                                                }
                                                            },
                                                            StrokeThickness: 1,
                                                            Stroke: {
                                                                ParseType: LinearGradientBrush,
                                                                Props: {
                                                                    EndPoint: new Point(1, 0.5),
                                                                    StartPoint: new Point(0, 0.5)
                                                                },
                                                                Children: [
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FF647480"),
                                                                        Offset: 1
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FFAEB7BF"),
                                                                        Offset: 0
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FF919EA7"),
                                                                        Offset: 0.35
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FF7A8A99"),
                                                                        Offset: 0.35
                                                                    }
                                                                }]

                                                            }
                                                        }
                                                    },
                                                    {
                                                        ParseType: Rectangle,
                                                        Name: "BackgroundMouseOver",
                                                        Props: {
                                                            Opacity: 0,
                                                            RadiusX: 2,
                                                            RadiusY: 2,
                                                            Fill: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#FF448DCA")
                                                                }
                                                            },
                                                            StrokeThickness: 1,
                                                            Stroke: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#00000000")
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        ParseType: Rectangle,
                                                        Name: "BackgroundPressed",
                                                        Props: {
                                                            Opacity: 0,
                                                            RadiusX: 2,
                                                            RadiusY: 2,
                                                            Fill: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#FF448DCA")
                                                                }
                                                            },
                                                            StrokeThickness: 1,
                                                            Stroke: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#00000000")
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        ParseType: Rectangle,
                                                        Name: "BackgroundGradient",
                                                        Props: {
                                                            Opacity: 0,
                                                            RadiusX: 1,
                                                            RadiusY: 1,
                                                            StrokeThickness: 1,
                                                            Margin: new Thickness(1, 1, 1, 1),
                                                            Stroke: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#FFFFFFFF")
                                                                }
                                                            },
                                                            Fill: {
                                                                ParseType: LinearGradientBrush,
                                                                Props: {
                                                                    StartPoint: new Point(0, 0.7),
                                                                    EndPoint: new Point(1, 0.7)
                                                                },
                                                                Children: [
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FFFFFFFF"),
                                                                        Offset: 0.013
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#F9FFFFFF"),
                                                                        Offset: 0.375
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#E5FFFFFF"),
                                                                        Offset: 0.603
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#C6FFFFFF"),
                                                                        Offset: 1
                                                                    }
                                                                }]

                                                            }
                                                        }
                                                    },
                                                    {
                                                        ParseType: Rectangle,
                                                        Name: "Highlight",
                                                        Props: {
                                                            Opacity: 0,
                                                            RadiusX: 1,
                                                            RadiusY: 1,
                                                            IsHitTestVisible: false,
                                                            Stroke: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#FF6DBDD1")
                                                                }
                                                            },
                                                            StrokeThickness: 1,
                                                            Margin: new Thickness(1, 1, 1, 1)
                                                        }
                                                    },
                                                    {
                                                        ParseType: Path,
                                                        Props: {
                                                            Stretch: Stretch.Uniform,
                                                            Height: 4,
                                                            Width: 8,
                                                            Data: "F1 M 531.107,321.943L 541.537,321.943L 536.322,328.042L 531.107,321.943 Z",
                                                            Fill: {
                                                                ParseType: SolidColorBrush,
                                                                Name: "ButtonColor",
                                                                Props: {
                                                                    Color: Color.FromHex("#FF333333")
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        ParseType: Rectangle,
                                                        Name: "DisabledElement",
                                                        Props: {
                                                            Opacity: 0,
                                                            RadiusX: 2,
                                                            RadiusY: 2,
                                                            Fill: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#FFFFFFFF")
                                                                }
                                                            }
                                                        }
                                                    }]

                                                }
                                            }
                                        },
                                        {
                                            Key: "VerticalDecrementTemplate", Value: {
                                                ParseType: ControlTemplate,
                                                Props: {
                                                    TargetType: RepeatButton
                                                },
                                                Content: {
                                                    ParseType: Grid,
                                                    Name: "Root",
                                                    AttachedProps: [{
                                                        Owner: VisualStateManager,
                                                        Prop: "VisualStateGroups",
                                                        Value: [
                                                        {
                                                            ParseType: VisualStateGroup,
                                                            Name: "CommonStates",
                                                            Children: [
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "Normal"
                                                            },
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "MouseOver",
                                                                Content: {
                                                                    ParseType: Storyboard,
                                                                    Children: [
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    }]

                                                                }
                                                            },
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "Pressed",
                                                                Content: {
                                                                    ParseType: Storyboard,
                                                                    Children: [
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(UIElement.Opacity)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    }]

                                                                }
                                                            },
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "Disabled",
                                                                Content: {
                                                                    ParseType: Storyboard,
                                                                    Children: [
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

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
                                                        ParseType: Rectangle,
                                                        Name: "Background",
                                                        Props: {
                                                            Opacity: 0,
                                                            RadiusX: 2,
                                                            RadiusY: 2,
                                                            Fill: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#FF1F3B53")
                                                                }
                                                            },
                                                            StrokeThickness: 1,
                                                            Stroke: {
                                                                ParseType: LinearGradientBrush,
                                                                Props: {
                                                                    EndPoint: new Point(1, 0.5),
                                                                    StartPoint: new Point(0, 0.5)
                                                                },
                                                                Children: [
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FF647480"),
                                                                        Offset: 1
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FFAEB7BF"),
                                                                        Offset: 0
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FF919EA7"),
                                                                        Offset: 0.35
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FF7A8A99"),
                                                                        Offset: 0.35
                                                                    }
                                                                }]

                                                            }
                                                        }
                                                    },
                                                    {
                                                        ParseType: Rectangle,
                                                        Name: "BackgroundMouseOver",
                                                        Props: {
                                                            Opacity: 0,
                                                            RadiusX: 2,
                                                            RadiusY: 2,
                                                            Fill: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#FF448DCA")
                                                                }
                                                            },
                                                            StrokeThickness: 1,
                                                            Stroke: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#00000000")
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        ParseType: Rectangle,
                                                        Name: "BackgroundPressed",
                                                        Props: {
                                                            Opacity: 0,
                                                            RadiusX: 2,
                                                            RadiusY: 2,
                                                            Fill: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#FF448DCA")
                                                                }
                                                            },
                                                            StrokeThickness: 1,
                                                            Stroke: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#00000000")
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        ParseType: Rectangle,
                                                        Name: "BackgroundGradient",
                                                        Props: {
                                                            Opacity: 0,
                                                            RadiusX: 1,
                                                            RadiusY: 1,
                                                            StrokeThickness: 1,
                                                            Margin: new Thickness(1, 1, 1, 1),
                                                            Stroke: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#FFFFFFFF")
                                                                }
                                                            },
                                                            Fill: {
                                                                ParseType: LinearGradientBrush,
                                                                Props: {
                                                                    StartPoint: new Point(0, 0.7),
                                                                    EndPoint: new Point(1, 0.7)
                                                                },
                                                                Children: [
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FFFFFFFF"),
                                                                        Offset: 0.013
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#F9FFFFFF"),
                                                                        Offset: 0.375
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#E5FFFFFF"),
                                                                        Offset: 0.603
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: GradientStop,
                                                                    Props: {
                                                                        Color: Color.FromHex("#C6FFFFFF"),
                                                                        Offset: 1
                                                                    }
                                                                }]

                                                            }
                                                        }
                                                    },
                                                    {
                                                        ParseType: Rectangle,
                                                        Name: "Highlight",
                                                        Props: {
                                                            Opacity: 0,
                                                            RadiusX: 1,
                                                            RadiusY: 1,
                                                            IsHitTestVisible: false,
                                                            Stroke: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#FF6DBDD1")
                                                                }
                                                            },
                                                            StrokeThickness: 1,
                                                            Margin: new Thickness(1, 1, 1, 1)
                                                        }
                                                    },
                                                    {
                                                        ParseType: Path,
                                                        Props: {
                                                            Stretch: Stretch.Uniform,
                                                            Height: 4,
                                                            Width: 8,
                                                            Data: "F1 M 541.537,173.589L 531.107,173.589L 536.322,167.49L 541.537,173.589 Z",
                                                            Fill: {
                                                                ParseType: SolidColorBrush,
                                                                Name: "ButtonColor",
                                                                Props: {
                                                                    Color: Color.FromHex("#FF333333")
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        ParseType: Rectangle,
                                                        Name: "DisabledElement",
                                                        Props: {
                                                            Opacity: 0,
                                                            RadiusX: 2,
                                                            RadiusY: 2,
                                                            Fill: {
                                                                ParseType: SolidColorBrush,
                                                                Props: {
                                                                    Color: Color.FromHex("#FFFFFFFF")
                                                                }
                                                            }
                                                        }
                                                    }]

                                                }
                                            }
                                        },
                                        {
                                            Key: "VerticalThumbTemplate", Value: {
                                                ParseType: ControlTemplate,
                                                Props: {
                                                    TargetType: Thumb
                                                },
                                                Content: {
                                                    ParseType: Grid,
                                                    AttachedProps: [{
                                                        Owner: VisualStateManager,
                                                        Prop: "VisualStateGroups",
                                                        Value: [
                                                        {
                                                            ParseType: VisualStateGroup,
                                                            Name: "CommonStates",
                                                            Children: [
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "Normal"
                                                            },
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "MouseOver",
                                                                Content: {
                                                                    ParseType: Storyboard,
                                                                    Children: [
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    }]

                                                                }
                                                            },
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "Pressed",
                                                                Content: {
                                                                    ParseType: Storyboard,
                                                                    Children: [
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(UIElement.Opacity)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    }]

                                                                }
                                                            },
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "Disabled",
                                                                Content: {
                                                                    ParseType: Storyboard,
                                                                    Children: [
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

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
                                                        ParseType: Grid,
                                                        Name: "ThumbVisual",
                                                        Props: {
                                                            Margin: new Thickness(1, 0, 1, 0)
                                                        },
                                                        Children: [
                                                        {
                                                            ParseType: Rectangle,
                                                            Name: "Background",
                                                            Props: {
                                                                RadiusX: 2,
                                                                RadiusY: 2,
                                                                Fill: {
                                                                    ParseType: SolidColorBrush,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FF1F3B53")
                                                                    }
                                                                },
                                                                StrokeThickness: 1,
                                                                Stroke: {
                                                                    ParseType: LinearGradientBrush,
                                                                    Props: {
                                                                        EndPoint: new Point(1, 0.5),
                                                                        StartPoint: new Point(0, 0.5)
                                                                    },
                                                                    Children: [
                                                                    {
                                                                        ParseType: GradientStop,
                                                                        Props: {
                                                                            Color: Color.FromHex("#FF818F99"),
                                                                            Offset: 1
                                                                        }
                                                                    },
                                                                    {
                                                                        ParseType: GradientStop,
                                                                        Props: {
                                                                            Color: Color.FromHex("#FFC2C9CE"),
                                                                            Offset: 0
                                                                        }
                                                                    },
                                                                    {
                                                                        ParseType: GradientStop,
                                                                        Props: {
                                                                            Color: Color.FromHex("#FFB3BBC1"),
                                                                            Offset: 0.35
                                                                        }
                                                                    },
                                                                    {
                                                                        ParseType: GradientStop,
                                                                        Props: {
                                                                            Color: Color.FromHex("#FF96A4B1"),
                                                                            Offset: 0.35
                                                                        }
                                                                    }]

                                                                }
                                                            }
                                                        },
                                                        {
                                                            ParseType: Rectangle,
                                                            Name: "BackgroundMouseOver",
                                                            Props: {
                                                                Opacity: 0,
                                                                RadiusX: 2,
                                                                RadiusY: 2,
                                                                Fill: {
                                                                    ParseType: SolidColorBrush,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FF448DCA")
                                                                    }
                                                                },
                                                                StrokeThickness: 1,
                                                                Stroke: {
                                                                    ParseType: SolidColorBrush,
                                                                    Props: {
                                                                        Color: Color.FromHex("#00000000")
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {
                                                            ParseType: Rectangle,
                                                            Name: "BackgroundPressed",
                                                            Props: {
                                                                Opacity: 0,
                                                                RadiusX: 2,
                                                                RadiusY: 2,
                                                                Fill: {
                                                                    ParseType: SolidColorBrush,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FF448DCA")
                                                                    }
                                                                },
                                                                StrokeThickness: 1,
                                                                Stroke: {
                                                                    ParseType: SolidColorBrush,
                                                                    Props: {
                                                                        Color: Color.FromHex("#00000000")
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {
                                                            ParseType: Rectangle,
                                                            Name: "BackgroundGradient",
                                                            Props: {
                                                                RadiusX: 1,
                                                                RadiusY: 1,
                                                                StrokeThickness: 1,
                                                                Margin: new Thickness(1, 1, 1, 1),
                                                                Stroke: {
                                                                    ParseType: SolidColorBrush,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FFFFFFFF")
                                                                    }
                                                                },
                                                                Fill: {
                                                                    ParseType: LinearGradientBrush,
                                                                    Props: {
                                                                        StartPoint: new Point(0, 0.7),
                                                                        EndPoint: new Point(1, 0.7)
                                                                    },
                                                                    Children: [
                                                                    {
                                                                        ParseType: GradientStop,
                                                                        Props: {
                                                                            Color: Color.FromHex("#FFFFFFFF"),
                                                                            Offset: 0
                                                                        }
                                                                    },
                                                                    {
                                                                        ParseType: GradientStop,
                                                                        Props: {
                                                                            Color: Color.FromHex("#F9FFFFFF"),
                                                                            Offset: 0.375
                                                                        }
                                                                    },
                                                                    {
                                                                        ParseType: GradientStop,
                                                                        Props: {
                                                                            Color: Color.FromHex("#E5FFFFFF"),
                                                                            Offset: 0.6
                                                                        }
                                                                    },
                                                                    {
                                                                        ParseType: GradientStop,
                                                                        Props: {
                                                                            Color: Color.FromHex("#C6FFFFFF"),
                                                                            Offset: 1
                                                                        }
                                                                    }]

                                                                }
                                                            }
                                                        },
                                                        {
                                                            ParseType: Rectangle,
                                                            Name: "Highlight",
                                                            Props: {
                                                                RadiusX: 1,
                                                                RadiusY: 1,
                                                                Opacity: 0,
                                                                IsHitTestVisible: false,
                                                                Stroke: {
                                                                    ParseType: SolidColorBrush,
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
                                            }
                                        },
                                        {
                                            Key: "HorizontalThumbTemplate", Value: {
                                                ParseType: ControlTemplate,
                                                Props: {
                                                    TargetType: Thumb
                                                },
                                                Content: {
                                                    ParseType: Grid,
                                                    AttachedProps: [{
                                                        Owner: VisualStateManager,
                                                        Prop: "VisualStateGroups",
                                                        Value: [
                                                        {
                                                            ParseType: VisualStateGroup,
                                                            Name: "CommonStates",
                                                            Children: [
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "Normal"
                                                            },
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "MouseOver",
                                                                Content: {
                                                                    ParseType: Storyboard,
                                                                    Children: [
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    }]

                                                                }
                                                            },
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "Pressed",
                                                                Content: {
                                                                    ParseType: Storyboard,
                                                                    Children: [
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(UIElement.Opacity)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    },
                                                                    {
                                                                        ParseType: ColorAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

                                                                        }
                                                                        ]
                                                                    }]

                                                                }
                                                            },
                                                            {
                                                                ParseType: VisualState,
                                                                Name: "Disabled",
                                                                Content: {
                                                                    ParseType: Storyboard,
                                                                    Children: [
                                                                    {
                                                                        ParseType: DoubleAnimation,
                                                                        Props: {
                                                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                            Value: new PropertyPath("Opacity")

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
                                                        ParseType: Grid,
                                                        Name: "ThumbVisual",
                                                        Props: {
                                                            Margin: new Thickness(0, 1, 0, 1)
                                                        },
                                                        Children: [
                                                        {
                                                            ParseType: Rectangle,
                                                            Name: "Background",
                                                            Props: {
                                                                RadiusX: 2,
                                                                RadiusY: 2,
                                                                Fill: {
                                                                    ParseType: SolidColorBrush,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FF1F3B53")
                                                                    }
                                                                },
                                                                StrokeThickness: 1,
                                                                Stroke: {
                                                                    ParseType: LinearGradientBrush,
                                                                    Props: {
                                                                        EndPoint: new Point(0.5, 1),
                                                                        StartPoint: new Point(0.5, 0)
                                                                    },
                                                                    Children: [
                                                                    {
                                                                        ParseType: GradientStop,
                                                                        Props: {
                                                                            Color: Color.FromHex("#FF818F99"),
                                                                            Offset: 1
                                                                        }
                                                                    },
                                                                    {
                                                                        ParseType: GradientStop,
                                                                        Props: {
                                                                            Color: Color.FromHex("#FFC2C9CE"),
                                                                            Offset: 0
                                                                        }
                                                                    },
                                                                    {
                                                                        ParseType: GradientStop,
                                                                        Props: {
                                                                            Color: Color.FromHex("#FFB3BBC1"),
                                                                            Offset: 0.35
                                                                        }
                                                                    },
                                                                    {
                                                                        ParseType: GradientStop,
                                                                        Props: {
                                                                            Color: Color.FromHex("#FF96A4B1"),
                                                                            Offset: 0.35
                                                                        }
                                                                    }]

                                                                }
                                                            }
                                                        },
                                                        {
                                                            ParseType: Rectangle,
                                                            Name: "BackgroundMouseOver",
                                                            Props: {
                                                                Opacity: 0,
                                                                RadiusX: 2,
                                                                RadiusY: 2,
                                                                Fill: {
                                                                    ParseType: SolidColorBrush,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FF448DCA")
                                                                    }
                                                                },
                                                                StrokeThickness: 1,
                                                                Stroke: {
                                                                    ParseType: SolidColorBrush,
                                                                    Props: {
                                                                        Color: Color.FromHex("#00000000")
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {
                                                            ParseType: Rectangle,
                                                            Name: "BackgroundPressed",
                                                            Props: {
                                                                Opacity: 0,
                                                                RadiusX: 2,
                                                                RadiusY: 2,
                                                                Fill: {
                                                                    ParseType: SolidColorBrush,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FF448DCA")
                                                                    }
                                                                },
                                                                StrokeThickness: 1,
                                                                Stroke: {
                                                                    ParseType: SolidColorBrush,
                                                                    Props: {
                                                                        Color: Color.FromHex("#00000000")
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        {
                                                            ParseType: Rectangle,
                                                            Name: "BackgroundGradient",
                                                            Props: {
                                                                RadiusX: 1,
                                                                RadiusY: 1,
                                                                StrokeThickness: 1,
                                                                Margin: new Thickness(1, 1, 1, 1),
                                                                Stroke: {
                                                                    ParseType: SolidColorBrush,
                                                                    Props: {
                                                                        Color: Color.FromHex("#FFFFFFFF")
                                                                    }
                                                                },
                                                                Fill: {
                                                                    ParseType: LinearGradientBrush,
                                                                    Props: {
                                                                        StartPoint: new Point(0.7, 0),
                                                                        EndPoint: new Point(0.7, 1)
                                                                    },
                                                                    Children: [
                                                                    {
                                                                        ParseType: GradientStop,
                                                                        Props: {
                                                                            Color: Color.FromHex("#FFFFFFFF"),
                                                                            Offset: 0.013
                                                                        }
                                                                    },
                                                                    {
                                                                        ParseType: GradientStop,
                                                                        Props: {
                                                                            Color: Color.FromHex("#F9FFFFFF"),
                                                                            Offset: 0.375
                                                                        }
                                                                    },
                                                                    {
                                                                        ParseType: GradientStop,
                                                                        Props: {
                                                                            Color: Color.FromHex("#E5FFFFFF"),
                                                                            Offset: 0.603
                                                                        }
                                                                    },
                                                                    {
                                                                        ParseType: GradientStop,
                                                                        Props: {
                                                                            Color: Color.FromHex("#C6FFFFFF"),
                                                                            Offset: 1
                                                                        }
                                                                    }]

                                                                }
                                                            }
                                                        },
                                                        {
                                                            ParseType: Rectangle,
                                                            Name: "Highlight",
                                                            Props: {
                                                                RadiusX: 1,
                                                                RadiusY: 1,
                                                                Opacity: 0,
                                                                IsHitTestVisible: false,
                                                                Stroke: {
                                                                    ParseType: SolidColorBrush,
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
                                            }
                                        }]
                                    }
                                },
                                AttachedProps: [{
                                    Owner: VisualStateManager,
                                    Prop: "VisualStateGroups",
                                    Value: [
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "CommonStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Normal"
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "MouseOver"
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Disabled",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        To: 0.5,
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "Root"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

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
                                    ParseType: Grid,
                                    Name: "HorizontalRoot",
                                    Props: {
                                        ColumnDefinitions: [
                                        {
                                            ParseType: ColumnDefinition,
                                            Props: {
                                                Width: new GridLength(1, GridUnitType.Auto)
                                            }
                                        },
                                        {
                                            ParseType: ColumnDefinition,
                                            Props: {
                                                Width: new GridLength(1, GridUnitType.Auto)
                                            }
                                        },
                                        {
                                            ParseType: ColumnDefinition,
                                            Props: {
                                                Width: new GridLength(1, GridUnitType.Auto)
                                            }
                                        },
                                        {
                                            ParseType: ColumnDefinition,
                                            Props: {
                                                Width: new GridLength(1, GridUnitType.Star)
                                            }
                                        },
                                        {
                                            ParseType: ColumnDefinition,
                                            Props: {
                                                Width: new GridLength(1, GridUnitType.Auto)
                                            }
                                        }]

                                    },
                                    Children: [
                                    {
                                        ParseType: Rectangle,
                                        Props: {
                                            RadiusX: 1,
                                            RadiusY: 1,
                                            StrokeThickness: 1,
                                            Stroke: {
                                                ParseType: SolidColorBrush,
                                                Props: {
                                                    Color: Color.FromHex("#00000000")
                                                }
                                            },
                                            Fill: {
                                                ParseType: LinearGradientBrush,
                                                Props: {
                                                    StartPoint: new Point(0.5, 1),
                                                    EndPoint: new Point(0.5, 0)
                                                },
                                                Children: [
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FFF4F6F7"),
                                                        Offset: 0
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FFF0F4F7"),
                                                        Offset: 0.344
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FFDFE3E6"),
                                                        Offset: 1
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
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
                                        ParseType: Rectangle,
                                        Props: {
                                            RadiusX: 1,
                                            RadiusY: 1,
                                            StrokeThickness: 1,
                                            Stroke: {
                                                ParseType: SolidColorBrush,
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
                                        ParseType: Rectangle,
                                        Props: {
                                            RadiusX: 1,
                                            RadiusY: 1,
                                            StrokeThickness: 1,
                                            Opacity: 0.375,
                                            Stroke: {
                                                ParseType: LinearGradientBrush,
                                                Props: {
                                                    EndPoint: new Point(0.5, 1),
                                                    StartPoint: new Point(0.5, 0)
                                                },
                                                Children: [
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FFA3AEB9"),
                                                        Offset: 0
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FF8399A9"),
                                                        Offset: 0.375
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FF718597"),
                                                        Offset: 0.375
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
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
                                        ParseType: Rectangle,
                                        Props: {
                                            RadiusX: 1,
                                            RadiusY: 1,
                                            Margin: new Thickness(1, 1, 1, 1),
                                            Stroke: {
                                                ParseType: LinearGradientBrush,
                                                Props: {
                                                    EndPoint: new Point(0.5, 0.125),
                                                    StartPoint: new Point(0.5, 0.875)
                                                },
                                                Children: [
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#33FFFFFF")
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
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
                                        ParseType: RepeatButton,
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
                                        ParseType: RepeatButton,
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
                                        ParseType: Thumb,
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
                                        ParseType: RepeatButton,
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
                                        ParseType: RepeatButton,
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
                                    ParseType: Grid,
                                    Name: "VerticalRoot",
                                    Props: {
                                        Visibility: Visibility.Collapsed,
                                        RowDefinitions: [
                                        {
                                            ParseType: RowDefinition,
                                            Props: {
                                                Height: new GridLength(1, GridUnitType.Auto)
                                            }
                                        },
                                        {
                                            ParseType: RowDefinition,
                                            Props: {
                                                Height: new GridLength(1, GridUnitType.Auto)
                                            }
                                        },
                                        {
                                            ParseType: RowDefinition,
                                            Props: {
                                                Height: new GridLength(1, GridUnitType.Auto)
                                            }
                                        },
                                        {
                                            ParseType: RowDefinition,
                                            Props: {
                                                Height: new GridLength(1, GridUnitType.Star)
                                            }
                                        },
                                        {
                                            ParseType: RowDefinition,
                                            Props: {
                                                Height: new GridLength(1, GridUnitType.Auto)
                                            }
                                        }]

                                    },
                                    Children: [
                                    {
                                        ParseType: Rectangle,
                                        Props: {
                                            RadiusX: 1,
                                            RadiusY: 1,
                                            StrokeThickness: 1,
                                            Stroke: {
                                                ParseType: SolidColorBrush,
                                                Props: {
                                                    Color: Color.FromHex("#00000000")
                                                }
                                            },
                                            Fill: {
                                                ParseType: LinearGradientBrush,
                                                Props: {
                                                    StartPoint: new Point(1, 0.5),
                                                    EndPoint: new Point(0, 0.5)
                                                },
                                                Children: [
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FFF4F6F7"),
                                                        Offset: 0
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FFF0F4F7"),
                                                        Offset: 0.344
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FFDFE3E6"),
                                                        Offset: 1
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
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
                                        ParseType: Rectangle,
                                        Props: {
                                            RadiusX: 1,
                                            RadiusY: 1,
                                            StrokeThickness: 1,
                                            Opacity: 0.375,
                                            Stroke: {
                                                ParseType: LinearGradientBrush,
                                                Props: {
                                                    EndPoint: new Point(0.5, 1),
                                                    StartPoint: new Point(0.5, 0)
                                                },
                                                Children: [
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FFA3AEB9"),
                                                        Offset: 0
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FF8399A9"),
                                                        Offset: 0.375
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FF718597"),
                                                        Offset: 0.375
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
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
                                        ParseType: Rectangle,
                                        Props: {
                                            RadiusX: 1,
                                            RadiusY: 1,
                                            Margin: new Thickness(1, 1, 1, 1),
                                            Stroke: {
                                                ParseType: LinearGradientBrush,
                                                Props: {
                                                    EndPoint: new Point(0.125, 0.5),
                                                    StartPoint: new Point(0.875, 0.5)
                                                },
                                                Children: [
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#33FFFFFF")
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
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
                                        ParseType: RepeatButton,
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
                                        ParseType: RepeatButton,
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
                                        ParseType: Thumb,
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
                                        ParseType: RepeatButton,
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
                                        ParseType: RepeatButton,
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

            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: ScrollViewer
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "HorizontalContentAlignment"),
                        Value: "Left"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "VerticalContentAlignment"),
                        Value: "Top"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "VerticalScrollBarVisibility"),
                        Value: "Visible"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "Padding"),
                        Value: "4"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "BorderThickness"),
                        Value: "1"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "BorderBrush"),
                        Value: {
                            ParseType: LinearGradientBrush,
                            Props: {
                                EndPoint: new Point(0.5, 1),
                                StartPoint: new Point(0.5, 0)
                            },
                            Children: [
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FFA3AEB9"),
                                    Offset: 0
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF8399A9"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF718597"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF617584"),
                                    Offset: 1
                                }
                            }]

                        }
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "Template"),
                        Value: {
                            ParseType: ControlTemplate,
                            Props: {
                                TargetType: ScrollViewer
                            },
                            Content: {
                                ParseType: Border,
                                Props: {
                                    CornerRadius: new CornerRadius(2, 2, 2, 2),
                                    BorderBrush: new TemplateBindingMarkup("BorderBrush"),
                                    BorderThickness: new TemplateBindingMarkup("BorderThickness")
                                },
                                Content: {
                                    ParseType: Grid,
                                    Props: {
                                        Background: new TemplateBindingMarkup("Background"),
                                        RowDefinitions: [
                                        {
                                            ParseType: RowDefinition,
                                            Props: {
                                                Height: new GridLength(1, GridUnitType.Star)
                                            }
                                        },
                                        {
                                            ParseType: RowDefinition,
                                            Props: {
                                                Height: new GridLength(1, GridUnitType.Auto)
                                            }
                                        }]
                                    ,
                                        ColumnDefinitions: [
                                        {
                                            ParseType: ColumnDefinition,
                                            Props: {
                                                Width: new GridLength(1, GridUnitType.Star)
                                            }
                                        },
                                        {
                                            ParseType: ColumnDefinition,
                                            Props: {
                                                Width: new GridLength(1, GridUnitType.Auto)
                                            }
                                        }]

                                    },
                                    Children: [
                                    {
                                        ParseType: ScrollContentPresenter,
                                        Name: "ScrollContentPresenter",
                                        Props: {
                                            Cursor: new TemplateBindingMarkup("Cursor"),
                                            Margin: new TemplateBindingMarkup("Padding"),
                                            ContentTemplate: new TemplateBindingMarkup("ContentTemplate")
                                        }
                                    },
                                    {
                                        ParseType: Rectangle,
                                        Props: {
                                            Fill: {
                                                ParseType: SolidColorBrush,
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
                                        ParseType: ScrollBar,
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
                                        ParseType: ScrollBar,
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

            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: ComboBox
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBox, "Padding"),
                        Value: "6,2,25,2"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBox, "Background"),
                        Value: "#FF1F3B53"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBox, "HorizontalContentAlignment"),
                        Value: "Left"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBox, "BorderThickness"),
                        Value: "1"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBox, "TabNavigation"),
                        Value: "Once"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "HorizontalScrollBarVisibility"),
                        Value: "Auto"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "VerticalScrollBarVisibility"),
                        Value: "Auto"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBox, "BorderBrush"),
                        Value: {
                            ParseType: LinearGradientBrush,
                            Props: {
                                EndPoint: new Point(0.5, 1),
                                StartPoint: new Point(0.5, 0)
                            },
                            Children: [
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FFA3AEB9"),
                                    Offset: 0
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF8399A9"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF718597"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF617584"),
                                    Offset: 1
                                }
                            }]

                        }
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBox, "Template"),
                        Value: {
                            ParseType: ControlTemplate,
                            Props: {
                                TargetType: ComboBox
                            },
                            Content: {
                                ParseType: Grid,
                                Props: {
                                    Resources: {
                                        ParseType: ResourceDictionary,
                                        Children: [
                                        {
                                            Value: {
                                                ParseType: Style,
                                                Name: "comboToggleStyle",
                                                Props: {
                                                    TargetType: ToggleButton
                                                },
                                                Children: [
                                                {
                                                    ParseType: Setter,
                                                    Props: {
                                                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Foreground"),
                                                        Value: "#FF333333"
                                                    }
                                                },
                                                {
                                                    ParseType: Setter,
                                                    Props: {
                                                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Background"),
                                                        Value: "#FF1F3B53"
                                                    }
                                                },
                                                {
                                                    ParseType: Setter,
                                                    Props: {
                                                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "BorderBrush"),
                                                        Value: {
                                                            ParseType: LinearGradientBrush,
                                                            Props: {
                                                                EndPoint: new Point(0.5, 1),
                                                                StartPoint: new Point(0.5, 0)
                                                            },
                                                            Children: [
                                                            {
                                                                ParseType: GradientStop,
                                                                Props: {
                                                                    Color: Color.FromHex("#FFA3AEB9"),
                                                                    Offset: 0
                                                                }
                                                            },
                                                            {
                                                                ParseType: GradientStop,
                                                                Props: {
                                                                    Color: Color.FromHex("#FF8399A9"),
                                                                    Offset: 0.375
                                                                }
                                                            },
                                                            {
                                                                ParseType: GradientStop,
                                                                Props: {
                                                                    Color: Color.FromHex("#FF718597"),
                                                                    Offset: 0.375
                                                                }
                                                            },
                                                            {
                                                                ParseType: GradientStop,
                                                                Props: {
                                                                    Color: Color.FromHex("#FF617584"),
                                                                    Offset: 1
                                                                }
                                                            }]

                                                        }
                                                    }
                                                },
                                                {
                                                    ParseType: Setter,
                                                    Props: {
                                                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "BorderThickness"),
                                                        Value: "1"
                                                    }
                                                },
                                                {
                                                    ParseType: Setter,
                                                    Props: {
                                                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Padding"),
                                                        Value: "3"
                                                    }
                                                },
                                                {
                                                    ParseType: Setter,
                                                    Props: {
                                                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Template"),
                                                        Value: {
                                                            ParseType: ControlTemplate,
                                                            Props: {
                                                                TargetType: ToggleButton
                                                            },
                                                            Content: {
                                                                ParseType: Grid,
                                                                AttachedProps: [{
                                                                    Owner: VisualStateManager,
                                                                    Prop: "VisualStateGroups",
                                                                    Value: [
                                                                    {
                                                                        ParseType: VisualStateGroup,
                                                                        Name: "CommonStates",
                                                                        Children: [
                                                                        {
                                                                            ParseType: VisualState,
                                                                            Name: "Normal"
                                                                        },
                                                                        {
                                                                            ParseType: VisualState,
                                                                            Name: "MouseOver",
                                                                            Content: {
                                                                                ParseType: Storyboard,
                                                                                Children: [
                                                                                {
                                                                                    ParseType: DoubleAnimation,
                                                                                    Props: {
                                                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                                        Value: new PropertyPath("Opacity")

                                                                                    }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    ParseType: ColorAnimation,
                                                                                    Props: {
                                                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                                                    }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    ParseType: ColorAnimation,
                                                                                    Props: {
                                                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                                                    }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    ParseType: ColorAnimation,
                                                                                    Props: {
                                                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                                                    }
                                                                                    ]
                                                                                }]

                                                                            }
                                                                        },
                                                                        {
                                                                            ParseType: VisualState,
                                                                            Name: "Pressed",
                                                                            Content: {
                                                                                ParseType: Storyboard,
                                                                                Children: [
                                                                                {
                                                                                    ParseType: DoubleAnimation,
                                                                                    Props: {
                                                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                                        Value: new PropertyPath("Opacity")

                                                                                    }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    ParseType: DoubleAnimation,
                                                                                    Props: {
                                                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                                                    }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    ParseType: ColorAnimation,
                                                                                    Props: {
                                                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                                                    }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    ParseType: ColorAnimation,
                                                                                    Props: {
                                                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                                                    }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    ParseType: ColorAnimation,
                                                                                    Props: {
                                                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                                                    }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    ParseType: ColorAnimation,
                                                                                    Props: {
                                                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

                                                                                    }
                                                                                    ]
                                                                                }]

                                                                            }
                                                                        },
                                                                        {
                                                                            ParseType: VisualState,
                                                                            Name: "Disabled"
                                                                        }]

                                                                    },
                                                                    {
                                                                        ParseType: VisualStateGroup,
                                                                        Name: "CheckStates",
                                                                        Children: [
                                                                        {
                                                                            ParseType: VisualState,
                                                                            Name: "Checked",
                                                                            Content: {
                                                                                ParseType: Storyboard,
                                                                                Children: [
                                                                                {
                                                                                    ParseType: DoubleAnimation,
                                                                                    Props: {
                                                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                                                    }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    ParseType: DoubleAnimation,
                                                                                    Props: {
                                                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                                                    }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    ParseType: DoubleAnimation,
                                                                                    Props: {
                                                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                                                    }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    ParseType: ColorAnimation,
                                                                                    Props: {
                                                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[1].(GradientStop.Color)")

                                                                                    }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    ParseType: ColorAnimation,
                                                                                    Props: {
                                                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[2].(GradientStop.Color)")

                                                                                    }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    ParseType: ColorAnimation,
                                                                                    Props: {
                                                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[3].(GradientStop.Color)")

                                                                                    }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    ParseType: ColorAnimation,
                                                                                    Props: {
                                                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                                                        Value: new PropertyPath("(Shape.Fill).(GradientBrush.GradientStops)[0].(GradientStop.Color)")

                                                                                    }
                                                                                    ]
                                                                                }]

                                                                            }
                                                                        },
                                                                        {
                                                                            ParseType: VisualState,
                                                                            Name: "Unchecked"
                                                                        }]

                                                                    },
                                                                    {
                                                                        ParseType: VisualStateGroup,
                                                                        Name: "FocusStates",
                                                                        Children: [
                                                                        {
                                                                            ParseType: VisualState,
                                                                            Name: "Focused",
                                                                            Content: {
                                                                                ParseType: Storyboard,
                                                                                Children: [
                                                                                {
                                                                                    ParseType: ObjectAnimationUsingKeyFrames,
                                                                                    Props: {
                                                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                                                    },
                                                                                    AttachedProps: [{
                                                                                        Owner: Storyboard,
                                                                                        Prop: "TargetName",
                                                                                        Value: "FocusVisualElement"
                                                                                    },
                                                                                    {
                                                                                        Owner: Storyboard,
                                                                                        Prop: "TargetProperty",
                                                                                        Value: new PropertyPath("Visibility")

                                                                                    }
                                                                                    ],
                                                                                    Children: [
                                                                                    {
                                                                                        ParseType: DiscreteObjectKeyFrame,
                                                                                        Props: {
                                                                                            KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                                                            Value: Visibility.Visible
                                                                                        }
                                                                                    }]

                                                                                }]

                                                                            }
                                                                        },
                                                                        {
                                                                            ParseType: VisualState,
                                                                            Name: "Unfocused"
                                                                        }]

                                                                    }]


                                                                }
                                                                ],
                                                                Children: [
                                                                {
                                                                    ParseType: Rectangle,
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
                                                                    ParseType: Rectangle,
                                                                    Name: "BackgroundOverlay",
                                                                    Props: {
                                                                        Opacity: 0,
                                                                        RadiusX: 3,
                                                                        RadiusY: 3,
                                                                        Fill: {
                                                                            ParseType: SolidColorBrush,
                                                                            Props: {
                                                                                Color: Color.FromHex("#FF448DCA")
                                                                            }
                                                                        },
                                                                        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                                                        Stroke: {
                                                                            ParseType: SolidColorBrush,
                                                                            Props: {
                                                                                Color: Color.FromHex("#00000000")
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: Rectangle,
                                                                    Name: "BackgroundOverlay2",
                                                                    Props: {
                                                                        Opacity: 0,
                                                                        RadiusX: 3,
                                                                        RadiusY: 3,
                                                                        Fill: {
                                                                            ParseType: SolidColorBrush,
                                                                            Props: {
                                                                                Color: Color.FromHex("#FF448DCA")
                                                                            }
                                                                        },
                                                                        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                                                        Stroke: {
                                                                            ParseType: SolidColorBrush,
                                                                            Props: {
                                                                                Color: Color.FromHex("#00000000")
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: Rectangle,
                                                                    Name: "BackgroundGradient",
                                                                    Props: {
                                                                        RadiusX: 2,
                                                                        RadiusY: 2,
                                                                        StrokeThickness: 1,
                                                                        Margin: new TemplateBindingMarkup("BorderThickness"),
                                                                        Stroke: {
                                                                            ParseType: SolidColorBrush,
                                                                            Props: {
                                                                                Color: Color.FromHex("#FFFFFFFF")
                                                                            }
                                                                        },
                                                                        Fill: {
                                                                            ParseType: LinearGradientBrush,
                                                                            Props: {
                                                                                StartPoint: new Point(0.7, 0),
                                                                                EndPoint: new Point(0.7, 1)
                                                                            },
                                                                            Children: [
                                                                            {
                                                                                ParseType: GradientStop,
                                                                                Props: {
                                                                                    Color: Color.FromHex("#FFFFFFFF"),
                                                                                    Offset: 0
                                                                                }
                                                                            },
                                                                            {
                                                                                ParseType: GradientStop,
                                                                                Props: {
                                                                                    Color: Color.FromHex("#F9FFFFFF"),
                                                                                    Offset: 0.375
                                                                                }
                                                                            },
                                                                            {
                                                                                ParseType: GradientStop,
                                                                                Props: {
                                                                                    Color: Color.FromHex("#E5FFFFFF"),
                                                                                    Offset: 0.625
                                                                                }
                                                                            },
                                                                            {
                                                                                ParseType: GradientStop,
                                                                                Props: {
                                                                                    Color: Color.FromHex("#C6FFFFFF"),
                                                                                    Offset: 1
                                                                                }
                                                                            }]

                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: Rectangle,
                                                                    Name: "BackgroundOverlay3",
                                                                    Props: {
                                                                        Opacity: 0,
                                                                        RadiusX: 3,
                                                                        RadiusY: 3,
                                                                        Fill: {
                                                                            ParseType: SolidColorBrush,
                                                                            Props: {
                                                                                Color: Color.FromHex("#FF448DCA")
                                                                            }
                                                                        },
                                                                        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                                                        Stroke: {
                                                                            ParseType: SolidColorBrush,
                                                                            Props: {
                                                                                Color: Color.FromHex("#00000000")
                                                                            }
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: Rectangle,
                                                                    Name: "BackgroundGradient2",
                                                                    Props: {
                                                                        Opacity: 0,
                                                                        RadiusX: 2,
                                                                        RadiusY: 2,
                                                                        StrokeThickness: 1,
                                                                        Margin: new TemplateBindingMarkup("BorderThickness"),
                                                                        Stroke: {
                                                                            ParseType: SolidColorBrush,
                                                                            Props: {
                                                                                Color: Color.FromHex("#FFFFFFFF")
                                                                            }
                                                                        },
                                                                        Fill: {
                                                                            ParseType: LinearGradientBrush,
                                                                            Props: {
                                                                                StartPoint: new Point(0.7, 0),
                                                                                EndPoint: new Point(0.7, 1)
                                                                            },
                                                                            Children: [
                                                                            {
                                                                                ParseType: GradientStop,
                                                                                Props: {
                                                                                    Color: Color.FromHex("#FFFFFFFF"),
                                                                                    Offset: 0
                                                                                }
                                                                            },
                                                                            {
                                                                                ParseType: GradientStop,
                                                                                Props: {
                                                                                    Color: Color.FromHex("#F9FFFFFF"),
                                                                                    Offset: 0.375
                                                                                }
                                                                            },
                                                                            {
                                                                                ParseType: GradientStop,
                                                                                Props: {
                                                                                    Color: Color.FromHex("#E5FFFFFF"),
                                                                                    Offset: 0.625
                                                                                }
                                                                            },
                                                                            {
                                                                                ParseType: GradientStop,
                                                                                Props: {
                                                                                    Color: Color.FromHex("#C6FFFFFF"),
                                                                                    Offset: 1
                                                                                }
                                                                            }]

                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: Rectangle,
                                                                    Name: "Highlight",
                                                                    Props: {
                                                                        RadiusX: 2,
                                                                        RadiusY: 2,
                                                                        Opacity: 0,
                                                                        IsHitTestVisible: false,
                                                                        Stroke: {
                                                                            ParseType: SolidColorBrush,
                                                                            Props: {
                                                                                Color: Color.FromHex("#FF6DBDD1")
                                                                            }
                                                                        },
                                                                        StrokeThickness: 1,
                                                                        Margin: new TemplateBindingMarkup("BorderThickness")
                                                                    }
                                                                },
                                                                {
                                                                    ParseType: ContentPresenter,
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
                                                                    ParseType: Rectangle,
                                                                    Name: "FocusVisualElement",
                                                                    Props: {
                                                                        RadiusX: 3.5,
                                                                        Margin: new Thickness(1, 1, 1, 1),
                                                                        RadiusY: 3.5,
                                                                        Stroke: {
                                                                            ParseType: SolidColorBrush,
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

                                            }
                                        }]
                                    }
                                },
                                AttachedProps: [{
                                    Owner: VisualStateManager,
                                    Prop: "VisualStateGroups",
                                    Value: [
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "CommonStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Normal"
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "MouseOver"
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Disabled",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    }
                                                    ]
                                                }]

                                            }
                                        }]

                                    },
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "FocusStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Focused",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Unfocused"
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "FocusedDropDown",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: ObjectAnimationUsingKeyFrames,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "PopupBorder"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Visibility)")

                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        ParseType: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                    ParseType: Border,
                                    Name: "ContentPresenterBorder",
                                    Content: {
                                        ParseType: Grid,
                                        Children: [
                                        {
                                            ParseType: ToggleButton,
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
                                                ParseType: Path,
                                                Name: "BtnArrow",
                                                Props: {
                                                    Height: 4,
                                                    Width: 8,
                                                    Stretch: Stretch.Uniform,
                                                    Data: "F1 M 301.14,-189.041L 311.57,-189.041L 306.355,-182.942L 301.14,-189.041 Z",
                                                    Margin: new Thickness(0, 0, 6, 0),
                                                    HorizontalAlignment: HorizontalAlignment.Right,
                                                    Fill: {
                                                        ParseType: SolidColorBrush,
                                                        Name: "BtnArrowColor",
                                                        Props: {
                                                            Color: Color.FromHex("#FF333333")
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            ParseType: ContentPresenter,
                                            Name: "ContentPresenter",
                                            Props: {
                                                Margin: new TemplateBindingMarkup("Padding"),
                                                HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                                VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment")
                                            },
                                            Content: {
                                                ParseType: TextBlock,
                                                Props: {
                                                    Text: " "
                                                }
                                            }
                                        }]

                                    }
                                },
                                {
                                    ParseType: Rectangle,
                                    Name: "DisabledVisualElement",
                                    Props: {
                                        RadiusX: 3,
                                        RadiusY: 3,
                                        Fill: {
                                            ParseType: SolidColorBrush,
                                            Props: {
                                                Color: Color.FromHex("#FFFFFFFF")
                                            }
                                        },
                                        Opacity: 0,
                                        IsHitTestVisible: false
                                    }
                                },
                                {
                                    ParseType: Rectangle,
                                    Name: "FocusVisualElement",
                                    Props: {
                                        RadiusX: 2,
                                        RadiusY: 2,
                                        Margin: new Thickness(1, 1, 1, 1),
                                        Stroke: {
                                            ParseType: SolidColorBrush,
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
                                    ParseType: Popup,
                                    Name: "Popup",
                                    Content: {
                                        ParseType: Border,
                                        Name: "PopupBorder",
                                        Props: {
                                            HorizontalAlignment: HorizontalAlignment.Stretch,
                                            Height: NaN,
                                            BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                            BorderBrush: new TemplateBindingMarkup("BorderBrush"),
                                            CornerRadius: new CornerRadius(3, 3, 3, 3),
                                            Background: {
                                                ParseType: LinearGradientBrush,
                                                Props: {
                                                    EndPoint: new Point(0.5, 1),
                                                    StartPoint: new Point(0.5, 0)
                                                },
                                                Children: [
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FFFFFFFF"),
                                                        Offset: 0
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#FFFEFEFE"),
                                                        Offset: 1
                                                    }
                                                }]

                                            }
                                        },
                                        Content: {
                                            ParseType: ScrollViewer,
                                            Name: "ScrollViewer",
                                            Props: {
                                                BorderThickness: new Thickness(0, 0, 0, 0),
                                                Padding: new Thickness(1, 1, 1, 1)
                                            },
                                            Content: {
                                                ParseType: ItemsPresenter
                                            }
                                        }
                                    }
                                }]

                            }
                        }
                    }
                }]

            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: Slider
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Slider, "BorderThickness"),
                        Value: "1"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Slider, "Maximum"),
                        Value: "10"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Slider, "Minimum"),
                        Value: "0"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Slider, "Value"),
                        Value: "0"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Slider, "BorderBrush"),
                        Value: {
                            ParseType: LinearGradientBrush,
                            Props: {
                                EndPoint: new Point(0.5, 1),
                                StartPoint: new Point(0.5, 0)
                            },
                            Children: [
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FFA3AEB9"),
                                    Offset: 0
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF8399A9"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF718597"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF617584"),
                                    Offset: 1
                                }
                            }]

                        }
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Slider, "IsTabStop"),
                        Value: "False"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Slider, "Template"),
                        Value: {
                            ParseType: ControlTemplate,
                            Props: {
                                TargetType: Slider
                            },
                            Content: {
                                ParseType: Grid,
                                Name: "Root",
                                Props: {
                                    Resources: {
                                        ParseType: ResourceDictionary,
                                        Children: [
                                        {
                                            Key: "RepeatButtonTemplate", Value: {
                                                ParseType: ControlTemplate,
                                                Content: {
                                                    ParseType: Grid,
                                                    Name: "Root",
                                                    Props: {
                                                        Opacity: 0,
                                                        Background: {
                                                            ParseType: SolidColorBrush,
                                                            Props: {
                                                                Color: Color.FromHex("#00FFFFFF")
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }]
                                    }
                                },
                                AttachedProps: [{
                                    Owner: VisualStateManager,
                                    Prop: "VisualStateGroups",
                                    Value: [
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "CommonStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Normal"
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "MouseOver"
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Disabled",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: ObjectAnimationUsingKeyFrames,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "HorizontalTrackRectangleDisabledOverlay"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        ParseType: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                            Value: Visibility.Visible
                                                        }
                                                    }]

                                                },
                                                {
                                                    ParseType: ObjectAnimationUsingKeyFrames,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "ThumbDisabledOverlay"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        ParseType: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                            Value: Visibility.Visible
                                                        }
                                                    }]

                                                },
                                                {
                                                    ParseType: ObjectAnimationUsingKeyFrames,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "VerticalTrackRectangleDisabledOverlay"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        ParseType: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                    ParseType: Grid,
                                    Name: "HorizontalTemplate",
                                    Props: {
                                        Background: new TemplateBindingMarkup("Background"),
                                        ColumnDefinitions: [
                                        {
                                            ParseType: ColumnDefinition,
                                            Props: {
                                                Width: new GridLength(1, GridUnitType.Auto)
                                            }
                                        },
                                        {
                                            ParseType: ColumnDefinition,
                                            Props: {
                                                Width: new GridLength(1, GridUnitType.Auto)
                                            }
                                        },
                                        {
                                            ParseType: ColumnDefinition,
                                            Props: {
                                                Width: new GridLength(1, GridUnitType.Star)
                                            }
                                        }]

                                    },
                                    Children: [
                                    {
                                        ParseType: Rectangle,
                                        Name: "TrackRectangle",
                                        Props: {
                                            Stroke: {
                                                ParseType: SolidColorBrush,
                                                Props: {
                                                    Color: Color.FromHex("#FFA3AEB9")
                                                }
                                            },
                                            StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                            Fill: {
                                                ParseType: SolidColorBrush,
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
                                        ParseType: Rectangle,
                                        Name: "HorizontalTrackRectangleDisabledOverlay",
                                        Props: {
                                            Visibility: Visibility.Collapsed,
                                            Fill: {
                                                ParseType: SolidColorBrush,
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
                                        ParseType: RepeatButton,
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
                                        ParseType: Thumb,
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
                                        ParseType: Rectangle,
                                        Name: "ThumbDisabledOverlay",
                                        Props: {
                                            RadiusX: 2,
                                            RadiusY: 2,
                                            Width: 11,
                                            Fill: {
                                                ParseType: SolidColorBrush,
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
                                        ParseType: RepeatButton,
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
                                    ParseType: Grid,
                                    Name: "VerticalTemplate",
                                    Props: {
                                        Visibility: Visibility.Collapsed,
                                        Background: new TemplateBindingMarkup("Background"),
                                        RowDefinitions: [
                                        {
                                            ParseType: RowDefinition,
                                            Props: {
                                                Height: new GridLength(1, GridUnitType.Star)
                                            }
                                        },
                                        {
                                            ParseType: RowDefinition,
                                            Props: {
                                                Height: new GridLength(1, GridUnitType.Auto)
                                            }
                                        },
                                        {
                                            ParseType: RowDefinition,
                                            Props: {
                                                Height: new GridLength(1, GridUnitType.Auto)
                                            }
                                        }]

                                    },
                                    Children: [
                                    {
                                        ParseType: Rectangle,
                                        Props: {
                                            Stroke: {
                                                ParseType: SolidColorBrush,
                                                Props: {
                                                    Color: Color.FromHex("#FFA3AEB9")
                                                }
                                            },
                                            StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                            Fill: {
                                                ParseType: SolidColorBrush,
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
                                        ParseType: Rectangle,
                                        Name: "VerticalTrackRectangleDisabledOverlay",
                                        Props: {
                                            Visibility: Visibility.Collapsed,
                                            Fill: {
                                                ParseType: SolidColorBrush,
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
                                        ParseType: RepeatButton,
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
                                        ParseType: Thumb,
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
                                        ParseType: RepeatButton,
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

            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: ProgressBar
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ProgressBar, "Foreground"),
                        Value: "#FF027DB8"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ProgressBar, "Background"),
                        Value: "#FFD2D5D8"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ProgressBar, "BorderThickness"),
                        Value: "1"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ProgressBar, "Maximum"),
                        Value: "100"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ProgressBar, "IsTabStop"),
                        Value: "False"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ProgressBar, "BorderBrush"),
                        Value: {
                            ParseType: LinearGradientBrush,
                            Props: {
                                EndPoint: new Point(0.5, 1),
                                StartPoint: new Point(0.5, 0)
                            },
                            Children: [
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FFAEB7BF"),
                                    Offset: 0
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF919EA7"),
                                    Offset: 0.35
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF7A8A99"),
                                    Offset: 0.35
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF647480"),
                                    Offset: 1
                                }
                            }]

                        }
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ProgressBar, "Template"),
                        Value: {
                            ParseType: ControlTemplate,
                            Props: {
                                TargetType: ProgressBar
                            },
                            Content: {
                                ParseType: Grid,
                                Name: "Root",
                                AttachedProps: [{
                                    Owner: VisualStateManager,
                                    Prop: "VisualStateGroups",
                                    Value: [
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "CommonStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Determinate"
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Indeterminate",
                                            Content: {
                                                ParseType: Storyboard,
                                                Props: {
                                                    RepeatBehavior: RepeatBehavior.FromForever()
                                                },
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 500)),
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
                                                        Value: new PropertyPath("(Shape.Fill).(LinearGradientBrush.Transform).(TransformGroup.Children)[0].X")

                                                    }
                                                    ]
                                                },
                                                {
                                                    ParseType: ObjectAnimationUsingKeyFrames,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "IndeterminateRoot"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Visibility)")

                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        ParseType: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                            Value: Visibility.Visible
                                                        }
                                                    }]

                                                },
                                                {
                                                    ParseType: ObjectAnimationUsingKeyFrames,
                                                    Props: {
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "DeterminateRoot"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Visibility)")

                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        ParseType: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                    ParseType: Border,
                                    Name: "ProgressBarTrack",
                                    Props: {
                                        CornerRadius: new CornerRadius(3, 3, 3, 3),
                                        Background: new TemplateBindingMarkup("Background"),
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        BorderBrush: new TemplateBindingMarkup("BorderBrush")
                                    }
                                },
                                {
                                    ParseType: Grid,
                                    Name: "ProgressBarRootGrid",
                                    Children: [
                                    {
                                        ParseType: Rectangle,
                                        Name: "ProgressBarRootGradient",
                                        Props: {
                                            StrokeThickness: 1,
                                            Margin: new TemplateBindingMarkup("BorderThickness"),
                                            Stroke: {
                                                ParseType: SolidColorBrush,
                                                Props: {
                                                    Color: Color.FromHex("#FFFFFFFF")
                                                }
                                            },
                                            RadiusX: 1.5,
                                            RadiusY: 1.5,
                                            Fill: {
                                                ParseType: LinearGradientBrush,
                                                Props: {
                                                    StartPoint: new Point(0.7, 0),
                                                    EndPoint: new Point(0.7, 1)
                                                },
                                                Children: [
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#B2FFFFFF"),
                                                        Offset: 0
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#C6FFFFFF"),
                                                        Offset: 0.15
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#D1FFFFFF"),
                                                        Offset: 0.275
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#C6FFFFFF"),
                                                        Offset: 0.4
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#BFFFFFFF"),
                                                        Offset: 0.65
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#A5FFFFFF"),
                                                        Offset: 0.75
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: Color.FromHex("#91FFFFFF"),
                                                        Offset: 0.85
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
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
                                        ParseType: Grid,
                                        Name: "IndeterminateRoot",
                                        Props: {
                                            Visibility: Visibility.Collapsed
                                        },
                                        Children: [
                                        {
                                            ParseType: Rectangle,
                                            Name: "IndeterminateSolidFill",
                                            Props: {
                                                Stroke: {
                                                    ParseType: SolidColorBrush,
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
                                            ParseType: Rectangle,
                                            Name: "IndeterminateGradientFill",
                                            Props: {
                                                RadiusX: 2,
                                                RadiusY: 2,
                                                StrokeThickness: 1,
                                                Margin: new TemplateBindingMarkup("BorderThickness"),
                                                Opacity: 0.7,
                                                Fill: {
                                                    ParseType: LinearGradientBrush,
                                                    Props: {
                                                        SpreadMethod: GradientSpreadMethod.Repeat,
                                                        MappingMode: BrushMappingMode.Absolute,
                                                        EndPoint: new Point(0, 1),
                                                        StartPoint: new Point(20, 1),
                                                        Transform: {
                                                            ParseType: TransformGroup,
                                                            Children: [
                                                            {
                                                                ParseType: TranslateTransform,
                                                                Props: {
                                                                    X: 0
                                                                }
                                                            },
                                                            {
                                                                ParseType: SkewTransform,
                                                                Props: {
                                                                    AngleX: -30
                                                                }
                                                            }]

                                                        }
                                                    },
                                                    Children: [
                                                    {
                                                        ParseType: GradientStop,
                                                        Props: {
                                                            Color: Color.FromHex("#FFFFFFFF"),
                                                            Offset: 0
                                                        }
                                                    },
                                                    {
                                                        ParseType: GradientStop,
                                                        Props: {
                                                            Color: Color.FromHex("#00FFFFFF"),
                                                            Offset: 0.25
                                                        }
                                                    },
                                                    {
                                                        ParseType: GradientStop,
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
                                        ParseType: Grid,
                                        Name: "DeterminateRoot",
                                        Props: {
                                            Margin: new Thickness(1, 1, 1, 1)
                                        },
                                        Children: [
                                        {
                                            ParseType: Rectangle,
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

            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: TextBox
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBox, "Cursor"),
                        Value: "IBeam"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBox, "BorderThickness"),
                        Value: "1"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBox, "Background"),
                        Value: "#FFFFFFFF"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBox, "Foreground"),
                        Value: "#FF000000"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBox, "Padding"),
                        Value: "2"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBox, "BorderBrush"),
                        Value: {
                            ParseType: LinearGradientBrush,
                            Props: {
                                EndPoint: new Point(0.5, 1),
                                StartPoint: new Point(0.5, 0)
                            },
                            Children: [
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FFA3AEB9"),
                                    Offset: 0
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF8399A9"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF718597"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF617584"),
                                    Offset: 1
                                }
                            }]

                        }
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBox, "Template"),
                        Value: {
                            ParseType: ControlTemplate,
                            Props: {
                                TargetType: TextBox
                            },
                            Content: {
                                ParseType: Grid,
                                Name: "RootElement",
                                AttachedProps: [{
                                    Owner: VisualStateManager,
                                    Prop: "VisualStateGroups",
                                    Value: [
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "CommonStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Normal"
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "MouseOver",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        To: Color.FromHex("#FF99C1E2"),
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "MouseOverBorder"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(Border.BorderBrush).(SolidColorBrush.Color)")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Disabled",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        To: 1,
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "DisabledVisualElement"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "ReadOnly",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        To: 1,
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "ReadOnlyVisualElement"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                }]

                                            }
                                        }]

                                    },
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "FocusStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Focused",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        To: 1,
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "FocusVisualElement"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Unfocused",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        To: 0,
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "FocusVisualElement"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

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
                                    ParseType: Border,
                                    Name: "Border",
                                    Props: {
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        CornerRadius: new CornerRadius(1, 1, 1, 1),
                                        Opacity: 1,
                                        Background: new TemplateBindingMarkup("Background"),
                                        BorderBrush: new TemplateBindingMarkup("BorderBrush")
                                    },
                                    Content: {
                                        ParseType: Grid,
                                        Children: [
                                        {
                                            ParseType: Border,
                                            Name: "ReadOnlyVisualElement",
                                            Props: {
                                                Opacity: 0,
                                                Background: {
                                                    ParseType: SolidColorBrush,
                                                    Props: {
                                                        Color: Color.FromHex("#5EC9C9C9")
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            ParseType: Border,
                                            Name: "MouseOverBorder",
                                            Props: {
                                                BorderThickness: new Thickness(1, 1, 1, 1),
                                                BorderBrush: {
                                                    ParseType: SolidColorBrush,
                                                    Props: {
                                                        Color: Color.FromHex("#00FFFFFF")
                                                    }
                                                }
                                            },
                                            Content: {
                                                ParseType: ScrollViewer,
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
                                    ParseType: Border,
                                    Name: "DisabledVisualElement",
                                    Props: {
                                        Background: {
                                            ParseType: SolidColorBrush,
                                            Props: {
                                                Color: Color.FromHex("#A5F7F7F7")
                                            }
                                        },
                                        BorderBrush: {
                                            ParseType: SolidColorBrush,
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
                                    ParseType: Border,
                                    Name: "FocusVisualElement",
                                    Props: {
                                        BorderBrush: {
                                            ParseType: SolidColorBrush,
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

            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: PasswordBox
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(PasswordBox, "BorderThickness"),
                        Value: "1"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(PasswordBox, "Background"),
                        Value: "#FFFFFFFF"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(PasswordBox, "Foreground"),
                        Value: "#FF000000"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(PasswordBox, "Padding"),
                        Value: "2"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(PasswordBox, "BorderBrush"),
                        Value: {
                            ParseType: LinearGradientBrush,
                            Props: {
                                EndPoint: new Point(0.5, 1),
                                StartPoint: new Point(0.5, 0)
                            },
                            Children: [
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FFA3AEB9"),
                                    Offset: 0
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF8399A9"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF718597"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF617584"),
                                    Offset: 1
                                }
                            }]

                        }
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(PasswordBox, "Template"),
                        Value: {
                            ParseType: ControlTemplate,
                            Props: {
                                TargetType: PasswordBox
                            },
                            Content: {
                                ParseType: Grid,
                                Name: "RootElement",
                                AttachedProps: [{
                                    Owner: VisualStateManager,
                                    Prop: "VisualStateGroups",
                                    Value: [
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "CommonStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Normal"
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "MouseOver",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        To: Color.FromHex("#FF99C1E2"),
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "MouseOverBorder"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(Border.BorderBrush).(SolidColorBrush.Color)")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Disabled",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        To: 1,
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "DisabledVisualElement"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                }]

                                            }
                                        }]

                                    },
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "FocusStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Focused",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        To: 1,
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "FocusVisualElement"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Unfocused",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        To: 0,
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "FocusVisualElement"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

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
                                    ParseType: Border,
                                    Name: "Border",
                                    Props: {
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        CornerRadius: new CornerRadius(1, 1, 1, 1),
                                        Opacity: 1,
                                        Background: new TemplateBindingMarkup("Background"),
                                        BorderBrush: new TemplateBindingMarkup("BorderBrush")
                                    },
                                    Content: {
                                        ParseType: Border,
                                        Name: "MouseOverBorder",
                                        Props: {
                                            BorderThickness: new Thickness(1, 1, 1, 1),
                                            BorderBrush: {
                                                ParseType: SolidColorBrush,
                                                Props: {
                                                    Color: Color.FromHex("#00FFFFFF")
                                                }
                                            }
                                        },
                                        Content: {
                                            ParseType: Border,
                                            Name: "ContentElement",
                                            Props: {
                                                Margin: new TemplateBindingMarkup("Padding")
                                            }
                                        }
                                    }
                                },
                                {
                                    ParseType: Border,
                                    Name: "DisabledVisualElement",
                                    Props: {
                                        Background: {
                                            ParseType: SolidColorBrush,
                                            Props: {
                                                Color: Color.FromHex("#A5F7F7F7")
                                            }
                                        },
                                        BorderBrush: {
                                            ParseType: SolidColorBrush,
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
                                    ParseType: Border,
                                    Name: "FocusVisualElement",
                                    Props: {
                                        BorderBrush: {
                                            ParseType: SolidColorBrush,
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

            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: RichTextBox
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RichTextBox, "BorderThickness"),
                        Value: "1"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RichTextBox, "Background"),
                        Value: "#FFFFFFFF"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RichTextBox, "Foreground"),
                        Value: "#FF000000"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RichTextBox, "Padding"),
                        Value: "2"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RichTextBox, "BorderBrush"),
                        Value: {
                            ParseType: LinearGradientBrush,
                            Props: {
                                EndPoint: new Point(0.5, 1),
                                StartPoint: new Point(0.5, 0)
                            },
                            Children: [
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FFA3AEB9"),
                                    Offset: 0
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF8399A9"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF718597"),
                                    Offset: 0.375
                                }
                            },
                            {
                                ParseType: GradientStop,
                                Props: {
                                    Color: Color.FromHex("#FF617584"),
                                    Offset: 1
                                }
                            }]

                        }
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RichTextBox, "Template"),
                        Value: {
                            ParseType: ControlTemplate,
                            Props: {
                                TargetType: RichTextBox
                            },
                            Content: {
                                ParseType: Grid,
                                Name: "RootElement",
                                AttachedProps: [{
                                    Owner: VisualStateManager,
                                    Prop: "VisualStateGroups",
                                    Value: [
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "CommonStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Normal"
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "MouseOver",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: ColorAnimation,
                                                    Props: {
                                                        To: Color.FromHex("#FF99C1E2"),
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "MouseOverBorder"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(Border.BorderBrush).(SolidColorBrush.Color)")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Disabled",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        To: 1,
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "DisabledVisualElement"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "ReadOnly"
                                        }]

                                    },
                                    {
                                        ParseType: VisualStateGroup,
                                        Name: "FocusStates",
                                        Children: [
                                        {
                                            ParseType: VisualState,
                                            Name: "Focused",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        To: 1,
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "FocusVisualElement"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            ParseType: VisualState,
                                            Name: "Unfocused",
                                            Content: {
                                                ParseType: Storyboard,
                                                Children: [
                                                {
                                                    ParseType: DoubleAnimation,
                                                    Props: {
                                                        To: 0,
                                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "FocusVisualElement"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

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
                                    ParseType: Border,
                                    Name: "Border",
                                    Props: {
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        CornerRadius: new CornerRadius(1, 1, 1, 1),
                                        Opacity: 1,
                                        Background: new TemplateBindingMarkup("Background"),
                                        BorderBrush: new TemplateBindingMarkup("BorderBrush")
                                    },
                                    Content: {
                                        ParseType: Border,
                                        Name: "MouseOverBorder",
                                        Props: {
                                            BorderThickness: new Thickness(1, 1, 1, 1),
                                            BorderBrush: {
                                                ParseType: SolidColorBrush,
                                                Props: {
                                                    Color: Color.FromHex("#00FFFFFF")
                                                }
                                            }
                                        },
                                        Content: {
                                            ParseType: ScrollViewer,
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
                                    ParseType: Border,
                                    Name: "DisabledVisualElement",
                                    Props: {
                                        Background: {
                                            ParseType: SolidColorBrush,
                                            Props: {
                                                Color: Color.FromHex("#A5F7F7F7")
                                            }
                                        },
                                        BorderBrush: {
                                            ParseType: SolidColorBrush,
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
                                    ParseType: Border,
                                    Name: "FocusVisualElement",
                                    Props: {
                                        BorderBrush: {
                                            ParseType: SolidColorBrush,
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

            }
        }]
    };
    return Fayde.JsonParser.Parse(json);
};