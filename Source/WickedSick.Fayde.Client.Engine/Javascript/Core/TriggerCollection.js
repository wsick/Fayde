/// <reference path="Collections/DependencyObjectCollection.js"/>
/// CODE
/// <reference path="EventTrigger.js"/>

(function (namespace) {
    var TriggerCollection = Nullstone.Create("TriggerCollection", DependencyObjectCollection);

    TriggerCollection.Instance.IsElementType = function (value) {
        return value instanceof EventTrigger;
    };

    namespace.TriggerCollection = Nullstone.FinishCreate(TriggerCollection);
})(window);