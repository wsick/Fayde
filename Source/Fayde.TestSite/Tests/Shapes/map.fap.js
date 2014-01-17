/// <reference path="../../../jsbin/Fayde.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (TestSite) {
        (function (Tests) {
            (function (Shapes) {
                var App = (function (_super) {
                    __extends(App, _super);
                    function App() {
                        _super.call(this);
                        this.Loaded.Subscribe(this._Load, this);
                    }
                    App.prototype._Load = function (sender, e) {
                        var canvas = this.RootVisual;
                        var enumerator = canvas.Children.GetEnumerator();
                        while (enumerator.MoveNext()) {
                            var cur = enumerator.Current;
                            cur.MouseEnter.Subscribe(this._MouseEnter, this);
                            cur.MouseLeave.Subscribe(this._MouseLeave, this);
                        }
                    };

                    App.prototype._MouseEnter = function (sender, e) {
                        var path = sender;
                        path.StrokeThickness = 10;
                        Fayde.Controls.Canvas.SetZIndex(path, 9999);
                    };
                    App.prototype._MouseLeave = function (sender, e) {
                        var path = sender;
                        path.StrokeThickness = 2;
                        Fayde.Controls.Canvas.SetZIndex(path, 0);
                    };
                    return App;
                })(Fayde.Application);
                Shapes.App = App;
                Fayde.RegisterType(App, "Fayde.TestSite.Tests", "http://schemas.wsick.com/fayde/tests");
            })(Tests.Shapes || (Tests.Shapes = {}));
            var Shapes = Tests.Shapes;
        })(TestSite.Tests || (TestSite.Tests = {}));
        var Tests = TestSite.Tests;
    })(Fayde.TestSite || (Fayde.TestSite = {}));
    var TestSite = Fayde.TestSite;
})(Fayde || (Fayde = {}));
