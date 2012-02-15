/// <reference path="../Core/DependencyObject.js"/>
/// CODE

//#region Brush

function Brush() {
    DependencyObject.call(this);
};
Brush.InheritFrom(DependencyObject);

Brush.prototype._Translate = function (ctx) {
    AbstractMethod("Brush._Translate()");
};

//#endregion