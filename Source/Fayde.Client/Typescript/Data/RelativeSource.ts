/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="Enums.ts" />

module Fayde.Data {
    export class RelativeSource {
        Mode: RelativeSourceMode = RelativeSourceMode.TemplatedParent;
        AncestorLevel: number;
        AncestorType: Function;
        constructor(mode?: RelativeSourceMode) {
            if (mode) this.Mode = mode;
            this.AncestorLevel = 1;
            this.AncestorType = null;
        }
    }
    Fayde.RegisterType(RelativeSource, {
        Name: "RelativeSource",
        Namespace: "Fayde.Data",
        XmlNamespace: Fayde.XMLNS
    });
}