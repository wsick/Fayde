/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// CODE

//#region Brush
var Brush = Nullstone.Create("Brush", DependencyObject);

Brush.Instance.Init = function () {
    this.Init$DependencyObject();
};

//#region Dependency Properties

Brush.ChangedProperty = DependencyProperty.Register("Changed", function () { return Boolean; }, Brush);
Brush.Instance.GetChanged = function () {
    ///<returns type="Boolean"></returns>
    return this.$GetValue(Brush.ChangedProperty);
};
Brush.Instance.SetChanged = function (value) {
    ///<param name="value" type="Boolean"></param>
    this.$SetValue(Brush.ChangedProperty, value);
};

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