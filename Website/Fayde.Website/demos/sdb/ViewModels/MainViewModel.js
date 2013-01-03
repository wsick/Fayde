/// <reference path="../../../scripts/Fayde.js" />

var Fayde;
(function (Fayde) {
    (function (Demos) {
        (function (SDB) {
            (function (ViewModels) {
                var vm = Nullstone.Create("MainViewModel", undefined, 0, [INotifyPropertyChanged]);

                vm.Instance.Init = function () {
                    this.PropertyChanged = new MulticastEvent();
                };

                Nullstone.AutoNotifyProperty(vm, "Rawr");

                vm.Instance.Load = function () {
                    this.Rawr = "HEYO";
                };

                vm.Instance.OnPropertyChanged = function (propertyName) {
                    this.PropertyChanged.Raise(this, new PropertyChangedEventArgs(propertyName));
                };

                Nullstone.FinishCreate(vm);
                ViewModels.MainViewModel = vm;
            })(SDB.ViewModels || (SDB.ViewModels = {}));
        })(Demos.SDB || (Demos.SDB = {}));
        var SDB = Demos.SDB;
    })(Fayde.Demos || (Fayde.Demos = {}));
    var Demos = Fayde.Demos;
})(Fayde || (Fayde = {}));