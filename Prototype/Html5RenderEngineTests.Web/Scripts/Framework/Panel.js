/// <reference path="Primitives.js" />
/// <reference path="DependencyObject.js" />
/// <reference path="FrameworkElement.js" />

function Panel() {
    this.GetBackground = function () {
        return this.GetValue(Panel.BackgroundProperty);
    };
    this.SetBackground = function (value) {
        this.SetValue(Panel.BackgroundProperty, value);
    };

    this.GetChildren = function () {
        return this.GetValue(Panel.ChildrenProperty);
    };
    this.SetChildren = function (value) {
        this.SetValue(Panel.ChildrenProperty, value);
    };

    this.GetIsItemsHost = function () {
        return this.GetValue(Panel.IsItemsHostProperty);
    };
    this.SetIsItemsHost = function (value) {
        this.SetValue(Panel.IsItemsHostProperty, value);
    };

    this.IsLayoutContainer = function () { return true; };
    this.IsContainer = function () { return true; };
    this._MeasureOverrideWithEror = function (availableSize, error) {
        var result = new Size(0, 0);
        return result;
    };
}
Panel.BackgroundProperty = DependencyProperty.Register("Background", Panel);
Panel.ChildrenProperty = DependencyProperty.Register("Children", Panel,
    {
        GetValue: function (propd, obj) {
            var col = new UIElementCollection();
            col.SetIsSecondaryParent(true);
            if (obj)
                obj._SetSubtreeObject(col);
            return col;
        }
    });
Panel.IsItemsHostProperty = DependencyProperty.Register("IsItemsHost", Panel, false);
Panel.prototype = new FrameworkElement();