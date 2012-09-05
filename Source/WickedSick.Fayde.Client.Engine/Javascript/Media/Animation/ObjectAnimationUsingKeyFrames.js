/// <reference path="AnimationUsingKeyFrames.js"/>
/// <reference path="ObjectKeyFrameCollection.js"/>
/// CODE

//#region ObjectAnimationUsingKeyFrames
var ObjectAnimationUsingKeyFrames = Nullstone.Create("ObjectAnimationUsingKeyFrames", AnimationUsingKeyFrames);

//#region Properties

ObjectAnimationUsingKeyFrames.KeyFramesProperty = DependencyProperty.RegisterFull("KeyFrames", function () { return ObjectKeyFrameCollection; }, ObjectAnimationUsingKeyFrames, undefined, { GetValue: function () { return new ObjectKeyFrameCollection(); } });

Nullstone.AutoProperties(ObjectAnimationUsingKeyFrames, [
    ObjectAnimationUsingKeyFrames.KeyFramesProperty
]);

//#endregion

//#region Annotations

ObjectAnimationUsingKeyFrames.Annotations = {
    ContentProperty: ObjectAnimationUsingKeyFrames.KeyFramesProperty
};

//#endregion

ObjectAnimationUsingKeyFrames.Instance.Resolve = function () {
    var keyFrames = this.KeyFrames;
    var count = keyFrames.GetCount();
    for (var i = 0; i < count; i++) {
        var frame = Nullstone.As(keyFrames.GetValueAt(i), ObjectKeyFrame);
        var value = frame.Value;
        if (value == null) {
            frame._SetValue(ObjectKeyFrame.ConvertedValueProperty, undefined);
        } else {
            var converted = value;
            //TODO: Convert - return false if error converting
            frame._SetValue(ObjectKeyFrame.ConvertedValueProperty, converted);
        }
    }

    return this.Resolve$AnimationUsingKeyFrames();
};

Nullstone.FinishCreate(ObjectAnimationUsingKeyFrames);
//#endregion