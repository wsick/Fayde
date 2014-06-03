module Fayde.Controls {
    import Key = Input.Key;

    export class Calendar extends Control {
        static CalendarButtonStyleProperty = DependencyProperty.Register("CalendarButtonStyle", () => Style, Calendar);
        static CalendarDayButtonStyleProperty = DependencyProperty.Register("CalendarDayButtonStyle", () => Style, Calendar);
        static CalendarItemStyleProperty = DependencyProperty.Register("CalendarItemStyle", () => Style, Calendar);
        static IsTodayHighlightedProperty = DependencyProperty.Register("IsTodayHighlighted", () => Boolean, Calendar);
        static DisplayModeProperty = DependencyProperty.Register("DisplayMode", () => new Enum(CalendarMode), Calendar);
        static FirstDayOfWeekProperty = DependencyProperty.Register("FirstDayOfWeek", () => new Enum(DayOfWeek), Calendar, Localization.DateTimeFormatInfo.Instance.FirstDayOfWeek);
        static SelectionModeProperty = DependencyProperty.Register("SelectionMode", () => new Enum(CalendarSelectionMode), Calendar);
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

        SelectedDates;

        DayButtonMouseUp = new RoutedEvent<Input.MouseButtonEventArgs>();
        DisplayModeChanged = new RoutedEvent<CalendarModeChangedEventArgs>();
        DisplayDateChanged = new RoutedEvent<CalendarDateChangedEventArgs>();
        SelectedDatesChanged = new MulticastEvent<Primitives.SelectionChangedEventArgs>();

        private _Root: Panel = null;



        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;


            Calendar.UpdateDisplayDate(this, this.DisplayDate, DateTime.MinValue);
            this.IsEnabledChanged += new DependencyPropertyChangedEventHandler((object) this, __methodptr(OnIsEnabledChanged));
            // ISSUE: method pointer
            this.MouseLeftButtonUp += new MouseButtonEventHandler((object) this, __methodptr(Calendar_MouseLeftButtonUp));
            this.BlackoutDates = new CalendarBlackoutDatesCollection(this);
            this.SelectedDates = new SelectedDatesCollection(this);
            this.RemovedItems = new Collection<DateTime>();
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this._Root = <Panel>this.GetTemplateChild("Root", Panel);
            this.SelectedMonth = this.DisplayDate;
            this.SelectedYear = this.DisplayDate;
            if (this._Root) {
                var calendarItem = <CalendarItem>this.GetTemplateChild("CalendarItem", CalendarItem);
                if (calendarItem) {
                    (<any>calendarItem)._Owner = this;
                    if (this.CalendarItemStyle != null)
                        calendarItem.Style = this.CalendarItemStyle;
                }
            }
            this.SizeChanged.Subscribe(this._SizeChanged, this);
        }

        OnGotFocus(e: RoutedEventArgs) {
            super.OnGotFocus(e);
            this.HasFocusInternal = true;
            switch (this.DisplayMode) {
                case CalendarMode.Month:
          DateTime displayDate;
                    if (this.LastSelectedDate.HasValue && DateTimeHelper.CompareYearMonth(this.DisplayDateInternal, this.LastSelectedDate.Value) == 0) {
                        displayDate = this.LastSelectedDate.Value;
                    }
                    else {
                        displayDate = this.DisplayDate;
                        this.LastSelectedDate = new DateTime? (this.DisplayDate);
                    }
                    this.FocusButton = this.FindDayButtonFromDay(displayDate);
                    if (this.FocusButton == null)
                        break;
                    this.FocusButton.IsCurrent = true;
                    break;
                case CalendarMode.Year:
                case CalendarMode.Decade:
                    if (this.FocusCalendarButton == null)
                        break;
                    this.FocusCalendarButton.IsCalendarButtonFocused = true;
                    break;
            }
        }
        OnLostFocus(e: RoutedEventArgs) {
            super.OnLostFocus(e);
            this.HasFocusInternal = false;
            switch (this.DisplayMode) {
                case CalendarMode.Month:
                    if (this.FocusButton == null)
                        break;
                    this.FocusButton.IsCurrent = false;
                    break;
                case CalendarMode.Year:
                case CalendarMode.Decade:
                    if (this.FocusCalendarButton == null)
                        break;
                    this.FocusCalendarButton.IsCalendarButtonFocused = false;
                    break;
            }
        }
        OnKeyDown(e: Input.KeyEventArgs) {
            super.OnKeyDown(e);
            if (e.Handled || !this.IsEnabled)
                return;
            e.Handled = this.ProcessCalendarKey(e);
        }
        OnKeyUp(e: Input.KeyEventArgs) {
            super.OnKeyUp(e);
            if (e.Handled || e.Key !== Key.Shift)
                return;
            this.ProcessShiftKeyUp();
        }
        OnMouseWheel(e: Input.MouseWheelEventArgs) {
            super.OnMouseWheel(e);
            if (e.Handled)
                return;
            var ctrl: boolean = false;
            var shift: boolean = false;
            CalendarExtensions.GetMetaKeyState(out ctrl, out shift);
            if (!ctrl) {
                if (e.Delta > 0)
                    this.ProcessPageUpKey(false);
                else
                    this.ProcessPageDownKey(false);
            }
            else if (e.Delta > 0)
                this.ProcessDownKey(ctrl, shift);
            else
                this.ProcessUpKey(ctrl, shift);
            e.Handled = true;
        }

        private _SizeChanged(sender: any, e: SizeChangedEventArgs) {
            var rectangleGeometry = new Media.RectangleGeometry();
            var r = new rect();
            rect.set(r, 0.0, 0.0, e.NewSize.Width, e.NewSize.Height);
            rectangleGeometry.Rect = r;
            if (this._Root)
                this._Root.Clip = rectangleGeometry;
        }

        UpdateMonths() {
        }



        private ProcessShiftKeyUp() {
            if (!this._isShiftPressed || this.SelectionMode != CalendarSelectionMode.SingleRange && this.SelectionMode != CalendarSelectionMode.MultipleRange)
                return;
            this.AddSelection();
            this._isShiftPressed = false;
        }
        private ProcessCalendarKey(e: Input.KeyEventArgs): boolean {
            if (this.DisplayMode === CalendarMode.Month && this.LastSelectedDate.HasValue) {
                var displayDateInternal = this.DisplayDateInternal;
                if (DateTimeHelper.CompareYearMonth(this.LastSelectedDate.Value, this.DisplayDateInternal) != 0 && this.FocusButton != null && !this.FocusButton.IsInactive)
                    return true;
            }
            var logicalKey: Key = InteractionHelper.GetLogicalKey(this.FlowDirection, e.Key);
            var ctrl = false;
            var shift = false;
            CalendarExtensions.GetMetaKeyState(out ctrl, out shift);
            switch (logicalKey) {
                case Key.Enter:
                case Key.Space:
                    return this.ProcessEnterKey();
                case Key.PageUp:
                    this.ProcessPageUpKey(shift);
                    return true;
                case Key.PageDown:
                    this.ProcessPageDownKey(shift);
                    return true;
                case Key.End:
                    this.ProcessEndKey(shift);
                    return true;
                case Key.Home:
                    this.ProcessHomeKey(shift);
                    return true;
                case Key.Left:
                    this.ProcessLeftKey(shift);
                    return true;
                case Key.Up:
                    this.ProcessUpKey(ctrl, shift);
                    return true;
                case Key.Right:
                    this.ProcessRightKey(shift);
                    return true;
                case Key.Down:
                    this.ProcessDownKey(ctrl, shift);
                    return true;
                default:
                    return false;
            }
        }
        private ProcessUpKey(ctrl: boolean, shift: boolean) {
            switch (this.DisplayMode) {
                case CalendarMode.Month:
                    if (ctrl) {
                        this.SelectedMonth = this.DisplayDateInternal;
                        this.DisplayMode = CalendarMode.Year;
                        break;
                    }
                    else {
            DateTime? lastSelectedDate = DateTimeHelper.AddDays(this.LastSelectedDate.GetValueOrDefault(DateTime.Today), -7);
                        this.ProcessSelection(shift, lastSelectedDate, new int? (-7));
                        break;
                    }
                case CalendarMode.Year:
                    if (ctrl) {
                        this.SelectedYear = this.SelectedMonth;
                        this.DisplayMode = CalendarMode.Decade;
                        break;
                    }
                    else {
                        this.OnSelectedMonthChanged(DateTimeHelper.AddMonths(this._selectedMonth, -4));
                        break;
                    }
                case CalendarMode.Decade:
                    if (ctrl)
                        break;
                    this.OnSelectedYearChanged(DateTimeHelper.AddYears(this.SelectedYear, -4));
                    break;
            }
        }
        private ProcessDownKey(ctrl: boolean, shift: boolean) {
            switch (this.DisplayMode) {
                case CalendarMode.Month:
                    if (ctrl && !shift)
                        break;
          DateTime? lastSelectedDate = DateTimeHelper.AddDays(this.LastSelectedDate.GetValueOrDefault(DateTime.Today), 7);
                    this.ProcessSelection(shift, lastSelectedDate, 7);
                    break;
                case CalendarMode.Year:
                    if (ctrl) {
                        this.DisplayDate = this.SelectedMonth;
                        this.DisplayMode = CalendarMode.Month;
                        break;
                    }
                    else {
                        this.OnSelectedMonthChanged(DateTimeHelper.AddMonths(this._selectedMonth, 4));
                        break;
                    }
                case CalendarMode.Decade:
                    if (ctrl) {
                        this.SelectedMonth = this.SelectedYear;
                        this.DisplayMode = CalendarMode.Year;
                        break;
                    }
                    else {
                        this.OnSelectedYearChanged(DateTimeHelper.AddYears(this.SelectedYear, 4));
                        break;
                    }
            }
        }
        private ProcessLeftKey(shift: boolean) {
            switch (this.DisplayMode) {
                case CalendarMode.Month:
          DateTime? lastSelectedDate = DateTimeHelper.AddDays(this.LastSelectedDate.GetValueOrDefault(DateTime.Today), -1);
                    this.ProcessSelection(shift, lastSelectedDate, new int? (-1));
                    break;
                case CalendarMode.Year:
                    this.OnSelectedMonthChanged(DateTimeHelper.AddMonths(this._selectedMonth, -1));
                    break;
                case CalendarMode.Decade:
                    this.OnSelectedYearChanged(DateTimeHelper.AddYears(this.SelectedYear, -1));
                    break;
            }
        }
        private ProcessRightKey(shift: boolean) {
            switch (this.DisplayMode) {
                case CalendarMode.Month:
          DateTime? lastSelectedDate = DateTimeHelper.AddDays(this.LastSelectedDate.GetValueOrDefault(DateTime.Today), 1);
                    this.ProcessSelection(shift, lastSelectedDate, new int? (1));
                    break;
                case CalendarMode.Year:
                    this.OnSelectedMonthChanged(DateTimeHelper.AddMonths(this._selectedMonth, 1));
                    break;
                case CalendarMode.Decade:
                    this.OnSelectedYearChanged(DateTimeHelper.AddYears(this.SelectedYear, 1));
                    break;
            }
        }
        private ProcessEnterKey(): boolean {
            switch (this.DisplayMode) {
                case CalendarMode.Year:
                    this.DisplayDate = this.SelectedMonth;
                    this.DisplayMode = CalendarMode.Month;
                    return true;
                case CalendarMode.Decade:
                    this.SelectedMonth = this.SelectedYear;
                    this.DisplayMode = CalendarMode.Year;
                    return true;
                default:
                    return false;
            }
        }
        private ProcessHomeKey(shift: boolean) {
            switch (this.DisplayMode) {
                case CalendarMode.Month:
          DateTime? lastSelectedDate = new DateTime? (new DateTime(this.DisplayDateInternal.Year, this.DisplayDateInternal.Month, 1));
                    this.ProcessSelection(shift, lastSelectedDate, new int?());
                    break;
                case CalendarMode.Year:
                    this.OnSelectedMonthChanged(new DateTime? (new DateTime(this._selectedMonth.Year, 1, 1)));
                    break;
                case CalendarMode.Decade:
                    this.OnSelectedYearChanged(new DateTime? (new DateTime(DateTimeHelper.DecadeOfDate(this.SelectedYear), 1, 1)));
                    break;
            }
        }
        private ProcessEndKey(shift: boolean) {
            switch (this.DisplayMode) {
                case CalendarMode.Month:
          DateTime displayDate = this.DisplayDate;
          DateTime? lastSelectedDate = new DateTime? (new DateTime(this.DisplayDateInternal.Year, this.DisplayDateInternal.Month, 1));
                    if (DateTimeHelper.CompareYearMonth(DateTime.MaxValue, lastSelectedDate.Value) > 0) {
                        lastSelectedDate = new DateTime? (DateTimeHelper.AddMonths(lastSelectedDate.Value, 1).Value);
                        lastSelectedDate = new DateTime? (DateTimeHelper.AddDays(lastSelectedDate.Value, -1).Value);
                    }
                    else
                        lastSelectedDate = new DateTime? (DateTime.MaxValue);
                    this.ProcessSelection(shift, lastSelectedDate, new int?());
                    break;
                case CalendarMode.Year:
                    this.OnSelectedMonthChanged(new DateTime? (new DateTime(this._selectedMonth.Year, 12, 1)));
                    break;
                case CalendarMode.Decade:
                    this.OnSelectedYearChanged(new DateTime? (new DateTime(DateTimeHelper.EndOfDecade(this.SelectedYear), 1, 1)));
                    break;
            }
        }
        private ProcessPageDownKey(shift: boolean) {
            switch (this.DisplayMode) {
                case CalendarMode.Month:
          DateTime? lastSelectedDate = DateTimeHelper.AddMonths(this.LastSelectedDate.GetValueOrDefault(DateTime.Today), 1);
                    this.ProcessSelection(shift, lastSelectedDate, new int?());
                    break;
                case CalendarMode.Year:
                    this.OnSelectedMonthChanged(DateTimeHelper.AddYears(this._selectedMonth, 1));
                    break;
                case CalendarMode.Decade:
                    this.OnSelectedYearChanged(DateTimeHelper.AddYears(this.SelectedYear, 10));
                    break;
            }
        }
        private ProcessPageUpKey(shift: boolean) {
            switch (this.DisplayMode) {
                case CalendarMode.Month:
          DateTime? lastSelectedDate = DateTimeHelper.AddMonths(this.LastSelectedDate.GetValueOrDefault(DateTime.Today), -1);
                    this.ProcessSelection(shift, lastSelectedDate, new int?());
                    break;
                case CalendarMode.Year:
                    this.OnSelectedMonthChanged(DateTimeHelper.AddYears(this._selectedMonth, -1));
                    break;
                case CalendarMode.Decade:
                    this.OnSelectedYearChanged(DateTimeHelper.AddYears(this.SelectedYear, -10));
                    break;
            }
        }

        //TODO: Implement
    }
    TemplateParts(Calendar,
        { Name: "Root", Type: Panel },
        { Name: "CalendarItem", Type: CalendarItem });
    TemplateVisualStates(Calendar,
        { GroupName: "ValidationStates", Name: "Valid" },
        { GroupName: "ValidationStates", Name: "InvalidFocused" },
        { GroupName: "ValidationStates", Name: "InvalidUnfocused" });
    //[StyleTypedProperty(Property = "CalendarButtonStyle", StyleTargetType = typeof (CalendarButton))]
    //[StyleTypedProperty(Property = "CalendarDayButtonStyle", StyleTargetType = typeof (CalendarDayButton))]
    //[StyleTypedProperty(Property = "CalendarItemStyle", StyleTargetType = typeof (CalendarItem))]
}