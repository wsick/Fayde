/// <reference path="../../Core/DependencyObject.ts" />
/// CODE
/// <reference path="../Animation/EasingFunctionBase.ts" />

module Fayde.Media.VSM {
    export class VisualTransition extends DependencyObject {
        From: string = null;
        To: string = null;
        Storyboard: Animation.Storyboard;
        GeneratedDuration: Duration;
        DynamicStoryboardCompleted: bool = true;
        ExplicitStoryboardCompleted: bool = true;
        GeneratedEasingFunction: Animation.EasingFunctionBase;
        get IsDefault(): bool { return this.From == null && this.To == null; }
    }
    Nullstone.RegisterType(VisualTransition, "VisualTransition");
}