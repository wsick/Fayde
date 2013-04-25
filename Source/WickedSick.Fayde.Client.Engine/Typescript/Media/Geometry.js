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
    /// <reference path="Transform.ts" />
    /// <reference path="../Primitives/rect.ts" />
    /// <reference path="../Engine/RenderContext.ts" />
    /// <reference path="../Shapes/RawPath.ts" />
    (function (Media) {
        var Geometry = (function (_super) {
            __extends(Geometry, _super);
            function Geometry() {
                        _super.call(this);
                this._Path = null;
                this._LocalBounds = new rect();
                this._Listener = null;
                this._LocalBounds.Width = Number.NEGATIVE_INFINITY;
                this._LocalBounds.Height = Number.NEGATIVE_INFINITY;
            }
            Geometry.TransformProperty = DependencyProperty.Register("Transform", function () {
                return Media.Transform;
            }, Geometry, undefined, function (d, args) {
                return (d)._TransformChanged(args);
            });
            Geometry.prototype.GetBounds = function (thickness) {
                var compute = rect.isEmpty(this._LocalBounds);
                if(!this._Path) {
                    this._Path = this._Build();
                    compute = true;
                }
                if(compute) {
                    rect.copyTo(this.ComputePathBounds(thickness), this._LocalBounds);
                }
                var bounds = rect.clone(this._LocalBounds);
                var transform = this.Transform;
                if(transform != null) {
                    bounds = transform.TransformBounds(bounds);
                }
                return bounds;
            };
            Geometry.prototype.Draw = function (ctx) {
                if(!this._Path) {
                    return;
                }
                var transform = this.Transform;
                if(transform != null) {
                    ctx.Save();
                    ctx.Transform(transform);
                }
                this._Path.DrawRenderCtx(ctx);
                if(transform != null) {
                    ctx.Restore();
                }
            };
            Geometry.prototype.ComputePathBounds = function (thickness) {
                if(!this._Path) {
                    this._Path = this._Build();
                }
                if(!this._Path) {
                    return new rect();
                }
                return this._Path.CalculateBounds(thickness);
            };
            Geometry.prototype._InvalidateGeometry = function () {
                this._Path = null;
                rect.set(this._LocalBounds, 0, 0, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
            };
            Geometry.prototype._Build = function () {
                return undefined;
            };
            Geometry.prototype.Listen = function (listener) {
                this._Listener = listener;
            };
            Geometry.prototype.Unlisten = function (listener) {
                if(this._Listener === listener) {
                    this._Listener = null;
                }
            };
            Geometry.prototype.TransformChanged = function (source) {
                this._InvalidateGeometry();
                var listener = this._Listener;
                if(listener) {
                    listener.GeometryChanged(this);
                }
            };
            Geometry.prototype._TransformChanged = function (args) {
                var oldt = args.OldValue;
                var newt = args.NewValue;
                if(oldt) {
                    oldt.Unlisten(this);
                }
                if(newt) {
                    newt.Listen(this);
                }
                this._InvalidateGeometry();
                var listener = this._Listener;
                if(listener) {
                    listener.GeometryChanged(this);
                }
            };
            Geometry.prototype.Serialize = function () {
                var path = this._Path;
                if(!path) {
                    return;
                }
                return path.Serialize();
            };
            return Geometry;
        })(Fayde.DependencyObject);
        Media.Geometry = Geometry;        
        Nullstone.RegisterType(Geometry, "Geometry");
        var GeometryCollection = (function (_super) {
            __extends(GeometryCollection, _super);
            function GeometryCollection() {
                _super.apply(this, arguments);

            }
            GeometryCollection.prototype.Listen = function (listener) {
                this._Listener = listener;
            };
            GeometryCollection.prototype.Unlisten = function (listener) {
                if(this._Listener === listener) {
                    this._Listener = null;
                }
            };
            GeometryCollection.prototype.AddedToCollection = function (value, error) {
                if(!_super.prototype.AddedToCollection.call(this, value, error)) {
                    return false;
                }
                value.Listen(this);
                var listener = this._Listener;
                if(listener) {
                    listener.GeometryChanged(value);
                }
            };
            GeometryCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
                _super.prototype.RemovedFromCollection.call(this, value, isValueSafe);
                value.Unlisten(this);
                var listener = this._Listener;
                if(listener) {
                    listener.GeometryChanged(value);
                }
            };
            GeometryCollection.prototype.GeometryChanged = function (newGeometry) {
                var listener = this._Listener;
                if(listener) {
                    listener.GeometryChanged(newGeometry);
                }
            };
            return GeometryCollection;
        })(Fayde.XamlObjectCollection);
        Media.GeometryCollection = GeometryCollection;        
        Nullstone.RegisterType(GeometryCollection, "GeometryCollection");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Geometry.js.map
