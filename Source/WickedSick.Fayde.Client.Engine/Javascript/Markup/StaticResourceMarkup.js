/// <reference path="Markup.js"/>
/// CODE

//#region StaticResourceMarkup

function StaticResourceMarkup(key) {
    Markup.call(this);
    this.Key = key;
}
StaticResourceMarkup.InheritFrom(Markup);

StaticResourceMarkup.prototype.Transmute = function (propd, templateBindingSource) {
    NotImplemented("StaticResourceMarkup.Transmute");
};

//#endregion