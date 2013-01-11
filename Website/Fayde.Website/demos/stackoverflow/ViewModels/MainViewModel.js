/// <reference path="../../../scripts/Fayde.js" />

(function (namespace) {
    var vm = Nullstone.Create("MainViewModel", Fayde.MVVM.ViewModelBase);

    Nullstone.AutoNotifyProperty(vm, "Questions");
    Nullstone.AutoNotifyProperty(vm, "PreviousPageCommand");
    Nullstone.AutoNotifyProperty(vm, "NextPageCommand");

    vm.Instance.Load = function () {
        var that = this;
        this.PreviousPageCommand = new Fayde.MVVM.RelayCommand(function (parameter) { that.PreviousPage_Execute(parameter); });
        this.NextPageCommand = new Fayde.MVVM.RelayCommand(function (parameter) { that.NextPage_Execute(parameter); });
        this.Questions = [];
        this.$PageNumber = 1;
        this.GetPage(1);
    };

    vm.Instance.PreviousPage_Execute = function (parameter) {
        this.$PageNumber--;
        this.GetPage(this.$PageNumber);
    };
    vm.Instance.NextPage_Execute = function (parameter) {
        this.$PageNumber++;
        this.GetPage(this.$PageNumber);
    };

    vm.Instance.GetPage = function (pageNumber) {
        if (this.$Request != null)
            return;
        var that = this;
        this.$Request = new AjaxJsonRequest(
            function (json) { that.$Request = null; that.HandleQuestionResponse(json); },
            function (error) { that.$Request = null; });
        this.$Request.Get("so.ashx", "tagged=silverlight&sort=activity&page=" + pageNumber);
    };

    vm.Instance.HandleQuestionResponse = function (json) {
        this.Questions = json.items;
    };

    Nullstone.FinishCreate(vm);
    namespace.MainViewModel = vm;
})(Nullstone.Namespace("Fayde.Demos.StackOverflow.ViewModels"));