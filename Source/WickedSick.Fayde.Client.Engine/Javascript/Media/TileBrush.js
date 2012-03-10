/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Brush.js"/>
/// CODE

//#region TileBrush
var TileBrush = Nullstone.Create("TileBrush", Brush);

//#region DEPENDENCY PROPERTIES

TileBrush.AlignmentXProperty = DependencyProperty.Register("AlignmentX", function () { return Number; }, TileBrush, AlignmentX.Center);
TileBrush.Instance.GetAlignmentX = function () {
    return this.GetValue(TileBrush.AlignmentXProperty);
};
TileBrush.Instance.SetAlignmentX = function (value) {
    this.SetValue(TileBrush.AlignmentXProperty, value);
};

TileBrush.AlignmentYProperty = DependencyProperty.Register("AlignmentY", function () { return Number; }, TileBrush, AlignmentY.Center);
TileBrush.Instance.GetAlignmentY = function () {
    return this.GetValue(TileBrush.AlignmentYProperty);
};
TileBrush.Instance.SetAlignmentY = function (value) {
    this.SetValue(TileBrush.AlignmentYProperty, value);
};

TileBrush.StretchProperty = DependencyProperty.Register("Stretch", function () { return Number; }, TileBrush, Stretch.Fill);
TileBrush.Instance.GetStretch = function () {
    return this.GetValue(TileBrush.StretchProperty);
};
TileBrush.Instance.SetStretch = function (value) {
    this.SetValue(TileBrush.StretchProperty, value);
};

//#endregion

Nullstone.FinishCreate(TileBrush);
//#endregion