/// <reference path="DependencyObject.js"/>

TextElement.prototype = new DependencyObject;
TextElement.prototype.constructor = TextElement;
function TextElement() {
    DependencyObject.call(this);
}

TextElement.ForegroundProperty = DependencyProperty.Register("Foreground", TextElement);
TextElement.prototype.GetForeground = function () {
    return this.GetValue(TextElement.ForegroundProperty);
};
TextElement.prototype.SetForeground = function (value) {
    this.SetValue(TextElement.ForegroundProperty, value);
};

TextElement.FontFamilyProperty = DependencyProperty.Register("FontFamily", TextElement);
TextElement.prototype.GetFontFamily = function () {
    return this.GetValue(TextElement.FontFamilyProperty);
};
TextElement.prototype.SetFontFamily = function (value) {
    this.SetValue(TextElement.FontFamilyProperty, value);
};

TextElement.FontStretchProperty = DependencyProperty.Register("FontStretch", TextElement);
TextElement.prototype.GetFontStretch = function () {
    return this.GetValue(TextElement.FontStretchProperty);
};
TextElement.prototype.SetFontStretch = function (value) {
    this.SetValue(TextElement.FontStretchProperty, value);
};

TextElement.FontStyleProperty = DependencyProperty.Register("FontStyle", TextElement);
TextElement.prototype.GetFontStyle = function () {
    return this.GetValue(TextElement.FontStyleProperty);
};
TextElement.prototype.SetFontStyle = function (value) {
    this.SetValue(TextElement.FontStyleProperty, value);
};

TextElement.FontWeightProperty = DependencyProperty.Register("FontWeight", TextElement);
TextElement.prototype.GetFontWeight = function () {
    return this.GetValue(TextElement.FontWeightProperty);
};
TextElement.prototype.SetFontWeight = function (value) {
    this.SetValue(TextElement.FontWeightProperty, value);
};

TextElement.FontSizeProperty = DependencyProperty.Register("FontSize", TextElement);
TextElement.prototype.GetFontSize = function () {
    return this.GetValue(TextElement.FontSizeProperty);
};
TextElement.prototype.SetFontSize = function (value) {
    this.SetValue(TextElement.FontSizeProperty, value);
};

TextElement.LanguageProperty = DependencyProperty.Register("Language", TextElement);
TextElement.prototype.GetLanguage = function () {
    return this.GetValue(TextElement.LanguageProperty);
};
TextElement.prototype.SetLanguage = function (value) {
    this.SetValue(TextElement.LanguageProperty, value);
};

TextElement.TextDecorationsProperty = DependencyProperty.Register("TextDecorations", TextElement);
TextElement.prototype.GetTextDecorations = function () {
    return this.GetValue(TextElement.TextDecorationsProperty);
};
TextElement.prototype.SetTextDecorations = function (value) {
    this.SetValue(TextElement.TextDecorationsProperty, value);
};

TextElement.FontResourceProperty = DependencyProperty.Register("FontResource", TextElement);
TextElement.prototype.GetFontResource = function () {
    return this.GetValue(TextElement.FontResourceProperty);
};
TextElement.prototype.SetFontResource = function (value) {
    this.SetValue(TextElement.FontResourceProperty, value);
};


///////////////////////////////////////////
Inline.prototype = new TextElement;
Inline.prototype.constructor = Inline;
function Inline() {
    TextElement.call(this);
}


Run.prototype = new Inline;
Run.prototype.constructor = Run;
function Run() {
    Inline.call(this);
}

Run.FlowDirectionProperty = DependencyProperty.Register("FlowDirection", Run);
Run.prototype.GetFlowDirection = function () {
    return this.GetValue(Run.FlowDirectionProperty);
};
Run.prototype.SetFlowDirection = function (value) {
    this.SetValue(Run.FlowDirectionProperty, value);
};