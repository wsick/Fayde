/// <reference path="ContentControl.js"/>
/// CODE
/// <reference path="../Primitives/Uri.js"/>
/// <reference path="../Navigation/UriMapper.js"/>
/// <reference path="../Runtime/AjaxJsonRequest.js"/>
/// <reference path="../Engine/XamlResolver.js"/>

(function (namespace) {
    var Frame = Nullstone.Create("Frame", namespace.ContentControl);

    Frame.Instance.Init = function () {
        this.Init$ContentControl();

        this.Loaded.Subscribe(this._FrameLoaded, this);

        this.Navigated = new MulticastEvent();
        this.Navigating = new MulticastEvent();
        this.NavigationFailed = new MulticastEvent();
        this.NavigationStopped = new MulticastEvent();
        this.FragmentNavigation = new MulticastEvent();
    };

    //#region Properties

    Frame.IsDeepLinkedProperty = DependencyProperty.Register("IsDeepLinked", function () { return Boolean; }, Frame, true);
    Frame.CurrentSourceProperty = DependencyProperty.RegisterReadOnly("CurrentSource", function () { return Uri; }, Frame);
    Frame.SourceProperty = DependencyProperty.Register("Source", function () { return Uri; }, Frame, undefined, function (d, args) { d.SourcePropertyChanged(args); });
    Frame.UriMapperProperty = DependencyProperty.Register("UriMapper", function () { return Fayde.Navigation.UriMapper; }, Frame);
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

    Frame.Instance.GoForward = function () {
    };
    Frame.Instance.GoBackward = function () {
    };
    Frame.Instance.StopLoading = function () {
        if (this._Request) {
            this._Request.Cancel();
            this._Request = null;
        }
    };
    Frame.Instance.Navigate = function (source) {
        /// <param name="source" type="Uri"></param>
        var ns = this;
        this._Request = new AjaxJsonRequest(function (result) { ns._HandleSuccessfulResponse(result); },
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

        var that = this;
        this._Resolver = new Fayde.XamlResolver(
            function (xamlResult, scriptResult) { that._HandleSuccessfulResponse(xamlResult); },
            function (xamlResult, scriptResult) { that._HandleSuccessfulSubResponse(xamlResult); },
            function (error) { that._HandleErrorResponse(error); });
        this._Resolver.Load(href, hash);
    };
    Frame.Instance._HandleSuccessfulResponse = function (ajaxJsonResult) {
        /// <param name="ajaxJsonResult" type="AjaxJsonResult"></param>
        var dependencies = ajaxJsonResult.GetHeader("Dependencies");


        var page = Fayde.JsonParser.Parse(ajaxJsonResult.CreateJson());
        if (page instanceof namespace.Page) {
            document.title = page.Title;
            this.Content = page;
        }
        this._Request = null;
    };
    Frame.Instance._HandleSuccessfulSubResponse = function (ajaxJsonResult) {
        var json = ajaxJsonResult.CreateJson();
        var jsType = json.Type;
        jsType.__TemplateJson = json;
    };
    Frame.Instance._FinishLoadContent = function () {
    };
    Frame.Instance._HandleErrorResponse = function (error) {
        this._Resolver = null;
    };

    namespace.Frame = Nullstone.FinishCreate(Frame);
})(Nullstone.Namespace("Fayde.Controls"));