/// <reference path="Fayde.d.ts" />
/// <reference path="_.ts" />

module Fayde.Controls.Input {
    export class Separator extends Control {
        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }
    }
    Fayde.RegisterType(Separator, {
        Name: "Separator",
        Namespace: "Fayde.Controls.Input",
        XmlNamespace: Input.XMLNS
    });
}