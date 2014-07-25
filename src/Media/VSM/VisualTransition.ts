/// <reference path="../../Core/DependencyObject.ts" />

module Fayde.Media.VSM {
    export class VisualTransition extends DependencyObject {
        From: string = null;
        To: string = null;
        Storyboard: Animation.Storyboard;

        private _GeneratedDuration: Duration = null;
        get GeneratedDuration(): Duration { return this._GeneratedDuration; }
        set GeneratedDuration(value: Duration) { this._GeneratedDuration = Fayde.ConvertAnyToType(value, Duration); }

        DynamicStoryboardCompleted: boolean = true;
        ExplicitStoryboardCompleted: boolean = true;
        GeneratedEasingFunction: Animation.EasingFunctionBase;
        get IsDefault(): boolean { return this.From == null && this.To == null; }
    }
    Fayde.RegisterType(VisualTransition, "Fayde.Media.VSM", Fayde.XMLNS);
}