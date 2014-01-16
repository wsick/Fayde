/// <reference path="../../../jsbin/Fayde.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Tests;
(function (Tests) {
    (function (IssueTests) {
        var RelayCommand = Fayde.MVVM.RelayCommand;

        var DoubleListBoxViewModel = (function (_super) {
            __extends(DoubleListBoxViewModel, _super);
            function DoubleListBoxViewModel() {
                var _this = this;
                _super.call(this);
                this.AllItems = new Fayde.Collections.ObservableCollection();
                for (var i = 0; i < 6; i++) {
                    var ni = {
                        SubItems: new Fayde.Collections.ObservableCollection()
                    };
                    ni.SubItems.AddRange([1, 2, 3, 4, 5]);
                    this.AllItems.Add(ni);
                }
                this.AddItemCommand = new RelayCommand(function () {
                    return _this.Add();
                });
                this.RemoveFirstItemCommand = new RelayCommand(function () {
                    return _this.RemoveFirst();
                });
            }
            DoubleListBoxViewModel.prototype.Add = function () {
                if (this.AllItems.Count < 1)
                    return;
                var first = this.AllItems.GetValueAt(0);
                first.SubItems.Add(first.SubItems.Count);
            };
            DoubleListBoxViewModel.prototype.RemoveFirst = function () {
                if (this.AllItems.Count < 1)
                    return;
                var first = this.AllItems.GetValueAt(0);
                if (first.SubItems.Count < 1)
                    return;
                first.SubItems.RemoveAt(0);
                if (first.SubItems.Count < 1)
                    this.AllItems.RemoveAt(0);
            };
            return DoubleListBoxViewModel;
        })(Fayde.MVVM.ViewModelBase);
        IssueTests.DoubleListBoxViewModel = DoubleListBoxViewModel;
        Fayde.RegisterType(DoubleListBoxViewModel, "Tests.IssueTests", "folder:Tests/IssueTests");
    })(Tests.IssueTests || (Tests.IssueTests = {}));
    var IssueTests = Tests.IssueTests;
})(Tests || (Tests = {}));
