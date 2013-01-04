/// <reference path="../../scripts/Fayde.js"/>
/// <reference path="ViewModels/MainViewModel.js"/>

var isLoaded = false;
var onAppLoaded;
Nullstone.ImportJsFile("ViewModels/RelayCommand.js");
Nullstone.ImportJsFile("ViewModels/ObservableObject.js", function () {
    Nullstone.ImportJsFile("ViewModels/MainViewModel.js", function () {
        isLoaded = true;
        if (onAppLoaded) {
            onAppLoaded();
            delete onAppLoaded;
        }
    });
});

(function (namespace) {
    var app = Nullstone.Create("app", App);

    app.Instance.Init = function () {
        this.Init$App();
        this.Loaded.Subscribe(this.OnLoaded, this);
    };

    app.Instance.OnLoaded = function (sender, e) {
        if (isLoaded) {
            this.Setup();
            return;
        }

        if (!isLoaded) {
            var that = this;
            onAppLoaded = function () { that.Setup(); };
        }
    };

    app.Instance.Setup = function () {
        var vm = new Fayde.Demos.StackOverflow.ViewModels.MainViewModel();
        vm.Load();
        this.RootVisual.DataContext = vm;
    };

    Nullstone.FinishCreate(app);
    namespace.App = app;
})(Nullstone.Namespace("Fayde.Demos.StackOverflow"));