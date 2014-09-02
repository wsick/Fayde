/// <reference path="ContentControl.ts" />
/// <reference path="../Xaml/XamlDocument.ts" />
/// <reference path="../Xaml/XamlLoader.ts" />
/// <reference path="Page.ts" />

module Fayde.Controls {
    function createErrorDoc (error: any): Xaml.XamlDocument {
        var safe = (error || '').toString()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
        var xaml = '<Page xmlns="' + Fayde.XMLNS + '" xmlns:x="' + Fayde.XMLNSX + '" Title="Error">';
        xaml += '<TextBlock Text="' + safe + '" />';
        xaml += '</Page>';
        return new Xaml.XamlDocument(xaml);
    }

    function getErrorPage (error: string): Page {
        return <Page>Xaml.Load(createErrorDoc(error).Document);
    }

    export class Frame extends ContentControl {
        static IsDeepLinkedProperty: DependencyProperty = DependencyProperty.Register("IsDeepLinked", () => Boolean, Frame, true);
        static CurrentSourceProperty: DependencyProperty = DependencyProperty.RegisterReadOnly("CurrentSource", () => Uri, Frame);
        static SourceProperty: DependencyProperty = DependencyProperty.Register("Source", () => Uri, Frame, undefined, (d, args) => (<Frame>d).SourcePropertyChanged(args));
        static UriMapperProperty = DependencyProperty.Register("UriMapper", () => Navigation.UriMapper, Frame);
        static RouteMapperProperty = DependencyProperty.Register("RouteMapper", () => Navigation.RouteMapper, Frame);
        IsDeepLinked: boolean;
        CurrentSource: Uri;
        Source: Uri;
        UriMapper: Navigation.UriMapper;
        RouteMapper: Navigation.RouteMapper;

        private _NavService: Navigation.NavigationService = new Navigation.NavigationService();
        private _CurrentRoute: Fayde.Navigation.Route = undefined;

        //Navigated = new MulticastEvent();
        //Navigating = new MulticastEvent();
        //NavigationFailed = new MulticastEvent();
        //NavigationStopped = new MulticastEvent();
        //FragmentNavigation = new MulticastEvent();

        constructor () {
            super();
            this.Loaded.Subscribe(this._FrameLoaded, this);
        }

        Navigate (uri: Uri) {
            this._LoadContent(uri);
        }

        GoForward () {
            //TODO: Implement
        }

        GoBackward () {
            //TODO: Implement
        }

        StopLoading () {
            //TODO: Implement
        }

        private _FrameLoaded (sender, e: RoutedEventArgs) {
            if (this.IsDeepLinked) {
                this._NavService.LocationChanged.Subscribe(this._HandleDeepLink, this);
                this._HandleDeepLink();
            }
        }

        private _HandleDeepLink () {
            this._LoadContent(new Uri(this._NavService.Href + "#" + this._NavService.Hash));
        }

        private _LoadContent (source: Uri) {
            this.SetValueInternal(Frame.CurrentSourceProperty, source);
            this.StopLoading();

            var fragment = source.Fragment;
            TimelineProfile.Navigate(true, fragment);

            var targetUri = new Uri(fragment, UriKind.Relative);
            var target: string = null;
            if (this.RouteMapper) {
                this._CurrentRoute = this.RouteMapper.MapUri(targetUri);
                if (!this._CurrentRoute)
                    throw new InvalidOperationException("Route could not be mapped." + targetUri.toString());
                target = this._CurrentRoute.View.toString();
            }
            else if (this.UriMapper) {
                var mapped = this.UriMapper.MapUri(targetUri);
                if (!mapped)
                    throw new InvalidOperationException("Uri could not be mapped." + targetUri.toString());
                target = mapped.toString();
            }

            Page.GetAsync(target)
                .success(page => this._HandleSuccess(page))
                .error(error => this._HandleError(error));
        }

        private _HandleSuccess (page: Page) {
            this._SetPage(page);
            TimelineProfile.Navigate(false);
            TimelineProfile.IsNextLayoutPassProfiled = true;
        }

        private _HandleError (error: any) {
            this._SetPage(getErrorPage(error));
            TimelineProfile.Navigate(false);
        }

        private _SetPage(page: Page) {
            document.title = page.Title;
            this.Content = page;
            if (this._CurrentRoute)
                page.DataContext = this._CurrentRoute.DataContext;
            if (page.DataContext == null)
                page.DataContext = this.DataContext;
        }

        private SourcePropertyChanged (args: IDependencyPropertyChangedEventArgs) {
            //TODO: Ignore in design mode
            if (true)//if loaded and not updating source from nav service
                this.Navigate(args.NewValue);

            //TODO: Show default content uri in Content when in design mode
        }
    }
    Fayde.RegisterType(Frame, "Fayde.Controls", Fayde.XMLNS);
}