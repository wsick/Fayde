/// <reference path="../jsbin/Fayde.d.ts" />

module Fayde.Controls {
    export class DataGridRowGroupHeader extends Control {
        get OwningGrid(): DataGrid {
        }
    }
    Fayde.RegisterType(DataGridRowGroupHeader, {
        Name: "DataGridRowGroupHeader",
        Namespace: "Fayde.Controls",
        XmlNamespace: Fayde.XMLNS
    });
}