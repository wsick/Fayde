/// <reference path="scripts/Fayde.d.ts"/>
/// <reference path="ViewModels/DefaultViewModel.ts"/>

module NflDraft {
    var token = Nullstone.ImportJsFiles(["ViewModels/DefaultViewModel.js", "Models/FantasyTeam.js", "Models/Round.js", "Models/DraftSpot.js", "Models/Team.js", "Models/Player.js", "Models/Stats.js", "Models/PlayerStats.js"]);
    
    export class Default extends Fayde.Controls.Page {
        constructor() {
            super();
            this.Loaded.Subscribe(this.OnLoaded, this);
        }
        OnLoaded(sender, e: EventArgs) {
            token.DoOnComplete(() => this.Setup());
        }
        Setup() {
            var vm = new NflDraft.ViewModels.DefaultViewModel();
            vm.Load();
            this.DataContext = vm;
        }
    }
    Nullstone.RegisterType(Default, "Default");
}