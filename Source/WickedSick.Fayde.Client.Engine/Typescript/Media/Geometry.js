var Fayde;
(function (Fayde) {
    /// CODE
    /// <reference path="../Primitives/rect.ts" />
    (function (Media) {
        var Geometry = (function () {
            function Geometry() { }
            Geometry.prototype.GetBounds = function () {
                //TODO: Implement
                return new rect();
            };
            Geometry.prototype.Draw = function (ctx) {
                //TODO: Implement
                            };
            return Geometry;
        })();
        Media.Geometry = Geometry;        
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Geometry.js.map
