module Fayde.Providers {
    export enum _Inheritable {
        Foreground = 1 << 0,
        FontFamily = 1 << 1,
        FontStretch = 1 << 2,
        FontStyle = 1 << 3,
        FontWeight = 1 << 4,
        FontSize = 1 << 5,
        Language = 1 << 6,
        FlowDirection = 1 << 7,
        UseLayoutRounding = 1 << 8,
        TextDecorations = 1 << 9,
        All = 0x7ff,
        None = 0,
    }
}