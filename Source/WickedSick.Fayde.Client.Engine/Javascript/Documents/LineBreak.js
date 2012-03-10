/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Inline.js"/>
/// CODE

//#region LineBreak

function LineBreak() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(LineBreak, "LineBreak", Inline);

//#endregion
