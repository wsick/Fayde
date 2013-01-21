/// <reference path="../../scripts/Fayde.d.ts" />
/// <reference path="ViewModels/MainViewModel.ts" />

Nullstone.ImportJsFile("ViewModels/MainViewModel.js");

module Fayde.Demos.SDB {
    export class app extends App {
        constructor () {
            super();
            this.Loaded.Subscribe(this.OnLoaded, this);
        }
        OnLoaded(sender, e: EventArgs) {
            var vm = new ViewModels.MainViewModel();
            vm.Load();
            (<FrameworkElement>this.RootVisual).DataContext = vm;
        }
    }
    Nullstone.RegisterType(app, "app", App);
}