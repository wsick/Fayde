var TestWebsite;
(function (TestWebsite) {
    var app = Nullstone.Create("app", App);

    app.Instance.Init = function () {
        this.Init$App();
        this.Loaded.Subscribe(this.OnLoaded, this);
    };

    app.Instance.OnLoaded = function (sender, e) {

    };
    
    Nullstone.FinishCreate(app);
    TestWebsite.App = app;
})(TestWebsite || (TestWebsite = {}));