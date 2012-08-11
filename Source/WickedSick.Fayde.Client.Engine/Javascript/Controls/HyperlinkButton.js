/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Primitives/ButtonBase.js"/>
/// CODE

//#region HyperlinkButton
var HyperlinkButton = Nullstone.Create("HyperlinkButton", ButtonBase);

//#region Dependency Properties

HyperlinkButton.NavigateUriProperty = DependencyProperty.Register("NavigateUri", function () { return Uri; }, HyperlinkButton);
HyperlinkButton.TargetNameProperty = DependencyProperty.Register("TargetName", function () { return String; }, HyperlinkButton);

Nullstone.AutoProperties(HyperlinkButton, [
    HyperlinkButton.NavigateUriProperty,
    HyperlinkButton.TargetNameProperty
]);

//#endregion

HyperlinkButton.Instance.Init = function () {
    this.Init$ButtonBase();
    this.DefaultStyleKey = this.constructor;
};

HyperlinkButton.Instance.OnApplyTemplate = function () {
    this.OnApplyTemplate$ButtonBase();
    this.UpdateVisualState(false);
};

HyperlinkButton.Instance.OnClick = function () {
    this.OnClick$ButtonBase();
    if (this.NavigateUri != null) {
        this._Navigate();
    }
};

HyperlinkButton.Instance._GetAbsoluteUri = function () {
    /// <returns type="Uri" />
    var destination = this.NavigateUri;
    if (!destination.IsAbsoluteUri) {
        var original = destination.OriginalString;
        if (original && original.charAt(0) !== '/')
            throw new NotSupportedException();
        destination = new Uri(App.Instance.GetHost().GetSource(), destination);
    }
    return destination;
};
HyperlinkButton.Instance._ChangeVisualState = function (useTransitions) {
    if (!this.IsEnabled) {
        this._GoToState(useTransitions, "Disabled");
    } else if (this.IsPressed) {
        this._GoToState(useTransitions, "Pressed");
    } else if (this.IsMouseOver) {
        this._GoToState(useTransitions, "MouseOver");
    } else {
        this._GoToState(useTransitions, "Normal");
    }

    if (this.IsFocused && this.IsEnabled) {
        this._GoToState(useTransitions, "Focused");
    } else {
        this._GoToState(useTransitions, "Unfocused");
    }
};
HyperlinkButton.Instance._Navigate = function () {
    window.location.href = this.NavigateUri.toString();
    //NotImplemented("HyperlinkButton._Navigate(this.NavigateUri, this.TargetName)");
};

Nullstone.FinishCreate(HyperlinkButton);
//#endregion