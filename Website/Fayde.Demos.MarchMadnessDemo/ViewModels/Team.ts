/// <reference path="../scripts/Fayde.d.ts" />

module Fayde.Demos.MarchMadnessDemo.ViewModels {
    export class Team extends MVVM.ObservableObject {
        Seed: number;
        Name: string;
    }
    Nullstone.RegisterType(Team, "Team", MVVM.ObservableObject);
    Nullstone.AutoNotifyProperty(Team, "Seed");
    Nullstone.AutoNotifyProperty(Team, "Name");
}