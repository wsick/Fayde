/// <reference path="ContentControl.ts" />
/// <reference path="Page.ts" />

module Fayde.Controls {
    function createErrorDoc (error: any): nullstone.markup.xaml.XamlMarkup {
        var safe = (error || '').toString()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
        var xaml = '<Page xmlns="' + Fayde.XMLNS + '" xmlns:x="' + Fayde.XMLNSX + '" Title="Error">';
        xaml += '<TextBlock Text="' + safe + '" />';
        xaml += '</Page>';
        return Markup.CreateXaml(xaml);
    }

    function getErrorPage (app: Application, error: string): Page {
        return Markup.Load<Page>(app, createErrorDoc(error));
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

        private _NavService = new Navigation.NavigationService();

        //Navigated = new MulticastEvent();
        //Navigating = new MulticastEvent();
        //NavigationFailed = new MulticastEvent();
        //NavigationStopped = new MulticastEvent();
        //FragmentNavigation = new MulticastEvent();

        constructor () {
            super();
            this.Loaded.on(this._FrameLoaded, this);
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
                this._NavService.LocationChanged.on(this._HandleDeepLink, this);
                this._HandleDeepLink();
            }
        }

        private _HandleDeepLink () {
            this._LoadContent(this._NavService.CurrentUri);
        }

        private _LoadContent (source: Uri) {
            this.SetValueInternal(Frame.CurrentSourceProperty, source);
            this.StopLoading();

            var fragment = source.fragment;
            if (fragment[0] === "#")
                fragment = fragment.substr(1);
            TimelineProfile.Navigate(true, fragment);

            var targetUri = new Uri(fragment, nullstone.UriKind.Relative);
            if (this.UriMapper)
                targetUri = this.UriMapper.MapUri(targetUri);
            var target = targetUri.toString();
            if (!target)
                throw new InvalidOperationException("Cannot resolve empty url.");

            Page.GetAsync(this, target)
                .then(page => this._HandleSuccess(page),
                    err => this._HandleError(err));
        }

        private _HandleSuccess (page: Page) {
            this._SetPage(page);
            TimelineProfile.Navigate(false);
            TimelineProfile.IsNextLayoutPassProfiled = true;
        }

        private _HandleError (error: any) {
            this._SetPage(getErrorPage(this.App, error));
            TimelineProfile.Navigate(false);
        }

        private _SetPage (page: Page) {
            document.title = page.Title;
            this.Content = page;
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
    Fayde.CoreLibrary.add(Frame);
}