/// <reference path="../../jsbin/Fayde.d.ts" />

module Fayde.Controls.Primitives {
    export class CalendarDayButton extends Button {
        private _IsIgoringMouseOverState = false;

        CalendarDayButtonMouseDown = new RoutedEvent<Input.MouseButtonEventArgs>();
        CalendarDayButtonMouseUp = new RoutedEvent<Input.MouseButtonEventArgs>();

        private _IsBlackout = false;
        get IsBlackout(): boolean { return this._IsBlackout; }
        set IsBlackout(value: boolean) {
            this._IsBlackout = value;
            this.UpdateVisualState(true);
        }

        private _IsToday = false;
        get IsToday(): boolean { return this._IsToday; }
        set IsToday(value: boolean) {
            this._IsToday = value;
            this.UpdateVisualState(true);
        }

        private _IsCurrent = false;
        get IsCurrent(): boolean { return this._IsCurrent; }
        set IsCurrent(value: boolean) {
            this._IsCurrent = value;
            this.UpdateVisualState(true);
        }

        private _IsInactive = false;
        get IsInactive(): boolean { return this._IsInactive; }
        set IsInactive(value: boolean) {
            this._IsInactive = value;
            this.UpdateVisualState(true);
        }

        private _IsSelected = false;
        get IsSelected(): boolean { return this._IsSelected; }
        set IsSelected(value: boolean) {
            this._IsSelected = value;
            this.UpdateVisualState(true);
        }

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
            this.IsTabStop = false;
            this.Loaded.Subscribe(this._OnLoaded, this);
            this.Content = "1";
        }

        private _OnLoaded(sender: any, e: EventArgs) {
            this.UpdateVisualState(false);
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.UpdateVisualState(false);
        }

        OnMouseLeftButtonDown(e: Input.MouseButtonEventArgs) {
            super.OnMouseLeftButtonDown(e);
            this.CalendarDayButtonMouseDown.Raise(this, e);
        }
        OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs) {
            super.OnMouseLeftButtonUp(e);
            this.CalendarDayButtonMouseUp.Raise(this, e);
        }

        GetVisualStateNamesToActivate(): string[] {
            var arr = [];
            if (this._IsIgoringMouseOverState) {
                if (this.IsPressed)
                    arr.push("Selected");
                arr.push(this.GetVisualStateCommon());
            }
            arr.push(this.GetVisualStateSelected());
            arr.push(this.GetVisualStateActive());
            arr.push(this.GetVisualStateDay());
            arr.push(this.GetVisualStateBlackoutDay());
            arr.push(this.GetVisualStateFocus());
            return arr;
        }
        GetVisualStateSelected(): string {
            if (this.IsSelected) {
                return "Selected";
            } else {
                return "Unselected";
            }
        }
        GetVisualStateActive(): string {
            if (this.IsInactive) {
                return "Inactive";
            } else {
                return "Active";
            }
        }
        GetVisualStateDay(): string {
            if (this.IsToday)
                return "Today";
            else
                return "RegularDay";
        }
        GetVisualStateBlackoutDay(): string {
            if (this.IsToday)
                return "BlackoutDay";
            else
                return "NormalDay";
        }
        GetVisualStateFocus(): string {
            if (this.IsCurrent && this.IsEnabled)
                return "CalendarButtonFocused";
            else
                return "CalendarButtonUnfocused";
        }

        private _IgnoreMouseOverState() {
            this._IsIgoringMouseOverState = false;
            if (!this.IsMouseOver)
                return;
            this._IsIgoringMouseOverState = true;
            this.UpdateVisualState(true);
        }
    }
    Fayde.RegisterType(CalendarDayButton, {
        Name: "CalendarDayButton",
        Namespace: "Fayde.Controls.Primitives",
        XmlNamespace: Fayde.XMLNS
    });
}