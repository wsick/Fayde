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
    /// <reference path="../Shapes/RawPath.ts" />
    (function (Media) {
        var PathSegment = (function (_super) {
            __extends(PathSegment, _super);
            function PathSegment() {
                _super.apply(this, arguments);

            }
            PathSegment.prototype._Append = function (path) {
                //Abstract method
                            };
            return PathSegment;
        })(Fayde.DependencyObject);
        Media.PathSegment = PathSegment;        
        Nullstone.RegisterType(PathSegment, "PathSegment");
        var PathSegmentCollection = (function (_super) {
            __extends(PathSegmentCollection, _super);
            function PathSegmentCollection() {
                _super.apply(this, arguments);

            }
            return PathSegmentCollection;
        })(Fayde.XamlObjectCollection);
        Media.PathSegmentCollection = PathSegmentCollection;        
        Nullstone.RegisterType(PathSegmentCollection, "PathSegmentCollection");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=PathSegment.js.map
