/// <reference path="../../jsbin/Fayde.d.ts" />

module Fayde.Controls.Internal {
    export class CalendarDateRange {
        Start: DateTime = null;
        End: DateTime = null;
        Description: string = null;

        constructor(start: DateTime, end?: DateTime, description?: string) {
            this.Start = start;
            this.End = end == null ? start : end;
            this.Description = description;
        }

        ContainsAny(range: CalendarDateRange): boolean {
            var num = DateTime.Compare(this.Start, range.Start);
            if (num <= 0 && DateTime.Compare(this.End, range.Start) >= 0)
                return true;
            if (num >= 0)
                return DateTime.Compare(this.Start, range.End) <= 0;
            else
                return false;
        }
    }
}