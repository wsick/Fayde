var Fayde;
(function (Fayde) {
    (function (Shapes) {
        (function (PathEntryType) {
            PathEntryType._map = [];
            PathEntryType.Move = 0;
            PathEntryType.Line = 1;
            PathEntryType.Rect = 2;
            PathEntryType.Quadratic = 3;
            PathEntryType.Bezier = 4;
            PathEntryType.EllipticalArc = 5;
            PathEntryType.Arc = 6;
            PathEntryType.ArcTo = 7;
            PathEntryType.Close = 8;
        })(Shapes.PathEntryType || (Shapes.PathEntryType = {}));
        var PathEntryType = Shapes.PathEntryType;
        (function (ShapeFlags) {
            ShapeFlags._map = [];
            ShapeFlags.Empty = 1;
            ShapeFlags.Normal = 2;
            ShapeFlags.Degenerate = 4;
            ShapeFlags.Radii = 8;
        })(Shapes.ShapeFlags || (Shapes.ShapeFlags = {}));
        var ShapeFlags = Shapes.ShapeFlags;
        (function (PenLineCap) {
            PenLineCap._map = [];
            PenLineCap.Flat = 0;
            PenLineCap.Square = 1;
            PenLineCap.Round = 2;
            PenLineCap.Triangle = 3;
        })(Shapes.PenLineCap || (Shapes.PenLineCap = {}));
        var PenLineCap = Shapes.PenLineCap;
        (function (PenLineJoin) {
            PenLineJoin._map = [];
            PenLineJoin.Miter = 0;
            PenLineJoin.Bevel = 1;
            PenLineJoin.Round = 2;
        })(Shapes.PenLineJoin || (Shapes.PenLineJoin = {}));
        var PenLineJoin = Shapes.PenLineJoin;
        (function (FillRule) {
            FillRule._map = [];
            FillRule.EvenOdd = 0;
            FillRule.NonZero = 1;
        })(Shapes.FillRule || (Shapes.FillRule = {}));
        var FillRule = Shapes.FillRule;
        (function (SweepDirection) {
            SweepDirection._map = [];
            SweepDirection.Counterclockwise = 0;
            SweepDirection.Clockwise = 1;
        })(Shapes.SweepDirection || (Shapes.SweepDirection = {}));
        var SweepDirection = Shapes.SweepDirection;
    })(Fayde.Shapes || (Fayde.Shapes = {}));
    var Shapes = Fayde.Shapes;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Enums.js.map
