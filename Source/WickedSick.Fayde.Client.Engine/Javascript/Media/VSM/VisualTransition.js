/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="../../Core/DependencyObject.js"/>
/// <reference path="../../Core/Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="../Animation/Storyboard.js"/>

//#region VisualTransition
var VisualTransition = Nullstone.Create("VisualTransition", DependencyObject);

VisualTransition.Instance.Init = function () {
    this.Init$DependencyObject();
    this.SetDynamicStoryboardCompleted(true);
    this.SetExplicitStoryboardCompleted(true);
    this._GeneratedDuration = new Duration();
};

//#region PROPERTIES

VisualTransition.Instance.GetFrom = function () {
    ///<returns type="String"></returns>
    return this._From;
};
VisualTransition.Instance.SetFrom = function (value) {
    ///<param name="value" type="String"></param>
    this._From = value;
};

VisualTransition.Instance.GetTo = function () {
    ///<returns type="String"></returns>
    return this._To;
};
VisualTransition.Instance.SetTo = function (value) {
    ///<param name="value" type="String"></param>
    this._To = value;
};

VisualTransition.Instance.GetStoryboard = function () {
    ///<returns type="Storyboard"></returns>
    return this._Storyboard;
};
VisualTransition.Instance.SetStoryboard = function (value) {
    ///<param name="value" type="Storyboard"></param>
    this._Storyboard = value;
};

VisualTransition.Instance.GetGeneratedDuration = function () {
    ///<returns type="Duration"></returns>
    return this._GeneratedDuration;
};
VisualTransition.Instance.SetGeneratedDuration = function (value) {
    ///<param name="value" type="Duration"></param>
    this._GeneratedDuration = value;
};

VisualTransition.Instance.GetDynamicStoryboardCompleted = function () {
    ///<returns type="Boolean"></returns>
    return this._DynamicStoryboardCompleted;
};
VisualTransition.Instance.SetDynamicStoryboardCompleted = function (value) {
    ///<param name="value" type="Boolean"></param>
    this._DynamicStoryboardCompleted = value;
};

VisualTransition.Instance.GetExplicitStoryboardCompleted = function () {
    ///<returns type="Boolean"></returns>
    return this._ExplicitStoryboardCompleted;
};
VisualTransition.Instance.SetExplicitStoryboardCompleted = function (value) {
    ///<param name="value" type="Boolean"></param>
    this._ExplicitStoryboardCompleted = value;
};

VisualTransition.Instance.GetGeneratedEasingFunction = function () {
    ///<returns type="IEasingFunction"></returns>
    return this._GeneratedEasingFunction;
};
VisualTransition.Instance.SetGeneratedEasingFunction = function (value) {
    ///<param name="value" type="IEasingFunction"></param>
    this._GeneratedEasingFunction = value;
};

//#endregion

Nullstone.FinishCreate(VisualTransition);
//#endregion

//#region VisualTransitionCollection
var VisualTransitionCollection = Nullstone.Create("VisualTransitionCollection", DependencyObjectCollection);

VisualTransitionCollection.Instance.IsElementType = function (obj) {
    return obj instanceof VisualTransition;
};

Nullstone.FinishCreate(VisualTransitionCollection);
//#endregion