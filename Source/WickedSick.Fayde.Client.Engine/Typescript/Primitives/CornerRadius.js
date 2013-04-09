var CornerRadius = (function () {
    function CornerRadius(topLeft, topRight, bottomRight, bottomLeft) {
        this.TopLeft = topLeft == null ? 0 : topLeft;
        this.TopRight = topRight == null ? 0 : topRight;
        this.BottomRight = bottomRight == null ? 0 : bottomRight;
        this.BottomLeft = bottomLeft == null ? 0 : bottomLeft;
    }
    CornerRadius._TypeName = "CornerRadius";
    CornerRadius.prototype.IsZero = function () {
        return this.TopLeft === 0 && this.TopRight === 0 && this.BottomRight === 0 && this.BottomLeft === 0;
    };
    CornerRadius.prototype.Equals = function (other) {
        return this.TopLeft === other.TopLeft && this.TopRight === other.TopRight && this.BottomRight === other.BottomRight && this.BottomLeft === other.BottomLeft;
    };
    CornerRadius.prototype.toString = function () {
        return "(" + this.TopLeft + ", " + this.TopRight + ", " + this.BottomRight + ", " + this.BottomLeft + ")";
    };
    return CornerRadius;
})();
//@ sourceMappingURL=CornerRadius.js.map
