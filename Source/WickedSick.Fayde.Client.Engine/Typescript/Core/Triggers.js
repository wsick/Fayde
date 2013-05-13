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
        TriggerBase.prototype.Attach = function (target) {
        };
        TriggerBase.prototype.Detach = function (target) {
        };
        return TriggerBase;
    })(Fayde.DependencyObject);
    Fayde.TriggerBase = TriggerBase;    
    Nullstone.RegisterType(TriggerBase, "TriggerBase");
    var EventTrigger = (function (_super) {
        __extends(EventTrigger, _super);
        function EventTrigger() {
            _super.apply(this, arguments);

            this._IsAttached = false;
        }
        EventTrigger.ActionsProperty = DependencyProperty.Register("Actions", function () {
            return TriggerActionCollection;
        }, EventTrigger);
        EventTrigger.RoutedEventProperty = DependencyProperty.Register("RoutedEvent", function () {
            return String;
        }, EventTrigger);
        EventTrigger.Annotations = {
            ContentProperty: EventTrigger.ActionsProperty
        };
        EventTrigger.prototype.Attach = function (target) {
            if(this._IsAttached) {
                return;
            }
            var evt = this._ParseEventName(target);
            if(evt) {
                this._IsAttached = true;
                evt.Subscribe(this._FireActions, this);
                return;
            }
            Warn("Could not attach to RoutedEvent: " + this.RoutedEvent);
        };
        EventTrigger.prototype.Detach = function (target) {
            var evt = this._ParseEventName(target);
            if(evt) {
                evt.Unsubscribe(this._FireActions, this);
            }
            this._IsAttached = false;
        };
        EventTrigger.prototype._FireActions = function (sender, e) {
            var actions = this.Actions;
            if(!actions) {
                return;
            }
            var enumerator = actions.GetEnumerator();
            while(enumerator.MoveNext()) {
                (enumerator.Current);
            }
        };
        EventTrigger.prototype._ParseEventName = function (target) {
            //Usually comes in "FrameworkElement.Loaded"
            var routedEventName = this.RoutedEvent;
            var tokens = routedEventName.split(".");
            if(tokens.length === 1) {
                routedEventName = tokens[0];
            } else if(tokens.length === 2) {
                routedEventName = tokens[1];
            } else {
                return undefined;
            }
            var evt = target[routedEventName];
            if(evt instanceof Fayde.RoutedEvent) {
                return evt;
            }
            return undefined;
        };
        return EventTrigger;
    })(TriggerBase);
    Fayde.EventTrigger = EventTrigger;    
    Nullstone.RegisterType(EventTrigger, "EventTrigger");
    var TriggerCollection = (function (_super) {
        __extends(TriggerCollection, _super);
        function TriggerCollection() {
            _super.apply(this, arguments);

        }
        Object.defineProperty(TriggerCollection.prototype, "ParentXamlObject", {
            get: function () {
                var parentNode = this.XamlNode.ParentNode;
                if(!parentNode) {
                    return undefined;
                }
                return parentNode.XObject;
            },
            enumerable: true,
            configurable: true
        });
        TriggerCollection.prototype.AddingToCollection = function (value, error) {
            if(!_super.prototype.AddingToCollection.call(this, value, error)) {
                return false;
            }
            var parent = this.ParentXamlObject;
            if(parent) {
                value.Attach(parent);
            }
            return true;
        };
        TriggerCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
            _super.prototype.RemovedFromCollection.call(this, value, isValueSafe);
            var parent = this.ParentXamlObject;
            if(parent) {
                value.Detach(parent);
            }
        };
        TriggerCollection.prototype.AttachTarget = function (target) {
            var enumerator = this.GetEnumerator();
            while(enumerator.MoveNext()) {
                (enumerator.Current).Attach(target);
            }
        };
        TriggerCollection.prototype.DetachTarget = function (target) {
            var enumerator = this.GetEnumerator();
            while(enumerator.MoveNext()) {
                (enumerator.Current).Detach(target);
            }
        };
        return TriggerCollection;
    })(Fayde.XamlObjectCollection);
    Fayde.TriggerCollection = TriggerCollection;    
    Nullstone.RegisterType(TriggerCollection, "TriggerCollection");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Triggers.js.map
