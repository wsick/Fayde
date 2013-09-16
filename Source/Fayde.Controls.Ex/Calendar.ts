/// <reference path="../jsbin/Fayde.d.ts" />
/// CODE
/// <reference path="Primitives/CalendarDayButton.ts" />
/// <reference path="Primitives/CalendarButton.ts" />
/// <reference path="Primitives/CalendarItem.ts" />

module Fayde.Controls {
    var RowsPerMonth = 7;
    var ColumnsPerMonth = 7;
    var RowsPerYear = 3;
    var ColumnsPerYear = 4;
    var ElementRoot = "Root";
    var ElementMonth = "CalendarItem";

    export class Calendar extends Control {
        static CalendarButtonStyleProperty = DependencyProperty.Register("CalendarButtonStyle", () => Style, Calendar);
        static CalendarDayButtonStyleProperty = DependencyProperty.Register("CalendarDayButtonStyle", () => Style, Calendar);
        static CalendarItemStyleProperty = DependencyProperty.Register("CalendarItemStyle", () => Style, Calendar);
        static IsTodayHighlightedProperty = DependencyProperty.Register("IsTodayHighlighted", () => Boolean, Calendar, true);
        static DisplayModeProperty = DependencyProperty.Register("DisplayMode", () => new Enum(CalendarMode), Calendar, CalendarMode.Month);
        static FirstDayOfWeekProperty = DependencyProperty.Register("FirstDayOfWeek", () => new Enum(DayOfWeek), Calendar, DayOfWeek.Sunday);
        static SelectionModeProperty = DependencyProperty.Register("SelectionMode", () => CalendarSelectionMode, Calendar, CalendarSelectionMode.SingleDate);
        static SelectedDateProperty = DependencyProperty.Register("SelectedDate", () => DateTime, Calendar);
        static DisplayDateProperty = DependencyProperty.Register("DisplayDate", () => DateTime, Calendar);
        static DisplayDateStartProperty = DependencyProperty.Register("DisplayDateStart", () => DateTime, Calendar);
        static DisplayDateEndProperty = DependencyProperty.Register("DisplayDateEnd", () => DateTime, Calendar);
        CalendarButtonStyle: Style;
        CalendarDayButtonStyle: Style;
        CalendarItemStyle: Style;
        IsTodayHighlighted: boolean;
        DisplayMode: CalendarMode;
        FirstDayOfWeek: DayOfWeek;
        SelectionMode: CalendarSelectionMode;
        SelectedDate: DateTime;
        DisplayDate: DateTime;
        DisplayDateStart: DateTime;
        DisplayDateEnd: DateTime;

        DisplayDateChanged = new MulticastEvent<CalendarDateChangedEventArgs>();
        DisplayModeChanged = new MulticastEvent<CalendarModeChangedEventArgs>();
        SelectedDatesChanged = new MulticastEvent<Controls.Primitives.SelectionChangedEventArgs>();

        private _BlackoutDates: DateTime[] = [];
        private _SelectedDates: DateTime[] = [];
        private _RemovedItems: DateTime[] = [];
        private _LastSelectedDate: DateTime = null;

        private _Root: Panel = null;
        private _SelectedMonth: DateTime = null;
        private _SelectedYear: DateTime = null;
        private _DisplayDateInternal: DateTime = null;

        private _HoverStart: DateTime = null;
        private _HoverStartIndex: number = null;
        private _HoverEndInternal: DateTime = null;
        private get _HoverEnd(): DateTime { return this._HoverEndInternal; }
        private set _HoverEnd(value: DateTime) {
            this._HoverEndInternal = value;
            this._LastSelectedDate = value;
        }
        private _HoverEndIndex: number = null;
        
        private get _DisplayDateRangeStart(): DateTime {
            var end = this.DisplayDateStart;
            if (!end)
                return DateTime.MinValue;
            return end;
        }
        private get _DisplayDateRangeEnd(): DateTime {
            var end = this.DisplayDateEnd;
            if (!end)
                return DateTime.MaxValue;
            return end;
        }

        private get MonthControl(): CalendarItem {
            if (!this._Root || this._Root.Children.Count <= 0)
                return null;
            var item = <CalendarItem>this.Root.Children.GetValueAt(0);
            if (item instanceof CalendarItem)
                return item;
            return null;
        }

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this._Root = <Panel>this.GetTemplateChild("Root");
            if (!(this._Root instanceof Panel))
                this._Root = null;
            this._SelectedMonth = this.DisplayDate;
            this._SelectedYear = this.DisplayDate;
            if (this._Root != null) {
                var calendarItem = <CalendarItem>this.GetTemplateChild("CalendarItem");
                if (!(calendarItem instanceof CalendarItem))
                    calendarItem = null;
                if (calendarItem != null) {
                    calendarItem.Owner = this;
                    if (this.CalendarItemStyle != null)
                        calendarItem.Style = this.CalendarItemStyle;
                }
            }

            this.SizeChanged.Subscribe(this._SizeChanged, this);
        }

        private _SizeChanged(sender: any, e: SizeChangedEventArgs) {
            if (!this._Root)
                return;
            var rectangleGeometry = new Fayde.Media.RectangleGeometry();
            rectangleGeometry.Rect = new rect();
            rect.set(rectangleGeometry.Rect, 0.0, 0.0, e.NewSize.Width, e.NewSize.Height);
            this._Root.Clip = rectangleGeometry;
        }

        OnIsEnabledChanged(e: IDependencyPropertyChangedEventArgs) {
            super.OnIsEnabledChanged(e);
            var isEnabled = <boolean>e.NewValue;
            if (this.MonthControl)
                this.MonthControl.UpdateDisabledGrid(isEnabled);
        }

        private UpdateMonths() {
            var monthControl = this.MonthControl;
            if (!monthControl)
                return;
            switch (this.DisplayMode) {
                case CalendarMode.Month:
                    monthControl.UpdateMonthMode();
                    break;
                case CalendarMode.Year:
                    monthControl.UpdateYearMode();
                    break;
                case CalendarMode.Decade:
                    monthControl.UpdateDecadeMode();
                    break;
            }
        }

        private OnSelectedMonthChanged(selectedMonth: DateTime) {
            if (selectedMonth = null)
                return;
            this._SelectedMonth = selectedMonth;
            this.UpdateMonths();
        }
        private OnSelectedYearChanged(selectedYear: DateTime) {
            if (selectedYear == null)
                return;
            this._SelectedYear = selectedYear;
            this.UpdateMonths();
        }

        private IsValidDateSelection(value: DateTime): boolean {
            if (!value)
                return true;
            if (this._BlackoutDates.indexOf(value) > -1)
                return false;
            if (DateTime.Compare(value, this._DisplayDateRangeStart) < 0)
                CalendarExtensions.SetValueNoCallback(this, Calendar.DisplayDateStartProperty, value);
            else if (DateTime.Compare(value, this._DisplayDateRangeEnd) > 0)
                CalendarExtensions.SetValueNoCallback(this, Calendar.DisplayDateEndProperty, value);
            return true;
        }

        private IsValidKeyboardSelection(value: DateTime): boolean {
            if (!value)
                return true;
            if (this._BlackoutDates.indexOf(value) > -1 || DateTime.Compare(value, this._DisplayDateRangeStart) < 0)
                return false;
            else
                return DateTime.Compare(value, this.DisplayDateRangeEnd) <= 0;
        }

        private AddSelection() {
            if (this._HoverEnd == null || this._HoverStart == null)
                return;
            this._RemovedItems.push.apply(this._RemovedItems, this._SelectedDates);
            this._SelectedDates = [];
            this._AddSelectedDateRange(this._HoverStart, this._HoverEnd);
        }

        private _AddSelectedDateRange(start: DateTime, end: DateTime) {
        }

        private ProcessSelection(shift: boolean, lastSelectedDate: DateTime, index: number) {
            if (this.SelectionMode === CalendarSelectionMode.None && lastSelectedDate != null) {
                this.OnDayClick(lastSelectedDate);
            } else {
                if (lastSelectedDate == null || !this.IsValidKeyboardSelection(lastSelectedDate))
                    return;
                if (this.SelectionMode === CalendarSelectionMode.SingleRange || this.SelectionMode === CalendarSelectionMode.MultipleRange) {
                    this._RemovedItems.push.apply(this._RemovedItems, this._SelectedDates);
                    this._SelectedDates = [];
                    if (shift) {
                        this._isShiftPressed = true;
                        if (this._HoverStart == null) {
                            this._HoverStart = this._LastSelectedDate == null ? (DateTimeHelper.CompareYearMonth(this._DisplayDateInternal, DateTime.Today) !== 0 ? new DateTime(this._DisplayDateInternal) : new DateTime(DateTime.Today)) : this._LastSelectedDate;
                            var dayButtonFromDay = this.FindDayButtonFromDay(this._HoverStart);
                            if (dayButtonFromDay != null)
                                this._HoverStartIndex = dayButtonFromDay.Index;
                        }
                        this.UnHighlightDays();
                        if (!this.BlackoutDates.ContainsAny(DateTime.Compare(this._HoverStart, lastSelectedDate) >= 0 ? new CalendarDateRange(lastSelectedDate, this._HoverStart) : new CalendarDateRange(this._HoverStart, lastSelectedDate))) {
                            this._HoverEnd = lastSelectedDate;
                            if (index != null) {
                                var hoverEndIndex = this._HoverEndIndex;
                                var nullable1 = index;
                                var nullable2 = (hoverEndIndex != null && nullable1 != null) ? hoverEndIndex + nullable1 : null;
                                this._HoverEndIndex = nullable2;
                            } else {
                                var dayButtonFromDay = this.FindDayButtonFromDay(this._HoverEndInternal);
                                if (dayButtonFromDay != null)
                                    this._HoverEndIndex = dayButtonFromDay.Index;
                            }
                        }
                        this.OnDayClick(this._HoverEnd);
                        this.HighlightDays();
                    } else {
                        this._HoverStart = lastSelectedDate;
                        this._HoverEnd = lastSelectedDate;
                        this.AddSelection();
                        this.OnDayClick(lastSelectedDate);
                    }
                } else {
                    this._LastSelectedDate = lastSelectedDate;
                    if (this._SelectedDates.length > 0)
                        this._SelectedDates[0] = lastSelectedDate;
                    else
                        this._SelectedDates.push(lastSelectedDate);
                    this.OnDayClick(lastSelectedDate);
                }
            }
        }

        private OnCalendarButtonStyleChanged(args: IDependencyPropertyChangedEventArgs) {
            var newCalendarButtonStyle = <Style>args.NewValue;
            var oldCalendarButtonStyle = <Style>args.OldValue;
            if (newCalendarButtonStyle == null)
                return;
            var monthControl = this.MonthControl;
            if (monthControl == null || monthControl.YearView == null)
                return;
            var enumerator = monthControl.YearView.Children.GetEnumerator();
            var calendarButton: CalendarButton;
            while (enumerator.MoveNext()) {
                calendarButton = <CalendarButton>enumerator.Current;
                if (calendarButton instanceof CalendarButton)
                    Calendar.EnsureCalendarButtonStyle(calendarButton, oldCalendarButtonStyle, newCalendarButtonStyle);
            }
        }
        private static EnsureCalendarButtonStyle(calendarButton: CalendarButton, oldCalendarButtonStyle: Style, newCalendarButtonStyle: Style) {
            if (newCalendarButtonStyle == null || calendarButton == null || calendarButton.Style != null && calendarButton.Style !== oldCalendarButtonStyle)
                return;
            calendarButton.Style = newCalendarButtonStyle;
        }

        private OnCalendarDayButtonStyleChanged(args: IDependencyPropertyChangedEventArgs) {
            var newDayButtonStyle = <Style>args.NewValue;
            var oldDayButtonStyle = <Style>args.OldValue;
            if (newDayButtonStyle == null)
                return;
            var monthControl = this.MonthControl;
            if (monthControl == null || monthControl.MonthView == null)
                return;

            var enumerator = monthControl.YearView.Children.GetEnumerator();
            var dayButton: CalendarDayButton;
            while (enumerator.MoveNext()) {
                dayButton = <CalendarDayButton>enumerator.Current;
                if (dayButton instanceof CalendarDayButton)
                    Calendar.EnsureDayButtonStyle(dayButton, oldDayButtonStyle, newDayButtonStyle);
            }
        }
        private static EnsureDayButtonStyle(dayButton: CalendarDayButton, oldDayButtonStyle: Style, newDayButtonStyle: Style) {
            if (newDayButtonStyle == null || dayButton == null || dayButton.Style != null && dayButton.Style !== oldDayButtonStyle)
                return;
            dayButton.Style = newDayButtonStyle;
        }

        private OnCalendarItemStyleChanged(args: IDependencyPropertyChangedEventArgs) {
            var newMonthStyle = <Style>args.NewValue;
            var oldMonthStyle = <Style>args.OldValue;
            if (newMonthStyle == null)
                return;
            var monthControl = this.MonthControl;
            if (monthControl == null)
                return;
            Calendar.EnsureMonthStyle(monthControl, oldMonthStyle, newMonthStyle);
        }
        private static EnsureMonthStyle(month: CalendarItem, oldMonthStyle: Style, newMonthStyle: Style) {
            if (newMonthStyle == null || month == null || month.Style != null && month.Style !== oldMonthStyle)
                return;
            month.Style = newMonthStyle;
        }

        private OnIsTodayHighlightedChanged(args: IDependencyPropertyChangedEventArgs) {
            var displayDate = this.DisplayDate;
            var num = DateTimeHelper.CompareYearMonth(this._DisplayDateInternal, DateTime.Today);
            if (num <= -2 || num >= 2)
                return;
            this.UpdateMonths();
        }

        private OnDisplayModePropertyChanged(args: IDependencyPropertyChangedEventArgs) {
            var calendarMode1 = <CalendarMode>args.NewValue;
            var calendarMode2 = <CalendarMode>args.OldValue;
            var monthControl = this.MonthControl;
            if (CalendarExtensions.IsHandlerSuspended(this, Calendar.DisplayModeProperty))
                return;
            if (isValidDisplayMode(calendarMode1)) {
                if (monthControl != null) {
                    switch (calendarMode2) {
                        case CalendarMode.Month:
                            this._SelectedYear = this._DisplayDateInternal;
                            this._SelectedMonth = this._DisplayDateInternal;
                            break;
                        case CalendarMode.Year:
                            this.DisplayDate = this._SelectedMonth;
                            this._SelectedYear = this._SelectedMonth;
                            break;
                        case CalendarMode.Decade:
                            this.DisplayDate = this._SelectedYear;
                            this._SelectedMonth = this._SelectedYear;
                            break;
                    }
                    switch (calendarMode1) {
                        case CalendarMode.Month:
                            this.OnMonthClick();
                            break;
                        case CalendarMode.Year:
                        case CalendarMode.Decade:
                            this.OnHeaderClick();
                            break;
                    }
                }
                this.DisplayModeChanged.Raise(this, new CalendarModeChangedEventArgs(calendarMode2, calendarMode1));
            } else {
                CalendarExtensions.SetValueNoCallback(this, Calendar.DisplayModeProperty, calendarMode2);
                throw new ArgumentOutOfRangeException("DisplayMode value is not valid.");
            }
        }

        private OnFirstDayOfWeekChanged(args: IDependencyPropertyChangedEventArgs) {
            if (!isValidFirstDayOfWeek(<DayOfWeek>args.NewValue))
                throw new ArgumentOutOfRangeException("SelectionMode value is not valid.");
            this.UpdateMonths();
        }
        private OnSelectionModeChanged(args: IDependencyPropertyChangedEventArgs) {
            if (!isValidSelectionMode(args.NewValue))
                throw new ArgumentOutOfRangeException("SelectionMode value is not valid.");
            CalendarExtensions.SetValueNoCallback(this, Calendar.SelectedDateProperty, null);
            this._SelectedDates = [];
        }
        private OnSelectedDateChanged(args: IDependencyPropertyChangedEventArgs) {
            if (CalendarExtensions.IsHandlerSuspended(this, Calendar.SelectedDateProperty))
                return;
            if (this.SelectionMode === CalendarSelectionMode.None)
                throw new InvalidOperationException("The SelectedDate property cannot be set when the selection mode is None.");
            var nullable = <DateTime>args.NewValue;
            if (!this.IsValidDateSelection(nullable))
                throw new ArgumentOutOfRangeException("SelectedDate value is not valid.");
            if (nullable == null) {
                this._SelectedDates = [];
            } else if (nullable != null && (this._SelectedDates.length <= 0 || !(this._SelectedDates[0] === nullable))) {
                this._RemovedItems.push.apply(this._RemovedItems, this._SelectedDates);
                this._SelectedDates = [];
                this._AddSelectedDateRange(nullable, nullable);
            }
            if (this.SelectionMode !== CalendarSelectionMode.SingleDate)
                return;
            this._LastSelectedDate = nullable;
        }

        private UpdateDisplayDate(addedDate: DateTime, removedDate: DateTime) {
            if (DateTime.Compare(addedDate, this._DisplayDateRangeStart) < 0) {
                this.DisplayDate = this._DisplayDateRangeStart;
            } else if (DateTime.Compare(addedDate, this._DisplayDateRangeEnd) > 0) {
                this.DisplayDate = this._DisplayDateRangeEnd;
            } else {
                this._DisplayDateInternal = DateTimeHelper.DiscardDayTime(addedDate);
                this.UpdateMonths();
                this.DisplayDateChanged.Raise(this, new CalendarDateChangedEventArgs(new DateTime(removedDate), new DateTime(addedDate)));
            }
        }

        private OnDisplayDateStartChanged(args: IDependencyPropertyChangedEventArgs) {
            if (CalendarExtensions.IsHandlerSuspended(this, Calendar.DisplayDateStartProperty))
                return;
            var nullable1 = <DateTime>args.NewValue;
            if (nullable1 != null) {
                var nullable2 = this._SelectedDateMin();
                if (nullable2 != null && DateTime.Compare(nullable2, nullable1) < 0) {
                    this.DisplayDateStart = new DateTime(nullable2);
                    return;
                }
                else {
                    if (DateTime.Compare(nullable1, this._DisplayDateRangeEnd) > 0)
                        this.DisplayDateEnd = this.DisplayDateStart;
                    if (DateTimeHelper.CompareYearMonth(nullable1, this._DisplayDateInternal) > 0)
                        this.DisplayDate = nullable1;
                }
            }
            this.UpdateMonths();
        }
        private OnDisplayDateEndChanged(args: IDependencyPropertyChangedEventArgs) {
            if (CalendarExtensions.IsHandlerSuspended(this, Calendar.DisplayDateEndProperty))
                return;
            var nullable1 = <DateTime>args.NewValue;
            if (nullable1 != null) {
                var nullable2 = this._SelectedDateMax();
                if (nullable2 != null && DateTime.Compare(nullable2, nullable1) > 0) {
                    this.DisplayDateEnd = new DateTime(nullable2);
                    return;
                }
                else if (DateTime.Compare(nullable1, this._DisplayDateRangeStart) < 0) {
                    this.DisplayDateEnd = this.DisplayDateStart;
                    return;
                }
                else if (Fayde.DateTimeHelper.CompareYearMonth(nullable1, this._DisplayDateInternal) < 0)
                    this.DisplayDate = nullable1;
            }
            this.UpdateMonths();
        }

        private _SelectedDateMin(): DateTime {
            var len = this._SelectedDates.length;
            if (len <= 0)
                return new DateTime();
            var t2 = this._SelectedDates[0];
            var t1: DateTime;
            for (var i = 0; i < len; i++) {
                t1 = this._SelectedDates[i];
                if (DateTime.Compare(t1, t2) < 0)
                    t2 = t1;
            }
            return new DateTime(t2);
        }
        private _SelectedDateMax(): DateTime {
            var len = this._SelectedDates.length;
            if (len <= 0)
                return new DateTime();
            var t2 = this._SelectedDates[0];
            var t1: DateTime;
            for (var i = 0; i < len; i++) {
                t1 = this._SelectedDates[i];
                if (DateTime.Compare(t1, t2) > 0)
                    t2 = t1;
            }
            return new DateTime(t2);
        }

        private FindDayButtonFromDay(day: DateTime): CalendarDayButton {
            var monthControl = this.MonthControl;
            var num = 49;
            if (monthControl != null && monthControl.MonthView != null) {
                for (var index = 7; index < num; ++index) {
                    var calendarDayButton = <CalendarDayButton>monthControl.MonthView.Children.GetValueAt(index);
                    var nullable = <DateTime>calendarDayButton.DataContext;
                    if (nullable != null && Fayde.DateTimeHelper.CompareDays(nullable, day) === 0)
                        return calendarDayButton;
                }
            }
            return null;
        }
    }
    Fayde.RegisterType(Calendar, {
        Name: "Calendar",
        Namespace: "Fayde.Controls",
        XmlNamespace: Fayde.XMLNS
    });

    function isValidDisplayMode(mode: CalendarMode): boolean {
        if (mode !== CalendarMode.Month && mode !== CalendarMode.Year)
            return mode === CalendarMode.Decade;
        return true;
    }
    function isValidFirstDayOfWeek(dayOfWeek: DayOfWeek): boolean {
        switch (dayOfWeek) {
            case DayOfWeek.Sunday:
            case DayOfWeek.Monday:
            case DayOfWeek.Tuesday:
            case DayOfWeek.Wednesday:
            case DayOfWeek.Thursday:
            case DayOfWeek.Friday:
                return true;
            default:
                return dayOfWeek === DayOfWeek.Saturday;
        }
    }
    function isValidSelectionMode(calendarSelectionMode: CalendarSelectionMode): boolean {
        switch (calendarSelectionMode) {
            case CalendarSelectionMode.SingleDate:
            case CalendarSelectionMode.SingleRange:
            case CalendarSelectionMode.MultipleRange:
                return true;
            default:
                return calendarSelectionMode === CalendarSelectionMode.None;
        }
    }

    var suspendedHandlers: boolean[][] = [];
    class CalendarExtensions {
        static IsHandlerSuspended(dobj: DependencyObject, propd: DependencyProperty): boolean {
            var handlers = suspendedHandlers[(<any>dobj)._ID];
            if (!handlers)
                return false;
            return handlers[propd._ID] === true;
        }
        static SetValueNoCallback(dobj: DependencyObject, propd: DependencyProperty, value: any) {
            CalendarExtensions.SuspendHandler(dobj, propd, true);
            try {
                dobj.SetValue(propd, value);
            } finally {
                CalendarExtensions.SuspendHandler(dobj, propd, false);
            }
        }
        static SuspendHandler(dobj: DependencyObject, propd: DependencyProperty, suspend: boolean) {
            var handlers = suspendedHandlers[(<any>dobj)._ID];
            if (!handlers) {
                handlers = suspendedHandlers[(<any>dobj)._ID] = [];
                handlers[propd._ID] = suspend;
                return;
            }

            if (!suspend) {
                delete handlers[propd._ID];
                return;
            }

            handlers[propd._ID] = true;
        }
    }
}