var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Tests;
(function (Tests) {
    (function (Controls) {
        var ListBox = (function (_super) {
            __extends(ListBox, _super);
            function ListBox() {
                _super.call(this);
                this.Loaded.Subscribe(this.OnLoaded, this);
            }
            ListBox.prototype.OnLoaded = function () {
                var MyListBox = this.RootVisual.FindName("MyListBox");
                var arr = [];
                for (var i = 0; i < 50; i++) {
                    arr.push("Text " + i);
                }
                MyListBox.ItemsSource = arr;
            };
            return ListBox;
        })(App);
        Controls.ListBox = ListBox;
        Nullstone.RegisterType(ListBox, "ListBox");
    })(Tests.Controls || (Tests.Controls = {}));
    var Controls = Tests.Controls;
})(Tests || (Tests = {}));