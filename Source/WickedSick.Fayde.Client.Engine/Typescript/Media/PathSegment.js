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
            PathSegment.prototype.Listen = function (listener) {
                this._Listener = listener;
            };
            PathSegment.prototype.Unlisten = function (listener) {
                if(this._Listener === listener) {
                    this._Listener = null;
                }
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
            PathSegmentCollection.prototype.AddingToCollection = function (value, error) {
                if(!_super.prototype.AddingToCollection.call(this, value, error)) {
                    return false;
                }
                value.Listen(this);
                var listener = this._Listener;
                if(listener) {
                    listener.PathSegmentChanged(value);
                }
                return true;
            };
            PathSegmentCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
                _super.prototype.RemovedFromCollection.call(this, value, isValueSafe);
                value.Unlisten(this);
                var listener = this._Listener;
                if(listener) {
                    listener.PathSegmentChanged(value);
                }
            };
            PathSegmentCollection.prototype.Listen = function (listener) {
                this._Listener = listener;
            };
            PathSegmentCollection.prototype.Unlisten = function (listener) {
                if(this._Listener === listener) {
                    this._Listener = null;
                }
            };
            PathSegmentCollection.prototype.PathSegmentChanged = function (newPathSegment) {
                var listener = this._Listener;
                if(listener) {
                    listener.PathSegmentChanged(newPathSegment);
                }
            };
            return PathSegmentCollection;
        })(Fayde.XamlObjectCollection);
        Media.PathSegmentCollection = PathSegmentCollection;        
        Nullstone.RegisterType(PathSegmentCollection, "PathSegmentCollection");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=PathSegment.js.map
