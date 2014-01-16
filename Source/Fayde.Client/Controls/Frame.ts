/// <reference path="ContentControl.ts" />

module Fayde.Controls {
    var ERROR_PAGE_XAML = "<Page xmlns=\"" + Fayde.XMLNS + "\" xmlns:x=\"" + Fayde.XMLNSX + "\"><TextBlock Text=\"An error occurred navigating.\" /></Page>";
    var ERROR_PAGE: Page = undefined;
    function getErrorPage(): Page {
        if (!ERROR_PAGE)
            ERROR_PAGE = <Fayde.Controls.Page>Fayde.Xaml.Load(ERROR_PAGE_XAML);
        return ERROR_PAGE;
    }

    export class Frame extends ContentControl {
        static IsDeepLinkedProperty: DependencyProperty = DependencyProperty.Register("IsDeepLinked", () => Boolean, Frame, true);
        static CurrentSourceProperty: DependencyProperty = DependencyProperty.RegisterReadOnly("CurrentSource", () => Uri, Frame);
        static SourceProperty: DependencyProperty = DependencyProperty.Register("Source", () => Uri, Frame, undefined, (d, args) => (<Frame>d).SourcePropertyChanged(args));
        static UriMapperProperty = DependencyProperty.Register("UriMapper", () => Navigation.UriMapper, Frame);
        IsDeepLinked: boolean;
        CurrentSource: Uri;
        Source: Uri;
        UriMapper: Navigation.UriMapper;

        private _NavService: Navigation.NavigationService = new Navigation.NavigationService();
        private _PageResolver: any;

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
            this._LoadContent(uri);
        }
        GoForward() {
            //TODO: Implement
        }
        GoBackward() {
            //TODO: Implement
        }
        StopLoading() {
            if (this._PageResolver) {
                this._PageResolver.Stop();
                this._PageResolver = null;
            }
        }
        private _FrameLoaded(sender, e: RoutedEventArgs) {
            if (this.IsDeepLinked) {
                this._NavService.LocationChanged.Subscribe(this._HandleDeepLink, this);
                this._HandleDeepLink();
            }
        }
        private _HandleDeepLink() {
            this._LoadContent(new Uri(this._NavService.Href + "#" + this._NavService.Hash));
        }

        private _LoadContent(source: Uri) {
            this.SetValueInternal(Frame.CurrentSourceProperty, source);
            this.StopLoading();

            var fragment = source.Fragment;
            TimelineProfile.Navigate(true, fragment);

            var targetUri = new Uri(fragment, UriKind.Relative);
            if (this.UriMapper)
                targetUri = this.UriMapper.MapUri(targetUri);
            var target = targetUri.toString();
            if (!target)
                throw new InvalidOperationException("Cannot resolve empty url.");
            this._PageResolver = Xaml.PageResolver.Resolve(target, (xaml) => this._HandleSuccess(xaml), (error) => this._HandleError(error));
        }
        private _HandleSuccess(xaml: Document) {
            this._PageResolver = null;
            TimelineProfile.Parse(true, "Page");
            var page = <Page>Xaml.LoadDocument(xaml);
            TimelineProfile.Parse(false, "Page");
            this.Content = page;
            document.title = page.Title;
            TimelineProfile.Navigate(false);
            TimelineProfile.IsNextLayoutPassProfiled = true;
        }
        private _HandleError(error: string) {
            this._PageResolver = null;
            document.title = "Error";
            var page = getErrorPage();
            page.DataContext = error;
            this.Content = page;
            TimelineProfile.Navigate(false);
        }

        private SourcePropertyChanged(args: IDependencyPropertyChangedEventArgs) {
            //TODO: Ignore in design mode
            if (true)//if loaded and not updating source from nav service
                this.Navigate(args.NewValue);

            //TODO: Show default content uri in Content when in design mode
        }
    }
    Fayde.RegisterType(Frame, "Fayde.Controls", Fayde.XMLNS);
}