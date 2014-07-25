/// <reference path="../Runtime/TypeManagement.ts" />

module Fayde.Data {
    export enum RelativeSourceMode {
        TemplatedParent = 1,
        Self = 2,
        FindAncestor = 3,
        ItemsControlParent = 4,
    }
    Fayde.RegisterEnum(RelativeSourceMode, "RelativeSourceMode", Fayde.XMLNS);

    export enum BindingMode {
        TwoWay = 0,
        OneWay = 1,
        OneTime = 2,
        OneWayToSource = 3,
    }
    Fayde.RegisterEnum(BindingMode, "BindingMode", Fayde.XMLNS);

    export enum UpdateSourceTrigger {
        Default = 0,
        PropertyChanged = 1,
        Explicit = 3,
    }
    Fayde.RegisterEnum(UpdateSourceTrigger, "UpdateSourceTrigger",Fayde.XMLNS);
}