var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/DependencyObject.ts" />
    /// <reference path="../Runtime/Nullstone.ts" />
    /// CODE
    /// <reference path="Matrix.ts" />
    /// <reference path="../Primitives/Point.ts" />
    /// <reference path="../Primitives/rect.ts" />
    (function (Media) {
        var GeneralTransform = (function (_super) {
            __extends(GeneralTransform, _super);
            function GeneralTransform() {
                _super.apply(this, arguments);

            }
            GeneralTransform.prototype.Transform = function (p) {
                return p;
            };
            GeneralTransform.prototype.TransformBounds = function (r) {
                return r;
            };
            GeneralTransform.prototype.TryTransform = function (inPoint, outPoint) {
                return false;
            };
            return GeneralTransform;
        })(Fayde.DependencyObject);
        Media.GeneralTransform = GeneralTransform;        
        Nullstone.RegisterType(GeneralTransform, "GeneralTransform");
        var InternalTransform = (function (_super) {
            __extends(InternalTransform, _super);
            function InternalTransform() {
                _super.apply(this, arguments);

                this._Raw = mat4.identity();
            }
            Object.defineProperty(InternalTransform.prototype, "Inverse", {
                get: function () {
                    var it = new InternalTransform();
                    it._Raw = mat4.create();
                    mat4.inverse(this._Raw, it._Raw);
                    return it;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(InternalTransform.prototype, "Value", {
                get: function () {
                    var m = new Media.Matrix();
                    m._Raw = mat4.create(this._Raw);
                    return m;
                },
                enumerable: true,
                configurable: true
            });
            InternalTransform.prototype.Transform = function (p) {
                var pi = vec4.createFrom(p.X, p.Y, 0.0, 1.0);
                var po = vec4.create();
                mat4.transformVec4(this._Raw, pi, po);
                if(po[3] !== 0.0) {
                    var w = 1.0 / po[3];
                    return new Point(po[0] * w, p[1] * w);
                }
                return new Point(NaN, NaN);
            };
            InternalTransform.prototype.TransformBounds = function (r) {
                if(r) {
                    return rect.transform4(rect.clone(r), this._Raw);
                }
                return undefined;
            };
            return InternalTransform;
        })(GeneralTransform);
        Media.InternalTransform = InternalTransform;        
        Nullstone.RegisterType(InternalTransform, "InternalTransform");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=GeneralTransform.js.map
