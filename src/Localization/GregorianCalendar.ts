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

        AddMonths(time: DateTime, months: number): DateTime {
            if (months < -120000 || months > 120000) {
                throw new ArgumentOutOfRangeException("Invalid months argument");
            }
            var datePart1 = this.GetDatePart(time.Ticks, 0);
            var datePart2 = this.GetDatePart(time.Ticks, 2);
            var day = this.GetDatePart(time.Ticks, 3);
            var num1 = datePart2 - 1 + months;
            var month = 0,
                year = 0;
            if (num1 >= 0) {
                month = num1 % 12 + 1;
                year = datePart1 + num1 / 12;
            } else {
                month = 12 + (num1 + 1) % 12;
                year = datePart1 + (num1 - 11) / 12;
            }

            day = Math.min(day, this.GetDaysInMonth(year, month, this.CurrentEra));
            var ticks = this.DateToTicks(year, month, day) + time.Ticks % 864000000000;
            Calendar.CheckAddResult(ticks, this.MinSupportedDateTime, this.MaxSupportedDateTime);
            return new DateTime(ticks);
        }

        GetDayOfWeek(time: DateTime): DayOfWeek {
            var d = time.Day;
            var m = time.Month;
            var y = time.Year;
            var t = [ 0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4 ];
            y -= m < 3?1:0;
            return <DayOfWeek>Math.floor((y + y / 4 - y / 100 + y / 400 + t[m - 1] + d) % 7);
        }

        IsLeapYear(year: number, era?: number): boolean {
            return isLeapYear(year);
        }

        protected  GetDatePart(ticks: number, part: number): number {
            var num1 = Math.floor(ticks / 864000000000);
            var num2 = num1 / 146097;
            var num3 = num1 - num2 * 146097;
            var num4 = num3 / 36524;
            if (num4 === 4)
                num4 = 3;
            var num5 = num3 - num4 * 36524;
            var num6 = num5 / 1461;
            var num7 = num5 - num6 * 1461;
            var num8 = num7 / 365;
            if (num8 === 4)
                num8 = 3;
            if (part === 0)
                return num2 * 400 + num4 * 100 + num6 * 4 + num8 + 1;
            var num9 = num7 - num8 * 365;
            if (part === 1)
                return num9 + 1;
            var numArray = (num8 !== 3 ? 0 : (num6 !== 24 ? 1 : (num4 === 3 ? 1 : 0))) !== 0 ? GregorianCalendar.DaysToMonth366 : GregorianCalendar.DaysToMonth365;
            var index = num9 >> 6;
            while (num9 >= numArray[index])
                ++index;
            if (part === 2)
                return index;
            return num9 - numArray[index - 1] + 1;
        }

        protected DateToTicks(year: number, month: number, day: number): number {
            return this.GetAbsoluteDate(year, month, day) * 864000000000;
        }

        protected GetAbsoluteDate(year: number, month: number, day: number): number {
            var days = this.GetDaysInMonth(year, month, this.CurrentEra);
            if (day >= 1 && day <= days) {
                var prevYear = year - 1;
                var daysInPrevMonth = this.IsLeapYear(year, this.CurrentEra)
                    ? GregorianCalendar.DaysToMonth365[month - 1]
                    : GregorianCalendar.DaysToMonth366[month - 1];
                return Math.floor(prevYear * 365 + prevYear / 4 - prevYear / 100 + prevYear / 400 + daysInPrevMonth + day - 1);
            }
        }
    }

    function isLeapYear(year: number): boolean {
        if (year < 1 || year > 9999)
            throw new ArgumentOutOfRangeException("Invalid year");
        if (year % 4 !== 0)
            return false;
        if (year % 100 === 0)
            return year % 400 == 0;
        return true;
    }
}