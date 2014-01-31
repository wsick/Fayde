/// <reference path="../../../jsbin/Fayde.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    

    var TestViewModel = (function (_super) {
        __extends(TestViewModel, _super);
        function TestViewModel() {
            _super.call(this);
            this.ObsItems = new Fayde.Collections.ObservableCollection();
            this.AllItems = [
                { Name: "Item1", Data: 0 },
                { Name: "Item2", Data: 1 },
                { Name: "Item3", Data: 2 }
            ];
            this.SelectedItem = this.AllItems[0];
        }
        TestViewModel.prototype.TestMethod = function (e) {
            if (!this || !(this instanceof TestViewModel))
                alert("ERROR: this is not scoped to TestViewModel.");
            if (e.sender)
                alert("TestMethod called. [" + e.sender.constructor.name + "]");
            else if (e.parameter)
                alert("TestMethod called. [" + e.parameter.Name + "]");
        };
        TestViewModel.prototype.AddObservableItem = function (e) {
            this.ObsItems.Add(this.ObsItems.Count.toString());
        };
        TestViewModel.ctor = (function () {
            Fayde.MVVM.NotifyProperties(TestViewModel, ["SelectedItem"]);
        })();
        return TestViewModel;
    })(Fayde.MVVM.ViewModelBase);
    
    return TestViewModel;
});
