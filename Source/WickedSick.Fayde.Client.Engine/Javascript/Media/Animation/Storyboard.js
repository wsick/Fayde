/// <reference path="../Animation/Timeline.js"/>
/// <reference path="../../Collections.js"/>
/// CODE

//#region Storyboard

function Storyboard() {
    Timeline.call(this);
}
Storyboard.InheritFrom(Timeline);

//#region DEPENDENCY PROPERTIES

Storyboard.ChildrenProperty = DependencyProperty.Register("Children", function () { return TimelineCollection; }, Storyboard);
Storyboard.prototype.GetChildren = function () {
    ///<returns type="TimelineCollection"></returns>
    return this.GetValue(Storyboard.ChildrenProperty);
};

Storyboard.TargetNameProperty = DependencyProperty.RegisterAttached("TargetName", function () { return String }, Storyboard);
Storyboard.GetTargetName = function (d) {
    ///<returns type="String"></returns>
    return d.GetValue(Storyboard.TargetNameProperty);
};
Storyboard.SetTargetName = function (d, value) {
    ///<param name="value" type="String"></param>
    d.SetValue(Storyboard.TargetNameProperty, value);
};

Storyboard.TargetPropertyProperty = DependencyProperty.RegisterAttached("TargetProperty", function () { return _PropertyPath }, Storyboard);
Storyboard.GetTargetProperty = function (d) {
    ///<returns type="PropertyPath"></returns>
    return d.GetValue(Storyboard.TargetPropertyProperty);
};
Storyboard.SetTargetProperty = function (d, value) {
    ///<param name="value" type="PropertyPath"></param>
    d.SetValue(Storyboard.TargetPropertyProperty, value);
};

//#endregion

//#region ANNOTATIONS

Storyboard.Annotations = {
    ContentProperty: Storyboard.ChildrenProperty
};

//#endregion

Storyboard.prototype.Begin = function () {
    NotImplemented("Storyboard.Begin");
};
Storyboard.prototype.Stop = function () {
    NotImplemented("Storyboard.Stop");
};

//#endregion

//#region StoryboardCollection

function StoryboardCollection() {
    DependencyObjectCollection.call(this);
}
StoryboardCollection.InheritFrom(DependencyObjectCollection);

StoryboardCollection.prototype.IsElementType = function (obj) {
    return obj instanceof Storyboard;
};

//#endregion