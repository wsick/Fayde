/// <reference path="../../jsbin/Fayde.d.ts" />

module Fayde.Controls.Primitives {
    export class CalendarButton extends Button {
        CalendarButtonMouseDown = new RoutedEvent<Input.MouseButtonEventArgs>();
        CalendarButtonMouseUp = new RoutedEvent<Input.MouseButtonEventArgs>();

        private _IsInactive = false;
        get IsInactive(): boolean { return this._IsInactive;}
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
            this.Content = Fayde.DateTimeHelper.GetCurrentDateFormat().AbbreviatedMonthNames[0];
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
            this.CalendarButtonMouseDown.Raise(this, e);
        }
        OnMouseLeftButtonUp(e: Input.MouseButtonEventArgs) {
            super.OnMouseLeftButtonUp(e);
            this.CalendarButtonMouseUp.Raise(this, e);
        }

        GetVisualStateNamesToActivate(): string[] {
            var arr = [];
            arr.push(this.GetVisualStateSelected());
            arr.push(this.GetVisualStateActive());
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
        GetVisualStateFocus(): string {
            if (this.IsFocused && this.IsEnabled)
                return "CalendarButtonFocused";
            else
                return "CalendarButtonUnfocused";
        }
        GetVisualStateActive(): string {
            if (this.IsInactive) {
                return "Inactive";
            } else {
                return "Active";
            }
        }
    }
    Fayde.RegisterType(CalendarButton, {
        Name: "CalendarButton",
        Namespace: "Fayde.Controls.Primitives",
        XmlNamespace: Fayde.XMLNS
    });
}