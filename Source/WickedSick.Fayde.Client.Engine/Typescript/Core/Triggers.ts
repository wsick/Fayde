/// <reference path="DependencyObject.ts" />
/// <reference path="XamlObjectCollection.ts" />
/// CODE

module Fayde {
    export class TriggerAction extends DependencyObject {
        Fire() { }
    }
    Nullstone.RegisterType(TriggerAction, "TriggerAction");
    
    export class TriggerActionCollection extends XamlObjectCollection {
    }
    Nullstone.RegisterType(TriggerActionCollection, "TriggerActionCollection");

    export class TriggerBase extends DependencyObject {
    }
    Nullstone.RegisterType(TriggerBase, "TriggerBase");

    export class TriggerCollection extends XamlObjectCollection {
    }
    Nullstone.RegisterType(TriggerCollection, "TriggerCollection");
    
    export class EventTrigger extends TriggerBase {
        static ActionsProperty: DependencyProperty = DependencyProperty.Register("Actions", () => TriggerActionCollection, EventTrigger);
        static RoutedEventProperty: DependencyProperty = DependencyProperty.Register("RoutedEvent", () => MulticastEvent, EventTrigger);
        
        static Annotations = { ContentProperty: EventTrigger.ActionsProperty }

        //TODO: Implement
    }
    Nullstone.RegisterType(EventTrigger, "EventTrigger");
}