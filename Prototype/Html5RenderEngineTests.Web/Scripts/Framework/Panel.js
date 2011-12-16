/// <reference path="Primitives.js" />
/// <reference path="DependencyObject.js" />
/// <reference path="FrameworkElement.js" />

Panel.BackgroundProperty = DependencyProperty.Register("Background", Panel);
Panel._CreateDefaultChildren = {
    GetValue: function (propd, obj) {
        var col = new UIElementCollection();
        col._IsSecondaryParent = true;
        if (obj)
            obj._SetSubtreeObject(col);
        return col;
    }
};
Panel.ChildrenProperty = DependencyProperty.Register("Children", Panel, Panel._CreateDefaultChildren);
Panel.IsItemsHostProperty = DependencyProperty.Register("IsItemsHost", Panel, false);

Panel.prototype = new FrameworkElement();
Panel.prototype.constructor = Panel;
function Panel() {
    FrameworkElement.call(this);
}

Panel.prototype.GetBackground = function () {
    return this.GetValue(Panel.BackgroundProperty);
};
Panel.prototype.SetBackground = function (value) {
    this.SetValue(Panel.BackgroundProperty, value);
};

Panel.prototype.GetChildren = function () {
    return this.GetValue(Panel.ChildrenProperty);
};
Panel.prototype.SetChildren = function (value) {
    this.SetValue(Panel.ChildrenProperty, value);
};

Panel.prototype.GetIsItemsHost = function () {
    return this.GetValue(Panel.IsItemsHostProperty);
};
Panel.prototype.SetIsItemsHost = function (value) {
    this.SetValue(Panel.IsItemsHostProperty, value);
};
Panel.prototype.IsLayoutContainer = function () { return true; };
Panel.prototype.IsContainer = function () { return true; };
Panel.prototype._MeasureOverrideWithEror = function (availableSize, error) {
    var result = new Size(0, 0);
    return result;
};