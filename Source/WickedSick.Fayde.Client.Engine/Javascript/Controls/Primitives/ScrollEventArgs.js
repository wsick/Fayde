/// <reference path="../../Runtime/EventArgs.js"/>
/// CODE

(function (namespace) {
    var ScrollEventArgs = Nullstone.Create("ScrollEventArgs", EventArgs, 2);

    ScrollEventArgs.Instance.Init = function (scrollEventType, value) {
        this.ScrollEventType = scrollEventType;
        this.Value = value;
    };

    namespace.ScrollEventArgs = Nullstone.FinishCreate(ScrollEventArgs);
})(Nullstone.Namespace("Fayde.Controls.Primitives"));