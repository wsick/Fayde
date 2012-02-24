/// <reference path="KeyFrame.js"/>
/// <reference path="../../Primitives/KeyTime.js"/>
/// CODE

//#region ObjectKeyFrame

function ObjectKeyFrame() {
    KeyFrame.call(this);
}
ObjectKeyFrame.InheritFrom(KeyFrame);

//#region DEPENDENCY PROPERTIES

ObjectKeyFrame.KeyTimeProperty = DependencyProperty.RegisterFull("KeyTime", function () { return KeyTime; }, ObjectKeyFrame, KeyTime.CreateUniform(), null, { GetValue: function () { NotImplemented("KeyTime Coercer"); } });
ObjectKeyFrame.prototype.GetKeyTime = function () {
    ///<returns type="KeyTime"></returns>
    return this.GetValue(ObjectKeyFrame.KeyTimeProperty);
};
ObjectKeyFrame.prototype.SetKeyTime = function (value) {
    ///<param name="value" type="KeyTime"></param>
    this.SetValue(ObjectKeyFrame.KeyTimeProperty, value);
};

ObjectKeyFrame.ValueProperty = DependencyProperty.Register("Value", function () { return Object; }, ObjectKeyFrame);
ObjectKeyFrame.prototype.GetValue_Prop = function () {
    return this.GetValue(ObjectKeyFrame.ValueProperty);
};
ObjectKeyFrame.prototype.SetValue_Prop = function (value) {
    this.SetValue(ObjectKeyFrame.ValueProperty, value);
};

ObjectKeyFrame.ConvertedValueProperty = DependencyProperty.Register("ConvertedValue", function () { return Object; }, ObjectKeyFrame);
ObjectKeyFrame.prototype.GetConvertedValue = function () {
    ///<returns type="Object"></returns>
    return this.GetValue(ObjectKeyFrame.ConvertedValueProperty);
};
ObjectKeyFrame.prototype.SetConvertedValue = function (value) {
    ///<param name="value" type="Object"></param>
    this.SetValue(ObjectKeyFrame.ConvertedValueProperty, value);
};

//#endregion

//#endregion