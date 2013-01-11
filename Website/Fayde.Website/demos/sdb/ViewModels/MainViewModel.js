/// <reference path="../../../scripts/Fayde.js" />
/// <reference path="ObservableObject.js" />

(function (namespace) {
    var vm = Nullstone.Create("MainViewModel", Fayde.MVVM.ViewModelBase);

    Nullstone.AutoNotifyProperty(vm, "Songs");

    vm.Instance.Load = function () {
        var that = this;
        this.$Request = new AjaxJsonRequest(
            function (json) {
                that.Songs = json;
            },
            function (error) {
            });
        this.$Request.Get("Services/GetAllSongs.ashx");
    };

    Nullstone.FinishCreate(vm);
    namespace.MainViewModel = vm;
})(Nullstone.Namespace("Fayde.Demos.SDB.ViewModels"));