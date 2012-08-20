/// <reference path="Expression.js"/>
/// CODE

//#region DeferredValueExpression
var DeferredValueExpression = Nullstone.Create("DeferredValueExpression", Expression);

DeferredValueExpression.Instance.GetValue = function (propd) {
    return undefined;
};

Nullstone.FinishCreate(DeferredValueExpression);
//#endregion