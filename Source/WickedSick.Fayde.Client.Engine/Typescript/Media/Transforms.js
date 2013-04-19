var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Transform.ts" />
    /// <reference path="../Core/XamlObjectCollection.ts" />
    /// CODE
    (function (Media) {
        var RotateTransform = (function (_super) {
            __extends(RotateTransform, _super);
            function RotateTransform() {
                _super.apply(this, arguments);

            }
            RotateTransform.AngleProperty = DependencyProperty.Register("Angle", function () {
                return Number;
            }, RotateTransform, 0, function (d, args) {
                return (d)._InvalidateValue();
            });
            RotateTransform.CenterXProperty = DependencyProperty.Register("CenterX", function () {
                return Number;
            }, RotateTransform, 0, function (d, args) {
                return (d)._InvalidateValue();
            });
            RotateTransform.CenterYProperty = DependencyProperty.Register("CenterY", function () {
                return Number;
            }, RotateTransform, 0, function (d, args) {
                return (d)._InvalidateValue();
            });
            RotateTransform.prototype._BuildValue = function () {
                var cx = this.CenterX;
                var cy = this.CenterY;
                var angleRad = Math.PI / 180 * this.Angle;
                var m = mat3.createRotate(angleRad);
                if(cx === 0 && cy === 0) {
                    return m;
                }
                //move center {x,y} to {0,0}, rotate, then slide {x,y} back to {x,y}
                mat3.multiply(mat3.createTranslate(-cx, -cy), m, m)//m = m * translation
                ;
                mat3.translate(m, cx, cy);
                return m;
            };
            return RotateTransform;
        })(Media.Transform);
        Media.RotateTransform = RotateTransform;        
        Nullstone.RegisterType(RotateTransform, "RotateTransform");
        var ScaleTransform = (function (_super) {
            __extends(ScaleTransform, _super);
            function ScaleTransform() {
                _super.apply(this, arguments);

            }
            ScaleTransform.CenterXProperty = DependencyProperty.Register("CenterX", function () {
                return Number;
            }, ScaleTransform, 0, function (d, args) {
                return (d)._InvalidateValue();
            });
            ScaleTransform.CenterYProperty = DependencyProperty.Register("CenterY", function () {
                return Number;
            }, ScaleTransform, 0, function (d, args) {
                return (d)._InvalidateValue();
            });
            ScaleTransform.ScaleXProperty = DependencyProperty.Register("ScaleX", function () {
                return Number;
            }, ScaleTransform, 0, function (d, args) {
                return (d)._InvalidateValue();
            });
            ScaleTransform.ScaleYProperty = DependencyProperty.Register("ScaleY", function () {
                return Number;
            }, ScaleTransform, 0, function (d, args) {
                return (d)._InvalidateValue();
            });
            ScaleTransform.prototype._BuildValue = function () {
                var cx = this.CenterX;
                var cy = this.CenterY;
                var m = mat3.createScale(this.ScaleX, this.ScaleY);
                if(cx === 0 && cy === 0) {
                    return m;
                }
                //move center {x,y} to {0,0}, scale, then slide {x,y} back to {x,y}
                mat3.multiply(mat3.createTranslate(-cx, -cy), m, m)//m = m * translation
                ;
                mat3.translate(m, cx, cy);
                return m;
            };
            return ScaleTransform;
        })(Media.Transform);
        Media.ScaleTransform = ScaleTransform;        
        Nullstone.RegisterType(ScaleTransform, "ScaleTransform");
        var SkewTransform = (function (_super) {
            __extends(SkewTransform, _super);
            function SkewTransform() {
                _super.apply(this, arguments);

            }
            SkewTransform.AngleXProperty = DependencyProperty.Register("AngleX", function () {
                return Number;
            }, SkewTransform, 0, function (d, args) {
                return (d)._InvalidateValue();
            });
            SkewTransform.AngleYProperty = DependencyProperty.Register("AngleY", function () {
                return Number;
            }, SkewTransform, 0, function (d, args) {
                return (d)._InvalidateValue();
            });
            SkewTransform.CenterXProperty = DependencyProperty.Register("CenterX", function () {
                return Number;
            }, SkewTransform, 0, function (d, args) {
                return (d)._InvalidateValue();
            });
            SkewTransform.CenterYProperty = DependencyProperty.Register("CenterY", function () {
                return Number;
            }, SkewTransform, 0, function (d, args) {
                return (d)._InvalidateValue();
            });
            SkewTransform.prototype._BuildValue = function () {
                var cx = this.CenterX;
                var cy = this.CenterY;
                var angleXRad = Math.PI / 180 * this.AngleX;
                var angleYRad = Math.PI / 180 * this.AngleY;
                var m = mat3.createSkew(angleXRad, angleYRad);
                if(cx === 0 && cy === 0) {
                    return m;
                }
                //move center {x,y} to {0,0}, scale, then slide {x,y} back to {x,y}
                mat3.multiply(mat3.createTranslate(-cx, -cy), m, m)//m = m * translation
                ;
                mat3.translate(m, cx, cy);
                return m;
            };
            return SkewTransform;
        })(Media.Transform);
        Media.SkewTransform = SkewTransform;        
        Nullstone.RegisterType(SkewTransform, "SkewTransform");
        var TranslateTransform = (function (_super) {
            __extends(TranslateTransform, _super);
            function TranslateTransform() {
                _super.apply(this, arguments);

            }
            TranslateTransform.XProperty = DependencyProperty.Register("X", function () {
                return Number;
            }, SkewTransform, 0, function (d, args) {
                return (d)._InvalidateValue();
            });
            TranslateTransform.YProperty = DependencyProperty.Register("Y", function () {
                return Number;
            }, SkewTransform, 0, function (d, args) {
                return (d)._InvalidateValue();
            });
            TranslateTransform.prototype._BuildValue = function () {
                return mat3.createTranslate(this.X, this.Y);
            };
            return TranslateTransform;
        })(Media.Transform);
        Media.TranslateTransform = TranslateTransform;        
        Nullstone.RegisterType(TranslateTransform, "TranslateTransform");
        var TransformCollection = (function (_super) {
            __extends(TransformCollection, _super);
            function TransformCollection() {
                _super.apply(this, arguments);

            }
            TransformCollection.prototype.Listen = function (listener) {
                this._Listener = listener;
            };
            TransformCollection.prototype.Unlisten = function (listener) {
                if(this._Listener === listener) {
                    this._Listener = null;
                }
            };
            TransformCollection.prototype._RaiseItemAdded = function (value, index) {
                value.Listen(this);
            };
            TransformCollection.prototype._RaiseItemRemoved = function (value, index) {
                value.Unlisten(this);
            };
            TransformCollection.prototype._RaiseItemReplaced = function (removed, added, index) {
                removed.Unlisten(this);
                added.Listen(this);
            };
            TransformCollection.prototype._RaiseClearing = function (arr) {
                var len = arr.length;
                for(var i = 0; i < len; i++) {
                    arr[i].Unlisten(this);
                }
            };
            TransformCollection.prototype.TransformChanged = function (transform) {
                var listener = this._Listener;
                if(listener) {
                    listener.TransformChanged(undefined);
                }
            };
            return TransformCollection;
        })(Fayde.XamlObjectCollection);
        Media.TransformCollection = TransformCollection;        
        Nullstone.RegisterType(TransformCollection, "TransformCollection");
        var TransformGroup = (function (_super) {
            __extends(TransformGroup, _super);
            function TransformGroup() {
                        _super.call(this);
                var coll = new TransformCollection();
                coll.Listen(this);
                Object.defineProperty(this, "Children", {
                    value: coll,
                    writable: false
                });
            }
            TransformGroup.prototype.TransformChanged = function (source) {
                this._InvalidateValue();
            };
            TransformGroup.prototype._BuildValue = function () {
                var enumerator = this.Children.GetEnumerator(true);
                var cur = mat3.identity();
                while(enumerator.MoveNext()) {
                    mat3.multiply((enumerator.Current).Value._Raw, cur, cur)//cur = cur * child
                    ;
                }
                return cur;
            };
            return TransformGroup;
        })(Media.Transform);
        Media.TransformGroup = TransformGroup;        
        Nullstone.RegisterType(TransformGroup, "TransformGroup");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Transforms.js.map
