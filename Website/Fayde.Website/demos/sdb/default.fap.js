var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
Nullstone.ImportJsFile("ViewModels/MainViewModel.js");
var Fayde;
(function (Fayde) {
    (function (Demos) {
        (function (SDB) {
            var app = (function (_super) {
                __extends(app, _super);
                function app() {
                                _super.call(this);
                    this.Loaded.Subscribe(this.OnLoaded, this);
                }
                app.prototype.OnLoaded = function (sender, e) {
                    var vm = new SDB.ViewModels.MainViewModel();
                    vm.Load();
                    (this.RootVisual).DataContext = vm;
                };
                return app;
            })(App);
            SDB.app = app;            
            Nullstone.RegisterType(app, "app", App);
        })(Demos.SDB || (Demos.SDB = {}));
        var SDB = Demos.SDB;
    })(Fayde.Demos || (Fayde.Demos = {}));
    var Demos = Fayde.Demos;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=default.fap.js.map
