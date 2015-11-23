module Fayde.Localization {
    export class GregorianCalendar extends Calendar {
        private static DaysToMonth365: number[] = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
        private static DaysToMonth366: number[] = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];

        GetDaysInMonth(year: number, month: number, era: number): number {
            if (month < 1 || month > 12)
                throw new ArgumentOutOfRangeException("Invalid month");
            var monthDays = this.IsLeapYear(year, era)
                ? GregorianCalendar.DaysToMonth365
                : GregorianCalendar.DaysToMonth366;
            return monthDays[month] - monthDays[month - 1];
        }

        AddDays(): DateTime {
            return;
        }

        AddMonths(): DateTime {
            return;
        }

        GetDayOfWeek(): DayOfWeek {
            return;
        }

        IsLeapYear(year: number, era?: number): boolean {
            era = era || 0;
            if (year < 1 || year > 9999)
                throw new ArgumentOutOfRangeException("Invalid year");
            if (year < 1 || year > 9999)
                throw new ArgumentOutOfRangeException("Invalid year");
            if (year % 4 !== 0)
                return false;
            if (year % 100 === 0)
                return year % 400 == 0;
            return true;
        }
    }
}