/// <reference path="../../scripts/Fayde.js"/>
/// <reference path="ViewModels/MainViewModel.js"/>

Nullstone.ImportJsFile("ViewModels/RelayCommand.js");
Nullstone.ImportJsFile("ViewModels/ObservableObject.js", function () {
    Nullstone.ImportJsFile("ViewModels/MainViewModel.js");
});

(function (namespace) {
    var app = Nullstone.Create("app", App);

    app.Instance.Init = function () {
        this.Init$App();
        this.Loaded.Subscribe(this.OnLoaded, this);
    };

    app.Instance.OnLoaded = function (sender, e) {
        var vm = new Fayde.Demos.StackOverflow.ViewModels.MainViewModel();
        vm.Load();
        this.RootVisual.DataContext = vm;
    };

    Nullstone.FinishCreate(app);
    namespace.App = app;
})(Nullstone.Namespace("Fayde.Demos.StackOverflow"));