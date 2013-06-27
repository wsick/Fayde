/// <reference path="scripts/Fayde.d.ts"/>
/// <reference path="ViewModels/BracketViewModel.ts"/>

module Fayde.Demos.MarchMadnessDemo {
    var reqtoken = Nullstone.ImportJsFiles(["ViewModels/BracketViewModel.js", "ViewModels/Match.js", "ViewModels/MatchColumn.js", "ViewModels/Team.js"]);

    export class Application extends App {
        constructor() {
            super();
            this.Loaded.Subscribe(this.OnLoaded, this);
        }
        OnLoaded(sender, e: EventArgs) {
            reqtoken.DoOnComplete(() => this.Setup());
        }
        Setup() {
            var vm = new ViewModels.BracketViewModel();
            vm.Load();
            (<FrameworkElement>this.RootVisual).DataContext = vm;
        }
    }
    Nullstone.RegisterType(Application, "Application");
}