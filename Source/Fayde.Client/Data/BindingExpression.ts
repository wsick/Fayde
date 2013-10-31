/// <reference path="BindingExpressionBase.ts" />

module Fayde.Data {
    export class BindingExpression extends BindingExpressionBase {
        constructor(binding: Data.Binding, target: DependencyObject, propd: DependencyProperty) {
            super(binding, target, propd);
        }
    }
    Fayde.RegisterType(BindingExpression, {
    	Name: "BindingExpression",
    	Namespace: "Fayde.Data"
    });
}