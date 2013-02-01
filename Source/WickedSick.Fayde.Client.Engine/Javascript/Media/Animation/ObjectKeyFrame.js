/// <reference path="KeyFrame.js"/>
/// <reference path="KeyFrameCollection.js"/>
/// <reference path="../../Primitives/KeyTime.js"/>
/// CODE

(function (namespace) {
    var ObjectKeyFrame = Nullstone.Create("ObjectKeyFrame", namespace.KeyFrame);

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
})(Nullstone.Namespace("Fayde.Media.Animation"));

(function (namespace) {
    var ObjectKeyFrameCollection = Nullstone.Create("ObjectKeyFrameCollection", namespace.KeyFrameCollection);
    ObjectKeyFrameCollection.Instance.IsElementType = function (value) {
        return value instanceof namespace.ObjectKeyFrame;
    };
    namespace.ObjectKeyFrameCollection = Nullstone.FinishCreate(ObjectKeyFrameCollection);
})(Nullstone.Namespace("Fayde.Media.Animation"));

(function (namespace) {
    var DiscreteObjectKeyFrame = Nullstone.Create("DiscreteObjectKeyFrame", namespace.ObjectKeyFrame);

    DiscreteObjectKeyFrame.Instance.InterpolateValue = function (baseValue, keyFrameProgress) {
        if (keyFrameProgress >= 1.0)
            return this.ConvertedValue;
        return baseValue;
    };

    namespace.DiscreteObjectKeyFrame = Nullstone.FinishCreate(DiscreteObjectKeyFrame);
})(Nullstone.Namespace("Fayde.Media.Animation"));
