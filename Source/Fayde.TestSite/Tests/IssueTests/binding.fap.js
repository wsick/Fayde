var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Tests;
(function (Tests) {
    /// <reference path="../../../jsbin/Fayde.d.ts" />
    (function (IssueTests) {
        var Application = (function (_super) {
            __extends(Application, _super);
            function Application() {
                _super.call(this);
                this.Loaded.Subscribe(this.OnLoaded, this);
            }
            Application.prototype.OnLoaded = function (sender, e) {
                this.RootVisual.DataContext = new TestViewModel();
            };
            return Application;
        })(App);
        IssueTests.Application = Application;
        Nullstone.RegisterType(Application, "Application");

        var TestViewModel = (function (_super) {
            __extends(TestViewModel, _super);
            function TestViewModel() {
                _super.apply(this, arguments);
                this.AllItems = [
                    { Name: "Item1", Data: 0 },
                    { Name: "Item2", Data: 1 },
                    { Name: "Item3", Data: 2 }
                ];
            }
            TestViewModel.ctor = (function () {
                Fayde.MVVM.NotifyProperties(TestViewModel, ["SelectedItem"]);
            })();
            return TestViewModel;
        })(Fayde.MVVM.ViewModelBase);
        IssueTests.TestViewModel = TestViewModel;
    })(Tests.IssueTests || (Tests.IssueTests = {}));
    var IssueTests = Tests.IssueTests;
})(Tests || (Tests = {}));
