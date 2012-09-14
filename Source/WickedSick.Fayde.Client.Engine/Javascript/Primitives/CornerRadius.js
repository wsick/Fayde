/// <reference path="../Runtime/Nullstone.js" />
/// CODE

//#region CornerRadius
var CornerRadius = Nullstone.Create("CornerRadius", undefined, 4);

CornerRadius.Instance.Init = function (topLeft, topRight, bottomRight, bottomLeft) {
    this.TopLeft = topLeft == null ? 0 : topLeft;
    this.TopRight = topRight == null ? 0 : topRight;
    this.BottomRight = bottomRight == null ? 0 : bottomRight;
    this.BottomLeft = bottomLeft == null ? 0 : bottomLeft;

};
CornerRadius.Instance.IsZero = function () {
    return this.TopLeft === 0
        && this.TopRight === 0
        && this.BottomRight === 0
        && this.BottomLeft === 0;
};

CornerRadius.Instance.toString = function () {
    return "(" + this.TopLeft + ", " + this.TopRight + ", " + this.BottomRight + ", " + this.BottomLeft + ")";
};

Nullstone.FinishCreate(CornerRadius);
//#endregion