/// <reference path="../../Runtime/Nullstone.js"/>
/// CODE

(function (namespace) {
    var ScrollData = Nullstone.Create("ScrollData");

    ScrollData.Instance.Init = function () {
        this._ClearLayout();
    };

    ScrollData.Instance._ClearLayout = function () {
        this.CanHorizontallyScroll = false;
        this.CanVerticallyScroll = false;
        this.ScrollOwner = null;
        this.Offset = new Point();
        this.CachedOffset = new Point();
        this.Viewport = new size();
        this.Extent = new size();
        this.MaxDesiredSize = new size();
    };

    namespace.ScrollData = Nullstone.FinishCreate(ScrollData);
})(Nullstone.Namespace("Fayde.Controls.Primitives"));