/// <reference path="scripts/Fayde.d.ts"/>
/// <reference path="ViewModels/BracketViewModel.ts"/>

module Fayde.Demos.MarchMadnessDemo {
    var isLoaded = false;
    var onAppLoaded;
    Nullstone.ImportJsFiles(["ViewModels/BracketViewModel.js", "ViewModels/Match.js", "ViewModels/MatchColumn.js", "ViewModels/Team.js"],
        (scripts: HTMLScriptElement[]) => {
            isLoaded = true;
            if (onAppLoaded) {
                onAppLoaded();
                delete onAppLoaded;
            }
        });

    export class Application extends App {
        constructor() {
            super();
            this.Loaded.Subscribe(this.OnLoaded, this);
        }
        OnLoaded(sender, e: EventArgs) {
            if (isLoaded) {
                this.Setup();
            } else {
                onAppLoaded = () => this.Setup();
            }
        }
        Setup() {
            var vm = new ViewModels.BracketViewModel();
            vm.Load();
            (<FrameworkElement>this.RootVisual).DataContext = vm;
        }
    }
    Nullstone.RegisterType(Application, "Application", App);
}