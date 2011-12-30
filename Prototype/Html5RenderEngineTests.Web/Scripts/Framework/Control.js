/// <reference path="FrameworkElement.js" />

Control.BackgroundProperty = DependencyProperty.Register("Background", Control);
Control.prototype.GetBackground = function () {
    return this.GetValue(Control.BackgroundProperty);
};
Control.prototype.SetBackground = function (value) {
    this.SetValue(Control.BackgroundProperty, value);
};

Control.BorderBrushProperty = DependencyProperty.Register("BorderBrush", Control);
Control.prototype.GetBorderBrush = function () {
    return this.GetValue(Control.BorderBrushProperty);
};
Control.prototype.SetBorderBrush = function (value) {
    this.SetValue(Control.BorderBrushProperty, value);
};

Control.BorderThicknessProperty = DependencyProperty.Register("BorderThickness", Control);
Control.prototype.GetBorderThickness = function () {
    return this.GetValue(Control.BorderThicknessProperty);
};
Control.prototype.SetBorderThickness = function (value) {
    this.SetValue(Control.BorderThicknessProperty, value);
};

Control.FontFamilyProperty = DependencyProperty.Register("FontFamily", Control);
Control.prototype.GetFontFamily = function () {
    return this.GetValue(Control.FontFamilyProperty);
};
Control.prototype.SetFontFamily = function (value) {
    this.SetValue(Control.FontFamilyProperty, value);
};

Control.FontSizeProperty = DependencyProperty.Register("FontSize", Control);
Control.prototype.GetFontSize = function () {
    return this.GetValue(Control.FontSizeProperty);
};
Control.prototype.SetFontSize = function (value) {
    this.SetValue(Control.FontSizeProperty, value);
};

Control.FontStretchProperty = DependencyProperty.Register("FontStretch", Control);
Control.prototype.GetFontStretch = function () {
    return this.GetValue(Control.FontStretchProperty);
};
Control.prototype.SetFontStretch = function (value) {
    this.SetValue(Control.FontStretchProperty, value);
};

Control.FontStyleProperty = DependencyProperty.Register("FontStyle", Control);
Control.prototype.GetFontStyle = function () {
    return this.GetValue(Control.FontStyleProperty);
};
Control.prototype.SetFontStyle = function (value) {
    this.SetValue(Control.FontStyleProperty, value);
};

Control.FontWeightProperty = DependencyProperty.Register("FontWeight", Control);
Control.prototype.GetFontWeight = function () {
    return this.GetValue(Control.FontWeightProperty);
};
Control.prototype.SetFontWeight = function (value) {
    this.SetValue(Control.FontWeightProperty, value);
};

Control.ForegroundProperty = DependencyProperty.Register("Foreground", Control);
Control.prototype.GetForeground = function () {
    return this.GetValue(Control.ForegroundProperty);
};
Control.prototype.SetForeground = function (value) {
    this.SetValue(Control.ForegroundProperty, value);
};

Control.HorizontalContentAlignmentProperty = DependencyProperty.Register("HorizontalContentAlignment", Control);
Control.prototype.GetHorizontalContentAlignment = function () {
    return this.GetValue(Control.HorizontalContentAlignmentProperty);
};
Control.prototype.SetHorizontalContentAlignment = function (value) {
    this.SetValue(Control.HorizontalContentAlignmentProperty, value);
};

Control.IsEnabledProperty = DependencyProperty.Register("IsEnabled", Control, true);
Control.prototype.GetIsEnabled = function () {
    return this.GetValue(Control.IsEnabledProperty);
};
Control.prototype.SetIsEnabled = function (value) {
    this.SetValue(Control.IsEnabledProperty, value);
};

//Control.IsTemplateItemProperty;
//Control.IsTabStopProperty;
//Control.PaddingProperty;
//Control.TabIndexProperty;
//Control.TabNavigationProperty;
//Control.TemplateProperty;
//Control.VerticalContentAlignmentProperty;
//Control.DefaultStyleKeyProperty;
Control.prototype = new FrameworkElement;
Control.prototype.constructor = Control;
function Control() {
    FrameworkElement.call(this);
}