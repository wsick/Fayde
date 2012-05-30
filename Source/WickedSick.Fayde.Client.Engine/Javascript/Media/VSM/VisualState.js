/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="../../Core/DependencyObject.js"/>
/// CODE
/// <reference path="../Animation/Storyboard.js"/>

//#region VisualState
var VisualState = Nullstone.Create("VisualState", DependencyObject);

//#region Dependency Properties

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

Nullstone.FinishCreate(VisualState);
//#endregion

//#region VisualStateCollection
var VisualStateCollection = Nullstone.Create("VisualStateCollection", DependencyObjectCollection);

VisualStateCollection.Instance.IsElementType = function (value) {
    return value instanceof VisualState;
};

Nullstone.FinishCreate(VisualStateCollection);
//#endregion