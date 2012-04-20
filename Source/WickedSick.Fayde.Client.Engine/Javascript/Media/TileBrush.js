/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Brush.js"/>
/// CODE

//#region TileBrush
var TileBrush = Nullstone.Create("TileBrush", Brush);

//#region Dependency Properties

TileBrush.AlignmentXProperty = DependencyProperty.RegisterCore("AlignmentX", function () { return new Enum(AlignmentX); }, TileBrush, AlignmentX.Center);
TileBrush.Instance.GetAlignmentX = function () {
    return this.$GetValue(TileBrush.AlignmentXProperty);
};
TileBrush.Instance.SetAlignmentX = function (value) {
    this.SetValue(TileBrush.AlignmentXProperty, value);
};

TileBrush.AlignmentYProperty = DependencyProperty.RegisterCore("AlignmentY", function () { return new Enum(AlignmentY); }, TileBrush, AlignmentY.Center);
TileBrush.Instance.GetAlignmentY = function () {
    return this.$GetValue(TileBrush.AlignmentYProperty);
};
TileBrush.Instance.SetAlignmentY = function (value) {
    this.SetValue(TileBrush.AlignmentYProperty, value);
};

TileBrush.StretchProperty = DependencyProperty.RegisterCore("Stretch", function () { return new Enum(Stretch); }, TileBrush, Stretch.Fill);
TileBrush.Instance.GetStretch = function () {
    return this.$GetValue(TileBrush.StretchProperty);
};
TileBrush.Instance.SetStretch = function (value) {
    this.SetValue(TileBrush.StretchProperty, value);
};

//#endregion

Nullstone.FinishCreate(TileBrush);
//#endregion