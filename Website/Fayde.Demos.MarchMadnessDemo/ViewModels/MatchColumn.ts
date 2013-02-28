/// <reference path="../scripts/Fayde.d.ts" />
/// <reference path="Match.ts" />

module Fayde.Demos.MarchMadnessDemo.ViewModels {
    export class MatchColumn extends MVVM.ObservableObject {
        Matches = new Collections.ObservableCollection();
    }
    Nullstone.RegisterType(MatchColumn, "MatchColumn", MVVM.ObservableObject);
    Nullstone.AutoNotifyProperty(MatchColumn, "Matches");
}