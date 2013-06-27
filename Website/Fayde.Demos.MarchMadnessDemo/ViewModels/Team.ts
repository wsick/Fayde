/// <reference path="../scripts/Fayde.d.ts" />

module Fayde.Demos.MarchMadnessDemo.ViewModels {
    export class Team extends MVVM.ObservableObject {
        Seed: number;
        Name: string;
        private static ctor = (() => {
            MVVM.NotifyProperties(Team, [
                "Seed",
                "Name"
            ]);
        })();
    }
    Nullstone.RegisterType(Team, "Team");
}