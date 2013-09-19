/// <reference path="../jsbin/Fayde.d.ts" />

module Fayde.Controls {
    export class DataGridRow extends Control {
        get OwningGrid(): DataGrid {
        }
    }
    Fayde.RegisterType(DataGridRow, {
        Name: "DataGridRow",
        Namespace: "Fayde.Controls",
        XmlNamespace: Fayde.XMLNS
    });
}