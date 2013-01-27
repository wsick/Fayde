/// <reference path="PropertyValueProvider.js"/>
/// CODE
/// <reference path="../FrameworkElement.js"/>
/// <reference path="../../Primitives/Size.js"/>

(function (namespace) {
    var FrameworkElementPropertyValueProvider = Nullstone.Create("FrameworkElementPropertyValueProvider", _PropertyValueProvider, 2);

    FrameworkElementPropertyValueProvider.Instance.Init = function (obj, propPrecedence) {
        this.Init$_PropertyValueProvider(obj, propPrecedence);
        this._ActualHeight = null;
        this._ActualWidth = null;
        this._Last = new Size(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
    };

    FrameworkElementPropertyValueProvider.Instance.GetPropertyValue = function (propd) {
        if (propd._ID !== Fayde.FrameworkElement.ActualHeightProperty._ID && propd._ID !== Fayde.FrameworkElement.ActualWidthProperty._ID)
            return undefined;

        var actual = this._Object._ComputeActualSize();
        if (!Size.Equals(this._Last, actual)) {
            this._Last = actual;
            this._ActualHeight = actual.Height;
            this._ActualWidth = actual.Width;
        }

        if (propd._ID === Fayde.FrameworkElement.ActualHeightProperty._ID) {
            return this._ActualHeight;
        } else {
            return this._ActualWidth;
        }
    };

    namespace.FrameworkElementPropertyValueProvider = Nullstone.FinishCreate(FrameworkElementPropertyValueProvider);
})(window);