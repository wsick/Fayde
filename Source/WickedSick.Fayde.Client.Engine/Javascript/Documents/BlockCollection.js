/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="TextElementCollection.js"/>
/// CODE

//#region BlockCollection

function BlockCollection() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(BlockCollection, "BlockCollection", TextElementCollection);

//#endregion
