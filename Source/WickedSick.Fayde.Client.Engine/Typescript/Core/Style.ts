/// <reference path="DependencyObject.ts" />
/// CODE
/// <reference path="Setter.ts" />

module Fayde {
    export class Style extends XamlObject {
        private _IsSealed: bool = false;

        Setters: SetterCollection;
        BasedOn: Style;
        TargetType: Function;

        Seal() {
            if (this._IsSealed)
                return;
            this.Setters._Seal(this.TargetType);
            this._IsSealed = true;

            var base = this.BasedOn;
            if (base)
                base.Seal();
        }
    }
}