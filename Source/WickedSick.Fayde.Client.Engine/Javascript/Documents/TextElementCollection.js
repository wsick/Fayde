/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/Collections/DependencyObjectCollection.js"/>
/// CODE

//#region TextElementCollection

function TextElementCollection() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(TextElementCollection, "TextElementCollection", DependencyObjectCollection);

//#endregion
