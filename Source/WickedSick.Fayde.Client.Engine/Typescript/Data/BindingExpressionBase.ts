/// <reference path="../Core/Expression.ts" />
/// CODE
/// <reference path="Enums.ts" />
/// <reference path="Binding.ts" />

module Fayde.Data {
    export class BindingExpressionBase extends Fayde.Expression {
        private _Binding: Data.Binding;
        Target: DependencyObject;
        Property: DependencyProperty;
        get Binding(): Data.Binding { return this._Binding; }

        constructor(binding: Data.Binding, target: DependencyObject, propd: DependencyProperty) {
            super();
            this._Binding = binding;
            this.Target = target;
            this.Property = propd;
        }

        _TryUpdateSourceObject(value) {
        }
    }
    Nullstone.RegisterType(BindingExpressionBase, "BindingExpressionBase");
}