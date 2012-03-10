/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region CornerRadius

function CornerRadius(topLeft, topRight, bottomRight, bottomLeft) {
    if (!Nullstone.IsReady)
        return;
    this.TopLeft = topLeft == null ? 0 : topLeft;
    this.TopRight = topRight == null ? 0 : topRight;
    this.BottomRight = bottomRight == null ? 0 : bottomRight;
    this.BottomLeft = bottomLeft == null ? 0 : bottomLeft;
}
Nullstone.Create(CornerRadius, "CornerRadius");

CornerRadius.prototype.IsZero = function () {
    return this.TopLeft === 0
        && this.TopRight === 0
        && this.BottomRight === 0
        && this.BottomLeft === 0;
};

//#endregion