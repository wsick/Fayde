var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Demos) {
        (function (SDB) {
            (function (ViewModels) {
                var MainViewModel = (function (_super) {
                    __extends(MainViewModel, _super);
                    function MainViewModel() {
                        _super.apply(this, arguments);

                    }
                    MainViewModel.prototype.Load = function () {
                        var _this = this;
                        this.$Request = new AjaxJsonRequest(function (result) {
                            return _this.Songs = result.CreateJson();
                        }, function (error) {
                        });
                        this.$Request.Get("Services/GetAllSongs.ashx", null);
                    };
                    return MainViewModel;
                })(Fayde.MVVM.ViewModelBase);
                ViewModels.MainViewModel = MainViewModel;                
                Nullstone.AutoNotifyProperty(MainViewModel, "Songs");
                Nullstone.RegisterType(MainViewModel, "MainViewModel", Fayde.MVVM.ViewModelBase);
            })(SDB.ViewModels || (SDB.ViewModels = {}));
            var ViewModels = SDB.ViewModels;
        })(Demos.SDB || (Demos.SDB = {}));
        var SDB = Demos.SDB;
    })(Fayde.Demos || (Fayde.Demos = {}));
    var Demos = Fayde.Demos;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=MainViewModel.js.map
