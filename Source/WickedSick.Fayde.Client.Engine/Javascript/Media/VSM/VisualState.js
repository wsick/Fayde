/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="../../Core/DependencyObject.js"/>
/// CODE
/// <reference path="../Animation/Storyboard.js"/>

(function (namespace) {
    var VisualState = Nullstone.Create("VisualState", DependencyObject);

    //#region Properties

    VisualState.StoryboardProperty = DependencyProperty.Register("Storyboard", function () { return Storyboard; }, VisualState, null);

    Nullstone.AutoProperties(VisualState, [
        VisualState.StoryboardProperty
    ]);

    //#endregion

    //#region Annotations

    VisualState.Annotations = {
        ContentProperty: VisualState.StoryboardProperty
    };

    //#endregion

    namespace.VisualState = Nullstone.FinishCreate(VisualState);
})(Nullstone.Namespace("Fayde.Media.VisualStateManager"));

(function (namespace) {
    var VisualStateCollection = Nullstone.Create("VisualStateCollection", DependencyObjectCollection);

    VisualStateCollection.Instance.IsElementType = function (value) {
        return value instanceof namespace.VisualState;
    };

    namespace.VisualStateCollection = Nullstone.FinishCreate(VisualStateCollection);
})(Nullstone.Namespace("Fayde.Media.VisualStateManager"));