/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="../../Core/PropertyValueProviders/Enums.js"/>
/// <reference path="../../Core/FrameworkElementPropertyValueProvider.js"/>
/// CODE

//#region _TextBoxBaseDynamicPropertyValueProvider
var _TextBoxBaseDynamicPropertyValueProvider = Nullstone.Create("_TextBoxBaseDynamicPropertyValueProvider", FrameworkElementPropertyValueProvider, 5);

_TextBoxBaseDynamicPropertyValueProvider.Instance.Init = function (obj, propPrecedence, foregroundPropd, backgroundPropd, baselineOffsetPropd) {
    this.Init$super(obj, propPrecedence, _ProviderFlags.RecomputesOnClear | _ProviderFlags.RecomputesOnLowerPriorityChange);
    this._ForegroundPropd = foregroundPropd;
    this._BackgroundPropd = backgroundPropd;
    this._BaselineOffsetPropd = baselineOffsetPropd;
    this._SelectionBackground = undefined;
    this._SelectionForeground = undefined;
    this._BaselineOffset = undefined;
};

_TextBoxBaseDynamicPropertyValueProvider.Instance.RecomputePropertyValue = function (propd, providerFlags, error) {
    if (propd == this._BackgroundPropd)
        this._SelectionBackground = undefined;
    else if (propd == this._ForegroundPropd)
        this._SelectionForeground = undefined;
    
    this.RecomputePropertyValue$super(propd, providerFlags, error);
};
_TextBoxBaseDynamicPropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    var v;
    if (propd == this._BackgroundPropd) {
        v = this._Object.GetValue(propd, this._PropertyPrecedence + 1);
        if (!v)
            v = this._SelectionBackground;
    } else if (propd == this._ForegroundPropd) {
        v = this._Object.GetValue(propd, this._PropertyPrecedence + 1);
        if (!v)
            v = this._SelectionForeground;
    } else if (propd == this._BaselineOffsetPropd) {
        var _TextBoxView = this._Object._View;
        this._BaselineOffset = _TextBoxView == null ? 0 : _TextBoxView.GetBaselineOffset();
        v = this._BaselineOffset;
    }
    if (v != undefined)
        return v;
    return this.GetPropertyValue$super(propd);
};

_TextBoxBaseDynamicPropertyValueProvider.Instance._InitializeSelectionBrushes = function () {
    if (this._SelectionBackground == null)
        this._SelectionBackground = new SolidColorBrush(new Color(68, 68, 68));
    if (this._SelectionForeground == null)
        this._SelectionForeground = new SolidColorBrush(new Color(255, 255, 255));
};

Nullstone.FinishCreate(_TextBoxBaseDynamicPropertyValueProvider);
//#endregion