/// <reference path="DependencyObject.js"/>
/// CODE

(function (namespace) {
    var TriggerAction = Nullstone.Create("TriggerAction", DependencyObject);

    TriggerAction.Instance.Fire = function () { };

    namespace.TriggerAction = Nullstone.FinishCreate(TriggerAction);
})(window);