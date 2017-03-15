module Fayde.Localization {
    export class CultureInfo {
        private $calendar: Calendar = null;
        private $dtinfo: DateTimeFormatInfo = null;

        static Current = new CultureInfo();

        get Calendar(): Calendar {
            return this.$calendar = this.$calendar || getDefaultCalendar();
        }

        get DateTimeFormat(): DateTimeFormatInfo {
            return this.$dtinfo = this.$dtinfo || new DateTimeFormatInfo(this.Calendar);
        }
    }

    function getDefaultCalendar(): Calendar {
        return new GregorianCalendar();
    }
}