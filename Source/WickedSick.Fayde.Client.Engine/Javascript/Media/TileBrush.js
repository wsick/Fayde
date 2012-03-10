/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Brush.js"/>
/// CODE

//#region TileBrush

function TileBrush() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
}
Nullstone.Extend(TileBrush, "TileBrush", Brush);

//#region DEPENDENCY PROPERTIES

TileBrush.AlignmentXProperty = DependencyProperty.Register("AlignmentX", function () { return Number; }, TileBrush, AlignmentX.Center);
TileBrush.prototype.GetAlignmentX = function () {
    return this.GetValue(TileBrush.AlignmentXProperty);
};
TileBrush.prototype.SetAlignmentX = function (value) {
    this.SetValue(TileBrush.AlignmentXProperty, value);
};

TileBrush.AlignmentYProperty = DependencyProperty.Register("AlignmentY", function () { return Number; }, TileBrush, AlignmentY.Center);
TileBrush.prototype.GetAlignmentY = function () {
    return this.GetValue(TileBrush.AlignmentYProperty);
};
TileBrush.prototype.SetAlignmentY = function (value) {
    this.SetValue(TileBrush.AlignmentYProperty, value);
};

TileBrush.StretchProperty = DependencyProperty.Register("Stretch", function () { return Number; }, TileBrush, Stretch.Fill);
TileBrush.prototype.GetStretch = function () {
    return this.GetValue(TileBrush.StretchProperty);
};
TileBrush.prototype.SetStretch = function (value) {
    this.SetValue(TileBrush.StretchProperty, value);
};

//#endregion

//#endregion
