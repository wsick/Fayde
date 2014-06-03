module Fayde.Controls {
    export class CalendarDateChangedEventArgs extends RoutedEventArgs {
        RemovedDate: DateTime;
        AddedDate: DateTime;
        constructor(removedDate: DateTime, addedDate: DateTime) {
            super();
            Object.defineProperty(this, "RemovedDate", { value: removedDate, writable: false });
            Object.defineProperty(this, "AddedDate", { value: addedDate, writable: false });
        }
    }
} 