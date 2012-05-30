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
TextElement.FontFamilyProperty = DependencyProperty.Register("FontFamily", function () { return String; }, TextElement, Font.DEFAULT_FAMILY);
TextElement.FontStretchProperty = DependencyProperty.Register("FontStretch", function () { return String; }, TextElement, Font.DEFAULT_STRETCH);
TextElement.FontStyleProperty = DependencyProperty.Register("FontStyle", function () { return String; }, TextElement, Font.DEFAULT_STYLE);
TextElement.FontWeightProperty = DependencyProperty.Register("FontWeight", function () { return String; }, TextElement, Font.DEFAULT_WEIGHT);
TextElement.FontSizeProperty = DependencyProperty.Register("FontSize", function () { return String; }, TextElement, Font.DEFAULT_SIZE);
TextElement.LanguageProperty = DependencyProperty.Register("Language", function () { return String; }, TextElement);
TextElement.TextDecorationsProperty = DependencyProperty.Register("TextDecorations", function () { return new Enum(TextDecorations); }, TextElement, TextDecorations.None);
TextElement.FontResourceProperty = DependencyProperty.Register("FontResource", function () { return Object; }, TextElement);

Nullstone.AutoProperties(TextElement, [
    TextElement.ForegroundProperty,
    TextElement.FontFamilyProperty,
    TextElement.FontStretchProperty,
    TextElement.FontStyleProperty,
    TextElement.FontWeightProperty,
    TextElement.FontSizeProperty,
    TextElement.LanguageProperty,
    TextElement.TextDecorationsProperty,
    TextElement.FontResourceProperty
]);

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

    changed = changed || this._Font.SetFamily(this.FontFamily);
    changed = changed || this._Font.SetStretch(this.FontStretch);
    changed = changed || this._Font.SetStyle(this.FontStyle);
    changed = changed || this._Font.SetWeight(this.FontWeight);
    changed = changed || this._Font.SetSize(this.FontSize);

    return changed || force;
};
TextElement.Instance._OnPropertyChanged = function (args, error) {
    if (args.Property.OwnerType !== TextElement) {
        this._OnPropertyChanged$DependencyObject(args, error);
        return;
    }

    if (args.Property._ID === TextElement.FontFamilyProperty._ID
        || args.Property._ID === TextElement.FontSizeProperty._ID
        || args.Property._ID === TextElement.FontStretchProperty._ID
        || args.Property._ID === TextElement.FontStyleProperty._ID
        || args.Property._ID === TextElement.FontWeightProperty._ID) {
        this._UpdateFont(false);
    }
    this.PropertyChanged.Raise(this, args);
};

Nullstone.FinishCreate(TextElement);
//#endregion