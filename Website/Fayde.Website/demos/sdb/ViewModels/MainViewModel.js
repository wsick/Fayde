/// <reference path="../../../scripts/Fayde.js" />
/// <reference path="ObservableObject.js" />

(function (namespace) {
    var vm = Nullstone.Create("MainViewModel", Fayde.Demos.SDB.ViewModels.ObservableObject);
    Nullstone.AutoNotifyProperty(vm, "Rawr");

    vm.Instance.Load = function () {
        this.Rawr = "HEYO";
    };

    Nullstone.FinishCreate(vm);
    namespace.MainViewModel = vm;
})(Nullstone.Namespace("Fayde.Demos.SDB.ViewModels"));