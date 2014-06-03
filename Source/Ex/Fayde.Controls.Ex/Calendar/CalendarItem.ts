module Fayde.Controls {
    export class CalendarItem extends Control {

        private _Owner: Calendar = null;

        private _HeaderButton: Button = null;
        private _PreviousButton: Button = null;
        private _NextButton: Button = null;
        private _MonthView: Grid = null;
        private _YearView: Grid = null;
        private _DayTitleTemplate: DataTemplate = null;
        private _DisabledVisual: FrameworkElement = null;
        private _IsTopLeftMostMonth: boolean = true;
        private _IsTopRightMostMonth: boolean = true;

        constructor() {
            super();
            this.DefaultStyleKey = (<any>this).constructor;
        }

        OnApplyTemplate() {
            super.OnApplyTemplate();

            var hb = this._HeaderButton = <Button>this.GetTemplateChild("HeaderButton", Button);
            if (hb) {
                hb.Click.Subscribe(this._HeaderButtonClick, this);
                hb.IsTabStop = false;
            }

            var pb = this._PreviousButton = <Button>this.GetTemplateChild("PreviousButton", Button);
            if (pb) {
                pb.Content = pb.Content || "previous";
                if (this._IsTopLeftMostMonth) {
                    pb.Visibility = Visibility.Visible;
                    pb.Click.Subscribe(this._PreviousButtonClick, this);
                    pb.IsTabStop = false;
                }
            }

            var nb = this._NextButton = <Button>this.GetTemplateChild("NextButton", Button);
            if (nb) {
                nb.Content = nb.Content || "next";
                if (this._IsTopRightMostMonth) {
                    nb.Visibility = Visibility.Visible;
                    nb.Click.Subscribe(this._NextButtonClick, this);
                    nb.IsTabStop = false;
                }
            }

            var mv = this._MonthView = <Grid>this.GetTemplateChild("MonthView", Grid);
            if (mv)
                mv.MouseLeave.Subscribe(this._MonthViewMouseLeave, this);

            var yv = this._YearView = <Grid>this.GetTemplateChild("YearView", Grid);
            if (yv)
                yv.MouseLeave.Subscribe(this._YearViewMouseLeave, this);

            this._DayTitleTemplate = <DataTemplate><any>this.GetTemplateChild("DayTitleTemplate", DataTemplate);
            this._DisabledVisual = <FrameworkElement>this.GetTemplateChild("DisabledVisual", FrameworkElement);
            if (this._Owner != null)
                this.UpdateDisabledGrid(this._Owner.IsEnabled);
            this.PopulateGrids();
            if (!this._MonthView || !this._YearView)
                return;
            var isMonth = true;
            if (this._Owner != null) {
                this._Owner.SelectedMonth = this._Owner.DisplayDateInternal;
                this._Owner.SelectedYear = this._Owner.DisplayDateInternal;
                if (this._Owner.DisplayMode === CalendarMode.Year)
                    this.UpdateYearMode();
                else if (this._Owner.DisplayMode === CalendarMode.Decade)
                    this.UpdateDecadeMode();
                if (this._Owner.DisplayMode === CalendarMode.Month)
                    this.UpdateMonthMode();
                else
                    isMonth = false;
            } else {
                this.UpdateMonthMode();
            }

            this._MonthView.Visibility = isMonth ? Visibility.Visible : Visibility.Collapsed;
            this._YearView.Visibility = !isMonth ? Visibility.Visible : Visibility.Collapsed;
        }

        private PopulateGrids() {
        }

        private UpdateDisabledGrid(isEnabled: boolean) {
        }

        private UpdateMonthMode() {
        }
        private UpdateYearMode() {
        }
        private UpdateDecadeMode() {
        }

        private SetDayTitles() {
        }
        //TODO: Implement
    }
    TemplateParts(CalendarItem,
        { Name: "DisabledVisual", Type: FrameworkElement },
        { Name: "HeaderButton", Type: Button },
        { Name: "PreviousButton", Type: Button },
        { Name: "NextButton", Type: Button },
        { Name: "MonthView", Type: Grid },
        { Name: "YearView", Type: Grid },
        { Name: "DayTitleTemplate", Type: DataTemplate });
    TemplateVisualStates(CalendarItem,
        { GroupName: "CommonStates", Name: "Normal" },
        { GroupName: "CommonStates", Name: "Disabled" });
}