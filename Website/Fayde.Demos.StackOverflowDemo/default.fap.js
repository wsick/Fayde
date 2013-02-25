var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Demos) {
        (function (StackOverflow) {
            var isLoaded = false;
            var onAppLoaded;
            Nullstone.ImportJsFile("ViewModels/MainViewModel.js", function () {
                isLoaded = true;
                if(onAppLoaded) {
                    onAppLoaded();
                    delete onAppLoaded;
                }
            });
            var Application = (function (_super) {
                __extends(Application, _super);
                function Application() {
                                _super.call(this);
                    this.Loaded.Subscribe(this.OnLoaded, this);
                }
                Application.prototype.OnLoaded = function (sender, e) {
                    var _this = this;
                    if(isLoaded) {
                        this.Setup();
                    } else {
                        onAppLoaded = function () {
                            return _this.Setup();
                        };
                    }
                };
                Application.prototype.Setup = function () {
                    var vm = new StackOverflow.ViewModels.MainViewModel();
                    vm.Load();
                    (this.RootVisual).DataContext = vm;
                };
                return Application;
            })(App);
            StackOverflow.Application = Application;            
            Nullstone.RegisterType(Application, "Application", App);
        })(Demos.StackOverflow || (Demos.StackOverflow = {}));
        var StackOverflow = Demos.StackOverflow;
    })(Fayde.Demos || (Fayde.Demos = {}));
    var Demos = Fayde.Demos;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=default.fap.js.map
