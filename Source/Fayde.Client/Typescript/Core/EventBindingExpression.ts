/// <reference path="Expression.ts" />
/// CODE

module Fayde {
    export class EventBindingExpression extends Expression {
        IsUpdating: boolean = false;
        IsAttached: boolean = false;
        
        private _EventBinding: EventBinding;
        private _CommandWalker: Data.PropertyPathWalker = null;
        private _CommandParameterWalker: Data.PropertyPathWalker = null;

        private _Target: XamlObject = null;
        private _Event: MulticastEvent<EventArgs> = null;
        private _EventName: string = null;

        constructor(eventBinding: EventBinding) {
            super();
            this._EventBinding = eventBinding;

            var cb = this._EventBinding.CommandBinding;
            if (cb)
                this._CommandWalker = new Data.PropertyPathWalker(cb.Path.ParsePath, cb.BindsDirectlyToSource, false, !cb.ElementName && !cb.Source && !cb.RelativeSource);

            var cpb = this._EventBinding.CommandParameterBinding;
            if (cpb)
                this._CommandParameterWalker = new Data.PropertyPathWalker(cpb.Path.ParsePath, cpb.BindsDirectlyToSource, false, !cpb.ElementName && !cpb.Source && !cpb.RelativeSource);
        }

        Init(event: MulticastEvent<EventArgs>, eventName: string) {
            this._Event = event;
            this._EventName = eventName;
        }

        GetValue(propd: DependencyProperty): any { }
        OnAttached(target: XamlObject) {
            if (this.IsAttached)
                return;
            this.IsAttached = true;
            this._Target = target;
            if (this._Event)
                this._Event.Subscribe(this._Callback, this);
        }
        OnDetached(target: XamlObject) {
            if (!this.IsAttached)
                return;
            if (this._Event)
                this._Event.Unsubscribe(this._Callback, this);
            this.IsAttached = false;
        }
        OnDataContextChanged(newDataContext: any) { }

        private _Callback(sender: any, e: EventArgs) {
            var target = this._Target;

            var csource = findSource(target, this._EventBinding.CommandBinding);
            var etarget = csource;
            var cw = this._CommandWalker;
            if (cw)
                etarget = cw.GetValue(etarget);
            if (!etarget) {
                console.warn("[EVENTBINDING]: Could not find command target for event '" + this._EventName + "'.");
                return;
            }

            var cpb = this._EventBinding.CommandParameterBinding;
            var cpar: any = null;
            if (cpb) {
                var cpw = this._CommandParameterWalker;
                var cpsource = findSource(target, cpb);
                cpar = cpw.GetValue(cpsource);
            } else {
                cpar = {
                    sender: sender,
                    args: e
                };
            }

            if (typeof etarget === "function") {
                (<Function>etarget)(cpar);
            } else if (Nullstone.DoesInheritFrom(etarget, Fayde.Input.ICommand_)) {
                var ecmd = <Fayde.Input.ICommand>etarget;
                if (ecmd.CanExecute(cpar))
                    ecmd.Execute(cpar);
            } else {
                console.warn("[EVENTBINDING]: Could not find command target for event '" + this._EventName + "'.");
                return;
            }
        }
    }

    function findSource(target: XamlObject, binding: Data.Binding): any {
        if (binding) {
            if (binding.Source)
                return binding.Source;

            if (binding.ElementName != null)
                return findSourceByElementName(target, binding.ElementName);

            if (binding.RelativeSource) {
                var source: any;
                switch (binding.RelativeSource.Mode) {
                    case Data.RelativeSourceMode.Self:
                        source = target;
                        break;
                    case Data.RelativeSourceMode.TemplatedParent:
                        source = target.TemplateOwner;
                        break;
                    case Data.RelativeSourceMode.FindAncestor:
                        //TODO: Implement
                        break;
                }
                return source;
            }
        }
        return target.XamlNode.DataContext;
    }
    function findSourceByElementName(target: XamlObject, name: string): XamlObject {
        var xobj: XamlObject = target;
        var sourceNode: XamlNode;
        var xnode: XamlNode = (xobj) ? xobj.XamlNode : null;
        var parentNode: XamlNode;
        while (xnode) {
            sourceNode = xnode.FindName(name);
            if (sourceNode)
                return sourceNode.XObject;
            if (xnode.XObject.TemplateOwner)
                xobj = xnode.XObject.TemplateOwner;
            else if ((parentNode = xnode.ParentNode) && Controls.ItemsControl.GetItemsOwner(<UIElement>parentNode.XObject))
                xnode = parentNode;
            break;
        }
        return undefined;
    }
}