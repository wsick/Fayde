/// <reference path="../Runtime/RefObject.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// CODE
/// <reference path="PropertyValueProviders.js"/>

//#region TextElement

function TextElement() {
    DependencyObject.call(this);
    if (!IsDocumentReady())
        return;

    this._Providers[_PropertyPrecedence.Inherited] = new _InheritedPropertyValueProvider(this, _PropertyPrecedence.Inherited);
    this._Font = new Font();
    this._UpdateFont(true);
}
TextElement.InheritFrom(DependencyObject);

//#region DEPENDENCY PROPERTIES

TextElement.ForegroundProperty = DependencyProperty.RegisterFull("Foreground", function () { return Brush; }, TextElement, null, { GetValue: function () { return new SolidColorBrush(new Color(0, 0, 0)); } });
TextElement.prototype.GetForeground = function () {
    return this.GetValue(TextElement.ForegroundProperty);
};
TextElement.prototype.SetForeground = function (value) {
    this.SetValue(TextElement.ForegroundProperty, value);
};

TextElement.FontFamilyProperty = DependencyProperty.Register("FontFamily", function () { return String; }, TextElement, Font.DEFAULT_FAMILY);
TextElement.prototype.GetFontFamily = function () {
    return this.GetValue(TextElement.FontFamilyProperty);
};
TextElement.prototype.SetFontFamily = function (value) {
    this.SetValue(TextElement.FontFamilyProperty, value);
};

TextElement.FontStretchProperty = DependencyProperty.Register("FontStretch", function () { return String; }, TextElement, Font.DEFAULT_STRETCH);
TextElement.prototype.GetFontStretch = function () {
    return this.GetValue(TextElement.FontStretchProperty);
};
TextElement.prototype.SetFontStretch = function (value) {
    this.SetValue(TextElement.FontStretchProperty, value);
};

TextElement.FontStyleProperty = DependencyProperty.Register("FontStyle", function () { return String; }, TextElement, Font.DEFAULT_STYLE);
TextElement.prototype.GetFontStyle = function () {
    return this.GetValue(TextElement.FontStyleProperty);
};
TextElement.prototype.SetFontStyle = function (value) {
    this.SetValue(TextElement.FontStyleProperty, value);
};

TextElement.FontWeightProperty = DependencyProperty.Register("FontWeight", function () { return String; }, TextElement, Font.DEFAULT_WEIGHT);
TextElement.prototype.GetFontWeight = function () {
    return this.GetValue(TextElement.FontWeightProperty);
};
TextElement.prototype.SetFontWeight = function (value) {
    this.SetValue(TextElement.FontWeightProperty, value);
};

TextElement.FontSizeProperty = DependencyProperty.Register("FontSize", function () { return String; }, TextElement, Font.DEFAULT_SIZE);
TextElement.prototype.GetFontSize = function () {
    return this.GetValue(TextElement.FontSizeProperty);
};
TextElement.prototype.SetFontSize = function (value) {
    this.SetValue(TextElement.FontSizeProperty, value);
};

TextElement.LanguageProperty = DependencyProperty.Register("Language", function () { return String; }, TextElement);
TextElement.prototype.GetLanguage = function () {
    return this.GetValue(TextElement.LanguageProperty);
};
TextElement.prototype.SetLanguage = function (value) {
    this.SetValue(TextElement.LanguageProperty, value);
};

TextElement.TextDecorationsProperty = DependencyProperty.Register("TextDecorations", function () { return Number; }, TextElement, TextDecorations.None);
TextElement.prototype.GetTextDecorations = function () {
    return this.GetValue(TextElement.TextDecorationsProperty);
};
TextElement.prototype.SetTextDecorations = function (value) {
    this.SetValue(TextElement.TextDecorationsProperty, value);
};

TextElement.FontResourceProperty = DependencyProperty.Register("FontResource", function () { return Object; }, TextElement);
TextElement.prototype.GetFontResource = function () {
    return this.GetValue(TextElement.FontResourceProperty);
};
TextElement.prototype.SetFontResource = function (value) {
    this.SetValue(TextElement.FontResourceProperty, value);
};

//#endregion

//#region TextAttributes Methods

TextElement.prototype.GetBackground = function (selected) { return null; }
//TextElement.prototype.GetForeground (DP)
TextElement.prototype.GetFont = function () { return this._Font; };
TextElement.prototype.GetDirection = function () { return FlowDirection.LeftToRight; };
//TextElement.prototype.GetTextDecorations (DP)

//#endregion

TextElement.prototype._SerializeText = function (str) { return str; };
TextElement.prototype._UpdateFont = function (force) {
    var changed = false;

    changed = changed || this._Font.SetFamily(this.GetFontFamily());
    changed = changed || this._Font.SetStretch(this.GetFontStretch());
    changed = changed || this._Font.SetStyle(this.GetFontStyle());
    changed = changed || this._Font.SetWeight(this.GetFontWeight());
    changed = changed || this._Font.SetSize(this.GetFontSize());

    return changed || force;
};
TextElement.prototype._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== TextElement) {
        DependencyObject.prototype._OnPropertyChanged.call(this, args, error);
        return;
    }

    if (args.Property == TextElement.FontFamilyProperty
        || args.Property == TextElement.FontSizeProperty
        || args.Property == TextElement.FontStretchProperty
        || args.Property == TextElement.FontStyleProperty
        || args.Property == TextElement.FontWeightProperty) {
        this._UpdateFont(false);
    }
    this.PropertyChanged.Raise(this, args);
};

//#endregion
