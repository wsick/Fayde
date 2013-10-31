/// <reference path="../Runtime/TypeManagement.ts" />

module Fayde.Data {
    export class RelativeSource {
        Mode: RelativeSourceMode = RelativeSourceMode.TemplatedParent;
        AncestorLevel: number = 1;
        AncestorType: Function = null;
        constructor(mode?: RelativeSourceMode) {
            if (mode) this.Mode = mode;
        }
    }
    Fayde.RegisterType(RelativeSource, {
        Name: "RelativeSource",
        Namespace: "Fayde.Data",
        XmlNamespace: Fayde.XMLNS
    });
}