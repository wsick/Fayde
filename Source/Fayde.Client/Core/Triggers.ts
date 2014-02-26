/// <reference path="DependencyObject.ts" />
/// <reference path="XamlObjectCollection.ts" />

module Fayde {
    export class TriggerAction extends DependencyObject {
        Fire() { }
    }
    Fayde.RegisterType(TriggerAction, "Fayde", Fayde.XMLNS);
    
    export class TriggerActionCollection extends XamlObjectCollection<TriggerAction> {
        Fire() {
            var enumerator = this.GetEnumerator();
            while (enumerator.MoveNext()) {
                (<TriggerAction>enumerator.Current).Fire();
            }
        }
    }
    Fayde.RegisterType(TriggerActionCollection, "Fayde", Fayde.XMLNS);

    
    export class TriggerBase extends DependencyObject {
        Attach(target: XamlObject) { }
        Detach(target: XamlObject) { }
    }
    Fayde.RegisterType(TriggerBase, "Fayde", Fayde.XMLNS);
    
    export class EventTrigger extends TriggerBase {
        static ActionsProperty = DependencyProperty.RegisterImmutable<TriggerActionCollection>("Actions", () => TriggerActionCollection, EventTrigger);
        static RoutedEventProperty = DependencyProperty.Register("RoutedEvent", () => String, EventTrigger);
        Actions: TriggerActionCollection;
        RoutedEvent: string;
        
        private _IsAttached: boolean = false;
        
        constructor() {
            super();
            EventTrigger.ActionsProperty.Initialize(this);
        }

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
            if (actions)
                actions.Fire();
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
    Fayde.RegisterType(EventTrigger, "Fayde", Fayde.XMLNS);
    Xaml.Content(EventTrigger, EventTrigger.ActionsProperty);

    export class TriggerCollection extends XamlObjectCollection<TriggerBase> {
        XamlNode: XamlNode;
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
    Fayde.RegisterType(TriggerCollection, "Fayde", Fayde.XMLNS);
}