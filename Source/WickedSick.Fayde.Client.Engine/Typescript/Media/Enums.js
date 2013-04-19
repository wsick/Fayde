var Fayde;
(function (Fayde) {
    (function (Media) {
        (function (BrushMappingMode) {
            BrushMappingMode._map = [];
            BrushMappingMode.Absolute = 0;
            BrushMappingMode.RelativeToBoundingBox = 1;
        })(Media.BrushMappingMode || (Media.BrushMappingMode = {}));
        var BrushMappingMode = Media.BrushMappingMode;
        (function (GradientSpreadMethod) {
            GradientSpreadMethod._map = [];
            GradientSpreadMethod.Pad = 0;
            GradientSpreadMethod.Reflect = 1;
            GradientSpreadMethod.Repeat = 2;
        })(Media.GradientSpreadMethod || (Media.GradientSpreadMethod = {}));
        var GradientSpreadMethod = Media.GradientSpreadMethod;
        (function (Stretch) {
            Stretch._map = [];
            Stretch.None = 0;
            Stretch.Fill = 1;
            Stretch.Uniform = 2;
            Stretch.UniformToFill = 3;
        })(Media.Stretch || (Media.Stretch = {}));
        var Stretch = Media.Stretch;
        (function (AlignmentX) {
            AlignmentX._map = [];
            AlignmentX.Left = 0;
            AlignmentX.Center = 1;
            AlignmentX.Right = 2;
        })(Media.AlignmentX || (Media.AlignmentX = {}));
        var AlignmentX = Media.AlignmentX;
        (function (AlignmentY) {
            AlignmentY._map = [];
            AlignmentY.Top = 0;
            AlignmentY.Center = 1;
            AlignmentY.Bottom = 2;
        })(Media.AlignmentY || (Media.AlignmentY = {}));
        var AlignmentY = Media.AlignmentY;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Enums.js.map
