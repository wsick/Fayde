/// <reference path="Fayde.js"/>

App.GetGenericResourceDictionaryImpl = function () {
    var ResourceDictionary = Fayde.ResourceDictionary; if (!ResourceDictionary) throw new UnknownTypeException("Fayde.ResourceDictionary");
    var SolidColorBrush = Fayde.Media.SolidColorBrush; if (!SolidColorBrush) throw new UnknownTypeException("Fayde.Media.SolidColorBrush");
    var StaticResourceMarkup = Fayde.StaticResourceMarkup; if (!StaticResourceMarkup) throw new UnknownTypeException("Fayde.StaticResourceMarkup");
    var LinearGradientBrush = Fayde.Media.LinearGradientBrush; if (!LinearGradientBrush) throw new UnknownTypeException("Fayde.Media.LinearGradientBrush");
    var GradientStop = Fayde.Media.GradientStop; if (!GradientStop) throw new UnknownTypeException("Fayde.Media.GradientStop");
    var DropShadowEffect = Fayde.Media.Effects.DropShadowEffect; if (!DropShadowEffect) throw new UnknownTypeException("Fayde.Media.Effects.DropShadowEffect");
    var Style = Fayde.Style; if (!Style) throw new UnknownTypeException("Fayde.Style");
    var HyperlinkButton = Fayde.Controls.HyperlinkButton; if (!HyperlinkButton) throw new UnknownTypeException("Fayde.Controls.HyperlinkButton");
    var Setter = Fayde.Setter; if (!Setter) throw new UnknownTypeException("Fayde.Setter");
    var DataTemplate = Fayde.DataTemplate; if (!DataTemplate) throw new UnknownTypeException("Fayde.DataTemplate");
    var Grid = Fayde.Controls.Grid; if (!Grid) throw new UnknownTypeException("Fayde.Controls.Grid");
    var HorizontalAlignment = Fayde.HorizontalAlignment; if (!HorizontalAlignment) throw new UnknownTypeException("Fayde.HorizontalAlignment");
    var VerticalAlignment = Fayde.VerticalAlignment; if (!VerticalAlignment) throw new UnknownTypeException("Fayde.VerticalAlignment");
    var Rectangle = Fayde.Shapes.Rectangle; if (!Rectangle) throw new UnknownTypeException("Fayde.Shapes.Rectangle");
    var RotateTransform = Fayde.Media.RotateTransform; if (!RotateTransform) throw new UnknownTypeException("Fayde.Media.RotateTransform");
    var Ellipse = Fayde.Shapes.Ellipse; if (!Ellipse) throw new UnknownTypeException("Fayde.Shapes.Ellipse");
    var ControlTemplate = Fayde.Controls.ControlTemplate; if (!ControlTemplate) throw new UnknownTypeException("Fayde.Controls.ControlTemplate");
    var TemplateBindingMarkup = Fayde.TemplateBindingMarkup; if (!TemplateBindingMarkup) throw new UnknownTypeException("Fayde.TemplateBindingMarkup");
    var VisualStateManager = Fayde.Media.VSM.VisualStateManager; if (!VisualStateManager) throw new UnknownTypeException("Fayde.Media.VSM.VisualStateManager");
    var VisualStateGroup = Fayde.Media.VSM.VisualStateGroup; if (!VisualStateGroup) throw new UnknownTypeException("Fayde.Media.VSM.VisualStateGroup");
    var VisualState = Fayde.Media.VSM.VisualState; if (!VisualState) throw new UnknownTypeException("Fayde.Media.VSM.VisualState");
    var Storyboard = Fayde.Media.Animation.Storyboard; if (!Storyboard) throw new UnknownTypeException("Fayde.Media.Animation.Storyboard");
    var ColorAnimation = Fayde.Media.Animation.ColorAnimation; if (!ColorAnimation) throw new UnknownTypeException("Fayde.Media.Animation.ColorAnimation");
    var PropertyPath = Fayde.Data.PropertyPath; if (!PropertyPath) throw new UnknownTypeException("Fayde.Data.PropertyPath");
    var DoubleAnimation = Fayde.Media.Animation.DoubleAnimation; if (!DoubleAnimation) throw new UnknownTypeException("Fayde.Media.Animation.DoubleAnimation");
    var ObjectAnimationUsingKeyFrames = Fayde.Media.Animation.ObjectAnimationUsingKeyFrames; if (!ObjectAnimationUsingKeyFrames) throw new UnknownTypeException("Fayde.Media.Animation.ObjectAnimationUsingKeyFrames");
    var DiscreteObjectKeyFrame = Fayde.Media.Animation.DiscreteObjectKeyFrame; if (!DiscreteObjectKeyFrame) throw new UnknownTypeException("Fayde.Media.Animation.DiscreteObjectKeyFrame");
    var Visibility = Fayde.Visibility; if (!Visibility) throw new UnknownTypeException("Fayde.Visibility");
    var TextBlock = Fayde.Controls.TextBlock; if (!TextBlock) throw new UnknownTypeException("Fayde.Controls.TextBlock");
    var Canvas = Fayde.Controls.Canvas; if (!Canvas) throw new UnknownTypeException("Fayde.Controls.Canvas");
    var ContentControl = Fayde.Controls.ContentControl; if (!ContentControl) throw new UnknownTypeException("Fayde.Controls.ContentControl");
    var ContentPresenter = Fayde.Controls.ContentPresenter; if (!ContentPresenter) throw new UnknownTypeException("Fayde.Controls.ContentPresenter");
    var TextOptions = Fayde.Media.TextOptions; if (!TextOptions) throw new UnknownTypeException("Fayde.Media.TextOptions");
    var ToolTip = Fayde.Controls.ToolTip; if (!ToolTip) throw new UnknownTypeException("Fayde.Controls.ToolTip");
    var TranslateTransform = Fayde.Media.TranslateTransform; if (!TranslateTransform) throw new UnknownTypeException("Fayde.Media.TranslateTransform");
    var VisualTransition = Fayde.Media.VSM.VisualTransition; if (!VisualTransition) throw new UnknownTypeException("Fayde.Media.VSM.VisualTransition");
    var DoubleAnimationUsingKeyFrames = Fayde.Media.Animation.DoubleAnimationUsingKeyFrames; if (!DoubleAnimationUsingKeyFrames) throw new UnknownTypeException("Fayde.Media.Animation.DoubleAnimationUsingKeyFrames");
    var SplineDoubleKeyFrame = Fayde.Media.Animation.SplineDoubleKeyFrame; if (!SplineDoubleKeyFrame) throw new UnknownTypeException("Fayde.Media.Animation.SplineDoubleKeyFrame");
    var Border = Fayde.Controls.Border; if (!Border) throw new UnknownTypeException("Fayde.Controls.Border");
    var TextWrapping = Fayde.Controls.TextWrapping; if (!TextWrapping) throw new UnknownTypeException("Fayde.Controls.TextWrapping");
    var BindingMarkup = Fayde.BindingMarkup; if (!BindingMarkup) throw new UnknownTypeException("Fayde.BindingMarkup");
    var BackEase = Fayde.Media.Animation.BackEase; if (!BackEase) throw new UnknownTypeException("Fayde.Media.Animation.BackEase");
    var EasingMode = Fayde.Media.Animation.EasingMode; if (!EasingMode) throw new UnknownTypeException("Fayde.Media.Animation.EasingMode");
    var Button = Fayde.Controls.Button; if (!Button) throw new UnknownTypeException("Fayde.Controls.Button");
    var TextBox = Fayde.Controls.TextBox; if (!TextBox) throw new UnknownTypeException("Fayde.Controls.TextBox");
    var ScrollViewer = Fayde.Controls.ScrollViewer; if (!ScrollViewer) throw new UnknownTypeException("Fayde.Controls.ScrollViewer");
    var ToolTipService = Fayde.Controls.ToolTipService; if (!ToolTipService) throw new UnknownTypeException("Fayde.Controls.ToolTipService");
    var PlacementMode = Fayde.Controls.PlacementMode; if (!PlacementMode) throw new UnknownTypeException("Fayde.Controls.PlacementMode");
    var EventTrigger = Fayde.EventTrigger; if (!EventTrigger) throw new UnknownTypeException("Fayde.EventTrigger");
    var BeginStoryboard = Fayde.Media.Animation.BeginStoryboard; if (!BeginStoryboard) throw new UnknownTypeException("Fayde.Media.Animation.BeginStoryboard");
    var Path = Fayde.Shapes.Path; if (!Path) throw new UnknownTypeException("Fayde.Shapes.Path");
    var ComboBox = Fayde.Controls.ComboBox; if (!ComboBox) throw new UnknownTypeException("Fayde.Controls.ComboBox");
    var ToggleButton = Fayde.Controls.Primitives.ToggleButton; if (!ToggleButton) throw new UnknownTypeException("Fayde.Controls.Primitives.ToggleButton");
    var EasingDoubleKeyFrame = Fayde.Media.Animation.EasingDoubleKeyFrame; if (!EasingDoubleKeyFrame) throw new UnknownTypeException("Fayde.Media.Animation.EasingDoubleKeyFrame");
    var Stretch = Fayde.Media.Stretch; if (!Stretch) throw new UnknownTypeException("Fayde.Media.Stretch");
    var Popup = Fayde.Controls.Primitives.Popup; if (!Popup) throw new UnknownTypeException("Fayde.Controls.Primitives.Popup");
    var ItemsPresenter = Fayde.Controls.ItemsPresenter; if (!ItemsPresenter) throw new UnknownTypeException("Fayde.Controls.ItemsPresenter");
    var ComboBoxItem = Fayde.Controls.ComboBoxItem; if (!ComboBoxItem) throw new UnknownTypeException("Fayde.Controls.ComboBoxItem");
    var ColorAnimationUsingKeyFrames = Fayde.Media.Animation.ColorAnimationUsingKeyFrames; if (!ColorAnimationUsingKeyFrames) throw new UnknownTypeException("Fayde.Media.Animation.ColorAnimationUsingKeyFrames");
    var EasingColorKeyFrame = Fayde.Media.Animation.EasingColorKeyFrame; if (!EasingColorKeyFrame) throw new UnknownTypeException("Fayde.Media.Animation.EasingColorKeyFrame");
    var ScrollBar = Fayde.Controls.Primitives.ScrollBar; if (!ScrollBar) throw new UnknownTypeException("Fayde.Controls.Primitives.ScrollBar");
    var RepeatButton = Fayde.Controls.Primitives.RepeatButton; if (!RepeatButton) throw new UnknownTypeException("Fayde.Controls.Primitives.RepeatButton");
    var BlurEffect = Fayde.Media.Effects.BlurEffect; if (!BlurEffect) throw new UnknownTypeException("Fayde.Media.Effects.BlurEffect");
    var Thumb = Fayde.Controls.Primitives.Thumb; if (!Thumb) throw new UnknownTypeException("Fayde.Controls.Primitives.Thumb");
    var ColumnDefinition = Fayde.Controls.ColumnDefinition; if (!ColumnDefinition) throw new UnknownTypeException("Fayde.Controls.ColumnDefinition");
    var GridLength = Fayde.Controls.GridLength; if (!GridLength) throw new UnknownTypeException("Fayde.Controls.GridLength");
    var GridUnitType = Fayde.Controls.GridUnitType; if (!GridUnitType) throw new UnknownTypeException("Fayde.Controls.GridUnitType");
    var RowDefinition = Fayde.Controls.RowDefinition; if (!RowDefinition) throw new UnknownTypeException("Fayde.Controls.RowDefinition");
    var ScrollContentPresenter = Fayde.Controls.ScrollContentPresenter; if (!ScrollContentPresenter) throw new UnknownTypeException("Fayde.Controls.ScrollContentPresenter");
    var Orientation = Fayde.Orientation; if (!Orientation) throw new UnknownTypeException("Fayde.Orientation");
    var ListBox = Fayde.Controls.ListBox; if (!ListBox) throw new UnknownTypeException("Fayde.Controls.ListBox");
    var ListBoxItem = Fayde.Controls.ListBoxItem; if (!ListBoxItem) throw new UnknownTypeException("Fayde.Controls.ListBoxItem");
    var CheckBox = Fayde.Controls.CheckBox; if (!CheckBox) throw new UnknownTypeException("Fayde.Controls.CheckBox");
    var PenLineCap = Fayde.Shapes.PenLineCap; if (!PenLineCap) throw new UnknownTypeException("Fayde.Shapes.PenLineCap");
    var PasswordBox = Fayde.Controls.PasswordBox; if (!PasswordBox) throw new UnknownTypeException("Fayde.Controls.PasswordBox");
    var ProgressBar = Fayde.Controls.ProgressBar; if (!ProgressBar) throw new UnknownTypeException("Fayde.Controls.ProgressBar");
    var RepeatBehavior = Fayde.Media.Animation.RepeatBehavior; if (!RepeatBehavior) throw new UnknownTypeException("Fayde.Media.Animation.RepeatBehavior");
    var BrushMappingMode = Fayde.Media.BrushMappingMode; if (!BrushMappingMode) throw new UnknownTypeException("Fayde.Media.BrushMappingMode");
    var GradientSpreadMethod = Fayde.Media.GradientSpreadMethod; if (!GradientSpreadMethod) throw new UnknownTypeException("Fayde.Media.GradientSpreadMethod");
    var TransformGroup = Fayde.Media.TransformGroup; if (!TransformGroup) throw new UnknownTypeException("Fayde.Media.TransformGroup");
    var SkewTransform = Fayde.Media.SkewTransform; if (!SkewTransform) throw new UnknownTypeException("Fayde.Media.SkewTransform");
    var RadioButton = Fayde.Controls.RadioButton; if (!RadioButton) throw new UnknownTypeException("Fayde.Controls.RadioButton");
    var Slider = Fayde.Controls.Slider; if (!Slider) throw new UnknownTypeException("Fayde.Controls.Slider");

    var json = {
        ParseType: ResourceDictionary,
        Children: [
        {
            Key: "HighlightDarkColor", Value: Color.FromHex("#FF119EDA")
        },
        {
            Key: "HighlightLightColor", Value: Color.FromHex("#FFB2E0F4")
        },
        {
            Key: "AccentColor", Value: Color.FromHex("#CC119EDA")
        },
        {
            Key: "AccentColor2", Value: Color.FromHex("#99119EDA")
        },
        {
            Key: "AccentColor3", Value: Color.FromHex("#66119EDA")
        },
        {
            Key: "AccentColor4", Value: Color.FromHex("#33119EDA")
        },
        {
            Key: "BlackColor", Value: Color.FromHex("#FF000000")
        },
        {
            Key: "WhiteColor", Value: Color.FromHex("#FFFFFFFF")
        },
        {
            Key: "Gray1", Value: Color.FromHex("#FFCCCCCC")
        },
        {
            Key: "Gray2", Value: Color.FromHex("#FF7F7F7F")
        },
        {
            Key: "Gray3", Value: Color.FromHex("#FF333333")
        },
        {
            Key: "Gray4", Value: Color.FromHex("#FFB9B9B9")
        },
        {
            Key: "Gray5", Value: Color.FromHex("#FFD8D8D9")
        },
        {
            Key: "Gray6", Value: Color.FromHex("#FF9D9D9D")
        },
        {
            Key: "Gray7", Value: Color.FromHex("#FFF7F7F7")
        },
        {
            Key: "Gray8", Value: Color.FromHex("#FFE0E0E0")
        },
        {
            Key: "Gray9", Value: Color.FromHex("#FFA59F93")
        },
        {
            Key: "Gray10", Value: Color.FromHex("#7FFFFFFF")
        },
        {
            Key: "Gray11", Value: Color.FromHex("#7FA9A9A9")
        },
        {
            Key: "Gray12", Value: Color.FromHex("#A5F7F7F7")
        },
        {
            Key: "Gray13", Value: Color.FromHex("#5EC9C9C9")
        },
        {
            Key: "TextBoxText", Value: Color.FromHex("#FF414141")
        },
        {
            Key: "NormalForegroundColor", Value: Color.FromHex("#FF000000")
        },
        {
            Key: "HoverForegroundColor", Value: Color.FromHex("#FFFFFFFF")
        },
        {
            Key: "BaseColor2", Value: Color.FromHex("#FFFFFFFF")
        },
        {
            Key: "BaseColor5", Value: Color.FromHex("#FFBABABA")
        },
        {
            Key: "BaseColor3", Value: Color.FromHex("#FF303030")
        },
        {
            Key: "TransparentWhiteColor", Value: Color.FromHex("#00FFFFFF")
        },
        {
            Key: "TransparentWhiteLightColor", Value: Color.FromHex("#19FFFFFF")
        },
        {
            Key: "TransparentLightestColor", Value: Color.FromHex("#34FFFFFF")
        },
        {
            Key: "TransparentLightLightColor", Value: Color.FromHex("#A5FFFFFF")
        },
        {
            Key: "TransparentLightColor", Value: Color.FromHex("#D8FFFFFF")
        },
        {
            Key: "TransparentBlackColor", Value: Color.FromHex("#00000000")
        },
        {
            Key: "TransparentDarkColor", Value: Color.FromHex("#3F000000")
        },
        {
            Key: "TransparentDarkDarkColor", Value: Color.FromHex("#59000000")
        },
        {
            Key: "TransparentDarkDarkDarkColor", Value: Color.FromHex("#99000000")
        },
        {
            Key: "TransparentDarkestColor", Value: Color.FromHex("#CC000000")
        },
        {
            Key: "ValidationColor1", Value: Color.FromHex("#052A2E31")
        },
        {
            Key: "ValidationColor2", Value: Color.FromHex("#152A2E31")
        },
        {
            Key: "ValidationColor3", Value: Color.FromHex("#252A2E31")
        },
        {
            Key: "ValidationColor4", Value: Color.FromHex("#352A2E31")
        },
        {
            Key: "ValidationColor5", Value: Color.FromHex("#FFDC000C")
        },
        {
            Key: "ValidationSummaryColor1", Value: Color.FromHex("#FFDC020D")
        },
        {
            Key: "ValidationSummaryColor2", Value: Color.FromHex("#FFCA000C")
        },
        {
            Key: "ValidationSummaryColor3", Value: Color.FromHex("#FFFF9298")
        },
        {
            Key: "ValidationSummaryColor4", Value: Color.FromHex("#FFFDC8C8")
        },
        {
            Key: "ValidationSummaryColor5", Value: Color.FromHex("#DDD43940")
        },
        {
            Key: "ValidationSummaryFillColor1", Value: Color.FromHex("#59F7D8DB")
        },
        {
            Key: "ValidationSummaryFillColor2", Value: Color.FromHex("#FFF7D8DB")
        },
        {
            Key: "ControlsValidationColor", Value: Color.FromHex("#FFDB000C")
        },
        {
            Key: "ProgressIndeterminateColor1", Value: Color.FromHex("#33878787")
        },
        {
            Key: "ProgressIndeterminateColor2", Value: Color.FromHex("#33959595")
        },
        {
            Key: "ProgressIndeterminateColor3", Value: Color.FromHex("#4C000000")
        },
        {
            Key: "ProgressIndeterminateColor4", Value: Color.FromHex("#4C000000")
        },
        {
            Key: "PageOverlayColor", Value: Color.FromHex("#7F000000")
        },
        {
            Key: "RatingStarsColor", Value: Color.FromHex("#F6FF9900")
        },
        {
            Key: "RatingMouseOverColor", Value: Color.FromHex("#F6FDFF70")
        },
        {
            Key: "TimeHintIconColor1", Value: Color.FromHex("#F6CAA709")
        },
        {
            Key: "TimeHintIconColor2", Value: Color.FromHex("#F3F7F34F")
        },
        {
            Key: "TimeHintIconColor3", Value: Color.FromHex("#E7CAA709")
        },
        {
            Key: "TimeHintIconColor4", Value: Color.FromHex("#E7967C07")
        },
        {
            Key: "TimeHintIconColor5", Value: Color.FromHex("#E7625106")
        },
        {
            Key: "TimeHintIconColor6", Value: Color.FromHex("#FB8F8873")
        },
        {
            Key: "TimeHintIconColor7", Value: Color.FromHex("#F6271A47")
        },
        {
            Key: "TimeHintIconColor8", Value: Color.FromHex("#E7271A47")
        },
        {
            Key: "TimeHintIconColor9", Value: Color.FromHex("#9A89782B")
        },
        {
            Key: "TimeHintIconColor10", Value: Color.FromHex("#4DEBD60F")
        },
        {
            Key: "TimeHintIconColor11", Value: Color.FromHex("#FBF6EC20")
        },
        {
            Key: "TimeHintIconColor12", Value: Color.FromHex("#FF1B1B54")
        },
        {
            Key: "TimeHintIconColor13", Value: Color.FromHex("#FF1C1C50")
        },
        {
            Key: "OKButtonIconColor1", Value: Color.FromHex("#FF67CA0A")
        },
        {
            Key: "OKButtonIconColor2", Value: Color.FromHex("#FF498C38")
        },
        {
            Key: "OKButtonIconColor3", Value: Color.FromHex("#FF29EE5B")
        },
        {
            Key: "CancelButtonIconColor1", Value: Color.FromHex("#FFEA7525")
        },
        {
            Key: "CancelButtonIconColor2", Value: Color.FromHex("#FFDA715B")
        },
        {
            Key: "CancelButtonIconColor3", Value: Color.FromHex("#FFB72909")
        },
        {
            Key: "ChartBrush1", Value: Color.FromHex("#FF0097FC")
        },
        {
            Key: "ChartBrush2", Value: Color.FromHex("#FF70BBED")
        },
        {
            Key: "ChartBrush3", Value: Color.FromHex("#FF70BBED")
        },
        {
            Key: "ChartBrush4", Value: Color.FromHex("#FF4556BA")
        },
        {
            Key: "ChartBrush5", Value: Color.FromHex("#FFC84BA4")
        },
        {
            Key: "ChartBrush6", Value: Color.FromHex("#FF477ABE")
        },
        {
            Key: "ChartBrush7", Value: Color.FromHex("#FF6644B7")
        },
        {
            Key: "ChartBrush8", Value: Color.FromHex("#FFA045BA")
        },
        {
            Key: "ChartBrush9", Value: Color.FromHex("#FF73C348")
        },
        {
            Key: "ChartBrush10", Value: Color.FromHex("#FFDD5279")
        },
        {
            Key: "ChartBrush11", Value: Color.FromHex("#FF4999C4")
        },
        {
            Key: "ChartBrush12", Value: Color.FromHex("#FFEC8B58")
        },
        {
            Key: "ChartBrush13", Value: Color.FromHex("#FFECA058")
        },
        {
            Key: "ChartBrush14", Value: Color.FromHex("#FFEC6558")
        },
        {
            Key: "ChartBrush15", Value: Color.FromHex("#FFEC8B58")
        },
        {
            Key: "ChartBrush16", Value: Color.FromHex("#FFECA058")
        },
        {
            Key: "ControlBackgroundBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("WhiteColor")
                }
            }
        },
        {
            Key: "WhiteBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("WhiteColor")
                }
            }
        },
        {
            Key: "BlackBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("BlackColor")
                }
            }
        },
        {
            Key: "TextBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("BlackColor")
                }
            }
        },
        {
            Key: "LabelTextBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("BlackColor")
                }
            }
        },
        {
            Key: "WhiteColorBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("WhiteColor")
                }
            }
        },
        {
            Key: "BlackColorBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("BlackColor")
                }
            }
        },
        {
            Key: "HighlightBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("HighlightDarkColor")
                }
            }
        },
        {
            Key: "HighlightLightBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("HighlightLightColor")
                }
            }
        },
        {
            Key: "NavigationBorderBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: Color.FromHex("#FF9D9492")
                }
            }
        },
        {
            Key: "NavigationForegroundBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("BlackColor")
                }
            }
        },
        {
            Key: "PageBorderBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: Color.FromHex("#FFB2B2B2")
                }
            }
        },
        {
            Key: "BodyTextColorBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: Color.FromHex("#FF313131")
                }
            }
        },
        {
            Key: "ControlsDisabledBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TransparentLightLightColor")
                }
            }
        },
        {
            Key: "ReadOnlyBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TransparentLightestColor")
                }
            }
        },
        {
            Key: "DisabledForegroundBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: Color.FromHex("#FFAAAAAA")
                }
            }
        },
        {
            Key: "DisabledControlBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: Color.FromHex("#FFAAAAAA")
                }
            }
        },
        {
            Key: "DisabledWhiteColorBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("WhiteColor")
                }
            }
        },
        {
            Key: "RatingStarsBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("RatingStarsColor")
                }
            }
        },
        {
            Key: "RatingMouseOverBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("RatingMouseOverColor")
                }
            }
        },
        {
            Key: "PageOverlayBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("PageOverlayColor")
                }
            }
        },
        {
            Key: "FuzzBrush1", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: Color.FromHex("#1E000000")
                }
            }
        },
        {
            Key: "FuzzBrush2", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: Color.FromHex("#14000000")
                }
            }
        },
        {
            Key: "FuzzBrush3", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: Color.FromHex("Black")
                }
            }
        },
        {
            Key: "TransparentWhiteBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TransparentWhiteColor")
                }
            }
        },
        {
            Key: "TransparentWhiteLightBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TransparentWhiteColor")
                }
            }
        },
        {
            Key: "TransparentLightestBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TransparentLightestColor")
                }
            }
        },
        {
            Key: "TransparentLightLightBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TransparentLightLightColor")
                }
            }
        },
        {
            Key: "TransparentBlackBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TransparentBlackColor")
                }
            }
        },
        {
            Key: "TransparentDarkBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TransparentDarkColor")
                }
            }
        },
        {
            Key: "TransparentDarkDarkDarkBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TransparentDarkDarkDarkColor")
                }
            }
        },
        {
            Key: "GrayBrush1", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray1")
                }
            }
        },
        {
            Key: "GrayBrush2", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray2")
                }
            }
        },
        {
            Key: "GrayBrush3", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray3")
                }
            }
        },
        {
            Key: "GrayBrush4", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray4")
                }
            }
        },
        {
            Key: "GrayBrush5", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray5")
                }
            }
        },
        {
            Key: "GrayBrush6", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray6")
                }
            }
        },
        {
            Key: "GrayBrush7", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray7")
                }
            }
        },
        {
            Key: "GrayBrush8", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray8")
                }
            }
        },
        {
            Key: "GrayBrush9", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray9")
                }
            }
        },
        {
            Key: "GrayBrush10", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray10")
                }
            }
        },
        {
            Key: "GrayBrush11", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray11")
                }
            }
        },
        {
            Key: "GrayBrush12", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray12")
                }
            }
        },
        {
            Key: "GrayBrush13", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray13")
                }
            }
        },
        {
            Key: "HoverHyperlinkForegroundBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("BlackColor")
                }
            }
        },
        {
            Key: "HoverHyperlinkBackgroundBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("WhiteColor")
                }
            }
        },
        {
            Key: "TextBoxBorderBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray1")
                }
            }
        },
        {
            Key: "ControlBorderBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray1")
                }
            }
        },
        {
            Key: "TextBoxMouseOverBorderBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("HighlightDarkColor")
                }
            }
        },
        {
            Key: "TextBoxMouseOverInnerBorderBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("HighlightLightColor")
                }
            }
        },
        {
            Key: "CheckBoxBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray2")
                }
            }
        },
        {
            Key: "CheckBoxMouseOverBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray3")
                }
            }
        },
        {
            Key: "CheckBoxBackgroundBrush", Value: {
                ParseType: LinearGradientBrush,
                Props: {
                    EndPoint: new Point(0.5, 1),
                    StartPoint: new Point(0.5, 0)
                },
                Children: [
                {
                    ParseType: GradientStop,
                    Props: {
                        Color: Color.FromHex("#FFE5E5E5"),
                        Offset: 0
                    }
                },
                {
                    ParseType: GradientStop,
                    Props: {
                        Color: new StaticResourceMarkup("WhiteColor"),
                        Offset: 1
                    }
                }]

            }
        },
        {
            Key: "ApplicationNameBrush", Value: {
                ParseType: LinearGradientBrush,
                Props: {
                    EndPoint: new Point(0.5, 1),
                    StartPoint: new Point(0.5, 0)
                },
                Children: [
                {
                    ParseType: GradientStop,
                    Props: {
                        Color: Color.FromHex("#FF14BBD2"),
                        Offset: 0
                    }
                },
                {
                    ParseType: GradientStop,
                    Props: {
                        Color: Color.FromHex("#FF013C6C"),
                        Offset: 1
                    }
                }]

            }
        },
        {
            Key: "ThumbBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray4")
                }
            }
        },
        {
            Key: "ItemSelectedBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray5")
                }
            }
        },
        {
            Key: "SliderTrackBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray6")
                }
            }
        },
        {
            Key: "NormalBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray7")
                }
            }
        },
        {
            Key: "ComboBoxPopupBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("Gray9")
                }
            }
        },
        {
            Key: "BrandingBrush", Value: {
                ParseType: LinearGradientBrush,
                Props: {
                    EndPoint: new Point(0.001, 0.5),
                    StartPoint: new Point(1.002, 0.5)
                },
                Children: [
                {
                    ParseType: GradientStop,
                    Props: {
                        Color: new StaticResourceMarkup("HighlightDarkColor"),
                        Offset: 0
                    }
                },
                {
                    ParseType: GradientStop,
                    Props: {
                        Color: Color.FromHex("#FF5FC316"),
                        Offset: 1
                    }
                }]

            }
        },
        {
            Key: "DropShadowBrush", Value: {
                ParseType: DropShadowEffect,
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
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("WhiteColor")
                }
            }
        },
        {
            Key: "SeperatorBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: Color.FromHex("#FFC4C4C5")
                }
            }
        },
        {
            Key: "ControlsValidationBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ControlsValidationColor")
                }
            }
        },
        {
            Key: "ValidationBrush1", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationColor1")
                }
            }
        },
        {
            Key: "ValidationBrush2", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationColor2")
                }
            }
        },
        {
            Key: "ValidationBrush3", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationColor3")
                }
            }
        },
        {
            Key: "ValidationBrush4", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationColor4")
                }
            }
        },
        {
            Key: "ValidationBrush5", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationColor5")
                }
            }
        },
        {
            Key: "ValidationSummaryBrush1", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationSummaryColor1")
                }
            }
        },
        {
            Key: "ValidationSummaryBrush2", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationSummaryColor2")
                }
            }
        },
        {
            Key: "ValidationSummaryBrush3", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationSummaryColor3")
                }
            }
        },
        {
            Key: "ValidationSummaryBrush4", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationSummaryColor4")
                }
            }
        },
        {
            Key: "ValidationSummaryBrush5", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationSummaryColor5")
                }
            }
        },
        {
            Key: "ValidationSummaryFillBrush1", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationSummaryFillColor1")
                }
            }
        },
        {
            Key: "ValidationSummaryFillBrush2", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("ValidationSummaryFillColor2")
                }
            }
        },
        {
            Key: "ValidationSummaryDisabledBrush", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TransparentLightLightColor")
                }
            }
        },
        {
            Key: "TimeHintIconBrush1", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor1")
                }
            }
        },
        {
            Key: "TimeHintIconBrush2", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor2")
                }
            }
        },
        {
            Key: "TimeHintIconBrush3", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor3")
                }
            }
        },
        {
            Key: "TimeHintIconBrush4", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor4")
                }
            }
        },
        {
            Key: "TimeHintIconBrush5", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor5")
                }
            }
        },
        {
            Key: "TimeHintIconBrush6", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor6")
                }
            }
        },
        {
            Key: "TimeHintIconBrush7", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor7")
                }
            }
        },
        {
            Key: "TimeHintIconBrush8", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor8")
                }
            }
        },
        {
            Key: "TimeHintIconBrush9", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor9")
                }
            }
        },
        {
            Key: "TimeHintIconBrush10", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor10")
                }
            }
        },
        {
            Key: "TimeHintIconBrush11", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor11")
                }
            }
        },
        {
            Key: "TimeHintIconBrush12", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor12")
                }
            }
        },
        {
            Key: "TimeHintIconBrush13", Value: {
                ParseType: SolidColorBrush,
                Props: {
                    Color: new StaticResourceMarkup("TimeHintIconColor13")
                }
            }
        },
        {
            Key: "HeaderFontFamily", Value: {
                ParseType: FontFamily,
                Props: {
                    FamilyNames: "Segoe UI Light, Lucida Sans Unicode, Verdana"
                }
            }
        },
        {
            Key: "ContentFontFamily", Value: {
                ParseType: FontFamily,
                Props: {
                    FamilyNames: "Segoe UI, Lucida Sans Unicode, Verdana"
                }
            }
        },
        {
            Key: "ApplicationNameFontSize", Value: {
                ParseType: Number,
                Key: "ApplicationNameFontSize",
                Value: 50
            }
        },
        {
            Key: "HeaderFontSize", Value: {
                ParseType: Number,
                Key: "HeaderFontSize",
                Value: 21.333
            }
        },
        {
            Key: "NavigationFontSize", Value: {
                ParseType: Number,
                Key: "NavigationFontSize",
                Value: 28
            }
        },
        {
            Key: "ContentFontSize", Value: {
                ParseType: Number,
                Key: "ContentFontSize",
                Value: 14
            }
        },
        {
            Key: "HyperlinkFontSize", Value: {
                ParseType: Number,
                Key: "HyperlinkFontSize",
                Value: 14
            }
        },
        {
            Key: "LabelFontSize", Value: {
                ParseType: Number,
                Key: "LabelFontSize",
                Value: 12
            }
        },
        {
            Key: "ControlTitleFontSize", Value: {
                ParseType: Number,
                Key: "ControlTitleFontSize",
                Value: 16
            }
        },
        {
            Key: "ControlTitleBigFontSize", Value: {
                ParseType: Number,
                Key: "ControlTitleBigFontSize",
                Value: 18
            }
        },
        {
            Key: "ControlContentFontSize", Value: {
                ParseType: Number,
                Key: "ControlContentFontSize",
                Value: 10
            }
        },
        {
            Key: "SearchButtonStyle", Value: {
                ParseType: Style,
                Props: {
                    TargetType: HyperlinkButton
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "Margin"),
                        Value: "-22,0,20,0"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "ContentTemplate"),
                        Value: new DataTemplate({
                            ParseType: Grid,
                            Props: {
                                Width: 14,
                                Height: 16,
                                HorizontalAlignment: HorizontalAlignment.Center,
                                VerticalAlignment: VerticalAlignment.Center,
                                Margin: new Thickness(3, 2, 0, 0)
                            },
                            Children: [
                            {
                                ParseType: Rectangle,
                                Props: {
                                    Fill: {
                                        ParseType: SolidColorBrush,
                                        Props: {
                                            Color: Color.FromHex("#FF767676")
                                        }
                                    },
                                    HorizontalAlignment: HorizontalAlignment.Right,
                                    Height: 8,
                                    Margin: new Thickness(0, 0, -0.164, -0.334),
                                    RadiusY: 0.5,
                                    RadiusX: 0.5,
                                    RenderTransformOrigin: new Point(0.5, 0.5),
                                    Stroke: {
                                        ParseType: SolidColorBrush,
                                        Props: {
                                            Color: Color.FromHex("#FF767676")
                                        }
                                    },
                                    UseLayoutRounding: false,
                                    VerticalAlignment: VerticalAlignment.Bottom,
                                    Width: 4,
                                    RenderTransform: {
                                        ParseType: RotateTransform,
                                        Props: {
                                            Angle: -45
                                        }
                                    }
                                }
                            },
                            {
                                ParseType: Ellipse,
                                Props: {
                                    Fill: {
                                        ParseType: SolidColorBrush,
                                        Props: {
                                            Color: Color.FromHex("#00FFFFFF")
                                        }
                                    },
                                    Margin: new Thickness(0, 0, 1, 3),
                                    Stroke: {
                                        ParseType: SolidColorBrush,
                                        Props: {
                                            Color: Color.FromHex("#FF767676")
                                        }
                                    }
                                }
                            }]

                        })
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "Template"),
                        Value: new ControlTemplate(HyperlinkButton, {
                            ParseType: Grid,
                            Name: "grid",
                            Props: {
                                Cursor: new TemplateBindingMarkup("Cursor"),
                                Margin: new Thickness(-6, 0, 0, -4),
                                Background: {
                                    ParseType: SolidColorBrush,
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
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                ParseType: ColorAnimation,
                                                Props: {
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                        ParseType: VisualState,
                                        Name: "Pressed",
                                        Content: {
                                            ParseType: Storyboard,
                                            Children: [
                                            {
                                                ParseType: ColorAnimation,
                                                Props: {
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                        Name: "Focused"
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
                                    HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                    Margin: new TemplateBindingMarkup("Padding"),
                                    Text: new TemplateBindingMarkup("Content"),
                                    TextDecorations: Fayde.TextDecorations.Underline,
                                    Visibility: Visibility.Collapsed,
                                    VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment"),
                                    Foreground: {
                                        ParseType: SolidColorBrush,
                                        Props: {
                                            Color: new StaticResourceMarkup("HighlightDarkColor")
                                        }
                                    }
                                }
                            },
                            {
                                ParseType: TextBlock,
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
                                ParseType: ContentControl,
                                Props: {
                                    Foreground: {
                                        ParseType: SolidColorBrush,
                                        Name: "ContentPresenterWrapperColor",
                                        Props: {
                                            Color: new StaticResourceMarkup("HighlightDarkColor")
                                        }
                                    }
                                },
                                Content: {
                                    ParseType: ContentPresenter,
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
                                ParseType: Rectangle,
                                Name: "FocusVisualElement",
                                Props: {
                                    IsHitTestVisible: false,
                                    Opacity: 0,
                                    StrokeThickness: 1,
                                    Stroke: {
                                        ParseType: SolidColorBrush,
                                        Props: {
                                            Color: new StaticResourceMarkup("HighlightLightColor")
                                        }
                                    }
                                }
                            }]

                        })
                    }
                }]

            }
        },
        {
            Key: "ControlLabelStyle", Value: {
                ParseType: Style,
                Props: {
                    TargetType: TextBlock
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBlock, "Foreground"),
                        Value: new StaticResourceMarkup("LabelTextBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBlock, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBlock, "FontSize"),
                        Value: new StaticResourceMarkup("LabelFontSize")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextOptions, "TextHintingMode"),
                        Value: "Animated"
                    }
                }]

            }
        },
        {
            Key: "ValidationToolTipTemplate", Value: new ControlTemplate(ToolTip, {
                ParseType: Grid,
                Name: "Root",
                Props: {
                    Margin: new Thickness(5, 0, 5, 0),
                    Opacity: 0,
                    RenderTransformOrigin: new Point(0, 0),
                    RenderTransform: {
                        ParseType: TranslateTransform,
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
                        ParseType: VisualStateGroup,
                        Name: "OpenStates",
                        Props: {
                            Transitions: [
                            {
                                ParseType: VisualTransition,
                                Props: {
                                    GeneratedDuration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                }
                            },
                            {
                                ParseType: VisualTransition,
                                Props: {
                                    GeneratedDuration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 200)),
                                    To: "Open"
                                },
                                Content: {
                                    ParseType: Storyboard,
                                    Children: [
                                    {
                                        ParseType: DoubleAnimationUsingKeyFrames,
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
                                            ParseType: SplineDoubleKeyFrame,
                                            Props: {
                                                KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 200)),
                                                Value: 0
                                            }
                                        }]

                                    },
                                    {
                                        ParseType: DoubleAnimationUsingKeyFrames,
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
                                            ParseType: SplineDoubleKeyFrame,
                                            Props: {
                                                KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 200)),
                                                Value: 1
                                            }
                                        }]

                                    }]

                                }
                            }]

                        },
                        Children: [
                        {
                            ParseType: VisualState,
                            Name: "Closed",
                            Content: {
                                ParseType: Storyboard,
                                Children: [
                                {
                                    ParseType: DoubleAnimationUsingKeyFrames,
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
                                        ParseType: SplineDoubleKeyFrame,
                                        Props: {
                                            KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                            Value: 0
                                        }
                                    }]

                                }]

                            }
                        },
                        {
                            ParseType: VisualState,
                            Name: "Open",
                            Content: {
                                ParseType: Storyboard,
                                Children: [
                                {
                                    ParseType: DoubleAnimationUsingKeyFrames,
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
                                        ParseType: SplineDoubleKeyFrame,
                                        Props: {
                                            KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                            Value: 0
                                        }
                                    }]

                                },
                                {
                                    ParseType: DoubleAnimationUsingKeyFrames,
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
                                        ParseType: SplineDoubleKeyFrame,
                                        Props: {
                                            KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                    ParseType: Border,
                    Props: {
                        Background: new StaticResourceMarkup("ValidationBrush1"),
                        CornerRadius: new CornerRadius(5, 5, 5, 5),
                        Margin: new Thickness(4, 4, -4, -4)
                    }
                },
                {
                    ParseType: Border,
                    Props: {
                        Background: new StaticResourceMarkup("ValidationBrush2"),
                        CornerRadius: new CornerRadius(4, 4, 4, 4),
                        Margin: new Thickness(3, 3, -3, -3)
                    }
                },
                {
                    ParseType: Border,
                    Props: {
                        Background: new StaticResourceMarkup("ValidationBrush3"),
                        CornerRadius: new CornerRadius(3, 3, 3, 3),
                        Margin: new Thickness(2, 2, -2, -2)
                    }
                },
                {
                    ParseType: Border,
                    Props: {
                        Background: new StaticResourceMarkup("ValidationBrush4"),
                        CornerRadius: new CornerRadius(2, 2, 2, 2),
                        Margin: new Thickness(1, 1, -1, -1)
                    }
                },
                {
                    ParseType: Border,
                    Props: {
                        Background: new StaticResourceMarkup("ValidationBrush5"),
                        CornerRadius: new CornerRadius(2, 2, 2, 2)
                    }
                },
                {
                    ParseType: Border,
                    Props: {
                        CornerRadius: new CornerRadius(2, 2, 2, 2)
                    },
                    Content: {
                        ParseType: TextBlock,
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

            })
        },
        {
            Key: "CommonValidationToolTipTemplate", Value: new ControlTemplate(ToolTip, {
                ParseType: Grid,
                Name: "Root",
                Props: {
                    Margin: new Thickness(5, 0, 5, 0),
                    Opacity: 0,
                    RenderTransformOrigin: new Point(0, 0),
                    RenderTransform: {
                        ParseType: TranslateTransform,
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
                        ParseType: VisualStateGroup,
                        Name: "OpenStates",
                        Props: {
                            Transitions: [
                            {
                                ParseType: VisualTransition,
                                Props: {
                                    GeneratedDuration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
                                }
                            },
                            {
                                ParseType: VisualTransition,
                                Props: {
                                    GeneratedDuration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 200)),
                                    To: "Open"
                                },
                                Content: {
                                    ParseType: Storyboard,
                                    Children: [
                                    {
                                        ParseType: DoubleAnimation,
                                        Props: {
                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 200)),
                                            To: 0,
                                            EasingFunction: {
                                                ParseType: BackEase,
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
                                        ParseType: DoubleAnimation,
                                        Props: {
                                            Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 200)),
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
                            ParseType: VisualState,
                            Name: "Closed",
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
                            ParseType: VisualState,
                            Name: "Open",
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
                                    ParseType: DoubleAnimation,
                                    Props: {
                                        Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                    ParseType: Border,
                    Props: {
                        Margin: new Thickness(4, 4, -4, -4),
                        Background: new StaticResourceMarkup("ValidationBrush1"),
                        CornerRadius: new CornerRadius(5, 5, 5, 5)
                    }
                },
                {
                    ParseType: Border,
                    Props: {
                        Margin: new Thickness(3, 3, -3, -3),
                        Background: new StaticResourceMarkup("ValidationBrush2"),
                        CornerRadius: new CornerRadius(4, 4, 4, 4)
                    }
                },
                {
                    ParseType: Border,
                    Props: {
                        Margin: new Thickness(2, 2, -2, -2),
                        Background: new StaticResourceMarkup("ValidationBrush3"),
                        CornerRadius: new CornerRadius(3, 3, 3, 3)
                    }
                },
                {
                    ParseType: Border,
                    Props: {
                        Margin: new Thickness(1, 1, -1, -1),
                        Background: new StaticResourceMarkup("ValidationBrush4"),
                        CornerRadius: new CornerRadius(2, 2, 2, 2)
                    }
                },
                {
                    ParseType: Border,
                    Props: {
                        Background: new StaticResourceMarkup("ValidationBrush5"),
                        CornerRadius: new CornerRadius(2, 2, 2, 2)
                    },
                    Content: {
                        ParseType: TextBlock,
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

            })
        },
        {
            Key: "DefaultButtonStyle", Value: {
                ParseType: Style,
                Props: {
                    TargetType: Button
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Button, "Background"),
                        Value: new StaticResourceMarkup("GrayBrush7")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Button, "BorderBrush"),
                        Value: new StaticResourceMarkup("TextBoxBorderBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Button, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Button, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Button, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextOptions, "TextHintingMode"),
                        Value: "Animated"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Button, "FontWeight"),
                        Value: "SemiBold"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Button, "Padding"),
                        Value: "5,6"
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
                        Property: DependencyProperty.GetDependencyProperty(Button, "Template"),
                        Value: new ControlTemplate(Button, {
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
                                                    To: 1,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                        ParseType: VisualState,
                                        Name: "Pressed",
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
                                        ParseType: VisualState,
                                        Name: "Disabled",
                                        Content: {
                                            ParseType: Storyboard,
                                            Children: [
                                            {
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    To: 0.7,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    To: 0.3,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    To: 1,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                    BorderBrush: new TemplateBindingMarkup("BorderBrush"),
                                    BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                    Background: new TemplateBindingMarkup("Background"),
                                    CornerRadius: new CornerRadius(3, 3, 3, 3)
                                }
                            },
                            {
                                ParseType: Rectangle,
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
                                ParseType: Border,
                                Name: "MouseOverBorder",
                                Props: {
                                    Background: new StaticResourceMarkup("GrayBrush8"),
                                    BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                    CornerRadius: new CornerRadius(3.5, 3.5, 3.5, 3.5),
                                    Opacity: 0
                                }
                            },
                            {
                                ParseType: Border,
                                Name: "PressedBorder",
                                Props: {
                                    Background: new StaticResourceMarkup("GrayBrush5"),
                                    BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                    CornerRadius: new CornerRadius(3.5, 3.5, 3.5, 3.5),
                                    Opacity: 0
                                }
                            },
                            {
                                ParseType: Rectangle,
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
                                ParseType: Rectangle,
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
                                ParseType: ContentPresenter,
                                Name: "contentPresenter",
                                Props: {
                                    ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
                                    HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                    Margin: new TemplateBindingMarkup("Padding"),
                                    VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment")
                                },
                                Content: new TemplateBindingMarkup("Content")
                            }]

                        })
                    }
                }]

            }
        },
        {
            Key: "DefaultHyperlinkButtonStyle", Value: {
                ParseType: Style,
                Props: {
                    TargetType: HyperlinkButton
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "Foreground"),
                        Value: new StaticResourceMarkup("HighlightBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(HyperlinkButton, "FontSize"),
                        Value: new StaticResourceMarkup("HyperlinkFontSize")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextOptions, "TextHintingMode"),
                        Value: "Animated"
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
                        Value: new ControlTemplate(HyperlinkButton, {
                            ParseType: Grid,
                            Props: {
                                Background: new TemplateBindingMarkup("Background"),
                                Cursor: new TemplateBindingMarkup("Cursor")
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
                                                    ParseType: DiscreteObjectKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: Visibility.Visible
                                                    }
                                                }]

                                            },
                                            {
                                                ParseType: ColorAnimation,
                                                Props: {
                                                    To: new StaticResourceMarkup("HighlightLightColor"),
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                                    To: 1,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                    HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                    Margin: new TemplateBindingMarkup("Padding"),
                                    Text: new TemplateBindingMarkup("Content"),
                                    TextDecorations: Fayde.TextDecorations.Underline,
                                    Visibility: Visibility.Collapsed,
                                    VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment"),
                                    Foreground: {
                                        ParseType: SolidColorBrush,
                                        Props: {
                                            Color: new StaticResourceMarkup("HighlightDarkColor")
                                        }
                                    }
                                }
                            },
                            {
                                ParseType: TextBlock,
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
                                ParseType: ContentControl,
                                Props: {
                                    Foreground: {
                                        ParseType: SolidColorBrush,
                                        Name: "ContentPresenterWrapperColor",
                                        Props: {
                                            Color: new StaticResourceMarkup("HighlightDarkColor")
                                        }
                                    }
                                },
                                Content: {
                                    ParseType: ContentPresenter,
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
                                ParseType: Rectangle,
                                Name: "FocusVisualElement",
                                Props: {
                                    IsHitTestVisible: false,
                                    Opacity: 0,
                                    StrokeThickness: 1,
                                    Stroke: {
                                        ParseType: SolidColorBrush,
                                        Props: {
                                            Color: new StaticResourceMarkup("HighlightLightColor")
                                        }
                                    }
                                }
                            }]

                        })
                    }
                }]

            }
        },
        {
            Key: "DefaultTextBoxStyle", Value: {
                ParseType: Style,
                Props: {
                    TargetType: TextBox
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBox, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBox, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextOptions, "TextHintingMode"),
                        Value: "Animated"
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
                        Property: DependencyProperty.GetDependencyProperty(TextBox, "MinHeight"),
                        Value: "26"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBox, "Background"),
                        Value: new StaticResourceMarkup("ControlBackgroundBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBox, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBox, "Padding"),
                        Value: "0"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBox, "BorderBrush"),
                        Value: new StaticResourceMarkup("TextBoxBorderBrush")
                    }
                },
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
                        Property: DependencyProperty.GetDependencyProperty(TextBox, "Template"),
                        Value: new ControlTemplate(TextBox, {
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
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                        ParseType: VisualState,
                                        Name: "Unfocused",
                                        Content: {
                                            ParseType: Storyboard
                                        }
                                    }]

                                },
                                {
                                    ParseType: VisualStateGroup,
                                    Name: "ValidationStates",
                                    Children: [
                                    {
                                        ParseType: VisualState,
                                        Name: "Valid"
                                    },
                                    {
                                        ParseType: VisualState,
                                        Name: "InvalidUnfocused",
                                        Content: {
                                            ParseType: Storyboard,
                                            Children: [
                                            {
                                                ParseType: ObjectAnimationUsingKeyFrames,
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
                                        Name: "InvalidFocused",
                                        Content: {
                                            ParseType: Storyboard,
                                            Children: [
                                            {
                                                ParseType: ObjectAnimationUsingKeyFrames,
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
                                                    ParseType: DiscreteObjectKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: Visibility.Visible
                                                    }
                                                }]

                                            },
                                            {
                                                ParseType: ObjectAnimationUsingKeyFrames,
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
                                                    ParseType: DiscreteObjectKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: {
                                                            ParseType: Boolean,
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
                                ParseType: Rectangle,
                                Name: "Base",
                                Props: {
                                    Stroke: new TemplateBindingMarkup("BorderBrush"),
                                    StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                    Opacity: 1,
                                    Fill: new StaticResourceMarkup("ControlBackgroundBrush")
                                }
                            },
                            {
                                ParseType: Rectangle,
                                Name: "FocusRectangle",
                                Props: {
                                    StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                    Opacity: 0,
                                    Stroke: new StaticResourceMarkup("TextBoxMouseOverBorderBrush")
                                }
                            },
                            {
                                ParseType: Rectangle,
                                Name: "FocusInnerRectangle",
                                Props: {
                                    StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                    Opacity: 0,
                                    Margin: new Thickness(1, 1, 1, 1),
                                    Stroke: new StaticResourceMarkup("TextBoxMouseOverInnerBorderBrush")
                                }
                            },
                            {
                                ParseType: Grid,
                                Props: {
                                    Margin: new Thickness(0, 1, 0, 0)
                                },
                                Children: [
                                {
                                    ParseType: Border,
                                    Name: "ReadOnlyVisualElement",
                                    Props: {
                                        Background: new StaticResourceMarkup("ReadOnlyBrush"),
                                        Opacity: 0
                                    }
                                },
                                {
                                    ParseType: Grid,
                                    Children: [
                                    {
                                        ParseType: ScrollViewer,
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
                                ParseType: Rectangle,
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
                                ParseType: Border,
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
                                        ParseType: ToolTip,
                                        Name: "validationTooltip",
                                        Props: {
                                            DataContext: new BindingMarkup({}),
                                            Placement: PlacementMode.Right,
                                            PlacementTarget: new BindingMarkup({}),
                                            Template: new StaticResourceMarkup("ValidationToolTipTemplate"),
                                            Triggers: [
                                            {
                                                ParseType: EventTrigger,
                                                Props: {
                                                    RoutedEvent: "Canvas.Loaded"
                                                },
                                                Children: [
                                                {
                                                    ParseType: BeginStoryboard,
                                                    Content: {
                                                        ParseType: Storyboard,
                                                        Children: [
                                                        {
                                                            ParseType: ObjectAnimationUsingKeyFrames,
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
                                                                ParseType: DiscreteObjectKeyFrame,
                                                                Props: {
                                                                    KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                                    Value: {
                                                                        ParseType: Boolean,
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
                                    ParseType: Grid,
                                    Props: {
                                        Background: {
                                            ParseType: SolidColorBrush,
                                            Props: {
                                                Color: Color.FromHex("#00FFFFFF")
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
                                        ParseType: Path,
                                        Props: {
                                            Data: "M 1,0 L6,0 A 2,2 90 0 1 8,2 L8,7 z",
                                            Fill: new StaticResourceMarkup("ValidationBrush5"),
                                            Margin: new Thickness(1, 3, 0, 0)
                                        }
                                    },
                                    {
                                        ParseType: Path,
                                        Props: {
                                            Data: "M 0,0 L2,0 L 8,6 L8,8",
                                            Fill: new StaticResourceMarkup("WhiteColorBrush"),
                                            Margin: new Thickness(1, 3, 0, 0)
                                        }
                                    }]

                                }
                            }]

                        })
                    }
                }]

            }
        },
        {
            Key: "DefaultComboBoxStyle", Value: {
                ParseType: Style,
                Props: {
                    TargetType: ComboBox
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBox, "Padding"),
                        Value: "6,4,25,4"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBox, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBox, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBox, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextOptions, "TextHintingMode"),
                        Value: "Animated"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBox, "Background"),
                        Value: {
                            ParseType: SolidColorBrush,
                            Props: {
                                Color: new StaticResourceMarkup("Gray7")
                            }
                        }
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
                        Value: new StaticResourceMarkup("TextBoxBorderBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBox, "Template"),
                        Value: new ControlTemplate(ComboBox, {
                            ParseType: Grid,
                            Props: {
                                Resources: {
                                    ParseType: ResourceDictionary,
                                    Children: [
                                    {
                                        Key: "comboToggleStyle", Value: {
                                            ParseType: Style,
                                            Props: {
                                                TargetType: ToggleButton
                                            },
                                            Children: [
                                            {
                                                ParseType: Setter,
                                                Props: {
                                                    Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Foreground"),
                                                    Value: new StaticResourceMarkup("TextBrush")
                                                }
                                            },
                                            {
                                                ParseType: Setter,
                                                Props: {
                                                    Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Background"),
                                                    Value: new StaticResourceMarkup("GrayBrush7")
                                                }
                                            },
                                            {
                                                ParseType: Setter,
                                                Props: {
                                                    Property: DependencyProperty.GetDependencyProperty(ToggleButton, "BorderBrush"),
                                                    Value: new StaticResourceMarkup("TextBoxBorderBrush")
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
                                                    Value: new ControlTemplate(ToggleButton, {
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
                                                                                To: 1,
                                                                                Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                                                    ParseType: VisualState,
                                                                    Name: "Pressed",
                                                                    Content: {
                                                                        ParseType: Storyboard,
                                                                        Children: [
                                                                        {
                                                                            ParseType: DoubleAnimation,
                                                                            Props: {
                                                                                To: 1,
                                                                                Duration: Duration.CreateTimeSpan(TimeSpan.FromTicks(1))
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
                                                                            ParseType: DoubleAnimationUsingKeyFrames,
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
                                                                                ParseType: EasingDoubleKeyFrame,
                                                                                Props: {
                                                                                    KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100)),
                                                                                    Value: 1
                                                                                }
                                                                            }]

                                                                        },
                                                                        {
                                                                            ParseType: DoubleAnimationUsingKeyFrames,
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
                                                                                ParseType: EasingDoubleKeyFrame,
                                                                                Props: {
                                                                                    KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100)),
                                                                                    Value: 1
                                                                                }
                                                                            }]

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
                                                                                To: 1,
                                                                                Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                                                            ParseType: DoubleAnimation,
                                                                            Props: {
                                                                                To: 1,
                                                                                Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                                                BorderBrush: new TemplateBindingMarkup("BorderBrush"),
                                                                BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                                                Background: new TemplateBindingMarkup("Background"),
                                                                CornerRadius: new CornerRadius(3, 3, 3, 3)
                                                            }
                                                        },
                                                        {
                                                            ParseType: Rectangle,
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
                                                            ParseType: Border,
                                                            Name: "MouseOverBorder",
                                                            Props: {
                                                                Background: new StaticResourceMarkup("GrayBrush8"),
                                                                BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                                                CornerRadius: new CornerRadius(3.5, 3.5, 3.5, 3.5),
                                                                Opacity: 0
                                                            }
                                                        },
                                                        {
                                                            ParseType: Border,
                                                            Name: "PressedBorder",
                                                            Props: {
                                                                Background: new StaticResourceMarkup("GrayBrush5"),
                                                                BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                                                CornerRadius: new CornerRadius(3.5, 3.5, 3.5, 3.5),
                                                                Opacity: 0
                                                            }
                                                        },
                                                        {
                                                            ParseType: Rectangle,
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
                                                            ParseType: Rectangle,
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
                                                            ParseType: Rectangle,
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
                                                            ParseType: Rectangle,
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
                                                            ParseType: ContentPresenter,
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
                                                            ParseType: Rectangle,
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

                                                    })
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
                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                    ParseType: SplineDoubleKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: 0.45
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
                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                    ParseType: EasingDoubleKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: 1
                                                    }
                                                }]

                                            },
                                            {
                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                    ParseType: EasingDoubleKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: 1
                                                    }
                                                }]

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
                                    Name: "ValidationStates",
                                    Children: [
                                    {
                                        ParseType: VisualState,
                                        Name: "Valid"
                                    },
                                    {
                                        ParseType: VisualState,
                                        Name: "InvalidUnfocused",
                                        Content: {
                                            ParseType: Storyboard,
                                            Children: [
                                            {
                                                ParseType: ObjectAnimationUsingKeyFrames,
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
                                        Name: "InvalidFocused",
                                        Content: {
                                            ParseType: Storyboard,
                                            Children: [
                                            {
                                                ParseType: ObjectAnimationUsingKeyFrames,
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
                                                    ParseType: DiscreteObjectKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: Visibility.Visible
                                                    }
                                                }]

                                            },
                                            {
                                                ParseType: ObjectAnimationUsingKeyFrames,
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
                                                    ParseType: DiscreteObjectKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: {
                                                            ParseType: Boolean,
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
                                ParseType: Border,
                                Name: "ContentPresenterBorder",
                                Content: {
                                    ParseType: Grid,
                                    Children: [
                                    {
                                        ParseType: ToggleButton,
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
                                            ParseType: Path,
                                            Name: "BtnArrow",
                                            Props: {
                                                Data: "F1 M 301.14,-189.041L 311.57,-189.041L 306.355,-182.942L 301.14,-189.041 Z",
                                                HorizontalAlignment: HorizontalAlignment.Right,
                                                Height: 4,
                                                Margin: new Thickness(0, 0, 6, 0),
                                                Stretch: Stretch.Uniform,
                                                Width: 8,
                                                Fill: {
                                                    ParseType: SolidColorBrush,
                                                    Name: "BtnArrowColor",
                                                    Props: {
                                                        Color: new StaticResourceMarkup("Gray3")
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    {
                                        ParseType: ContentPresenter,
                                        Name: "ContentPresenter",
                                        Props: {
                                            HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                            Margin: new TemplateBindingMarkup("Padding"),
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
                                ParseType: Rectangle,
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
                                ParseType: Rectangle,
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
                                ParseType: Border,
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
                                        ParseType: ToolTip,
                                        Name: "validationTooltip",
                                        Props: {
                                            DataContext: new BindingMarkup({}),
                                            Placement: PlacementMode.Right,
                                            PlacementTarget: new BindingMarkup({}),
                                            Template: new StaticResourceMarkup("ValidationToolTipTemplate"),
                                            Triggers: [
                                            {
                                                ParseType: EventTrigger,
                                                Props: {
                                                    RoutedEvent: "Canvas.Loaded"
                                                },
                                                Children: [
                                                {
                                                    ParseType: BeginStoryboard,
                                                    Content: {
                                                        ParseType: Storyboard,
                                                        Children: [
                                                        {
                                                            ParseType: ObjectAnimationUsingKeyFrames,
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
                                                                ParseType: DiscreteObjectKeyFrame,
                                                                Props: {
                                                                    KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                                    Value: {
                                                                        ParseType: Boolean,
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
                                    ParseType: Grid,
                                    Props: {
                                        Background: {
                                            ParseType: SolidColorBrush,
                                            Props: {
                                                Color: Color.FromHex("#00FFFFFF")
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
                                        ParseType: Path,
                                        Props: {
                                            Data: "M 1,0 L6,0 A 2,2 90 0 1 8,2 L8,7 z",
                                            Fill: new StaticResourceMarkup("ValidationBrush5"),
                                            Margin: new Thickness(1, 3, 0, 0)
                                        }
                                    },
                                    {
                                        ParseType: Path,
                                        Props: {
                                            Data: "M 0,0 L2,0 L 8,6 L8,8",
                                            Fill: new StaticResourceMarkup("WhiteColorBrush"),
                                            Margin: new Thickness(1, 3, 0, 0)
                                        }
                                    }]

                                }
                            },
                            {
                                ParseType: Popup,
                                Name: "Popup",
                                Content: {
                                    ParseType: Border,
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

                        })
                    }
                }]

            }
        },
        {
            Key: "DefaultComboBoxItemStyle", Value: {
                ParseType: Style,
                Props: {
                    TargetType: ComboBoxItem
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBoxItem, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBoxItem, "Padding"),
                        Value: "3"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBoxItem, "HorizontalContentAlignment"),
                        Value: "Left"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBoxItem, "VerticalContentAlignment"),
                        Value: "Top"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBoxItem, "Background"),
                        Value: new StaticResourceMarkup("TransparentWhiteBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBoxItem, "BorderThickness"),
                        Value: "1"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBoxItem, "TabNavigation"),
                        Value: "Local"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ComboBoxItem, "Template"),
                        Value: new ControlTemplate(ComboBoxItem, {
                            ParseType: Grid,
                            Props: {
                                Background: new TemplateBindingMarkup("Background"),
                                Margin: new Thickness(0, 0.5, 0, 0.5)
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
                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                    ParseType: EasingDoubleKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100)),
                                                        Value: 0.65
                                                    }
                                                }]

                                            },
                                            {
                                                ParseType: ColorAnimationUsingKeyFrames,
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
                                                    ParseType: EasingColorKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: new StaticResourceMarkup("HoverForegroundColor")
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
                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                    ParseType: SplineDoubleKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: 0.55
                                                    }
                                                }]

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
                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                    ParseType: EasingDoubleKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100)),
                                                        Value: 1
                                                    }
                                                }]

                                            },
                                            {
                                                ParseType: ColorAnimationUsingKeyFrames,
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
                                                    ParseType: EasingColorKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: new StaticResourceMarkup("HoverForegroundColor")
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
                                            ParseType: Storyboard
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
                                Name: "SelectedRectangle",
                                Props: {
                                    IsHitTestVisible: false,
                                    Opacity: 0,
                                    Fill: new StaticResourceMarkup("HighlightBrush")
                                }
                            },
                            {
                                ParseType: Rectangle,
                                Name: "MouseOverRectangle",
                                Props: {
                                    IsHitTestVisible: false,
                                    Opacity: 0,
                                    Fill: new StaticResourceMarkup("HighlightBrush")
                                }
                            },
                            {
                                ParseType: ContentControl,
                                Props: {
                                    Foreground: {
                                        ParseType: SolidColorBrush,
                                        Name: "ContentPresenterWrapperColor",
                                        Props: {
                                            Color: new StaticResourceMarkup("NormalForegroundColor")
                                        }
                                    }
                                },
                                Content: {
                                    ParseType: ContentPresenter,
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
                                ParseType: Rectangle,
                                Name: "FocusVisualElement",
                                Props: {
                                    RadiusY: 1,
                                    RadiusX: 1,
                                    Stroke: new StaticResourceMarkup("HighlightBrush"),
                                    StrokeThickness: 1,
                                    Visibility: Visibility.Collapsed
                                }
                            }]

                        })
                    }
                }]

            }
        },
        {
            Key: "DefaultTextBlockStyle", Value: {
                ParseType: Style,
                Props: {
                    TargetType: TextBlock
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBlock, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBlock, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextBlock, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextOptions, "TextHintingMode"),
                        Value: "Animated"
                    }
                }]

            }
        },
        {
            Key: "DefaultScrollBarStyle", Value: {
                ParseType: Style,
                Props: {
                    TargetType: ScrollBar
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollBar, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollBar, "Background"),
                        Value: new StaticResourceMarkup("ControlBackgroundBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollBar, "MinWidth"),
                        Value: "20"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollBar, "MinHeight"),
                        Value: "20"
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
                        Value: new ControlTemplate(ScrollBar, {
                            ParseType: Grid,
                            Name: "Root",
                            Props: {
                                Resources: {
                                    ParseType: ResourceDictionary,
                                    Children: [
                                    {
                                        Key: "RepeatButtonTemplate", Value: new ControlTemplate(RepeatButton, {
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
                                        })
                                    },
                                    {
                                        Key: "HorizontalIncrementTemplate", Value: new ControlTemplate(RepeatButton, {
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
                                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                                    ParseType: EasingDoubleKeyFrame,
                                                                    Props: {
                                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100)),
                                                                        Value: 1
                                                                    }
                                                                }]

                                                            },
                                                            {
                                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                                    ParseType: EasingDoubleKeyFrame,
                                                                    Props: {
                                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100)),
                                                                        Value: 0.5
                                                                    }
                                                                }]

                                                            }]

                                                        }
                                                    },
                                                    {
                                                        ParseType: VisualState,
                                                        Name: "Pressed",
                                                        Content: {
                                                            ParseType: Storyboard
                                                        }
                                                    },
                                                    {
                                                        ParseType: VisualState,
                                                        Name: "Disabled",
                                                        Content: {
                                                            ParseType: Storyboard,
                                                            Children: [
                                                            {
                                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                                    ParseType: EasingDoubleKeyFrame,
                                                                    Props: {
                                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100)),
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
                                                ParseType: Path,
                                                Props: {
                                                    Data: "F1 M 511.047,352.682L 511.047,342.252L 517.145,347.467L 511.047,352.682 Z",
                                                    Height: 6,
                                                    Stretch: Stretch.Uniform,
                                                    Width: 4,
                                                    Fill: {
                                                        ParseType: SolidColorBrush,
                                                        Props: {
                                                            Color: new StaticResourceMarkup("Gray2")
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                ParseType: Path,
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
                                                        ParseType: SolidColorBrush,
                                                        Props: {
                                                            Color: new StaticResourceMarkup("BlackColor")
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                ParseType: Path,
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
                                                        ParseType: BlurEffect
                                                    },
                                                    Fill: {
                                                        ParseType: SolidColorBrush,
                                                        Props: {
                                                            Color: new StaticResourceMarkup("BlackColor")
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                ParseType: Rectangle,
                                                Name: "DisabledElement",
                                                Props: {
                                                    Fill: new StaticResourceMarkup("WhiteColorBrush"),
                                                    Opacity: 0,
                                                    RadiusY: 2,
                                                    RadiusX: 2
                                                }
                                            }]

                                        })
                                    },
                                    {
                                        Key: "HorizontalDecrementTemplate", Value: new ControlTemplate(RepeatButton, {
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
                                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                                    ParseType: EasingDoubleKeyFrame,
                                                                    Props: {
                                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100)),
                                                                        Value: 1
                                                                    }
                                                                }]

                                                            },
                                                            {
                                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                                    ParseType: EasingDoubleKeyFrame,
                                                                    Props: {
                                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100)),
                                                                        Value: 0.5
                                                                    }
                                                                }]

                                                            }]

                                                        }
                                                    },
                                                    {
                                                        ParseType: VisualState,
                                                        Name: "Pressed",
                                                        Content: {
                                                            ParseType: Storyboard
                                                        }
                                                    },
                                                    {
                                                        ParseType: VisualState,
                                                        Name: "Disabled",
                                                        Content: {
                                                            ParseType: Storyboard,
                                                            Children: [
                                                            {
                                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                                    ParseType: EasingDoubleKeyFrame,
                                                                    Props: {
                                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100)),
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
                                                ParseType: Path,
                                                Props: {
                                                    Data: "F1 M 110.692,342.252L 110.692,352.682L 104.594,347.467L 110.692,342.252 Z",
                                                    Height: 6,
                                                    Stretch: Stretch.Uniform,
                                                    Width: 4,
                                                    Fill: {
                                                        ParseType: SolidColorBrush,
                                                        Props: {
                                                            Color: new StaticResourceMarkup("Gray2")
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                ParseType: Path,
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
                                                        ParseType: SolidColorBrush,
                                                        Props: {
                                                            Color: new StaticResourceMarkup("BlackColor")
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                ParseType: Path,
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
                                                        ParseType: BlurEffect
                                                    },
                                                    Fill: {
                                                        ParseType: SolidColorBrush,
                                                        Props: {
                                                            Color: new StaticResourceMarkup("BlackColor")
                                                        }
                                                    }
                                                }
                                            }]

                                        })
                                    },
                                    {
                                        Key: "VerticalIncrementTemplate", Value: new ControlTemplate(RepeatButton, {
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
                                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                                    ParseType: EasingDoubleKeyFrame,
                                                                    Props: {
                                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100)),
                                                                        Value: 1
                                                                    }
                                                                }]

                                                            },
                                                            {
                                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                                    ParseType: EasingDoubleKeyFrame,
                                                                    Props: {
                                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100)),
                                                                        Value: 0.5
                                                                    }
                                                                }]

                                                            }]

                                                        }
                                                    },
                                                    {
                                                        ParseType: VisualState,
                                                        Name: "Pressed",
                                                        Content: {
                                                            ParseType: Storyboard
                                                        }
                                                    },
                                                    {
                                                        ParseType: VisualState,
                                                        Name: "Disabled",
                                                        Content: {
                                                            ParseType: Storyboard,
                                                            Children: [
                                                            {
                                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                                    ParseType: EasingDoubleKeyFrame,
                                                                    Props: {
                                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100)),
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
                                                ParseType: Path,
                                                Props: {
                                                    Data: "F1 M 531.107,321.943L 541.537,321.943L 536.322,328.042L 531.107,321.943 Z",
                                                    Height: 4,
                                                    Stretch: Stretch.Uniform,
                                                    Width: 6,
                                                    Fill: {
                                                        ParseType: SolidColorBrush,
                                                        Name: "ButtonColor",
                                                        Props: {
                                                            Color: new StaticResourceMarkup("Gray3")
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                ParseType: Path,
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
                                                        ParseType: SolidColorBrush,
                                                        Props: {
                                                            Color: new StaticResourceMarkup("BlackColor")
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                ParseType: Path,
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
                                                        ParseType: BlurEffect
                                                    },
                                                    Fill: {
                                                        ParseType: SolidColorBrush,
                                                        Props: {
                                                            Color: new StaticResourceMarkup("BlackColor")
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                ParseType: Rectangle,
                                                Name: "DisabledElement",
                                                Props: {
                                                    Fill: new StaticResourceMarkup("WhiteColorBrush"),
                                                    Opacity: 0,
                                                    RadiusY: 2,
                                                    RadiusX: 2
                                                }
                                            }]

                                        })
                                    },
                                    {
                                        Key: "VerticalDecrementTemplate", Value: new ControlTemplate(RepeatButton, {
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
                                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                                    ParseType: EasingDoubleKeyFrame,
                                                                    Props: {
                                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100)),
                                                                        Value: 1
                                                                    }
                                                                }]

                                                            },
                                                            {
                                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                                    ParseType: EasingDoubleKeyFrame,
                                                                    Props: {
                                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100)),
                                                                        Value: 0.5
                                                                    }
                                                                }]

                                                            }]

                                                        }
                                                    },
                                                    {
                                                        ParseType: VisualState,
                                                        Name: "Pressed",
                                                        Content: {
                                                            ParseType: Storyboard
                                                        }
                                                    },
                                                    {
                                                        ParseType: VisualState,
                                                        Name: "Disabled",
                                                        Content: {
                                                            ParseType: Storyboard,
                                                            Children: [
                                                            {
                                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                                    ParseType: EasingDoubleKeyFrame,
                                                                    Props: {
                                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100)),
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
                                                ParseType: Rectangle,
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
                                                ParseType: Rectangle,
                                                Name: "BackgroundMouseOver",
                                                Props: {
                                                    Fill: new StaticResourceMarkup("HighlightBrush"),
                                                    Opacity: 0,
                                                    RadiusY: 2,
                                                    RadiusX: 2
                                                }
                                            },
                                            {
                                                ParseType: Rectangle,
                                                Name: "BackgroundPressed",
                                                Props: {
                                                    Fill: new StaticResourceMarkup("HighlightBrush"),
                                                    Opacity: 0,
                                                    RadiusY: 2,
                                                    RadiusX: 2
                                                }
                                            },
                                            {
                                                ParseType: Rectangle,
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
                                                ParseType: Rectangle,
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
                                                ParseType: Path,
                                                Props: {
                                                    Data: "F1 M 541.537,173.589L 531.107,173.589L 536.322,167.49L 541.537,173.589 Z",
                                                    Height: 4,
                                                    Stretch: Stretch.Uniform,
                                                    Width: 6,
                                                    Fill: {
                                                        ParseType: SolidColorBrush,
                                                        Props: {
                                                            Color: new StaticResourceMarkup("Gray2")
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                ParseType: Path,
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
                                                        ParseType: SolidColorBrush,
                                                        Props: {
                                                            Color: new StaticResourceMarkup("BlackColor")
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                ParseType: Path,
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
                                                        ParseType: BlurEffect
                                                    },
                                                    Fill: {
                                                        ParseType: SolidColorBrush,
                                                        Props: {
                                                            Color: new StaticResourceMarkup("BlackColor")
                                                        }
                                                    }
                                                }
                                            }]

                                        })
                                    },
                                    {
                                        Key: "VerticalThumbTemplate", Value: new ControlTemplate(Thumb, {
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
                                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                                    ParseType: EasingDoubleKeyFrame,
                                                                    Props: {
                                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100)),
                                                                        Value: 1
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
                                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                                    ParseType: EasingDoubleKeyFrame,
                                                                    Props: {
                                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100)),
                                                                        Value: 1
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
                                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                                    ParseType: SplineDoubleKeyFrame,
                                                                    Props: {
                                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        StrokeThickness: 1,
                                                        Fill: new StaticResourceMarkup("ThumbBrush")
                                                    }
                                                },
                                                {
                                                    ParseType: Rectangle,
                                                    Name: "MouseOverRectangle",
                                                    Props: {
                                                        StrokeThickness: 1,
                                                        Opacity: 0,
                                                        Fill: new StaticResourceMarkup("BlackBrush")
                                                    }
                                                },
                                                {
                                                    ParseType: Rectangle,
                                                    Name: "PressedRectangle",
                                                    Props: {
                                                        StrokeThickness: 1,
                                                        Opacity: 0,
                                                        Fill: new StaticResourceMarkup("BlackBrush")
                                                    }
                                                }]

                                            }]

                                        })
                                    },
                                    {
                                        Key: "HorizontalThumbTemplate", Value: new ControlTemplate(Thumb, {
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
                                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                                    ParseType: EasingDoubleKeyFrame,
                                                                    Props: {
                                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100)),
                                                                        Value: 1
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
                                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                                    ParseType: EasingDoubleKeyFrame,
                                                                    Props: {
                                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100)),
                                                                        Value: 1
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
                                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                                    ParseType: SplineDoubleKeyFrame,
                                                                    Props: {
                                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                        StrokeThickness: 1,
                                                        Fill: new StaticResourceMarkup("ThumbBrush")
                                                    }
                                                },
                                                {
                                                    ParseType: Rectangle,
                                                    Name: "MouseOverRectangle",
                                                    Props: {
                                                        StrokeThickness: 1,
                                                        Opacity: 0,
                                                        Fill: new StaticResourceMarkup("BlackBrush")
                                                    }
                                                },
                                                {
                                                    ParseType: Rectangle,
                                                    Name: "PressedRectangle",
                                                    Props: {
                                                        StrokeThickness: 1,
                                                        Opacity: 0,
                                                        Fill: new StaticResourceMarkup("BlackBrush")
                                                    }
                                                }]

                                            }]

                                        })
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
                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                    ParseType: SplineDoubleKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                ParseType: Grid,
                                Name: "HorizontalRoot",
                                Props: {
                                    Height: 11,
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
                                    ParseType: Border,
                                    Props: {
                                        BorderThickness: new Thickness(0, 0, 0, 1),
                                        Margin: new Thickness(0, 0, 0, -1),
                                        Visibility: Visibility.Collapsed,
                                        BorderBrush: {
                                            ParseType: SolidColorBrush,
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
                                    ParseType: RepeatButton,
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
                                    ParseType: RepeatButton,
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
                                    ParseType: Thumb,
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
                                    ParseType: RepeatButton,
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
                                    ParseType: RepeatButton,
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
                                ParseType: Grid,
                                Name: "VerticalRoot",
                                Props: {
                                    Visibility: Visibility.Collapsed,
                                    Width: 11,
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
                                    ParseType: Border,
                                    Props: {
                                        BorderThickness: new Thickness(0, 0, 1, 0),
                                        Margin: new Thickness(0, 0, -1, 0),
                                        Visibility: Visibility.Collapsed,
                                        BorderBrush: {
                                            ParseType: SolidColorBrush,
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
                                    ParseType: RepeatButton,
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
                                    ParseType: RepeatButton,
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
                                    ParseType: Thumb,
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
                                    ParseType: RepeatButton,
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
                                    ParseType: RepeatButton,
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

                        })
                    }
                }]

            }
        },
        {
            Key: "DefaultScrollViewerStyle", Value: {
                ParseType: Style,
                Props: {
                    TargetType: ScrollViewer
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "Background"),
                        Value: new StaticResourceMarkup("ControlBackgroundBrush")
                    }
                },
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
                            ParseType: SolidColorBrush,
                            Props: {
                                Color: new StaticResourceMarkup("Gray4")
                            }
                        }
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ScrollViewer, "Template"),
                        Value: new ControlTemplate(ScrollViewer, {
                            ParseType: Border,
                            Props: {
                                BorderBrush: new TemplateBindingMarkup("BorderBrush"),
                                BorderThickness: new TemplateBindingMarkup("BorderThickness")
                            },
                            Content: {
                                ParseType: Grid,
                                Props: {
                                    Background: new TemplateBindingMarkup("Background"),
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
                                ,
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

                                },
                                Children: [
                                {
                                    ParseType: ScrollContentPresenter,
                                    Name: "ScrollContentPresenter",
                                    Props: {
                                        Cursor: new TemplateBindingMarkup("Cursor"),
                                        ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
                                        Margin: new TemplateBindingMarkup("Padding")
                                    }
                                },
                                {
                                    ParseType: Rectangle,
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
                                    ParseType: ScrollBar,
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
                                    ParseType: ScrollBar,
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
                        })
                    }
                }]

            }
        },
        {
            Key: "DefaultListBoxStyle", Value: {
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
                        Property: DependencyProperty.GetDependencyProperty(ListBox, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBox, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBox, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextOptions, "TextHintingMode"),
                        Value: "Animated"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBox, "Background"),
                        Value: new StaticResourceMarkup("ControlBackgroundBrush")
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
                        Value: new StaticResourceMarkup("ThumbBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBox, "Template"),
                        Value: new ControlTemplate(ListBox, {
                            ParseType: Grid,
                            AttachedProps: [{
                                Owner: VisualStateManager,
                                Prop: "VisualStateGroups",
                                Value: [
                                {
                                    ParseType: VisualStateGroup,
                                    Name: "ValidationStates",
                                    Children: [
                                    {
                                        ParseType: VisualState,
                                        Name: "Valid"
                                    },
                                    {
                                        ParseType: VisualState,
                                        Name: "InvalidUnfocused",
                                        Content: {
                                            ParseType: Storyboard,
                                            Children: [
                                            {
                                                ParseType: ObjectAnimationUsingKeyFrames,
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
                                        Name: "InvalidFocused",
                                        Content: {
                                            ParseType: Storyboard,
                                            Children: [
                                            {
                                                ParseType: ObjectAnimationUsingKeyFrames,
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
                                                    ParseType: DiscreteObjectKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: Visibility.Visible
                                                    }
                                                }]

                                            },
                                            {
                                                ParseType: ObjectAnimationUsingKeyFrames,
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
                                                    ParseType: DiscreteObjectKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: {
                                                            ParseType: Boolean,
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
                                ParseType: Border,
                                Props: {
                                    BorderBrush: new TemplateBindingMarkup("BorderBrush"),
                                    BorderThickness: new TemplateBindingMarkup("BorderThickness")
                                },
                                Content: {
                                    ParseType: ScrollViewer,
                                    Name: "ScrollViewer",
                                    Props: {
                                        BorderBrush: {
                                            ParseType: SolidColorBrush,
                                            Props: {
                                                Color: Color.FromHex("#00FFFFFF")
                                            }
                                        },
                                        BorderThickness: new Thickness(0, 0, 0, 0),
                                        Background: new TemplateBindingMarkup("Background"),
                                        Padding: new TemplateBindingMarkup("Padding"),
                                        TabNavigation: new TemplateBindingMarkup("TabNavigation")
                                    },
                                    Content: {
                                        ParseType: ItemsPresenter
                                    }
                                }
                            },
                            {
                                ParseType: Border,
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
                                        ParseType: ToolTip,
                                        Name: "validationTooltip",
                                        Props: {
                                            DataContext: new BindingMarkup({}),
                                            Placement: PlacementMode.Right,
                                            PlacementTarget: new BindingMarkup({}),
                                            Template: new StaticResourceMarkup("ValidationToolTipTemplate"),
                                            Triggers: [
                                            {
                                                ParseType: EventTrigger,
                                                Props: {
                                                    RoutedEvent: "Canvas.Loaded"
                                                },
                                                Children: [
                                                {
                                                    ParseType: BeginStoryboard,
                                                    Content: {
                                                        ParseType: Storyboard,
                                                        Children: [
                                                        {
                                                            ParseType: ObjectAnimationUsingKeyFrames,
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
                                                                ParseType: DiscreteObjectKeyFrame,
                                                                Props: {
                                                                    KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                                    Value: {
                                                                        ParseType: Boolean,
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
                                    ParseType: Grid,
                                    Props: {
                                        Background: {
                                            ParseType: SolidColorBrush,
                                            Props: {
                                                Color: Color.FromHex("#00FFFFFF")
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
                                        ParseType: Path,
                                        Props: {
                                            Data: "M 1,0 L6,0 A 2,2 90 0 1 8,2 L8,7 z",
                                            Fill: new StaticResourceMarkup("ValidationBrush5"),
                                            Margin: new Thickness(-1, 3, 0, 0)
                                        }
                                    },
                                    {
                                        ParseType: Path,
                                        Props: {
                                            Data: "M 0,0 L2,0 L 8,6 L8,8",
                                            Fill: new StaticResourceMarkup("WhiteColorBrush"),
                                            Margin: new Thickness(-1, 3, 0, 0)
                                        }
                                    }]

                                }
                            }]

                        })
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBox, "BorderThickness"),
                        Value: "0"
                    }
                }]

            }
        },
        {
            Key: "DefaultListBoxItemStyle", Value: {
                ParseType: Style,
                Props: {
                    TargetType: ListBoxItem
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBoxItem, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBoxItem, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextOptions, "TextHintingMode"),
                        Value: "Animated"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBoxItem, "Padding"),
                        Value: "10"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ListBoxItem, "Margin"),
                        Value: "0"
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
                        Value: "Center"
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
                        Value: new ControlTemplate(ListBoxItem, {
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
                                                ParseType: ColorAnimation,
                                                Props: {
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                ParseType: ColorAnimation,
                                                Props: {
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                        ParseType: VisualState,
                                        Name: "SelectedUnfocused"
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
                                                    ParseType: DiscreteObjectKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: Visibility.Visible
                                                    }
                                                }]

                                            },
                                            {
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                                ParseType: ColorAnimation,
                                                Props: {
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                    Fill: new StaticResourceMarkup("HighlightBrush"),
                                    IsHitTestVisible: false,
                                    Opacity: 0,
                                    RadiusY: 1,
                                    RadiusX: 1
                                }
                            },
                            {
                                ParseType: Rectangle,
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
                                ParseType: ContentControl,
                                Name: "contentControl",
                                Content: {
                                    ParseType: ContentPresenter,
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
                                ParseType: Rectangle,
                                Name: "FocusVisualElement",
                                Props: {
                                    RadiusY: 1,
                                    RadiusX: 1,
                                    Stroke: new StaticResourceMarkup("HighlightBrush"),
                                    StrokeThickness: 1,
                                    Visibility: Visibility.Collapsed
                                }
                            }]

                        })
                    }
                }]

            }
        },
        {
            Key: "DefaultCheckBoxStyle", Value: {
                ParseType: Style,
                Props: {
                    TargetType: CheckBox
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(CheckBox, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(CheckBox, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(CheckBox, "Background"),
                        Value: new StaticResourceMarkup("CheckBoxBackgroundBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(CheckBox, "MinWidth"),
                        Value: "100"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(CheckBox, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
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
                        Value: new StaticResourceMarkup("CheckBoxBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(CheckBox, "Template"),
                        Value: new ControlTemplate(CheckBox, {
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
                                            Props: {
                                                Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100))
                                            },
                                            Children: [
                                            {
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    To: 1,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100))
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
                                                ParseType: ColorAnimation,
                                                Props: {
                                                    To: new StaticResourceMarkup("Gray2"),
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    To: 1,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100))
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
                                        ParseType: VisualState,
                                        Name: "Pressed",
                                        Content: {
                                            ParseType: Storyboard,
                                            Props: {
                                                Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100))
                                            },
                                            Children: [
                                            {
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    To: 1,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100))
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
                                        ParseType: VisualState,
                                        Name: "Disabled",
                                        Content: {
                                            ParseType: Storyboard,
                                            Children: [
                                            {
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    To: 0.55,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    To: 0.55,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                                    To: 1,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                                    To: 1,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                    ParseType: VisualStateGroup,
                                    Name: "FocusStates",
                                    Children: [
                                    {
                                        ParseType: VisualState,
                                        Name: "Focused",
                                        Content: {
                                            ParseType: Storyboard
                                        }
                                    },
                                    {
                                        ParseType: VisualState,
                                        Name: "Unfocused"
                                    }]

                                },
                                {
                                    ParseType: VisualStateGroup,
                                    Name: "ValidationStates",
                                    Children: [
                                    {
                                        ParseType: VisualState,
                                        Name: "Valid"
                                    },
                                    {
                                        ParseType: VisualState,
                                        Name: "InvalidUnfocused",
                                        Content: {
                                            ParseType: Storyboard,
                                            Children: [
                                            {
                                                ParseType: ObjectAnimationUsingKeyFrames,
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
                                        Name: "InvalidFocused",
                                        Content: {
                                            ParseType: Storyboard,
                                            Children: [
                                            {
                                                ParseType: ObjectAnimationUsingKeyFrames,
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
                                                    ParseType: DiscreteObjectKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: Visibility.Visible
                                                    }
                                                }]

                                            },
                                            {
                                                ParseType: ObjectAnimationUsingKeyFrames,
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
                                                    ParseType: DiscreteObjectKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: {
                                                            ParseType: Boolean,
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
                                ParseType: Grid,
                                Props: {
                                    HorizontalAlignment: HorizontalAlignment.Left,
                                    VerticalAlignment: VerticalAlignment.Top
                                },
                                Children: [
                                {
                                    ParseType: Grid,
                                    Name: "grid",
                                    Props: {
                                        Height: 14,
                                        Width: 14,
                                        Opacity: 0.7
                                    },
                                    Children: [
                                    {
                                        ParseType: Rectangle,
                                        Name: "Background",
                                        Props: {
                                            Fill: new TemplateBindingMarkup("Background"),
                                            Stroke: new TemplateBindingMarkup("BorderBrush"),
                                            StrokeThickness: new TemplateBindingMarkup("BorderThickness")
                                        }
                                    },
                                    {
                                        ParseType: Rectangle,
                                        Name: "MouseOverRectangle",
                                        Props: {
                                            Stroke: new StaticResourceMarkup("CheckBoxMouseOverBrush"),
                                            Opacity: 0
                                        }
                                    },
                                    {
                                        ParseType: Rectangle,
                                        Name: "PressedRectangle",
                                        Props: {
                                            Stroke: new StaticResourceMarkup("BlackBrush"),
                                            Opacity: 0
                                        }
                                    },
                                    {
                                        ParseType: Path,
                                        Name: "CheckIcon",
                                        Props: {
                                            Opacity: 0,
                                            Data: "M49.4375,110.4375 L51.4995,112.812 L56.3745,107.24883",
                                            HorizontalAlignment: HorizontalAlignment.Center,
                                            Height: 7.6,
                                            Stretch: Stretch.Fill,
                                            Stroke: {
                                                ParseType: SolidColorBrush,
                                                Props: {
                                                    Color: Color.FromHex("#FF000000")
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
                                        ParseType: Rectangle,
                                        Name: "IndeterminateIcon",
                                        Props: {
                                            Height: 8,
                                            Width: 8,
                                            Opacity: 0,
                                            Fill: {
                                                ParseType: SolidColorBrush,
                                                Props: {
                                                    Color: new StaticResourceMarkup("Gray3")
                                                }
                                            }
                                        }
                                    },
                                    {
                                        ParseType: Rectangle,
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
                                    ParseType: Border,
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
                                            ParseType: ToolTip,
                                            Name: "validationTooltip",
                                            Props: {
                                                DataContext: new BindingMarkup({}),
                                                Placement: PlacementMode.Right,
                                                PlacementTarget: new BindingMarkup({}),
                                                Template: new StaticResourceMarkup("ValidationToolTipTemplate"),
                                                Triggers: [
                                                {
                                                    ParseType: EventTrigger,
                                                    Props: {
                                                        RoutedEvent: "Canvas.Loaded"
                                                    },
                                                    Children: [
                                                    {
                                                        ParseType: BeginStoryboard,
                                                        Content: {
                                                            ParseType: Storyboard,
                                                            Children: [
                                                            {
                                                                ParseType: ObjectAnimationUsingKeyFrames,
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
                                                                    ParseType: DiscreteObjectKeyFrame,
                                                                    Props: {
                                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                                        Value: {
                                                                            ParseType: Boolean,
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
                                        ParseType: Grid,
                                        Props: {
                                            Background: {
                                                ParseType: SolidColorBrush,
                                                Props: {
                                                    Color: Color.FromHex("#00FFFFFF")
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
                                            ParseType: Path,
                                            Props: {
                                                Data: "M 1,0 L5,0 A 2,2 90 0 1 7,2 L7,6 z",
                                                Fill: new StaticResourceMarkup("ValidationBrush5"),
                                                Margin: new Thickness(0, 3, 0, 0)
                                            }
                                        },
                                        {
                                            ParseType: Path,
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
                                ParseType: ContentControl,
                                Props: {
                                    Foreground: {
                                        ParseType: SolidColorBrush,
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
                                    ParseType: ContentPresenter,
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

                        })
                    }
                }]

            }
        },
        {
            Key: "DefaultPasswordBoxStyle", Value: {
                ParseType: Style,
                Props: {
                    TargetType: PasswordBox
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(PasswordBox, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(PasswordBox, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextOptions, "TextHintingMode"),
                        Value: "Animated"
                    }
                },
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
                        Property: DependencyProperty.GetDependencyProperty(PasswordBox, "MinHeight"),
                        Value: "26"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(PasswordBox, "Background"),
                        Value: new StaticResourceMarkup("ControlBackgroundBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(PasswordBox, "Foreground"),
                        Value: {
                            ParseType: SolidColorBrush,
                            Props: {
                                Color: new StaticResourceMarkup("TextBoxText")
                            }
                        }
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
                        Value: new StaticResourceMarkup("TextBoxBorderBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(PasswordBox, "Template"),
                        Value: new ControlTemplate(PasswordBox, {
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
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                        ParseType: VisualState,
                                        Name: "Disabled",
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
                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                    ParseType: EasingDoubleKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: 1
                                                    }
                                                }]

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
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
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
                                    ParseType: VisualStateGroup,
                                    Name: "ValidationStates",
                                    Children: [
                                    {
                                        ParseType: VisualState,
                                        Name: "Valid"
                                    },
                                    {
                                        ParseType: VisualState,
                                        Name: "InvalidUnfocused",
                                        Content: {
                                            ParseType: Storyboard,
                                            Children: [
                                            {
                                                ParseType: ObjectAnimationUsingKeyFrames,
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
                                        Name: "InvalidFocused",
                                        Content: {
                                            ParseType: Storyboard,
                                            Children: [
                                            {
                                                ParseType: ObjectAnimationUsingKeyFrames,
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
                                                    ParseType: DiscreteObjectKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: Visibility.Visible
                                                    }
                                                }]

                                            },
                                            {
                                                ParseType: ObjectAnimationUsingKeyFrames,
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
                                                    ParseType: DiscreteObjectKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: {
                                                            ParseType: Boolean,
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
                                ParseType: Border,
                                Name: "Border",
                                Props: {
                                    BorderBrush: new TemplateBindingMarkup("BorderBrush"),
                                    BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                    Background: new TemplateBindingMarkup("Background"),
                                    Opacity: 1
                                },
                                Content: {
                                    ParseType: Border,
                                    Name: "ContentElement",
                                    Props: {
                                        Margin: new TemplateBindingMarkup("Padding"),
                                        Padding: new Thickness(4, 0, 3, 2),
                                        VerticalAlignment: VerticalAlignment.Center
                                    }
                                }
                            },
                            {
                                ParseType: Border,
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
                                ParseType: Border,
                                Name: "MouseOverBorder",
                                Props: {
                                    BorderBrush: new StaticResourceMarkup("TextBoxMouseOverBorderBrush"),
                                    BorderThickness: new Thickness(1, 1, 1, 1),
                                    Opacity: 0
                                }
                            },
                            {
                                ParseType: Border,
                                Name: "FocusVisualElement",
                                Props: {
                                    BorderBrush: new StaticResourceMarkup("TextBoxMouseOverBorderBrush"),
                                    BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                    IsHitTestVisible: false,
                                    Opacity: 0
                                },
                                Content: {
                                    ParseType: Rectangle,
                                    Name: "FocusInnerRectangle",
                                    Props: {
                                        StrokeThickness: new TemplateBindingMarkup("BorderThickness"),
                                        Opacity: 0,
                                        Stroke: new StaticResourceMarkup("TextBoxMouseOverInnerBorderBrush")
                                    }
                                }
                            },
                            {
                                ParseType: Border,
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
                                        ParseType: ToolTip,
                                        Name: "validationTooltip",
                                        Props: {
                                            DataContext: new BindingMarkup({}),
                                            Placement: PlacementMode.Right,
                                            PlacementTarget: new BindingMarkup({}),
                                            Template: new StaticResourceMarkup("ValidationToolTipTemplate"),
                                            Triggers: [
                                            {
                                                ParseType: EventTrigger,
                                                Props: {
                                                    RoutedEvent: "Canvas.Loaded"
                                                },
                                                Children: [
                                                {
                                                    ParseType: BeginStoryboard,
                                                    Content: {
                                                        ParseType: Storyboard,
                                                        Children: [
                                                        {
                                                            ParseType: ObjectAnimationUsingKeyFrames,
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
                                                                ParseType: DiscreteObjectKeyFrame,
                                                                Props: {
                                                                    KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                                    Value: {
                                                                        ParseType: Boolean,
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
                                    ParseType: Grid,
                                    Props: {
                                        Background: {
                                            ParseType: SolidColorBrush,
                                            Props: {
                                                Color: Color.FromHex("#00FFFFFF")
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
                                        ParseType: Path,
                                        Props: {
                                            Data: "M 1,0 L6,0 A 2,2 90 0 1 8,2 L8,7 z",
                                            Fill: new StaticResourceMarkup("ValidationBrush5"),
                                            Margin: new Thickness(1, 3, 0, 0)
                                        }
                                    },
                                    {
                                        ParseType: Path,
                                        Props: {
                                            Data: "M 0,0 L2,0 L 8,6 L8,8",
                                            Fill: new StaticResourceMarkup("WhiteColorBrush"),
                                            Margin: new Thickness(1, 3, 0, 0)
                                        }
                                    }]

                                }
                            }]

                        })
                    }
                }]

            }
        },
        {
            Key: "DefaultProgressBarStyle", Value: {
                ParseType: Style,
                Props: {
                    TargetType: ProgressBar
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ProgressBar, "Foreground"),
                        Value: new StaticResourceMarkup("HighlightBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ProgressBar, "Background"),
                        Value: new StaticResourceMarkup("GrayBrush4")
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
                        Property: DependencyProperty.GetDependencyProperty(ProgressBar, "Height"),
                        Value: "10"
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
                        Value: new StaticResourceMarkup("TextBoxBorderBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ProgressBar, "Template"),
                        Value: new ControlTemplate(ProgressBar, {
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
                                                ParseType: ObjectAnimationUsingKeyFrames,
                                                Props: {
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                                    ParseType: DiscreteObjectKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: Visibility.Collapsed
                                                    }
                                                }]

                                            },
                                            {
                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                    ParseType: SplineDoubleKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: 0
                                                    }
                                                },
                                                {
                                                    ParseType: SplineDoubleKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 350)),
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
                                ParseType: Border,
                                Name: "ProgressBarTrack",
                                Props: {
                                    BorderBrush: new TemplateBindingMarkup("BorderBrush"),
                                    BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                    Background: new TemplateBindingMarkup("Background")
                                }
                            },
                            {
                                ParseType: Grid,
                                Name: "ProgressBarRootGrid",
                                Children: [
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
                                            Margin: new TemplateBindingMarkup("BorderThickness"),
                                            Opacity: 1,
                                            RenderTransformOrigin: new Point(0.5, 0.5),
                                            StrokeThickness: 0,
                                            Fill: new StaticResourceMarkup("BrandingBrush")
                                        }
                                    },
                                    {
                                        ParseType: Rectangle,
                                        Name: "IndeterminateGradientFill",
                                        Props: {
                                            Margin: new TemplateBindingMarkup("BorderThickness"),
                                            Opacity: 0.7,
                                            StrokeThickness: 1,
                                            Fill: {
                                                ParseType: LinearGradientBrush,
                                                Props: {
                                                    EndPoint: new Point(0, 1),
                                                    MappingMode: BrushMappingMode.Absolute,
                                                    SpreadMethod: GradientSpreadMethod.Repeat,
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
                                                        Color: new StaticResourceMarkup("ProgressIndeterminateColor1"),
                                                        Offset: 0
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: new StaticResourceMarkup("ProgressIndeterminateColor2"),
                                                        Offset: 0.651
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
                                                    Props: {
                                                        Color: new StaticResourceMarkup("ProgressIndeterminateColor3"),
                                                        Offset: 0.093
                                                    }
                                                },
                                                {
                                                    ParseType: GradientStop,
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
                                    ParseType: Grid,
                                    Name: "DeterminateRoot",
                                    Props: {
                                        Margin: new Thickness(1, 1, 1, 1)
                                    },
                                    Children: [
                                    {
                                        ParseType: Border,
                                        Name: "ProgressBarIndicator",
                                        Props: {
                                            Background: new StaticResourceMarkup("BrandingBrush"),
                                            HorizontalAlignment: HorizontalAlignment.Left,
                                            Margin: new Thickness(-1, -1, -1, -1)
                                        },
                                        Content: {
                                            ParseType: Rectangle,
                                            Name: "GradientFill",
                                            Props: {
                                                Opacity: 0.7,
                                                Visibility: Visibility.Collapsed,
                                                Fill: {
                                                    ParseType: LinearGradientBrush,
                                                    Props: {
                                                        EndPoint: new Point(0, 1),
                                                        MappingMode: BrushMappingMode.Absolute,
                                                        SpreadMethod: GradientSpreadMethod.Repeat,
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
                                                            Color: new StaticResourceMarkup("ProgressIndeterminateColor1"),
                                                            Offset: 0
                                                        }
                                                    },
                                                    {
                                                        ParseType: GradientStop,
                                                        Props: {
                                                            Color: new StaticResourceMarkup("ProgressIndeterminateColor2"),
                                                            Offset: 0.651
                                                        }
                                                    },
                                                    {
                                                        ParseType: GradientStop,
                                                        Props: {
                                                            Color: new StaticResourceMarkup("ProgressIndeterminateColor3"),
                                                            Offset: 0.093
                                                        }
                                                    },
                                                    {
                                                        ParseType: GradientStop,
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

                        })
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ProgressBar, "BorderThickness"),
                        Value: "1"
                    }
                }]

            }
        },
        {
            Key: "DefaultRadioButtonStyle", Value: {
                ParseType: Style,
                Props: {
                    TargetType: RadioButton
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RadioButton, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RadioButton, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RadioButton, "Background"),
                        Value: new StaticResourceMarkup("CheckBoxBackgroundBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RadioButton, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
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
                        Value: new StaticResourceMarkup("CheckBoxBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RadioButton, "Template"),
                        Value: new ControlTemplate(RadioButton, {
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
                                            Props: {
                                                Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100))
                                            },
                                            Children: [
                                            {
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    To: 1,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100))
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
                                                ParseType: ColorAnimation,
                                                Props: {
                                                    To: new StaticResourceMarkup("Gray2"),
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    To: 1,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 100))
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
                                        ParseType: VisualState,
                                        Name: "Pressed",
                                        Content: {
                                            ParseType: Storyboard
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
                                                    To: 0.55,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    To: 0.55,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                                    To: 1,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                            ParseType: Storyboard
                                        }
                                    },
                                    {
                                        ParseType: VisualState,
                                        Name: "Unfocused"
                                    }]

                                },
                                {
                                    ParseType: VisualStateGroup,
                                    Name: "ValidationStates",
                                    Children: [
                                    {
                                        ParseType: VisualState,
                                        Name: "Valid"
                                    },
                                    {
                                        ParseType: VisualState,
                                        Name: "InvalidUnfocused",
                                        Content: {
                                            ParseType: Storyboard,
                                            Children: [
                                            {
                                                ParseType: ObjectAnimationUsingKeyFrames,
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
                                        Name: "InvalidFocused",
                                        Content: {
                                            ParseType: Storyboard,
                                            Children: [
                                            {
                                                ParseType: ObjectAnimationUsingKeyFrames,
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
                                                    ParseType: DiscreteObjectKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: Visibility.Visible
                                                    }
                                                }]

                                            },
                                            {
                                                ParseType: ObjectAnimationUsingKeyFrames,
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
                                                    ParseType: DiscreteObjectKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: {
                                                            ParseType: Boolean,
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
                                ParseType: Grid,
                                Props: {
                                    HorizontalAlignment: HorizontalAlignment.Left,
                                    VerticalAlignment: VerticalAlignment.Center
                                },
                                Children: [
                                {
                                    ParseType: Grid,
                                    Name: "grid",
                                    Props: {
                                        Height: 15,
                                        Width: 15,
                                        Opacity: 0.7
                                    },
                                    Children: [
                                    {
                                        ParseType: Ellipse,
                                        Name: "Background",
                                        Props: {
                                            Fill: new TemplateBindingMarkup("Background"),
                                            Stroke: new TemplateBindingMarkup("BorderBrush"),
                                            Margin: new Thickness(1, 1, 1, 1),
                                            StrokeThickness: new TemplateBindingMarkup("BorderThickness")
                                        }
                                    },
                                    {
                                        ParseType: Ellipse,
                                        Name: "MouseOverEllipse",
                                        Props: {
                                            Stroke: new StaticResourceMarkup("CheckBoxMouseOverBrush"),
                                            Margin: new Thickness(1, 1, 1, 1),
                                            Opacity: 0
                                        }
                                    },
                                    {
                                        ParseType: Ellipse,
                                        Name: "PressedEllipse",
                                        Props: {
                                            Stroke: new StaticResourceMarkup("BlackBrush"),
                                            Margin: new Thickness(1, 1, 1, 1),
                                            Opacity: 0
                                        }
                                    },
                                    {
                                        ParseType: Ellipse,
                                        Name: "CheckIcon",
                                        Props: {
                                            Fill: new StaticResourceMarkup("BlackBrush"),
                                            Height: 7,
                                            Opacity: 0,
                                            Width: 7
                                        }
                                    },
                                    {
                                        ParseType: Ellipse,
                                        Name: "DisabledVisualElement",
                                        Props: {
                                            Fill: new StaticResourceMarkup("DisabledWhiteColorBrush"),
                                            Opacity: 0
                                        }
                                    },
                                    {
                                        ParseType: Grid,
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
                                                ParseType: ToolTip,
                                                Name: "validationTooltip",
                                                Props: {
                                                    DataContext: new BindingMarkup({}),
                                                    Placement: PlacementMode.Right,
                                                    PlacementTarget: new BindingMarkup({}),
                                                    Template: new StaticResourceMarkup("ValidationToolTipTemplate"),
                                                    Triggers: [
                                                    {
                                                        ParseType: EventTrigger,
                                                        Props: {
                                                            RoutedEvent: "Canvas.Loaded"
                                                        },
                                                        Children: [
                                                        {
                                                            ParseType: BeginStoryboard,
                                                            Content: {
                                                                ParseType: Storyboard,
                                                                Children: [
                                                                {
                                                                    ParseType: ObjectAnimationUsingKeyFrames,
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
                                                                        ParseType: DiscreteObjectKeyFrame,
                                                                        Props: {
                                                                            KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                                            Value: {
                                                                                ParseType: Boolean,
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
                                            ParseType: Ellipse,
                                            Props: {
                                                Height: 14,
                                                Stroke: new StaticResourceMarkup("ControlsValidationBrush"),
                                                StrokeThickness: 1,
                                                Width: 14
                                            }
                                        },
                                        {
                                            ParseType: Ellipse,
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
                                            ParseType: Ellipse,
                                            Props: {
                                                Fill: {
                                                    ParseType: SolidColorBrush,
                                                    Props: {
                                                        Color: Color.FromHex("#00FFFFFF")
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
                                ParseType: ContentControl,
                                Props: {
                                    Foreground: {
                                        ParseType: SolidColorBrush,
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
                                    ParseType: ContentPresenter,
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

                        })
                    }
                }]

            }
        },
        {
            Key: "DefaultRepeatButtonStyle", Value: {
                ParseType: Style,
                Props: {
                    TargetType: RepeatButton
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "Background"),
                        Value: new StaticResourceMarkup("GrayBrush7")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "BorderBrush"),
                        Value: new StaticResourceMarkup("TextBoxBorderBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextOptions, "TextHintingMode"),
                        Value: "Animated"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "FontWeight"),
                        Value: "SemiBold"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "Padding"),
                        Value: "5,6"
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
                        Property: DependencyProperty.GetDependencyProperty(RepeatButton, "Template"),
                        Value: new ControlTemplate(RepeatButton, {
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
                                                    To: 1,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                        ParseType: VisualState,
                                        Name: "Pressed",
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
                                        ParseType: VisualState,
                                        Name: "Disabled",
                                        Content: {
                                            ParseType: Storyboard,
                                            Children: [
                                            {
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    To: 0.55,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    To: 0.5,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    To: 1,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                    BorderBrush: new TemplateBindingMarkup("BorderBrush"),
                                    BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                    Background: new TemplateBindingMarkup("Background"),
                                    CornerRadius: new CornerRadius(3, 3, 3, 3)
                                }
                            },
                            {
                                ParseType: Rectangle,
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
                                ParseType: Border,
                                Name: "MouseOverBorder",
                                Props: {
                                    Background: new StaticResourceMarkup("GrayBrush8"),
                                    BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                    CornerRadius: new CornerRadius(3.5, 3.5, 3.5, 3.5),
                                    Opacity: 0
                                }
                            },
                            {
                                ParseType: Border,
                                Name: "PressedBorder",
                                Props: {
                                    Background: new StaticResourceMarkup("GrayBrush5"),
                                    BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                    CornerRadius: new CornerRadius(3.5, 3.5, 3.5, 3.5),
                                    Opacity: 0
                                }
                            },
                            {
                                ParseType: Rectangle,
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
                                ParseType: Rectangle,
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
                                ParseType: ContentPresenter,
                                Name: "contentPresenter",
                                Props: {
                                    ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
                                    HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                    Margin: new TemplateBindingMarkup("Padding"),
                                    VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment")
                                },
                                Content: new TemplateBindingMarkup("Content")
                            }]

                        })
                    }
                }]

            }
        },
        {
            Key: "HorizontalSliderThumb", Value: {
                ParseType: Style,
                Props: {
                    TargetType: Thumb
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Thumb, "Background"),
                        Value: new StaticResourceMarkup("GrayBrush7")
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
                        Property: DependencyProperty.GetDependencyProperty(Thumb, "Template"),
                        Value: new ControlTemplate(Thumb, {
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
                                            ParseType: Storyboard
                                        }
                                    },
                                    {
                                        ParseType: VisualState,
                                        Name: "Pressed",
                                        Content: {
                                            ParseType: Storyboard
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
                                                    To: 0.55,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                    ParseType: VisualStateGroup,
                                    Name: "FocusStates",
                                    Children: [
                                    {
                                        ParseType: VisualState,
                                        Name: "Focused"
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
                                Props: {
                                    Background: new StaticResourceMarkup("BlackBrush"),
                                    BorderThickness: new Thickness(0, 0, 1, 0),
                                    BorderBrush: new StaticResourceMarkup("ControlBackgroundBrush")
                                }
                            },
                            {
                                ParseType: Rectangle,
                                Name: "DisabledVisualElement",
                                Props: {
                                    Fill: new StaticResourceMarkup("DisabledWhiteColorBrush"),
                                    IsHitTestVisible: false,
                                    Opacity: 0
                                }
                            }]

                        })
                    }
                }]

            }
        },
        {
            Key: "VerticalSliderThumb", Value: {
                ParseType: Style,
                Props: {
                    TargetType: Thumb
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Thumb, "Background"),
                        Value: new StaticResourceMarkup("TransparentWhiteBrush")
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
                        Property: DependencyProperty.GetDependencyProperty(Thumb, "Template"),
                        Value: new ControlTemplate(Thumb, {
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
                                            ParseType: Storyboard
                                        }
                                    },
                                    {
                                        ParseType: VisualState,
                                        Name: "Pressed",
                                        Content: {
                                            ParseType: Storyboard
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
                                                    To: 0.55,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                    ParseType: VisualStateGroup,
                                    Name: "FocusStates",
                                    Children: [
                                    {
                                        ParseType: VisualState,
                                        Name: "Focused"
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
                                Props: {
                                    Background: new StaticResourceMarkup("BlackBrush"),
                                    BorderThickness: new Thickness(0, 1, 0, 0),
                                    BorderBrush: new StaticResourceMarkup("ControlBackgroundBrush")
                                }
                            },
                            {
                                ParseType: Rectangle,
                                Name: "DisabledVisualElement",
                                Props: {
                                    Fill: new StaticResourceMarkup("DisabledWhiteColorBrush"),
                                    IsHitTestVisible: false,
                                    Opacity: 0
                                }
                            }]

                        })
                    }
                }]

            }
        },
        {
            Key: "RepeatButtonTemplate", Value: new ControlTemplate(RepeatButton, {
                ParseType: Grid,
                Name: "Root",
                Props: {
                    Opacity: 0
                }
            })
        },
        {
            Key: "HorizontalTrackLargeDecrease", Value: new ControlTemplate(RepeatButton, {
                ParseType: Grid,
                Name: "Root",
                Props: {
                    Margin: new Thickness(0, -1, 0, 0)
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
                            Name: "Pressed"
                        },
                        {
                            ParseType: VisualState,
                            Name: "Disabled"
                        }]

                    }]


                }
                ],
                Children: [
                {
                    ParseType: Rectangle,
                    Props: {
                        Height: 3,
                        Margin: new Thickness(0, 1, 0, 0),
                        Fill: {
                            ParseType: SolidColorBrush,
                            Props: {
                                Color: new StaticResourceMarkup("BlackColor")
                            }
                        }
                    }
                }]

            })
        },
        {
            Key: "VerticalTrackLargeDecrease", Value: new ControlTemplate(RepeatButton, {
                ParseType: Grid,
                Name: "Root",
                Props: {
                    Margin: new Thickness(0, 0, 0, 0)
                },
                Children: [
                {
                    ParseType: Rectangle,
                    Props: {
                        Width: 3,
                        Fill: {
                            ParseType: SolidColorBrush,
                            Props: {
                                Color: new StaticResourceMarkup("BlackColor")
                            }
                        }
                    }
                }]

            })
        },
        {
            Key: "DefaultSliderStyle", Value: {
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
                        Value: new StaticResourceMarkup("ControlBorderBrush")
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
                        Value: new ControlTemplate(Slider, {
                            ParseType: Grid,
                            Name: "Root",
                            Props: {
                                Resources: {
                                    ParseType: ResourceDictionary,
                                    Children: [
                                    {
                                        Key: "RepeatButtonTemplate", Value: new ControlTemplate(RepeatButton, {
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
                                        })
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
                                                    ParseType: DiscreteObjectKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: Visibility.Visible
                                                    }
                                                }]

                                            },
                                            {
                                                ParseType: ObjectAnimationUsingKeyFrames,
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
                                                    ParseType: DiscreteObjectKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: Visibility.Visible
                                                    }
                                                }]

                                            },
                                            {
                                                ParseType: ObjectAnimationUsingKeyFrames,
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
                                                    ParseType: DiscreteObjectKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0)),
                                                        Value: Visibility.Visible
                                                    }
                                                }]

                                            },
                                            {
                                                ParseType: ObjectAnimationUsingKeyFrames,
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
                                        Name: "Unfocused"
                                    },
                                    {
                                        ParseType: VisualState,
                                        Name: "Focused"
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
                                    ParseType: Rectangle,
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
                                    ParseType: RepeatButton,
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
                                    ParseType: Rectangle,
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
                                    ParseType: Thumb,
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
                                    ParseType: Rectangle,
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
                                    ParseType: Rectangle,
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
                                    ParseType: RepeatButton,
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
                                    ParseType: Rectangle,
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
                                    ParseType: Thumb,
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
                                    ParseType: RepeatButton,
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
                                    ParseType: Rectangle,
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

                        })
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(Slider, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
                    }
                }]

            }
        },
        {
            Key: "DefaultToggleButtonStyle", Value: {
                ParseType: Style,
                Props: {
                    TargetType: ToggleButton
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Background"),
                        Value: new StaticResourceMarkup("GrayBrush7")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "BorderBrush"),
                        Value: new StaticResourceMarkup("TextBoxBorderBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Foreground"),
                        Value: new StaticResourceMarkup("TextBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(TextOptions, "TextHintingMode"),
                        Value: "Animated"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "FontWeight"),
                        Value: "SemiBold"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Padding"),
                        Value: "5,6"
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
                        Property: DependencyProperty.GetDependencyProperty(ToggleButton, "Template"),
                        Value: new ControlTemplate(ToggleButton, {
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
                                                    To: 1,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                        ParseType: VisualState,
                                        Name: "Pressed",
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
                                        ParseType: VisualState,
                                        Name: "Disabled",
                                        Content: {
                                            ParseType: Storyboard,
                                            Children: [
                                            {
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    To: 0.55,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    To: 0.5,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                                    To: 1,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    To: 1,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                                    To: 1,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                                ParseType: DoubleAnimation,
                                                Props: {
                                                    To: 1,
                                                    Duration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 0))
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
                                    BorderBrush: new TemplateBindingMarkup("BorderBrush"),
                                    BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                    Background: new TemplateBindingMarkup("Background"),
                                    CornerRadius: new CornerRadius(3, 3, 3, 3)
                                }
                            },
                            {
                                ParseType: Rectangle,
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
                                ParseType: Border,
                                Name: "MouseOverBorder",
                                Props: {
                                    Background: new StaticResourceMarkup("GrayBrush8"),
                                    BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                    CornerRadius: new CornerRadius(3.5, 3.5, 3.5, 3.5),
                                    Opacity: 0
                                }
                            },
                            {
                                ParseType: Border,
                                Name: "PressedBorder",
                                Props: {
                                    Background: new StaticResourceMarkup("GrayBrush5"),
                                    BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                    CornerRadius: new CornerRadius(3.5, 3.5, 3.5, 3.5),
                                    Opacity: 0
                                }
                            },
                            {
                                ParseType: Border,
                                Name: "CheckedBorder",
                                Props: {
                                    Background: new StaticResourceMarkup("GrayBrush5"),
                                    BorderThickness: new TemplateBindingMarkup("BorderThickness"),
                                    CornerRadius: new CornerRadius(3.5, 3.5, 3.5, 3.5),
                                    Opacity: 0
                                }
                            },
                            {
                                ParseType: Rectangle,
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
                                ParseType: Rectangle,
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
                                ParseType: Rectangle,
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
                                ParseType: Rectangle,
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
                                ParseType: ContentPresenter,
                                Name: "contentPresenter",
                                Props: {
                                    ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
                                    HorizontalAlignment: new TemplateBindingMarkup("HorizontalContentAlignment"),
                                    Margin: new TemplateBindingMarkup("Padding"),
                                    VerticalAlignment: new TemplateBindingMarkup("VerticalContentAlignment")
                                },
                                Content: new TemplateBindingMarkup("Content")
                            }]

                        })
                    }
                }]

            }
        },
        {
            Key: "DefaultToolTipStyle", Value: {
                ParseType: Style,
                Props: {
                    TargetType: ToolTip
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToolTip, "Background"),
                        Value: new StaticResourceMarkup("ControlBackgroundBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToolTip, "Foreground"),
                        Value: new StaticResourceMarkup("WhiteBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToolTip, "Padding"),
                        Value: "3,0,3,0"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToolTip, "BorderThickness"),
                        Value: "1"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToolTip, "BorderBrush"),
                        Value: new StaticResourceMarkup("ItemSelectedBrush")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ToolTip, "Template"),
                        Value: new ControlTemplate(ToolTip, {
                            ParseType: Border,
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
                                    ParseType: VisualStateGroup,
                                    Name: "OpenStates",
                                    Props: {
                                        Transitions: [
                                        {
                                            ParseType: VisualTransition,
                                            Props: {
                                                From: "Open",
                                                GeneratedDuration: Duration.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 300)),
                                                To: "Closed"
                                            }
                                        }]

                                    },
                                    Children: [
                                    {
                                        ParseType: VisualState,
                                        Name: "Closed",
                                        Content: {
                                            ParseType: Storyboard,
                                            Children: [
                                            {
                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                    ParseType: EasingDoubleKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 400)),
                                                        Value: 0
                                                    }
                                                }]

                                            }]

                                        }
                                    },
                                    {
                                        ParseType: VisualState,
                                        Name: "Open",
                                        Content: {
                                            ParseType: Storyboard,
                                            Children: [
                                            {
                                                ParseType: DoubleAnimationUsingKeyFrames,
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
                                                    ParseType: EasingDoubleKeyFrame,
                                                    Props: {
                                                        KeyTime: KeyTime.CreateTimeSpan(TimeSpan.FromArgs(0, 0, 0, 0, 300)),
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
                                ParseType: Border,
                                Props: {
                                    Padding: new TemplateBindingMarkup("Padding"),
                                    Resources: {
                                        ParseType: ResourceDictionary,
                                        Children: [
                                        {
                                            Key: "Visible State", Value: {
                                                ParseType: Storyboard
                                            }
                                        },
                                        {
                                            Key: "Normal State", Value: {
                                                ParseType: Storyboard
                                            }
                                        }]
                                    },
                                    Background: new StaticResourceMarkup("BlackBrush")
                                },
                                Content: {
                                    ParseType: ContentPresenter,
                                    Props: {
                                        Cursor: new TemplateBindingMarkup("Cursor"),
                                        ContentTemplate: new TemplateBindingMarkup("ContentTemplate"),
                                        Margin: new TemplateBindingMarkup("Padding")
                                    },
                                    Content: new TemplateBindingMarkup("Content")
                                }
                            }
                        })
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
                    TargetType: ContentControl
                },
                Children: [
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ContentControl, "IsEnabled"),
                        Value: "true"
                    }
                },
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
                        Property: DependencyProperty.GetDependencyProperty(ContentControl, "Cursor"),
                        Value: "Arrow"
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ContentControl, "FontFamily"),
                        Value: new StaticResourceMarkup("ContentFontFamily")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ContentControl, "FontSize"),
                        Value: new StaticResourceMarkup("ContentFontSize")
                    }
                },
                {
                    ParseType: Setter,
                    Props: {
                        Property: DependencyProperty.GetDependencyProperty(ContentControl, "Template"),
                        Value: new ControlTemplate(ContentControl, {
                            ParseType: ContentPresenter,
                            Props: {
                                ContentTemplate: new TemplateBindingMarkup("ContentTemplate")
                            },
                            Content: new TemplateBindingMarkup("Content")
                        })
                    }
                }]

            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: Button,
                    BasedOn: new StaticResourceMarkup("DefaultButtonStyle")
                }
            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: HyperlinkButton,
                    BasedOn: new StaticResourceMarkup("DefaultHyperlinkButtonStyle")
                }
            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: TextBox,
                    BasedOn: new StaticResourceMarkup("DefaultTextBoxStyle")
                }
            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: ComboBox,
                    BasedOn: new StaticResourceMarkup("DefaultComboBoxStyle")
                }
            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: ComboBoxItem,
                    BasedOn: new StaticResourceMarkup("DefaultComboBoxItemStyle")
                }
            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: TextBlock,
                    BasedOn: new StaticResourceMarkup("DefaultTextBlockStyle")
                }
            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: ScrollBar,
                    BasedOn: new StaticResourceMarkup("DefaultScrollBarStyle")
                }
            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: ScrollViewer,
                    BasedOn: new StaticResourceMarkup("DefaultScrollViewerStyle")
                }
            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: ListBox,
                    BasedOn: new StaticResourceMarkup("DefaultListBoxStyle")
                }
            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: ListBoxItem,
                    BasedOn: new StaticResourceMarkup("DefaultListBoxItemStyle")
                }
            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: CheckBox,
                    BasedOn: new StaticResourceMarkup("DefaultCheckBoxStyle")
                }
            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: PasswordBox,
                    BasedOn: new StaticResourceMarkup("DefaultPasswordBoxStyle")
                }
            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: ProgressBar,
                    BasedOn: new StaticResourceMarkup("DefaultProgressBarStyle")
                }
            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: RadioButton,
                    BasedOn: new StaticResourceMarkup("DefaultRadioButtonStyle")
                }
            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: RepeatButton,
                    BasedOn: new StaticResourceMarkup("DefaultRepeatButtonStyle")
                }
            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: Slider,
                    BasedOn: new StaticResourceMarkup("DefaultSliderStyle")
                }
            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: ToggleButton,
                    BasedOn: new StaticResourceMarkup("DefaultToggleButtonStyle")
                }
            }
        },
        {
            Value: {
                ParseType: Style,
                Props: {
                    TargetType: ToolTip,
                    BasedOn: new StaticResourceMarkup("DefaultToolTipStyle")
                }
            }
        }]
    };
    var rd = new Fayde.ResourceDictionary();
    Fayde.JsonParser.ParseResourceDictionary(rd, json);
    return rd;
};