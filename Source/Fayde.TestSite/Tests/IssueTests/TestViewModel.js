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
        var TestViewModel = (function (_super) {
            __extends(TestViewModel, _super);
            function TestViewModel() {
                _super.call(this);
                this.AllItems = [
                    { Name: "Item1", Data: 0 },
                    { Name: "Item2", Data: 1 },
                    { Name: "Item3", Data: 2 }
                ];
                this.SelectedItem = this.AllItems[0];
            }
            TestViewModel.prototype.TestMethod = function (e) {
                if (e.sender)
                    alert("TestMethod called. [" + e.sender.constructor._TypeName + "]");
else if (e.parameter)
                    alert("TestMethod called. [" + e.parameter.Name + "]");
            };
            TestViewModel.ctor = (function () {
                Fayde.MVVM.NotifyProperties(TestViewModel, ["SelectedItem"]);
            })();
            return TestViewModel;
        })(Fayde.MVVM.ViewModelBase);
        IssueTests.TestViewModel = TestViewModel;
        Fayde.RegisterType(TestViewModel, {
            Name: "TestViewModel",
            Namespace: "Tests.IssueTests",
            XmlNamespace: "folder:Tests/IssueTests"
        });
    })(Tests.IssueTests || (Tests.IssueTests = {}));
    var IssueTests = Tests.IssueTests;
})(Tests || (Tests = {}));
