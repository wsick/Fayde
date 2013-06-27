/// <reference path="DependencyObject.ts" />
/// <reference path="XamlObjectCollection.ts" />
/// CODE

module Fayde {
    export class TriggerAction extends DependencyObject {
        Fire() { }
    }
    Nullstone.RegisterType(TriggerAction, "TriggerAction");
    
    export class TriggerActionCollection extends XamlObjectCollection<TriggerAction> {
    }
    Nullstone.RegisterType(TriggerActionCollection, "TriggerActionCollection");

    
    export class TriggerBase extends DependencyObject {
        Attach(target: XamlObject) { }
        Detach(target: XamlObject) { }
    }
    Nullstone.RegisterType(TriggerBase, "TriggerBase");
    
    export class EventTrigger extends TriggerBase {
        static ActionsProperty: DependencyProperty = DependencyProperty.Register("Actions", () => TriggerActionCollection, EventTrigger);
        static RoutedEventProperty: DependencyProperty = DependencyProperty.Register("RoutedEvent", () => String, EventTrigger);
        Actions: TriggerActionCollection;
        RoutedEvent: string;
        
        private _IsAttached: bool = false;
        
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
    Nullstone.RegisterType(EventTrigger, "EventTrigger");

    export class TriggerCollection extends XamlObjectCollection<TriggerBase> {
        private get ParentXamlObject(): XamlObject {
            if (!this.XamlNode.ParentNode)
                return undefined;
            return this.XamlNode.ParentNode.XObject;
        }

        AddingToCollection(value: TriggerBase, error: BError): bool {
            if (!super.AddingToCollection(value, error))
                return false;
            var parent = this.ParentXamlObject;
            if (parent) value.Attach(parent);
            return true;
        }
        RemovedFromCollection(value: TriggerBase, isValueSafe: bool) {
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
    Nullstone.RegisterType(TriggerCollection, "TriggerCollection");
}