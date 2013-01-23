/// <reference path="AnimationUsingKeyFrames.js"/>
/// <reference path="ObjectKeyFrame.js"/>
/// CODE

(function (namespace) {
    var ObjectAnimationUsingKeyFrames = Nullstone.Create("ObjectAnimationUsingKeyFrames", namespace.AnimationUsingKeyFrames);

    //#region Properties

    ObjectAnimationUsingKeyFrames.KeyFramesProperty = DependencyProperty.RegisterFull("KeyFrames", function () { return namespace.ObjectKeyFrameCollection; }, ObjectAnimationUsingKeyFrames, undefined, undefined, { GetValue: function () { return new namespace.ObjectKeyFrameCollection(); } });

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
            var frame = Nullstone.As(keyFrames.GetValueAt(i), namespace.ObjectKeyFrame);
            var value = frame.Value;
            if (value == null) {
                frame._SetValue(namespace.ObjectKeyFrame.ConvertedValueProperty, undefined);
            } else {
                var converted = value;
                //TODO: Convert - return false if error converting
                frame._SetValue(namespace.ObjectKeyFrame.ConvertedValueProperty, converted);
            }
        }

        return this.Resolve$AnimationUsingKeyFrames();
    };

    namespace.ObjectAnimationUsingKeyFrames = Nullstone.FinishCreate(ObjectAnimationUsingKeyFrames);
})(Nullstone.Namespace("Fayde.Media.Animation"));
