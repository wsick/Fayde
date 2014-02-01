module Fayde.Media {
    export enum BrushMappingMode {
        Absolute = 0,
        RelativeToBoundingBox = 1,
    }
    Fayde.RegisterEnum(BrushMappingMode, "BrushMappingMode", Fayde.XMLNS);

    export enum GradientSpreadMethod {
        Pad = 0,
        Reflect = 1,
        Repeat = 2,
    }
    Fayde.RegisterEnum(GradientSpreadMethod, "GradientSpreadMethod", Fayde.XMLNS);

    export enum Stretch {
        None = 0,
        Fill = 1,
        Uniform = 2,
        UniformToFill = 3,
    }
    Fayde.RegisterEnum(Stretch, "Stretch", Fayde.XMLNS);

    export enum AlignmentX {
        Left = 0,
        Center = 1,
        Right = 2,
    }
    Fayde.RegisterEnum(AlignmentX, "AlignmentX", Fayde.XMLNS);

    export enum AlignmentY {
        Top = 0,
        Center = 1,
        Bottom = 2,
    }
    Fayde.RegisterEnum(AlignmentY, "AlignmentY", Fayde.XMLNS);

    export enum TextHintingMode {
        Fixed = 0,
        Animated = 1,
    }
    Fayde.RegisterEnum(TextHintingMode, "TextHintingMode", Fayde.XMLNS);
}