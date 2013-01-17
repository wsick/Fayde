/// <reference path="KeyFrame.js"/>
/// <reference path="../../Primitives/KeyTime.js"/>
/// <reference path="../../Primitives/Point.js"/>
/// CODE

(function (namespace) {
    var PointKeyFrame = Nullstone.Create("PointKeyFrame", KeyFrame);

    //#region Properties

    PointKeyFrame.KeyTimeProperty = DependencyProperty.Register("KeyTime", function () { return KeyTime; }, PointKeyFrame);
    PointKeyFrame.ValueProperty = DependencyProperty.Register("Value", function () { return Point; }, PointKeyFrame);

    Nullstone.AutoProperties(PointKeyFrame, [
        PointKeyFrame.KeyTimeProperty,
        PointKeyFrame.ValueProperty
    ]);

    //#endregion

    namespace.PointKeyFrame = Nullstone.FinishCreate(PointKeyFrame);
})(window);