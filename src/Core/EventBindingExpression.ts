/// <reference path="Expression.ts" />

module Fayde {
    export interface IEventBindingArgs<T extends EventArgs> {
        sender: any;
        args: T;
        parameter: any;
    }

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
            var context = csource;
            var etarget = context;
            var cw = this._CommandWalker;
            if (cw) {
                etarget = cw.GetValue(etarget);
                context = cw.GetContext();
                if (context == null) context = csource;
            }
            if (!etarget) {
                console.warn("[EVENTBINDING]: Could not find command target for event '" + this._EventName + "'.");
                return;
            }

            var cargs = {
                sender: sender,
                args: e,
                parameter: null
            };

            var cpb = this._EventBinding.CommandParameterBinding;
            if (cpb) {
                var cpw = this._CommandParameterWalker;
                var cpsource = findSource(target, cpb);
                cargs.parameter = cpw.GetValue(cpsource);
            }


            if (typeof etarget === "function") {
                (<Function>etarget).call(context, cargs);
            } else {
                var ecmd = Fayde.Input.ICommand_.As(etarget);
                if (!ecmd) {
                    console.warn("[EVENTBINDING]: Could not find command target for event '" + this._EventName + "'.");
                    return;
                }
                var ecmd = <Fayde.Input.ICommand>etarget;
                if (ecmd.CanExecute.call(context, cargs))
                    ecmd.Execute.call(context, cargs);
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
                switch (binding.RelativeSource.Mode) {
                    case Data.RelativeSourceMode.Self:
                        return target;
                    case Data.RelativeSourceMode.TemplatedParent:
                        return target.TemplateOwner;
                    case Data.RelativeSourceMode.FindAncestor:
                        return findAncestor(target, binding.RelativeSource);
                    case Data.RelativeSourceMode.ItemsControlParent:
                        return findItemsControlAncestor(target, binding.RelativeSource);
                }
            }
        }
        return target.XamlNode.DataContext;
    }
    function findSourceByElementName(target: XamlObject, name: string): XamlObject {
        var xobj: XamlObject = target;
        if (!xobj)
            return undefined;
        var source = xobj.FindName(name, true);
        if (source)
            return source;
        //TODO: Crawl out of ListBoxItem?
        return undefined;
    }
    function findAncestor(target: XamlObject, relSource: Data.RelativeSource): XamlObject {
        if (!(target instanceof DependencyObject))
            return;
        var ancestorType = relSource.AncestorType;
        if (typeof ancestorType !== "function") {
            console.warn("RelativeSourceMode.FindAncestor with no AncestorType specified.");
            return;
        }
        var ancestorLevel = relSource.AncestorLevel;
        if (isNaN(ancestorLevel)) {
            console.warn("RelativeSourceMode.FindAncestor with no AncestorLevel specified.");
            return;
        }
        for (var parent = VisualTreeHelper.GetParent(<DependencyObject>target); parent != null; parent = VisualTreeHelper.GetParent(parent)) {
            if (parent instanceof ancestorType && --ancestorLevel < 1)
                return parent;
        }
    }
    function findItemsControlAncestor(target: XamlObject, relSource: Data.RelativeSource): XamlObject {
        if (!(target instanceof DependencyObject))
            return;
        var ancestorLevel = relSource.AncestorLevel;
        ancestorLevel = ancestorLevel || 1; //NOTE: Will coerce 0 to 1 also
        for (var parent = VisualTreeHelper.GetParent(<DependencyObject>target); parent != null; parent = VisualTreeHelper.GetParent(parent)) {
            if (!!(<UIElement>parent).IsItemsControl && --ancestorLevel < 1)
                return parent;
        }
    }
}