
module Fayde.Controls {
    export enum ValidSpinDirections {
        None = 0,
        Increase = 1,
        Decrease = 2
    }
    Fayde.RegisterEnum(ValidSpinDirections, "ValidSpinDirections");

    export enum SpinDirection {
        Increase,
        Decrease
    }
    Fayde.RegisterEnum(SpinDirection, "SpinDirection");

    export enum InvalidInputAction {
        UseFallbackItem,
        TextBoxCannotLoseFocus
    }
    Fayde.RegisterEnum(InvalidInputAction, "InvalidInputAction");
    
    export enum Dock {
        Left,
        Top,
        Right,
        Bottom
    }
    Fayde.RegisterEnum(Dock, "Dock");

    export enum DatePickerFormat {
        Long,
        Short,
    }
    Fayde.RegisterEnum(DatePickerFormat, "DatePickerFormat");

    export enum CalendarMode {
        Month,
        Year,
        Decade,
    }
    Fayde.RegisterEnum(CalendarMode, "CalendarMode");

    export enum CalendarSelectionMode {
        SingleDate,
        SingleRange,
        MultipleRange,
        None
    }
    Fayde.RegisterEnum(CalendarSelectionMode, "CalendarSelectionMode");
}