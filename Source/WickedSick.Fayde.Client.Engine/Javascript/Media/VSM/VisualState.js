/// <reference path="../../DependencyObject.js"/>
/// CODE
/// <reference path="../Animation/Storyboard.js"/>

//#region VisualState

function VisualState() {
    DependencyObject.call(this);
}
VisualState.InheritFrom(DependencyObject);

//#region DEPENDENCY PROPERTIES

VisualState.StoryboardProperty = DependencyProperty.Register("Storyboard", function () { return Storyboard; }, VisualState, null);
VisualState.prototype.GetStoryboard = function () {
    return this.GetValue(VisualState.StoryboardProperty);
};
VisualState.prototype.SetStoryboard = function (value) {
    this.SetValue(VisualState.StoryboardProperty, value);
};

//#endregion

//#region ANNOTATIONS

VisualState.Annotations = {
    ContentProperty: VisualState.StoryboardProperty
};

//#endregion

//#endregion

//#region VisualStateCollection

function VisualStateCollection() {
    DependencyObjectCollection.call(this);
}
VisualStateCollection.InheritFrom(DependencyObjectCollection);

VisualStateCollection.prototype.IsElementType = function (value) {
    return value instanceof VisualState;
};

//#endregion