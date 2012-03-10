/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Markup.js"/>
/// CODE

//#region StaticResourceMarkup

function StaticResourceMarkup(key) {
    if (!Nullstone.IsReady)
        return;
    this.$super();
    this.Key = key;
}
Nullstone.Extend(StaticResourceMarkup, "StaticResourceMarkup", Markup);

StaticResourceMarkup.prototype.Transmute = function (propd, templateBindingSource) {
    NotImplemented("StaticResourceMarkup.Transmute");
};

//#endregion
