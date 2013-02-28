/// <reference path="scripts/Fayde.d.ts" />
/// <reference path="ViewModels/Match.ts" />

module Fayde.Demos.MarchMadnessDemo {

    export class Default extends Fayde.Controls.Page {

        Team_MouseLeftButtonUp(sender, e) {
            var fe = <FrameworkElement>sender;
            var teamControl = <FrameworkElement>(Fayde.VisualTreeHelper.GetChild(fe, 0));
            var match = <ViewModels.Match>(fe.DataContext);
            var team = <ViewModels.Team>(teamControl.DataContext);
            match.SelectedTeam = team;
        }
    }
    Nullstone.RegisterType(Default, "Default", Fayde.Controls.Page);
}