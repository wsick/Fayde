/// <reference path="PathSegment.js"/>
/// CODE
/// <reference path="Enums.js"/>

//#region ArcSegment
var ArcSegment = Nullstone.Create("ArcSegment", PathSegment);

//#region Dependency Properties

ArcSegment.IsLargeArcProperty = DependencyProperty.RegisterCore("IsLargeArc", function () { return Boolean; }, ArcSegment, false);
ArcSegment.PointProperty = DependencyProperty.Register("Point", function () { return Point; }, ArcSegment, new Point());
ArcSegment.RotationAngleProperty = DependencyProperty.Register("RotationAngle", function () { return Number; }, ArcSegment, 0.0);
ArcSegment.SizeProperty = DependencyProperty.Register("Size", function () { return Size; }, ArcSegment, new Size());
ArcSegment.SweepDirectionProperty = DependencyProperty.Register("SweepDirection", function () { return new Enum(SweepDirection); }, ArcSegment, SweepDirection.Counterclockwise);

Nullstone.AutoProperties(ArcSegment, [
    ArcSegment.IsLargeArcProperty,
    ArcSegment.PointProperty,
    ArcSegment.RotationAngleProperty,
    ArcSegment.SizeProperty,
    ArcSegment.SweepDirectionProperty
]);

//#endregion

// http: //msdn.microsoft.com/en-us/library/system.windows.media.arcsegment(v=vs.95).aspx
ArcSegment.Instance._Append = function (path) {
    NotImplemented("ArcSegment._Append");
};

Nullstone.FinishCreate(ArcSegment);
//#endregion