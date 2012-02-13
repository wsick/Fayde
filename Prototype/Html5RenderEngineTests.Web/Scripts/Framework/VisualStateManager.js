/// <reference path="DependencyObject.js"/>
/// <reference path="Collections.js"/>
/// <reference path="Timeline.js"/>
/// CODE

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

//#region VisualStateGroup

function VisualStateGroup() {
    DependencyObject.call(this);
    this._States = new VisualStateCollection();
}
VisualStateGroup.InheritFrom(DependencyObject);

VisualStateGroup.prototype.GetStates = function () {
    return this._States;
};

VisualStateGroup.prototype._GetState = function (stateName) {
    var states = this.GetStates();
    for (var i = 0; i < states.GetCount(); i++) {
        var state = states.GetValueAt(i);
        if (state.Name === stateName)
            return state;
    }
    return null;
};

//#region ANNOTATIONS

VisualStateGroup.Annotations = {
    ContentProperty: "States"
};

//#endregion

//#endregion

//#region VisualStateGroupCollection

function VisualStateGroupCollection() {
    DependencyObjectCollection.call(this);
}
VisualStateGroupCollection.InheritFrom(DependencyObjectCollection);

VisualStateGroupCollection.prototype.IsElementType = function (value) {
    return value instanceof VisualStateGroup;
}

//#endregion

//#region VisualStateManager

function VisualStateManager() {
    DependencyObject.call(this);
}
VisualStateManager.InheritFrom(DependencyObject);

//#region DEPENDENCY PROPERTIES

VisualStateManager.VisualStateGroupsProperty = DependencyProperty.RegisterAttached("VisualStateGroups", function () { return VisualStateGroupCollection; }, VisualStateManager, null);
VisualStateManager.GetVisualStateGroups = function (d) {
    return d.GetValue(VisualStateManager.VisualStateGroupsProperty);
};
VisualStateManager.SetVisualStateGroups = function (d, value) {
    d.SetValue(VisualStateManager.VisualStateGroupsProperty, value);
};

//#endregion

VisualStateManager.GoToState = function (uie, state, useTransitions) {
    NotImplemented("VisualStateManager.GoToState (" + state + ")");
};

//#endregion

//#region Storyboard

function Storyboard() {
    Timeline.call(this);
}
Storyboard.InheritFrom(Timeline);

Storyboard.ChildrenProperty = DependencyProperty.Register("Children", function () { return TimelineCollection; }, Storyboard);
Storyboard.prototype.GetChildren = function () {
    ///<returns type="TimelineCollection"></returns>
    return this.GetValue(Storyboard.ChildrenProperty);
};

//#endregion