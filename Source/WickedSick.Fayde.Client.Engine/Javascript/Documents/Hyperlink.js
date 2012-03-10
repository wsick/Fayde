/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Span.js"/>
/// CODE

//#region Hyperlink

function Hyperlink() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(Hyperlink, "Hyperlink", Span);

//#endregion
