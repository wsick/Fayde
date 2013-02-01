/// <reference path="../Runtime/Nullstone.js" />
/// CODE

(function (namespace) {
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

    namespace.Expression = Nullstone.FinishCreate(Expression);
})(Nullstone.Namespace("Fayde"));