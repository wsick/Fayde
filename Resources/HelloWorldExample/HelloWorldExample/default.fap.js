/// <reference path="scripts/Fayde.js"/>

(function (namespace) {
    var app = Nullstone.Create("app", App);

    app.Instance.Init = function () {
        this.Init$App();
        this.Loaded.Subscribe(this.OnLoaded, this);
    };

    app.Instance.OnLoaded = function (sender, e) {
    };

    Nullstone.FinishCreate(app);
    namespace.App = app;
})(Nullstone.Namespace("HelloWorldExample"));