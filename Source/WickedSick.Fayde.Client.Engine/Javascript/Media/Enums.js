(function (namespace) {
    namespace.AlignmentX = {
        Left: 0,
        Center: 1,
        Right: 2
    };
    namespace.AlignmentY = {
        Top: 0,
        Center: 1,
        Bottom: 2
    };
    namespace.Stretch = {
        None: 0,
        Fill: 1,
        Uniform: 2,
        UniformToFill: 3
    };
    namespace.BrushMappingMode = {
        Absolute: 0,
        RelativeToBoundingBox: 1
    };
    namespace.PenLineCap = {
        Flat: 0,
        Square: 1,
        Round: 2,
        Triangle: 3
    };
    namespace.PenLineJoin = {
        Miter: 0,
        Bevel: 1,
        Round: 2
    };
    namespace.SweepDirection = {
        Counterclockwise: 0,
        Clockwise: 1
    };
    namespace.FillRule = {
        EvenOdd: 0,
        Nonzero: 1
    };
    namespace.GradientSpreadMethod = {
        Pad: 0,
        Reflect: 1,
        Repeat: 2
    };
    namespace.TextHintingMode = {
        Fixed: 0,
        Animated: 1
    };
})(window);