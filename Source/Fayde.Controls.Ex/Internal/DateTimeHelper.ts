/// <reference path="../../jsbin/Fayde.d.ts" />

module Fayde.Controls.Internal {
    export module DateTimeHelper {
        export function AddDays(time: DateTime, days: number): DateTime {
            var calendar = new GregorianCalendar();
            try {
                return new DateTime(calendar.AddDays(time, days));
            } catch (err) {
                return new DateTime();
            }
        }
        export function AddMonths(time: DateTime, months: number): DateTime {
            var calendar = new GregorianCalendar();
            try {
                return new DateTime(calendar.AddMonths(time, months));
            } catch (err) {
                return new DateTime();
            }
        }
        export function AddYears(time: DateTime, years: number): DateTime {
            var calendar = new GregorianCalendar();
            try {
                return new DateTime(calendar.AddYears(time, years));
            }
            catch (err) {
                return new DateTime();
            }
        }

        export function CompareDays(dt1: DateTime, dt2: DateTime): number {
            return DateTime.Compare(DateTimeHelper.DiscardTime(new DateTime(dt1)), DateTimeHelper.DiscardTime(new DateTime(dt2)));
        }
        export function CompareYearMonth(dt1: DateTime, dt2: DateTime): number {
            return (dt1.Year - dt2.Year) * 12 + (dt1.Month - dt2.Month);
        }

        export function DecadeOfDate(date: DateTime): number {
            return date.Year - date.Year % 10;
        }

        export function DiscardDayTime(d: DateTime): DateTime {
            return new DateTime(d.Year, d.Month, 1, 0, 0, 0);
        }
        export function DiscardTime(d: DateTime): DateTime {
            if (d == null)
                return new DateTime();
            else
                return d.Date;
        }

        export function EndOfDecade(date: DateTime): number {
            return DateTimeHelper.DecadeOfDate(date) + 9;
        }

        export function GetCurrentDateFormat(): DateTimeFormatInfo {
            if (CultureInfo.CurrentCulture.Calendar instanceof GregorianCalendar)
                return CultureInfo.CurrentCulture.DateTimeFormat;

            var optCals = CultureInfo.CurrentCulture.OptionalCalendars;
            var len = optCals.length;
            var calendar: System.Globalization.Calendar;
            for (var i = 0; i < len; i++) {
                calendar = optCals[i];
                if (calendar instanceof GregorianCalendar) {
                    var dateTimeFormat = new CultureInfo(CultureInfo.CurrentCulture.Name).DateTimeFormat;
                    dateTimeFormat.Calendar = calendar;
                    return dateTimeFormat;
                }
            }
            var dateTimeFormat1 = new CultureInfo(CultureInfo.InvariantCulture.Name).DateTimeFormat;
            dateTimeFormat1.Calendar = new GregorianCalendar();
            return dateTimeFormat1;
        }

        export function InRange(date: DateTime, range: CalendarDateRange): boolean {
            return DateTimeHelper.CompareDays(date, range.Start) > -1 && DateTimeHelper.CompareDays(date, range.End) < 1;
        }

        export function ToYearMonthPatternString(date: DateTime): string {
            var str = "";
            var currentDateFormat = DateTimeHelper.GetCurrentDateFormat();
            if (currentDateFormat != null)
                str = date.ToString(currentDateFormat.YearMonthPattern, currentDateFormat);
            return str;
        }

        export function ToYearString(date: DateTime): string {
            var str = "";
            var currentDateFormat = DateTimeHelper.GetCurrentDateFormat();
            if (currentDateFormat != null)
                str = date.Year.ToString(currentDateFormat);
            return str;
        }
    }
}