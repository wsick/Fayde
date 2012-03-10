/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="PropertyValueProviders/PropertyValueProvider.js"/>
/// <reference path="../Primitives/Size.js"/>
/// CODE
/// <reference path="FrameworkElement.js"/>

//#region FrameworkElementPropertyValueProvider

function FrameworkElementPropertyValueProvider(obj, propPrecedence) {
    if (!Nullstone.IsReady)
        return;
    this.$super(obj, propPrecedence, 0);

    this._ActualHeight = null;
    this._ActualWidth = null;
    this._Last = new Size(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
}
Nullstone.Extend(FrameworkElementPropertyValueProvider, "FrameworkElementPropertyValueProvider", _PropertyValueProvider);

FrameworkElementPropertyValueProvider.prototype.GetPropertyValue = function (propd) {
    if (propd !== FrameworkElement.ActualHeightProperty && propd !== FrameworkElement.ActualWidthProperty)
        return undefined;

    var actual = this._Object._ComputeActualSize();
    if (!this._Last.Equals(actual)) {
        this._Last = actual;
        this._ActualHeight = actual.Height;
        this._ActualWidth = actual.Width;
    }

    if (propd === FrameworkElement.ActualHeightProperty) {
        return this._ActualHeight;
    } else {
        return this._ActualWidth;
    }
};

//#endregion
