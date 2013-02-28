/// <reference path="scripts/Fayde.d.ts" />
/// <reference path="ViewModels/Match.ts" />

module Fayde.Demos.MarchMadnessDemo {
    export enum BracketDirection {
        Right,
        Left,
        Center,
    }

    export class Bracket extends Fayde.Controls.UserControl {
        static RoundNumberProperty = DependencyProperty.Register("RoundNumber", function () { return Number; }, Bracket, 1);
        RoundNumber: number;
        
        static InitialMarginProperty = DependencyProperty.Register("InitialMargin", function () { return Number; }, Bracket, 2.0);
        InitialMargin: number;

        static BracketBorderThicknessProperty = DependencyProperty.Register("BracketBorderThickness", function () { return Number; }, Bracket, 1.0, function (d, args) { (<Bracket>d).BracketBorderThicknessChanged(args); });
        private BracketBorderThicknessChanged(args: RoutedPropertyChangedEventArgs) {
            this.UpdateBorder();
            this.Update();
        }
        BracketBorderThickness: number;
        
        static DirectionProperty = DependencyProperty.Register("Direction", function () { return new Enum(BracketDirection); }, Bracket, BracketDirection.Right, function (d, args) { (<Bracket>d).DirectionChanged(args); });
        private DirectionChanged(args: RoutedPropertyChangedEventArgs) {
            this.UpdateBorder();
        }
        Direction: BracketDirection;

        private _TemplateApplied = false;
        private BracketBorder: Fayde.Controls.Border;
        private LayoutInner: Fayde.Controls.Grid;

        OnApplyTemplate() {
            super.OnApplyTemplate();
            this.BracketBorder = this.FindName("BracketBorder");
            this.LayoutInner = this.FindName("LayoutInner");
            this._TemplateApplied = true;
            this.UpdateBorder();
            this.Update();
        }

        private UpdateBorder() {
            if (!this._TemplateApplied)
                return;
            var thickness = this.BracketBorderThickness;
            if (this.Direction === BracketDirection.Right)
                this.BracketBorder.BorderThickness = new Thickness(0, thickness, thickness, thickness);
            else
                this.BracketBorder.BorderThickness = new Thickness(thickness, thickness, 0, thickness);
        }
        private Update() {
            if (!this._TemplateApplied)
                return;
            this.Height = this.CalculateBracketHeight(this.RoundNumber);
            var length = new Controls.GridLength();
            length.Value = this.CalculateInnerHeight(this.RoundNumber);
            length.Type = Controls.GridUnitType.Pixel;
            this.LayoutInner.RowDefinitions[1].Height = length;
        }
        private CalculateBracketHeight(roundNumber: number): number {
            if (roundNumber == 0)
                throw new Error("Invalid argument: RoundNumber");
            if (roundNumber == 1)
                return this.InitialMargin * 4 + this._TextHeight * 2 + this.BracketBorderThickness * 2;
            return this.CalculateBracketHeight(roundNumber - 1) * 2;
        }
        private CalculateInnerHeight(roundNumber: number): number {
            var m = this.InitialMargin;
            var b = this.BracketBorderThickness;
            var th = this._TextHeight;

            switch (roundNumber) {
                case 1:
                    return m * 2 + b;
                case 2:
                    return m * 4 + b * 2;
                case 3:
                    return m * 8 + b * 6 + th * 2;
                case 4:
                    return m * 16 + b * 18 + th * 4;
                case 5:
                    return m * 32 + b * 54 + th * 6;
            }
            return 0;
        }

        private _TextHeight: number = 0;
        private Team_SizeChanged(sender, e: SizeChangedEventArgs)
        {
            this._TextHeight = (<FrameworkElement>sender).ActualHeight;
            this.Update();
        }
        private Team_MouseLeftButtonUp(sender, e: Input.MouseButtonEventArgs)
        {
            var fe = <FrameworkElement>sender;
            var match = <ViewModels.Match>this.DataContext;
            match.SelectedTeam = <ViewModels.Team>fe.DataContext;
        }
    }
    Nullstone.RegisterType(Bracket, "Bracket", Fayde.Controls.UserControl);
    Nullstone.AutoProperties(Bracket, [
        Bracket.RoundNumberProperty,
        Bracket.InitialMarginProperty,
        Bracket.BracketBorderThicknessProperty,
        Bracket.DirectionProperty
    ]);
}