var Fayde;
(function (Fayde) {
    /// CODE
    /// <reference path="../Engine/App.ts" />
    /// <reference path="../Runtime/MulticastEvent.ts" />
    /// <reference path="../Runtime/EventArgs.ts" />
    (function (Navigation) {
        var NavService = (function () {
            function NavService(app) {
                var _this = this;
                this.LocationChanged = new MulticastEvent();
                this.App = app;
                this.Href = window.location.href;
                this.Hash = window.location.hash;
                if(this.Hash) {
                    this.Hash = this.Hash.substr(1);
                    this.Href = this.Href.substring(0, this.Href.indexOf('#'));
                }
                window.onhashchange = function () {
                    return _this._HandleFragmentChange();
                };
            }
            NavService.prototype._HandleFragmentChange = function () {
                this.App.Address = new Uri(document.URL);
                this.Hash = window.location.hash;
                if(this.Hash) {
                    this.Hash = this.Hash.substr(1);
                }
                this.LocationChanged.Raise(this, EventArgs.Empty);
            };
            return NavService;
        })();
        Navigation.NavService = NavService;        
    })(Fayde.Navigation || (Fayde.Navigation = {}));
    var Navigation = Fayde.Navigation;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=NavService.js.map
