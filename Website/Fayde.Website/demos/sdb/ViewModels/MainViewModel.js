/// <reference path="../../../scripts/Fayde.js" />
/// <reference path="ObservableObject.js" />

var Fayde;
(function (Fayde) {
    (function (Demos) {
        (function (SDB) {
            (function (ViewModels) {
                var vm = Nullstone.Create("MainViewModel", ViewModels.ObservableObject);

                Nullstone.AutoNotifyProperty(vm, "Rawr");

                vm.Instance.Load = function () {
                    this.Rawr = "HEYO";
                };

                Nullstone.FinishCreate(vm);
                ViewModels.MainViewModel = vm;
            })(SDB.ViewModels || (SDB.ViewModels = {}));
        })(Demos.SDB || (Demos.SDB = {}));
        var SDB = Demos.SDB;
    })(Fayde.Demos || (Fayde.Demos = {}));
    var Demos = Fayde.Demos;
})(Fayde || (Fayde = {}));