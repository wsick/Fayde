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
            this.OnDataContextChanged(dobj.DataContext);
        }
        OnDetached(dobj: DependencyObject) {
            this.IsAttached = false;
            this.OnDataContextChanged(undefined);
        }
        OnDataContextChanged(newDataContext: any) { }
    }
    Fayde.RegisterType(Expression, {
    	Name: "Expression",
    	Namespace: "Fayde"
    });
}