/// <reference path="Expression.js"/>
/// CODE

(function (namespace) {
    var DeferredValueExpression = Nullstone.Create("DeferredValueExpression", namespace.Expression);

    DeferredValueExpression.Instance.GetValue = function (propd) {
        return undefined;
    };

    namespace.DeferredValueExpression = Nullstone.FinishCreate(DeferredValueExpression);
})(Nullstone.Namespace("Fayde"));