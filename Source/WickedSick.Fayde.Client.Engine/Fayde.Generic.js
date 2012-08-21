/// <reference path="Fayde.js"/>

App.GetGenericResourceDictionary = function () {
    var json = {
        Type: ResourceDictionary,
        Children: [
        {
            Type: Color,
            Key: "HighlightDarkColor",
            Props: {
                HexString: "#FF119EDA"
            }
        },
        {
            Type: Color,
            Key: "HighlightLightColor",
            Props: {
                HexString: "#FFB2E0F4"
            }
        },
        {
            Type: Color,
            Key: "AccentColor",
            Props: {
                HexString: "#CC119EDA"
            }
        },
        {
            Type: Color,
            Key: "AccentColor2",
            Props: {
                HexString: "#99119EDA"
            }
        },
        {
            Type: Color,
            Key: "AccentColor3",
            Props: {
                HexString: "#66119EDA"
            }
        },
        {
            Type: Color,
            Key: "AccentColor4",
            Props: {
                HexString: "#33119EDA"
            }
        },
        {
            Type: Color,
            Key: "BlackColor",
            Props: {
                HexString: "#FF000000"
            }
        },
        {
            Type: Color,
            Key: "WhiteColor",
            Props: {
                HexString: "#FFFFFFFF"
            }
        },
        {
            Type: Color,
            Key: "Gray1",
            Props: {
                HexString: "#FFCCCCCC"
            }
        },
        {
            Type: Color,
            Key: "Gray2",
            Props: {
                HexString: "#FF7F7F7F"
            }
        },
        {
            Type: Color,
            Key: "Gray3",
            Props: {
                HexString: "#FF333333"
            }
        },
        {
            Type: Color,
            Key: "Gray4",
            Props: {
                HexString: "#FFB9B9B9"
            }
        },
        {
            Type: Color,
            Key: "Gray5",
            Props: {
                HexString: "#FFD8D8D9"
            }
        },
        {
            Type: Color,
            Key: "Gray6",
            Props: {
                HexString: "#FF9D9D9D"
            }
        },
        {
            Type: Color,
            Key: "Gray7",
            Props: {
                HexString: "#FFF7F7F7"
            }
        },
        {
            Type: Color,
            Key: "Gray8",
            Props: {
                HexString: "#FFE0E0E0"
            }
        },
        {
            Type: Color,
            Key: "Gray9",
            Props: {
                HexString: "#FFA59F93"
            }
        },
        {
            Type: Color,
            Key: "Gray10",
            Props: {
                HexString: "#7FFFFFFF"
            }
        },
        {
            Type: Color,
            Key: "Gray11",
            Props: {
                HexString: "#7FA9A9A9"
            }
        },
        {
            Type: Color,
            Key: "Gray12",
            Props: {
                HexString: "#A5F7F7F7"
            }
        },
        {
            Type: Color,
            Key: "Gray13",
            Props: {
                HexString: "#5EC9C9C9"
            }
        },
        {
            Type: Color,
            Key: "TextBoxText",
            Props: {
                HexString: "#FF414141"
            }
        },
        {
            Type: Color,
            Key: "NormalForegroundColor",
            Props: {
                HexString: "#FF000000"
            }
        },
        {
            Type: Color,
            Key: "HoverForegroundColor",
            Props: {
                HexString: "#FFFFFFFF"
            }
        },
        {
            Type: Color,
            Key: "BaseColor2",
            Props: {
                HexString: "#FFFFFFFF"
            }
        },
        {
            Type: Color,
            Key: "BaseColor5",
            Props: {
                HexString: "#FFBABABA"
            }
        },
        {
            Type: Color,
            Key: "BaseColor3",
            Props: {
                HexString: "#FF303030"
            }
        },
        {
            Type: Color,
            Key: "TransparentWhiteColor",
            Props: {
                HexString: "#00FFFFFF"
            }
        },
        {
            Type: Color,
            Key: "TransparentWhiteLightColor",
            Props: {
                HexString: "#19FFFFFF"
            }
        },
        {
            Type: Color,
            Key: "TransparentLightestColor",
            Props: {
                HexString: "#34FFFFFF"
            }
        },
        {
            Type: Color,
            Key: "TransparentLightLightColor",
            Props: {
                HexString: "#A5FFFFFF"
            }
        },
        {
            Type: Color,
            Key: "TransparentLightColor",
            Props: {
                HexString: "#D8FFFFFF"
            }
        },
        {
            Type: Color,
            Key: "TransparentBlackColor",
            Props: {
                HexString: "#00000000"
            }
        },
        {
            Type: Color,
            Key: "TransparentDarkColor",
            Props: {
                HexString: "#3F000000"
            }
        },
        {
            Type: Color,
            Key: "TransparentDarkDarkColor",
            Props: {
                HexString: "#59000000"
            }
        },
        {
            Type: Color,
            Key: "TransparentDarkDarkDarkColor",
            Props: {
                HexString: "#99000000"
            }
        },
        {
            Type: Color,
            Key: "TransparentDarkestColor",
            Props: {
                HexString: "#CC000000"
            }
        },
        {
            Type: Color,
            Key: "ValidationColor1",
            Props: {
                HexString: "#052A2E31"
            }
        },
        {
            Type: Color,
            Key: "ValidationColor2",
            Props: {
                HexString: "#152A2E31"
            }
        },
        {
            Type: Color,
            Key: "ValidationColor3",
            Props: {
                HexString: "#252A2E31"
            }
        },
        {
            Type: Color,
            Key: "ValidationColor4",
            Props: {
                HexString: "#352A2E31"
            }
        },
        {
            Type: Color,
            Key: "ValidationColor5",
            Props: {
                HexString: "#FFDC000C"
            }
        },
        {
            Type: Color,
            Key: "ValidationSummaryColor1",
            Props: {
                HexString: "#FFDC020D"
            }
        },
        {
            Type: Color,
            Key: "ValidationSummaryColor2",
            Props: {
                HexString: "#FFCA000C"
            }
        },
        {
            Type: Color,
            Key: "ValidationSummaryColor3",
            Props: {
                HexString: "#FFFF9298"
            }
        },
        {
            Type: Color,
            Key: "ValidationSummaryColor4",
            Props: {
                HexString: "#FFFDC8C8"
            }
        },
        {
            Type: Color,
            Key: "ValidationSummaryColor5",
            Props: {
                HexString: "#DDD43940"
            }
        },
        {
            Type: Color,
            Key: "ValidationSummaryFillColor1",
            Props: {
                HexString: "#59F7D8DB"
            }
        },
        {
            Type: Color,
            Key: "ValidationSummaryFillColor2",
            Props: {
                HexString: "#FFF7D8DB"
            }
        },
        {
            Type: Color,
            Key: "ControlsValidationColor",
            Props: {
                HexString: "#FFDB000C"
            }
        },
        {
            Type: Color,
            Key: "ProgressIndeterminateColor1",
            Props: {
                HexString: "#33878787"
            }
        },
        {
            Type: Color,
            Key: "ProgressIndeterminateColor2",
            Props: {
                HexString: "#33959595"
            }
        },
        {
            Type: Color,
            Key: "ProgressIndeterminateColor3",
            Props: {
                HexString: "#4C000000"
            }
        },
        {
            Type: Color,
            Key: "ProgressIndeterminateColor4",
            Props: {
                HexString: "#4C000000"
            }
        },
        {
            Type: Color,
            Key: "PageOverlayColor",
            Props: {
                HexString: "#7F000000"
            }
        },
        {
            Type: Color,
            Key: "RatingStarsColor",
            Props: {
                HexString: "#F6FF9900"
            }
        },
        {
            Type: Color,
            Key: "RatingMouseOverColor",
            Props: {
                HexString: "#F6FDFF70"
            }
        },
        {
            Type: Color,
            Key: "TimeHintIconColor1",
            Props: {
                HexString: "#F6CAA709"
            }
        },
        {
            Type: Color,
            Key: "TimeHintIconColor2",
            Props: {
                HexString: "#F3F7F34F"
            }
        },
        {
            Type: Color,
            Key: "TimeHintIconColor3",
            Props: {
                HexString: "#E7CAA709"
            }
        },
        {
            Type: Color,
            Key: "TimeHintIconColor4",
            Props: {
                HexString: "#E7967C07"
            }
        },
        {
            Type: Color,
            Key: "TimeHintIconColor5",
            Props: {
                HexString: "#E7625106"
            }
        },
        {
            Type: Color,
            Key: "TimeHintIconColor6",
            Props: {
                HexString: "#FB8F8873"
            }
        },
        {
            Type: Color,
            Key: "TimeHintIconColor7",
            Props: {
                HexString: "#F6271A47"
            }
        },
        {
            Type: Color,
            Key: "TimeHintIconColor8",
            Props: {
                HexString: "#E7271A47"
            }
        },
        {
            Type: Color,
            Key: "TimeHintIconColor9",
            Props: {
                HexString: "#9A89782B"
            }
        },
        {
            Type: Color,
            Key: "TimeHintIconColor10",
            Props: {
                HexString: "#4DEBD60F"
            }
        },
        {
            Type: Color,
            Key: "TimeHintIconColor11",
            Props: {
                HexString: "#FBF6EC20"
            }
        },
        {
            Type: Color,
            Key: "TimeHintIconColor12",
            Props: {
                HexString: "#FF1B1B54"
            }
        },
        {
            Type: Color,
            Key: "TimeHintIconColor13",
            Props: {
                HexString: "#FF1C1C50"
            }
        },
        {
            Type: Color,
            Key: "OKButtonIconColor1",
            Props: {
                HexString: "#FF67CA0A"
            }
        },
        {
            Type: Color,
            Key: "OKButtonIconColor2",
            Props: {
                HexString: "#FF498C38"
            }
        },
        {
            Type: Color,
            Key: "OKButtonIconColor3",
            Props: {
                HexString: "#FF29EE5B"
            }
        },
        {
            Type: Color,
            Key: "CancelButtonIconColor1",
            Props: {
                HexString: "#FFEA7525"
            }
        },
        {
            Type: Color,
            Key: "CancelButtonIconColor2",
            Props: {
                HexString: "#FFDA715B"
            }
        },
        {
            Type: Color,
            Key: "CancelButtonIconColor3",
            Props: {
                HexString: "#FFB72909"
            }
        },
        {
            Type: Color,
            Key: "ChartBrush1",
            Props: {
                HexString: "#FF0097FC"
            }
        },
        {
            Type: Color,
            Key: "ChartBrush2",
            Props: {
                HexString: "#FF70BBED"
            }
        },
        {
            Type: Color,
            Key: "ChartBrush3",
            Props: {
                HexString: "#FF70BBED"
            }
        },
        {
            Type: Color,
            Key: "ChartBrush4",
            Props: {
                HexString: "#FF4556BA"
            }
        },
        {
            Type: Color,
            Key: "ChartBrush5",
            Props: {
                HexString: "#FFC84BA4"
            }
        },
        {
            Type: Color,
            Key: "ChartBrush6",
            Props: {
                HexString: "#FF477ABE"
            }
        },
        {
            Type: Color,
            Key: "ChartBrush7",
            Props: {
                HexString: "#FF6644B7"
            }
        },
        {
            Type: Color,
            Key: "ChartBrush8",
            Props: {
                HexString: "#FFA045BA"
            }
        },
        {
            Type: Color,
            Key: "ChartBrush9",
            Props: {
                HexString: "#FF73C348"
            }
        },
        {
            Type: Color,
            Key: "ChartBrush10",
            Props: {
                HexString: "#FFDD5279"
            }
        },
        {
            Type: Color,
            Key: "ChartBrush11",
            Props: {
                HexString: "#FF4999C4"
            }
        },
        {
            Type: Color,
            Key: "ChartBrush12",
            Props: {
                HexString: "#FFEC8B58"
            }
        },
        {
            Type: Color,
            Key: "ChartBrush13",
            Props: {
                HexString: "#FFECA058"
            }
        },
        {
            Type: Color,
            Key: "ChartBrush14",
            Props: {
                HexString: "#FFEC6558"
            }
        },
        {
            Type: Color,
            Key: "ChartBrush15",
            Props: {
                HexString: "#FFEC8B58"
            }
        },
        {
            Type: Color,
            Key: "ChartBrush16",
            Props: {
                HexString: "#FFECA058"
            }
        },
        {
            Type: SolidColorBrush,
            Key: "ControlBackgroundBrush",
            Props: {
                Color: new StaticResourceMarkup("WhiteColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "WhiteBrush",
            Props: {
                Color: new StaticResourceMarkup("WhiteColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "BlackBrush",
            Props: {
                Color: new StaticResourceMarkup("BlackColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TextBrush",
            Props: {
                Color: new StaticResourceMarkup("BlackColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "LabelTextBrush",
            Props: {
                Color: new StaticResourceMarkup("BlackColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "WhiteColorBrush",
            Props: {
                Color: new StaticResourceMarkup("WhiteColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "BlackColorBrush",
            Props: {
                Color: new StaticResourceMarkup("BlackColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "HighlightBrush",
            Props: {
                Color: new StaticResourceMarkup("HighlightDarkColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "HighlightLightBrush",
            Props: {
                Color: new StaticResourceMarkup("HighlightLightColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "NavigationBorderBrush",
            Props: {
                Color: {
                    Type: Color,
                    Props: {
                        HexString: "#FF9D9492"
                    }
                }
            }
        },
        {
            Type: SolidColorBrush,
            Key: "NavigationForegroundBrush",
            Props: {
                Color: new StaticResourceMarkup("BlackColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "PageBorderBrush",
            Props: {
                Color: {
                    Type: Color,
                    Props: {
                        HexString: "#FFB2B2B2"
                    }
                }
            }
        },
        {
            Type: SolidColorBrush,
            Key: "BodyTextColorBrush",
            Props: {
                Color: {
                    Type: Color,
                    Props: {
                        HexString: "#FF313131"
                    }
                }
            }
        },
        {
            Type: SolidColorBrush,
            Key: "ControlsDisabledBrush",
            Props: {
                Color: new StaticResourceMarkup("TransparentLightLightColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "ReadOnlyBrush",
            Props: {
                Color: new StaticResourceMarkup("TransparentLightestColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "DisabledForegroundBrush",
            Props: {
                Color: {
                    Type: Color,
                    Props: {
                        HexString: "#FFAAAAAA"
                    }
                }
            }
        },
        {
            Type: SolidColorBrush,
            Key: "DisabledControlBrush",
            Props: {
                Color: {
                    Type: Color,
                    Props: {
                        HexString: "#FFAAAAAA"
                    }
                }
            }
        },
        {
            Type: SolidColorBrush,
            Key: "DisabledWhiteColorBrush",
            Props: {
                Color: new StaticResourceMarkup("WhiteColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "RatingStarsBrush",
            Props: {
                Color: new StaticResourceMarkup("RatingStarsColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "RatingMouseOverBrush",
            Props: {
                Color: new StaticResourceMarkup("RatingMouseOverColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "PageOverlayBrush",
            Props: {
                Color: new StaticResourceMarkup("PageOverlayColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "FuzzBrush1",
            Props: {
                Color: {
                    Type: Color,
                    Props: {
                        HexString: "#1E000000"
                    }
                }
            }
        },
        {
            Type: SolidColorBrush,
            Key: "FuzzBrush2",
            Props: {
                Color: {
                    Type: Color,
                    Props: {
                        HexString: "#14000000"
                    }
                }
            }
        },
        {
            Type: SolidColorBrush,
            Key: "FuzzBrush3",
            Props: {
                Color: {
                    Type: Color,
                    Props: {
                        HexString: "Black"
                    }
                }
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TransparentWhiteBrush",
            Props: {
                Color: new StaticResourceMarkup("TransparentWhiteColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TransparentWhiteLightBrush",
            Props: {
                Color: new StaticResourceMarkup("TransparentWhiteColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TransparentLightestBrush",
            Props: {
                Color: new StaticResourceMarkup("TransparentLightestColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TransparentLightLightBrush",
            Props: {
                Color: new StaticResourceMarkup("TransparentLightLightColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TransparentBlackBrush",
            Props: {
                Color: new StaticResourceMarkup("TransparentBlackColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TransparentDarkBrush",
            Props: {
                Color: new StaticResourceMarkup("TransparentDarkColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TransparentDarkDarkDarkBrush",
            Props: {
                Color: new StaticResourceMarkup("TransparentDarkDarkDarkColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "GrayBrush1",
            Props: {
                Color: new StaticResourceMarkup("Gray1")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "GrayBrush2",
            Props: {
                Color: new StaticResourceMarkup("Gray2")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "GrayBrush3",
            Props: {
                Color: new StaticResourceMarkup("Gray3")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "GrayBrush4",
            Props: {
                Color: new StaticResourceMarkup("Gray4")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "GrayBrush5",
            Props: {
                Color: new StaticResourceMarkup("Gray5")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "GrayBrush6",
            Props: {
                Color: new StaticResourceMarkup("Gray6")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "GrayBrush7",
            Props: {
                Color: new StaticResourceMarkup("Gray7")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "GrayBrush8",
            Props: {
                Color: new StaticResourceMarkup("Gray8")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "GrayBrush9",
            Props: {
                Color: new StaticResourceMarkup("Gray9")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "GrayBrush10",
            Props: {
                Color: new StaticResourceMarkup("Gray10")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "GrayBrush11",
            Props: {
                Color: new StaticResourceMarkup("Gray11")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "GrayBrush12",
            Props: {
                Color: new StaticResourceMarkup("Gray12")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "GrayBrush13",
            Props: {
                Color: new StaticResourceMarkup("Gray13")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "HoverHyperlinkForegroundBrush",
            Props: {
                Color: new StaticResourceMarkup("BlackColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "HoverHyperlinkBackgroundBrush",
            Props: {
                Color: new StaticResourceMarkup("WhiteColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TextBoxBorderBrush",
            Props: {
                Color: new StaticResourceMarkup("Gray1")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "ControlBorderBrush",
            Props: {
                Color: new StaticResourceMarkup("Gray1")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TextBoxMouseOverBorderBrush",
            Props: {
                Color: new StaticResourceMarkup("HighlightDarkColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TextBoxMouseOverInnerBorderBrush",
            Props: {
                Color: new StaticResourceMarkup("HighlightLightColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "CheckBoxBrush",
            Props: {
                Color: new StaticResourceMarkup("Gray2")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "CheckBoxMouseOverBrush",
            Props: {
                Color: new StaticResourceMarkup("Gray3")
            }
        },
        {
            Type: LinearGradientBrush,
            Key: "CheckBoxBackgroundBrush",
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

        },
        {
            Type: LinearGradientBrush,
            Key: "ApplicationNameBrush",
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

        },
        {
            Type: SolidColorBrush,
            Key: "ThumbBrush",
            Props: {
                Color: new StaticResourceMarkup("Gray4")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "ItemSelectedBrush",
            Props: {
                Color: new StaticResourceMarkup("Gray5")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "SliderTrackBrush",
            Props: {
                Color: new StaticResourceMarkup("Gray6")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "NormalBrush",
            Props: {
                Color: new StaticResourceMarkup("Gray7")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "ComboBoxPopupBrush",
            Props: {
                Color: new StaticResourceMarkup("Gray9")
            }
        },
        {
            Type: LinearGradientBrush,
            Key: "BrandingBrush",
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

        },
        {
            Type: DropShadowEffect,
            Key: "DropShadowBrush",
            Props: {
                Direction: 330,
                Opacity: 0.3,
                ShadowDepth: 0,
                BlurRadius: 6
            }
        },
        {
            Type: SolidColorBrush,
            Key: "WindowBackgroundBrush",
            Props: {
                Color: new StaticResourceMarkup("WhiteColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "SeperatorBrush",
            Props: {
                Color: {
                    Type: Color,
                    Props: {
                        HexString: "#FFC4C4C5"
                    }
                }
            }
        },
        {
            Type: SolidColorBrush,
            Key: "ControlsValidationBrush",
            Props: {
                Color: new StaticResourceMarkup("ControlsValidationColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "ValidationBrush1",
            Props: {
                Color: new StaticResourceMarkup("ValidationColor1")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "ValidationBrush2",
            Props: {
                Color: new StaticResourceMarkup("ValidationColor2")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "ValidationBrush3",
            Props: {
                Color: new StaticResourceMarkup("ValidationColor3")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "ValidationBrush4",
            Props: {
                Color: new StaticResourceMarkup("ValidationColor4")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "ValidationBrush5",
            Props: {
                Color: new StaticResourceMarkup("ValidationColor5")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "ValidationSummaryBrush1",
            Props: {
                Color: new StaticResourceMarkup("ValidationSummaryColor1")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "ValidationSummaryBrush2",
            Props: {
                Color: new StaticResourceMarkup("ValidationSummaryColor2")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "ValidationSummaryBrush3",
            Props: {
                Color: new StaticResourceMarkup("ValidationSummaryColor3")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "ValidationSummaryBrush4",
            Props: {
                Color: new StaticResourceMarkup("ValidationSummaryColor4")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "ValidationSummaryBrush5",
            Props: {
                Color: new StaticResourceMarkup("ValidationSummaryColor5")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "ValidationSummaryFillBrush1",
            Props: {
                Color: new StaticResourceMarkup("ValidationSummaryFillColor1")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "ValidationSummaryFillBrush2",
            Props: {
                Color: new StaticResourceMarkup("ValidationSummaryFillColor2")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "ValidationSummaryDisabledBrush",
            Props: {
                Color: new StaticResourceMarkup("TransparentLightLightColor")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TimeHintIconBrush1",
            Props: {
                Color: new StaticResourceMarkup("TimeHintIconColor1")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TimeHintIconBrush2",
            Props: {
                Color: new StaticResourceMarkup("TimeHintIconColor2")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TimeHintIconBrush3",
            Props: {
                Color: new StaticResourceMarkup("TimeHintIconColor3")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TimeHintIconBrush4",
            Props: {
                Color: new StaticResourceMarkup("TimeHintIconColor4")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TimeHintIconBrush5",
            Props: {
                Color: new StaticResourceMarkup("TimeHintIconColor5")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TimeHintIconBrush6",
            Props: {
                Color: new StaticResourceMarkup("TimeHintIconColor6")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TimeHintIconBrush7",
            Props: {
                Color: new StaticResourceMarkup("TimeHintIconColor7")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TimeHintIconBrush8",
            Props: {
                Color: new StaticResourceMarkup("TimeHintIconColor8")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TimeHintIconBrush9",
            Props: {
                Color: new StaticResourceMarkup("TimeHintIconColor9")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TimeHintIconBrush10",
            Props: {
                Color: new StaticResourceMarkup("TimeHintIconColor10")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TimeHintIconBrush11",
            Props: {
                Color: new StaticResourceMarkup("TimeHintIconColor11")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TimeHintIconBrush12",
            Props: {
                Color: new StaticResourceMarkup("TimeHintIconColor12")
            }
        },
        {
            Type: SolidColorBrush,
            Key: "TimeHintIconBrush13",
            Props: {
                Color: new StaticResourceMarkup("TimeHintIconColor13")
            }
        },
        {
            Type: FontFamily,
            Key: "HeaderFontFamily",
            Props: {
                FamilyNames: "Segoe UI Light, Lucida Sans Unicode, Verdana"
            }
        },
        {
            Type: FontFamily,
            Key: "ContentFontFamily",
            Props: {
                FamilyNames: "Segoe UI, Lucida Sans Unicode, Verdana"
            }
        },
        {
            Type: Number,
            Key: "ApplicationNameFontSize",
            Value: 50
        },
        {
            Type: Number,
            Key: "HeaderFontSize",
            Value: 21.333
        },
        {
            Type: Number,
            Key: "NavigationFontSize",
            Value: 28
        },
        {
            Type: Number,
            Key: "ContentFontSize",
            Value: 14
        },
        {
            Type: Number,
            Key: "HyperlinkFontSize",
            Value: 14
        },
        {
            Type: Number,
            Key: "LabelFontSize",
            Value: 12
        },
        {
            Type: Number,
            Key: "ControlTitleFontSize",
            Value: 16
        },
        {
            Type: Number,
            Key: "ControlTitleBigFontSize",
            Value: 18
        },
        {
            Type: Number,
            Key: "ControlContentFontSize",
            Value: 10
        },
        {
            Type: Style,
            Key: "SearchButtonStyle",
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
                                                    Value: new _PropertyPath("(SolidColorBrush.Color)")

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
                                                    Value: new _PropertyPath("(Panel.Background).(SolidColorBrush.Color)")

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
                                                    Value: new _PropertyPath("(Panel.Background).(SolidColorBrush.Color)")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("Visibility")

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
                                    TextDecorations: TextDecorations.Underline,
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

        },
        {
            Type: Style,
            Key: "ControlLabelStyle",
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

        },
        {
            Type: ControlTemplate,
            Key: "ValidationToolTipTemplate",
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
                                    GeneratedDuration: new Duration(new TimeSpan(0, 0, 0, 0, 2)),
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
                                            Value: new _PropertyPath("X")

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
                                                KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 2)),
                                                Value: 0
                                            }
                                        }]

                                    },
                                    {
                                        Type: DoubleAnimationUsingKeyFrames,
                                        AttachedProps: [{
                                            Owner: Storyboard,
                                            Prop: "TargetProperty",
                                            Value: new _PropertyPath("Opacity")

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
                                                KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 2)),
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
                                        Value: new _PropertyPath("Opacity")

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
                                            KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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
                                        Value: new _PropertyPath("X")

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
                                            KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
                                            Value: 0
                                        }
                                    }]

                                },
                                {
                                    Type: DoubleAnimationUsingKeyFrames,
                                    AttachedProps: [{
                                        Owner: Storyboard,
                                        Prop: "TargetProperty",
                                        Value: new _PropertyPath("Opacity")

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
                                            KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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
                            Text: new BindingMarkup({ Mode: BindingMode.OneTime, Path: "(Validation.Errors)[0].ErrorContent" }),
                            UseLayoutRounding: false
                        }
                    }
                }]

            }
        },
        {
            Type: ControlTemplate,
            Key: "CommonValidationToolTipTemplate",
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
                                    GeneratedDuration: new Duration(new TimeSpan(0, 0, 0, 0, 2)),
                                    To: "Open"
                                },
                                Content: {
                                    Type: Storyboard,
                                    Children: [
                                    {
                                        Type: DoubleAnimation,
                                        Props: {
                                            Duration: new Duration(new TimeSpan(0, 0, 0, 0, 2)),
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
                                            Value: new _PropertyPath("X")

                                        }
                                        ]
                                    },
                                    {
                                        Type: DoubleAnimation,
                                        Props: {
                                            Duration: new Duration(new TimeSpan(0, 0, 0, 0, 2)),
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
                                            Value: new _PropertyPath("Opacity")

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
                                        Value: new _PropertyPath("Opacity")

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
                                        Value: new _PropertyPath("X")

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
                            Text: new BindingMarkup({ Mode: BindingMode.OneTime, Path: "(Validation.Errors)[0].Exception.Message" }),
                            TextWrapping: TextWrapping.Wrap
                        }
                    }
                }]

            }
        },
        {
            Type: Style,
            Key: "DefaultButtonStyle",
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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("Opacity")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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

        },
        {
            Type: Style,
            Key: "DefaultHyperlinkButtonStyle",
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
                                                    Value: new _PropertyPath("Visibility")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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
                                                    Value: new _PropertyPath("Color")

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
                                                    Value: new _PropertyPath("Visibility")

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
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("Visibility")

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
                                                    To: 1,
                                                    Duration: new Duration(new TimeSpan(0, 0, 0, 0, 0))
                                                },
                                                AttachedProps: [{
                                                    Owner: Storyboard,
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("Opacity")

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
                                    TextDecorations: TextDecorations.Underline,
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

        },
        {
            Type: Style,
            Key: "DefaultTextBoxStyle",
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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("Opacity")

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
                                                    Value: new _PropertyPath("Opacity")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("Visibility")

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
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("Visibility")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
                                                        Value: Visibility.Visible
                                                    }
                                                }]

                                            },
                                            {
                                                Type: ObjectAnimationUsingKeyFrames,
                                                AttachedProps: [{
                                                    Owner: Storyboard,
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("IsOpen")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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
                                            DataContext: new BindingMarkup({ Mode: BindingMode.OneTime }),
                                            Placement: PlacementMode.Right,
                                            PlacementTarget: new BindingMarkup({ Mode: BindingMode.OneTime }),
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
                                                                Value: new _PropertyPath("IsHitTestVisible")

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
                                                                    KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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

        },
        {
            Type: Style,
            Key: "DefaultComboBoxStyle",
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
                                                                            Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                                            Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                                            Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                                                KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 1)),
                                                                                Value: 1
                                                                            }
                                                                        }]

                                                                    },
                                                                    {
                                                                        Type: DoubleAnimationUsingKeyFrames,
                                                                        AttachedProps: [{
                                                                            Owner: Storyboard,
                                                                            Prop: "TargetProperty",
                                                                            Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                                                KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 1)),
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
                                                                            Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                                            Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                Type: DoubleAnimationUsingKeyFrames,
                                                AttachedProps: [{
                                                    Owner: Storyboard,
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
                                                        Value: 1
                                                    }
                                                }]

                                            },
                                            {
                                                Type: DoubleAnimationUsingKeyFrames,
                                                AttachedProps: [{
                                                    Owner: Storyboard,
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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
                                                    Value: new _PropertyPath("(UIElement.Visibility)")

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
                                                    Value: new _PropertyPath("Visibility")

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
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("Visibility")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
                                                        Value: Visibility.Visible
                                                    }
                                                }]

                                            },
                                            {
                                                Type: ObjectAnimationUsingKeyFrames,
                                                AttachedProps: [{
                                                    Owner: Storyboard,
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("IsOpen")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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
                                            DataContext: new BindingMarkup({ Mode: BindingMode.OneTime }),
                                            Placement: PlacementMode.Right,
                                            PlacementTarget: new BindingMarkup({ Mode: BindingMode.OneTime }),
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
                                                                Value: new _PropertyPath("IsHitTestVisible")

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
                                                                    KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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

        },
        {
            Type: Style,
            Key: "DefaultComboBoxItemStyle",
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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 1)),
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
                                                    Value: new _PropertyPath("Color")

                                                }
                                                ],
                                                Children: [
                                                {
                                                    Type: EasingColorKeyFrame,
                                                    Props: {
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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
                                                    Value: new _PropertyPath("Opacity")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 1)),
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
                                                    Value: new _PropertyPath("Color")

                                                }
                                                ],
                                                Children: [
                                                {
                                                    Type: EasingColorKeyFrame,
                                                    Props: {
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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

        },
        {
            Type: Style,
            Key: "DefaultTextBlockStyle",
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

        },
        {
            Type: Style,
            Key: "DefaultScrollBarStyle",
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
                                                            Type: DoubleAnimationUsingKeyFrames,
                                                            AttachedProps: [{
                                                                Owner: Storyboard,
                                                                Prop: "TargetProperty",
                                                                Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                                    KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 1)),
                                                                    Value: 1
                                                                }
                                                            }]

                                                        },
                                                        {
                                                            Type: DoubleAnimationUsingKeyFrames,
                                                            AttachedProps: [{
                                                                Owner: Storyboard,
                                                                Prop: "TargetProperty",
                                                                Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                                    KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 1)),
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
                                                                Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                                    KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 1)),
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
                                                            Type: DoubleAnimationUsingKeyFrames,
                                                            AttachedProps: [{
                                                                Owner: Storyboard,
                                                                Prop: "TargetProperty",
                                                                Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                                    KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 1)),
                                                                    Value: 1
                                                                }
                                                            }]

                                                        },
                                                        {
                                                            Type: DoubleAnimationUsingKeyFrames,
                                                            AttachedProps: [{
                                                                Owner: Storyboard,
                                                                Prop: "TargetProperty",
                                                                Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                                    KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 1)),
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
                                                                Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                                    KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 1)),
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
                                                            Type: DoubleAnimationUsingKeyFrames,
                                                            AttachedProps: [{
                                                                Owner: Storyboard,
                                                                Prop: "TargetProperty",
                                                                Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                                    KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 1)),
                                                                    Value: 1
                                                                }
                                                            }]

                                                        },
                                                        {
                                                            Type: DoubleAnimationUsingKeyFrames,
                                                            AttachedProps: [{
                                                                Owner: Storyboard,
                                                                Prop: "TargetProperty",
                                                                Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                                    KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 1)),
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
                                                                Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                                    KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 1)),
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
                                                            Type: DoubleAnimationUsingKeyFrames,
                                                            AttachedProps: [{
                                                                Owner: Storyboard,
                                                                Prop: "TargetProperty",
                                                                Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                                    KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 1)),
                                                                    Value: 1
                                                                }
                                                            }]

                                                        },
                                                        {
                                                            Type: DoubleAnimationUsingKeyFrames,
                                                            AttachedProps: [{
                                                                Owner: Storyboard,
                                                                Prop: "TargetProperty",
                                                                Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                                    KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 1)),
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
                                                                Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                                    KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 1)),
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
                                                            Type: DoubleAnimationUsingKeyFrames,
                                                            AttachedProps: [{
                                                                Owner: Storyboard,
                                                                Prop: "TargetProperty",
                                                                Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                                    KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 1)),
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
                                                                Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                                    KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 1)),
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
                                                                Value: new _PropertyPath("Opacity")

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
                                                                    KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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
                                                            Type: DoubleAnimationUsingKeyFrames,
                                                            AttachedProps: [{
                                                                Owner: Storyboard,
                                                                Prop: "TargetProperty",
                                                                Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                                    KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 1)),
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
                                                                Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                                    KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 1)),
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
                                                                Value: new _PropertyPath("Opacity")

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
                                                                    KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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
                                                Type: DoubleAnimationUsingKeyFrames,
                                                AttachedProps: [{
                                                    Owner: Storyboard,
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("Opacity")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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

        },
        {
            Type: Style,
            Key: "DefaultScrollViewerStyle",
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

        },
        {
            Type: Style,
            Key: "DefaultListBoxStyle",
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
                                                    Value: new _PropertyPath("Visibility")

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
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("Visibility")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
                                                        Value: Visibility.Visible
                                                    }
                                                }]

                                            },
                                            {
                                                Type: ObjectAnimationUsingKeyFrames,
                                                AttachedProps: [{
                                                    Owner: Storyboard,
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("IsOpen")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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
                                            DataContext: new BindingMarkup({ Mode: BindingMode.OneTime }),
                                            Placement: PlacementMode.Right,
                                            PlacementTarget: new BindingMarkup({ Mode: BindingMode.OneTime }),
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
                                                                Value: new _PropertyPath("IsHitTestVisible")

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
                                                                    KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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

        },
        {
            Type: Style,
            Key: "DefaultListBoxItemStyle",
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
                                                    Value: new _PropertyPath("Opacity")

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
                                                    Value: new _PropertyPath("(Control.Foreground).(SolidColorBrush.Color)")

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
                                                    Value: new _PropertyPath("Opacity")

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
                                                    Value: new _PropertyPath("(Control.Foreground).(SolidColorBrush.Color)")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("Visibility")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("(Control.Foreground).(SolidColorBrush.Color)")

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

        },
        {
            Type: Style,
            Key: "DefaultCheckBoxStyle",
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
                                                Duration: new Duration(new TimeSpan(0, 0, 0, 0, 1))
                                            },
                                            Children: [
                                            {
                                                Type: DoubleAnimation,
                                                Props: {
                                                    To: 1,
                                                    Duration: new Duration(new TimeSpan(0, 0, 0, 0, 1))
                                                },
                                                AttachedProps: [{
                                                    Owner: Storyboard,
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("Color")

                                                }
                                                ]
                                            },
                                            {
                                                Type: DoubleAnimation,
                                                Props: {
                                                    To: 1,
                                                    Duration: new Duration(new TimeSpan(0, 0, 0, 0, 1))
                                                },
                                                AttachedProps: [{
                                                    Owner: Storyboard,
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                Duration: new Duration(new TimeSpan(0, 0, 0, 0, 1))
                                            },
                                            Children: [
                                            {
                                                Type: DoubleAnimation,
                                                Props: {
                                                    To: 1,
                                                    Duration: new Duration(new TimeSpan(0, 0, 0, 0, 1))
                                                },
                                                AttachedProps: [{
                                                    Owner: Storyboard,
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("Visibility")

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
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("Visibility")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
                                                        Value: Visibility.Visible
                                                    }
                                                }]

                                            },
                                            {
                                                Type: ObjectAnimationUsingKeyFrames,
                                                AttachedProps: [{
                                                    Owner: Storyboard,
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("IsOpen")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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
                                                DataContext: new BindingMarkup({ Mode: BindingMode.OneTime }),
                                                Placement: PlacementMode.Right,
                                                PlacementTarget: new BindingMarkup({ Mode: BindingMode.OneTime }),
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
                                                                    Value: new _PropertyPath("IsHitTestVisible")

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
                                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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

        },
        {
            Type: Style,
            Key: "DefaultPasswordBoxStyle",
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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("Opacity")

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
                                                    Value: new _PropertyPath("Opacity")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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
                                                    Value: new _PropertyPath("Opacity")

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
                                                    Value: new _PropertyPath("Visibility")

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
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("Visibility")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
                                                        Value: Visibility.Visible
                                                    }
                                                }]

                                            },
                                            {
                                                Type: ObjectAnimationUsingKeyFrames,
                                                AttachedProps: [{
                                                    Owner: Storyboard,
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("IsOpen")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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
                                            DataContext: new BindingMarkup({ Mode: BindingMode.OneTime }),
                                            Placement: PlacementMode.Right,
                                            PlacementTarget: new BindingMarkup({ Mode: BindingMode.OneTime }),
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
                                                                Value: new _PropertyPath("IsHitTestVisible")

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
                                                                    KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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

        },
        {
            Type: Style,
            Key: "DefaultProgressBarStyle",
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
                                                    Value: new _PropertyPath("(UIElement.Visibility)")

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
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("(UIElement.Visibility)")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
                                                        Value: Visibility.Collapsed
                                                    }
                                                }]

                                            },
                                            {
                                                Type: DoubleAnimationUsingKeyFrames,
                                                AttachedProps: [{
                                                    Owner: Storyboard,
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("(Shape.Fill).(LinearGradientBrush.Transform).(TransformGroup.Children)[0].X")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
                                                        Value: 0
                                                    }
                                                },
                                                {
                                                    Type: SplineDoubleKeyFrame,
                                                    Props: {
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 35)),
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

        },
        {
            Type: Style,
            Key: "DefaultRadioButtonStyle",
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
                                                Duration: new Duration(new TimeSpan(0, 0, 0, 0, 1))
                                            },
                                            Children: [
                                            {
                                                Type: DoubleAnimation,
                                                Props: {
                                                    To: 1,
                                                    Duration: new Duration(new TimeSpan(0, 0, 0, 0, 1))
                                                },
                                                AttachedProps: [{
                                                    Owner: Storyboard,
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("Color")

                                                }
                                                ]
                                            },
                                            {
                                                Type: DoubleAnimation,
                                                Props: {
                                                    To: 1,
                                                    Duration: new Duration(new TimeSpan(0, 0, 0, 0, 1))
                                                },
                                                AttachedProps: [{
                                                    Owner: Storyboard,
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("Visibility")

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
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("Visibility")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
                                                        Value: Visibility.Visible
                                                    }
                                                }]

                                            },
                                            {
                                                Type: ObjectAnimationUsingKeyFrames,
                                                AttachedProps: [{
                                                    Owner: Storyboard,
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("IsOpen")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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
                                                    DataContext: new BindingMarkup({ Mode: BindingMode.OneTime }),
                                                    Placement: PlacementMode.Right,
                                                    PlacementTarget: new BindingMarkup({ Mode: BindingMode.OneTime }),
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
                                                                        Value: new _PropertyPath("IsHitTestVisible")

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
                                                                            KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
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

        },
        {
            Type: Style,
            Key: "DefaultRepeatButtonStyle",
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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("Opacity")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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

        },
        {
            Type: Style,
            Key: "HorizontalSliderThumb",
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
                                                    Value: new _PropertyPath("Opacity")

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

        },
        {
            Type: Style,
            Key: "VerticalSliderThumb",
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
                                                    Value: new _PropertyPath("Opacity")

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

        },
        {
            Type: ControlTemplate,
            Key: "RepeatButtonTemplate",
            Content: {
                Type: Grid,
                Name: "Root",
                Props: {
                    Opacity: 0
                }
            }
        },
        {
            Type: ControlTemplate,
            Key: "HorizontalTrackLargeDecrease",
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
        },
        {
            Type: ControlTemplate,
            Key: "VerticalTrackLargeDecrease",
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
        },
        {
            Type: Style,
            Key: "DefaultSliderStyle",
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
                                Resources: [
                                {
                                    Type: ControlTemplate,
                                    Key: "RepeatButtonTemplate",
                                    Content: {
                                        Type: Grid,
                                        Name: "Root",
                                        Props: {
                                            Opacity: 0
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
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("Visibility")

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
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("Visibility")

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
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("Visibility")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
                                                        Value: Visibility.Visible
                                                    }
                                                }]

                                            },
                                            {
                                                Type: ObjectAnimationUsingKeyFrames,
                                                AttachedProps: [{
                                                    Owner: Storyboard,
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("(UIElement.Visibility)")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
                                                        Value: Visibility.Visible
                                                    }
                                                }]

                                            },
                                            {
                                                Type: ObjectAnimationUsingKeyFrames,
                                                AttachedProps: [{
                                                    Owner: Storyboard,
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("(UIElement.Visibility)")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 0)),
                                                        Value: Visibility.Visible
                                                    }
                                                }]

                                            },
                                            {
                                                Type: ObjectAnimationUsingKeyFrames,
                                                AttachedProps: [{
                                                    Owner: Storyboard,
                                                    Prop: "TargetProperty",
                                                    Value: new _PropertyPath("(UIElement.Visibility)")

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

        },
        {
            Type: Style,
            Key: "DefaultToggleButtonStyle",
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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("Opacity")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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

        },
        {
            Type: Style,
            Key: "DefaultToolTipStyle",
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
                                                GeneratedDuration: new Duration(new TimeSpan(0, 0, 0, 0, 3)),
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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 4)),
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
                                                    Value: new _PropertyPath("(UIElement.Opacity)")

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
                                                        KeyTime: new KeyTime(new TimeSpan(0, 0, 0, 0, 3)),
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
                                    Resources: [
                                    {
                                        Type: Storyboard,
                                        Key: "Visible State"
                                    },
                                    {
                                        Type: Storyboard,
                                        Key: "Normal State"
                                    }]
                                ,
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

        },
        {
            Type: Style,
            Props: {
                TargetType: Button,
                BasedOn: new StaticResourceMarkup("DefaultButtonStyle")
            }
        },
        {
            Type: Style,
            Props: {
                TargetType: HyperlinkButton,
                BasedOn: new StaticResourceMarkup("DefaultHyperlinkButtonStyle")
            }
        },
        {
            Type: Style,
            Props: {
                TargetType: TextBox,
                BasedOn: new StaticResourceMarkup("DefaultTextBoxStyle")
            }
        },
        {
            Type: Style,
            Props: {
                TargetType: ComboBox,
                BasedOn: new StaticResourceMarkup("DefaultComboBoxStyle")
            }
        },
        {
            Type: Style,
            Props: {
                TargetType: ComboBoxItem,
                BasedOn: new StaticResourceMarkup("DefaultComboBoxItemStyle")
            }
        },
        {
            Type: Style,
            Props: {
                TargetType: TextBlock,
                BasedOn: new StaticResourceMarkup("DefaultTextBlockStyle")
            }
        },
        {
            Type: Style,
            Props: {
                TargetType: ScrollBar,
                BasedOn: new StaticResourceMarkup("DefaultScrollBarStyle")
            }
        },
        {
            Type: Style,
            Props: {
                TargetType: ScrollViewer,
                BasedOn: new StaticResourceMarkup("DefaultScrollViewerStyle")
            }
        },
        {
            Type: Style,
            Props: {
                TargetType: ListBox,
                BasedOn: new StaticResourceMarkup("DefaultListBoxStyle")
            }
        },
        {
            Type: Style,
            Props: {
                TargetType: ListBoxItem,
                BasedOn: new StaticResourceMarkup("DefaultListBoxItemStyle")
            }
        },
        {
            Type: Style,
            Props: {
                TargetType: CheckBox,
                BasedOn: new StaticResourceMarkup("DefaultCheckBoxStyle")
            }
        },
        {
            Type: Style,
            Props: {
                TargetType: PasswordBox,
                BasedOn: new StaticResourceMarkup("DefaultPasswordBoxStyle")
            }
        },
        {
            Type: Style,
            Props: {
                TargetType: ProgressBar,
                BasedOn: new StaticResourceMarkup("DefaultProgressBarStyle")
            }
        },
        {
            Type: Style,
            Props: {
                TargetType: RadioButton,
                BasedOn: new StaticResourceMarkup("DefaultRadioButtonStyle")
            }
        },
        {
            Type: Style,
            Props: {
                TargetType: RepeatButton,
                BasedOn: new StaticResourceMarkup("DefaultRepeatButtonStyle")
            }
        },
        {
            Type: Style,
            Props: {
                TargetType: Slider,
                BasedOn: new StaticResourceMarkup("DefaultSliderStyle")
            }
        },
        {
            Type: Style,
            Props: {
                TargetType: ToggleButton,
                BasedOn: new StaticResourceMarkup("DefaultToggleButtonStyle")
            }
        },
        {
            Type: Style,
            Props: {
                TargetType: ToolTip,
                BasedOn: new StaticResourceMarkup("DefaultToolTipStyle")
            }
        }]

    };
    return JsonParser.Parse(json);
};