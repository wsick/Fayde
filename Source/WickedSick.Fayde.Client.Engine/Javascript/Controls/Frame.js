/// <reference path="ContentControl.js"/>
/// CODE
/// <reference path="../Primitives/Uri.js"/>
/// <reference path="../Navigation/UriMapper.js"/>

//#region Frame
var Frame = Nullstone.Create("Frame", ContentControl);

//#region Dependency Properties

Frame.IsDeepLinkedProperty = DependencyProperty.Register("IsDeepLinked", function () { return Boolean; }, Frame, true);
Frame.CurrentSourceProperty = DependencyProperty.RegisterReadOnly("CurrentSource", function () { return Uri; }, Frame);
Frame.SourceProperty = DependencyProperty.Register("Source", function () { return Uri; }, Frame, undefined, function (d, args) { d.SourcePropertyChanged(args); });
Frame.UriMapperProperty = DependencyProperty.Register("UriMapper", function () { return UriMapper; }, Frame);
//JournalOwnership
//CanGoBack
//CanGoForward
//ContentLoader
//CacheService
//NavigationService

Nullstone.AutoPropertiesReadOnly(Frame, [
    Frame.CurrentSourceProperty
]);

Nullstone.AutoProperties(Frame, [
    Frame.IsDeepLinkedProperty,
    Frame.SourceProperty,
    Frame.UriMapperProperty
]);

//#endregion

Frame.Instance.Init = function () {
    this.Init$ContentControl();

    this.Loaded.Subscribe(this._FrameLoaded, this);

    this.Navigated = new MulticastEvent();
    this.Navigating = new MulticastEvent();
    this.NavigationFailed = new MulticastEvent();
    this.NavigationStopped = new MulticastEvent();
    this.FragmentNavigation = new MulticastEvent();
};

Frame.Instance.GoForward = function () {
};
Frame.Instance.GoBackward = function () {
};
Frame.Instance.StopLoading = function () {
    if (this._Request) {
        this._Request.abort();
        this._Request = null;
    }
};
Frame.Instance.Navigate = function (source) {
    /// <param name="source" type="Uri"></param>
    var ns = this;
    this._Request = new AjaxJsonRequest(function (responseJson) { ns._HandleSuccessfulResponse(responseJson); },
        function (error) { ns._HandleErrorResponse(error); });
    this._Request.Get(source.toString());
};

Frame.Instance.SourcePropertyChanged = function (args) {
    //TODO: Ignore in design mode
    if (true)//if loaded and not updating source from nav service
        d.Navigate(args.NewValue);

    //TODO: Show default content uri in Content when in design mode
};

Frame.Instance._FrameLoaded = function (sender, e) {
    this._NavService = App.Instance.NavService;
    if (this.IsDeepLinked) {
        this._NavService.LocationChanged.Subscribe(this._HandleDeepLink, this);
        this._HandleDeepLink();
    }
};

Frame.Instance._HandleDeepLink = function () {
    var source = this._NavService.Href + "#" + this._NavService.Hash;
    this.$SetValueInternal(Frame.CurrentSourceProperty, source);
    this._LoadContent(this._NavService.Href, this._NavService.Hash);
};
Frame.Instance._LoadContent = function (href, hash) {
    this.StopLoading();
    var ns = this;
    this._Request = new AjaxJsonRequest(function (responseJson) { ns._HandleSuccessfulResponse(responseJson); },
        function (error) { ns._HandleErrorResponse(error); });
    this._Request.Get(href, "p=" + hash);
};
Frame.Instance._HandleSuccessfulResponse = function (responseJson) {
    var page = JsonParser.Parse(responseJson);
    if (page instanceof Page) {
        document.title = page.Title;
        this.Content = page.Content;
    }
    this._Request = null;
};
Frame.Instance._HandleErrorResponse = function (error) {
    this._Request = null;
};

Nullstone.FinishCreate(Frame);
//#endregion