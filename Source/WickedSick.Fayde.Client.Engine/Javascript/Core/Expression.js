/// <reference path="../Runtime/Nullstone.js" />
/// CODE
/// <reference path="DependencyProperty.js"/>
/// <reference path="ContentControl.js"/>
/// <reference path="PropertyPath.js"/>
/// <reference path="FrameworkElement.js"/>
/// <reference path="ContentPresenter.js"/>
/// <reference path="TextBox.js"/>
/// <reference path="RelativeSource.js"/>
/// <reference path="Binding.js"/>

//#region Expression
var Expression = Nullstone.Create("Expression");

Expression.Instance.GetValue = function (propd) {
    AbstractMethod("Expression.GetValue");
};
Expression.Instance._OnAttached = function (element) {
    ///<param name="element" type="DependencyObject"></param>
    this.SetAttached(true);
};
Expression.Instance._OnDetached = function (element) {
    this.SetAttached(false);
};

//#region PROPERTIES

Expression.Instance.GetAttached = function () {
    /// <returns type="Boolean" />
    return this._Attached;
};
Expression.Instance.SetAttached = function (value) {
    /// <param name="value" type="Boolean"></param>
    this._Attached = value;
};

Expression.Instance.GetUpdating = function () {
    /// <returns type="Boolean" />
    return this._Updating;
};
Expression.Instance.SetUpdating = function (value) {
    /// <param name="value" type="Boolean"></param>
    this._Updating = value;
};

//#endregion

Nullstone.FinishCreate(Expression);
//#endregion