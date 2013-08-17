/// <reference path="../Runtime/Nullstone.ts" />
/// CODE
/// <reference path="Enums.ts" />

module Fayde.Data {
    export class RelativeSource {
        Mode: RelativeSourceMode = RelativeSourceMode.TemplatedParent;
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