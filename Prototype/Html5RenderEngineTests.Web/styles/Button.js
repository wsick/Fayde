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
                        StartPoint: new Point(0.5, 1),
                        EndPoint: new Point(0.5, 1),
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
                                        Type: Border,
                                        Name: "BackgroundGradient",
                                        Props: {
                                            Background: {
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
                                                },
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
                            Type: Border,
                            Name: "DisabledVisualElement",
                            Props: {
                                Background: new SolidColorBrush(Color.FromHex("#FFFFFFFF")),
                                Opacity: 0.0,
                                CornerRadius: new CornerRadius(3, 3, 3, 3),
                                IsHitTestVisible: false
                            }
                        },
                        {
                            Type: Border,
                            Name: "FocusVisualElement",
                            Props: {
                                Margin: new Thickness(1, 1, 1, 1),
                                BorderBrush: new SolidColorBrush(Color.FromHex("#FF6DBDD1")),
                                BorderThickness: new Thickness(1, 1, 1, 1),
                                Opacity: 0.0,
                                CornerRadius: new CornerRadius(2, 2, 2, 2),
                                IsHitTestVisible: false
                            }
                        }
                    ]
                })
            }
        }
    ]
};