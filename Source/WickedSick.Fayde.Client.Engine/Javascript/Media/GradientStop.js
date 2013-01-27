/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// <reference path="../Primitives/Color.js"/>
/// CODE

(function (namespace) {
    var GradientStop = Nullstone.Create("GradientStop", Fayde.DependencyObject);

    //#region Properties

    GradientStop.ColorProperty = DependencyProperty.Register("Color", function () { return Color; }, GradientStop, new Color());
    GradientStop.OffsetProperty = DependencyProperty.Register("Offset", function () { return Number; }, GradientStop, 0.0);

    Nullstone.AutoProperties(GradientStop, [
        GradientStop.ColorProperty,
        GradientStop.OffsetProperty
    ]);

    //#endregion

    GradientStop.Instance.toString = function () {
        return this.Color.toString() + " @ " + this.Offset.toString();
    };

    namespace.GradientStop = Nullstone.FinishCreate(GradientStop);
})(Nullstone.Namespace("Fayde.Media"));

(function (namespace) {
    var GradientStopCollection = Nullstone.Create("GradientStopCollection", Fayde.DependencyObjectCollection);
    GradientStopCollection.Instance.IsElementType = function (value) {
        return value instanceof namespace.GradientStop;
    };
    namespace.GradientStopCollection = Nullstone.FinishCreate(GradientStopCollection);
})(Nullstone.Namespace("Fayde.Media"));