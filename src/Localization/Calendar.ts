/// <reference path="../Primitives/DateTime.ts" />

module Fayde.Localization {
    export abstract class Calendar {
        ID: number = 1;
        Eras: number[] = [1];
        CurrentEra = 1;
        EraNames: string[] = ["A.D."];
        CurrentEraValue: number = 1;
        TwoDigitYearMax: number = 2029;
        MaxSupportedDateTime = new DateTime(9999, 12, 31, 23, 59, 59, 999);
        MinSupportedDateTime = new DateTime(1, 1, 1, 0, 0, 0, 0);

        abstract GetDaysInMonth(year: number, month: number, era: number): number;
        abstract GetDayOfWeek(time: DateTime): DayOfWeek;
        abstract IsLeapYear(year: number, era?: number): boolean;

        static CheckAddResult(ticks: number, minValue: DateTime, maxValue: DateTime) {
            if (ticks < minValue.Ticks || ticks > maxValue.Ticks)
                throw new ArgumentException("Invalid add result (out of range)");
        }

        abstract AddMonths(time: DateTime, months: number): DateTime;

        AddWeeks(time: DateTime, weeks: number): DateTime {
            return time.AddDays(weeks * 7);
        }
    }
}