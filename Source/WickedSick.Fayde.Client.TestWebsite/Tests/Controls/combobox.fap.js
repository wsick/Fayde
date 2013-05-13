var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Tests;
(function (Tests) {
    (function (Controls) {
        var ComboBox = (function (_super) {
            __extends(ComboBox, _super);
            function ComboBox() {
                _super.call(this);
                this.Loaded.Subscribe(this.OnLoaded, this);
            }
            ComboBox.prototype.OnLoaded = function () {
                var MyComboBox = this.RootVisual.FindName("MyComboBox");
                var arr = [];
                for (var i = 0; i < 10; i++) {
                    arr.push("Text " + i);
                }
                MyComboBox.ItemsSource = arr;
            };
            return ComboBox;
        })(App);
        Controls.ComboBox = ComboBox;
        Nullstone.RegisterType(ComboBox, "ComboBox");
    })(Tests.Controls || (Tests.Controls = {}));
    var Controls = Tests.Controls;
})(Tests || (Tests = {}));