/// <reference path="../Runtime/Nullstone.js" />
/// <reference path="../Core/DependencyObject.js"/>
/// CODE
/// <reference path="PropertyValueProviders.js"/>

//#region TextElement
var TextElement = Nullstone.Create("TextElement", DependencyObject);

TextElement.Instance.Init = function () {
    this.Init$DependencyObject();
    this._Providers[_PropertyPrecedence.Inherited] = new _InheritedPropertyValueProvider(this, _PropertyPrecedence.Inherited);
    this._Font = new Font();
    this._UpdateFont(true);
};

//#region Dependency Properties

TextElement.ForegroundProperty = DependencyProperty.RegisterFull("Foreground", function () { return Brush; }, TextElement, undefined, { GetValue: function () { return new SolidColorBrush(new Color(0, 0, 0)); } });
TextElement.Instance.GetForeground = function () {
    return this.$GetValue(TextElement.ForegroundProperty);
};
TextElement.Instance.SetForeground = function (value) {
    this.$SetValue(TextElement.ForegroundProperty, value);
};

TextElement.FontFamilyProperty = DependencyProperty.Register("FontFamily", function () { return String; }, TextElement, Font.DEFAULT_FAMILY);
TextElement.Instance.GetFontFamily = function () {
    return this.$GetValue(TextElement.FontFamilyProperty);
};
TextElement.Instance.SetFontFamily = function (value) {
    this.$SetValue(TextElement.FontFamilyProperty, value);
};

TextElement.FontStretchProperty = DependencyProperty.Register("FontStretch", function () { return String; }, TextElement, Font.DEFAULT_STRETCH);
TextElement.Instance.GetFontStretch = function () {
    return this.$GetValue(TextElement.FontStretchProperty);
};
TextElement.Instance.SetFontStretch = function (value) {
    this.$SetValue(TextElement.FontStretchProperty, value);
};

TextElement.FontStyleProperty = DependencyProperty.Register("FontStyle", function () { return String; }, TextElement, Font.DEFAULT_STYLE);
TextElement.Instance.GetFontStyle = function () {
    return this.$GetValue(TextElement.FontStyleProperty);
};
TextElement.Instance.SetFontStyle = function (value) {
    this.$SetValue(TextElement.FontStyleProperty, value);
};

TextElement.FontWeightProperty = DependencyProperty.Register("FontWeight", function () { return String; }, TextElement, Font.DEFAULT_WEIGHT);
TextElement.Instance.GetFontWeight = function () {
    return this.$GetValue(TextElement.FontWeightProperty);
};
TextElement.Instance.SetFontWeight = function (value) {
    this.$SetValue(TextElement.FontWeightProperty, value);
};

TextElement.FontSizeProperty = DependencyProperty.Register("FontSize", function () { return String; }, TextElement, Font.DEFAULT_SIZE);
TextElement.Instance.GetFontSize = function () {
    return this.$GetValue(TextElement.FontSizeProperty);
};
TextElement.Instance.SetFontSize = function (value) {
    this.$SetValue(TextElement.FontSizeProperty, value);
};

TextElement.LanguageProperty = DependencyProperty.Register("Language", function () { return String; }, TextElement);
TextElement.Instance.GetLanguage = function () {
    return this.$GetValue(TextElement.LanguageProperty);
};
TextElement.Instance.SetLanguage = function (value) {
    this.$SetValue(TextElement.LanguageProperty, value);
};

TextElement.TextDecorationsProperty = DependencyProperty.Register("TextDecorations", function () { return new Enum(TextDecorations); }, TextElement, TextDecorations.None);
TextElement.Instance.GetTextDecorations = function () {
    return this.$GetValue(TextElement.TextDecorationsProperty);
};
TextElement.Instance.SetTextDecorations = function (value) {
    this.$SetValue(TextElement.TextDecorationsProperty, value);
};

TextElement.FontResourceProperty = DependencyProperty.Register("FontResource", function () { return Object; }, TextElement);
TextElement.Instance.GetFontResource = function () {
    return this.$GetValue(TextElement.FontResourceProperty);
};
TextElement.Instance.SetFontResource = function (value) {
    this.$SetValue(TextElement.FontResourceProperty, value);
};

//#endregion

//#region TextAttributes Methods

TextElement.Instance.GetBackground = function (selected) { return null; }
//TextElement.Instance.GetForeground (DP)
TextElement.Instance.GetFont = function () { return this._Font; };
TextElement.Instance.GetDirection = function () { return FlowDirection.LeftToRight; };
//TextElement.Instance.GetTextDecorations (DP)

//#endregion

TextElement.Instance._SerializeText = function (str) { return str; };
TextElement.Instance._UpdateFont = function (force) {
    var changed = false;

    changed = changed || this._Font.SetFamily(this.GetFontFamily());
    changed = changed || this._Font.SetStretch(this.GetFontStretch());
    changed = changed || this._Font.SetStyle(this.GetFontStyle());
    changed = changed || this._Font.SetWeight(this.GetFontWeight());
    changed = changed || this._Font.SetSize(this.GetFontSize());

    return changed || force;
};
TextElement.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== TextElement) {
        this._OnPropertyChanged$DependencyObject(args, error);
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

Nullstone.FinishCreate(TextElement);
//#endregion