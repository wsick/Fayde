/// <reference path="../../Core/FrameworkElementPropertyValueProvider.js"/>

//#region _TextBlockDynamicPropertyValueProvider

function _TextBlockDynamicPropertyValueProvider(obj, propPrecedence) {
    FrameworkElementPropertyValueProvider.call(this, obj, propPrecedence);
    this._BaselineOffsetValue = null;
    this._TextValue = null;
}
_TextBlockDynamicPropertyValueProvider.InheritFrom(FrameworkElementPropertyValueProvider);

_TextBlockDynamicPropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    if (propd == TextBlock.BaselineOffsetProperty) {
        var layout = this._Object._Layout;
        if (layout == null)
            return 0;
        return layout.GetBaselineOffset();
    }
    return FrameworkElementPropertyValueProvider.prototype.GetPropertyValue.call(this, propd);
};

//#endregion