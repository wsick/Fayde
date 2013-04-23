var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/DependencyObject.ts" />
    /// <reference path="../Core/XamlObjectCollection.ts" />
    /// CODE
    /// <reference path="../Primitives/Point.ts" />
    /// <reference path="../Shapes/RawPath.ts" />
    /// <reference path="PathSegment.ts" />
    (function (Media) {
        var PathFigure = (function (_super) {
            __extends(PathFigure, _super);
            function PathFigure() {
                _super.apply(this, arguments);

                this._Path = [];
            }
            PathFigure.Annotations = {
                ContentProperty: "Segments"
            };
            PathFigure.IsClosedProperty = DependencyProperty.RegisterCore("IsClosed", function () {
                return Boolean;
            }, PathFigure, false);
            PathFigure.StartPointProperty = DependencyProperty.RegisterCore("StartPoint", function () {
                return Point;
            }, PathFigure);
            PathFigure.IsFilledProperty = DependencyProperty.RegisterCore("IsFilled", function () {
                return Boolean;
            }, PathFigure, true);
            PathFigure.prototype._Build = function () {
                this._Path = [];
                var start = this.StartPoint;
                this._Path.push({
                    type: Fayde.Shapes.PathEntryType.Move,
                    x: start.X,
                    y: start.Y
                });
                var enumerator = this.Segments.GetEnumerator();
                while(enumerator.MoveNext()) {
                    (enumerator.Current)._Append(this._Path);
                }
                if(this.IsClosed) {
                    this._Path.push({
                        type: Fayde.Shapes.PathEntryType.Close
                    });
                }
            };
            return PathFigure;
        })(Fayde.DependencyObject);
        Media.PathFigure = PathFigure;        
        Nullstone.RegisterType(PathFigure, "PathFigure");
        var PathFigureCollection = (function (_super) {
            __extends(PathFigureCollection, _super);
            function PathFigureCollection() {
                _super.apply(this, arguments);

            }
            return PathFigureCollection;
        })(Fayde.XamlObjectCollection);
        Media.PathFigureCollection = PathFigureCollection;        
        Nullstone.RegisterType(PathFigureCollection, "PathFigureCollection");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=PathFigure.js.map
