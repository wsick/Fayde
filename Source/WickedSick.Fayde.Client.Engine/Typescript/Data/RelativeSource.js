var Fayde;
(function (Fayde) {
    /// <reference path="../Runtime/Nullstone.ts" />
    /// CODE
    /// <reference path="Enums.ts" />
    (function (Data) {
        var RelativeSource = (function () {
            function RelativeSource(mode) {
                this.Mode = Data.RelativeSourceMode.TemplatedParent;
                if(mode) {
                    this.Mode = mode;
                }
            }
            return RelativeSource;
        })();
        Data.RelativeSource = RelativeSource;        
        Nullstone.RegisterType(RelativeSource, "RelativeSource");
    })(Fayde.Data || (Fayde.Data = {}));
    var Data = Fayde.Data;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=RelativeSource.js.map
