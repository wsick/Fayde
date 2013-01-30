/// <reference path="../Runtime/Nullstone.js"/>

(function (namespace) {
    namespace.UIElementFlags = {
        None: 0,

        RenderVisible: 0x02,
        HitTestVisible: 0x04,
        TotalRenderVisible: 0x08,
        TotalHitTestVisible: 0x10,

        DirtyArrangeHint: 0x800,
        DirtyMeasureHint: 0x1000,
        DirtySizeHint: 0x2000,

        RenderProjection: 0x4000
    };
})(window);

(function (namespace) {
    namespace.Orientation = {
        Horizontal: 0,
        Vertical: 1
    };
    namespace.Visibility = {
        Visible: 0,
        Collapsed: 1
    };
    namespace.HorizontalAlignment = {
        Left: 0,
        Center: 1,
        Right: 2,
        Stretch: 3
    };
    namespace.VerticalAlignment = {
        Top: 0,
        Center: 1,
        Bottom: 2,
        Stretch: 3
    };
    //FLAGS
    namespace.TextDecorations = {
        None: 0,
        Underline: 1
    };
    namespace.TextAlignment = {
        Left: 0,
        Center: 1,
        Right: 2
    };
    namespace.FontWeight = {
        Thin: 100,
        ExtraLight: 200,
        Light: 300,
        Normal: 400,
        Medium: 500,
        SemiBold: 600,
        Bold: 700,
        ExtraBold: 800,
        Black: 900,
        ExtraBlack: 950
    };
    namespace.FlowDirection = {
        LeftToRight: 0,
        RightToLeft: 1
    };
    namespace.LineStackingStrategy = {
        MaxHeight: 0,
        BlockLineHeight: 1
    };
})(Nullstone.Namespace("Fayde"));