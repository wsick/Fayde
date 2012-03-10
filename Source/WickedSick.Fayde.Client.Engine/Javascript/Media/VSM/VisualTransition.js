/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="../../Core/DependencyObject.js"/>
/// <reference path="../../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="../Animation/Storyboard.js"/>

//#region VisualTransition

function VisualTransition() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
    this.SetDynamicStoryboardCompleted(true);
    this.SetExplicitStoryboardCompleted(true);
    this._GeneratedDuration = new Duration();
}
Nullstone.Extend(VisualTransition, "VisualTransition", DependencyObject);

//#region PROPERTIES

VisualTransition.prototype.GetFrom = function () {
    ///<returns type="String"></returns>
    return this._From;
};
VisualTransition.prototype.SetFrom = function (value) {
    ///<param name="value" type="String"></param>
    this._From = value;
};

VisualTransition.prototype.GetTo = function () {
    ///<returns type="String"></returns>
    return this._To;
};
VisualTransition.prototype.SetTo = function (value) {
    ///<param name="value" type="String"></param>
    this._To = value;
};

VisualTransition.prototype.GetStoryboard = function () {
    ///<returns type="Storyboard"></returns>
    return this._Storyboard;
};
VisualTransition.prototype.SetStoryboard = function (value) {
    ///<param name="value" type="Storyboard"></param>
    this._Storyboard = value;
};

VisualTransition.prototype.GetGeneratedDuration = function () {
    ///<returns type="Duration"></returns>
    return this._GeneratedDuration;
};
VisualTransition.prototype.SetGeneratedDuration = function (value) {
    ///<param name="value" type="Duration"></param>
    this._GeneratedDuration = value;
};

VisualTransition.prototype.GetDynamicStoryboardCompleted = function () {
    ///<returns type="Boolean"></returns>
    return this._DynamicStoryboardCompleted;
};
VisualTransition.prototype.SetDynamicStoryboardCompleted = function (value) {
    ///<param name="value" type="Boolean"></param>
    this._DynamicStoryboardCompleted = value;
};

VisualTransition.prototype.GetExplicitStoryboardCompleted = function () {
    ///<returns type="Boolean"></returns>
    return this._ExplicitStoryboardCompleted;
};
VisualTransition.prototype.SetExplicitStoryboardCompleted = function (value) {
    ///<param name="value" type="Boolean"></param>
    this._ExplicitStoryboardCompleted = value;
};

VisualTransition.prototype.GetGeneratedEasingFunction = function () {
    ///<returns type="IEasingFunction"></returns>
    return this._GeneratedEasingFunction;
};
VisualTransition.prototype.SetGeneratedEasingFunction = function (value) {
    ///<param name="value" type="IEasingFunction"></param>
    this._GeneratedEasingFunction = value;
};

//#endregion

//#endregion

//#region VisualTransitionCollection

function VisualTransitionCollection() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(VisualTransitionCollection, "VisualTransitionCollection", DependencyObjectCollection);

VisualTransitionCollection.prototype.IsElementType = function (obj) {
    return obj instanceof VisualTransition;
};

//#endregion