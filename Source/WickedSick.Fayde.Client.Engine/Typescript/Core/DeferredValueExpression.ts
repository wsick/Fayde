/// <reference path="Expression.ts" />
/// CODE

module Fayde {
    export class DeferredValueExpression extends Expression {
        GetValue(propd: DependencyProperty): any {
            return undefined;
        }
        toString(): string { return "DeferredValueExpression"; }
    }
    Nullstone.RegisterType(DeferredValueExpression, "DeferredValueExpression");
}