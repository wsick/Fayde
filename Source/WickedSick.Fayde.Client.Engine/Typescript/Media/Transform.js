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
                this._Listeners = [];
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
            Transform.prototype.Listen = function (func) {
                var listeners = this._Listeners;
                var listener = {
                    Callback: func,
                    Detach: function () {
                        var index = listeners.indexOf(listener);
                        if(index > -1) {
                            listeners.splice(index, 1);
                        }
                    }
                };
                listeners.push(listener);
                return listener;
            };
            Transform.prototype._InvalidateValue = function () {
                if(this._Value !== undefined) {
                    this._Value = undefined;
                }
                var listeners = this._Listeners;
                var len = listeners.length;
                for(var i = 0; i < len; i++) {
                    listeners[i].Callback(this);
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

                this._MatrixListener = null;
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
                var _this = this;
                if(this._MatrixListener) {
                    this._MatrixListener.Detach();
                    this._MatrixListener = null;
                }
                var newv = args.NewValue;
                if(newv) {
                    this._MatrixListener = newv.Listen(function (newMatrix) {
                        return _this._InvalidateValue();
                    });
                }
                this._InvalidateValue();
            };
            return MatrixTransform;
        })(Transform);
        Media.MatrixTransform = MatrixTransform;        
        Nullstone.RegisterType(MatrixTransform, "MatrixTransform");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Transform.js.map
