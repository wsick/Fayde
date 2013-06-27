/// <reference path="../scripts/Fayde.d.ts" />
/// <reference path="Match.ts" />

module Fayde.Demos.MarchMadnessDemo.ViewModels {
    export class MatchColumn extends MVVM.ObservableObject {
        Matches = new Collections.ObservableCollection<Match>();
        private static ctor = (() => {
            MVVM.NotifyProperties(MatchColumn, [
                "Matches"
            ]);
        })();
    }
    Nullstone.RegisterType(MatchColumn, "MatchColumn");
}