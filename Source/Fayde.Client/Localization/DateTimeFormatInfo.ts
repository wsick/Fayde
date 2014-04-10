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
        AbbreviatedMonthGenitiveNames: string[] = [
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
            "Dec",
            ""
        ];
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
        DateSeparator: string = "/";
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
        FullDateTimePattern: string = "dddd, MMMM dd, yyyy h:mm:ss tt";
        LongDatePattern: string = "dddd, MMMM dd, yyyy";
        LongTimePattern: string = "h:mm:ss tt";
        MonthDayPattern: string = "MMMM dd";
        MonthGenitiveNames: string[] = [
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
            "December",
            ""
        ];
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
        RFC1123Pattern: string = "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'";
        ShortDatePattern: string = "M/d/yyyy";
        ShortestDayNames: string[] = [
            "Su",
            "Mo",
            "Tu",
            "We",
            "Th",
            "Fr",
            "Sa"
        ];
        ShortTimePattern: string = "h:mm tt";
        SortableDateTimePattern: string = "yyyy'-'MM'-'dd'T'HH':'mm':'ss";
        TimeSeparator: string = ":";
        UniversalSortableDateTimePattern: string = "yyyy'-'MM'-'dd HH':'mm':'ss'Z'";
        YearMonthPattern: string = "MMMM, yyyy";

        static Instance = new DateTimeFormatInfo();
    }
}