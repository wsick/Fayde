/// <reference path="scripts/Fayde.d.ts"/>
/// <reference path="ViewModels/MainViewModel.ts"/>

module Fayde.Demos.StackOverflow {
    var reqtoken = Nullstone.ImportJsFile("ViewModels/MainViewModel.js");

    export class Application extends App {
        constructor() {
            super();
            this.Loaded.Subscribe(this.OnLoaded, this);
        }
        OnLoaded(sender, e: EventArgs) {
            reqtoken.DoOnComplete(() => this.Setup());
        }
        Setup() {
            var vm = new ViewModels.MainViewModel();
            vm.Load();
            (<FrameworkElement>this.RootVisual).DataContext = vm;
        }
    }
    Nullstone.RegisterType(Application, "Application");
}