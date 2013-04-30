/// <reference path="BindingExpressionBase.ts" />
/// CODE

module Fayde.Data {
    export class BindingExpression extends BindingExpressionBase {
        constructor(binding: Data.Binding, target: DependencyObject, propd: DependencyProperty) {
            super(binding, target, propd);
        }

        get ParentBinding(): Binding { return this.Binding; }
        get DataItem(): any { return this.DataSource; }

        UpdateSource() {
            return this._UpdateSourceObject(undefined, true);
        }
    }
    Nullstone.RegisterType(BindingExpression, "BindingExpression");
}