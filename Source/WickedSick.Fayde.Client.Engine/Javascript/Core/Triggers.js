/// <reference path="../Core/DependencyObject.js"/>
/// <reference path="Collections/DependencyObjectCollection.js"/>
/// CODE

(function (Fayde) {
    //#region TriggerBase

    var TriggerBase = Nullstone.Create("TriggerBase", Fayde.DependencyObject);
    Fayde.TriggerBase = Nullstone.FinishCreate(TriggerBase);

    //#endregion

    //#region TriggerAction

    var TriggerAction = Nullstone.Create("TriggerAction", Fayde.DependencyObject);
    TriggerAction.Instance.Fire = function () { };
    Fayde.TriggerAction = Nullstone.FinishCreate(TriggerAction);

    //#endregion

    //#region TriggerActionCollection

    var TriggerActionCollection = Nullstone.Create("TriggerActionCollection", Fayde.DependencyObjectCollection);
    TriggerActionCollection.Instance.IsElementType = function (value) {
        return value instanceof TriggerAction;
    };
    Fayde.TriggerActionCollection = Nullstone.FinishCreate(TriggerActionCollection);

    //#endregion

    //#region EventTrigger

    var EventTrigger = Nullstone.Create("EventTrigger", TriggerBase);

    //#region Properties

    EventTrigger.ActionsProperty = DependencyProperty.RegisterFull("Actions", function () { return TriggerActionCollection; }, EventTrigger, undefined, undefined, { GetValue: function () { return new TriggerActionCollection(); } });
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

    Fayde.EventTrigger = Nullstone.FinishCreate(EventTrigger);

    //#endregion

    //#region TriggerCollection

    var TriggerCollection = Nullstone.Create("TriggerCollection", Fayde.DependencyObjectCollection);
    TriggerCollection.Instance.IsElementType = function (value) {
        return value instanceof EventTrigger;
    };
    Fayde.TriggerCollection = Nullstone.FinishCreate(TriggerCollection);

    //#endregion
})(Nullstone.Namespace("Fayde"));