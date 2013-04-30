/// <reference path="ContentControl.ts" />
/// CODE
/// <reference path="Page.ts" />
/// <reference path="../Primitives/Uri.ts" />
/// <reference path="../Runtime/AjaxJsonRequest.ts" />
/// <reference path="../Engine/XamlResolver.ts" />

module Fayde.Controls {
    export class Frame extends ContentControl {
        static IsDeepLinkedProperty: DependencyProperty = DependencyProperty.Register("IsDeepLinked", () => Boolean, Frame, true);
        static CurrentSourceProperty: DependencyProperty = DependencyProperty.RegisterReadOnly("CurrentSource", () => Uri, Frame);
        static SourceProperty: DependencyProperty = DependencyProperty.Register("Source", () => Uri, Frame, undefined, (d, args) => (<Frame>d).SourcePropertyChanged(args));
        IsDeepLinked: bool;
        CurrentSource: Uri;
        Source: Uri;

        private _Request: AjaxJsonRequest;
        private _Resolver: XamlResolver;
        private _NavService: Navigation.NavService;

        //Navigated = new MulticastEvent();
        //Navigating = new MulticastEvent();
        //NavigationFailed = new MulticastEvent();
        //NavigationStopped = new MulticastEvent();
        //FragmentNavigation = new MulticastEvent();

        constructor() {
            super();
            this.Loaded.Subscribe(this._FrameLoaded, this);
        }

        Navigate(uri: Uri) {
            this._Request = new AjaxJsonRequest(
                (result) => this._HandleSuccessfulResponse(result),
                (error) => this._HandleErrorResponse(error));
            this._Request.Get(uri.toString());
        }
        GoForward() {
            //TODO: Implement
        }
        GoBackward() {
            //TODO: Implement
        }
        StopLoading() {
            if (this._Request) {
                this._Request.Cancel();
                this._Request = null;
            }
        }
        private _FrameLoaded(sender, e: RoutedEventArgs) {
            this._NavService = App.Instance.NavService;
            if (this.IsDeepLinked) {
                this._NavService.LocationChanged.Subscribe(this._HandleDeepLink, this);
                this._HandleDeepLink();
            }
        }
        private _HandleDeepLink() {
            var source = this._NavService.Href + "#" + this._NavService.Hash;
            this.SetValueInternal(Frame.CurrentSourceProperty, source);
            this._LoadContent(this._NavService.Href, this._NavService.Hash);
        }
        private _LoadContent(href: string, hash: string) {
            this.StopLoading();

            var that = this;
            this._Resolver = new XamlResolver(
                (xamlResult, scriptResult) => this._HandleSuccessfulResponse(xamlResult),
                (xamlResult, scriptResult) => this._HandleSuccessfulSubResponse(xamlResult),
                (error) => this._HandleErrorResponse(error));
            this._Resolver.Load(href, hash);
        }
        private _HandleSuccessfulResponse(ajaxJsonResult: AjaxJsonResult) {
            var response = JsonParser.Parse(ajaxJsonResult.CreateJson());
            if (response instanceof Page) {
                var page = <Page>response;
                document.title = page.Title;
                //canProfile = profiles.frameUpdate;
                this.Content = page;
            }
            this._Request = null;
        }
        private _HandleSuccessfulSubResponse(ajaxJsonResult: AjaxJsonResult) {
            var json = ajaxJsonResult.CreateJson();
            var jsType = json.ParseType;
            jsType.__TemplateJson = json;
        }
        private _HandleErrorResponse(error: string) {
            this._Resolver = null;
        }

        private SourcePropertyChanged(args: IDependencyPropertyChangedEventArgs) {
            //TODO: Ignore in design mode
            if (true)//if loaded and not updating source from nav service
                this.Navigate(args.NewValue);

            //TODO: Show default content uri in Content when in design mode
        }
    }
    Nullstone.RegisterType(Frame, "Frame");
}