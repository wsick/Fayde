module Fayde.Localization {
    export enum CalendarWeekRule {
        FirstDay,
        FirstFullWeek,
        FirstFourDayWeek,
    }
    export class DateTimeFormatInfo {
        AbbreviatedDayNames: string[] = [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
        ];
        AbbreviatedMonthGenitiveNames: string[];
        AbbreviatedMonthNames: string[] = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];
        AMDesignator: string = "AM";
        Calendar: any; //Calendar
        CalendarWeekRule: CalendarWeekRule;
        DateSeparator: string;
        DayNames: string[] = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
        FirstDayOfWeek: DayOfWeek = DayOfWeek.Sunday;
        FullDateTimePattern: string;
        LongDatePattern: string;
        LongTimePattern: string;
        MonthDayPattern: string;
        MonthGenitiveNames: string[];
        MonthNames: string[] = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        PMDesignator: string = "PM";
        RFC1123Pattern: string;
        ShortDatePattern: string;
        ShortestDayNames: string[];
        ShortTimePattern: string;
        SortableDateTimePattern: string;
        TimeSeparator: string;
        UniversalSortableDateTimePattern: string;
        YearMonthPattern: string;

        static Instance = new DateTimeFormatInfo();
    }
}