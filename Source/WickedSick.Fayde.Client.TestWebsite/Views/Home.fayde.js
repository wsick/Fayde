(function () {
    var Home = Nullstone.Create("Home", Page);

    var HEYO;

    Home.Instance.Init = function () {
        this.Init$Page();
        this.Loaded.Subscribe(this.OnLoaded, this);
    };

    Home.Instance.OnLoaded = function (o, e) {
        HEYO = this.FindName("HEYO");
        setTimeout(function () {
            HEYO.ItemsSource = [{ Text: "I" }, { Text: "Heart" }, { Text: "Newbs" }];
        }, 4000);
    };

    Nullstone.FinishCreate(Home);
    return Home;
})()