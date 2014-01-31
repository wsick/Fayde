/// <reference path="../../Core/DependencyObject.ts" />
/// <reference path="../../Core/XamlObjectCollection.ts" />

module Fayde.Media.VSM {
    export class VisualState extends DependencyObject {
        static StoryboardProperty: DependencyProperty = DependencyProperty.Register("Storyboard", () => Animation.Storyboard, VisualState);
        Storyboard: Animation.Storyboard;
        static Annotations = { ContentProperty: VisualState.StoryboardProperty };
    }
    Fayde.RegisterType(VisualState, "Fayde.Media.VSM", Fayde.XMLNS);

    export class VisualStateCollection extends XamlObjectCollection<VisualState> {
    }
    Fayde.RegisterType(VisualStateCollection, "Fayde.Media.VSM", Fayde.XMLNS);
}