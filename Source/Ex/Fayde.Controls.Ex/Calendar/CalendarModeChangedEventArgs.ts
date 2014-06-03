module Fayde.Controls {
    export class CalendarModeChangedEventArgs extends RoutedEventArgs {
        OldMode: CalendarMode;
        NewMode: CalendarMode;
        constructor(oldMode: CalendarMode, newMode: CalendarMode) {
            super();
            Object.defineProperty(this, "OldMode", { value: oldMode, writable: false });
            Object.defineProperty(this, "NewMode", { value: newMode, writable: false });
        }
    }
}