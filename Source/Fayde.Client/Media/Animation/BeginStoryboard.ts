/// <reference path="../../Core/Triggers.ts" />

module Fayde.Media.Animation {
    export class BeginStoryboard extends TriggerAction {
        static StoryboardProperty: DependencyProperty = DependencyProperty.Register("Storyboard", () => Animation.Storyboard, BeginStoryboard);
        Storyboard: Animation.Storyboard;

        Fire() {
            var sb = this.Storyboard;
            if (sb) sb.Begin();
        }
    }
    Fayde.RegisterType(BeginStoryboard, "Fayde.Media.Animation", Fayde.XMLNS);
    Xaml.Content(BeginStoryboard, BeginStoryboard.StoryboardProperty);
}