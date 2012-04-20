/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Markup.js"/>
/// CODE
/// <reference path="../Core/StaticResourceExpression.js"/>

//#region StaticResourceMarkup
var StaticResourceMarkup = Nullstone.Create("StaticResourceMarkup", Markup, 1);

StaticResourceMarkup.Instance.Init = function (key) {
    this.Key = key;
};

StaticResourceMarkup.Instance.Transmute = function (target, propd, propName, templateBindingSource) {
    /// <param name="target" type="DependencyObject"></param>
    /// <param name="propd" type="DependencyProperty"></param>
    /// <param name="propName" type="String"></param>
    /// <param name="templateBindingSource" type="DependencyObject"></param>
    return new StaticResourceExpression(this.Key, target, propd, propName, templateBindingSource);
};

Nullstone.FinishCreate(StaticResourceMarkup);
//#endregion