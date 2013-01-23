/// <reference path="../../Runtime/Nullstone.js"/>
/// CODE

(function (namespace) {
    var IEasingFunction = Nullstone.Create("IEasingFunction");

    IEasingFunction.Instance.Ease = function (normalizedTime) {
        /// <param name="normalizedTime" type="Number"></param>
    };

    namespace.IEasingFunction = Nullstone.FinishCreate(IEasingFunction);
})(Nullstone.Namespace("Fayde.Media.Animation"));
