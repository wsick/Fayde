/// <reference path="../../jsbin/Fayde.d.ts" />

module Fayde.Controls {
    export class DataGridFrozenGrid extends Grid {
        static IsFrozenProperty = DependencyProperty.RegisterAttached("IsFrozen", () => Boolean, DataGridFrozenGrid);
        static GetIsFrozen(dobj: DependencyObject): boolean { return dobj.GetValue(DataGridFrozenGrid.IsFrozenProperty); }
        static SetIsFrozen(dobj: DependencyObject, value: boolean) { dobj.SetValue(DataGridFrozenGrid.IsFrozenProperty, value); }
    }
    Fayde.RegisterType(DataGridFrozenGrid, {
        Name: "DataGridFrozenGrid",
        Namespace: "Fayde.Controls.Primitives",
        XmlNamespace: Fayde.XMLNS
    });
}