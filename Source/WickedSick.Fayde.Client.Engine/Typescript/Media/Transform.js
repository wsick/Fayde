var Fayde;
(function (Fayde) {
    /// <reference path="../Runtime/Nullstone.ts" />
    /// CODE
    /// <reference path="Matrix.ts" />
    (function (Media) {
        var Transform = (function () {
            function Transform() { }
            return Transform;
        })();
        Media.Transform = Transform;        
        Nullstone.RegisterType(Transform, "Transform");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Transform.js.map
