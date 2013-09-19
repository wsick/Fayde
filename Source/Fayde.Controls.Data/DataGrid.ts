/// <reference path="../jsbin/Fayde.d.ts" />

module Fayde.Controls {
    export class DataGrid extends Control {
        _DisplayData: Internal.DataGridDisplayData;
    }
    Fayde.RegisterType(DataGrid, {
        Name: "DataGrid",
        Namespace: "Fayde.Controls",
        XmlNamespace: Fayde.XMLNS
    });
}