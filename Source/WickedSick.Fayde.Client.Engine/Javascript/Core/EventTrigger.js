/// <reference path="TriggerBase.js"/>
/// <reference path="TriggerActionCollection.js"/>
/// <reference path="../Runtime/MulticastEvent.js"/>
/// CODE

//#region EventTrigger
var EventTrigger = Nullstone.Create("EventTrigger", TriggerBase);

//#region Properties

EventTrigger.ActionsProperty = DependencyProperty.RegisterFull("Actions", function () { return TriggerActionCollection; }, EventTrigger, undefined, { GetValue: function () { return new TriggerActionCollection(); } });
EventTrigger.RoutedEventProperty = DependencyProperty.Register("RoutedEvent", function () { return MulticastEvent; }, EventTrigger);

Nullstone.AutoProperties(EventTrigger, [
    EventTrigger.ActionsProperty,
    EventTrigger.RoutedEventProperty
]);

//#endregion

//#region Annotations

EventTrigger.Annotations = {
    ContentProperty: EventTrigger.ActionsProperty
};

//#endregion

Nullstone.FinishCreate(EventTrigger);
//#endregion