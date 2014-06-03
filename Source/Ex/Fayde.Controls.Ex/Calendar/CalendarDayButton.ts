module Fayde.Controls {
    export class CalendarDayButton extends Button {
        private _IsBlackout: boolean = false;
        get IsBlackout(): boolean { return this._IsBlackout; }
        set IsBlackout(value: boolean) {
            this._IsBlackout = value;
            this.UpdateVisualState();
        }
        
        private _IsToday: boolean = false;
        get IsToday(): boolean { return this._IsToday; }
        set IsToday(value: boolean) {
            this._IsToday = value;
            this.UpdateVisualState();
        }
        
        private _IsCurrent: boolean = false;
        get IsCurrent(): boolean { return this._IsCurrent; }
        set IsCurrent(value: boolean) {
            this._IsCurrent = value;
            this.UpdateVisualState();
        }

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

        CalendarDayButtonMouseDown = new MulticastEvent<Input.MouseButtonEventArgs>();
        CalendarDayButtonMouseUp = new MulticastEvent<Input.MouseButtonEventArgs>();

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
            this.IsTabStop = false;
            this.Loaded.Subscribe(() => this.UpdateVisualState(false), this);
            this.Content = "1";
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.UpdateVisualState(false);
        }
        
        GoToStates(gotoFunc: (state: string) => boolean) {
            this.GoToStateCommon(gotoFunc);
            this.GoToStateSelection(gotoFunc);
            this.GoToStateDay(gotoFunc);
            this.GoToStateActive(gotoFunc);
            this.GoToStateBlackout(gotoFunc);
            this.GoToStateFocus(gotoFunc);
        }
        GoToStateSelection(gotoFunc: (state: string) => boolean): boolean {
            if (this.IsSelected)
                return gotoFunc("Selected");
            return gotoFunc("Unselected");
        }
        GoToStateDay(gotoFunc: (state: string) => boolean): boolean {
            if (this.IsToday)
                return gotoFunc("Today");
            return gotoFunc("RegularDay");
        }
        GoToStateActive(gotoFunc: (state: string) => boolean): boolean {
            if (this.IsInactive)
                return gotoFunc("Active");
            return gotoFunc("Inactive");
        }
        GoToStateBlackout(gotoFunc: (state: string) => boolean): boolean {
            if (this.IsBlackout)
                return gotoFunc("BlackoutDay");
            return gotoFunc("NormalDay");
        }
        GoToStateFocus(gotoFunc: (state: string) => boolean): boolean {
            if (this.IsCurrent && this.IsEnabled)
                return gotoFunc("CalendarButtonFocused");
            return gotoFunc("CalendarButtonUnfocused");
        }

        OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs) {
            super.OnMouseLeftButtonDown(e);
            this.CalendarDayButtonMouseDown.Raise(this, e);
        }
        OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs) {
            super.OnMouseLeftButtonUp(e);
            this.CalendarDayButtonMouseUp.Raise(this, e);
        }
    }
    TemplateVisualStates(CalendarItem,
        { GroupName: "CommonStates", Name: "Normal" },
        { GroupName: "CommonStates", Name: "Disabled" },
        { GroupName: "CommonStates", Name: "MouseOver" },
        { GroupName: "CommonStates", Name: "Pressed" },
        { GroupName: "SelectionStates", Name: "Unselected" },
        { GroupName: "SelectionStates", Name: "Selected" },
        { GroupName: "DayStates", Name: "Today" },
        { GroupName: "DayStates", Name: "RegularDay" },
        { GroupName: "ActiveStates", Name: "Inactive" },
        { GroupName: "ActiveStates", Name: "Active" },
        { GroupName: "BlackoutDayStates", Name: "NormalDay" },
        { GroupName: "BlackoutDayStates", Name: "BlackoutDay" },
        { GroupName: "CalendarButtonFocusStates", Name: "CalendarButtonUnfocused" },
        { GroupName: "CalendarButtonFocusStates", Name: "CalendarButtonFocused" });
}