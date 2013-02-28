/// <reference path="../scripts/Fayde.d.ts" />
/// <reference path="Team.ts" />

module Fayde.Demos.MarchMadnessDemo.ViewModels {
    export class Match extends MVVM.ObservableObject {
        Team1: Team;
        Team2: Team;
        Round: number;
        SelectedTeam: Team;
        MatchNumber: number;
    }
    Nullstone.RegisterType(Match, "Match", MVVM.ObservableObject);
    Nullstone.AutoNotifyProperty(Match, "Team1");
    Nullstone.AutoNotifyProperty(Match, "Team2");
    Nullstone.AutoNotifyProperty(Match, "Round");
    Nullstone.AutoNotifyProperty(Match, "SelectedTeam");
    Nullstone.AutoNotifyProperty(Match, "MatchNumber");
}