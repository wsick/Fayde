/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Markup.js"/>
/// CODE

//#region StaticResourceMarkup
var StaticResourceMarkup = Nullstone.Create("StaticResourceMarkup", Markup, 1);

StaticResourceMarkup.Instance.Init = function (key) {
    this.Key = key;
};

StaticResourceMarkup.Instance.Transmute = function (propd, templateBindingSource) {
    NotImplemented("StaticResourceMarkup.Transmute");
};

Nullstone.FinishCreate(StaticResourceMarkup);
//#endregion