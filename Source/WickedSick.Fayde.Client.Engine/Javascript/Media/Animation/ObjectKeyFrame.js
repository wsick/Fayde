/// <reference path="KeyFrame.js"/>
/// <reference path="../../Primitives/KeyTime.js"/>
/// CODE

//#region ObjectKeyFrame
var ObjectKeyFrame = Nullstone.Create("ObjectKeyFrame", KeyFrame);

//#region Dependency Properties

ObjectKeyFrame.KeyTimeProperty = DependencyProperty.Register("KeyTime", function () { return KeyTime; }, ObjectKeyFrame, KeyTime.CreateUniform(), null, { GetValue: function () { NotImplemented("KeyTime Coercer"); } });
ObjectKeyFrame.Instance.GetKeyTime = function () {
    ///<returns type="KeyTime"></returns>
    return this.GetValue(ObjectKeyFrame.KeyTimeProperty);
};
ObjectKeyFrame.Instance.SetKeyTime = function (value) {
    ///<param name="value" type="KeyTime"></param>
    this.SetValue(ObjectKeyFrame.KeyTimeProperty, value);
};

ObjectKeyFrame.ValueProperty = DependencyProperty.Register("Value", function () { return Object; }, ObjectKeyFrame);
ObjectKeyFrame.Instance.GetValue = function () {
    ///<returns type="Object"></returns>
    return this.GetValue(ObjectKeyFrame.ValueProperty);
};
ObjectKeyFrame.Instance.SetValue = function (value) {
    ///<param name="value" type="Object"></param>
    this.SetValue(ObjectKeyFrame.ValueProperty, value);
};

ObjectKeyFrame.ConvertedValueProperty = DependencyProperty.Register("ConvertedValue", function () { return Object; }, ObjectKeyFrame);
ObjectKeyFrame.Instance.GetConvertedValue = function () {
    ///<returns type="Object"></returns>
    return this.GetValue(ObjectKeyFrame.ConvertedValueProperty);
};
ObjectKeyFrame.Instance.SetConvertedValue = function (value) {
    ///<param name="value" type="Object"></param>
    this.SetValue(ObjectKeyFrame.ConvertedValueProperty, value);
};

//#endregion

Nullstone.FinishCreate(ObjectKeyFrame);
//#endregion