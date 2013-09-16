/// <reference path="../jsbin/Fayde.d.ts" />

module Fayde.Controls {
    export class CalendarDateChangedEventArgs extends RoutedEventArgs {
        AddedDate: DateTime;
        RemovedDate: DateTime;
        constructor(addedDate: DateTime, removedDate: DateTime) {
            super();
            Object.defineProperty(this, "AddedDate", { value: addedDate, writable: false });
            Object.defineProperty(this, "RemovedDate", { value: removedDate, writable: false });
        }
    }
}