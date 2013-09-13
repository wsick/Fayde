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
    Fayde.RegisterType(VisualState, {
    	Name: "VisualState",
    	Namespace: "Fayde.Media.VSM",
    	XmlNamespace: Fayde.XMLNS
    });

    export class VisualStateCollection extends XamlObjectCollection<VisualState> {
    }
    Fayde.RegisterType(VisualStateCollection, {
    	Name: "VisualStateCollection",
    	Namespace: "Fayde.Media.VSM",
    	XmlNamespace: Fayde.XMLNS
    });
}