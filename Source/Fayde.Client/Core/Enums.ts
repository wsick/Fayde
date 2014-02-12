/// <reference path="../Runtime/TypeManagement.ts" />

module Fayde {
    export enum Orientation {
        Horizontal = 0,
        Vertical = 1,
    }
    Fayde.RegisterEnum(Orientation, "Orientation", Fayde.XMLNS);

    export enum Visibility {
        Visible = 0,
        Collapsed = 1,
    }
    Fayde.RegisterEnum(Visibility, "Visibility", Fayde.XMLNS);
    Fayde.RegisterEnumConverter(Visibility, function (val: any): any {
        if (val === "true" || val === true || val === Visibility.Visible || val === "Visible")
            return Visibility.Visible;
        return Visibility.Collapsed;
    });

    export var CursorType = {
        Default: "",
        Hand: "pointer",
        IBeam: "text",
        Wait: "wait",
        SizeNESW: "ne-resize",
        SizeNWSE: "nw-resize",
        SizeNS: "n-resize",
        SizeWE: "w-resize"
        //TODO: Add cursor types
    }
    Fayde.RegisterEnum(CursorType, "CursorType", Fayde.XMLNS);

    export enum HorizontalAlignment {
        Left = 0,
        Center = 1,
        Right = 2,
        Stretch = 3,
    }
    Fayde.RegisterEnum(HorizontalAlignment, "HorizontalAlignment", Fayde.XMLNS);

    export enum VerticalAlignment {
        Top = 0,
        Center = 1,
        Bottom = 2,
        Stretch = 3,
    }
    Fayde.RegisterEnum(VerticalAlignment, "VerticalAlignment", Fayde.XMLNS);

    export enum FlowDirection {
        LeftToRight = 0,
        RightToLeft = 1,
    }
    Fayde.RegisterEnum(FlowDirection, "FlowDirection", Fayde.XMLNS);

    export enum FontWeight {
        Thin = 100,
        ExtraLight = 200,
        Light = 300,
        Normal = 400,
        Medium = 500,
        SemiBold = 600,
        Bold = 700,
        ExtraBold = 800,
        Black = 900,
        ExtraBlack = 950,
    }
    Fayde.RegisterEnum(FontWeight, "FontWeight", Fayde.XMLNS);

    export enum TextAlignment {
        Left = 0,
        Center = 1,
        Right = 2,
        Justify = 3,
    }
    Fayde.RegisterEnum(TextAlignment, "TextAlignment", Fayde.XMLNS);

    //FLAGS
    export enum TextDecorations {
        None = 0,
        Underline = 1,
    }
    Fayde.RegisterEnum(TextDecorations, "TextDecorations", Fayde.XMLNS);

    export enum LineStackingStrategy {
        MaxHeight = 0,
        BlockLineHeight = 1,
    }
    Fayde.RegisterEnum(LineStackingStrategy, "LineStackingStrategy", Fayde.XMLNS);
}