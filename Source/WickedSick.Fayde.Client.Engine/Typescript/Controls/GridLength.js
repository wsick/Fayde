var Fayde;
(function (Fayde) {
    /// <reference path="../Runtime/Nullstone.ts" />
    /// CODE
    (function (Controls) {
        (function (GridUnitType) {
            GridUnitType._map = [];
            GridUnitType.Auto = 0;
            GridUnitType.Pixel = 1;
            GridUnitType.Star = 2;
        })(Controls.GridUnitType || (Controls.GridUnitType = {}));
        var GridUnitType = Controls.GridUnitType;
        var GridLength = (function () {
            function GridLength(value, unitType) {
                this.Value = value == null ? 0 : value;
                this.Type = unitType == null ? GridUnitType.Auto : unitType;
            }
            GridLength.Equals = function Equals(gl1, gl2) {
                return Math.abs(gl1.Value - gl2.Value) < 0.001 && gl1.Type == gl2.Type;
            };
            GridLength.prototype.Clone = function () {
                return new Fayde.Controls.GridLength(this.Value, this.Type);
            };
            return GridLength;
        })();
        Controls.GridLength = GridLength;        
        Nullstone.RegisterType(GridLength, "GridLength");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=GridLength.js.map
