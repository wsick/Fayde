/// <reference path="../../../scripts/Fayde.d.ts" />

module Fayde.Demos.StackOverflow.ViewModels {
    export class MainViewModel extends Fayde.MVVM.ViewModelBase {
        Questions: any[];
        $PageNumber: number;
        $Request: AjaxJsonRequest;
        PreviousPageCommand: MVVM.RelayCommand;
        NextPageCommand: MVVM.RelayCommand;
        Load() {
            this.PreviousPageCommand = new Fayde.MVVM.RelayCommand((parameter) => this.PreviousPage_Execute(parameter));
            this.NextPageCommand = new Fayde.MVVM.RelayCommand((parameter) => this.NextPage_Execute(parameter));
            this.Questions = [];
            this.$PageNumber = 1;
            this.GetPage(1);
        }
        PreviousPage_Execute(parameter) {
            this.$PageNumber--;
            this.GetPage(this.$PageNumber);
        }
        NextPage_Execute(parameter) {
            this.$PageNumber++;
            this.GetPage(this.$PageNumber);
        }
        GetPage(pageNumber: number) {
            if (this.$Request != null)
                return;
            this.$Request = new AjaxJsonRequest(
                (json) => { this.$Request = null, this._HandleQuestionResponse(json); },
                (error) => this.$Request = null);
            this.$Request.Get("so.ashx", "tagged=silverlight&sort=activity&page=" + pageNumber);
        }
        _HandleQuestionResponse(json) {
            this.Questions = json.items;
        }
    }
    Nullstone.AutoNotifyProperty(MainViewModel, "Questions");
    Nullstone.AutoNotifyProperty(MainViewModel, "PreviousPageCommand");
    Nullstone.AutoNotifyProperty(MainViewModel, "NextPageCommand");
    Nullstone.RegisterType(MainViewModel, "MainViewModel", MVVM.ViewModelBase);
}