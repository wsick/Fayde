/// <reference path="../Core/PropertyValueProviders/Enums.js"/>
/// <reference path="../Core/FrameworkFrameworkElementPropertyValueProvider.js"/>
/// CODE

//#region _TextBoxBaseDynamicPropertyValueProvider

function _TextBoxBaseDynamicPropertyValueProvider(obj, propPrecedence, foregroundPropd, backgroundPropd, baselineOffsetPropd) {
    FrameworkElementPropertyValueProvider.call(this, obj, propPrecedence, _ProviderFlags.RecomputesOnClear | _ProviderFlags.RecomputesOnLowerPriorityChange);
    this._ForegroundPropd = foregroundPropd;
    this._BackgroundPropd = backgroundPropd;
    this._BaselineOffsetPropd = baselineOffsetPropd;
    this._SelectionBackground = undefined;
    this._SelectionForeground = undefined;
    this._BaselineOffset = undefined;
}
_TextBoxBaseDynamicPropertyValueProvider.InheritFrom(FrameworkElementPropertyValueProvider);

_TextBoxBaseDynamicPropertyValueProvider.prototype.RecomputePropertyValue = function (propd, providerFlags, error) {
    if (propd == this._BackgroundPropd)
        this._SelectionBackground = undefined;
    else if (propd == this._ForegroundPropd)
        this._SelectionForeground = undefined;

    FrameworkElementPropertyValueProvider.prototype.RecomputePropertyValue.call(this, propd, providerFlags, error);
};
_TextBoxBaseDynamicPropertyValueProvider.prototype.GetPropertyValue = function (propd) {
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
    return FrameworkElementPropertyValueProvider.prototype.GetPropertyValue.call(this, propd);
};

_TextBoxBaseDynamicPropertyValueProvider.prototype._InitializeSelectionBrushes = function () {
    if (this._SelectionBackground == null)
        this._SelectionBackground = new SolidColorBrush(new Color(68, 68, 68));
    if (this._SelectionForeground == null)
        this._SelectionForeground = new SolidColorBrush(new Color(255, 255, 255));
};

//#endregion