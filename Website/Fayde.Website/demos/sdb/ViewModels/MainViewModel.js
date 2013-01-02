
var Fayde;
(function (Fayde) {
    (function (Demos) {
        (function (SDB) {
            (function (ViewModels) {
                var vm = Nullstone.Create("MainViewModel");

                vm.Instance.Load = function () {
                    alert("Load MainViewModel");
                };

                Nullstone.FinishCreate(vm);
                ViewModels.MainViewModel = vm;
            })(SDB.ViewModels || (SDB.ViewModels = {}));
        })(Demos.SDB || (Demos.SDB = {}));
        var SDB = Demos.SDB;
    })(Fayde.Demos || (Fayde.Demos = {}));
    var Demos = Fayde.Demos;
})(Fayde || (Fayde = {}));