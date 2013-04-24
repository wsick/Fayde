/// <reference path="BindingExpressionBase.ts" />
/// CODE

module Fayde.Data {
    export class BindingExpression extends BindingExpressionBase {
        constructor(binding: Data.Binding, target: DependencyObject, propd: DependencyProperty) {
            super(binding, target, propd);
        }


    }
    Nullstone.RegisterType(BindingExpression, "BindingExpression");
}