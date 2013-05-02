var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="DependencyObject.ts" />
/// <reference path="XamlObjectCollection.ts" />
/// CODE
var Fayde;
(function (Fayde) {
    var TriggerAction = (function (_super) {
        __extends(TriggerAction, _super);
        function TriggerAction() {
            _super.apply(this, arguments);

        }
        TriggerAction.prototype.Fire = function () {
        };
        return TriggerAction;
    })(Fayde.DependencyObject);
    Fayde.TriggerAction = TriggerAction;    
    Nullstone.RegisterType(TriggerAction, "TriggerAction");
    var TriggerActionCollection = (function (_super) {
        __extends(TriggerActionCollection, _super);
        function TriggerActionCollection() {
            _super.apply(this, arguments);

        }
        return TriggerActionCollection;
    })(Fayde.XamlObjectCollection);
    Fayde.TriggerActionCollection = TriggerActionCollection;    
    Nullstone.RegisterType(TriggerActionCollection, "TriggerActionCollection");
    var TriggerBase = (function (_super) {
        __extends(TriggerBase, _super);
        function TriggerBase() {
            _super.apply(this, arguments);

        }
        return TriggerBase;
    })(Fayde.DependencyObject);
    Fayde.TriggerBase = TriggerBase;    
    Nullstone.RegisterType(TriggerBase, "TriggerBase");
    var TriggerCollection = (function (_super) {
        __extends(TriggerCollection, _super);
        function TriggerCollection() {
            _super.apply(this, arguments);

        }
        return TriggerCollection;
    })(Fayde.XamlObjectCollection);
    Fayde.TriggerCollection = TriggerCollection;    
    Nullstone.RegisterType(TriggerCollection, "TriggerCollection");
    var EventTrigger = (function (_super) {
        __extends(EventTrigger, _super);
        function EventTrigger() {
            _super.apply(this, arguments);

        }
        EventTrigger.ActionsProperty = DependencyProperty.Register("Actions", function () {
            return TriggerActionCollection;
        }, EventTrigger);
        EventTrigger.RoutedEventProperty = DependencyProperty.Register("RoutedEvent", function () {
            return MulticastEvent;
        }, EventTrigger);
        EventTrigger.Annotations = {
            ContentProperty: EventTrigger.ActionsProperty
        };
        return EventTrigger;
    })(TriggerBase);
    Fayde.EventTrigger = EventTrigger;    
    Nullstone.RegisterType(EventTrigger, "EventTrigger");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Triggers.js.map
