/// <reference path="../Runtime/Nullstone.js"/>
/// CODE

(function (namespace) {
    var NavService = Nullstone.Create("NavService", undefined, 1);

    NavService.Instance.Init = function (app) {
        this.LocationChanged = new MulticastEvent();
        this.App = app;
        this.Href = window.location.href;
        this.Hash = window.location.hash;
        if (this.Hash) {
            this.Hash = this.Hash.substr(1);
            this.Href = this.Href.substring(0, this.Href.indexOf('#'));
        }
        var ns = this;
        window.onhashchange = function () { ns._HandleFragmentChange(); };
    };

    NavService.Instance._HandleFragmentChange = function () {
        this.App.Address = new Uri(document.URL);
        this.Hash = window.location.hash;
        if (this.Hash) {
            this.Hash = this.Hash.substr(1);
        }
        this.LocationChanged.Raise(this, new EventArgs());
    };

    namespace.NavService = Nullstone.FinishCreate(NavService);
})(window);