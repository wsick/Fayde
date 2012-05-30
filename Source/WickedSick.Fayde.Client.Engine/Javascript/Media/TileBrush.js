/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="Brush.js"/>
/// CODE

//#region TileBrush
var TileBrush = Nullstone.Create("TileBrush", Brush);

//#region Dependency Properties

TileBrush.AlignmentXProperty = DependencyProperty.RegisterCore("AlignmentX", function () { return new Enum(AlignmentX); }, TileBrush, AlignmentX.Center);
TileBrush.AlignmentYProperty = DependencyProperty.RegisterCore("AlignmentY", function () { return new Enum(AlignmentY); }, TileBrush, AlignmentY.Center);
TileBrush.StretchProperty = DependencyProperty.RegisterCore("Stretch", function () { return new Enum(Stretch); }, TileBrush, Stretch.Fill);

Nullstone.AutoProperties(TileBrush, [
    TileBrush.AlignmentXProperty,
    TileBrush.AlignmentYProperty,
    TileBrush.StretchProperty
]);

//#endregion

Nullstone.FinishCreate(TileBrush);
//#endregion