/// <reference path="../../Core/Triggers.ts" />
/// CODE
/// <reference path="Storyboard.ts" />

module Fayde.Media.Animation {
    export class BeginStoryboard extends TriggerAction {
        static StoryboardProperty: DependencyProperty = DependencyProperty.Register("Storyboard", () => Animation.Storyboard, BeginStoryboard);
        Storyboard: Animation.Storyboard;

        static Annotations = { ContentProperty: BeginStoryboard.StoryboardProperty }

        Fire() {
            var sb = this.Storyboard;
            if (sb) sb.Begin();
        }
    }
    Nullstone.RegisterType(BeginStoryboard, "BeginStoryboard");
}