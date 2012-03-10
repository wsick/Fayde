/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="../../Core/Collections/Collection.js"/>
/// CODE

//#region TimelineCollection

function TimelineCollection() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(TimelineCollection, "TimelineCollection", Collection);

//#endregion
