/// <reference path="TriggerBase.js"/>
/// <reference path="TriggerActionCollection.js"/>
/// CODE
/// <reference path="../Runtime/MulticastEvent.js"/>

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

EventTrigger.Instance._SetTarget = function (target) {
    target.Loaded.Subscribe(this._FireActions, this);
};
EventTrigger.Instance._RemoveTarget = function (target) {
    target.Loaded.Unsubscribe(this._FireActions, this);
};

EventTrigger.Instance._FireActions = function (sender, e) {
    var actions = this.Actions;
    var count = actions.GetCount();
    for (var i = 0; i < count; i++) {
        var action = actions.GetValueAt(i);
        action.Fire();
    }
};

Nullstone.FinishCreate(EventTrigger);
//#endregion