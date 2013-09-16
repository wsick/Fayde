/// <reference path="../../jsbin/Fayde.d.ts" />

module Fayde.Controls.Primitives {
    export class CalendarItem extends Control {

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }
    }
    Fayde.RegisterType(CalendarItem, {
        Name: "CalendarItem",
        Namespace: "Fayde.Controls.Primitives",
        XmlNamespace: Fayde.XMLNS
    });
}