module Fayde.Controls {
    export class CalendarBlackoutDatesCollection extends Collections.ObservableCollection<CalendarDateRange> {
        constructor(private _Owner: Calendar) {
            super();
        }

        AddDatesInPast() {
            this.Add(new CalendarDateRange(DateTime.MinValue, DateTime.Today.AddDays(-1)));
        }
        ContainsRange(start: DateTime, end?: DateTime): boolean {
            if (!end) {
                for (var enumerator = this.GetEnumerator(); enumerator.MoveNext();) {
                    if (enumerator.Current.InRange(start))
                        return true;
                }
                return false;
            } else {
                var dt1 = new DateTime(0);
                var dt2 = new DateTime(0);
                if (DateTime.Compare(end, start) > -1) {
                    if (start) dt1 = start.Date;
                    if (end) dt2 = end.Date;
                } else {
                    if (end) dt1 = end.Date;
                    if (start) dt2 = start.Date;
                }
                for (var enumerator = this.GetEnumerator(); enumerator.MoveNext();) {
                    if (DateTime.Compare(enumerator.Current.Start, dt1) === 0 && DateTime.Compare(enumerator.Current.End, dt2) === 0)
                        return true;
                }
                return false;
            }
        }
        ContainsAny(range: CalendarDateRange): boolean {
            for (var enumerator = this.GetEnumerator(); enumerator.MoveNext();) {
                if (enumerator.Current.ContainsAny(range))
                    return true;
            }
            return false;
        }
        SetValueAt(index: number, value: CalendarDateRange) {
            this._Validate(value);
            super.SetValueAt(index, value);
            this._Owner.UpdateMonths();
        }
        Add(value: CalendarDateRange) {
            this._Validate(value);
            super.Add(value);
            this._Owner.UpdateMonths();
        }
        AddRange(values: CalendarDateRange[]) {
            for (var i = 0; i < values.length; i++) {
                this._Validate(values[i]);
            }
            super.AddRange(values);
            this._Owner.UpdateMonths();
        }
        Insert(value: CalendarDateRange, index: number) {
            this._Validate(value);
            super.Insert(value, index);
            this._Owner.UpdateMonths();
        }
        Remove(value: CalendarDateRange) {
            super.Remove(value);
            this._Owner.UpdateMonths();
        }
        RemoveAt(index: number) {
            super.RemoveAt(index);
            this._Owner.UpdateMonths();
        }
        Clear() {
            super.Clear();
            this._Owner.UpdateMonths();
        }

        private _Validate(item: CalendarDateRange) {
            for (var enumerator = this._Owner.SelectedDates.GetEnumerator(); enumerator.MoveNext();) {
                if (item.InRange(enumerator.Current))
                    throw new ArgumentOutOfRangeException("Value is not valid.");
            }
        }
    }
}