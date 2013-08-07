/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="DependencyObject.ts" />

module Fayde {
    export class Expression {
        IsUpdating: boolean;
        IsAttached: boolean;
        GetValue(propd: DependencyProperty): any { }
        OnAttached(dobj: DependencyObject) {
            this.IsAttached = true;
        }
        OnDetached(dobj: DependencyObject) {
            this.IsAttached = false;
        }
    }
    Nullstone.RegisterType(Expression, "Expression");
}