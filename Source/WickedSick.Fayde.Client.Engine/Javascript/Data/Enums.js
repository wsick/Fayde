/// <reference path="../Runtime/Nullstone.js"/>

(function (namespace) {
    namespace.RelativeSourceMode = {
        TemplatedParent: 1,
        Self: 2,
        FindAncestor: 3
    };

    namespace.BindingMode = {
        TwoWay: 0,
        OneWay: 1,
        OneTime: 2,
        OneWayToSource: 3
    };

    namespace.UpdateSourceTrigger = {
        Default: 0,
        PropertyChanged: 1,
        Explicit: 3
    };

    namespace._PropertyNodeType = {
        AttachedProperty: 0,
        Property: 1,
        Indexed: 2,
        None: 3
    };
})(Nullstone.Namespace("Fayde.Data"));