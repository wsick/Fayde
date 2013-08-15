var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TestWebsite;
(function (TestWebsite) {
    var Application = (function (_super) {
        __extends(Application, _super);
        function Application() {
            _super.call(this);
            this.Loaded.Subscribe(this.OnLoaded, this);
        }
        Application.prototype.OnLoaded = function (sender, e) {
        };
        return Application;
    })(App);
    TestWebsite.Application = Application;
})(TestWebsite || (TestWebsite = {}));
