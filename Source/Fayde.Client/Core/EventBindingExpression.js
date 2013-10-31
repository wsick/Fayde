/// <reference path="Expression.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    var EventBindingExpression = (function (_super) {
        __extends(EventBindingExpression, _super);
        function EventBindingExpression(eventBinding) {
            _super.call(this);
            this.IsUpdating = false;
            this.IsAttached = false;
            this._CommandWalker = null;
            this._CommandParameterWalker = null;
            this._Target = null;
            this._Event = null;
            this._EventName = null;
            this._EventBinding = eventBinding;

            var cb = this._EventBinding.CommandBinding;
            if (cb)
                this._CommandWalker = new Fayde.Data.PropertyPathWalker(cb.Path.ParsePath, cb.BindsDirectlyToSource, false, !cb.ElementName && !cb.Source && !cb.RelativeSource);

            var cpb = this._EventBinding.CommandParameterBinding;
            if (cpb)
                this._CommandParameterWalker = new Fayde.Data.PropertyPathWalker(cpb.Path.ParsePath, cpb.BindsDirectlyToSource, false, !cpb.ElementName && !cpb.Source && !cpb.RelativeSource);
        }
        EventBindingExpression.prototype.Init = function (event, eventName) {
            this._Event = event;
            this._EventName = eventName;
        };

        EventBindingExpression.prototype.GetValue = function (propd) {
        };
        EventBindingExpression.prototype.OnAttached = function (target) {
            if (this.IsAttached)
                return;
            this.IsAttached = true;
            this._Target = target;
            if (this._Event)
                this._Event.Subscribe(this._Callback, this);
        };
        EventBindingExpression.prototype.OnDetached = function (target) {
            if (!this.IsAttached)
                return;
            if (this._Event)
                this._Event.Unsubscribe(this._Callback, this);
            this.IsAttached = false;
        };
        EventBindingExpression.prototype.OnDataContextChanged = function (newDataContext) {
        };

        EventBindingExpression.prototype._Callback = function (sender, e) {
            var target = this._Target;

            var csource = findSource(target, this._EventBinding.CommandBinding);
            var context = csource;
            var etarget = context;
            var cw = this._CommandWalker;
            if (cw) {
                etarget = cw.GetValue(etarget);
                context = cw.GetContext();
                if (context == null)
                    context = csource;
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
                (etarget).call(context, cargs);
            } else if (Nullstone.DoesInheritFrom(etarget, Fayde.Input.ICommand_)) {
                var ecmd = etarget;
                if (ecmd.CanExecute.call(context, cargs))
                    ecmd.Execute.call(context, cargs);
            } else {
                console.warn("[EVENTBINDING]: Could not find command target for event '" + this._EventName + "'.");
                return;
            }
        };
        return EventBindingExpression;
    })(Fayde.Expression);
    Fayde.EventBindingExpression = EventBindingExpression;

    function findSource(target, binding) {
        if (binding) {
            if (binding.Source)
                return binding.Source;

            if (binding.ElementName != null)
                return findSourceByElementName(target, binding.ElementName);

            if (binding.RelativeSource) {
                var source;
                switch (binding.RelativeSource.Mode) {
                    case Fayde.Data.RelativeSourceMode.Self:
                        source = target;
                        break;
                    case Fayde.Data.RelativeSourceMode.TemplatedParent:
                        source = target.TemplateOwner;
                        break;
                    case Fayde.Data.RelativeSourceMode.FindAncestor:
                        break;
                }
                return source;
            }
        }
        return target.XamlNode.DataContext;
    }
    function findSourceByElementName(target, name) {
        var xobj = target;
        var sourceNode;
        var xnode = (xobj) ? xobj.XamlNode : null;
        var parentNode;
        while (xnode) {
            sourceNode = xnode.FindName(name);
            if (sourceNode)
                return sourceNode.XObject;
            if (xnode.XObject.TemplateOwner)
                xobj = xnode.XObject.TemplateOwner;
else if ((parentNode = xnode.ParentNode) && Fayde.Controls.ItemsControl.GetItemsOwner(parentNode.XObject))
                xnode = parentNode;
            break;
        }
        return undefined;
    }
})(Fayde || (Fayde = {}));
//# sourceMappingURL=EventBindingExpression.js.map
