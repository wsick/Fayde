/// <reference path="../../Core/DependencyObject.ts" />
/// <reference path="../../Core/XamlObjectCollection.ts" />
/// CODE
/// <reference path="../Animation/Storyboard.ts" />

module Fayde.Media.VSM {
    export class VisualState extends DependencyObject {
        static StoryboardProperty: DependencyProperty = DependencyProperty.Register("Storyboard", () => Animation.Storyboard, VisualState);
        Storyboard: Animation.Storyboard;
        static Annotations = { ContentProperty: VisualState.StoryboardProperty };
    }
    Nullstone.RegisterType(VisualState, "VisualState");

    export class VisualStateCollection extends XamlObjectCollection {
    }
    Nullstone.RegisterType(VisualStateCollection, "VisualStateCollection");
}