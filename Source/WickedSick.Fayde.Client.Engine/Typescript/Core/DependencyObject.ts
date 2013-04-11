/// <reference path="XamlObject.ts" />
/// CODE
/// <reference path="DependencyProperty.ts" />
/// <reference path="Providers/BasicProviderStore.ts" />
/// <reference path="Expression.ts" />
/// <reference path="../Data/BindingExpressionBase.ts" />

module Fayde {
    export class UnsetValue { }

    export class DependencyObject extends XamlObject {
        private _Expressions: Expression[] = [];
        _Store: Providers.ProviderStore;
        _CachedValues: any[] = [];

        constructor() {
            super();
            this._Store = new Providers.ProviderStore(this);
        }

        GetValue(propd: DependencyProperty): any {
            if (!propd)
                throw new ArgumentException("No property specified.");
            return this._Store.GetValue(propd);
        }
        SetValue(propd: DependencyProperty, value: any) {
            if (!propd)
                throw new ArgumentException("No property specified.");
            if (propd.IsReadOnly)
                throw new InvalidOperationException("DependencyProperty '" + (<any>propd.OwnerType)._TypeName + "." + propd.Name + "' is read only.");
            this.SetValueInternal(propd, value);
        }
        SetValueInternal(propd: DependencyProperty, value: any) {
            var expression: Fayde.Expression;
            if (value instanceof Fayde.Expression)
                expression = value;
            if (expression instanceof Fayde.Data.BindingExpressionBase) {
                var binding = (<Data.BindingExpressionBase>expression).Binding;
                var path = binding.Path.Path;
                if ((!path || path === ".") && binding.Mode === Fayde.Data.BindingMode.TwoWay)
                    throw new ArgumentException("TwoWay bindings require a non-empty Path.");
                binding.Seal();
            }

            var existing = this._Expressions[propd._ID];

            var updateTwoWay = false;
            var addingExpression = false;
            if (expression) {
                if (expression !== existing) {
                    if (expression.IsAttached)
                        throw new ArgumentException("Cannot attach the same Expression to multiple FrameworkElements");

                    if (existing)
                        this._RemoveExpression(propd);
                    this._AddExpression(propd, expression);
                }
                addingExpression = true;
                value = expression.GetValue(propd);
            } else if (existing) {
                if (existing instanceof Fayde.Data.BindingExpressionBase) {
                    var binding = (<Data.BindingExpressionBase>existing).Binding;
                    if (binding.Mode === Fayde.Data.BindingMode.TwoWay) {
                        updateTwoWay = !existing.IsUpdating && !propd.IsCustom;
                    } else if (!existing.IsUpdating || binding.Mode === Fayde.Data.BindingMode.OneTime) {
                        this._RemoveExpression(propd);
                    }
                } else if (!existing.IsUpdating) {
                    this._RemoveExpression(propd);
                }
            }

            try {
                this._Store.SetValue(propd, value);
                if (updateTwoWay)
                    (<Data.BindingExpressionBase>existing)._TryUpdateSourceObject(value);
            } catch (err) {
                if (!addingExpression)
                    throw err;
                this._Store.SetValue(propd, propd.DefaultValue);
                if (updateTwoWay)
                    (<Data.BindingExpressionBase>existing)._TryUpdateSourceObject(value);
            }
        }
        ClearValue(propd: DependencyProperty) {
            if (!propd)
                throw new ArgumentException("No dependency property.");
            if (propd.IsReadOnly && !propd.IsCustom)
                throw new ArgumentException("This property is readonly.");
            this._RemoveExpression(propd);
            this._Store.ClearValue(propd, true);
        }
        ReadLocalValue(propd: DependencyProperty): any {
            if (!propd)
                throw new ArgumentException("No property specified.");
            var expr = this._Expressions[propd._ID]
            if (expr)
                return expr;
            return this._Store.ReadLocalValue(propd);
        }

        _OnPropertyChanged(args: IDependencyPropertyChangedEventArgs) { }

        private _AddExpression(propd: DependencyProperty, expr: Expression) {
            this._Expressions[propd._ID] = expr;
            expr.OnAttached(this);
        }
        private _RemoveExpression(propd: DependencyProperty) {
            var expr = this._Expressions[propd._ID];
            if (expr) {
                this._Expressions[propd._ID] = undefined;
                expr.OnDetached(this);
            }
        }
    }
}