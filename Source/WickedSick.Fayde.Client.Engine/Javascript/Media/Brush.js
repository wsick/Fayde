/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// CODE

//#region Brush
var Brush = Nullstone.Create("Brush", DependencyObject);

Brush.Instance.Init = function () {
    this.Init$DependencyObject();
};

//#region Dependency Properties

Brush.TransformProperty = DependencyProperty.Register("Transform", function () { return Transform; }, Brush);

Nullstone.AutoProperties(Brush, [
    Brush.TransformProperty
]);

Brush.ChangedProperty = DependencyProperty.Register("Changed", function () { return Boolean; }, Brush);

Nullstone.AutoProperties(Brush, [
    Brush.ChangedProperty
]);

//#endregion

Brush.Instance.SetupBrush = function (ctx, bounds) {
    /// <param name="ctx" type="CanvasRenderingContext2D">HTML5 Canvas Context</param>
    /// <param name="bounds" type="Rect"></param>
};
Brush.Instance.ToHtml5Object = function () {
    return this._Brush;
};

Brush.Instance._OnSubPropertyChanged = function (sender, args) {
    var newArgs = {
        Property: Brush.ChangedProperty,
        OldValue: false,
        NewValue: true
    };
    this.PropertyChanged.Raise(this, newArgs);
    this._OnSubPropertyChanged$DependencyObject(sender, args);
};

Nullstone.FinishCreate(Brush);
//#endregion