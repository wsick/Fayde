(function (namespace) {
    var Home = Nullstone.Create("Home", Page);

    Home.Instance.Init = function () {
        this.Init$Page();
        this.Loaded.Subscribe(this.OnLoaded, this);
    };

    Home.Instance.OnLoaded = function (o, e) {
        var HEYO = this.FindName("HEYO");
        setTimeout(function () {
            HEYO.ItemsSource = [{ Text: "I" }, { Text: "Heart" }, { Text: "Newbs" }];
        }, 4000);
    };

    Nullstone.FinishCreate(Home);
    namespace.Home = Home;
})(Nullstone.Namespace("TestWebsite.Views"));