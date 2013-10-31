/// <reference path="DependencyObject.ts" />
/// <reference path="XamlObjectCollection.ts" />

module Fayde {
    export class TriggerAction extends DependencyObject {
        Fire() { }
    }
    Fayde.RegisterType(TriggerAction, {
    	Name: "TriggerAction",
    	Namespace: "Fayde",
    	XmlNamespace: Fayde.XMLNS
    });
    
    export class TriggerActionCollection extends XamlObjectCollection<TriggerAction> {
    }
    Fayde.RegisterType(TriggerActionCollection, {
    	Name: "TriggerActionCollection",
    	Namespace: "Fayde",
    	XmlNamespace: Fayde.XMLNS
    });

    
    export class TriggerBase extends DependencyObject {
        Attach(target: XamlObject) { }
        Detach(target: XamlObject) { }
    }
    Fayde.RegisterType(TriggerBase, {
    	Name: "TriggerBase",
    	Namespace: "Fayde",
    	XmlNamespace: Fayde.XMLNS
    });
    
    export class EventTrigger extends TriggerBase {
        static ActionsProperty: DependencyProperty = DependencyProperty.Register("Actions", () => TriggerActionCollection, EventTrigger);
        static RoutedEventProperty: DependencyProperty = DependencyProperty.Register("RoutedEvent", () => String, EventTrigger);
        Actions: TriggerActionCollection;
        RoutedEvent: string;
        
        private _IsAttached: boolean = false;
        
        static Annotations = { ContentProperty: EventTrigger.ActionsProperty }

        Attach(target: XamlObject) {
            if (this._IsAttached)
                return;
            var evt = this._ParseEventName(target);
            if (evt) {
                this._IsAttached = true;
                evt.Subscribe(this._FireActions, this);
                return;
            }
            Warn("Could not attach to RoutedEvent: " + this.RoutedEvent);
        }
        Detach(target: XamlObject) {
            var evt = this._ParseEventName(target);
            if (evt) evt.Unsubscribe(this._FireActions, this);
            this._IsAttached = false;
        }

        private _FireActions(sender, e: RoutedEventArgs) {
            var actions = this.Actions;
            if (!actions)
                return;
            var enumerator = actions.GetEnumerator();
            while (enumerator.MoveNext()) {
                (<TriggerAction>enumerator.Current)
            }
        }

        private _ParseEventName(target: XamlObject): RoutedEvent<RoutedEventArgs> {
            //Usually comes in "FrameworkElement.Loaded"
            var routedEventName = this.RoutedEvent;
            var tokens = routedEventName.split(".");
            if (tokens.length === 1)
                routedEventName = tokens[0];
            else if (tokens.length === 2)
                routedEventName = tokens[1];
            else
                return undefined;

            var evt: RoutedEvent<RoutedEventArgs> = target[routedEventName];
            if (evt instanceof RoutedEvent)
                return evt;
            return undefined;
        }
    }
    Fayde.RegisterType(EventTrigger, {
    	Name: "EventTrigger",
    	Namespace: "Fayde",
    	XmlNamespace: Fayde.XMLNS
    });

    export class TriggerCollection extends XamlObjectCollection<TriggerBase> {
        private get ParentXamlObject(): XamlObject {
            var parentNode = this.XamlNode.ParentNode;
            if (!parentNode)
                return undefined;
            return parentNode.XObject;
        }

        AddingToCollection(value: TriggerBase, error: BError): boolean {
            if (!super.AddingToCollection(value, error))
                return false;
            var parent = this.ParentXamlObject;
            if (parent) value.Attach(parent);
            return true;
        }
        RemovedFromCollection(value: TriggerBase, isValueSafe: boolean) {
            super.RemovedFromCollection(value, isValueSafe);
            var parent = this.ParentXamlObject;
            if (parent) value.Detach(parent);
        }

        AttachTarget(target: XamlObject) {
            var enumerator = this.GetEnumerator();
            while (enumerator.MoveNext()) {
                (<TriggerBase>enumerator.Current).Attach(target);
            }
        }
        DetachTarget(target: XamlObject) {
            var enumerator = this.GetEnumerator();
            while (enumerator.MoveNext()) {
                (<TriggerBase>enumerator.Current).Detach(target);
            }
        }
    }
    Fayde.RegisterType(TriggerCollection, {
    	Name: "TriggerCollection",
    	Namespace: "Fayde",
    	XmlNamespace: Fayde.XMLNS
    });
}