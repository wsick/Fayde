var Fayde;
(function (Fayde) {
    /// <reference path="../Runtime/Nullstone.ts" />
    /// CODE
    (function (Media) {
        var Brush = (function () {
            function Brush() { }
            Brush.prototype.SetupBrush = function (ctx, r) {
                //TODO: Implement
                            };
            Brush.prototype.ToHtml5Object = function () {
                //TODO: Implement
                return undefined;
            };
            return Brush;
        })();
        Media.Brush = Brush;        
        Nullstone.RegisterType(Brush, "Brush");
    })(Fayde.Media || (Fayde.Media = {}));
    var Media = Fayde.Media;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Brush.js.map
