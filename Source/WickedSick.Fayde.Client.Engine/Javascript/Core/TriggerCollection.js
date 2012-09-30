/// <reference path="Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="EventTrigger.js"/>

//#region TriggerCollection
var TriggerCollection = Nullstone.Create("TriggerCollection", DependencyObjectCollection);

TriggerCollection.Instance.IsElementType = function (value) {
    return value instanceof EventTrigger;
};

Nullstone.FinishCreate(TriggerCollection);
//#endregion