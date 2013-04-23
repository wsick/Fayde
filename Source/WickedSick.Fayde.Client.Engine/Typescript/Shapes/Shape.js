var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/FrameworkElement.ts" />
    /// CODE
    /// <reference path="../Media/Brush.ts" />
    /// <reference path="../Media/Enums.ts" />
    /// <reference path="Enums.ts" />
    /// <reference path="DoubleCollection.ts" />
    (function (Shapes) {
        var Shape = (function (_super) {
            __extends(Shape, _super);
            function Shape() {
                _super.apply(this, arguments);

                this._ShapeFlags = 0;
                this._StretchXform = mat3.identity();
                this._NaturalBounds = new rect();
            }
            Shape.FillProperty = DependencyProperty.Register("Fill", function () {
                return Fayde.Media.Brush;
            }, Shape);
            Shape.StretchProperty = DependencyProperty.Register("Stretch", function () {
                return new Enum(Fayde.Media.Stretch);
            }, Shape, Fayde.Media.Stretch.None);
            Shape.StrokeProperty = DependencyProperty.Register("Stroke", function () {
                return Fayde.Media.Brush;
            }, Shape);
            Shape.StrokeThicknessProperty = DependencyProperty.Register("StrokeThickness", function () {
                return Number;
            }, Shape, 1.0);
            Shape.StrokeDashArrayProperty = DependencyProperty.Register("StrokeDashArray", function () {
                return Shapes.DoubleCollection;
            }, Shape);
            Shape.StrokeDashCapProperty = DependencyProperty.Register("StrokeDashCap", function () {
                return new Enum(Shapes.PenLineCap);
            }, Shape, Shapes.PenLineCap.Flat);
            Shape.StrokeDashOffsetProperty = DependencyProperty.Register("StrokeDashOffset", function () {
                return Number;
            }, Shape, 0.0);
            Shape.StrokeEndLineCapProperty = DependencyProperty.Register("StrokeEndLineCap", function () {
                return new Enum(Shapes.PenLineCap);
            }, Shape, Shapes.PenLineCap.Flat);
            Shape.StrokeLineJoinProperty = DependencyProperty.Register("StrokeLineJoin", function () {
                return new Enum(Shapes.PenLineJoin);
            }, Shape, Shapes.PenLineJoin.Miter);
            Shape.StrokeMiterLimitProperty = DependencyProperty.Register("StrokeMiterLimit", function () {
                return Number;
            }, Shape, 10.0);
            Shape.StrokeStartLineCapProperty = DependencyProperty.Register("StrokeStartLineCap", function () {
                return new Enum(Shapes.PenLineCap);
            }, Shape, Shapes.PenLineCap.Flat);
            return Shape;
        })(Fayde.FrameworkElement);
        Shapes.Shape = Shape;        
        Nullstone.RegisterType(Shape, "Shape");
    })(Fayde.Shapes || (Fayde.Shapes = {}));
    var Shapes = Fayde.Shapes;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Shape.js.map
