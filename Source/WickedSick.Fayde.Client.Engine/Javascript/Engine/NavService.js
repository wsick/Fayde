function NavService(app) {
    this.App = app;
    this.Href = window.location.href;
    this.Hash = window.location.hash;
    if (this.Hash) {
        this.Hash = this.Hash.substr(1);
        this.Href = this.Href.substring(0, this.Href.indexOf('#'));
    }
    var ns = this;
    window.onhashchange = function () { ns._HandleFragmentChange(); };
}

NavService.prototype.NavigateInitial = function () {
    this._HandleFragmentChange();
};

NavService.prototype._HandleFragmentChange = function () {
    if (this._Request) {
        this._Request.abort();
        this._Request = null;
    }
    this.App.Address = new Uri(document.URL);
    this.Hash = window.location.hash;
    if (this.Hash) {
        this.Hash = this.Hash.substr(1);
    }
    var ns = this;
    this._Request = new AjaxJsonRequest(function (responseJson) { ns._HandleSuccessfulResponse(responseJson); },
        function (error) { ns._HandleErrorResponse(error); });
    this._Request.Get(this.Href, "p=" + this.Hash);
};

NavService.prototype._HandleSuccessfulResponse = function (responseJson) {
    this.App.LoadUIElement(responseJson);
    this._Request = null;
};
NavService.prototype._HandleErrorResponse = function (error) {
    this._Request = null;
};