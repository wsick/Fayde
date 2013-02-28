/// <reference path="Fayde.js"/>

App.GetGenericResourceDictionary = function () {
    var ResourceDictionary = Fayde.ResourceDictionary;
    var SolidColorBrush = Fayde.Media.SolidColorBrush;
    var StaticResourceMarkup = Fayde.StaticResourceMarkup;
    var LinearGradientBrush = Fayde.Media.LinearGradientBrush;
    var GradientStop = Fayde.Media.GradientStop;
    var DropShadowEffect = Fayde.Media.Effects.DropShadowEffect;
    var Style = Fayde.Style;
    var HyperlinkButton = Fayde.Controls.HyperlinkButton;
    var Setter = Fayde.Setter;
    var DataTemplate = Fayde.DataTemplate;
    var Grid = Fayde.Controls.Grid;
    var HorizontalAlignment = Fayde.HorizontalAlignment;
    var VerticalAlignment = Fayde.VerticalAlignment;
    var Rectangle = Fayde.Shapes.Rectangle;
    var RotateTransform = Fayde.Media.RotateTransform;
    var Ellipse = Fayde.Shapes.Ellipse;
    var ControlTemplate = Fayde.Controls.ControlTemplate;
    var TemplateBindingMarkup = Fayde.TemplateBindingMarkup;
    var VisualStateManager = Fayde.Media.VisualStateManager.VisualStateManager;
    var VisualStateGroup = Fayde.Media.VisualStateManager.VisualStateGroup;
    var VisualState = Fayde.Media.VisualStateManager.VisualState;
    var Storyboard = Fayde.Media.Animation.Storyboard;
    var ColorAnimation = Fayde.Media.Animation.ColorAnimation;
    var PropertyPath = Fayde.Data.PropertyPath;
    var DoubleAnimation = Fayde.Media.Animation.DoubleAnimation;
    var ObjectAnimationUsingKeyFrames = Fayde.Media.Animation.ObjectAnimationUsingKeyFrames;
    var DiscreteObjectKeyFrame = Fayde.Media.Animation.DiscreteObjectKeyFrame;
    var Visibility = Fayde.Visibility;
    var TextBlock = Fayde.Controls.TextBlock;
    var Canvas = Fayde.Controls.Canvas;
    var ContentControl = Fayde.Controls.ContentControl;
    var ContentPresenter = Fayde.Controls.ContentPresenter;
    var TextOptions = Fayde.Media.TextOptions;
    var TranslateTransform = Fayde.Media.TranslateTransform;
    var VisualTransition = Fayde.Media.VisualStateManager.VisualTransition;
    var DoubleAnimationUsingKeyFrames = Fayde.Media.Animation.DoubleAnimationUsingKeyFrames;
    var SplineDoubleKeyFrame = Fayde.Media.Animation.SplineDoubleKeyFrame;
    var Border = Fayde.Controls.Border;
    var TextWrapping = Fayde.Controls.TextWrapping;
    var BindingMarkup = Fayde.BindingMarkup;
    var ToolTip = Fayde.Controls.ToolTip;
    var BackEase = Fayde.Media.Animation.BackEase;
    var EasingMode = Fayde.Media.Animation.EasingMode;
    var Button = Fayde.Controls.Button;
    var TextBox = Fayde.Controls.TextBox;
    var ScrollViewer = Fayde.Controls.ScrollViewer;
    var ToolTipService = Fayde.Controls.ToolTipService;
    var PlacementMode = Fayde.Controls.PlacementMode;
    var EventTrigger = Fayde.EventTrigger;
    var BeginStoryboard = Fayde.Media.Animation.BeginStoryboard;
    var Path = Fayde.Shapes.Path;
    var ComboBox = Fayde.Controls.ComboBox;
    var ToggleButton = Fayde.Controls.Primitives.ToggleButton;
    var EasingDoubleKeyFrame = Fayde.Media.Animation.EasingDoubleKeyFrame;
    var Stretch = Fayde.Media.Stretch;
    var Popup = Fayde.Controls.Primitives.Popup;
    var ItemsPresenter = Fayde.Controls.ItemsPresenter;
    var ComboBoxItem = Fayde.Controls.ComboBoxItem;
    var ColorAnimationUsingKeyFrames = Fayde.Media.Animation.ColorAnimationUsingKeyFrames;
    var EasingColorKeyFrame = Fayde.Media.Animation.EasingColorKeyFrame;
    var ScrollBar = Fayde.Controls.Primitives.ScrollBar;
    var RepeatButton = Fayde.Controls.Primitives.RepeatButton;
    var BlurEffect = Fayde.Media.Effects.BlurEffect;
    var Thumb = Fayde.Controls.Primitives.Thumb;
    var ColumnDefinition = Fayde.Controls.ColumnDefinition;
    var GridLength = Fayde.Controls.GridLength;
    var GridUnitType = Fayde.Controls.GridUnitType;
    var RowDefinition = Fayde.Controls.RowDefinition;
    var ScrollContentPresenter = Fayde.Controls.ScrollContentPresenter;
    var Orientation = Fayde.Orientation;
    var ListBox = Fayde.Controls.ListBox;
    var ListBoxItem = Fayde.Controls.ListBoxItem;
    var CheckBox = Fayde.Controls.CheckBox;
    var PenLineCap = Fayde.Shapes.PenLineCap;
    var PasswordBox = Fayde.Controls.PasswordBox;
    var ProgressBar = Fayde.Controls.ProgressBar;
    var RepeatBehavior = Fayde.Media.Animation.RepeatBehavior;
    var BrushMappingMode = Fayde.Media.BrushMappingMode;
    var GradientSpreadMethod = Fayde.Media.GradientSpreadMethod;
    var TransformGroup = Fayde.Media.TransformGroup;
    var SkewTransform = Fayde.Media.SkewTransform;
    var RadioButton = Fayde.Controls.RadioButton;
    var Slider = Fayde.Controls.Slider;

    var json = {
        Type: ResourceDictionary,
        Children: [
        {
            Key: "HighlightDarkColor", Value: {
                Type: Color,
                Props: {
                    HexString: "#FF119EDA"
                }
            }
        },
        {
            Key: "HighlightLightColor", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFB2E0F4"
                }
            }
        },
        {
            Key: "AccentColor", Value: {
                Type: Color,
                Props: {
                    HexString: "#CC119EDA"
                }
            }
        },
        {
            Key: "AccentColor2", Value: {
                Type: Color,
                Props: {
                    HexString: "#99119EDA"
                }
            }
        },
        {
            Key: "AccentColor3", Value: {
                Type: Color,
                Props: {
                    HexString: "#66119EDA"
                }
            }
        },
        {
            Key: "AccentColor4", Value: {
                Type: Color,
                Props: {
                    HexString: "#33119EDA"
                }
            }
        },
        {
            Key: "BlackColor", Value: {
                Type: Color,
                Props: {
                    HexString: "#FF000000"
                }
            }
        },
        {
            Key: "WhiteColor", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFFFFFFF"
                }
            }
        },
        {
            Key: "Gray1", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFCCCCCC"
                }
            }
        },
        {
            Key: "Gray2", Value: {
                Type: Color,
                Props: {
                    HexString: "#FF7F7F7F"
                }
            }
        },
        {
            Key: "Gray3", Value: {
                Type: Color,
                Props: {
                    HexString: "#FF333333"
                }
            }
        },
        {
            Key: "Gray4", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFB9B9B9"
                }
            }
        },
        {
            Key: "Gray5", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFD8D8D9"
                }
            }
        },
        {
            Key: "Gray6", Value: {
                Type: Color,
                Props: {
                    HexString: "#FF9D9D9D"
                }
            }
        },
        {
            Key: "Gray7", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFF7F7F7"
                }
            }
        },
        {
            Key: "Gray8", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFE0E0E0"
                }
            }
        },
        {
            Key: "Gray9", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFA59F93"
                }
            }
        },
        {
            Key: "Gray10", Value: {
                Type: Color,
                Props: {
                    HexString: "#7FFFFFFF"
                }
            }
        },
        {
            Key: "Gray11", Value: {
                Type: Color,
                Props: {
                    HexString: "#7FA9A9A9"
                }
            }
        },
        {
            Key: "Gray12", Value: {
                Type: Color,
                Props: {
                    HexString: "#A5F7F7F7"
                }
            }
        },
        {
            Key: "Gray13", Value: {
                Type: Color,
                Props: {
                    HexString: "#5EC9C9C9"
                }
            }
        },
        {
            Key: "TextBoxText", Value: {
                Type: Color,
                Props: {
                    HexString: "#FF414141"
                }
            }
        },
        {
            Key: "NormalForegroundColor", Value: {
                Type: Color,
                Props: {
                    HexString: "#FF000000"
                }
            }
        },
        {
            Key: "HoverForegroundColor", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFFFFFFF"
                }
            }
        },
        {
            Key: "BaseColor2", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFFFFFFF"
                }
            }
        },
        {
            Key: "BaseColor5", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFBABABA"
                }
            }
        },
        {
            Key: "BaseColor3", Value: {
                Type: Color,
                Props: {
                    HexString: "#FF303030"
                }
            }
        },
        {
            Key: "TransparentWhiteColor", Value: {
                Type: Color,
                Props: {
                    HexString: "#00FFFFFF"
                }
            }
        },
        {
            Key: "TransparentWhiteLightColor", Value: {
                Type: Color,
                Props: {
                    HexString: "#19FFFFFF"
                }
            }
        },
        {
            Key: "TransparentLightestColor", Value: {
                Type: Color,
                Props: {
                    HexString: "#34FFFFFF"
                }
            }
        },
        {
            Key: "TransparentLightLightColor", Value: {
                Type: Color,
                Props: {
                    HexString: "#A5FFFFFF"
                }
            }
        },
        {
            Key: "TransparentLightColor", Value: {
                Type: Color,
                Props: {
                    HexString: "#D8FFFFFF"
                }
            }
        },
        {
            Key: "TransparentBlackColor", Value: {
                Type: Color,
                Props: {
                    HexString: "#00000000"
                }
            }
        },
        {
            Key: "TransparentDarkColor", Value: {
                Type: Color,
                Props: {
                    HexString: "#3F000000"
                }
            }
        },
        {
            Key: "TransparentDarkDarkColor", Value: {
                Type: Color,
                Props: {
                    HexString: "#59000000"
                }
            }
        },
        {
            Key: "TransparentDarkDarkDarkColor", Value: {
                Type: Color,
                Props: {
                    HexString: "#99000000"
                }
            }
        },
        {
            Key: "TransparentDarkestColor", Value: {
                Type: Color,
                Props: {
                    HexString: "#CC000000"
                }
            }
        },
        {
            Key: "ValidationColor1", Value: {
                Type: Color,
                Props: {
                    HexString: "#052A2E31"
                }
            }
        },
        {
            Key: "ValidationColor2", Value: {
                Type: Color,
                Props: {
                    HexString: "#152A2E31"
                }
            }
        },
        {
            Key: "ValidationColor3", Value: {
                Type: Color,
                Props: {
                    HexString: "#252A2E31"
                }
            }
        },
        {
            Key: "ValidationColor4", Value: {
                Type: Color,
                Props: {
                    HexString: "#352A2E31"
                }
            }
        },
        {
            Key: "ValidationColor5", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFDC000C"
                }
            }
        },
        {
            Key: "ValidationSummaryColor1", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFDC020D"
                }
            }
        },
        {
            Key: "ValidationSummaryColor2", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFCA000C"
                }
            }
        },
        {
            Key: "ValidationSummaryColor3", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFFF9298"
                }
            }
        },
        {
            Key: "ValidationSummaryColor4", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFFDC8C8"
                }
            }
        },
        {
            Key: "ValidationSummaryColor5", Value: {
                Type: Color,
                Props: {
                    HexString: "#DDD43940"
                }
            }
        },
        {
            Key: "ValidationSummaryFillColor1", Value: {
                Type: Color,
                Props: {
                    HexString: "#59F7D8DB"
                }
            }
        },
        {
            Key: "ValidationSummaryFillColor2", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFF7D8DB"
                }
            }
        },
        {
            Key: "ControlsValidationColor", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFDB000C"
                }
            }
        },
        {
            Key: "ProgressIndeterminateColor1", Value: {
                Type: Color,
                Props: {
                    HexString: "#33878787"
                }
            }
        },
        {
            Key: "ProgressIndeterminateColor2", Value: {
                Type: Color,
                Props: {
                    HexString: "#33959595"
                }
            }
        },
        {
            Key: "ProgressIndeterminateColor3", Value: {
                Type: Color,
                Props: {
                    HexString: "#4C000000"
                }
            }
        },
        {
            Key: "ProgressIndeterminateColor4", Value: {
                Type: Color,
                Props: {
                    HexString: "#4C000000"
                }
            }
        },
        {
            Key: "PageOverlayColor", Value: {
                Type: Color,
                Props: {
                    HexString: "#7F000000"
                }
            }
        },
        {
            Key: "RatingStarsColor", Value: {
                Type: Color,
                Props: {
                    HexString: "#F6FF9900"
                }
            }
        },
        {
            Key: "RatingMouseOverColor", Value: {
                Type: Color,
                Props: {
                    HexString: "#F6FDFF70"
                }
            }
        },
        {
            Key: "TimeHintIconColor1", Value: {
                Type: Color,
                Props: {
                    HexString: "#F6CAA709"
                }
            }
        },
        {
            Key: "TimeHintIconColor2", Value: {
                Type: Color,
                Props: {
                    HexString: "#F3F7F34F"
                }
            }
        },
        {
            Key: "TimeHintIconColor3", Value: {
                Type: Color,
                Props: {
                    HexString: "#E7CAA709"
                }
            }
        },
        {
            Key: "TimeHintIconColor4", Value: {
                Type: Color,
                Props: {
                    HexString: "#E7967C07"
                }
            }
        },
        {
            Key: "TimeHintIconColor5", Value: {
                Type: Color,
                Props: {
                    HexString: "#E7625106"
                }
            }
        },
        {
            Key: "TimeHintIconColor6", Value: {
                Type: Color,
                Props: {
                    HexString: "#FB8F8873"
                }
            }
        },
        {
            Key: "TimeHintIconColor7", Value: {
                Type: Color,
                Props: {
                    HexString: "#F6271A47"
                }
            }
        },
        {
            Key: "TimeHintIconColor8", Value: {
                Type: Color,
                Props: {
                    HexString: "#E7271A47"
                }
            }
        },
        {
            Key: "TimeHintIconColor9", Value: {
                Type: Color,
                Props: {
                    HexString: "#9A89782B"
                }
            }
        },
        {
            Key: "TimeHintIconColor10", Value: {
                Type: Color,
                Props: {
                    HexString: "#4DEBD60F"
                }
            }
        },
        {
            Key: "TimeHintIconColor11", Value: {
                Type: Color,
                Props: {
                    HexString: "#FBF6EC20"
                }
            }
        },
        {
            Key: "TimeHintIconColor12", Value: {
                Type: Color,
                Props: {
                    HexString: "#FF1B1B54"
                }
            }
        },
        {
            Key: "TimeHintIconColor13", Value: {
                Type: Color,
                Props: {
                    HexString: "#FF1C1C50"
                }
            }
        },
        {
            Key: "OKButtonIconColor1", Value: {
                Type: Color,
                Props: {
                    HexString: "#FF67CA0A"
                }
            }
        },
        {
            Key: "OKButtonIconColor2", Value: {
                Type: Color,
                Props: {
                    HexString: "#FF498C38"
                }
            }
        },
        {
            Key: "OKButtonIconColor3", Value: {
                Type: Color,
                Props: {
                    HexString: "#FF29EE5B"
                }
            }
        },
        {
            Key: "CancelButtonIconColor1", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFEA7525"
                }
            }
        },
        {
            Key: "CancelButtonIconColor2", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFDA715B"
                }
            }
        },
        {
            Key: "CancelButtonIconColor3", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFB72909"
                }
            }
        },
        {
            Key: "ChartBrush1", Value: {
                Type: Color,
                Props: {
                    HexString: "#FF0097FC"
                }
            }
        },
        {
            Key: "ChartBrush2", Value: {
                Type: Color,
                Props: {
                    HexString: "#FF70BBED"
                }
            }
        },
        {
            Key: "ChartBrush3", Value: {
                Type: Color,
                Props: {
                    HexString: "#FF70BBED"
                }
            }
        },
        {
            Key: "ChartBrush4", Value: {
                Type: Color,
                Props: {
                    HexString: "#FF4556BA"
                }
            }
        },
        {
            Key: "ChartBrush5", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFC84BA4"
                }
            }
        },
        {
            Key: "ChartBrush6", Value: {
                Type: Color,
                Props: {
                    HexString: "#FF477ABE"
                }
            }
        },
        {
            Key: "ChartBrush7", Value: {
                Type: Color,
                Props: {
                    HexString: "#FF6644B7"
                }
            }
        },
        {
            Key: "ChartBrush8", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFA045BA"
                }
            }
        },
        {
            Key: "ChartBrush9", Value: {
                Type: Color,
                Props: {
                    HexString: "#FF73C348"
                }
            }
        },
        {
            Key: "ChartBrush10", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFDD5279"
                }
            }
        },
        {
            Key: "ChartBrush11", Value: {
                Type: Color,
                Props: {
                    HexString: "#FF4999C4"
                }
            }
        },
        {
            Key: "ChartBrush12", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFEC8B58"
                }
            }
        },
        {
            Key: "ChartBrush13", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFECA058"
                }
            }
        },
        {
            Key: "ChartBrush14", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFEC6558"
                }
            }
        },
        {
            Key: "ChartBrush15", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFEC8B58"
                }
            }
        },
        {
            Key: "ChartBrush16", Value: {
                Type: Color,
                Props: {
                    HexString: "#FFECA058"
                }
            }
        },
        {
            Key: "ControlBackgroundBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("WhiteColor")
                }
            }
        },
        {
            Key: "WhiteBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("WhiteColor")
                }
            }
        },
        {
            Key: "BlackBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("BlackColor")
                }
            }
        },
        {
            Key: "TextBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("BlackColor")
                }
            }
        },
        {
            Key: "LabelTextBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("BlackColor")
                }
            }
        },
        {
            Key: "WhiteColorBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("WhiteColor")
                }
            }
        },
        {
            Key: "BlackColorBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("BlackColor")
                }
            }
        },
        {
            Key: "HighlightBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("HighlightDarkColor")
                }
            }
        },
        {
            Key: "HighlightLightBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("HighlightLightColor")
                }
            }
        },
        {
            Key: "NavigationBorderBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: {
                        Type: Color,
                        Props: {
                            HexString: "#FF9D9492"
                        }
                    }
                }
            }
        },
        {
            Key: "NavigationForegroundBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("BlackColor")
                }
            }
        },
        {
            Key: "PageBorderBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: {
                        Type: Color,
                        Props: {
                            HexString: "#FFB2B2B2"
                        }
                    }
                }
            }
        },
        {
            Key: "BodyTextColorBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: {
                        Type: Color,
                        Props: {
                            HexString: "#FF313131"
                        }
                    }
                }
            }
        },
        {
            Key: "ControlsDisabledBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TransparentLightLightColor")
                }
            }
        },
        {
            Key: "ReadOnlyBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TransparentLightestColor")
                }
            }
        },
        {
            Key: "DisabledForegroundBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: {
                        Type: Color,
                        Props: {
                            HexString: "#FFAAAAAA"
                        }
                    }
                }
            }
        },
        {
            Key: "DisabledControlBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: {
                        Type: Color,
                        Props: {
                            HexString: "#FFAAAAAA"
                        }
                    }
                }
            }
        },
        {
            Key: "DisabledWhiteColorBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("WhiteColor")
                }
            }
        },
        {
            Key: "RatingStarsBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("RatingStarsColor")
                }
            }
        },
        {
            Key: "RatingMouseOverBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("RatingMouseOverColor")
                }
            }
        },
        {
            Key: "PageOverlayBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("PageOverlayColor")
                }
            }
        },
        {
            Key: "FuzzBrush1", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: {
                        Type: Color,
                        Props: {
                            HexString: "#1E000000"
                        }
                    }
                }
            }
        },
        {
            Key: "FuzzBrush2", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: {
                        Type: Color,
                        Props: {
                            HexString: "#14000000"
                        }
                    }
                }
            }
        },
        {
            Key: "FuzzBrush3", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: {
                        Type: Color,
                        Props: {
                            HexString: "Black"
                        }
                    }
                }
            }
        },
        {
            Key: "TransparentWhiteBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TransparentWhiteColor")
                }
            }
        },
        {
            Key: "TransparentWhiteLightBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TransparentWhiteColor")
                }
            }
        },
        {
            Key: "TransparentLightestBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TransparentLightestColor")
                }
            }
        },
        {
            Key: "TransparentLightLightBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TransparentLightLightColor")
                }
            }
        },
        {
            Key: "TransparentBlackBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TransparentBlackColor")
                }
            }
        },
        {
            Key: "TransparentDarkBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TransparentDarkColor")
                }
            }
        },
        {
            Key: "TransparentDarkDarkDarkBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TransparentDarkDarkDarkColor")
                }
            }
        },
        {
            Key: "GrayBrush1", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray1")
                }
            }
        },
        {
            Key: "GrayBrush2", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray2")
                }
            }
        },
        {
            Key: "GrayBrush3", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray3")
                }
            }
        },
        {
            Key: "GrayBrush4", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray4")
                }
            }
        },
        {
            Key: "GrayBrush5", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray5")
                }
            }
        },
        {
            Key: "GrayBrush6", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray6")
                }
            }
        },
        {
            Key: "GrayBrush7", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray7")
                }
            }
        },
        {
            Key: "GrayBrush8", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray8")
                }
            }
        },
        {
            Key: "GrayBrush9", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray9")
                }
            }
        },
        {
            Key: "GrayBrush10", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray10")
                }
            }
        },
        {
            Key: "GrayBrush11", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray11")
                }
            }
        },
        {
            Key: "GrayBrush12", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray12")
                }
            }
        },
        {
            Key: "GrayBrush13", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray13")
                }
            }
        },
        {
            Key: "HoverHyperlinkForegroundBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("BlackColor")
                }
            }
        },
        {
            Key: "HoverHyperlinkBackgroundBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("WhiteColor")
                }
            }
        },
        {
            Key: "TextBoxBorderBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray1")
                }
            }
        },
        {
            Key: "ControlBorderBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray1")
                }
            }
        },
        {
            Key: "TextBoxMouseOverBorderBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("HighlightDarkColor")
                }
            }
        },
        {
            Key: "TextBoxMouseOverInnerBorderBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("HighlightLightColor")
                }
            }
        },
        {
            Key: "CheckBoxBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray2")
                }
            }
        },
        {
            Key: "CheckBoxMouseOverBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray3")
                }
            }
        },
        {
            Key: "CheckBoxBackgroundBrush", Value: {
                Type: LinearGradientBrush,
                Props: {
                    EndPoint: new Point(0.5, 1),
                    StartPoint: new Point(0.5, 0)
                },
                Children: [
                {
                    Type: GradientStop,
                    Props: {
                        Color: {
                            Type: Color,
                            Props: {
                                HexString: "#FFE5E5E5"
                            }
                        },
                        Offset: 0
                    }
                },
                {
                    Type: GradientStop,
                    Props: {
                        Color: new StaticResourceMarkup("WhiteColor"),
                        Offset: 1
                    }
                }]

            }
        },
        {
            Key: "ApplicationNameBrush", Value: {
                Type: LinearGradientBrush,
                Props: {
                    EndPoint: new Point(0.5, 1),
                    StartPoint: new Point(0.5, 0)
                },
                Children: [
                {
                    Type: GradientStop,
                    Props: {
                        Color: {
                            Type: Color,
                            Props: {
                                HexString: "#FF14BBD2"
                            }
                        },
                        Offset: 0
                    }
                },
                {
                    Type: GradientStop,
                    Props: {
                        Color: {
                            Type: Color,
                            Props: {
                                HexString: "#FF013C6C"
                            }
                        },
                        Offset: 1
                    }
                }]

            }
        },
        {
            Key: "ThumbBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray4")
                }
            }
        },
        {
            Key: "ItemSelectedBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray5")
                }
            }
        },
        {
            Key: "SliderTrackBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray6")
                }
            }
        },
        {
            Key: "NormalBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray7")
                }
            }
        },
        {
            Key: "ComboBoxPopupBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray9")
                }
            }
        },
        {
            Key: "BrandingBrush", Value: {
                Type: LinearGradientBrush,
                Props: {
                    EndPoint: new Point(0.001, 0.5),
                    StartPoint: new Point(1.002, 0.5)
                },
                Children: [
                {
                    Type: GradientStop,
                    Props: {
                        Color: new StaticResourceMarkup("HighlightDarkColor"),
                        Offset: 0
                    }
                },
                {
                    Type: GradientStop,
                    Props: {
                        Color: {
                            Type: Color,
                            Props: {
                                HexString: "#FF5FC316"
                            }
                        },
                        Offset: 1
                    }
                }]

            }
        },
        {
            Key: "DropShadowBrush", Value: {
                Type: DropShadowEffect,
                Props: {
                    Direction: 330,
                    Opacity: 0.3,
                    ShadowDepth: 0,
                    BlurRadius: 6
                }
            }
        },
        {
            Key: "WindowBackgroundBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("WhiteColor")
                }
            }
        },
        {
            Key: "SeperatorBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: {
                        Type: Color,
                        Props: {
                            HexString: "#FFC4C4C5"
                        }
                    }
                }
            }
        },
        {
            Key: "ControlsValidationBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ControlsValidationColor")
                }
            }
        },
        {
            Key: "ValidationBrush1", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationColor1")
                }
            }
        },
        {
            Key: "ValidationBrush2", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationColor2")
                }
            }
        },
        {
            Key: "ValidationBrush3", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationColor3")
                }
            }
        },
        {
            Key: "ValidationBrush4", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationColor4")
                }
            }
        },
        {
            Key: "ValidationBrush5", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationColor5")
                }
            }
        },
        {
            Key: "ValidationSummaryBrush1", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationSummaryColor1")
                }
            }
        },
        {
            Key: "ValidationSummaryBrush2", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationSummaryColor2")
                }
            }
        },
        {
            Key: "ValidationSummaryBrush3", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationSummaryColor3")
                }
            }
        },
        {
            Key: "ValidationSummaryBrush4", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationSummaryColor4")
                }
            }
        },
        {
            Key: "ValidationSummaryBrush5", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationSummaryColor5")
                }
            }
        },
        {
            Key: "ValidationSummaryFillBrush1", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationSummaryFillColor1")
                }
            }
        },
        {
            Key: "ValidationSummaryFillBrush2", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationSummaryFillColor2")
                }
            }
        },
        {
            Key: "ValidationSummaryDisabledBrush", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TransparentLightLightColor")
                }
            }
        },
        {
            Key: "TimeHintIconBrush1", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor1")
                }
            }
        },
        {
            Key: "TimeHintIconBrush2", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor2")
                }
            }
        },
        {
            Key: "TimeHintIconBrush3", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor3")
                }
            }
        },
        {
            Key: "TimeHintIconBrush4", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor4")
                }
            }
        },
        {
            Key: "TimeHintIconBrush5", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor5")
                }
            }
        },
        {
            Key: "TimeHintIconBrush6", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor6")
                }
            }
        },
        {
            Key: "TimeHintIconBrush7", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor7")
                }
            }
        },
        {
            Key: "TimeHintIconBrush8", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor8")
                }
            }
        },
        {
            Key: "TimeHintIconBrush9", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor9")
                }
            }
        },
        {
            Key: "TimeHintIconBrush10", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor10")
                }
            }
        },
        {
            Key: "TimeHintIconBrush11", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor11")
                }
            }
        },
        {
            Key: "TimeHintIconBrush12", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor12")
                }
            }
        },
        {
            Key: "TimeHintIconBrush13", Value: {
                Type: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor13")
                }
            }
        },
        {
            Key: "HeaderFontFamily", Value: {
                Type: FontFamily,
                Props: {
                    FamilyNames: "Segoe UI Light, Lucida Sans Unicode, Verdana"
                }
            }
        },
        {
            Key: "ContentFontFamily", Value: {
                Type: FontFamily,
                Props: {
                    FamilyNames: "Segoe UI, Lucida Sans Unicode, Verdana"
                }
            }
        },
        {
            Key: "ApplicationNameFontSize", Value: {
                Type: Number,
                Key: "ApplicationNameFontSize",
                Value: 50
            }
        },
        {
            Key: "HeaderFontSize", Value: {
                Type: Number,
                Key: "HeaderFontSize",
                Value: 21.333
            }
        },
        {
            Key: "NavigationFontSize", Value: {
                Type: Number,
                Key: "NavigationFontSize",
                Value: 28
            }
        },
        {
            Key: "ContentFontSize", Value: {
                Type: Number,
                Key: "ContentFontSize",
                Value: 14
            }
        },
        {
            Key: "HyperlinkFontSize", Value: {
                Type: Number,
                Key: "HyperlinkFontSize",
                Value: 14
            }
        },
        {
            Key: "LabelFontSize", Value: {
                Type: Number,
                Key: "LabelFontSize",
                Value: 12
            }
        },
        {
            Key: "ControlTitleFontSize", Value: {
                Type: Number,
                Key: "ControlTitleFontSize",
                Value: 16
            }
        },
        {
            Key: "ControlTitleBigFontSize", Value: {
                Type: Number,
                Key: "ControlTitleBigFontSize",
                Value: 18
            }
        },
        {
            Key: "ControlContentFontSize", Value: {
                Type: Number,
                Key: "ControlContentFontSize",
                Value: 10
            }
        },
        {
            Key: "SearchButtonStyle", Value: {
                Type: Style,
                Props: {
                    TargetType: HyperlinkButton
                },
                Children: [
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "Margin"),
                        Value: "-22,0,20,0"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "ContentTemplate"),
                        Value: {
                            Type: DataTemplate,
                            Content: {
                                Type: Grid,
                                Props: {
                                    Width: 14,
                                    Height: 16,
                                    HorizontalAlignment: HorizontalAlignment.Center,
                                    VerticalAlignment: VerticalAlignment.Center,
                                    Margin: new Thickness(3, 2, 0, 0)
                                },
                                Children: [
                                {
                                    Type: Rectangle,
                                    Props: {
                                        Fill: {
                                            Type: SolidColorBrush,
                                            Props: {
                                                Color: {
                                                    Type: Color,
                                                    Props: {
                                                        HexString: "#FF767676"
                                                    }
                                                }
                                            }
                                        },
                                        HorizontalAlignment: HorizontalAlignment.Right,
                                        Height: 8,
                                        Margin: new Thickness(0, 0, -0.164, -0.334),
                                        RadiusY: 0.5,
                                        RadiusX: 0.5,
                                        RenderTransformOrigin: new Point(0.5, 0.5),
                                        Stroke: {
                                            Type: SolidColorBrush,
                                            Props: {
                                                Color: {
                                                    Type: Color,
                                                    Props: {
                                                        HexString: "#FF767676"
                                                    }
                                                }
                                            }
                                        },
                                        UseLayoutRounding: false,
                                        VerticalAlignment: VerticalAlignment.Bottom,
                                        Width: 4,
                                        RenderTransform: {
                                            Type: RotateTransform,
                                            Props: {
                                                Angle: -45
                                            }
                                        }
                                    }
                                },
                                {
                                    Type: Ellipse,
                                    Props: {
                                        Fill: {
                                            Type: SolidColorBrush,
                                            Props: {
                                                Color: {
                                                    Type: Color,
                                                    Props: {
                                                        HexString: "#00FFFFFF"
                                                    }
                                                }
                                            }
                                        },
                                        Margin: new Thickness(0, 0, 1, 3),
                                        Stroke: {
                                            Type: SolidColorBrush,
                                            Props: {
                                                Color: {
                                                    Type: Color,
                                                    Props: {
                                                        HexString: "#FF767676"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }]

                            }
                        }
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
                                Name: "grid",
                                Props: {
                                    Cursor: new TemplateBindingMarkup("Cursor"),
                                    Margin: new Thickness(-6, 0, 0, -4),
                                    Background: {
                                        Type: SolidColorBrush,
                                        Props: {
                                            Color: new StaticResourceMarkup("BaseColor2")
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
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
                                                        To: new StaticResourceMarkup("HighlightLightColor")
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(SolidColorBrush.Color)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "ContentPresenterWrapperColor"
                                                    }
                                                    ]
                                                },
                                                {
                                                    Type: ColorAnimation,
                                                    Props: {
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
                                                        To: new StaticResourceMarkup("Gray5")
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(Panel.Background).(SolidColorBrush.Color)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "grid"
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
                                                        To: new StaticResourceMarkup("Gray5")
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(Panel.Background).(SolidColorBrush.Color)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "grid"
                                                    }
                                                    ]
                                                },
                                                {
                                                    Type: DoubleAnimation,
                                                    Props: {
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
                                                        To: 0.8
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "grid"
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
                                                    Type: ObjectAnimationUsingKeyFrames,
                                                    Props: {
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "DisabledOverlay"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
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
                                            Name: "Focused"
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
                                        Margin: new TemplateBindingMarkup("Padding"),
                                        Text: new TemplateBindingMarkup("Content"),
                                        TextDecorations: Fayde.TextDecorations.Underline,
                                        Visibility: Visibility.Collapsed,
                                        VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment"),
                                        Foreground: {
                                            Type: SolidColorBrush,
                                            Props: {
                                                Color: new StaticResourceMarkup("HighlightDarkColor")
                                            }
                                        }
                                    }
                                },
                                {
                                    Type: TextBlock,
                                    Name: "DisabledOverlay",
                                    Props: {
                                        Foreground: new StaticResourceMarkup("DisabledForegroundBrush"),
                                        HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                        Margin: new TemplateBindingMarkup("Padding"),
                                        Text: new TemplateBindingMarkup("Content"),
                                        Visibility: Visibility.Collapsed,
                                        VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment")
                                    },
                                    AttachedProps: [{
                                        Owner: Canvas,
                                        Prop: "ZIndex",
                                        Value: 1
                                    }
                                    ]
                                },
                                {
                                    Type: ContentControl,
                                    Props: {
                                        Foreground: {
                                            Type: SolidColorBrush,
                                            Name: "ContentPresenterWrapperColor",
                                            Props: {
                                                Color: new StaticResourceMarkup("HighlightDarkColor")
                                            }
                                        }
                                    },
                                    Content: {
                                        Type: ContentPresenter,
                                        Name: "contentPresenter",
                                        Props: {
                                            ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
                                            Width: 21,
                                            Margin: new Thickness(2, 3, 0, 0)
                                        },
                                        Content: new TemplateBindingMarkup("Content")
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Name: "FocusVisualElement",
                                    Props: {
                                        IsHitTestVisible: false,
                                        Opacity: 0,
                                        StrokeThickness: 1,
                                        Stroke: {
                                            Type: SolidColorBrush,
                                            Props: {
                                                Color: new StaticResourceMarkup("HighlightLightColor")
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
            Key: "ControlLabelStyle", Value: {
                Type: Style,
                Props: {
                    TargetType: TextBlock
                },
                Children: [
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBlock, "Foreground"),
                        Value: new StaticResourceMarkup("LabelTextBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBlock, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBlock, "FontSize"),
                        Value: new StaticResourceMarkup("LabelFontSize")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextOptions, "TextHintingMode"),
                        Value: "Animated"
                    }
                }]

            }
        },
        {
            Key: "ValidationToolTipTemplate", Value: {
                Type: ControlTemplate,
                Content: {
                    Type: Grid,
                    Name: "Root",
                    Props: {
                        Margin: new Thickness(5, 0, 5, 0),
                        Opacity: 0,
                        RenderTransformOrigin: new Point(0, 0),
                        RenderTransform: {
                            Type: TranslateTransform,
                            Name: "xform",
                            Props: {
                                X: -25
                            }
                        }
                    },
                    AttachedProps: [{
                        Owner: VisualStateManager,
                        Prop: "VisualStateGroups",
                        Value: [
                        {
                            Type: VisualStateGroup,
                            Name: "OpenStates",
                            Props: {
                                Transitions: [
                                {
                                    Type: VisualTransition,
                                    Props: {
                                        GeneratedDuration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                    }
                                },
                                {
                                    Type: VisualTransition,
                                    Props: {
                                        GeneratedDuration: new Duration(new TimeSpan(0, 0, 0, 0, 200)),
                                        To: "Open"
                                    },
                                    Content: {
                                        Type: Storyboard,
                                        Children: [
                                        {
                                            Type: DoubleAnimationUsingKeyFrames,
                                            AttachedProps: [{
                                                Owner: Storyboard,
                                                Prop: "TargetProperty",
                                                Value: new PropertyPath("X")

                                            },
                                            {
                                                Owner: Storyboard,
                                                Prop: "TargetName",
                                                Value: "xform"
                                            }
                                            ],
                                            Children: [
                                            {
                                                Type: SplineDoubleKeyFrame,
                                                Props: {
                                                    KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 200)),
                                                    Value: 0
                                                }
                                            }]

                                        },
                                        {
                                            Type: DoubleAnimationUsingKeyFrames,
                                            AttachedProps: [{
                                                Owner: Storyboard,
                                                Prop: "TargetProperty",
                                                Value: new PropertyPath("Opacity")

                                            },
                                            {
                                                Owner: Storyboard,
                                                Prop: "TargetName",
                                                Value: "Root"
                                            }
                                            ],
                                            Children: [
                                            {
                                                Type: SplineDoubleKeyFrame,
                                                Props: {
                                                    KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 200)),
                                                    Value: 1
                                                }
                                            }]

                                        }]

                                    }
                                }]

                            },
                            Children: [
                            {
                                Type: VisualState,
                                Name: "Closed",
                                Content: {
                                    Type: Storyboard,
                                    Children: [
                                    {
                                        Type: DoubleAnimationUsingKeyFrames,
                                        AttachedProps: [{
                                            Owner: Storyboard,
                                            Prop: "TargetProperty",
                                            Value: new PropertyPath("Opacity")

                                        },
                                        {
                                            Owner: Storyboard,
                                            Prop: "TargetName",
                                            Value: "Root"
                                        }
                                        ],
                                        Children: [
                                        {
                                            Type: SplineDoubleKeyFrame,
                                            Props: {
                                                KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                Value: 0
                                            }
                                        }]

                                    }]

                                }
                            },
                            {
                                Type: VisualState,
                                Name: "Open",
                                Content: {
                                    Type: Storyboard,
                                    Children: [
                                    {
                                        Type: DoubleAnimationUsingKeyFrames,
                                        AttachedProps: [{
                                            Owner: Storyboard,
                                            Prop: "TargetProperty",
                                            Value: new PropertyPath("X")

                                        },
                                        {
                                            Owner: Storyboard,
                                            Prop: "TargetName",
                                            Value: "xform"
                                        }
                                        ],
                                        Children: [
                                        {
                                            Type: SplineDoubleKeyFrame,
                                            Props: {
                                                KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                Value: 0
                                            }
                                        }]

                                    },
                                    {
                                        Type: DoubleAnimationUsingKeyFrames,
                                        AttachedProps: [{
                                            Owner: Storyboard,
                                            Prop: "TargetProperty",
                                            Value: new PropertyPath("Opacity")

                                        },
                                        {
                                            Owner: Storyboard,
                                            Prop: "TargetName",
                                            Value: "Root"
                                        }
                                        ],
                                        Children: [
                                        {
                                            Type: SplineDoubleKeyFrame,
                                            Props: {
                                                KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                Value: 1
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
                        Props: {
                            Background: new StaticResourceMarkup("ValidationBrush1"),
                            CornerRadius: new CornerRadius(5, 5, 5, 5),
                            Margin: new Thickness(4, 4, -4, -4)
                        }
                    },
                    {
                        Type: Border,
                        Props: {
                            Background: new StaticResourceMarkup("ValidationBrush2"),
                            CornerRadius: new CornerRadius(4, 4, 4, 4),
                            Margin: new Thickness(3, 3, -3, -3)
                        }
                    },
                    {
                        Type: Border,
                        Props: {
                            Background: new StaticResourceMarkup("ValidationBrush3"),
                            CornerRadius: new CornerRadius(3, 3, 3, 3),
                            Margin: new Thickness(2, 2, -2, -2)
                        }
                    },
                    {
                        Type: Border,
                        Props: {
                            Background: new StaticResourceMarkup("ValidationBrush4"),
                            CornerRadius: new CornerRadius(2, 2, 2, 2),
                            Margin: new Thickness(1, 1, -1, -1)
                        }
                    },
                    {
                        Type: Border,
                        Props: {
                            Background: new StaticResourceMarkup("ValidationBrush5"),
                            CornerRadius: new CornerRadius(2, 2, 2, 2)
                        }
                    },
                    {
                        Type: Border,
                        Props: {
                            CornerRadius: new CornerRadius(2, 2, 2, 2)
                        },
                        Content: {
                            Type: TextBlock,
                            Props: {
                                Foreground: new StaticResourceMarkup("WhiteColorBrush"),
                                MaxWidth: 250,
                                Margin: new Thickness(8, 4, 8, 4),
                                TextWrapping: TextWrapping.Wrap,
                                Text: new BindingMarkup({ Path: "(Validation.Errors)[0].ErrorContent" }),
                                UseLayoutRounding: false
                            }
                        }
                    }]

                }
            }
        },
        {
            Key: "CommonValidationToolTipTemplate", Value: {
                Type: ControlTemplate,
                Props: {
                    TargetType: ToolTip
                },
                Content: {
                    Type: Grid,
                    Name: "Root",
                    Props: {
                        Margin: new Thickness(5, 0, 5, 0),
                        Opacity: 0,
                        RenderTransformOrigin: new Point(0, 0),
                        RenderTransform: {
                            Type: TranslateTransform,
                            Name: "Translation",
                            Props: {
                                X: -25
                            }
                        }
                    },
                    AttachedProps: [{
                        Owner: VisualStateManager,
                        Prop: "VisualStateGroups",
                        Value: [
                        {
                            Type: VisualStateGroup,
                            Name: "OpenStates",
                            Props: {
                                Transitions: [
                                {
                                    Type: VisualTransition,
                                    Props: {
                                        GeneratedDuration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                    }
                                },
                                {
                                    Type: VisualTransition,
                                    Props: {
                                        GeneratedDuration: new Duration(new TimeSpan(0, 0, 0, 0, 200)),
                                        To: "Open"
                                    },
                                    Content: {
                                        Type: Storyboard,
                                        Children: [
                                        {
                                            Type: DoubleAnimation,
                                            Props: {
                                                Duration: new Duration(new TimeSpan(0, 0, 0, 0, 200)),
                                                To: 0,
                                                EasingFunction: {
                                                    Type: BackEase,
                                                    Props: {
                                                        Amplitude: 0.3,
                                                        EasingMode: EasingMode.EaseOut
                                                    }
                                                }
                                            },
                                            AttachedProps: [{
                                                Owner: Storyboard,
                                                Prop: "TargetName",
                                                Value: "Translation"
                                            },
                                            {
                                                Owner: Storyboard,
                                                Prop: "TargetProperty",
                                                Value: new PropertyPath("X")

                                            }
                                            ]
                                        },
                                        {
                                            Type: DoubleAnimation,
                                            Props: {
                                                Duration: new Duration(new TimeSpan(0, 0, 0, 0, 200)),
                                                To: 1
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

                            },
                            Children: [
                            {
                                Type: VisualState,
                                Name: "Closed",
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
                            },
                            {
                                Type: VisualState,
                                Name: "Open",
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
                                            Value: "Translation"
                                        },
                                        {
                                            Owner: Storyboard,
                                            Prop: "TargetProperty",
                                            Value: new PropertyPath("X")

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
                        Type: Border,
                        Props: {
                            Margin: new Thickness(4, 4, -4, -4),
                            Background: new StaticResourceMarkup("ValidationBrush1"),
                            CornerRadius: new CornerRadius(5, 5, 5, 5)
                        }
                    },
                    {
                        Type: Border,
                        Props: {
                            Margin: new Thickness(3, 3, -3, -3),
                            Background: new StaticResourceMarkup("ValidationBrush2"),
                            CornerRadius: new CornerRadius(4, 4, 4, 4)
                        }
                    },
                    {
                        Type: Border,
                        Props: {
                            Margin: new Thickness(2, 2, -2, -2),
                            Background: new StaticResourceMarkup("ValidationBrush3"),
                            CornerRadius: new CornerRadius(3, 3, 3, 3)
                        }
                    },
                    {
                        Type: Border,
                        Props: {
                            Margin: new Thickness(1, 1, -1, -1),
                            Background: new StaticResourceMarkup("ValidationBrush4"),
                            CornerRadius: new CornerRadius(2, 2, 2, 2)
                        }
                    },
                    {
                        Type: Border,
                        Props: {
                            Background: new StaticResourceMarkup("ValidationBrush5"),
                            CornerRadius: new CornerRadius(2, 2, 2, 2)
                        },
                        Content: {
                            Type: TextBlock,
                            Props: {
                                Margin: new Thickness(8, 4, 8, 4),
                                MaxWidth: 250,
                                UseLayoutRounding: false,
                                Foreground: new StaticResourceMarkup("WhiteColorBrush"),
                                Text: new BindingMarkup({ Path: "(Validation.Errors)[0].Exception.Message" }),
                                TextWrapping: TextWrapping.Wrap
                            }
                        }
                    }]

                }
            }
        },
        {
            Key: "DefaultButtonStyle", Value: {
                Type: Style,
                Props: {
                    TargetType: Button
                },
                Children: [
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Button, "Background"),
                        Value: new StaticResourceMarkup("GrayBrush7")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Button, "BorderBrush"),
                        Value: new StaticResourceMarkup("TextBoxBorderBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Button, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Button, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Button, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextOptions, "TextHintingMode"),
                        Value: "Animated"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Button, "FontWeight"),
                        Value: "SemiBold"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Button, "Padding"),
                        Value: "5,6"
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
                                                        To: 1,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "MouseOverBorder"
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
                                                        To: 1,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "PressedBorder"
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
                                                        To: 0.7,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "DisabledVisualElement"
                                                    }
                                                    ]
                                                },
                                                {
                                                    Type: DoubleAnimation,
                                                    Props: {
                                                        To: 0.3,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "contentPresenter"
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "FocusRectangle"
                                                    }
                                                    ]
                                                },
                                                {
                                                    Type: DoubleAnimation,
                                                    Props: {
                                                        To: 1,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "FocusInnerRectangle"
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
                                        BorderBrush: new TemplateBindingMarkup("BorderBrush"),
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        Background: new TemplateBindingMarkup("Background"),
                                        CornerRadius: new CornerRadius(3, 3, 3, 3)
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Name: "DisabledVisualElement",
                                    Props: {
                                        Fill: new StaticResourceMarkup("ControlsDisabledBrush"),
                                        IsHitTestVisible: false,
                                        Opacity: 0,
                                        RadiusY: 3,
                                        RadiusX: 3
                                    }
                                },
                                {
                                    Type: Border,
                                    Name: "MouseOverBorder",
                                    Props: {
                                        Background: new StaticResourceMarkup("GrayBrush8"),
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        CornerRadius: new CornerRadius(3.5, 3.5, 3.5, 3.5),
                                        Opacity: 0
                                    }
                                },
                                {
                                    Type: Border,
                                    Name: "PressedBorder",
                                    Props: {
                                        Background: new StaticResourceMarkup("GrayBrush5"),
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        CornerRadius: new CornerRadius(3.5, 3.5, 3.5, 3.5),
                                        Opacity: 0
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Name: "FocusRectangle",
                                    Props: {
                                        Stroke: new StaticResourceMarkup("TextBoxMouseOverInnerBorderBrush"),
                                        RadiusY: 4,
                                        RadiusX: 4,
                                        Margin: new Thickness(-1, -1, -1, -1),
                                        Opacity: 0
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Name: "FocusInnerRectangle",
                                    Props: {
                                        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                        Stroke: new StaticResourceMarkup("TextBoxMouseOverBorderBrush"),
                                        RadiusX: 3,
                                        RadiusY: 3,
                                        Opacity: 0
                                    }
                                },
                                {
                                    Type: ContentPresenter,
                                    Name: "contentPresenter",
                                    Props: {
                                        ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
                                        HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                        Margin: new TemplateBindingMarkup("Padding"),
                                        VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment")
                                    },
                                    Content: new TemplateBindingMarkup("Content")
                                }]

                            }
                        }
                    }
                }]

            }
        },
        {
            Key: "DefaultHyperlinkButtonStyle", Value: {
                Type: Style,
                Props: {
                    TargetType: HyperlinkButton
                },
                Children: [
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "Foreground"),
                        Value: new StaticResourceMarkup("HighlightBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "FontSize"),
                        Value: new StaticResourceMarkup("HyperlinkFontSize")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextOptions, "TextHintingMode"),
                        Value: "Animated"
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
                                    Background: new TemplateBindingMarkup("Background"),
                                    Cursor: new TemplateBindingMarkup("Cursor")
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "UnderlineTextBlock"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: Visibility.Visible
                                                        }
                                                    }]

                                                },
                                                {
                                                    Type: ColorAnimation,
                                                    Props: {
                                                        To: new StaticResourceMarkup("HighlightLightColor"),
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "ContentPresenterWrapperColor"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Color")

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
                                                    Type: ObjectAnimationUsingKeyFrames,
                                                    Props: {
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "UnderlineTextBlock"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "DisabledOverlay"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
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
                                                        To: 1,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "FocusVisualElement"
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
                                        Margin: new TemplateBindingMarkup("Padding"),
                                        Text: new TemplateBindingMarkup("Content"),
                                        TextDecorations: Fayde.TextDecorations.Underline,
                                        Visibility: Visibility.Collapsed,
                                        VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment"),
                                        Foreground: {
                                            Type: SolidColorBrush,
                                            Props: {
                                                Color: new StaticResourceMarkup("HighlightDarkColor")
                                            }
                                        }
                                    }
                                },
                                {
                                    Type: TextBlock,
                                    Name: "DisabledOverlay",
                                    Props: {
                                        Foreground: new StaticResourceMarkup("DisabledForegroundBrush"),
                                        HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                        Margin: new TemplateBindingMarkup("Padding"),
                                        Text: new TemplateBindingMarkup("Content"),
                                        Visibility: Visibility.Collapsed,
                                        VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment")
                                    },
                                    AttachedProps: [{
                                        Owner: Canvas,
                                        Prop: "ZIndex",
                                        Value: 1
                                    }
                                    ]
                                },
                                {
                                    Type: ContentControl,
                                    Props: {
                                        Foreground: {
                                            Type: SolidColorBrush,
                                            Name: "ContentPresenterWrapperColor",
                                            Props: {
                                                Color: new StaticResourceMarkup("HighlightDarkColor")
                                            }
                                        }
                                    },
                                    Content: {
                                        Type: ContentPresenter,
                                        Name: "contentPresenter",
                                        Props: {
                                            ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
                                            HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                            Margin: new TemplateBindingMarkup("Padding"),
                                            VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment")
                                        },
                                        Content: new TemplateBindingMarkup("Content")
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Name: "FocusVisualElement",
                                    Props: {
                                        IsHitTestVisible: false,
                                        Opacity: 0,
                                        StrokeThickness: 1,
                                        Stroke: {
                                            Type: SolidColorBrush,
                                            Props: {
                                                Color: new StaticResourceMarkup("HighlightLightColor")
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
            Key: "DefaultTextBoxStyle", Value: {
                Type: Style,
                Props: {
                    TargetType: TextBox
                },
                Children: [
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBox, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBox, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextOptions, "TextHintingMode"),
                        Value: "Animated"
                    }
                },
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
                        Property: DependencyProperty.GetDependencyProperty(TextBox, "MinHeight"),
                        Value: "26"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBox, "Background"),
                        Value: new StaticResourceMarkup("ControlBackgroundBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBox, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBox, "Padding"),
                        Value: "0"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBox, "BorderBrush"),
                        Value: new StaticResourceMarkup("TextBoxBorderBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBox, "Cursor"),
                        Value: "IBeam"
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
                                                    Type: DoubleAnimation,
                                                    Props: {
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
                                                        To: 1
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "FocusRectangle"
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "DisabledVisualElement"
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "ReadOnlyVisualElement"
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "FocusRectangle"
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "FocusInnerRectangle"
                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            Type: VisualState,
                                            Name: "Unfocused",
                                            Content: {
                                                Type: Storyboard
                                            }
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "ValidationErrorElement"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "ValidationErrorElement"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: Visibility.Visible
                                                        }
                                                    }]

                                                },
                                                {
                                                    Type: ObjectAnimationUsingKeyFrames,
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("IsOpen")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "validationTooltip"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: {
                                                                Type: Boolean,
                                                                Value: true
                                                            }
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
                                    Type: Rectangle,
                                    Name: "Base",
                                    Props: {
                                        Stroke: new TemplateBindingMarkup("BorderBrush"),
                                        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                        Opacity: 1,
                                        Fill: new StaticResourceMarkup("ControlBackgroundBrush")
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Name: "FocusRectangle",
                                    Props: {
                                        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                        Opacity: 0,
                                        Stroke: new StaticResourceMarkup("TextBoxMouseOverBorderBrush")
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Name: "FocusInnerRectangle",
                                    Props: {
                                        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                        Opacity: 0,
                                        Margin: new Thickness(1, 1, 1, 1),
                                        Stroke: new StaticResourceMarkup("TextBoxMouseOverInnerBorderBrush")
                                    }
                                },
                                {
                                    Type: Grid,
                                    Props: {
                                        Margin: new Thickness(0, 1, 0, 0)
                                    },
                                    Children: [
                                    {
                                        Type: Border,
                                        Name: "ReadOnlyVisualElement",
                                        Props: {
                                            Background: new StaticResourceMarkup("ReadOnlyBrush"),
                                            Opacity: 0
                                        }
                                    },
                                    {
                                        Type: Grid,
                                        Children: [
                                        {
                                            Type: ScrollViewer,
                                            Name: "ContentElement",
                                            Props: {
                                                BorderThickness: new Thickness(0, 0, 0, 0),
                                                IsTabStop: false,
                                                Margin: new Thickness(4, 0, 2, 2),
                                                VerticalAlignment: VerticalAlignment.Center
                                            }
                                        }]

                                    }]

                                },
                                {
                                    Type: Rectangle,
                                    Name: "DisabledVisualElement",
                                    Props: {
                                        Stroke: new StaticResourceMarkup("ControlsDisabledBrush"),
                                        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                        Fill: new StaticResourceMarkup("ControlsDisabledBrush"),
                                        IsHitTestVisible: false,
                                        Opacity: 0
                                    }
                                },
                                {
                                    Type: Border,
                                    Name: "ValidationErrorElement",
                                    Props: {
                                        BorderBrush: new StaticResourceMarkup("ControlsValidationBrush"),
                                        BorderThickness: new Thickness(1, 1, 1, 1),
                                        Visibility: Visibility.Collapsed
                                    },
                                    AttachedProps: [{
                                        Owner: ToolTipService,
                                        Prop: "ToolTip",
                                        Value: {
                                            Type: ToolTip,
                                            Name: "validationTooltip",
                                            Props: {
                                                DataContext: new BindingMarkup({}),
                                                Placement: PlacementMode.Right,
                                                PlacementTarget: new BindingMarkup({}),
                                                Template: new StaticResourceMarkup("ValidationToolTipTemplate"),
                                                Triggers: [
                                                {
                                                    Type: EventTrigger,
                                                    Props: {
                                                        RoutedEvent: "Canvas.Loaded"
                                                    },
                                                    Children: [
                                                    {
                                                        Type: BeginStoryboard,
                                                        Content: {
                                                            Type: Storyboard,
                                                            Children: [
                                                            {
                                                                Type: ObjectAnimationUsingKeyFrames,
                                                                AttachedProps: [{
                                                                    Owner: Storyboard,
                                                                    Prop: "TargetProperty",
                                                                    Value: new PropertyPath("IsHitTestVisible")

                                                                },
                                                                {
                                                                    Owner: Storyboard,
                                                                    Prop: "TargetName",
                                                                    Value: "validationTooltip"
                                                                }
                                                                ],
                                                                Children: [
                                                                {
                                                                    Type: DiscreteObjectKeyFrame,
                                                                    Props: {
                                                                        KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                                        Value: {
                                                                            Type: Boolean,
                                                                            Value: true
                                                                        }
                                                                    }
                                                                }]

                                                            }]

                                                        }
                                                    }]

                                                }]

                                            }
                                        }

                                    }
                                    ],
                                    Content: {
                                        Type: Grid,
                                        Props: {
                                            Background: {
                                                Type: SolidColorBrush,
                                                Props: {
                                                    Color: {
                                                        Type: Color,
                                                        Props: {
                                                            HexString: "#00FFFFFF"
                                                        }
                                                    }
                                                }
                                            },
                                            HorizontalAlignment: HorizontalAlignment.Right,
                                            Height: 12,
                                            Margin: new Thickness(1, -4, -4, 0),
                                            VerticalAlignment: VerticalAlignment.Top,
                                            Width: 12
                                        },
                                        Children: [
                                        {
                                            Type: Path,
                                            Props: {
                                                Data: "M 1,0 L6,0 A 2,2 90 0 1 8,2 L8,7 z",
                                                Fill: new StaticResourceMarkup("ValidationBrush5"),
                                                Margin: new Thickness(1, 3, 0, 0)
                                            }
                                        },
                                        {
                                            Type: Path,
                                            Props: {
                                                Data: "M 0,0 L2,0 L 8,6 L8,8",
                                                Fill: new StaticResourceMarkup("WhiteColorBrush"),
                                                Margin: new Thickness(1, 3, 0, 0)
                                            }
                                        }]

                                    }
                                }]

                            }
                        }
                    }
                }]

            }
        },
        {
            Key: "DefaultComboBoxStyle", Value: {
                Type: Style,
                Props: {
                    TargetType: ComboBox
                },
                Children: [
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBox, "Padding"),
                        Value: "6,4,25,4"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBox, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBox, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBox, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextOptions, "TextHintingMode"),
                        Value: "Animated"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBox, "Background"),
                        Value: {
                            Type: SolidColorBrush,
                            Props: {
                                Color: new StaticResourceMarkup("Gray7")
                            }
                        }
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
                        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "HorizontalScrollBarVisibility"),
                        Value: "Auto"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "VerticalScrollBarVisibility"),
                        Value: "Auto"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBox, "BorderBrush"),
                        Value: new StaticResourceMarkup("TextBoxBorderBrush")
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
                                    Resources: {
                                        Type: ResourceDictionary,
                                        Children: [
                                        {
                                            Key: "comboToggleStyle", Value: {
                                                Type: Style,
                                                Props: {
                                                    TargetType: ToggleButton
                                                },
                                                Children: [
                                                {
                                                    Type: Setter,
                                                    Props: {
                                                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Foreground"),
                                                        Value: new StaticResourceMarkup("TextBrush")
                                                    }
                                                },
                                                {
                                                    Type: Setter,
                                                    Props: {
                                                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Background"),
                                                        Value: new StaticResourceMarkup("GrayBrush7")
                                                    }
                                                },
                                                {
                                                    Type: Setter,
                                                    Props: {
                                                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "BorderBrush"),
                                                        Value: new StaticResourceMarkup("TextBoxBorderBrush")
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
                                                                                        To: 1,
                                                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                                                    },
                                                                                    AttachedProps: [{
                                                                                        Owner: Storyboard,
                                                                                        Prop: "TargetProperty",
                                                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                                                    },
                                                                                    {
                                                                                        Owner: Storyboard,
                                                                                        Prop: "TargetName",
                                                                                        Value: "MouseOverBorder"
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
                                                                                        To: 1,
                                                                                        Duration: new Duration(new TimeSpan(1))
                                                                                    },
                                                                                    AttachedProps: [{
                                                                                        Owner: Storyboard,
                                                                                        Prop: "TargetProperty",
                                                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                                                    },
                                                                                    {
                                                                                        Owner: Storyboard,
                                                                                        Prop: "TargetName",
                                                                                        Value: "PressedBorder"
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
                                                                                    Type: DoubleAnimationUsingKeyFrames,
                                                                                    AttachedProps: [{
                                                                                        Owner: Storyboard,
                                                                                        Prop: "TargetProperty",
                                                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                                                    },
                                                                                    {
                                                                                        Owner: Storyboard,
                                                                                        Prop: "TargetName",
                                                                                        Value: "CheckedRectangle"
                                                                                    }
                                                                                    ],
                                                                                    Children: [
                                                                                    {
                                                                                        Type: EasingDoubleKeyFrame,
                                                                                        Props: {
                                                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 100)),
                                                                                            Value: 1
                                                                                        }
                                                                                    }]

                                                                                },
                                                                                {
                                                                                    Type: DoubleAnimationUsingKeyFrames,
                                                                                    AttachedProps: [{
                                                                                        Owner: Storyboard,
                                                                                        Prop: "TargetProperty",
                                                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                                                    },
                                                                                    {
                                                                                        Owner: Storyboard,
                                                                                        Prop: "TargetName",
                                                                                        Value: "CheckedInnerRectangle"
                                                                                    }
                                                                                    ],
                                                                                    Children: [
                                                                                    {
                                                                                        Type: EasingDoubleKeyFrame,
                                                                                        Props: {
                                                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 100)),
                                                                                            Value: 1
                                                                                        }
                                                                                    }]

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
                                                                                        To: 1,
                                                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                                                    },
                                                                                    AttachedProps: [{
                                                                                        Owner: Storyboard,
                                                                                        Prop: "TargetProperty",
                                                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                                                    },
                                                                                    {
                                                                                        Owner: Storyboard,
                                                                                        Prop: "TargetName",
                                                                                        Value: "FocusRectangle"
                                                                                    }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    Type: DoubleAnimation,
                                                                                    Props: {
                                                                                        To: 1,
                                                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                                                    },
                                                                                    AttachedProps: [{
                                                                                        Owner: Storyboard,
                                                                                        Prop: "TargetProperty",
                                                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                                                    },
                                                                                    {
                                                                                        Owner: Storyboard,
                                                                                        Prop: "TargetName",
                                                                                        Value: "FocusInnerRectangle"
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
                                                                        BorderBrush: new TemplateBindingMarkup("BorderBrush"),
                                                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                                                        Background: new TemplateBindingMarkup("Background"),
                                                                        CornerRadius: new CornerRadius(3, 3, 3, 3)
                                                                    }
                                                                },
                                                                {
                                                                    Type: Rectangle,
                                                                    Name: "DisabledVisualElement",
                                                                    Props: {
                                                                        Fill: new StaticResourceMarkup("WhiteBrush"),
                                                                        IsHitTestVisible: false,
                                                                        Opacity: 0,
                                                                        RadiusY: 3,
                                                                        RadiusX: 3
                                                                    }
                                                                },
                                                                {
                                                                    Type: Border,
                                                                    Name: "MouseOverBorder",
                                                                    Props: {
                                                                        Background: new StaticResourceMarkup("GrayBrush8"),
                                                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                                                        CornerRadius: new CornerRadius(3.5, 3.5, 3.5, 3.5),
                                                                        Opacity: 0
                                                                    }
                                                                },
                                                                {
                                                                    Type: Border,
                                                                    Name: "PressedBorder",
                                                                    Props: {
                                                                        Background: new StaticResourceMarkup("GrayBrush5"),
                                                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                                                        CornerRadius: new CornerRadius(3.5, 3.5, 3.5, 3.5),
                                                                        Opacity: 0
                                                                    }
                                                                },
                                                                {
                                                                    Type: Rectangle,
                                                                    Name: "FocusRectangle",
                                                                    Props: {
                                                                        Stroke: new StaticResourceMarkup("TextBoxMouseOverInnerBorderBrush"),
                                                                        RadiusY: 4,
                                                                        RadiusX: 4,
                                                                        Margin: new Thickness(-1, -1, -1, -1),
                                                                        Opacity: 0
                                                                    }
                                                                },
                                                                {
                                                                    Type: Rectangle,
                                                                    Name: "FocusInnerRectangle",
                                                                    Props: {
                                                                        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                                                        Stroke: new StaticResourceMarkup("TextBoxMouseOverBorderBrush"),
                                                                        RadiusX: 3,
                                                                        RadiusY: 3,
                                                                        Opacity: 0
                                                                    }
                                                                },
                                                                {
                                                                    Type: Rectangle,
                                                                    Name: "CheckedRectangle",
                                                                    Props: {
                                                                        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                                                        RadiusY: 4,
                                                                        RadiusX: 4,
                                                                        Opacity: 0,
                                                                        Stroke: new StaticResourceMarkup("TextBoxMouseOverBorderBrush")
                                                                    }
                                                                },
                                                                {
                                                                    Type: Rectangle,
                                                                    Name: "CheckedInnerRectangle",
                                                                    Props: {
                                                                        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                                                        RadiusY: 4,
                                                                        RadiusX: 4,
                                                                        Opacity: 0,
                                                                        Margin: new Thickness(1, 1, 1, 1),
                                                                        Stroke: new StaticResourceMarkup("TextBoxMouseOverInnerBorderBrush")
                                                                    }
                                                                },
                                                                {
                                                                    Type: ContentPresenter,
                                                                    Name: "contentPresenter",
                                                                    Props: {
                                                                        ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
                                                                        HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                                                        Margin: new TemplateBindingMarkup("Padding"),
                                                                        VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment")
                                                                    },
                                                                    Content: new TemplateBindingMarkup("Content")
                                                                },
                                                                {
                                                                    Type: Rectangle,
                                                                    Name: "FocusVisualElement",
                                                                    Props: {
                                                                        IsHitTestVisible: false,
                                                                        Margin: new Thickness(1, 1, 1, 1),
                                                                        RadiusY: 3.5,
                                                                        RadiusX: 3.5,
                                                                        Stroke: new StaticResourceMarkup("HighlightBrush"),
                                                                        StrokeThickness: 1,
                                                                        Visibility: Visibility.Collapsed
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
                                                    Type: DoubleAnimationUsingKeyFrames,
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "DisabledVisualElement"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: SplineDoubleKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: 0.45
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
                                                    Type: DoubleAnimationUsingKeyFrames,
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "FocusRectangle"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: EasingDoubleKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: 1
                                                        }
                                                    }]

                                                },
                                                {
                                                    Type: DoubleAnimationUsingKeyFrames,
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "FocusInnerRectangle"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: EasingDoubleKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: 1
                                                        }
                                                    }]

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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Visibility)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "PopupBorder"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: Visibility.Visible
                                                        }
                                                    }]

                                                }]

                                            }
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "ValidationErrorElement"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "ValidationErrorElement"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: Visibility.Visible
                                                        }
                                                    }]

                                                },
                                                {
                                                    Type: ObjectAnimationUsingKeyFrames,
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("IsOpen")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "validationTooltip"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: {
                                                                Type: Boolean,
                                                                Value: true
                                                            }
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
                                                BorderBrush: new TemplateBindingMarkup("BorderBrush"),
                                                BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                                Background: new TemplateBindingMarkup("Background"),
                                                HorizontalAlignment: HorizontalAlignment.Stretch,
                                                HorizontalContentAlignment: HorizontalAlignment.Right,
                                                Margin: new Thickness(0, 0, 0, 0),
                                                Style: new StaticResourceMarkup("comboToggleStyle"),
                                                VerticalAlignment: VerticalAlignment.Stretch
                                            },
                                            Content: {
                                                Type: Path,
                                                Name: "BtnArrow",
                                                Props: {
                                                    Data: "F1 M 301.14,-189.041L 311.57,-189.041L 306.355,-182.942L 301.14,-189.041 Z",
                                                    HorizontalAlignment: HorizontalAlignment.Right,
                                                    Height: 4,
                                                    Margin: new Thickness(0, 0, 6, 0),
                                                    Stretch: Stretch.Uniform,
                                                    Width: 8,
                                                    Fill: {
                                                        Type: SolidColorBrush,
                                                        Name: "BtnArrowColor",
                                                        Props: {
                                                            Color: new StaticResourceMarkup("Gray3")
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            Type: ContentPresenter,
                                            Name: "ContentPresenter",
                                            Props: {
                                                HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                                Margin: new TemplateBindingMarkup("Padding"),
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
                                    Name: "FocusRectangle",
                                    Props: {
                                        Stroke: new StaticResourceMarkup("TextBoxMouseOverInnerBorderBrush"),
                                        RadiusY: 4,
                                        RadiusX: 4,
                                        Margin: new Thickness(-1, -1, -1, -1),
                                        Opacity: 0
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Name: "FocusInnerRectangle",
                                    Props: {
                                        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                        Stroke: new StaticResourceMarkup("TextBoxMouseOverBorderBrush"),
                                        RadiusX: 3,
                                        RadiusY: 3,
                                        Opacity: 0
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Name: "DisabledVisualElement",
                                    Props: {
                                        Fill: new StaticResourceMarkup("DisabledWhiteColorBrush"),
                                        IsHitTestVisible: false,
                                        RadiusX: 3,
                                        RadiusY: 3,
                                        Opacity: 0
                                    }
                                },
                                {
                                    Type: Border,
                                    Name: "ValidationErrorElement",
                                    Props: {
                                        BorderBrush: new StaticResourceMarkup("ControlsValidationBrush"),
                                        BorderThickness: new Thickness(1, 1, 1, 1),
                                        CornerRadius: new CornerRadius(3, 3, 3, 3),
                                        Visibility: Visibility.Collapsed
                                    },
                                    AttachedProps: [{
                                        Owner: ToolTipService,
                                        Prop: "ToolTip",
                                        Value: {
                                            Type: ToolTip,
                                            Name: "validationTooltip",
                                            Props: {
                                                DataContext: new BindingMarkup({}),
                                                Placement: PlacementMode.Right,
                                                PlacementTarget: new BindingMarkup({}),
                                                Template: new StaticResourceMarkup("ValidationToolTipTemplate"),
                                                Triggers: [
                                                {
                                                    Type: EventTrigger,
                                                    Props: {
                                                        RoutedEvent: "Canvas.Loaded"
                                                    },
                                                    Children: [
                                                    {
                                                        Type: BeginStoryboard,
                                                        Content: {
                                                            Type: Storyboard,
                                                            Children: [
                                                            {
                                                                Type: ObjectAnimationUsingKeyFrames,
                                                                AttachedProps: [{
                                                                    Owner: Storyboard,
                                                                    Prop: "TargetProperty",
                                                                    Value: new PropertyPath("IsHitTestVisible")

                                                                },
                                                                {
                                                                    Owner: Storyboard,
                                                                    Prop: "TargetName",
                                                                    Value: "validationTooltip"
                                                                }
                                                                ],
                                                                Children: [
                                                                {
                                                                    Type: DiscreteObjectKeyFrame,
                                                                    Props: {
                                                                        KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                                        Value: {
                                                                            Type: Boolean,
                                                                            Value: true
                                                                        }
                                                                    }
                                                                }]

                                                            }]

                                                        }
                                                    }]

                                                }]

                                            }
                                        }

                                    }
                                    ],
                                    Content: {
                                        Type: Grid,
                                        Props: {
                                            Background: {
                                                Type: SolidColorBrush,
                                                Props: {
                                                    Color: {
                                                        Type: Color,
                                                        Props: {
                                                            HexString: "#00FFFFFF"
                                                        }
                                                    }
                                                }
                                            },
                                            HorizontalAlignment: HorizontalAlignment.Right,
                                            Height: 12,
                                            Margin: new Thickness(1, -4, -4, 0),
                                            VerticalAlignment: VerticalAlignment.Top,
                                            Width: 12
                                        },
                                        Children: [
                                        {
                                            Type: Path,
                                            Props: {
                                                Data: "M 1,0 L6,0 A 2,2 90 0 1 8,2 L8,7 z",
                                                Fill: new StaticResourceMarkup("ValidationBrush5"),
                                                Margin: new Thickness(1, 3, 0, 0)
                                            }
                                        },
                                        {
                                            Type: Path,
                                            Props: {
                                                Data: "M 0,0 L2,0 L 8,6 L8,8",
                                                Fill: new StaticResourceMarkup("WhiteColorBrush"),
                                                Margin: new Thickness(1, 3, 0, 0)
                                            }
                                        }]

                                    }
                                },
                                {
                                    Type: Popup,
                                    Name: "Popup",
                                    Content: {
                                        Type: Border,
                                        Name: "PopupBorder",
                                        Props: {
                                            Effect: new StaticResourceMarkup("DropShadowBrush"),
                                            BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                            HorizontalAlignment: HorizontalAlignment.Stretch,
                                            Height: NaN,
                                            BorderBrush: new StaticResourceMarkup("ComboBoxPopupBrush"),
                                            Background: new StaticResourceMarkup("WhiteBrush")
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

            }
        },
        {
            Key: "DefaultComboBoxItemStyle", Value: {
                Type: Style,
                Props: {
                    TargetType: ComboBoxItem
                },
                Children: [
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBoxItem, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBoxItem, "Padding"),
                        Value: "3"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBoxItem, "HorizontalContentAlignment"),
                        Value: "Left"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBoxItem, "VerticalContentAlignment"),
                        Value: "Top"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBoxItem, "Background"),
                        Value: new StaticResourceMarkup("TransparentWhiteBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBoxItem, "BorderThickness"),
                        Value: "1"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBoxItem, "TabNavigation"),
                        Value: "Local"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBoxItem, "Template"),
                        Value: {
                            Type: ControlTemplate,
                            Props: {
                                TargetType: ComboBoxItem
                            },
                            Content: {
                                Type: Grid,
                                Props: {
                                    Background: new TemplateBindingMarkup("Background"),
                                    Margin: new Thickness(0, 0.5, 0, 0.5)
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
                                                    Type: DoubleAnimationUsingKeyFrames,
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "MouseOverRectangle"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: EasingDoubleKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 100)),
                                                            Value: 0.65
                                                        }
                                                    }]

                                                },
                                                {
                                                    Type: ColorAnimationUsingKeyFrames,
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "ContentPresenterWrapperColor"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Color")

                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: EasingColorKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: new StaticResourceMarkup("HoverForegroundColor")
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
                                                    Type: DoubleAnimationUsingKeyFrames,
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "contentPresenter"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: SplineDoubleKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: 0.55
                                                        }
                                                    }]

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
                                                    Type: DoubleAnimationUsingKeyFrames,
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "SelectedRectangle"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: EasingDoubleKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 100)),
                                                            Value: 1
                                                        }
                                                    }]

                                                },
                                                {
                                                    Type: ColorAnimationUsingKeyFrames,
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "ContentPresenterWrapperColor"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Color")

                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: EasingColorKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: new StaticResourceMarkup("HoverForegroundColor")
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
                                                Type: Storyboard
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
                                    Name: "SelectedRectangle",
                                    Props: {
                                        IsHitTestVisible: false,
                                        Opacity: 0,
                                        Fill: new StaticResourceMarkup("HighlightBrush")
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Name: "MouseOverRectangle",
                                    Props: {
                                        IsHitTestVisible: false,
                                        Opacity: 0,
                                        Fill: new StaticResourceMarkup("HighlightBrush")
                                    }
                                },
                                {
                                    Type: ContentControl,
                                    Props: {
                                        Foreground: {
                                            Type: SolidColorBrush,
                                            Name: "ContentPresenterWrapperColor",
                                            Props: {
                                                Color: new StaticResourceMarkup("NormalForegroundColor")
                                            }
                                        }
                                    },
                                    Content: {
                                        Type: ContentPresenter,
                                        Name: "contentPresenter",
                                        Props: {
                                            ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
                                            HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                            Margin: new TemplateBindingMarkup("Padding")
                                        },
                                        Content: new TemplateBindingMarkup("Content")
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Name: "FocusVisualElement",
                                    Props: {
                                        RadiusY: 1,
                                        RadiusX: 1,
                                        Stroke: new StaticResourceMarkup("HighlightBrush"),
                                        StrokeThickness: 1,
                                        Visibility: Visibility.Collapsed
                                    }
                                }]

                            }
                        }
                    }
                }]

            }
        },
        {
            Key: "DefaultTextBlockStyle", Value: {
                Type: Style,
                Props: {
                    TargetType: TextBlock
                },
                Children: [
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBlock, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBlock, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBlock, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextOptions, "TextHintingMode"),
                        Value: "Animated"
                    }
                }]

            }
        },
        {
            Key: "DefaultScrollBarStyle", Value: {
                Type: Style,
                Props: {
                    TargetType: ScrollBar
                },
                Children: [
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollBar, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollBar, "Background"),
                        Value: new StaticResourceMarkup("ControlBackgroundBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollBar, "MinWidth"),
                        Value: "20"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollBar, "MinHeight"),
                        Value: "20"
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
                                    Resources: {
                                        Type: ResourceDictionary,
                                        Children: [
                                        {
                                            Key: "RepeatButtonTemplate", Value: {
                                                Type: ControlTemplate,
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
                                                                Color: {
                                                                    Type: Color,
                                                                    Props: {
                                                                        HexString: "#00FFFFFF"
                                                                    }
                                                                }
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
                                            }
                                        },
                                        {
                                            Key: "HorizontalIncrementTemplate", Value: {
                                                Type: ControlTemplate,
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
                                                                        Type: DoubleAnimationUsingKeyFrames,
                                                                        AttachedProps: [{
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetProperty",
                                                                            Value: new PropertyPath("(UIElement.Opacity)")

                                                                        },
                                                                        {
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetName",
                                                                            Value: "HoverPath"
                                                                        }
                                                                        ],
                                                                        Children: [
                                                                        {
                                                                            Type: EasingDoubleKeyFrame,
                                                                            Props: {
                                                                                KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 100)),
                                                                                Value: 1
                                                                            }
                                                                        }]

                                                                    },
                                                                    {
                                                                        Type: DoubleAnimationUsingKeyFrames,
                                                                        AttachedProps: [{
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetProperty",
                                                                            Value: new PropertyPath("(UIElement.Opacity)")

                                                                        },
                                                                        {
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetName",
                                                                            Value: "Blur"
                                                                        }
                                                                        ],
                                                                        Children: [
                                                                        {
                                                                            Type: EasingDoubleKeyFrame,
                                                                            Props: {
                                                                                KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 100)),
                                                                                Value: 0.5
                                                                            }
                                                                        }]

                                                                    }]

                                                                }
                                                            },
                                                            {
                                                                Type: VisualState,
                                                                Name: "Pressed",
                                                                Content: {
                                                                    Type: Storyboard
                                                                }
                                                            },
                                                            {
                                                                Type: VisualState,
                                                                Name: "Disabled",
                                                                Content: {
                                                                    Type: Storyboard,
                                                                    Children: [
                                                                    {
                                                                        Type: DoubleAnimationUsingKeyFrames,
                                                                        AttachedProps: [{
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetProperty",
                                                                            Value: new PropertyPath("(UIElement.Opacity)")

                                                                        },
                                                                        {
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetName",
                                                                            Value: "Root"
                                                                        }
                                                                        ],
                                                                        Children: [
                                                                        {
                                                                            Type: EasingDoubleKeyFrame,
                                                                            Props: {
                                                                                KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 100)),
                                                                                Value: 0.5
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
                                                        Type: Path,
                                                        Props: {
                                                            Data: "F1 M 511.047,352.682L 511.047,342.252L 517.145,347.467L 511.047,352.682 Z",
                                                            Height: 6,
                                                            Stretch: Stretch.Uniform,
                                                            Width: 4,
                                                            Fill: {
                                                                Type: SolidColorBrush,
                                                                Props: {
                                                                    Color: new StaticResourceMarkup("Gray2")
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        Type: Path,
                                                        Name: "HoverPath",
                                                        Props: {
                                                            Data: "F1 M 511.047,352.682L 511.047,342.252L 517.145,347.467L 511.047,352.682 Z",
                                                            Height: 6,
                                                            Stretch: Stretch.Uniform,
                                                            Width: 4,
                                                            UseLayoutRounding: false,
                                                            Opacity: 0,
                                                            Margin: new Thickness(1, 1, 0, 0),
                                                            Fill: {
                                                                Type: SolidColorBrush,
                                                                Props: {
                                                                    Color: new StaticResourceMarkup("BlackColor")
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        Type: Path,
                                                        Name: "Blur",
                                                        Props: {
                                                            Data: "F1 M 511.047,352.682L 511.047,342.252L 517.145,347.467L 511.047,352.682 Z",
                                                            Height: 6,
                                                            Stretch: Stretch.Uniform,
                                                            Width: 4,
                                                            UseLayoutRounding: false,
                                                            Opacity: 0,
                                                            Margin: new Thickness(1, 1, 0, 0),
                                                            Effect: {
                                                                Type: BlurEffect
                                                            },
                                                            Fill: {
                                                                Type: SolidColorBrush,
                                                                Props: {
                                                                    Color: new StaticResourceMarkup("BlackColor")
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        Type: Rectangle,
                                                        Name: "DisabledElement",
                                                        Props: {
                                                            Fill: new StaticResourceMarkup("WhiteColorBrush"),
                                                            Opacity: 0,
                                                            RadiusY: 2,
                                                            RadiusX: 2
                                                        }
                                                    }]

                                                }
                                            }
                                        },
                                        {
                                            Key: "HorizontalDecrementTemplate", Value: {
                                                Type: ControlTemplate,
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
                                                                        Type: DoubleAnimationUsingKeyFrames,
                                                                        AttachedProps: [{
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetProperty",
                                                                            Value: new PropertyPath("(UIElement.Opacity)")

                                                                        },
                                                                        {
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetName",
                                                                            Value: "HoverPath"
                                                                        }
                                                                        ],
                                                                        Children: [
                                                                        {
                                                                            Type: EasingDoubleKeyFrame,
                                                                            Props: {
                                                                                KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 100)),
                                                                                Value: 1
                                                                            }
                                                                        }]

                                                                    },
                                                                    {
                                                                        Type: DoubleAnimationUsingKeyFrames,
                                                                        AttachedProps: [{
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetProperty",
                                                                            Value: new PropertyPath("(UIElement.Opacity)")

                                                                        },
                                                                        {
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetName",
                                                                            Value: "Blur"
                                                                        }
                                                                        ],
                                                                        Children: [
                                                                        {
                                                                            Type: EasingDoubleKeyFrame,
                                                                            Props: {
                                                                                KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 100)),
                                                                                Value: 0.5
                                                                            }
                                                                        }]

                                                                    }]

                                                                }
                                                            },
                                                            {
                                                                Type: VisualState,
                                                                Name: "Pressed",
                                                                Content: {
                                                                    Type: Storyboard
                                                                }
                                                            },
                                                            {
                                                                Type: VisualState,
                                                                Name: "Disabled",
                                                                Content: {
                                                                    Type: Storyboard,
                                                                    Children: [
                                                                    {
                                                                        Type: DoubleAnimationUsingKeyFrames,
                                                                        AttachedProps: [{
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetProperty",
                                                                            Value: new PropertyPath("(UIElement.Opacity)")

                                                                        },
                                                                        {
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetName",
                                                                            Value: "Root"
                                                                        }
                                                                        ],
                                                                        Children: [
                                                                        {
                                                                            Type: EasingDoubleKeyFrame,
                                                                            Props: {
                                                                                KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 100)),
                                                                                Value: 0.5
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
                                                        Type: Path,
                                                        Props: {
                                                            Data: "F1 M 110.692,342.252L 110.692,352.682L 104.594,347.467L 110.692,342.252 Z",
                                                            Height: 6,
                                                            Stretch: Stretch.Uniform,
                                                            Width: 4,
                                                            Fill: {
                                                                Type: SolidColorBrush,
                                                                Props: {
                                                                    Color: new StaticResourceMarkup("Gray2")
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        Type: Path,
                                                        Name: "HoverPath",
                                                        Props: {
                                                            Data: "F1 M 110.692,342.252L 110.692,352.682L 104.594,347.467L 110.692,342.252 Z",
                                                            Height: 6,
                                                            Stretch: Stretch.Uniform,
                                                            Width: 4,
                                                            UseLayoutRounding: false,
                                                            Opacity: 0,
                                                            Margin: new Thickness(0, 1, 0, 0),
                                                            Fill: {
                                                                Type: SolidColorBrush,
                                                                Props: {
                                                                    Color: new StaticResourceMarkup("BlackColor")
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        Type: Path,
                                                        Name: "Blur",
                                                        Props: {
                                                            Data: "F1 M 110.692,342.252L 110.692,352.682L 104.594,347.467L 110.692,342.252 Z",
                                                            Height: 6,
                                                            Stretch: Stretch.Uniform,
                                                            Width: 4,
                                                            UseLayoutRounding: false,
                                                            Opacity: 0,
                                                            Margin: new Thickness(0, 1, 0, 0),
                                                            Effect: {
                                                                Type: BlurEffect
                                                            },
                                                            Fill: {
                                                                Type: SolidColorBrush,
                                                                Props: {
                                                                    Color: new StaticResourceMarkup("BlackColor")
                                                                }
                                                            }
                                                        }
                                                    }]

                                                }
                                            }
                                        },
                                        {
                                            Key: "VerticalIncrementTemplate", Value: {
                                                Type: ControlTemplate,
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
                                                                        Type: DoubleAnimationUsingKeyFrames,
                                                                        AttachedProps: [{
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetProperty",
                                                                            Value: new PropertyPath("(UIElement.Opacity)")

                                                                        },
                                                                        {
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetName",
                                                                            Value: "HoverPath"
                                                                        }
                                                                        ],
                                                                        Children: [
                                                                        {
                                                                            Type: EasingDoubleKeyFrame,
                                                                            Props: {
                                                                                KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 100)),
                                                                                Value: 1
                                                                            }
                                                                        }]

                                                                    },
                                                                    {
                                                                        Type: DoubleAnimationUsingKeyFrames,
                                                                        AttachedProps: [{
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetProperty",
                                                                            Value: new PropertyPath("(UIElement.Opacity)")

                                                                        },
                                                                        {
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetName",
                                                                            Value: "Blur"
                                                                        }
                                                                        ],
                                                                        Children: [
                                                                        {
                                                                            Type: EasingDoubleKeyFrame,
                                                                            Props: {
                                                                                KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 100)),
                                                                                Value: 0.5
                                                                            }
                                                                        }]

                                                                    }]

                                                                }
                                                            },
                                                            {
                                                                Type: VisualState,
                                                                Name: "Pressed",
                                                                Content: {
                                                                    Type: Storyboard
                                                                }
                                                            },
                                                            {
                                                                Type: VisualState,
                                                                Name: "Disabled",
                                                                Content: {
                                                                    Type: Storyboard,
                                                                    Children: [
                                                                    {
                                                                        Type: DoubleAnimationUsingKeyFrames,
                                                                        AttachedProps: [{
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetProperty",
                                                                            Value: new PropertyPath("(UIElement.Opacity)")

                                                                        },
                                                                        {
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetName",
                                                                            Value: "Root"
                                                                        }
                                                                        ],
                                                                        Children: [
                                                                        {
                                                                            Type: EasingDoubleKeyFrame,
                                                                            Props: {
                                                                                KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 100)),
                                                                                Value: 0.5
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
                                                        Type: Path,
                                                        Props: {
                                                            Data: "F1 M 531.107,321.943L 541.537,321.943L 536.322,328.042L 531.107,321.943 Z",
                                                            Height: 4,
                                                            Stretch: Stretch.Uniform,
                                                            Width: 6,
                                                            Fill: {
                                                                Type: SolidColorBrush,
                                                                Name: "ButtonColor",
                                                                Props: {
                                                                    Color: new StaticResourceMarkup("Gray3")
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        Type: Path,
                                                        Name: "HoverPath",
                                                        Props: {
                                                            Data: "F1 M 531.107,321.943L 541.537,321.943L 536.322,328.042L 531.107,321.943 Z",
                                                            Height: 4,
                                                            Stretch: Stretch.Uniform,
                                                            Width: 6,
                                                            UseLayoutRounding: false,
                                                            Opacity: 0,
                                                            Margin: new Thickness(1, 0, 0, 0),
                                                            Fill: {
                                                                Type: SolidColorBrush,
                                                                Props: {
                                                                    Color: new StaticResourceMarkup("BlackColor")
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        Type: Path,
                                                        Name: "Blur",
                                                        Props: {
                                                            Data: "F1 M 531.107,321.943L 541.537,321.943L 536.322,328.042L 531.107,321.943 Z",
                                                            Height: 4,
                                                            Stretch: Stretch.Uniform,
                                                            Width: 6,
                                                            UseLayoutRounding: false,
                                                            Opacity: 0,
                                                            Margin: new Thickness(1, 0, 0, 0),
                                                            Effect: {
                                                                Type: BlurEffect
                                                            },
                                                            Fill: {
                                                                Type: SolidColorBrush,
                                                                Props: {
                                                                    Color: new StaticResourceMarkup("BlackColor")
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        Type: Rectangle,
                                                        Name: "DisabledElement",
                                                        Props: {
                                                            Fill: new StaticResourceMarkup("WhiteColorBrush"),
                                                            Opacity: 0,
                                                            RadiusY: 2,
                                                            RadiusX: 2
                                                        }
                                                    }]

                                                }
                                            }
                                        },
                                        {
                                            Key: "VerticalDecrementTemplate", Value: {
                                                Type: ControlTemplate,
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
                                                                        Type: DoubleAnimationUsingKeyFrames,
                                                                        AttachedProps: [{
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetProperty",
                                                                            Value: new PropertyPath("(UIElement.Opacity)")

                                                                        },
                                                                        {
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetName",
                                                                            Value: "HoverPath"
                                                                        }
                                                                        ],
                                                                        Children: [
                                                                        {
                                                                            Type: EasingDoubleKeyFrame,
                                                                            Props: {
                                                                                KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 100)),
                                                                                Value: 1
                                                                            }
                                                                        }]

                                                                    },
                                                                    {
                                                                        Type: DoubleAnimationUsingKeyFrames,
                                                                        AttachedProps: [{
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetProperty",
                                                                            Value: new PropertyPath("(UIElement.Opacity)")

                                                                        },
                                                                        {
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetName",
                                                                            Value: "Blur"
                                                                        }
                                                                        ],
                                                                        Children: [
                                                                        {
                                                                            Type: EasingDoubleKeyFrame,
                                                                            Props: {
                                                                                KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 100)),
                                                                                Value: 0.5
                                                                            }
                                                                        }]

                                                                    }]

                                                                }
                                                            },
                                                            {
                                                                Type: VisualState,
                                                                Name: "Pressed",
                                                                Content: {
                                                                    Type: Storyboard
                                                                }
                                                            },
                                                            {
                                                                Type: VisualState,
                                                                Name: "Disabled",
                                                                Content: {
                                                                    Type: Storyboard,
                                                                    Children: [
                                                                    {
                                                                        Type: DoubleAnimationUsingKeyFrames,
                                                                        AttachedProps: [{
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetProperty",
                                                                            Value: new PropertyPath("(UIElement.Opacity)")

                                                                        },
                                                                        {
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetName",
                                                                            Value: "Root"
                                                                        }
                                                                        ],
                                                                        Children: [
                                                                        {
                                                                            Type: EasingDoubleKeyFrame,
                                                                            Props: {
                                                                                KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 100)),
                                                                                Value: 0.5
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
                                                        Type: Rectangle,
                                                        Name: "Background",
                                                        Props: {
                                                            Fill: new StaticResourceMarkup("ControlBackgroundBrush"),
                                                            Opacity: 0,
                                                            RadiusY: 2,
                                                            RadiusX: 2,
                                                            StrokeThickness: 1
                                                        }
                                                    },
                                                    {
                                                        Type: Rectangle,
                                                        Name: "BackgroundMouseOver",
                                                        Props: {
                                                            Fill: new StaticResourceMarkup("HighlightBrush"),
                                                            Opacity: 0,
                                                            RadiusY: 2,
                                                            RadiusX: 2
                                                        }
                                                    },
                                                    {
                                                        Type: Rectangle,
                                                        Name: "BackgroundPressed",
                                                        Props: {
                                                            Fill: new StaticResourceMarkup("HighlightBrush"),
                                                            Opacity: 0,
                                                            RadiusY: 2,
                                                            RadiusX: 2
                                                        }
                                                    },
                                                    {
                                                        Type: Rectangle,
                                                        Name: "BackgroundGradient",
                                                        Props: {
                                                            Fill: new StaticResourceMarkup("TransparentWhiteBrush"),
                                                            Margin: new Thickness(1, 1, 1, 1),
                                                            Opacity: 0,
                                                            RadiusY: 1,
                                                            RadiusX: 1,
                                                            Stroke: new StaticResourceMarkup("ControlBackgroundBrush"),
                                                            StrokeThickness: 1
                                                        }
                                                    },
                                                    {
                                                        Type: Rectangle,
                                                        Name: "Highlight",
                                                        Props: {
                                                            IsHitTestVisible: false,
                                                            Margin: new Thickness(1, 1, 1, 1),
                                                            Opacity: 0,
                                                            RadiusY: 1,
                                                            RadiusX: 1,
                                                            Stroke: new StaticResourceMarkup("HighlightBrush"),
                                                            StrokeThickness: 1
                                                        }
                                                    },
                                                    {
                                                        Type: Path,
                                                        Props: {
                                                            Data: "F1 M 541.537,173.589L 531.107,173.589L 536.322,167.49L 541.537,173.589 Z",
                                                            Height: 4,
                                                            Stretch: Stretch.Uniform,
                                                            Width: 6,
                                                            Fill: {
                                                                Type: SolidColorBrush,
                                                                Props: {
                                                                    Color: new StaticResourceMarkup("Gray2")
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        Type: Path,
                                                        Name: "HoverPath",
                                                        Props: {
                                                            Data: "F1 M 541.537,173.589L 531.107,173.589L 536.322,167.49L 541.537,173.589 Z",
                                                            Height: 4,
                                                            Stretch: Stretch.Uniform,
                                                            Width: 6,
                                                            UseLayoutRounding: false,
                                                            Opacity: 0,
                                                            Margin: new Thickness(1, 0, 0, 0),
                                                            Fill: {
                                                                Type: SolidColorBrush,
                                                                Props: {
                                                                    Color: new StaticResourceMarkup("BlackColor")
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        Type: Path,
                                                        Name: "Blur",
                                                        Props: {
                                                            Data: "F1 M 541.537,173.589L 531.107,173.589L 536.322,167.49L 541.537,173.589 Z",
                                                            Height: 4,
                                                            Stretch: Stretch.Uniform,
                                                            Width: 6,
                                                            UseLayoutRounding: false,
                                                            Opacity: 0,
                                                            Margin: new Thickness(1, 0, 0, 0),
                                                            Effect: {
                                                                Type: BlurEffect
                                                            },
                                                            Fill: {
                                                                Type: SolidColorBrush,
                                                                Props: {
                                                                    Color: new StaticResourceMarkup("BlackColor")
                                                                }
                                                            }
                                                        }
                                                    }]

                                                }
                                            }
                                        },
                                        {
                                            Key: "VerticalThumbTemplate", Value: {
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
                                                                        Type: DoubleAnimationUsingKeyFrames,
                                                                        AttachedProps: [{
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetProperty",
                                                                            Value: new PropertyPath("(UIElement.Opacity)")

                                                                        },
                                                                        {
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetName",
                                                                            Value: "MouseOverRectangle"
                                                                        }
                                                                        ],
                                                                        Children: [
                                                                        {
                                                                            Type: EasingDoubleKeyFrame,
                                                                            Props: {
                                                                                KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 100)),
                                                                                Value: 1
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
                                                                        Type: DoubleAnimationUsingKeyFrames,
                                                                        AttachedProps: [{
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetProperty",
                                                                            Value: new PropertyPath("(UIElement.Opacity)")

                                                                        },
                                                                        {
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetName",
                                                                            Value: "PressedRectangle"
                                                                        }
                                                                        ],
                                                                        Children: [
                                                                        {
                                                                            Type: EasingDoubleKeyFrame,
                                                                            Props: {
                                                                                KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 100)),
                                                                                Value: 1
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
                                                                        Type: DoubleAnimationUsingKeyFrames,
                                                                        AttachedProps: [{
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetProperty",
                                                                            Value: new PropertyPath("Opacity")

                                                                        },
                                                                        {
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetName",
                                                                            Value: "ThumbVisual"
                                                                        }
                                                                        ],
                                                                        Children: [
                                                                        {
                                                                            Type: SplineDoubleKeyFrame,
                                                                            Props: {
                                                                                KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                                                Value: 0
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
                                                        Name: "ThumbVisual",
                                                        Props: {
                                                            Margin: new Thickness(1, 0, 1, 0)
                                                        },
                                                        Children: [
                                                        {
                                                            Type: Rectangle,
                                                            Name: "Background",
                                                            Props: {
                                                                StrokeThickness: 1,
                                                                Fill: new StaticResourceMarkup("ThumbBrush")
                                                            }
                                                        },
                                                        {
                                                            Type: Rectangle,
                                                            Name: "MouseOverRectangle",
                                                            Props: {
                                                                StrokeThickness: 1,
                                                                Opacity: 0,
                                                                Fill: new StaticResourceMarkup("BlackBrush")
                                                            }
                                                        },
                                                        {
                                                            Type: Rectangle,
                                                            Name: "PressedRectangle",
                                                            Props: {
                                                                StrokeThickness: 1,
                                                                Opacity: 0,
                                                                Fill: new StaticResourceMarkup("BlackBrush")
                                                            }
                                                        }]

                                                    }]

                                                }
                                            }
                                        },
                                        {
                                            Key: "HorizontalThumbTemplate", Value: {
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
                                                                        Type: DoubleAnimationUsingKeyFrames,
                                                                        AttachedProps: [{
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetProperty",
                                                                            Value: new PropertyPath("(UIElement.Opacity)")

                                                                        },
                                                                        {
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetName",
                                                                            Value: "MouseOverRectangle"
                                                                        }
                                                                        ],
                                                                        Children: [
                                                                        {
                                                                            Type: EasingDoubleKeyFrame,
                                                                            Props: {
                                                                                KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 100)),
                                                                                Value: 1
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
                                                                        Type: DoubleAnimationUsingKeyFrames,
                                                                        AttachedProps: [{
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetProperty",
                                                                            Value: new PropertyPath("(UIElement.Opacity)")

                                                                        },
                                                                        {
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetName",
                                                                            Value: "PressedRectangle"
                                                                        }
                                                                        ],
                                                                        Children: [
                                                                        {
                                                                            Type: EasingDoubleKeyFrame,
                                                                            Props: {
                                                                                KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 100)),
                                                                                Value: 1
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
                                                                        Type: DoubleAnimationUsingKeyFrames,
                                                                        AttachedProps: [{
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetProperty",
                                                                            Value: new PropertyPath("Opacity")

                                                                        },
                                                                        {
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetName",
                                                                            Value: "ThumbVisual"
                                                                        }
                                                                        ],
                                                                        Children: [
                                                                        {
                                                                            Type: SplineDoubleKeyFrame,
                                                                            Props: {
                                                                                KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                                                Value: 0
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
                                                        Name: "ThumbVisual",
                                                        Props: {
                                                            Margin: new Thickness(0, 1, 0, 1)
                                                        },
                                                        Children: [
                                                        {
                                                            Type: Rectangle,
                                                            Name: "Background",
                                                            Props: {
                                                                StrokeThickness: 1,
                                                                Fill: new StaticResourceMarkup("ThumbBrush")
                                                            }
                                                        },
                                                        {
                                                            Type: Rectangle,
                                                            Name: "MouseOverRectangle",
                                                            Props: {
                                                                StrokeThickness: 1,
                                                                Opacity: 0,
                                                                Fill: new StaticResourceMarkup("BlackBrush")
                                                            }
                                                        },
                                                        {
                                                            Type: Rectangle,
                                                            Name: "PressedRectangle",
                                                            Props: {
                                                                StrokeThickness: 1,
                                                                Opacity: 0,
                                                                Fill: new StaticResourceMarkup("BlackBrush")
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
                                                    Type: DoubleAnimationUsingKeyFrames,
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "Root"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: SplineDoubleKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: 0.5
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
                                    Name: "HorizontalRoot",
                                    Props: {
                                        Height: 11,
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
                                        Type: Border,
                                        Props: {
                                            BorderThickness: new Thickness(0, 0, 0, 1),
                                            Margin: new Thickness(0, 0, 0, -1),
                                            Visibility: Visibility.Collapsed,
                                            BorderBrush: {
                                                Type: SolidColorBrush,
                                                Props: {
                                                    Color: new StaticResourceMarkup("Gray4")
                                                }
                                            }
                                        },
                                        AttachedProps: [{
                                            Owner: Grid,
                                            Prop: "RowSpan",
                                            Value: 1
                                        },
                                        {
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
                                            IsTabStop: false,
                                            Interval: 50,
                                            Margin: new Thickness(1, 1, 1, 1),
                                            Template: new StaticResourceMarkup("HorizontalDecrementTemplate"),
                                            Width: 16
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
                                            IsTabStop: false,
                                            Interval: 50,
                                            Template: new StaticResourceMarkup("RepeatButtonTemplate"),
                                            Width: 0
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
                                            Template: new StaticResourceMarkup("HorizontalThumbTemplate"),
                                            Width: 18
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
                                            IsTabStop: false,
                                            Interval: 50,
                                            Template: new StaticResourceMarkup("RepeatButtonTemplate")
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
                                            IsTabStop: false,
                                            Interval: 50,
                                            Margin: new Thickness(1, 1, 1, 1),
                                            Template: new StaticResourceMarkup("HorizontalIncrementTemplate"),
                                            Width: 16
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
                                        Width: 11,
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
                                        Type: Border,
                                        Props: {
                                            BorderThickness: new Thickness(0, 0, 1, 0),
                                            Margin: new Thickness(0, 0, -1, 0),
                                            Visibility: Visibility.Collapsed,
                                            BorderBrush: {
                                                Type: SolidColorBrush,
                                                Props: {
                                                    Color: new StaticResourceMarkup("Gray4")
                                                }
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
                                            Margin: new Thickness(1, 1, 1, 1),
                                            Template: new StaticResourceMarkup("VerticalDecrementTemplate")
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
                                            IsTabStop: false,
                                            Interval: 50,
                                            Template: new StaticResourceMarkup("RepeatButtonTemplate")
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
                                            Height: 18,
                                            MinHeight: 18,
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
                                            IsTabStop: false,
                                            Interval: 50,
                                            Template: new StaticResourceMarkup("RepeatButtonTemplate")
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
                                            Margin: new Thickness(1, 1, 1, 1),
                                            Template: new StaticResourceMarkup("VerticalIncrementTemplate")
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
            Key: "DefaultScrollViewerStyle", Value: {
                Type: Style,
                Props: {
                    TargetType: ScrollViewer
                },
                Children: [
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "Background"),
                        Value: new StaticResourceMarkup("ControlBackgroundBrush")
                    }
                },
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
                            Type: SolidColorBrush,
                            Props: {
                                Color: new StaticResourceMarkup("Gray4")
                            }
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
                                    BorderBrush: new TemplateBindingMarkup("BorderBrush"),
                                    BorderThickness: new TemplateBindingMarkup("BorderThickness")
                                },
                                Content: {
                                    Type: Grid,
                                    Props: {
                                        Background: new TemplateBindingMarkup("Background"),
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
                                    ,
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

                                    },
                                    Children: [
                                    {
                                        Type: ScrollContentPresenter,
                                        Name: "ScrollContentPresenter",
                                        Props: {
                                            Cursor: new TemplateBindingMarkup("Cursor"),
                                            ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
                                            Margin: new TemplateBindingMarkup("Padding")
                                        }
                                    },
                                    {
                                        Type: Rectangle,
                                        Props: {
                                            Visibility: Visibility.Collapsed
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
                                            IsTabStop: false,
                                            Maximum: new TemplateBindingMarkup("ScrollableHeight"),
                                            Margin: new Thickness(0, -1, -3, -1),
                                            Minimum: 0,
                                            Orientation: Orientation.Vertical,
                                            Visibility: new TemplateBindingMarkup("ComputedVerticalScrollBarVisibility"),
                                            Value: new TemplateBindingMarkup("VerticalOffset"),
                                            ViewportSize: new TemplateBindingMarkup("ViewportHeight"),
                                            Width: 18
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
                                            Maximum: new TemplateBindingMarkup("ScrollableWidth"),
                                            Margin: new Thickness(-1, 0, -1, -3),
                                            Minimum: 0,
                                            Orientation: Orientation.Horizontal,
                                            Visibility: new TemplateBindingMarkup("ComputedHorizontalScrollBarVisibility"),
                                            Value: new TemplateBindingMarkup("HorizontalOffset"),
                                            ViewportSize: new TemplateBindingMarkup("ViewportWidth")
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
            Key: "DefaultListBoxStyle", Value: {
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
                        Property: DependencyProperty.GetDependencyProperty(ListBox, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBox, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBox, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextOptions, "TextHintingMode"),
                        Value: "Animated"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBox, "Background"),
                        Value: new StaticResourceMarkup("ControlBackgroundBrush")
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
                        Property: DependencyProperty.GetDependencyProperty(ListBox, "TabNavigation"),
                        Value: "Once"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "HorizontalScrollBarVisibility"),
                        Value: "Auto"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "VerticalScrollBarVisibility"),
                        Value: "Auto"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBox, "BorderBrush"),
                        Value: new StaticResourceMarkup("ThumbBrush")
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
                                AttachedProps: [{
                                    Owner: VisualStateManager,
                                    Prop: "VisualStateGroups",
                                    Value: [
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "ValidationErrorElement"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "ValidationErrorElement"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: Visibility.Visible
                                                        }
                                                    }]

                                                },
                                                {
                                                    Type: ObjectAnimationUsingKeyFrames,
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("IsOpen")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "validationTooltip"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: {
                                                                Type: Boolean,
                                                                Value: true
                                                            }
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
                                    Props: {
                                        BorderBrush: new TemplateBindingMarkup("BorderBrush"),
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness")
                                    },
                                    Content: {
                                        Type: ScrollViewer,
                                        Name: "ScrollViewer",
                                        Props: {
                                            BorderBrush: {
                                                Type: SolidColorBrush,
                                                Props: {
                                                    Color: {
                                                        Type: Color,
                                                        Props: {
                                                            HexString: "#00FFFFFF"
                                                        }
                                                    }
                                                }
                                            },
                                            BorderThickness: new Thickness(0, 0, 0, 0),
                                            Background: new TemplateBindingMarkup("Background"),
                                            Padding: new TemplateBindingMarkup("Padding"),
                                            TabNavigation: new TemplateBindingMarkup("TabNavigation")
                                        },
                                        Content: {
                                            Type: ItemsPresenter
                                        }
                                    }
                                },
                                {
                                    Type: Border,
                                    Name: "ValidationErrorElement",
                                    Props: {
                                        BorderBrush: new StaticResourceMarkup("ControlsValidationBrush"),
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        CornerRadius: new CornerRadius(2, 2, 2, 2),
                                        Visibility: Visibility.Collapsed
                                    },
                                    AttachedProps: [{
                                        Owner: ToolTipService,
                                        Prop: "ToolTip",
                                        Value: {
                                            Type: ToolTip,
                                            Name: "validationTooltip",
                                            Props: {
                                                DataContext: new BindingMarkup({}),
                                                Placement: PlacementMode.Right,
                                                PlacementTarget: new BindingMarkup({}),
                                                Template: new StaticResourceMarkup("ValidationToolTipTemplate"),
                                                Triggers: [
                                                {
                                                    Type: EventTrigger,
                                                    Props: {
                                                        RoutedEvent: "Canvas.Loaded"
                                                    },
                                                    Children: [
                                                    {
                                                        Type: BeginStoryboard,
                                                        Content: {
                                                            Type: Storyboard,
                                                            Children: [
                                                            {
                                                                Type: ObjectAnimationUsingKeyFrames,
                                                                AttachedProps: [{
                                                                    Owner: Storyboard,
                                                                    Prop: "TargetProperty",
                                                                    Value: new PropertyPath("IsHitTestVisible")

                                                                },
                                                                {
                                                                    Owner: Storyboard,
                                                                    Prop: "TargetName",
                                                                    Value: "validationTooltip"
                                                                }
                                                                ],
                                                                Children: [
                                                                {
                                                                    Type: DiscreteObjectKeyFrame,
                                                                    Props: {
                                                                        KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                                        Value: {
                                                                            Type: Boolean,
                                                                            Value: true
                                                                        }
                                                                    }
                                                                }]

                                                            }]

                                                        }
                                                    }]

                                                }]

                                            }
                                        }

                                    }
                                    ],
                                    Content: {
                                        Type: Grid,
                                        Props: {
                                            Background: {
                                                Type: SolidColorBrush,
                                                Props: {
                                                    Color: {
                                                        Type: Color,
                                                        Props: {
                                                            HexString: "#00FFFFFF"
                                                        }
                                                    }
                                                }
                                            },
                                            HorizontalAlignment: HorizontalAlignment.Right,
                                            Height: 10,
                                            Margin: new Thickness(0, -4, -4, 0),
                                            VerticalAlignment: VerticalAlignment.Top,
                                            Width: 10
                                        },
                                        Children: [
                                        {
                                            Type: Path,
                                            Props: {
                                                Data: "M 1,0 L6,0 A 2,2 90 0 1 8,2 L8,7 z",
                                                Fill: new StaticResourceMarkup("ValidationBrush5"),
                                                Margin: new Thickness(-1, 3, 0, 0)
                                            }
                                        },
                                        {
                                            Type: Path,
                                            Props: {
                                                Data: "M 0,0 L2,0 L 8,6 L8,8",
                                                Fill: new StaticResourceMarkup("WhiteColorBrush"),
                                                Margin: new Thickness(-1, 3, 0, 0)
                                            }
                                        }]

                                    }
                                }]

                            }
                        }
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBox, "BorderThickness"),
                        Value: "0"
                    }
                }]

            }
        },
        {
            Key: "DefaultListBoxItemStyle", Value: {
                Type: Style,
                Props: {
                    TargetType: ListBoxItem
                },
                Children: [
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBoxItem, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBoxItem, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextOptions, "TextHintingMode"),
                        Value: "Animated"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBoxItem, "Padding"),
                        Value: "10"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBoxItem, "Margin"),
                        Value: "0"
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
                        Value: "Center"
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
                                                        To: 0.55
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "fillColor"
                                                    }
                                                    ]
                                                },
                                                {
                                                    Type: ColorAnimation,
                                                    Props: {
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
                                                        To: new StaticResourceMarkup("HoverForegroundColor")
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(Control.Foreground).(SolidColorBrush.Color)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "contentControl"
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "contentPresenter"
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
                                                    Type: ColorAnimation,
                                                    Props: {
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
                                                        To: new StaticResourceMarkup("HoverForegroundColor")
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(Control.Foreground).(SolidColorBrush.Color)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "contentControl"
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "fillColor"
                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            Type: VisualState,
                                            Name: "SelectedUnfocused"
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "FocusVisualElement"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: Visibility.Visible
                                                        }
                                                    }]

                                                },
                                                {
                                                    Type: DoubleAnimation,
                                                    Props: {
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
                                                        To: 1
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "fillColor2"
                                                    }
                                                    ]
                                                },
                                                {
                                                    Type: ColorAnimation,
                                                    Props: {
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
                                                        To: new StaticResourceMarkup("HoverForegroundColor")
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(Control.Foreground).(SolidColorBrush.Color)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "contentControl"
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
                                    Type: Rectangle,
                                    Name: "fillColor",
                                    Props: {
                                        Fill: new StaticResourceMarkup("HighlightBrush"),
                                        IsHitTestVisible: false,
                                        Opacity: 0,
                                        RadiusY: 1,
                                        RadiusX: 1
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Name: "fillColor2",
                                    Props: {
                                        Fill: new StaticResourceMarkup("HighlightBrush"),
                                        IsHitTestVisible: false,
                                        Opacity: 0,
                                        RadiusY: 1,
                                        RadiusX: 1
                                    }
                                },
                                {
                                    Type: ContentControl,
                                    Name: "contentControl",
                                    Content: {
                                        Type: ContentPresenter,
                                        Name: "contentPresenter",
                                        Props: {
                                            ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
                                            VerticalAlignment: VerticalAlignment.Center,
                                            HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                            Margin: new Thickness(7, 7, 7, 7)
                                        },
                                        Content: new TemplateBindingMarkup("Content")
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Name: "FocusVisualElement",
                                    Props: {
                                        RadiusY: 1,
                                        RadiusX: 1,
                                        Stroke: new StaticResourceMarkup("HighlightBrush"),
                                        StrokeThickness: 1,
                                        Visibility: Visibility.Collapsed
                                    }
                                }]

                            }
                        }
                    }
                }]

            }
        },
        {
            Key: "DefaultCheckBoxStyle", Value: {
                Type: Style,
                Props: {
                    TargetType: CheckBox
                },
                Children: [
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(CheckBox, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(CheckBox, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(CheckBox, "Background"),
                        Value: new StaticResourceMarkup("CheckBoxBackgroundBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(CheckBox, "MinWidth"),
                        Value: "100"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(CheckBox, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
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
                        Value: new StaticResourceMarkup("CheckBoxBrush")
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
                                                Props: {
                                                    Duration: new Duration(new TimeSpan(0, 0, 0, 0, 100))
                                                },
                                                Children: [
                                                {
                                                    Type: DoubleAnimation,
                                                    Props: {
                                                        To: 1,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 100))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "MouseOverRectangle"
                                                    }
                                                    ]
                                                },
                                                {
                                                    Type: ColorAnimation,
                                                    Props: {
                                                        To: new StaticResourceMarkup("Gray2"),
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "ContentPresenterWrapperColor"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Color")

                                                    }
                                                    ]
                                                },
                                                {
                                                    Type: DoubleAnimation,
                                                    Props: {
                                                        To: 1,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 100))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "grid"
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
                                                Props: {
                                                    Duration: new Duration(new TimeSpan(0, 0, 0, 0, 100))
                                                },
                                                Children: [
                                                {
                                                    Type: DoubleAnimation,
                                                    Props: {
                                                        To: 1,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 100))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "PressedRectangle"
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
                                                        To: 0.55,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "contentPresenter"
                                                    }
                                                    ]
                                                },
                                                {
                                                    Type: DoubleAnimation,
                                                    Props: {
                                                        To: 0.55,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "DisabledVisualElement"
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
                                                        To: 1,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "CheckIcon"
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
                                                        To: 1,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "IndeterminateIcon"
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
                                                Type: Storyboard
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "ValidationErrorElement"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "ValidationErrorElement"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: Visibility.Visible
                                                        }
                                                    }]

                                                },
                                                {
                                                    Type: ObjectAnimationUsingKeyFrames,
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("IsOpen")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "validationTooltip"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: {
                                                                Type: Boolean,
                                                                Value: true
                                                            }
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
                                        Type: Grid,
                                        Name: "grid",
                                        Props: {
                                            Height: 14,
                                            Width: 14,
                                            Opacity: 0.7
                                        },
                                        Children: [
                                        {
                                            Type: Rectangle,
                                            Name: "Background",
                                            Props: {
                                                Fill: new TemplateBindingMarkup("Background"),
                                                Stroke: new TemplateBindingMarkup("BorderBrush"),
                                                StrokeThickness: new TemplateBindingMarkup("BorderThickness")
                                            }
                                        },
                                        {
                                            Type: Rectangle,
                                            Name: "MouseOverRectangle",
                                            Props: {
                                                Stroke: new StaticResourceMarkup("CheckBoxMouseOverBrush"),
                                                Opacity: 0
                                            }
                                        },
                                        {
                                            Type: Rectangle,
                                            Name: "PressedRectangle",
                                            Props: {
                                                Stroke: new StaticResourceMarkup("BlackBrush"),
                                                Opacity: 0
                                            }
                                        },
                                        {
                                            Type: Path,
                                            Name: "CheckIcon",
                                            Props: {
                                                Opacity: 0,
                                                Data: "M49.4375,110.4375 L51.4995,112.812 L56.3745,107.24883",
                                                HorizontalAlignment: HorizontalAlignment.Center,
                                                Height: 7.6,
                                                Stretch: Stretch.Fill,
                                                Stroke: {
                                                    Type: SolidColorBrush,
                                                    Props: {
                                                        Color: {
                                                            Type: Color,
                                                            Props: {
                                                                HexString: "#FF000000"
                                                            }
                                                        }
                                                    }
                                                },
                                                UseLayoutRounding: false,
                                                VerticalAlignment: VerticalAlignment.Center,
                                                Width: 8.9,
                                                StrokeStartLineCap: PenLineCap.Triangle,
                                                StrokeEndLineCap: PenLineCap.Triangle,
                                                StrokeThickness: 2
                                            }
                                        },
                                        {
                                            Type: Rectangle,
                                            Name: "IndeterminateIcon",
                                            Props: {
                                                Height: 8,
                                                Width: 8,
                                                Opacity: 0,
                                                Fill: {
                                                    Type: SolidColorBrush,
                                                    Props: {
                                                        Color: new StaticResourceMarkup("Gray3")
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            Type: Rectangle,
                                            Name: "DisabledVisualElement",
                                            Props: {
                                                Fill: new StaticResourceMarkup("DisabledWhiteColorBrush"),
                                                Opacity: 0,
                                                RadiusY: 1,
                                                RadiusX: 1
                                            }
                                        }]

                                    },
                                    {
                                        Type: Border,
                                        Name: "ValidationErrorElement",
                                        Props: {
                                            BorderBrush: new StaticResourceMarkup("ControlsValidationBrush"),
                                            BorderThickness: new Thickness(1, 1, 1, 1),
                                            CornerRadius: new CornerRadius(1, 1, 1, 1),
                                            Margin: new Thickness(1, 1, 1, 1),
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
                                                    DataContext: new BindingMarkup({}),
                                                    Placement: PlacementMode.Right,
                                                    PlacementTarget: new BindingMarkup({}),
                                                    Template: new StaticResourceMarkup("ValidationToolTipTemplate"),
                                                    Triggers: [
                                                    {
                                                        Type: EventTrigger,
                                                        Props: {
                                                            RoutedEvent: "Canvas.Loaded"
                                                        },
                                                        Children: [
                                                        {
                                                            Type: BeginStoryboard,
                                                            Content: {
                                                                Type: Storyboard,
                                                                Children: [
                                                                {
                                                                    Type: ObjectAnimationUsingKeyFrames,
                                                                    AttachedProps: [{
                                                                        Owner: Storyboard,
                                                                        Prop: "TargetProperty",
                                                                        Value: new PropertyPath("IsHitTestVisible")

                                                                    },
                                                                    {
                                                                        Owner: Storyboard,
                                                                        Prop: "TargetName",
                                                                        Value: "validationTooltip"
                                                                    }
                                                                    ],
                                                                    Children: [
                                                                    {
                                                                        Type: DiscreteObjectKeyFrame,
                                                                        Props: {
                                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                                            Value: {
                                                                                Type: Boolean,
                                                                                Value: true
                                                                            }
                                                                        }
                                                                    }]

                                                                }]

                                                            }
                                                        }]

                                                    }]

                                                }
                                            }

                                        }
                                        ],
                                        Content: {
                                            Type: Grid,
                                            Props: {
                                                Background: {
                                                    Type: SolidColorBrush,
                                                    Props: {
                                                        Color: {
                                                            Type: Color,
                                                            Props: {
                                                                HexString: "#00FFFFFF"
                                                            }
                                                        }
                                                    }
                                                },
                                                HorizontalAlignment: HorizontalAlignment.Right,
                                                Height: 10,
                                                Margin: new Thickness(0, -4, -4, 0),
                                                VerticalAlignment: VerticalAlignment.Top,
                                                Width: 10
                                            },
                                            Children: [
                                            {
                                                Type: Path,
                                                Props: {
                                                    Data: "M 1,0 L5,0 A 2,2 90 0 1 7,2 L7,6 z",
                                                    Fill: new StaticResourceMarkup("ValidationBrush5"),
                                                    Margin: new Thickness(0, 3, 0, 0)
                                                }
                                            },
                                            {
                                                Type: Path,
                                                Props: {
                                                    Data: "M 0,0 L2,0 L 7,5 L7,7",
                                                    Fill: new StaticResourceMarkup("WhiteColorBrush"),
                                                    Margin: new Thickness(0, 3, 0, 0)
                                                }
                                            }]

                                        }
                                    }]

                                },
                                {
                                    Type: ContentControl,
                                    Props: {
                                        Foreground: {
                                            Type: SolidColorBrush,
                                            Name: "ContentPresenterWrapperColor",
                                            Props: {
                                                Color: new StaticResourceMarkup("BlackColor")
                                            }
                                        }
                                    },
                                    AttachedProps: [{
                                        Owner: Grid,
                                        Prop: "Column",
                                        Value: 1
                                    }
                                    ],
                                    Content: {
                                        Type: ContentPresenter,
                                        Name: "contentPresenter",
                                        Props: {
                                            ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
                                            HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                            Margin: new TemplateBindingMarkup("Padding"),
                                            VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment")
                                        },
                                        Content: new TemplateBindingMarkup("Content")
                                    }
                                }]

                            }
                        }
                    }
                }]

            }
        },
        {
            Key: "DefaultPasswordBoxStyle", Value: {
                Type: Style,
                Props: {
                    TargetType: PasswordBox
                },
                Children: [
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(PasswordBox, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(PasswordBox, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextOptions, "TextHintingMode"),
                        Value: "Animated"
                    }
                },
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
                        Property: DependencyProperty.GetDependencyProperty(PasswordBox, "MinHeight"),
                        Value: "26"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(PasswordBox, "Background"),
                        Value: new StaticResourceMarkup("ControlBackgroundBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(PasswordBox, "Foreground"),
                        Value: {
                            Type: SolidColorBrush,
                            Props: {
                                Color: new StaticResourceMarkup("TextBoxText")
                            }
                        }
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
                        Value: new StaticResourceMarkup("TextBoxBorderBrush")
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
                                                    Type: DoubleAnimation,
                                                    Props: {
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
                                                        To: 0.8
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "MouseOverBorder"
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
                                                        To: 1
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "DisabledVisualElement"
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "FocusVisualElement"
                                                    }
                                                    ]
                                                },
                                                {
                                                    Type: DoubleAnimationUsingKeyFrames,
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "FocusInnerRectangle"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: EasingDoubleKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: 1
                                                        }
                                                    }]

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
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0)),
                                                        To: 0
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "FocusVisualElement"
                                                    }
                                                    ]
                                                }]

                                            }
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "ValidationErrorElement"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "ValidationErrorElement"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: Visibility.Visible
                                                        }
                                                    }]

                                                },
                                                {
                                                    Type: ObjectAnimationUsingKeyFrames,
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("IsOpen")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "validationTooltip"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: {
                                                                Type: Boolean,
                                                                Value: true
                                                            }
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
                                    Name: "Border",
                                    Props: {
                                        BorderBrush: new TemplateBindingMarkup("BorderBrush"),
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        Background: new TemplateBindingMarkup("Background"),
                                        Opacity: 1
                                    },
                                    Content: {
                                        Type: Border,
                                        Name: "ContentElement",
                                        Props: {
                                            Margin: new TemplateBindingMarkup("Padding"),
                                            Padding: new Thickness(4, 0, 3, 2),
                                            VerticalAlignment: VerticalAlignment.Center
                                        }
                                    }
                                },
                                {
                                    Type: Border,
                                    Name: "DisabledVisualElement",
                                    Props: {
                                        BorderBrush: new StaticResourceMarkup("ControlsDisabledBrush"),
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        Background: new StaticResourceMarkup("ControlsDisabledBrush"),
                                        IsHitTestVisible: false,
                                        Opacity: 0
                                    }
                                },
                                {
                                    Type: Border,
                                    Name: "MouseOverBorder",
                                    Props: {
                                        BorderBrush: new StaticResourceMarkup("TextBoxMouseOverBorderBrush"),
                                        BorderThickness: new Thickness(1, 1, 1, 1),
                                        Opacity: 0
                                    }
                                },
                                {
                                    Type: Border,
                                    Name: "FocusVisualElement",
                                    Props: {
                                        BorderBrush: new StaticResourceMarkup("TextBoxMouseOverBorderBrush"),
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        IsHitTestVisible: false,
                                        Opacity: 0
                                    },
                                    Content: {
                                        Type: Rectangle,
                                        Name: "FocusInnerRectangle",
                                        Props: {
                                            StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                            Opacity: 0,
                                            Stroke: new StaticResourceMarkup("TextBoxMouseOverInnerBorderBrush")
                                        }
                                    }
                                },
                                {
                                    Type: Border,
                                    Name: "ValidationErrorElement",
                                    Props: {
                                        BorderBrush: new StaticResourceMarkup("ControlsValidationBrush"),
                                        BorderThickness: new Thickness(1, 1, 1, 1),
                                        CornerRadius: new CornerRadius(1, 1, 1, 1),
                                        Visibility: Visibility.Collapsed
                                    },
                                    AttachedProps: [{
                                        Owner: ToolTipService,
                                        Prop: "ToolTip",
                                        Value: {
                                            Type: ToolTip,
                                            Name: "validationTooltip",
                                            Props: {
                                                DataContext: new BindingMarkup({}),
                                                Placement: PlacementMode.Right,
                                                PlacementTarget: new BindingMarkup({}),
                                                Template: new StaticResourceMarkup("ValidationToolTipTemplate"),
                                                Triggers: [
                                                {
                                                    Type: EventTrigger,
                                                    Props: {
                                                        RoutedEvent: "Canvas.Loaded"
                                                    },
                                                    Children: [
                                                    {
                                                        Type: BeginStoryboard,
                                                        Content: {
                                                            Type: Storyboard,
                                                            Children: [
                                                            {
                                                                Type: ObjectAnimationUsingKeyFrames,
                                                                AttachedProps: [{
                                                                    Owner: Storyboard,
                                                                    Prop: "TargetProperty",
                                                                    Value: new PropertyPath("IsHitTestVisible")

                                                                },
                                                                {
                                                                    Owner: Storyboard,
                                                                    Prop: "TargetName",
                                                                    Value: "validationTooltip"
                                                                }
                                                                ],
                                                                Children: [
                                                                {
                                                                    Type: DiscreteObjectKeyFrame,
                                                                    Props: {
                                                                        KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                                        Value: {
                                                                            Type: Boolean,
                                                                            Value: true
                                                                        }
                                                                    }
                                                                }]

                                                            }]

                                                        }
                                                    }]

                                                }]

                                            }
                                        }

                                    }
                                    ],
                                    Content: {
                                        Type: Grid,
                                        Props: {
                                            Background: {
                                                Type: SolidColorBrush,
                                                Props: {
                                                    Color: {
                                                        Type: Color,
                                                        Props: {
                                                            HexString: "#00FFFFFF"
                                                        }
                                                    }
                                                }
                                            },
                                            HorizontalAlignment: HorizontalAlignment.Right,
                                            Height: 12,
                                            Margin: new Thickness(1, -4, -4, 0),
                                            VerticalAlignment: VerticalAlignment.Top,
                                            Width: 12
                                        },
                                        Children: [
                                        {
                                            Type: Path,
                                            Props: {
                                                Data: "M 1,0 L6,0 A 2,2 90 0 1 8,2 L8,7 z",
                                                Fill: new StaticResourceMarkup("ValidationBrush5"),
                                                Margin: new Thickness(1, 3, 0, 0)
                                            }
                                        },
                                        {
                                            Type: Path,
                                            Props: {
                                                Data: "M 0,0 L2,0 L 8,6 L8,8",
                                                Fill: new StaticResourceMarkup("WhiteColorBrush"),
                                                Margin: new Thickness(1, 3, 0, 0)
                                            }
                                        }]

                                    }
                                }]

                            }
                        }
                    }
                }]

            }
        },
        {
            Key: "DefaultProgressBarStyle", Value: {
                Type: Style,
                Props: {
                    TargetType: ProgressBar
                },
                Children: [
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ProgressBar, "Foreground"),
                        Value: new StaticResourceMarkup("HighlightBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ProgressBar, "Background"),
                        Value: new StaticResourceMarkup("GrayBrush4")
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
                        Property: DependencyProperty.GetDependencyProperty(ProgressBar, "Height"),
                        Value: "10"
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
                        Value: new StaticResourceMarkup("TextBoxBorderBrush")
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
                                                    Type: ObjectAnimationUsingKeyFrames,
                                                    Props: {
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Visibility)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "IndeterminateRoot"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Visibility)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "DeterminateRoot"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: Visibility.Collapsed
                                                        }
                                                    }]

                                                },
                                                {
                                                    Type: DoubleAnimationUsingKeyFrames,
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(Shape.Fill).(LinearGradientBrush.Transform).(TransformGroup.Children)[0].X")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "IndeterminateGradientFill"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: SplineDoubleKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: 0
                                                        }
                                                    },
                                                    {
                                                        Type: SplineDoubleKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 350)),
                                                            Value: 20
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
                                        BorderBrush: new TemplateBindingMarkup("BorderBrush"),
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        Background: new TemplateBindingMarkup("Background")
                                    }
                                },
                                {
                                    Type: Grid,
                                    Name: "ProgressBarRootGrid",
                                    Children: [
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
                                                Margin: new TemplateBindingMarkup("BorderThickness"),
                                                Opacity: 1,
                                                RenderTransformOrigin: new Point(0.5, 0.5),
                                                StrokeThickness: 0,
                                                Fill: new StaticResourceMarkup("BrandingBrush")
                                            }
                                        },
                                        {
                                            Type: Rectangle,
                                            Name: "IndeterminateGradientFill",
                                            Props: {
                                                Margin: new TemplateBindingMarkup("BorderThickness"),
                                                Opacity: 0.7,
                                                StrokeThickness: 1,
                                                Fill: {
                                                    Type: LinearGradientBrush,
                                                    Props: {
                                                        EndPoint: new Point(0, 1),
                                                        MappingMode: BrushMappingMode.Absolute,
                                                        SpreadMethod: GradientSpreadMethod.Repeat,
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
                                                            Color: new StaticResourceMarkup("ProgressIndeterminateColor1"),
                                                            Offset: 0
                                                        }
                                                    },
                                                    {
                                                        Type: GradientStop,
                                                        Props: {
                                                            Color: new StaticResourceMarkup("ProgressIndeterminateColor2"),
                                                            Offset: 0.651
                                                        }
                                                    },
                                                    {
                                                        Type: GradientStop,
                                                        Props: {
                                                            Color: new StaticResourceMarkup("ProgressIndeterminateColor3"),
                                                            Offset: 0.093
                                                        }
                                                    },
                                                    {
                                                        Type: GradientStop,
                                                        Props: {
                                                            Color: new StaticResourceMarkup("ProgressIndeterminateColor4"),
                                                            Offset: 0.548
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
                                            Type: Border,
                                            Name: "ProgressBarIndicator",
                                            Props: {
                                                Background: new StaticResourceMarkup("BrandingBrush"),
                                                HorizontalAlignment: HorizontalAlignment.Left,
                                                Margin: new Thickness(-1, -1, -1, -1)
                                            },
                                            Content: {
                                                Type: Rectangle,
                                                Name: "GradientFill",
                                                Props: {
                                                    Opacity: 0.7,
                                                    Visibility: Visibility.Collapsed,
                                                    Fill: {
                                                        Type: LinearGradientBrush,
                                                        Props: {
                                                            EndPoint: new Point(0, 1),
                                                            MappingMode: BrushMappingMode.Absolute,
                                                            SpreadMethod: GradientSpreadMethod.Repeat,
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
                                                                Color: new StaticResourceMarkup("ProgressIndeterminateColor1"),
                                                                Offset: 0
                                                            }
                                                        },
                                                        {
                                                            Type: GradientStop,
                                                            Props: {
                                                                Color: new StaticResourceMarkup("ProgressIndeterminateColor2"),
                                                                Offset: 0.651
                                                            }
                                                        },
                                                        {
                                                            Type: GradientStop,
                                                            Props: {
                                                                Color: new StaticResourceMarkup("ProgressIndeterminateColor3"),
                                                                Offset: 0.093
                                                            }
                                                        },
                                                        {
                                                            Type: GradientStop,
                                                            Props: {
                                                                Color: new StaticResourceMarkup("ProgressIndeterminateColor4"),
                                                                Offset: 0.548
                                                            }
                                                        }]

                                                    }
                                                }
                                            }
                                        }]

                                    }]

                                }]

                            }
                        }
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ProgressBar, "BorderThickness"),
                        Value: "1"
                    }
                }]

            }
        },
        {
            Key: "DefaultRadioButtonStyle", Value: {
                Type: Style,
                Props: {
                    TargetType: RadioButton
                },
                Children: [
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RadioButton, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RadioButton, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RadioButton, "Background"),
                        Value: new StaticResourceMarkup("CheckBoxBackgroundBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RadioButton, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
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
                        Value: new StaticResourceMarkup("CheckBoxBrush")
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
                                                Props: {
                                                    Duration: new Duration(new TimeSpan(0, 0, 0, 0, 100))
                                                },
                                                Children: [
                                                {
                                                    Type: DoubleAnimation,
                                                    Props: {
                                                        To: 1,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 100))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "MouseOverEllipse"
                                                    }
                                                    ]
                                                },
                                                {
                                                    Type: ColorAnimation,
                                                    Props: {
                                                        To: new StaticResourceMarkup("Gray2"),
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "ContentPresenterWrapperColor"
                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Color")

                                                    }
                                                    ]
                                                },
                                                {
                                                    Type: DoubleAnimation,
                                                    Props: {
                                                        To: 1,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 100))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "grid"
                                                    }
                                                    ]
                                                }]

                                            }
                                        },
                                        {
                                            Type: VisualState,
                                            Name: "Pressed",
                                            Content: {
                                                Type: Storyboard
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
                                                        To: 0.55,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "contentPresenter"
                                                    }
                                                    ]
                                                },
                                                {
                                                    Type: DoubleAnimation,
                                                    Props: {
                                                        To: 0.55,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "DisabledVisualElement"
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
                                                        To: 1,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "CheckIcon"
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
                                                Type: Storyboard
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "ValidationErrorElement"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "ValidationErrorElement"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: Visibility.Visible
                                                        }
                                                    }]

                                                },
                                                {
                                                    Type: ObjectAnimationUsingKeyFrames,
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("IsOpen")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "validationTooltip"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: {
                                                                Type: Boolean,
                                                                Value: true
                                                            }
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
                                        VerticalAlignment: VerticalAlignment.Center
                                    },
                                    Children: [
                                    {
                                        Type: Grid,
                                        Name: "grid",
                                        Props: {
                                            Height: 15,
                                            Width: 15,
                                            Opacity: 0.7
                                        },
                                        Children: [
                                        {
                                            Type: Ellipse,
                                            Name: "Background",
                                            Props: {
                                                Fill: new TemplateBindingMarkup("Background"),
                                                Stroke: new TemplateBindingMarkup("BorderBrush"),
                                                Margin: new Thickness(1, 1, 1, 1),
                                                StrokeThickness: new TemplateBindingMarkup("BorderThickness")
                                            }
                                        },
                                        {
                                            Type: Ellipse,
                                            Name: "MouseOverEllipse",
                                            Props: {
                                                Stroke: new StaticResourceMarkup("CheckBoxMouseOverBrush"),
                                                Margin: new Thickness(1, 1, 1, 1),
                                                Opacity: 0
                                            }
                                        },
                                        {
                                            Type: Ellipse,
                                            Name: "PressedEllipse",
                                            Props: {
                                                Stroke: new StaticResourceMarkup("BlackBrush"),
                                                Margin: new Thickness(1, 1, 1, 1),
                                                Opacity: 0
                                            }
                                        },
                                        {
                                            Type: Ellipse,
                                            Name: "CheckIcon",
                                            Props: {
                                                Fill: new StaticResourceMarkup("BlackBrush"),
                                                Height: 7,
                                                Opacity: 0,
                                                Width: 7
                                            }
                                        },
                                        {
                                            Type: Ellipse,
                                            Name: "DisabledVisualElement",
                                            Props: {
                                                Fill: new StaticResourceMarkup("DisabledWhiteColorBrush"),
                                                Opacity: 0
                                            }
                                        },
                                        {
                                            Type: Grid,
                                            Name: "ValidationErrorElement",
                                            Props: {
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
                                                        DataContext: new BindingMarkup({}),
                                                        Placement: PlacementMode.Right,
                                                        PlacementTarget: new BindingMarkup({}),
                                                        Template: new StaticResourceMarkup("ValidationToolTipTemplate"),
                                                        Triggers: [
                                                        {
                                                            Type: EventTrigger,
                                                            Props: {
                                                                RoutedEvent: "Canvas.Loaded"
                                                            },
                                                            Children: [
                                                            {
                                                                Type: BeginStoryboard,
                                                                Content: {
                                                                    Type: Storyboard,
                                                                    Children: [
                                                                    {
                                                                        Type: ObjectAnimationUsingKeyFrames,
                                                                        AttachedProps: [{
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetProperty",
                                                                            Value: new PropertyPath("IsHitTestVisible")

                                                                        },
                                                                        {
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetName",
                                                                            Value: "validationTooltip"
                                                                        }
                                                                        ],
                                                                        Children: [
                                                                        {
                                                                            Type: DiscreteObjectKeyFrame,
                                                                            Props: {
                                                                                KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                                                Value: {
                                                                                    Type: Boolean,
                                                                                    Value: true
                                                                                }
                                                                            }
                                                                        }]

                                                                    }]

                                                                }
                                                            }]

                                                        }]

                                                    }
                                                }

                                            }
                                            ],
                                            Children: [
                                            {
                                                Type: Ellipse,
                                                Props: {
                                                    Height: 14,
                                                    Stroke: new StaticResourceMarkup("ControlsValidationBrush"),
                                                    StrokeThickness: 1,
                                                    Width: 14
                                                }
                                            },
                                            {
                                                Type: Ellipse,
                                                Props: {
                                                    Fill: new StaticResourceMarkup("ControlsValidationBrush"),
                                                    HorizontalAlignment: HorizontalAlignment.Right,
                                                    Height: 4,
                                                    Margin: new Thickness(0, -2, -1, 0),
                                                    VerticalAlignment: VerticalAlignment.Top,
                                                    Width: 4
                                                }
                                            },
                                            {
                                                Type: Ellipse,
                                                Props: {
                                                    Fill: {
                                                        Type: SolidColorBrush,
                                                        Props: {
                                                            Color: {
                                                                Type: Color,
                                                                Props: {
                                                                    HexString: "#00FFFFFF"
                                                                }
                                                            }
                                                        }
                                                    },
                                                    HorizontalAlignment: HorizontalAlignment.Right,
                                                    Height: 10,
                                                    Margin: new Thickness(0, -5, -4, 0),
                                                    VerticalAlignment: VerticalAlignment.Top,
                                                    Width: 10
                                                }
                                            }]

                                        }]

                                    }]

                                },
                                {
                                    Type: ContentControl,
                                    Props: {
                                        Foreground: {
                                            Type: SolidColorBrush,
                                            Name: "ContentPresenterWrapperColor",
                                            Props: {
                                                Color: new StaticResourceMarkup("BlackColor")
                                            }
                                        }
                                    },
                                    AttachedProps: [{
                                        Owner: Grid,
                                        Prop: "Column",
                                        Value: 1
                                    }
                                    ],
                                    Content: {
                                        Type: ContentPresenter,
                                        Name: "contentPresenter",
                                        Props: {
                                            ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
                                            HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                            Margin: new TemplateBindingMarkup("Padding"),
                                            VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment")
                                        },
                                        Content: new TemplateBindingMarkup("Content")
                                    }
                                }]

                            }
                        }
                    }
                }]

            }
        },
        {
            Key: "DefaultRepeatButtonStyle", Value: {
                Type: Style,
                Props: {
                    TargetType: RepeatButton
                },
                Children: [
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "Background"),
                        Value: new StaticResourceMarkup("GrayBrush7")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "BorderBrush"),
                        Value: new StaticResourceMarkup("TextBoxBorderBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextOptions, "TextHintingMode"),
                        Value: "Animated"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "FontWeight"),
                        Value: "SemiBold"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "Padding"),
                        Value: "5,6"
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
                                                        To: 1,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "MouseOverBorder"
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
                                                        To: 1,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "PressedBorder"
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
                                                        To: 0.55,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "DisabledVisualElement"
                                                    }
                                                    ]
                                                },
                                                {
                                                    Type: DoubleAnimation,
                                                    Props: {
                                                        To: 0.5,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "contentPresenter"
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "FocusRectangle"
                                                    }
                                                    ]
                                                },
                                                {
                                                    Type: DoubleAnimation,
                                                    Props: {
                                                        To: 1,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "FocusInnerRectangle"
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
                                        BorderBrush: new TemplateBindingMarkup("BorderBrush"),
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        Background: new TemplateBindingMarkup("Background"),
                                        CornerRadius: new CornerRadius(3, 3, 3, 3)
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Name: "DisabledVisualElement",
                                    Props: {
                                        Fill: new StaticResourceMarkup("DisabledWhiteColorBrush"),
                                        IsHitTestVisible: false,
                                        Opacity: 0,
                                        RadiusY: 3,
                                        RadiusX: 3
                                    }
                                },
                                {
                                    Type: Border,
                                    Name: "MouseOverBorder",
                                    Props: {
                                        Background: new StaticResourceMarkup("GrayBrush8"),
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        CornerRadius: new CornerRadius(3.5, 3.5, 3.5, 3.5),
                                        Opacity: 0
                                    }
                                },
                                {
                                    Type: Border,
                                    Name: "PressedBorder",
                                    Props: {
                                        Background: new StaticResourceMarkup("GrayBrush5"),
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        CornerRadius: new CornerRadius(3.5, 3.5, 3.5, 3.5),
                                        Opacity: 0
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Name: "FocusRectangle",
                                    Props: {
                                        Stroke: new StaticResourceMarkup("TextBoxMouseOverInnerBorderBrush"),
                                        RadiusY: 4,
                                        RadiusX: 4,
                                        Margin: new Thickness(-1, -1, -1, -1),
                                        Opacity: 0
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Name: "FocusInnerRectangle",
                                    Props: {
                                        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                        Stroke: new StaticResourceMarkup("TextBoxMouseOverBorderBrush"),
                                        RadiusX: 3,
                                        RadiusY: 3,
                                        Opacity: 0
                                    }
                                },
                                {
                                    Type: ContentPresenter,
                                    Name: "contentPresenter",
                                    Props: {
                                        ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
                                        HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                        Margin: new TemplateBindingMarkup("Padding"),
                                        VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment")
                                    },
                                    Content: new TemplateBindingMarkup("Content")
                                }]

                            }
                        }
                    }
                }]

            }
        },
        {
            Key: "HorizontalSliderThumb", Value: {
                Type: Style,
                Props: {
                    TargetType: Thumb
                },
                Children: [
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Thumb, "Background"),
                        Value: new StaticResourceMarkup("GrayBrush7")
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
                                                Type: Storyboard
                                            }
                                        },
                                        {
                                            Type: VisualState,
                                            Name: "Pressed",
                                            Content: {
                                                Type: Storyboard
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
                                                        To: 0.55,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "DisabledVisualElement"
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
                                            Name: "Focused"
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
                                    Props: {
                                        Background: new StaticResourceMarkup("BlackBrush"),
                                        BorderThickness: new Thickness(0, 0, 1, 0),
                                        BorderBrush: new StaticResourceMarkup("ControlBackgroundBrush")
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Name: "DisabledVisualElement",
                                    Props: {
                                        Fill: new StaticResourceMarkup("DisabledWhiteColorBrush"),
                                        IsHitTestVisible: false,
                                        Opacity: 0
                                    }
                                }]

                            }
                        }
                    }
                }]

            }
        },
        {
            Key: "VerticalSliderThumb", Value: {
                Type: Style,
                Props: {
                    TargetType: Thumb
                },
                Children: [
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Thumb, "Background"),
                        Value: new StaticResourceMarkup("TransparentWhiteBrush")
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
                                                Type: Storyboard
                                            }
                                        },
                                        {
                                            Type: VisualState,
                                            Name: "Pressed",
                                            Content: {
                                                Type: Storyboard
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
                                                        To: 0.55,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "DisabledVisualElement"
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
                                            Name: "Focused"
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
                                    Props: {
                                        Background: new StaticResourceMarkup("BlackBrush"),
                                        BorderThickness: new Thickness(0, 1, 0, 0),
                                        BorderBrush: new StaticResourceMarkup("ControlBackgroundBrush")
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Name: "DisabledVisualElement",
                                    Props: {
                                        Fill: new StaticResourceMarkup("DisabledWhiteColorBrush"),
                                        IsHitTestVisible: false,
                                        Opacity: 0
                                    }
                                }]

                            }
                        }
                    }
                }]

            }
        },
        {
            Key: "RepeatButtonTemplate", Value: {
                Type: ControlTemplate,
                Content: {
                    Type: Grid,
                    Name: "Root",
                    Props: {
                        Opacity: 0
                    }
                }
            }
        },
        {
            Key: "HorizontalTrackLargeDecrease", Value: {
                Type: ControlTemplate,
                Props: {
                    TargetType: RepeatButton
                },
                Content: {
                    Type: Grid,
                    Name: "Root",
                    Props: {
                        Margin: new Thickness(0, -1, 0, 0)
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
                                Name: "Pressed"
                            },
                            {
                                Type: VisualState,
                                Name: "Disabled"
                            }]

                        }]


                    }
                    ],
                    Children: [
                    {
                        Type: Rectangle,
                        Props: {
                            Height: 3,
                            Margin: new Thickness(0, 1, 0, 0),
                            Fill: {
                                Type: SolidColorBrush,
                                Props: {
                                    Color: new StaticResourceMarkup("BlackColor")
                                }
                            }
                        }
                    }]

                }
            }
        },
        {
            Key: "VerticalTrackLargeDecrease", Value: {
                Type: ControlTemplate,
                Props: {
                    TargetType: RepeatButton
                },
                Content: {
                    Type: Grid,
                    Name: "Root",
                    Props: {
                        Margin: new Thickness(0, 0, 0, 0)
                    },
                    Children: [
                    {
                        Type: Rectangle,
                        Props: {
                            Width: 3,
                            Fill: {
                                Type: SolidColorBrush,
                                Props: {
                                    Color: new StaticResourceMarkup("BlackColor")
                                }
                            }
                        }
                    }]

                }
            }
        },
        {
            Key: "DefaultSliderStyle", Value: {
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
                        Value: new StaticResourceMarkup("ControlBorderBrush")
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
                                    Resources: {
                                        Type: ResourceDictionary,
                                        Children: [
                                        {
                                            Key: "RepeatButtonTemplate", Value: {
                                                Type: ControlTemplate,
                                                Content: {
                                                    Type: Grid,
                                                    Name: "Root",
                                                    Props: {
                                                        Opacity: 0,
                                                        Background: {
                                                            Type: SolidColorBrush,
                                                            Props: {
                                                                Color: {
                                                                    Type: Color,
                                                                    Props: {
                                                                        HexString: "#00FFFFFF"
                                                                    }
                                                                }
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "HorizontalTrackRectangleDisabledOverlay"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "ThumbDisabledOverlay"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
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
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Visibility")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "VerticalTrackRectangleDisabledOverlay"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: Visibility.Visible
                                                        }
                                                    }]

                                                },
                                                {
                                                    Type: ObjectAnimationUsingKeyFrames,
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Visibility)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "ThumbDisabledOverlayVertical"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: Visibility.Visible
                                                        }
                                                    }]

                                                },
                                                {
                                                    Type: ObjectAnimationUsingKeyFrames,
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Visibility)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "HorizontalTrackRectangleDisabledOverlay_Copy"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
                                                            Value: Visibility.Visible
                                                        }
                                                    }]

                                                },
                                                {
                                                    Type: ObjectAnimationUsingKeyFrames,
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Visibility)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "VerticalTrackRectangleDisabledOverlay_Copy"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: DiscreteObjectKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 0)),
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
                                            Name: "Unfocused"
                                        },
                                        {
                                            Type: VisualState,
                                            Name: "Focused"
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
                                            Height: 3,
                                            Margin: new Thickness(5, 0, 5, 0),
                                            StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                            Fill: new StaticResourceMarkup("SliderTrackBrush")
                                        },
                                        AttachedProps: [{
                                            Owner: Grid,
                                            Prop: "ColumnSpan",
                                            Value: 3
                                        },
                                        {
                                            Owner: Grid,
                                            Prop: "Column",
                                            Value: 0
                                        }
                                        ]
                                    },
                                    {
                                        Type: Rectangle,
                                        Name: "HorizontalTrackRectangleDisabledOverlay",
                                        Props: {
                                            Fill: new StaticResourceMarkup("DisabledWhiteColorBrush"),
                                            Height: 3,
                                            Margin: new Thickness(5, 0, 5, 0),
                                            Opacity: 0.55,
                                            Visibility: Visibility.Collapsed
                                        },
                                        AttachedProps: [{
                                            Owner: Grid,
                                            Prop: "ColumnSpan",
                                            Value: 3
                                        },
                                        {
                                            Owner: Grid,
                                            Prop: "Column",
                                            Value: 0
                                        }
                                        ]
                                    },
                                    {
                                        Type: RepeatButton,
                                        Name: "HorizontalTrackLargeChangeDecreaseRepeatButton",
                                        Props: {
                                            Height: 18,
                                            IsTabStop: false,
                                            Template: new StaticResourceMarkup("HorizontalTrackLargeDecrease")
                                        },
                                        AttachedProps: [{
                                            Owner: Grid,
                                            Prop: "Column",
                                            Value: 0
                                        }
                                        ]
                                    },
                                    {
                                        Type: Rectangle,
                                        Name: "HorizontalTrackRectangleDisabledOverlay_Copy",
                                        Props: {
                                            Fill: new StaticResourceMarkup("DisabledWhiteColorBrush"),
                                            Height: 4,
                                            Opacity: 0.7,
                                            Visibility: Visibility.Collapsed
                                        },
                                        AttachedProps: [{
                                            Owner: Grid,
                                            Prop: "ColumnSpan",
                                            Value: 1
                                        }
                                        ]
                                    },
                                    {
                                        Type: Thumb,
                                        Name: "HorizontalThumb",
                                        Props: {
                                            Height: 10,
                                            IsTabStop: true,
                                            Width: 4,
                                            Style: new StaticResourceMarkup("HorizontalSliderThumb")
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
                                            Fill: new StaticResourceMarkup("DisabledWhiteColorBrush"),
                                            Opacity: 0.25,
                                            Visibility: Visibility.Collapsed,
                                            Width: 4,
                                            Height: 10
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
                                        Name: "TrackRectangle_Vertical",
                                        Props: {
                                            Margin: new Thickness(0, 5, 0, 5),
                                            StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                            Fill: new StaticResourceMarkup("SliderTrackBrush"),
                                            Width: 3
                                        },
                                        AttachedProps: [{
                                            Owner: Grid,
                                            Prop: "ColumnSpan",
                                            Value: 1
                                        },
                                        {
                                            Owner: Grid,
                                            Prop: "RowSpan",
                                            Value: 3
                                        },
                                        {
                                            Owner: Grid,
                                            Prop: "Row",
                                            Value: 0
                                        }
                                        ]
                                    },
                                    {
                                        Type: Rectangle,
                                        Name: "VerticalTrackRectangleDisabledOverlay",
                                        Props: {
                                            Fill: new StaticResourceMarkup("DisabledWhiteColorBrush"),
                                            Margin: new Thickness(0, 5, 0, 5),
                                            Opacity: 0.55,
                                            Width: 3,
                                            Visibility: Visibility.Collapsed
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
                                            IsTabStop: false,
                                            Width: 17,
                                            Template: new StaticResourceMarkup("VerticalTrackLargeDecrease")
                                        },
                                        AttachedProps: [{
                                            Owner: Grid,
                                            Prop: "Row",
                                            Value: 2
                                        }
                                        ]
                                    },
                                    {
                                        Type: Rectangle,
                                        Name: "VerticalTrackRectangleDisabledOverlay_Copy",
                                        Props: {
                                            Fill: new StaticResourceMarkup("DisabledWhiteColorBrush"),
                                            Opacity: 0.7,
                                            Width: 5,
                                            Visibility: Visibility.Collapsed
                                        },
                                        AttachedProps: [{
                                            Owner: Grid,
                                            Prop: "Row",
                                            Value: 2
                                        },
                                        {
                                            Owner: Grid,
                                            Prop: "RowSpan",
                                            Value: 1
                                        }
                                        ]
                                    },
                                    {
                                        Type: Thumb,
                                        Name: "VerticalThumb",
                                        Props: {
                                            Height: 4,
                                            IsTabStop: true,
                                            Width: 10,
                                            Style: new StaticResourceMarkup("VerticalSliderThumb")
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
                                            IsTabStop: false,
                                            Template: new StaticResourceMarkup("RepeatButtonTemplate"),
                                            Width: 17
                                        },
                                        AttachedProps: [{
                                            Owner: Grid,
                                            Prop: "Row",
                                            Value: 0
                                        }
                                        ]
                                    },
                                    {
                                        Type: Rectangle,
                                        Name: "ThumbDisabledOverlayVertical",
                                        Props: {
                                            Fill: new StaticResourceMarkup("DisabledWhiteColorBrush"),
                                            Opacity: 0.25,
                                            Width: 10,
                                            Height: 4,
                                            Visibility: Visibility.Collapsed
                                        },
                                        AttachedProps: [{
                                            Owner: Grid,
                                            Prop: "Row",
                                            Value: 1
                                        }
                                        ]
                                    }]

                                }]

                            }
                        }
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Slider, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
                    }
                }]

            }
        },
        {
            Key: "DefaultToggleButtonStyle", Value: {
                Type: Style,
                Props: {
                    TargetType: ToggleButton
                },
                Children: [
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Background"),
                        Value: new StaticResourceMarkup("GrayBrush7")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "BorderBrush"),
                        Value: new StaticResourceMarkup("TextBoxBorderBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextOptions, "TextHintingMode"),
                        Value: "Animated"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "FontWeight"),
                        Value: "SemiBold"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Padding"),
                        Value: "5,6"
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
                                                        To: 1,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "MouseOverBorder"
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
                                                        To: 1,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "PressedBorder"
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
                                                        To: 0.55,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("Opacity")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "DisabledVisualElement"
                                                    }
                                                    ]
                                                },
                                                {
                                                    Type: DoubleAnimation,
                                                    Props: {
                                                        To: 0.5,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "contentPresenter"
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
                                                        To: 1,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "CheckedRectangle"
                                                    }
                                                    ]
                                                },
                                                {
                                                    Type: DoubleAnimation,
                                                    Props: {
                                                        To: 1,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "CheckedInnerRectangle"
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
                                                        To: 1,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "FocusRectangle"
                                                    }
                                                    ]
                                                },
                                                {
                                                    Type: DoubleAnimation,
                                                    Props: {
                                                        To: 1,
                                                        Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                    },
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "FocusInnerRectangle"
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
                                        BorderBrush: new TemplateBindingMarkup("BorderBrush"),
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        Background: new TemplateBindingMarkup("Background"),
                                        CornerRadius: new CornerRadius(3, 3, 3, 3)
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Name: "DisabledVisualElement",
                                    Props: {
                                        Fill: new StaticResourceMarkup("WhiteColorBrush"),
                                        IsHitTestVisible: false,
                                        Opacity: 0,
                                        RadiusY: 3,
                                        RadiusX: 3
                                    }
                                },
                                {
                                    Type: Border,
                                    Name: "MouseOverBorder",
                                    Props: {
                                        Background: new StaticResourceMarkup("GrayBrush8"),
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        CornerRadius: new CornerRadius(3.5, 3.5, 3.5, 3.5),
                                        Opacity: 0
                                    }
                                },
                                {
                                    Type: Border,
                                    Name: "PressedBorder",
                                    Props: {
                                        Background: new StaticResourceMarkup("GrayBrush5"),
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        CornerRadius: new CornerRadius(3.5, 3.5, 3.5, 3.5),
                                        Opacity: 0
                                    }
                                },
                                {
                                    Type: Border,
                                    Name: "CheckedBorder",
                                    Props: {
                                        Background: new StaticResourceMarkup("GrayBrush5"),
                                        BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                        CornerRadius: new CornerRadius(3.5, 3.5, 3.5, 3.5),
                                        Opacity: 0
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Name: "FocusRectangle",
                                    Props: {
                                        Stroke: new StaticResourceMarkup("TextBoxMouseOverInnerBorderBrush"),
                                        RadiusY: 4,
                                        RadiusX: 4,
                                        Margin: new Thickness(-1, -1, -1, -1),
                                        Opacity: 0
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Name: "FocusInnerRectangle",
                                    Props: {
                                        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                        Stroke: new StaticResourceMarkup("TextBoxMouseOverBorderBrush"),
                                        RadiusX: 3,
                                        RadiusY: 3,
                                        Opacity: 0
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Name: "CheckedRectangle",
                                    Props: {
                                        Stroke: new StaticResourceMarkup("GrayBrush1"),
                                        RadiusY: 4,
                                        RadiusX: 4,
                                        Margin: new Thickness(-1, -1, -1, -1),
                                        Opacity: 0
                                    }
                                },
                                {
                                    Type: Rectangle,
                                    Name: "CheckedInnerRectangle",
                                    Props: {
                                        Fill: new StaticResourceMarkup("GrayBrush2"),
                                        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                        Stroke: new StaticResourceMarkup("GrayBrush2"),
                                        RadiusX: 3,
                                        RadiusY: 3,
                                        Opacity: 0
                                    }
                                },
                                {
                                    Type: ContentPresenter,
                                    Name: "contentPresenter",
                                    Props: {
                                        ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
                                        HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                        Margin: new TemplateBindingMarkup("Padding"),
                                        VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment")
                                    },
                                    Content: new TemplateBindingMarkup("Content")
                                }]

                            }
                        }
                    }
                }]

            }
        },
        {
            Key: "DefaultToolTipStyle", Value: {
                Type: Style,
                Props: {
                    TargetType: ToolTip
                },
                Children: [
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToolTip, "Background"),
                        Value: new StaticResourceMarkup("ControlBackgroundBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToolTip, "Foreground"),
                        Value: new StaticResourceMarkup("WhiteBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToolTip, "Padding"),
                        Value: "3,0,3,0"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToolTip, "BorderThickness"),
                        Value: "1"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToolTip, "BorderBrush"),
                        Value: new StaticResourceMarkup("ItemSelectedBrush")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToolTip, "Template"),
                        Value: {
                            Type: ControlTemplate,
                            Props: {
                                TargetType: ToolTip
                            },
                            Content: {
                                Type: Border,
                                Name: "Root",
                                Props: {
                                    BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                    Background: new StaticResourceMarkup("BlackBrush"),
                                    Effect: new StaticResourceMarkup("DropShadowBrush"),
                                    Opacity: 0
                                },
                                AttachedProps: [{
                                    Owner: VisualStateManager,
                                    Prop: "VisualStateGroups",
                                    Value: [
                                    {
                                        Type: VisualStateGroup,
                                        Name: "OpenStates",
                                        Props: {
                                            Transitions: [
                                            {
                                                Type: VisualTransition,
                                                Props: {
                                                    From: "Open",
                                                    GeneratedDuration: new Duration(new TimeSpan(0, 0, 0, 0, 300)),
                                                    To: "Closed"
                                                }
                                            }]

                                        },
                                        Children: [
                                        {
                                            Type: VisualState,
                                            Name: "Closed",
                                            Content: {
                                                Type: Storyboard,
                                                Children: [
                                                {
                                                    Type: DoubleAnimationUsingKeyFrames,
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "Root"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: EasingDoubleKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 400)),
                                                            Value: 0
                                                        }
                                                    }]

                                                }]

                                            }
                                        },
                                        {
                                            Type: VisualState,
                                            Name: "Open",
                                            Content: {
                                                Type: Storyboard,
                                                Children: [
                                                {
                                                    Type: DoubleAnimationUsingKeyFrames,
                                                    AttachedProps: [{
                                                        Owner: Storyboard,
                                                        Prop: "TargetProperty",
                                                        Value: new PropertyPath("(UIElement.Opacity)")

                                                    },
                                                    {
                                                        Owner: Storyboard,
                                                        Prop: "TargetName",
                                                        Value: "Root"
                                                    }
                                                    ],
                                                    Children: [
                                                    {
                                                        Type: EasingDoubleKeyFrame,
                                                        Props: {
                                                            KeyTime: KeyTime.CreateTimeSpan(new TimeSpan(0, 0, 0, 0, 300)),
                                                            Value: 1
                                                        }
                                                    }]

                                                }]

                                            }
                                        }]

                                    }]


                                }
                                ],
                                Content: {
                                    Type: Border,
                                    Props: {
                                        Padding: new TemplateBindingMarkup("Padding"),
                                        Resources: {
                                            Type: ResourceDictionary,
                                            Children: [
                                            {
                                                Key: "Visible State", Value: {
                                                    Type: Storyboard
                                                }
                                            },
                                            {
                                                Key: "Normal State", Value: {
                                                    Type: Storyboard
                                                }
                                            }]
                                        },
                                        Background: new StaticResourceMarkup("BlackBrush")
                                    },
                                    Content: {
                                        Type: ContentPresenter,
                                        Props: {
                                            Cursor: new TemplateBindingMarkup("Cursor"),
                                            ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
                                            Margin: new TemplateBindingMarkup("Padding")
                                        },
                                        Content: new TemplateBindingMarkup("Content")
                                    }
                                }
                            }
                        }
                    }
                }]

            }
        },
        {
            Value: {
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

            }
        },
        {
            Value: {
                Type: Style,
                Props: {
                    TargetType: ContentControl
                },
                Children: [
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ContentControl, "IsEnabled"),
                        Value: "true"
                    }
                },
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
                        Property: DependencyProperty.GetDependencyProperty(ContentControl, "Cursor"),
                        Value: "Arrow"
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ContentControl, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    Type: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ContentControl, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
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
                                    ContentTemplate: new TemplateBindingMarkup("ContentTemplate")
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
                Type: Style,
                Props: {
                    TargetType: Button,
                    BasedOn: new StaticResourceMarkup("DefaultButtonStyle")
                }
            }
        },
        {
            Value: {
                Type: Style,
                Props: {
                    TargetType: HyperlinkButton,
                    BasedOn: new StaticResourceMarkup("DefaultHyperlinkButtonStyle")
                }
            }
        },
        {
            Value: {
                Type: Style,
                Props: {
                    TargetType: TextBox,
                    BasedOn: new StaticResourceMarkup("DefaultTextBoxStyle")
                }
            }
        },
        {
            Value: {
                Type: Style,
                Props: {
                    TargetType: ComboBox,
                    BasedOn: new StaticResourceMarkup("DefaultComboBoxStyle")
                }
            }
        },
        {
            Value: {
                Type: Style,
                Props: {
                    TargetType: ComboBoxItem,
                    BasedOn: new StaticResourceMarkup("DefaultComboBoxItemStyle")
                }
            }
        },
        {
            Value: {
                Type: Style,
                Props: {
                    TargetType: TextBlock,
                    BasedOn: new StaticResourceMarkup("DefaultTextBlockStyle")
                }
            }
        },
        {
            Value: {
                Type: Style,
                Props: {
                    TargetType: ScrollBar,
                    BasedOn: new StaticResourceMarkup("DefaultScrollBarStyle")
                }
            }
        },
        {
            Value: {
                Type: Style,
                Props: {
                    TargetType: ScrollViewer,
                    BasedOn: new StaticResourceMarkup("DefaultScrollViewerStyle")
                }
            }
        },
        {
            Value: {
                Type: Style,
                Props: {
                    TargetType: ListBox,
                    BasedOn: new StaticResourceMarkup("DefaultListBoxStyle")
                }
            }
        },
        {
            Value: {
                Type: Style,
                Props: {
                    TargetType: ListBoxItem,
                    BasedOn: new StaticResourceMarkup("DefaultListBoxItemStyle")
                }
            }
        },
        {
            Value: {
                Type: Style,
                Props: {
                    TargetType: CheckBox,
                    BasedOn: new StaticResourceMarkup("DefaultCheckBoxStyle")
                }
            }
        },
        {
            Value: {
                Type: Style,
                Props: {
                    TargetType: PasswordBox,
                    BasedOn: new StaticResourceMarkup("DefaultPasswordBoxStyle")
                }
            }
        },
        {
            Value: {
                Type: Style,
                Props: {
                    TargetType: ProgressBar,
                    BasedOn: new StaticResourceMarkup("DefaultProgressBarStyle")
                }
            }
        },
        {
            Value: {
                Type: Style,
                Props: {
                    TargetType: RadioButton,
                    BasedOn: new StaticResourceMarkup("DefaultRadioButtonStyle")
                }
            }
        },
        {
            Value: {
                Type: Style,
                Props: {
                    TargetType: RepeatButton,
                    BasedOn: new StaticResourceMarkup("DefaultRepeatButtonStyle")
                }
            }
        },
        {
            Value: {
                Type: Style,
                Props: {
                    TargetType: Slider,
                    BasedOn: new StaticResourceMarkup("DefaultSliderStyle")
                }
            }
        },
        {
            Value: {
                Type: Style,
                Props: {
                    TargetType: ToggleButton,
                    BasedOn: new StaticResourceMarkup("DefaultToggleButtonStyle")
                }
            }
        },
        {
            Value: {
                Type: Style,
                Props: {
                    TargetType: ToolTip,
                    BasedOn: new StaticResourceMarkup("DefaultToolTipStyle")
                }
            }
        }]
    };
    return Fayde.JsonParser.Parse(json);
};