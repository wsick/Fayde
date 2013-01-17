/// <reference path="KeyFrame.js"/>
/// <reference path="../../Primitives/KeyTime.js"/>
/// <reference path="../../Primitives/Color.js"/>
/// CODE

(function (namespace) {
    var ColorKeyFrame = Nullstone.Create("ColorKeyFrame", KeyFrame);

    //#region Properties

    ColorKeyFrame.KeyTimeProperty = DependencyProperty.Register("KeyTime", function () { return KeyTime; }, ColorKeyFrame);
    ColorKeyFrame.ValueProperty = DependencyProperty.Register("Value", function () { return Color; }, ColorKeyFrame);

    Nullstone.AutoProperties(ColorKeyFrame, [
        ColorKeyFrame.KeyTimeProperty,
        ColorKeyFrame.ValueProperty
    ]);

    //#endregion

    namespace.ColorKeyFrame = Nullstone.FinishCreate(ColorKeyFrame);
})(window);