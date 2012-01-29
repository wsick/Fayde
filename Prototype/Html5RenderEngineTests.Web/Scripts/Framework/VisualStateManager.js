/// <reference path="DependencyObject.js"/>
/// CODE
/// <reference path="Collections.js"/>

//#region VisualState

VisualState.prototype = new DependencyObject;
VisualState.prototype.constructor = VisualState;
function VisualState() {
    DependencyObject.call(this);
}
VisualState.GetBaseClass = function () { return DependencyObject; };

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

VisualStateCollection.prototype = new DependencyObjectCollection;
VisualStateCollection.prototype.constructor = VisualStateCollection;
function VisualStateCollection() {
    DependencyObjectCollection.call(this);
}
VisualStateCollection.GetBaseClass = function () { return DependencyObjectCollection; };

VisualStateCollection.prototype.IsElementType = function (value) {
    return value instanceof VisualState;
};

//#endregion

//#region VisualStateGroup

VisualStateGroup.prototype = new DependencyObject;
VisualStateGroup.prototype.constructor = VisualStateGroup;
function VisualStateGroup() {
    DependencyObject.call(this);
    this._States = new VisualStateCollection();
}
VisualStateGroup.GetBaseClass = function () { return DependencyObject; };

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

VisualStateGroupCollection.prototype = new DependencyObjectCollection;
VisualStateGroupCollection.prototype.constructor = VisualStateGroupCollection;
function VisualStateGroupCollection() {
    DependencyObjectCollection.call(this);
}
VisualStateGroupCollection.GetBaseClass = function () { return DependencyObjectCollection; };

VisualStateGroupCollection.prototype.IsElementType = function (value) {
    return value instanceof VisualStateGroup;
}

//#endregion

//#region VisualStateManager

VisualStateManager.prototype = new DependencyObject;
VisualStateManager.prototype.constructor = VisualStateManager;
function VisualStateManager() {
    DependencyObject.call(this);
}
VisualStateManager.GetBaseClass = function () { return DependencyObject; };

//#region DEPENDENCY PROPERTIES

VisualStateManager.VisualStateGroupsProperty = DependencyProperty.RegisterAttached("VisualStateGroups", function () { return VisualStateGroupCollection; }, VisualStateManager, null);
VisualStateManager.GetVisualStateGroups = function (d) {
    return d.GetValue(VisualStateManager.VisualStateGroupsProperty);
};
VisualStateManager.SetVisualStateGroups = function (d, value) {
    d.SetValue(VisualStateManager.VisualStateGroupsProperty, value);
};

//#endregion

//#endregion