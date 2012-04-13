/// <reference path="Shape.js"/>
/// CODE

//#region Path
var Path = Nullstone.Create("Path", Shape);

Path.Instance.Init = function () {
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
        return Path._ParseMarkup(value);
    return value;
};

//#endregion

// Path Markup Syntax: http://msdn.microsoft.com/en-us/library/cc189041(v=vs.95).aspx
Path._ParseMarkup = function (str) {
};

Nullstone.FinishCreate(Path);
//#endregion