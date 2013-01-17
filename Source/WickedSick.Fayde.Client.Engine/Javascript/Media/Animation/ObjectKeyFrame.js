/// <reference path="KeyFrame.js"/>
/// <reference path="../../Primitives/KeyTime.js"/>
/// CODE

(function (namespace) {
    var ObjectKeyFrame = Nullstone.Create("ObjectKeyFrame", KeyFrame);

    //#region Properties

    ObjectKeyFrame.KeyTimeProperty = DependencyProperty.Register("KeyTime", function () { return KeyTime; }, ObjectKeyFrame, new KeyTime(), null, { GetValue: function () { NotImplemented("KeyTime Coercer"); } });
    ObjectKeyFrame.ValueProperty = DependencyProperty.Register("Value", function () { return Object; }, ObjectKeyFrame);
    ObjectKeyFrame.ConvertedValueProperty = DependencyProperty.Register("ConvertedValue", function () { return Object; }, ObjectKeyFrame);

    Nullstone.AutoProperties(ObjectKeyFrame, [
        ObjectKeyFrame.KeyTimeProperty,
        ObjectKeyFrame.ValueProperty,
        ObjectKeyFrame.ConvertedValueProperty
    ]);

    //#endregion

    namespace.ObjectKeyFrame = Nullstone.FinishCreate(ObjectKeyFrame);
})(window);