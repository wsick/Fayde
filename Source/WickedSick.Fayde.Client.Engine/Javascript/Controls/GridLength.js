/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Enums.js"/>
/// CODE

//#region GridLength

function GridLength(value, type) {
    if (!Nullstone.IsReady)
        return;
    this.Value = value == null ? 0 : value;
    this.Type = type == null ? GridUnitType.Auto : type;
}
Nullstone.Create(GridLength, "GridLength");

GridLength.Equals = function (gl1, gl2) {
    return Math.abs(gl1.Value - gl2.Value) < 0.001 && gl1.Type == gl2.Type;
};

//#endregion