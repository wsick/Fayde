/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Block.js"/>
/// CODE

//#region Paragraph

function Paragraph() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(Paragraph, "Paragraph", Block);

//#endregion
