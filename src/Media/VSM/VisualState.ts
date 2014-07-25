/// <reference path="../../Core/DependencyObject.ts" />
/// <reference path="../../Core/XamlObjectCollection.ts" />

module Fayde.Media.VSM {
    export class VisualState extends DependencyObject {
        static StoryboardProperty: DependencyProperty = DependencyProperty.Register("Storyboard", () => Animation.Storyboard, VisualState);
        Storyboard: Animation.Storyboard;
    }
    Fayde.RegisterType(VisualState, "Fayde.Media.VSM", Fayde.XMLNS);
    Xaml.Content(VisualState, VisualState.StoryboardProperty);

    export class VisualStateCollection extends XamlObjectCollection<VisualState> {
    }
    Fayde.RegisterType(VisualStateCollection, "Fayde.Media.VSM", Fayde.XMLNS);
}