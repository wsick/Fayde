/// <reference path="../Runtime/Nullstone.ts" />

module Fayde.Data {
    export class BindingBase {
        private _IsSealed: boolean = false;

        private _StringFormat: string = undefined;
        private _FallbackValue: any = undefined;
        private _TargetNullValue: any = undefined;

        get StringFormat(): string { return this._StringFormat; }
        set StringFormat(value: string) {
            this.CheckSealed();
            this._StringFormat = value;
        }

        get FallbackValue(): any { return this._FallbackValue; }
        set FallbackValue(value: any) {
            this.CheckSealed();
            this._FallbackValue = value;
        }

        get TargetNullValue():any { return this._TargetNullValue; }
        set TargetNullValue(value: any) {
            this.CheckSealed();
            this._TargetNullValue = value;
        }

        CheckSealed() {
            if (this._IsSealed)
                throw new InvalidOperationException("The Binding cannot be changed after it has been used.");
        }

        Seal() { this._IsSealed = true; }
    }
    Nullstone.RegisterType(BindingBase, "BindingBase");
}