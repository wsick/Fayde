var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="GeneralTransform.ts" />
    /// CODE
    /// <reference path="../Primitives/RawMatrix.ts" />
    /// <reference path="Matrix.ts" />
    (function (Media) {
        var Transform = (function (_super) {
            __extends(Transform, _super);
            function Transform() {
                        _super.call(this);
                this._Listener = null;
                (this.XamlNode).IsShareable = true;
            }
            Object.defineProperty(Transform.prototype, "Value", {
                get: function () {
                    var val = this._Value;
                    if(!val) {
                        var val = new Media.Matrix();
                        val._Raw = this._BuildValue();
                        this._Value = val;
                    }
                    return val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Transform.prototype, "Inverse", {
                get: function () {
                    var inverse = this.Value.Inverse;
                    if(inverse == null) {
                        return;
                    }
                    var mt = new MatrixTransform();
                    mt.Matrix = inverse;
                    return mt;
                },
                enumerable: true,
                configurable: true
            });
            Transform.prototype.Transform = function (p) {
                var val = this.Value;
                var v;
                if(!val || !(v = val._Raw)) {
                    return new Point(p.X, p.Y);
                }
                v = mat3.transformVec2(v, vec2.createFrom(p.X, p.Y));
                return new Point(v[0], v[1]);
            };
            Transform.prototype.TransformBounds = function (r) {
                if(!r) {
                    return undefined;
                }
                var v = this.Value;
                if(!v || !v._Raw) {
                    return rect.copyTo(r);
                }
                return rect.transform(rect.copyTo(r), v._Raw);
            };
            Transform.prototype.TryTransform = function (inPoint, outPoint) {
                return false;
            };
            Transform.prototype.Listen = function (listener) {
                this._Listener = listener;
            };
            Transform.prototype.Unlisten = function (listener) {
                if(this._Listener === listener) {
                    this._Listener = null;
                }
            };
            Transform.prototype._InvalidateValue = function () {
                if(this._Value === undefined) {
                    return;
                }
                this._Value = undefined;
                var listener = this._Listener;
                if(listener) {
                    listener.TransformChanged(this);
                }
            };
            Transform.prototype._BuildValue = function () {
                //Abstract Method
                return undefined;
            };
            return Transform;
        })(Media.GeneralTransform);
        Media.Transform = Transform;        
        Nullstone.RegisterType(Transform, "Transform");
        var MatrixTransform = (function (_super) {
            __extends(MatrixTransform, _super);
            function MatrixTransform() {
                _super.apply(this, arguments);

            }
            MatrixTransform.MatrixProperty = DependencyProperty.RegisterFull("Matrix", function () {
                return Media.Matrix;
            }, MatrixTransform, undefined, function (d, args) {
                return (d)._MatrixChanged(args);
            });
            MatrixTransform.prototype._BuildValue = function () {
                var m = this.Matrix;
                if(m) {
                    return m._Raw;
                }
                return mat3.identity();
            };
            MatrixTransform.prototype._MatrixChanged = function (args) {
                var oldv = args.OldValue;
                var newv = args.NewValue;
                if(oldv) {
                    oldv.Unlisten(this);
                }
                if(newv) {
                    newv.Listen(this);
                }
                this.MatrixChanged(newv);
            };
            MatrixTransform.prototype.MatrixChanged = function (newMatrix) {
                var listener = this._Listener;
                if(listener) {
                    listener.TransformChanged(this);
                }
            };
            return MatrixTransform;
        })(Transform);
        Media.MatrixTransform = MatrixTransform;        
        Nullstone.RegisterType(MatrixTransform, "MatrixTransform");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Transform.js.map
