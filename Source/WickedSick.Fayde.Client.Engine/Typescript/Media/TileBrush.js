var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Brush.ts" />
    /// <reference path="../Runtime/Enum.ts" />
    /// <reference path="Enums.ts" />
    /// CODE
    /// <reference path="../Primitives/rect.ts" />
    (function (Media) {
        function computeImageMatrix(width, height, sw, sh, stretch, alignX, alignY) {
            var sx = width / sw;
            var sy = height / sh;
            if(width === 0) {
                sx = 1.0;
            }
            if(height === 0) {
                sy = 1.0;
            }
            if(stretch === Media.Stretch.Fill) {
                return mat3.createScale(sx, sy);
            }
            var scale = 1.0;
            var dx = 0.0;
            var dy = 0.0;
            switch(stretch) {
                case Media.Stretch.Uniform:
                    scale = sx < sy ? sx : sy;
                    break;
                case Media.Stretch.UniformToFill:
                    scale = sx < sy ? sy : sx;
                    break;
                case Media.Stretch.None:
                    break;
            }
            switch(alignX) {
                case Media.AlignmentX.Left:
                    dx = 0.0;
                    break;
                case Media.AlignmentX.Center:
                    dx = (width - (scale * sw)) / 2;
                    break;
                case Media.AlignmentX.Right:
                default:
                    dx = width - (scale * sw);
                    break;
            }
            switch(alignY) {
                case Media.AlignmentY.Top:
                    dy = 0.0;
                    break;
                case Media.AlignmentY.Center:
                    dy = (height - (scale * sh)) / 2;
                    break;
                case Media.AlignmentY.Bottom:
                default:
                    dy = height - (scale * sh);
                    break;
            }
            var m = mat3.createScale(scale, scale);
            mat3.translate(m, dx, dy);
            return m;
        }
        var TileBrush = (function (_super) {
            __extends(TileBrush, _super);
            function TileBrush() {
                _super.apply(this, arguments);

            }
            TileBrush.AlignmentXProperty = DependencyProperty.RegisterCore("AlignmentX", function () {
                return new Enum(Media.AlignmentX);
            }, TileBrush, Media.AlignmentX.Center, function (d, args) {
                return (d).InvalidateBrush();
            });
            TileBrush.AlignmentYProperty = DependencyProperty.RegisterCore("AlignmentY", function () {
                return new Enum(Media.AlignmentY);
            }, TileBrush, Media.AlignmentY.Center, function (d, args) {
                return (d).InvalidateBrush();
            });
            TileBrush.StretchProperty = DependencyProperty.RegisterCore("Stretch", function () {
                return new Enum(Media.Stretch);
            }, TileBrush, Media.Stretch.Fill, function (d, args) {
                return (d).InvalidateBrush();
            });
            TileBrush.prototype.CreateBrush = function (ctx, bounds) {
                var imgExtents = this.GetTileExtents();
                var tmpCanvas = document.createElement("canvas");
                tmpCanvas.width = bounds.Width;
                tmpCanvas.height = bounds.Height;
                var tmpCtx = tmpCanvas.getContext("2d");
                var mat = computeImageMatrix(bounds.Width, bounds.Height, imgExtents.Width, imgExtents.Height, this.Stretch, this.AlignmentX, this.AlignmentY);
                tmpCtx.setTransform(mat[0], mat[1], mat[3], mat[4], mat[2], mat[5]);
                this.DrawTile(tmpCtx, bounds);
                return ctx.createPattern(tmpCanvas, "no-repeat");
            };
            TileBrush.prototype.GetTileExtents = function () {
                return undefined;
            };
            TileBrush.prototype.DrawTile = function (canvasCtx, bounds) {
            };
            return TileBrush;
        })(Media.Brush);
        Media.TileBrush = TileBrush;        
        Nullstone.RegisterType(TileBrush, "TileBrush");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=TileBrush.js.map
