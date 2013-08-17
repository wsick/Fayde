/// <reference path="../Runtime/Nullstone.ts" />
/// CODE

var FontStyle = {
    Normal: "normal",
    Italic: "italic",
    Oblique: "oblique"
};
var FontStretch = {
    UltraCondensed: "ultra-condensed",
    ExtraCondensed: "extra-condensed",
    Condensed: "condensed",
    SemiCondensed: "semi-condensed",
    Normal: "normal",
    SemiExpanded: "semi-expanded",
    Expanded: "expanded",
    ExtraExpanded: "extra-expanded",
    UltraExpanded: "ultra-expanded"
};
var FontWeight = {
    Thin: 100,
    ExtraLight: 200,
    Light: 300,
    Normal: 400,
    Medium: 500,
    SemiBold: 600,
    Bold: 700,
    ExtraBold: 800,
    Black: 900,
    ExtraBlack: 950
};
class Font {
    static DEFAULT_FAMILY = "Segoe UI, Lucida Sans Unicode, Verdana";
    static DEFAULT_STRETCH = FontStretch.Normal;
    static DEFAULT_STYLE = FontStyle.Normal;
    static DEFAULT_WEIGHT = FontWeight.Normal;
    static DEFAULT_SIZE = 14;

    private _Family = Font.DEFAULT_FAMILY;
    private _Stretch = Font.DEFAULT_STRETCH;
    private _Style = Font.DEFAULT_STYLE;
    private _Weight = Font.DEFAULT_WEIGHT;
    private _Size = Font.DEFAULT_SIZE;

    private _CachedTranslation: string;
    private _CachedHeight: number;

    get Family() { return this._Family; }
    set Family(value) {
        if (this._Family == value)
            return;
        this._Family = value;
        this._PurgeCache();
    }

    get Stretch() { return this._Stretch; }
    set Stretch(value) {
        if (this._Stretch == value)
            return;
        this._Stretch = value;
        this._PurgeCache();
    }

    get Style() { return this._Style; }
    set Style(value) {
        if (this._Style == value)
            return;
        this._Style = value;
        this._PurgeCache();
    }

    get Weight() { return this._Weight; }
    set Weight(value) {
        if (this._Weight == value)
            return;
        this._Weight = value;
        this._PurgeCache();
    }

    get Size() { return this._Size; }
    set Size(value) {
        if (this._Size == value)
            return;
        this._Size = value;
        this._PurgeCache();
    }

    get IsChanged() { return this._CachedTranslation == null; }

    GetActualHeight() { return Font._MeasureHeight(this); }

    _Descender() { return 0.0; } //most likely removable
    _Ascender() { return 0.0; } //most likely removable
    private _PurgeCache() {
        this._CachedHeight = undefined;
        this._CachedTranslation = undefined;
    }

    ToHtml5Object(): string {
        if (!this._CachedTranslation)
            this._CachedTranslation = this._BuildTranslation();
        return this._CachedTranslation;
    }
    private _BuildTranslation(): string {
        //Format: font-style font-variant font-weight font-size/line-height font-family
        //Font Styles: normal, italic, oblique
        //Font Variants: normal, small-caps
        //Font Weights: normal, bold, bolder, lighter, 100, 200, 300, 400, 500, 600, 700, 800, 900
        var s = "";
        s += this.Style.toString() + " ";
        s += "normal ";
        s += this.Weight.toString() + " ";
        s += this.Size + "px ";
        s += this.Family.toString();
        return s;
    }

    private static _MeasureHeight(font: Font) {
        if (font._CachedHeight)
            return font._CachedHeight;

        var body = document.getElementsByTagName("body")[0];
        var dummy = document.createElement("div");
        var dummyText = document.createTextNode("M");
        dummy.appendChild(dummyText);
        dummy.setAttribute("style", "font: " + font.ToHtml5Object() + ";");
        body.appendChild(dummy);
        var result = dummy.offsetHeight;
        body.removeChild(dummy);

        font._CachedHeight = result;
        return result;
    }
}
Fayde.RegisterType(Font, {
	Name: "Font",
	Namespace: "window",
	XmlNamespace: Fayde.XMLNSX
});