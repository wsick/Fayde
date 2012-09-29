/// <reference path="../../Core/TriggerAction.js"/>
/// <reference path="Storyboard.js"/>
/// CODE

//#region BeginStoryboard
var BeginStoryboard = Nullstone.Create("BeginStoryboard", TriggerAction);

//#region Properties

BeginStoryboard.StoryboardProperty = DependencyProperty.Register("Storyboard", function () { return Storyboard; }, BeginStoryboard);

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

Nullstone.FinishCreate(BeginStoryboard);
//#endregion