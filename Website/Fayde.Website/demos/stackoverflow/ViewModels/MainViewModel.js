var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Demos) {
        (function (StackOverflow) {
            (function (ViewModels) {
                var MainViewModel = (function (_super) {
                    __extends(MainViewModel, _super);
                    function MainViewModel() {
                        _super.apply(this, arguments);

                    }
                    MainViewModel.prototype.Load = function () {
                        var _this = this;
                        this.PreviousPageCommand = new Fayde.MVVM.RelayCommand(function (parameter) {
                            return _this.PreviousPage_Execute(parameter);
                        });
                        this.NextPageCommand = new Fayde.MVVM.RelayCommand(function (parameter) {
                            return _this.NextPage_Execute(parameter);
                        });
                        this.Questions = [];
                        this.$PageNumber = 1;
                        this.GetPage(1);
                    };
                    MainViewModel.prototype.PreviousPage_Execute = function (parameter) {
                        this.$PageNumber--;
                        this.GetPage(this.$PageNumber);
                    };
                    MainViewModel.prototype.NextPage_Execute = function (parameter) {
                        this.$PageNumber++;
                        this.GetPage(this.$PageNumber);
                    };
                    MainViewModel.prototype.GetPage = function (pageNumber) {
                        var _this = this;
                        if(this.$Request != null) {
                            return;
                        }
                        this.$Request = new AjaxJsonRequest(function (json) {
                            _this.$Request = null , _this._HandleQuestionResponse(json);
                        }, function (error) {
                            return _this.$Request = null;
                        });
                        this.$Request.Get("so.ashx", "tagged=silverlight&sort=activity&page=" + pageNumber);
                    };
                    MainViewModel.prototype._HandleQuestionResponse = function (json) {
                        this.Questions = json.items;
                    };
                    return MainViewModel;
                })(Fayde.MVVM.ViewModelBase);
                ViewModels.MainViewModel = MainViewModel;                
                Nullstone.AutoNotifyProperty(MainViewModel, "Questions");
                Nullstone.AutoNotifyProperty(MainViewModel, "PreviousPageCommand");
                Nullstone.AutoNotifyProperty(MainViewModel, "NextPageCommand");
                Nullstone.RegisterType(MainViewModel, "MainViewModel", Fayde.MVVM.ViewModelBase);
            })(StackOverflow.ViewModels || (StackOverflow.ViewModels = {}));
            var ViewModels = StackOverflow.ViewModels;
        })(Demos.StackOverflow || (Demos.StackOverflow = {}));
        var StackOverflow = Demos.StackOverflow;
    })(Fayde.Demos || (Fayde.Demos = {}));
    var Demos = Fayde.Demos;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=MainViewModel.js.map
