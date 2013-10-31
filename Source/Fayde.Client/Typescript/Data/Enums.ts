/// <reference path="../Runtime/TypeManagement.ts" />

module Fayde.Data {
    export enum RelativeSourceMode {
        TemplatedParent = 1,
        Self = 2,
        FindAncestor = 3,
    }
    Fayde.RegisterEnum(RelativeSourceMode, {
        Name: "RelativeSourceMode",
        Namespace: "Fayde.Data",
        XmlNamespace: Fayde.XMLNS
    });

    export enum BindingMode {
        TwoWay = 0,
        OneWay = 1,
        OneTime = 2,
        OneWayToSource = 3,
    }
    Fayde.RegisterEnum(BindingMode, {
        Name: "BindingMode",
        Namespace: "Fayde.Data",
        XmlNamespace: Fayde.XMLNS
    });

    export enum UpdateSourceTrigger {
        Default = 0,
        PropertyChanged = 1,
        Explicit = 3,
    }
    Fayde.RegisterEnum(UpdateSourceTrigger, {
        Name: "UpdateSourceTrigger",
        Namespace: "Fayde.Data",
        XmlNamespace: Fayde.XMLNS
    });
}