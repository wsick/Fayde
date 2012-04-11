/// <reference path="../../Runtime/Nullstone.js"/>
/// CODE

//#region ScrollData
var ScrollData = Nullstone.Create("ScrollData");

ScrollData.Instance.Init = function () {
    this._ClearLayout();
};

ScrollData.Instance._ClearLayout = function () {
    this.CanHorizontallyScroll = false;
    this.CanVerticallyScroll = false;
    this.ScrollOwner = null;
    this.Offset = new Point();
    this.ComputedOffset = new Point();
    this.Viewport = new Size();
    this.Extent = new Size();
    this.MaxDesiredSize = new Size();
};

Nullstone.FinishCreate(ScrollData);
//#endregion