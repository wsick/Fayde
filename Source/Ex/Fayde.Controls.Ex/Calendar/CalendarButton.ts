module Fayde.Controls {
    export class CalendarButton extends Button {
        private _IsInactive: boolean = false;
        get IsInactive(): boolean { return this._IsInactive; }
        set IsInactive(value: boolean) {
            this._IsInactive = value;
            this.UpdateVisualState();
        }

        private _IsSelected: boolean = false;
        get IsSelected(): boolean { return this._IsSelected; }
        set IsSelected(value: boolean) {
            this._IsSelected = value;
            this.UpdateVisualState();
        }

        private _IsCalendarButtonFocused: boolean = false;
        get IsCalendarButtonFocused(): boolean { return this._IsCalendarButtonFocused; }
        set IsCalendarButtonFocused(value: boolean) {
            this._IsCalendarButtonFocused = value;
            this.UpdateVisualState();
        }

        CalendarButtonMouseDown = new MulticastEvent<Input.MouseButtonEventArgs>();
        CalendarButtonMouseUp = new MulticastEvent<Input.MouseButtonEventArgs>();

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
            this.IsTabStop = false;
            this.Loaded.Subscribe(() => this.UpdateVisualState(false), this);
            this.Content = Localization.DateTimeFormatInfo.Instance.AbbreviatedMonthNames[0];
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.UpdateVisualState(false);
        }

        GoToStates(gotoFunc: (state: string) => boolean) {
            this.GoToStateCommon(gotoFunc);
            this.GoToStateSelection(gotoFunc);
            this.GoToStateActive(gotoFunc);
            this.GoToStateFocus(gotoFunc);
        }
        GoToStateSelection(gotoFunc: (state: string) => boolean): boolean {
            if (this.IsSelected)
                return gotoFunc("Selected");
            return gotoFunc("Unselected");
        }
        GoToStateActive(gotoFunc: (state: string) => boolean): boolean {
            if (this.IsInactive)
                return gotoFunc("Active");
            return gotoFunc("Inactive");
        }
        GoToStateFocus(gotoFunc: (state: string) => boolean): boolean {
            if (this.IsCalendarButtonFocused && this.IsEnabled)
                return gotoFunc("CalendarButtonFocused");
            return gotoFunc("CalendarButtonUnfocused");
        }

        OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs) {
            super.OnMouseLeftButtonDown(e);
            this.CalendarButtonMouseDown.Raise(this, e);
        }
        OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs) {
            super.OnMouseLeftButtonUp(e);
            this.CalendarButtonMouseUp.Raise(this, e);
        }
    }
    TemplateVisualStates(CalendarItem,
        { GroupName: "CommonStates", Name: "Normal" },
        { GroupName: "CommonStates", Name: "Disabled" },
        { GroupName: "CommonStates", Name: "MouseOver" },
        { GroupName: "CommonStates", Name: "Pressed" },
        { GroupName: "SelectionStates", Name: "Unselected" },
        { GroupName: "SelectionStates", Name: "Selected" },
        { GroupName: "ActiveStates", Name: "Inactive" },
        { GroupName: "ActiveStates", Name: "Active" },
        { GroupName: "CalendarButtonFocusStates", Name: "CalendarButtonUnfocused" },
        { GroupName: "CalendarButtonFocusStates", Name: "CalendarButtonFocused" });
}