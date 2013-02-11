/// <reference path="scripts/Fayde.d.ts"/>
/// <reference path="ViewModels/MainViewModel.ts"/>

module Fayde.Demos.StackOverflow {
    var isLoaded = false;
    var onAppLoaded;
    Nullstone.ImportJsFile("ViewModels/MainViewModel.js", function () {
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
            if (isLoaded)
                this.Setup();
            else
                onAppLoaded = () => this.Setup();
        }
        Setup() {
            var vm = new ViewModels.MainViewModel();
            vm.Load();
            (<FrameworkElement>this.RootVisual).DataContext = vm;
        }
    }
    Nullstone.RegisterType(Application, "Application", App);
}