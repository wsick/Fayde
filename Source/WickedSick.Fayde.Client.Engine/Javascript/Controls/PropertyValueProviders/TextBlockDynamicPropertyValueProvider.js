/// <reference path="../../Core/PropertyValueProviders/FrameworkElementPropertyValueProvider.js"/>
/// CODE

//#region _TextBlockDynamicPropertyValueProvider
var _TextBlockDynamicPropertyValueProvider = Nullstone.Create("_TextBlockDynamicPropertyValueProvider", FrameworkElementPropertyValueProvider, 2);

_TextBlockDynamicPropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
    this.Init$FrameworkElementPropertyValueProvider(obj, propPrecedence);
    this._BaselineOffsetValue = null;
    this._TextValue = null;
};
_TextBlockDynamicPropertyValueProvider.Instance.GetPropertyValue = function (propd) {
    //TODO: Implement TextBlock.BaselineOffsetProperty
    /*
    if (propd._ID === TextBlock.BaselineOffsetProperty._ID) {
        var layout = this._Object._Layout;
        this._BaselineOffsetValue = (!layout) ? 0 : layout.GetBaselineOffset();
        return this._BaselineOffsetValue;
    }
    */
    return this.GetPropertyValue$FrameworkElementPropertyValueProvider(propd);
};

Nullstone.FinishCreate(_TextBlockDynamicPropertyValueProvider);
//#endregion