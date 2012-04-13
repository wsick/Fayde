/// <reference path="PathSegment.js"/>
/// CODE
/// <reference path="Enums.js"/>

//#region ArcSegment
var ArcSegment = Nullstone.Create("ArcSegment", PathSegment);

ArcSegment.Instance.Init = function () {
};

//#region Dependency Properties

ArcSegment.IsLargeArcProperty = DependencyProperty.RegisterCore("IsLargeArc", function () { return Boolean; }, ArcSegment, false);
ArcSegment.Instance.GetIsLargeArc = function () {
    ///<returns type="Boolean"></returns>
    return this.GetValue(ArcSegment.IsLargeArcProperty);
};
ArcSegment.Instance.SetIsLargeArc = function (value) {
    ///<param name="value" type="Boolean"></param>
    this.SetValue(ArcSegment.IsLargeArcProperty, value);
};

ArcSegment.PointProperty = DependencyProperty.Register("Point", function () { return Point; }, ArcSegment, new Point());
ArcSegment.Instance.GetPoint = function () {
    ///<returns type="Point"></returns>
    return this.GetValue(ArcSegment.PointProperty);
};
ArcSegment.Instance.SetPoint = function (value) {
    ///<param name="value" type="Point"></param>
    this.SetValue(ArcSegment.PointProperty, value);
};

ArcSegment.RotationAngleProperty = DependencyProperty.Register("RotationAngle", function () { return Number; }, ArcSegment, 0.0);
ArcSegment.Instance.GetRotationAngle = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(ArcSegment.RotationAngleProperty);
};
ArcSegment.Instance.SetRotationAngle = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(ArcSegment.RotationAngleProperty, value);
};

ArcSegment.SizeProperty = DependencyProperty.Register("Size", function () { return Size; }, ArcSegment, new Size());
ArcSegment.Instance.GetSize = function () {
    ///<returns type="Size"></returns>
    return this.GetValue(ArcSegment.SizeProperty);
};
ArcSegment.Instance.SetSize = function (value) {
    ///<param name="value" type="Size"></param>
    this.SetValue(ArcSegment.SizeProperty, value);
};

ArcSegment.SweepDirectionProperty = DependencyProperty.Register("SweepDirection", function () { return Number; }, ArcSegment, SweepDirection.Counterclockwise);
ArcSegment.Instance.GetSweepDirection = function () {
    ///<returns type="Number"></returns>
    return this.GetValue(ArcSegment.SweepDirectionProperty);
};
ArcSegment.Instance.SetSweepDirection = function (value) {
    ///<param name="value" type="Number"></param>
    this.SetValue(ArcSegment.SweepDirectionProperty, value);
};

//#endregion

// http: //msdn.microsoft.com/en-us/library/system.windows.media.arcsegment(v=vs.95).aspx
ArcSegment.Instance._Append = function (path) {
    NotImplemented("ArcSegment._Append");
};

Nullstone.FinishCreate(ArcSegment);
//#endregion