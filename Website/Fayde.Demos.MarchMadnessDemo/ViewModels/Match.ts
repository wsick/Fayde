/// <reference path="../scripts/Fayde.d.ts" />
/// <reference path="Team.ts" />

module Fayde.Demos.MarchMadnessDemo.ViewModels {
    export class Match extends Fayde.MVVM.ObservableObject {
        Team1: Team;
        Team2: Team;
        Round: number;
        SelectedTeam: Team;
        MatchNumber: number;

        private static ctor = (() => {
            MVVM.NotifyProperties(Match, [
                "Team1",
                "Team2",
                "Round",
                "SelectedTeam",
                "MatchNumber"
            ]);
        })();
    }
    Nullstone.RegisterType(Match, "Match");
}