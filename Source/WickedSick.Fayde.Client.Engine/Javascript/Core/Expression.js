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

function Expression() {
    RefObject.call(this);
}
Expression.InheritFrom(RefObject);

Expression.prototype.GetValue = function (propd) {
    AbstractMethod("Expression.GetValue");
};
Expression.prototype._OnAttached = function (element) {
    ///<param name="element" type="DependencyObject"></param>
    this.SetAttached(true);
};
Expression.prototype._OnDetached = function (element) {
    this.SetAttached(false);
};

//#region PROPERTIES

Expression.prototype.GetAttached = function () {
    /// <returns type="Boolean" />
    return this._Attached;
};
Expression.prototype.SetAttached = function (value) {
    /// <param name="value" type="Boolean"></param>
    this._Attached = value;
};

Expression.prototype.GetUpdating = function () {
    /// <returns type="Boolean" />
    return this._Updating;
};
Expression.prototype.SetUpdating = function (value) {
    /// <param name="value" type="Boolean"></param>
    this._Updating = value;
};

//#endregion

//#endregion