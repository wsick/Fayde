/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Enums.js"/>
/// CODE

(function (namespace) {
    var GridLength = Nullstone.Create("GridLength", undefined, 2);

    GridLength.Instance.Init = function (value, unitType) {
        this.Value = value == null ? 0 : value;
        this.Type = unitType == null ? namespace.GridUnitType.Auto : unitType;
    };

    GridLength.Equals = function (gl1, gl2) {
        return Math.abs(gl1.Value - gl2.Value) < 0.001 && gl1.Type == gl2.Type;
    };

    namespace.GridLength = Nullstone.FinishCreate(GridLength);
})(Nullstone.Namespace("Fayde.Controls"));