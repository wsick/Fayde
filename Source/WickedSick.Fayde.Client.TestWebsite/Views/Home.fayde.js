var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TestWebsite;
(function (TestWebsite) {
    (function (Views) {
        var Home = (function (_super) {
            __extends(Home, _super);
            function Home() {
                _super.call(this);
                this.Loaded.Subscribe(this.OnLoaded, this);
            }
            Home.prototype.OnLoaded = function (sender, e) {
                var HEYO = this.FindName("HEYO");
                setTimeout(function () {
                    HEYO.ItemsSource = [ { Text: "I" }, { Text: "Heart" }, { Text: "Newbs" } ];
                }, 4000);
            };
            return Home;
        })(Fayde.Controls.Page);
        Views.Home = Home;
        Nullstone.RegisterType(Home, "Home");
    })(TestWebsite.Views || (TestWebsite.Views = {}));
    var Views = TestWebsite.Views;
})(TestWebsite || (TestWebsite = {}));