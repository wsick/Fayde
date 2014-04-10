module Fayde.Localization {
    export enum CalendarWeekRule {
        FirstDay,
        FirstFullWeek,
        FirstFourDayWeek,
    }
    export class DateTimeFormatInfo {
        AbbreviatedDayNames: string[];
        AbbreviatedMonthGenitiveNames: string[];
        AbbreviatedMonthNames: string[];
        AMDesignator: string;
        Calendar: any; //Calendar
        CalendarWeekRule: CalendarWeekRule;
        DateSeparator: string;
        DayNames: string[];
        FirstDayOfWeek: DayOfWeek;
        FullDateTimePattern: string;
        LongDatePattern: string;
        LongTimePattern: string;
        MonthDayPattern: string;
        MonthGenitiveNames: string[];
        MonthNames: string[];
        PMDesignator: string;
        RFC1123Pattern: string;
        ShortDatePattern: string;
        ShortestDayNames: string[];
        ShortTimePattern: string;
        SortableDateTimePattern: string;
        TimeSeparator: string;
        UniversalSortableDateTimePattern: string;
        YearMonthPattern: string;
    }
}