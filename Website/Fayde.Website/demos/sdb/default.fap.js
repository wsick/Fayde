/// <reference path="../../scripts/Fayde.js"/>

Nullstone.ImportJsFile("ViewModels/ObservableObject.js");
Nullstone.ImportJsFile("ViewModels/MainViewModel.js");

var Fayde;
(function (Fayde) {
    (function (Demos) {
        (function (SDB) {
            var app = Nullstone.Create("app", App);

            app.Instance.Init = function () {
                this.Init$App();
                this.Loaded.Subscribe(this.OnLoaded, this);
            };

            app.Instance.OnLoaded = function (sender, e) {
                var vm = new Fayde.Demos.SDB.ViewModels.MainViewModel();
                vm.Load();
                this.RootVisual.DataContext = vm;
            };

            Nullstone.FinishCreate(app);
            SDB.App = app;
        })(Demos.SDB || (Demos.SDB = {}));
        var SDB = Demos.SDB;
    })(Fayde.Demos || (Fayde.Demos = {}));
    var Demos = Fayde.Demos;
})(Fayde || (Fayde = {}));