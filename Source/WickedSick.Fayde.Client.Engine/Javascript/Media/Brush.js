/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// CODE

//#region Brush

function Brush() {
    if (!Nullstone.IsReady)
        return;
    this.$super();
};
Nullstone.Extend(Brush, "Brush", DependencyObject);

//#region Dependency Properties

Brush.ChangedProperty = DependencyProperty.Register("Changed", function () { return Boolean; }, Brush);
Brush.prototype.GetChanged = function () {
    ///<returns type="Boolean"></returns>
    return this.GetValue(Brush.ChangedProperty);
};
Brush.prototype.SetChanged = function (value) {
    ///<param name="value" type="Boolean"></param>
    this.SetValue(Brush.ChangedProperty, value);
};

//#endregion

Brush.prototype._Translate = function (ctx) {
    AbstractMethod("Brush._Translate()");
};

Brush.prototype._OnSubPropertyChanged = function (sender, args) {
    var newArgs = {
        Property: Brush.ChangedProperty,
        OldValue: false,
        NewValue: true
    };
    this.PropertyChanged.Raise(this, newArgs);
    this._OnSubPropertyChanged$super(sender, args);
};

//#endregion
