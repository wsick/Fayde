/// <reference path="../../Runtime/Nullstone.js" />
/// <reference path="../../Core/FrameworkElementPropertyValueProvider.js"/>

//#region _TextBlockDynamicPropertyValueProvider

function _TextBlockDynamicPropertyValueProvider(obj, propPrecedence) {
    if (!Nullstone.IsReady)
        return;
    this.$super(obj, propPrecedence);
    this._BaselineOffsetValue = null;
    this._TextValue = null;
}
Nullstone.Extend(_TextBlockDynamicPropertyValueProvider, "_TextBlockDynamicPropertyValueProvider", FrameworkElementPropertyValueProvider);

_TextBlockDynamicPropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    if (propd == TextBlock.BaselineOffsetProperty) {
        var layout = this._Object._Layout;
        if (layout == null)
            return 0;
        return layout.GetBaselineOffset();
    }
    return this.GetPropertyValue$super(propd);
};

//#endregion
