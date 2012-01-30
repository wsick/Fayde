/// <reference path="DependencyObject.js"/>
/// CODE
/// <reference path="PropertyValueProviders.js"/>

//#region TextElement

function TextElement() {
    DependencyObject.call(this);

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

//#region Inline

function Inline() {
    TextElement.call(this);
    this._Autogen = false;
}
Inline.InheritFrom(TextElement);

Inline.prototype.Equals = function (inline) {
    if (this.GetFontFamily() != inline.GetFontFamily())
        return false;
    if (this.GetFontSize() != inline.GetFontSize())
        return false;
    if (this.GetFontStyle() != inline.GetFontStyle())
        return false;
    if (this.GetFontWeight() != inline.GetFontWeight())
        return false;
    if (this.GetFontStretch() != inline.GetFontStretch())
        return false;
    if (this.GetTextDecorations() != inline.GetTextDecorations())
        return false;
    if (this.GetForeground() != inline.GetForeground()) //TODO: Equals?
        return false;
    return true;
};

Inline.prototype._GetAutogenerated = function () {
    return this._Autogen;
};
Inline.prototype._SetAutogenerated = function (value) {
    this._Autogen = value;
};

//#endregion

//#region Run

function Run() {
    Inline.call(this);
}
Run.InheritFrom(Inline);

//#region DEPENDENCY PROPERTIES

Run.FlowDirectionProperty = DependencyProperty.Register("FlowDirection", function () { return Number; }, Run, FlowDirection.LeftToRight);
Run.prototype.GetFlowDirection = function () {
    return this.GetValue(Run.FlowDirectionProperty);
};
Run.prototype.SetFlowDirection = function (value) {
    this.SetValue(Run.FlowDirectionProperty, value);
};

Run.TextProperty = DependencyProperty.Register("Text", function () { return String; }, Run);
Run.prototype.GetText = function () {
    return this.GetValue(Run.TextProperty);
};
Run.prototype.SetText = function (value) {
    this.SetValue(Run.TextProperty, value);
};

//#endregion

Run.prototype._SerializeText = function (str) {
    var t = this.GetText();
    if (t != null)
        return str.concat(t);
    return str;
};

//#endregion

//#region Span

function Span() {
    Inline.call(this);
}
Span.InheritFrom(Inline);

//#region DEPENDENCY PROPERTIES

Span._CreateInlineCollection = function (obj) {
    var inlines = new InlineCollection();
    if (obj instanceof Hyperlink)
        inlines._SetIsForHyperlink();
    return inlines;
};
Span.InlinesProperty = DependencyProperty.RegisterFull("Inlines", function () { return InlineCollection; }, Span, null, { GetValue: function (obj) { return Span._CreateInlineCollection(obj); } });
Span.prototype.GetInlines = function () {
    return this.GetValue(Span.InlinesProperty);
};

//#endregion

Span.prototype._SerializeText = function (str) {
    var inlines = this.GetInlines();
    var count = inlines.GetCount();
    for (var i = 0; i < count; i++) {
        str = inlines.GetValueAt(i)._SerializeText(str);
    }
    return str;
};
Span.prototype._OnCollectionChanged = function (sender, args) {
    if (this._PropertyHasValueNoAutoCreate(Span.InlinesProperty, sender)) {
        if (args.Action === CollectionChangedArgs.Action.Add)
            this._Providers[_PropertyPrecedence.Inherited].PropagateInheritedPropertiesOnAddingToTree(args.NewValue);
        this._NotifyLayoutContainerOnCollectionChanged(sender, args);
    } else {
        Inline.prototype._OnCollectionChanged.call(this, sender, args);
    }
};

//#endregion

//#region LineBreak

function LineBreak() {
    Inline.call(this);
}
LineBreak.InheritFrom(Inline);

//#endregion

//#region Hyperlink

function Hyperlink() {
    Span.call(this);
}
Hyperlink.InheritFrom(Span);

//#endregion

//#region Block

function Block() {
    TextElement.call(this);
}
Block.InheritFrom(TextElement);

//#region DEPENDENCY PROPERTIES

Block.InlinesProperty = DependencyProperty.Register("Inlines", function () { return InlineCollection; }, Block);
Block.prototype.GetInlines = function () {
    return this.GetValue(Block.InlinesProperty);
};
Block.prototype.SetInlines = function (value) {
    this.SetValue(Block.InlinesProperty, value);
};

//#endregion

//#endregion

//#region Paragraph

function Paragraph() {
    Block.call(this);
}
Paragraph.InheritFrom(Block);

//#endregion

//#region Section

function Section() {
    TextElement.call(this);
}
Section.InheritFrom(TextElement);

//#region DEPENDENCY PROPERTIES

Section.BlocksProperty = DependencyProperty.Register("Blocks", function () { return Object; }, Section);
Section.prototype.GetBlocks = function () {
    return this.GetValue(Section.BlocksProperty);
};
Section.prototype.SetBlocks = function (value) {
    this.SetValue(Section.BlocksProperty, value);
};

//#endregion

//#endregion