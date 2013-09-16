/// <reference path="../jsbin/Fayde.d.ts" />

module Fayde.Controls {
    export enum CalendarMode {
        Month,
        Year,
        Decade
    }
    Fayde.RegisterEnum(CalendarMode, {
        Name: "CalendarMode",
        Namespace: "Fayde.Controls",
        XmlNamespace: Fayde.XMLNS
    });

    export enum CalendarSelectionMode {
        SingleDate,
        SingleRange,
        MultipleRange,
        None
    }
    Fayde.RegisterEnum(CalendarSelectionMode, {
        Name: "CalendarSelectionMode",
        Namespace: "Fayde.Controls",
        XmlNamespace: Fayde.XMLNS
    });
}