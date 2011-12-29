/// <reference path="FrameworkElement.js"/>

TextBlock.prototype = new FrameworkElement;
TextBlock.prototype.constructor = TextBlock;
function TextBlock() {
    FrameworkElement.call(this);
}

TextBlock.ForegroundProperty = DependencyProperty.Register("Foreground", TextBlock);
TextBlock.prototype.GetForeground = function () {
    return this.GetValue(TextBlock.ForegroundProperty);
};
TextBlock.prototype.SetForeground = function (value) {
    this.SetValue(TextBlock.ForegroundProperty, value);
};

TextBlock.FontFamilyProperty = DependencyProperty.Register("FontFamily", TextBlock);
TextBlock.prototype.GetFontFamily = function () {
    return this.GetValue(TextBlock.FontFamilyProperty);
};
TextBlock.prototype.SetFontFamily = function (value) {
    this.SetValue(TextBlock.FontFamilyProperty, value);
};

TextBlock.FontStretchProperty = DependencyProperty.Register("FontStretch", TextBlock);
TextBlock.prototype.GetFontStretch = function () {
    return this.GetValue(TextBlock.FontStretchProperty);
};
TextBlock.prototype.SetFontStretch = function (value) {
    this.SetValue(TextBlock.FontStretchProperty, value);
};

TextBlock.FontStyleProperty = DependencyProperty.Register("FontStyle", TextBlock);
TextBlock.prototype.GetFontStyle = function () {
    return this.GetValue(TextBlock.FontStyleProperty);
};
TextBlock.prototype.SetFontStyle = function (value) {
    this.SetValue(TextBlock.FontStyleProperty, value);
};

TextBlock.FontWeightProperty = DependencyProperty.Register("FontWeight", TextBlock);
TextBlock.prototype.GetFontWeight = function () {
    return this.GetValue(TextBlock.FontWeightProperty);
};
TextBlock.prototype.SetFontWeight = function (value) {
    this.SetValue(TextBlock.FontWeightProperty, value);
};

TextBlock.FontSizeProperty = DependencyProperty.Register("FontSize", TextBlock);
TextBlock.prototype.GetFontSize = function () {
    return this.GetValue(TextBlock.FontSizeProperty);
};
TextBlock.prototype.SetFontSize = function (value) {
    this.SetValue(TextBlock.FontSizeProperty, value);
};

TextBlock.TextDecorationsProperty = DependencyProperty.Register("TextDecorations", TextBlock);
TextBlock.prototype.GetTextDecorations = function () {
    return this.GetValue(TextBlock.TextDecorationsProperty);
};
TextBlock.prototype.SetTextDecorations = function (value) {
    this.SetValue(TextBlock.TextDecorationsProperty, value);
};

TextBlock.FontResourceProperty = DependencyProperty.Register("FontResource", TextBlock);
TextBlock.prototype.GetFontResource = function () {
    return this.GetValue(TextBlock.FontResourceProperty);
};
TextBlock.prototype.SetFontResource = function (value) {
    this.SetValue(TextBlock.FontResourceProperty, value);
};