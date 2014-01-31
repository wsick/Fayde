/// <reference path="../../Core/DependencyObject.ts" />

module Fayde.Media.VSM {
    export class VisualTransition extends DependencyObject {
        From: string = null;
        To: string = null;
        Storyboard: Animation.Storyboard;
        GeneratedDuration: Duration;
        DynamicStoryboardCompleted: boolean = true;
        ExplicitStoryboardCompleted: boolean = true;
        GeneratedEasingFunction: Animation.EasingFunctionBase;
        get IsDefault(): boolean { return this.From == null && this.To == null; }
    }
    Fayde.RegisterType(VisualTransition, "Fayde.Media.VSM", Fayde.XMLNS);
}