/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="../../Core/DependencyObject.js"/>
/// <reference path="../../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="../Animation/Storyboard.js"/>

(function (namespace) {
    var VisualTransition = Nullstone.Create("VisualTransition", DependencyObject);

    VisualTransition.Instance.Init = function () {
        this.Init$DependencyObject();
        this.DynamicStoryboardCompleted = true;
        this.ExplicitStoryboardCompleted = true;
        this._GeneratedDuration = new Duration();
    };

    //#region Properties

    Nullstone.AutoProperties(VisualTransition, [
        "From",
        "To",
        "Storyboard",
        "GeneratedDuration",
        "DynamicStoryboardCompleted",
        "ExplicitStoryboardCompleted",
        "GeneratedEasingFunction"
    ]);

    //#endregion

    namespace.VisualTransition = Nullstone.FinishCreate(VisualTransition);
})(window);

(function (namespace) {
    var VisualTransitionCollection = Nullstone.Create("VisualTransitionCollection", DependencyObjectCollection);

    VisualTransitionCollection.Instance.IsElementType = function (obj) {
        return obj instanceof VisualTransition;
    };

    namespace.VisualTransitionCollection = Nullstone.FinishCreate(VisualTransitionCollection);
})(window);