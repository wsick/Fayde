/// <reference path="Shape.js"/>
/// CODE
/// <reference path="../Media/Geometry.js"/>
/// <reference path="../Core/Core.js"/>

//#region Path
var Path = Nullstone.Create("Path", Shape);

Path.Instance.Init = function () {
    this.Init$Shape();
};

//#region Dependency Properties

// Path.Data Description: http://msdn.microsoft.com/en-us/library/system.windows.shapes.path.data(v=vs.95).aspx
Path.DataProperty = DependencyProperty.RegisterCore("Data", function () { return Geometry; }, Path);
Path.Instance.GetData = function () {
    ///<returns type="Geometry"></returns>
    return this.GetValue(Path.DataProperty);
};
Path.Instance.SetData = function (value) {
    ///<param name="value" type="Geometry"></param>
    this.SetValue(Path.DataProperty, value);
};
Path.Instance.SetData.Converter = function (value) {
    if (value instanceof Geometry)
        return value;
    if (typeof value === "string")
        return Fayde.TypeConverter.GeometryFromString(value);
    return value;
};

//#endregion

Path.Instance._ComputeShapeBoundsImpl = function (logical, matrix) {
    /// <param name="logical" type="Boolean"></param>
    /// <param name="matrix" type="Matrix"></param>
    /// <returns type="Rect" />

};

Nullstone.FinishCreate(Path);
//#endregion