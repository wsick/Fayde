var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    (function (Media) {
        /// <reference path="../../Core/DependencyObject.ts" />
        /// CODE
        /// <reference path="Curves.ts" />
        /// <reference path="../../Primitives/Point.ts" />
        (function (Animation) {
            var KeySpline = (function (_super) {
                __extends(KeySpline, _super);
                function KeySpline() {
                    _super.apply(this, arguments);

                    this._QuadraticsArray = null;
                }
                KeySpline.PRECISION_LEVEL = 4;
                KeySpline.TOTAL_COUNT = Math.pow(2, KeySpline.PRECISION_LEVEL);
                KeySpline.ControlPoint1Property = DependencyProperty.RegisterCore("ControlPoint1", function () {
                    return Point;
                }, KeySpline, new Point(0, 0), function (d, args) {
                    return (d).InvalidateControlPoints();
                });
                KeySpline.ControlPoint2Property = DependencyProperty.RegisterCore("ControlPoint2", function () {
                    return Point;
                }, KeySpline, new Point(1.0, 1.0), function (d, args) {
                    return (d).InvalidateControlPoints();
                });
                KeySpline.prototype.GetSplineProgress = function (linearProgress) {
                    if(linearProgress >= 1.0) {
                        return 1.0;
                    }
                    if(linearProgress <= 0.0) {
                        return 0.0;
                    }
                    if(!this._QuadraticsArray) {
                        this._RegenerateQuadratics();
                    }
                    return Animation.Curves.QuadraticArrayYForX(this._QuadraticsArray, linearProgress, KeySpline.TOTAL_COUNT);
                };
                KeySpline.prototype.InvalidateControlPoints = function () {
                    this._QuadraticsArray = null;
                };
                KeySpline.prototype._RegenerateQuadratics = function () {
                    var c1 = this.ControlPoint1;
                    var c2 = this.ControlPoint2;
                    var src = {
                        c0: {
                            x: 0.0,
                            y: 0.0
                        },
                        c1: {
                            x: c1.X,
                            y: c1.Y
                        },
                        c2: {
                            x: c2.X,
                            y: c2.Y
                        },
                        c3: {
                            x: 1.0,
                            y: 1.0
                        }
                    };
                    var carr = [];
                    Animation.Curves.SubdivideCubicAtLevel(carr, KeySpline.PRECISION_LEVEL, src);
                    this._QuadraticsArray = Animation.Curves.ConvertCubicsToQuadratics(carr, KeySpline.TOTAL_COUNT);
                };
                return KeySpline;
            })(Fayde.DependencyObject);
            Animation.KeySpline = KeySpline;            
            Nullstone.RegisterType(KeySpline, "KeySpline");
        })(Media.Animation || (Media.Animation = {}));
        var Animation = Media.Animation;
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=KeySpline.js.map
