/// <reference path="../Core/Expression.ts" />
/// CODE
/// <reference path="Enums.ts" />

module Fayde.Data {
    export class BindingExpressionBase extends Fayde.Expression {
        private _Binding;
        get Binding() { return this._Binding; }

        _TryUpdateSourceObject(value) {
        }
    }
}