/// <reference path="../Runtime/TypeManagement.ts" />

module Fayde {
    export class Expression {
        IsUpdating: boolean;
        IsAttached: boolean;
        GetValue(propd: DependencyProperty): any { }
        OnAttached(target: XamlObject) {
            this.IsAttached = true;
            this.OnDataContextChanged(target.XamlNode.DataContext);
        }
        OnDetached(target: XamlObject) {
            this.IsAttached = false;
            this.OnDataContextChanged(undefined);
        }
        OnDataContextChanged(newDataContext: any) { }
    }
    Fayde.RegisterType(Expression, "Fayde");
}