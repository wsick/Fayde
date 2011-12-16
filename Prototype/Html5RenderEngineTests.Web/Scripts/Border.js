/// <reference path="/Scripts/Framework/Primitives.js" />
/// <reference path="/Scripts/Framework/DependencyObject.js" />
/// <reference path="/Scripts/Framework/FrameworkElement.js" />

Border.prototype = new FrameworkElement();
Border.prototype.constructor = Border;
function Border() {
    FrameworkElement.call(this);
    this.BorderBrush = "#000000";
    this.BorderThickness = 0;
    this.Background = "#FFFFFF";
    this.CornerRadius = new CornerRadius();
    this.Left = 0;
    this.Top = 0;
    this.Child = null;
}
Border.prototype.ComputeActuals = function () {
    var actual = new Rect();
    //NOT IMPLEMENTED
    actual.X1 = this.Left;
    actual.X2 = this.Left + this.Width;
    actual.Y1 = this.Top;
    actual.Y2 = this.Top + this.Height;
    return actual;
};
Border.prototype.IsLayoutContainer = function () { return false; };
Border.prototype.Render = function (ctx) {
    var actualRect = this.ComputeActuals();
    ctx.beginPath();
    ctx.moveTo(actualRect.X1 + this.CornerRadius.TopLeft, actualRect.Y1);
    //top edge
    ctx.lineTo(actualRect.X2 - this.CornerRadius.TopRight, actualRect.Y1);
    //top right arc
    if (this.CornerRadius.TopRight && this.CornerRadius.TopRight > 0)
        ctx.arcTo(actualRect.X2, actualRect.Y1, actualRect.X2, actualRect.Y1 + this.CornerRadius.TopRight, this.CornerRadius.TopRight);
    //right edge
    ctx.lineTo(actualRect.X2, actualRect.Y2 - this.CornerRadius.BottomRight);
    //bottom right arc
    if (this.CornerRadius.BottomRight && this.CornerRadius.BottomRight > 0)
        ctx.arcTo(actualRect.X2, actualRect.Y2, actualRect.X2 - this.CornerRadius.BottomRight, actualRect.Y2, this.CornerRadius.BottomRight);
    //bottom edge
    ctx.lineTo(actualRect.X1 + this.CornerRadius.BottomLeft, actualRect.Y2);
    //bottom left arc
    if (this.CornerRadius.BottomLeft && this.CornerRadius.BottomLeft > 0)
        ctx.arcTo(actualRect.X1, actualRect.Y2, actualRect.X1, actualRect.Y2 - this.CornerRadius.BottomLeft, this.CornerRadius.BottomLeft);
    //left edge
    ctx.lineTo(actualRect.X1, actualRect.Y1 + this.CornerRadius.TopLeft);
    //top left arc
    if (this.CornerRadius.TopLeft && this.CornerRadius.TopLeft > 0)
        ctx.arcTo(actualRect.X1, actualRect.Y1, actualRect.X1 + this.CornerRadius.TopLeft, actualRect.Y1, this.CornerRadius.TopLeft);
    if (this.BorderThickness) {
        ctx.lineWidth = this.BorderThickness;
        ctx.stroke();
    }
    if (this.Background) {
        ctx.fillStyle = this.Background;
        ctx.fill();
    }
    ctx.closePath();

    if (this.Child) {
        this.Child.Render(ctx);
    }
};