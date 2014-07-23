/// <reference path="../../Runtime/TypeManagement.ts" />

module Fayde.Media.Animation {
    export enum EasingMode {
        EaseOut = 0,
        EaseIn = 1,
        EaseInOut = 2,
    }
    Fayde.RegisterEnum(EasingMode, "EasingMode", Fayde.XMLNS);

    export enum FillBehavior {
        HoldEnd = 0,
        Stop = 1,
    }
    Fayde.RegisterEnum(FillBehavior, "FillBehavior", Fayde.XMLNS);
}