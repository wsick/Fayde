/// <reference path="../Runtime/RefObject.js" />
/// <reference path="Enums.js"/>
/// CODE

//#region GridLength

function GridLength(value, type) {
    RefObject.call(this);
    this.Value = value == null ? 0 : value;
    this.Type = type == null ? GridUnitType.Auto : type;
}
GridLength.InheritFrom(RefObject);

GridLength.Equals = function (gl1, gl2) {
    return Math.abs(gl1.Value - gl2.Value) < 0.001 && gl1.Type == gl2.Type;
};

//#endregion
