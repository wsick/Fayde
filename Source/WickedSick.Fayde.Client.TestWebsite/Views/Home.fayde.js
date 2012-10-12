(function () {
    var Home = Nullstone.Create("Home", Page);

    Home.Instance.Init = function () {
        this.Init$Page();
        this.Loaded.Subscribe(this.OnLoaded, this);
    };

    Home.Instance.OnLoaded = function (o, e) {
        alert("GET YOU SOME OF THAT. I LOADED BITCH!");
    };

    Nullstone.FinishCreate(Home);
    return Home;
})()