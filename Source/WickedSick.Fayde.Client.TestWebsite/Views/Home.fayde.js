/// <reference path="../../scripts/Fayde.js"/>

var TestWebsite;
(function (TestWebsite) {
    var Views;
    (function (Views) {
        var Home = Nullstone.Create("Home", Page);

        Home.Instance.Init = function () {
            this.Init$Page();
            this.Loaded.Subscribe(this.OnLoaded, this);
        };

        Home.Instance.OnLoaded = function (o, e) {
            var HEYO = this.FindName("HEYO");
            setTimeout(function () {
                //debugger;
                HEYO.ItemsSource = [{ Text: "I" }, { Text: "Heart" }, { Text: "Newbs" }];
            }, 4000);
        };

        Nullstone.FinishCreate(Home);
        Views.Home = Home;
    })(Views || (Views = {}));
    TestWebsite.Views = Views;
})(TestWebsite || (TestWebsite = {}));