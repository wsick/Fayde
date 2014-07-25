/// <reference path="Expression.ts" />

module Fayde {
    export class TemplateBindingExpression extends Expression {
        private _Target: DependencyObject;
        private _Listener: Providers.IPropertyChangedListener;
        SourceProperty: DependencyProperty;
        TargetProperty: DependencyProperty;
        constructor(sourcePropd: DependencyProperty, targetPropd: DependencyProperty) {
            super();
            this.SourceProperty = sourcePropd;
            this.TargetProperty = targetPropd;
        }

        GetValue(propd: DependencyProperty) {
            var target = this._Target;
            var source = target.TemplateOwner;
            var value;
            if (source)
                value = source.GetValue(this.SourceProperty);
            //NOTE: Do we need to handle string conversion?
            value = Fayde.ConvertAnyToType(value, <Function>this.TargetProperty.GetTargetType());
            return value;
        }
        OnAttached(dobj: DependencyObject) {
            super.OnAttached(dobj);

            this._Target = dobj;
            this._DetachListener();

            var cc: Controls.ContentControl;
            if (this._Target instanceof Controls.ContentControl)
                cc = <Controls.ContentControl>this._Target;

            this._AttachListener();
        }
        OnDetached(dobj: DependencyObject) {
            super.OnDetached(dobj);

            var listener = this._Listener;
            if (!listener)
                return;

            var cc: Controls.ContentControl;
            if (this._Target instanceof Controls.ContentControl)
                cc = <Controls.ContentControl>this._Target;

            this._DetachListener();
            this._Target = null;
        }
        OnSourcePropertyChanged(sender: DependencyObject, args: IDependencyPropertyChangedEventArgs) {
            if (this.SourceProperty._ID !== args.Property._ID)
                return;
            try {
                // Type converting doesn't happen for TemplateBindings
                this.IsUpdating = true;
                var targetProp = this.TargetProperty;
                try {
                    this._Target.SetCurrentValue(targetProp, this.GetValue(null));
                } catch (err2) {
                    var val = targetProp.DefaultValue;
                    this._Target.SetCurrentValue(targetProp, val);
                }
            } catch (err) {

            } finally {
                this.IsUpdating = false;
            }
        }
        private _AttachListener() {
            var source = this._Target.TemplateOwner;
            if (!source)
                return;
            this._Listener = this.SourceProperty.Store.ListenToChanged(source, this.SourceProperty, (sender, args) => this.OnSourcePropertyChanged(sender, args), this);
        }
        private _DetachListener() {
            var listener = this._Listener;
            if (listener) {
                this._Listener.Detach();
                this._Listener = null;
            }
        }
    }
    Fayde.RegisterType(TemplateBindingExpression, "Fayde", Fayde.XMLNS);
}