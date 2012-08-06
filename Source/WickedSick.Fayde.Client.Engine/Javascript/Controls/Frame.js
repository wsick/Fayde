/// <reference path="ContentControl.js"/>
/// CODE
/// <reference path="../Primitives/Uri.js"/>
/// <reference path="../Navigation/UriMapper.js"/>

//#region Frame
var Frame = Nullstone.Create("Frame", ContentControl);

//#region Dependency Properties

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
};
Frame.Instance.Navigate = function (source) {
};

Frame.Instance.SourcePropertyChanged = function (args) {
    //TODO: Ignore in design mode
    if (true)//if loaded and not updating source from nav service
        d.Navigate(args.NewValue);

    //TODO: Show default content uri in Content when in design mode
};

Frame.Instance._FrameLoaded = function (sender, e) {
    
    
};

Nullstone.FinishCreate(Frame);
//#endregion