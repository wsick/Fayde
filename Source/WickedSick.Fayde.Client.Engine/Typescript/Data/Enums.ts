module Fayde.Data {
    export enum RelativeSourceMode {
        TemplatedParent = 1,
        Self = 2,
        FindAncestor = 3,
    }

    export enum BindingMode {
        TwoWay = 0,
        OneWay = 1,
        OneTime = 2,
        OneWayToSource = 3,
    }

    export enum UpdateSourceTrigger {
        Default = 0,
        PropertyChanged = 1,
        Explicit = 3,
    }

    export enum _PropertyNodeType {
        AttachedProperty = 0,
        Property = 1,
        Indexed = 2,
        None = 3,
    }
}