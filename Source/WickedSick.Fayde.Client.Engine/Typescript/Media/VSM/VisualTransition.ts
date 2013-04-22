/// <reference path="../../Core/DependencyObject.ts" />
/// CODE

module Fayde.Media.VSM {
    export class VisualTransition {
        From;
        To;
        Storyboard;
        GeneratedDuration;
        DynamicStoryboardCompleted;
        ExplicitStoryboardCompleted;
        GeneratedEasingFunction;
        IsDefault: bool = false;
    }
}