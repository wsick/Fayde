/// <reference path="DependencyObject.js"/>
/// CODE

//#region TriggerAction
var TriggerAction = Nullstone.Create("TriggerAction", DependencyObject);

TriggerAction.Instance.Fire = function () { };

Nullstone.FinishCreate(TriggerAction);
//#endregion