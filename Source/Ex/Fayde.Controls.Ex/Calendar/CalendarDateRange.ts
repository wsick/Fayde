module Fayde.Controls {
    export class CalendarDateRange {
        private _Start = DateTime.MinValue;
        private _End = DateTime.MinValue;
        private _Description = "";

        get Start(): DateTime { return this._Start; }
        get End(): DateTime { return this._End; }
        get Description(): string { return this._Description; }

        constructor(start: DateTime, end?: DateTime, description?: string) {
            this._Start = start;
            this._End = end || start;
            this._Description = description || "";
        }

        ContainsAny(range: CalendarDateRange): boolean {
            var num = DateTime.Compare(this.Start, range.Start);
            if (num <= 0 && DateTime.Compare(this.End, range.Start) >= 0)
                return true;
            if (num >= 0)
                return DateTime.Compare(this.Start, range.End) <= 0;
            return false;
        }

        InRange(date: DateTime): boolean {
            date = date ? date.Date : new DateTime(0);
            var start = this._Start ? this._Start.Date : new DateTime(0);
            var end = this._End ? this._End.Date : new DateTime(0);
            return DateTime.Compare(date, start) > -1 && DateTime.Compare(date, end) < 1;
        }
    }
}