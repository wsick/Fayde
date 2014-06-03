module Fayde.Controls {
    export class DatePicker extends Control {
        static CalendarStyleProperty = DependencyProperty.Register("CalendarStyle", () => Style, DatePicker);
        static DisplayDateProperty = DependencyProperty.Register("DisplayDate", () => DateTime, DatePicker);
        static DisplayDateStartProperty = DependencyProperty.Register("DisplayDateStart", () => DateTime, DatePicker);
        static DisplayDateEndProperty = DependencyProperty.Register("DisplayDateEnd", () => DateTime, DatePicker);
        static FirstDayOfWeekProperty = DependencyProperty.Register("FirstDayOfWeek", () => new Enum(DayOfWeek), DatePicker);
        static IsDropDownOpenProperty = DependencyProperty.Register("IsDropDownOpen", () => Boolean, DatePicker);
        static IsTodayHighlightedProperty = DependencyProperty.Register("IsTodayHighlighted", () => Boolean, DatePicker);
        static SelectedDateProperty = DependencyProperty.Register("SelectedDate", () => DateTime, DatePicker);
        static SelectedDateFormatProperty = DependencyProperty.Register("SelectedDateFormat", () => new Enum(DatePickerFormat), DatePicker, DatePickerFormat.Short);
        static SelectionBackgroundProperty = DependencyProperty.Register("SelectionBackground", () => Media.Brush, DatePicker);
        static TextProperty = DependencyProperty.Register("Text", () => String, DatePicker, "");
        CalendarStyle: Style;
        DisplayDate: DateTime;
        DisplayDateStart: DateTime;
        DisplayDateEnd: DateTime;
        FirstDayOfWeek: DayOfWeek;
        IsDropDownOpen: boolean;
        IsTodayHighlighted: boolean;
        SelectedDate: DateTime;
        SelectedDateFormat: DatePickerFormat;
        SelectionBackground: Media.Brush;
        Text: string;
        
        CalendarOpened = new RoutedEvent<RoutedEventArgs>();
        CalendarClosed = new RoutedEvent<RoutedEventArgs>();
        DateValidationError = new MulticastEvent<DatePickerDateValidationErrorEventArgs>();
        SelectedDateChanged = new MulticastEvent<Primitives.SelectionChangedEventArgs>();

        private _Calendar: Calendar = null;
        get BlackoutDates(): CalendarBlackoutDatesCollection { return this._Calendar.BlackoutDates; }

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
            this.DisplayDate = DateTime.Today;
        }

        //TODO: Implement
    }
    TemplateParts(DatePicker,
        { Name: "TextBox", Type: DatePickerTextBox },
        { Name: "Popup", Type: Primitives.Popup },
        { Name: "Root", Type: FrameworkElement },
        { Name: "Button", Type: Button });
    TemplateVisualStates(DatePicker,
        { GroupName: "CommonStates", Name: "Normal" },
        { GroupName: "CommonStates", Name: "Disabled" },
        { GroupName: "ValidationStates", Name: "Valid" },
        { GroupName: "ValidationStates", Name: "InvalidFocused" },
        { GroupName: "ValidationStates", Name: "InvalidUnfocused" });
    //[StyleTypedProperty(Property = "CalendarStyle", StyleTargetType = typeof (Calendar))]
} 