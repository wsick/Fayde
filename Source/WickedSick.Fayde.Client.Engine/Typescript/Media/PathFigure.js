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
                        _super.call(this);
                this._Path = null;
                var coll = new Media.PathSegmentCollection();
                coll.AttachTo(this);
                coll.Listen(this);
                Object.defineProperty(this, "Segments", {
                    value: coll,
                    writable: false
                });
            }
            PathFigure.Annotations = {
                ContentProperty: "Segments"
            };
            PathFigure.IsClosedProperty = DependencyProperty.RegisterCore("IsClosed", function () {
                return Boolean;
            }, PathFigure, false, function (d, args) {
                return (d).InvalidatePathFigure();
            });
            PathFigure.StartPointProperty = DependencyProperty.RegisterCore("StartPoint", function () {
                return Point;
            }, PathFigure, undefined, function (d, args) {
                return (d).InvalidatePathFigure();
            });
            PathFigure.IsFilledProperty = DependencyProperty.RegisterCore("IsFilled", function () {
                return Boolean;
            }, PathFigure, true, function (d, args) {
                return (d).InvalidatePathFigure();
            });
            PathFigure.prototype._Build = function () {
                var p = new Fayde.Shapes.RawPath();
                var start = this.StartPoint;
                p.Move(start.X, start.Y);
                var enumerator = this.Segments.GetEnumerator();
                while(enumerator.MoveNext()) {
                    (enumerator.Current)._Append(p);
                }
                if(this.IsClosed) {
                    p.Close();
                }
                return p;
            };
            PathFigure.prototype.PathSegmentChanged = function (newPathSegment) {
                this._Path = null;
                var listener = this._Listener;
                if(listener) {
                    listener.PathFigureChanged(this);
                }
            };
            PathFigure.prototype.InvalidatePathFigure = function () {
                this._Path = null;
                var listener = this._Listener;
                if(listener) {
                    listener.PathFigureChanged(this);
                }
            };
            PathFigure.prototype.Listen = function (listener) {
                this._Listener = listener;
            };
            PathFigure.prototype.Unlisten = function (listener) {
                if(this._Listener === listener) {
                    this._Listener = null;
                }
            };
            PathFigure.prototype.MergeInto = function (rp) {
                if(!this._Path) {
                    this._Path = this._Build();
                }
                Fayde.Shapes.RawPath.Merge(rp, this._Path);
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
            PathFigureCollection.prototype.AddingToCollection = function (value, error) {
                if(!_super.prototype.AddingToCollection.call(this, value, error)) {
                    return false;
                }
                value.Listen(this);
                var listener = this._Listener;
                if(listener) {
                    listener.PathFigureChanged(value);
                }
                return true;
            };
            PathFigureCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
                _super.prototype.RemovedFromCollection.call(this, value, isValueSafe);
                value.Unlisten(this);
                var listener = this._Listener;
                if(listener) {
                    listener.PathFigureChanged(value);
                }
            };
            PathFigureCollection.prototype.Listen = function (listener) {
                this._Listener = listener;
            };
            PathFigureCollection.prototype.Unlisten = function (listener) {
                if(this._Listener === listener) {
                    this._Listener = null;
                }
            };
            PathFigureCollection.prototype.PathFigureChanged = function (newPathFigure) {
                var listener = this._Listener;
                if(listener) {
                    listener.PathFigureChanged(newPathFigure);
                }
            };
            return PathFigureCollection;
        })(Fayde.XamlObjectCollection);
        Media.PathFigureCollection = PathFigureCollection;        
        Nullstone.RegisterType(PathFigureCollection, "PathFigureCollection");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=PathFigure.js.map
