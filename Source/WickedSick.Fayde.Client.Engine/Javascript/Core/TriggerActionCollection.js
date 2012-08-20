/// <reference path="Collections/DependencyObjectCollection.js"/>
/// <reference path="TriggerAction.js"/>
/// CODE

//#region TriggerActionCollection
var TriggerActionCollection = Nullstone.Create("TriggerActionCollection", DependencyObjectCollection);

TriggerActionCollection.Instance.IsElementType = function (value) {
    return value instanceof TriggerAction;
};

Nullstone.FinishCreate(TriggerActionCollection);
//#endregion