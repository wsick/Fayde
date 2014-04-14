/// <reference path="../Runtime/TypeManagement.ts" />

module Fayde.Data {
    export class RelativeSource {
        Mode: RelativeSourceMode = RelativeSourceMode.TemplatedParent;
        private _AncestorLevel: number = 1;
        get AncestorLevel(): number { return this._AncestorLevel; }
        set AncestorLevel(value: number) {
            if (typeof value === "number")
                this._AncestorLevel = value;
            else
                this._AncestorLevel = parseInt(<any>value);
        }
        AncestorType: Function = null;
        constructor(mode?: RelativeSourceMode) {
            if (mode) this.Mode = mode;
        }

        Clone(): RelativeSource {
            var rs = new RelativeSource();
            rs.Mode = this.Mode;
            rs._AncestorLevel = this._AncestorLevel;
            rs.AncestorType = this.AncestorType;
            return rs;
        }
    }
    Fayde.RegisterType(RelativeSource, "Fayde.Data", Fayde.XMLNS);
}