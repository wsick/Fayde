module Fayde.Data {
    export enum RelativeSourceMode {
        TemplatedParent = 1,
        Self = 2,
        FindAncestor = 3,
        ItemsControlParent = 4,
    }
    Fayde.CoreLibrary.addEnum(RelativeSourceMode, "RelativeSourceMode");

    export enum BindingMode {
        TwoWay = 0,
        OneWay = 1,
        OneTime = 2,
        OneWayToSource = 3,
    }
    Fayde.CoreLibrary.addEnum(BindingMode, "BindingMode");

    export enum UpdateSourceTrigger {
        Default = 0,
        PropertyChanged = 1,
        Explicit = 3,
    }
    Fayde.RegisterEnum(UpdateSourceTrigger, "UpdateSourceTrigger",Fayde.XMLNS);
}