/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region Markup

function Markup() {
    if (!Nullstone.IsReady)
        return;
}
Nullstone.Create(Markup, "Markup");

Markup.prototype.Transmute = function (propd, templateBindingSource) {
    AbstractMethod("Markup.Transmute");
};

//#endregion