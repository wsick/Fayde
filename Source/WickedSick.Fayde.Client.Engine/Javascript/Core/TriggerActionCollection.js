/// <reference path="Collections/DependencyObjectCollection.js"/>
/// <reference path="TriggerAction.js"/>
/// CODE

(function (namespace) {
    var TriggerActionCollection = Nullstone.Create("TriggerActionCollection", Fayde.DependencyObjectCollection);

    TriggerActionCollection.Instance.IsElementType = function (value) {
        return value instanceof TriggerAction;
    };

    namespace.TriggerActionCollection = Nullstone.FinishCreate(TriggerActionCollection);
})(window);