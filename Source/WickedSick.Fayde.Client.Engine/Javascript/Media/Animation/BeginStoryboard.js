/// <reference path="../../Core/TriggerAction.js"/>
/// <reference path="Storyboard.js"/>
/// CODE

(function (namespace) {
    var BeginStoryboard = Nullstone.Create("BeginStoryboard", TriggerAction);

    //#region Properties

    BeginStoryboard.StoryboardProperty = DependencyProperty.Register("Storyboard", function () { return namespace.Storyboard; }, BeginStoryboard);

    Nullstone.AutoProperties(BeginStoryboard, [
        BeginStoryboard.StoryboardProperty
    ]);

    //#endregion

    //#region Annotations

    BeginStoryboard.Annotations = {
        ContentProperty: BeginStoryboard.StoryboardProperty
    };

    //#endregion

    BeginStoryboard.Instance.Fire = function () {
        var sb = this.Storyboard;
        if (sb)
            sb.Begin();
    };

    namespace.BeginStoryboard = Nullstone.FinishCreate(BeginStoryboard);
})(Nullstone.Namespace("Fayde.Media.Animation"));
