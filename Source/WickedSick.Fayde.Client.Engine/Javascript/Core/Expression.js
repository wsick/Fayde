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

//#region Properties

Nullstone.AutoProperties(Expression, [
    "Attached",
    "Updating"
]);

//#endregion

Expression.Instance.GetValue = function (propd) {
    AbstractMethod("Expression.GetValue");
};
Expression.Instance._OnAttached = function (element) {
    ///<param name="element" type="DependencyObject"></param>
    this.Attached = true;
};
Expression.Instance._OnDetached = function (element) {
    this.Attached = false;
};

Nullstone.FinishCreate(Expression);
//#endregion