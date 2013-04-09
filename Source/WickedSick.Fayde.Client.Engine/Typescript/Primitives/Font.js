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
var Font = (function () {
    function Font() {
        this._Family = Font.DEFAULT_FAMILY;
        this._Stretch = Font.DEFAULT_STRETCH;
        this._Style = Font.DEFAULT_STYLE;
        this._Weight = Font.DEFAULT_WEIGHT;
        this._Size = Font.DEFAULT_SIZE;
    }
    Font._TypeName = "Font";
    Font.DEFAULT_FAMILY = "Segoe UI, Lucida Sans Unicode, Verdana";
    Font.DEFAULT_STRETCH = FontStretch.Normal;
    Font.DEFAULT_STYLE = FontStyle.Normal;
    Font.DEFAULT_WEIGHT = FontWeight.Normal;
    Font.DEFAULT_SIZE = 14;
    Object.defineProperty(Font.prototype, "Family", {
        get: function () {
            return this._Family;
        },
        set: function (value) {
            if(this._Family == value) {
                return;
            }
            this._Family = value;
            this._PurgeCache();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Font.prototype, "Stretch", {
        get: function () {
            return this._Stretch;
        },
        set: function (value) {
            if(this._Stretch == value) {
                return;
            }
            this._Stretch = value;
            this._PurgeCache();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Font.prototype, "Style", {
        get: function () {
            return this._Style;
        },
        set: function (value) {
            if(this._Style == value) {
                return;
            }
            this._Style = value;
            this._PurgeCache();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Font.prototype, "Weight", {
        get: function () {
            return this._Weight;
        },
        set: function (value) {
            if(this._Weight == value) {
                return;
            }
            this._Weight = value;
            this._PurgeCache();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Font.prototype, "Size", {
        get: function () {
            return this._Size;
        },
        set: function (value) {
            if(this._Size == value) {
                return;
            }
            this._Size = value;
            this._PurgeCache();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Font.prototype, "IsChanged", {
        get: function () {
            return this._CachedTranslation == null;
        },
        enumerable: true,
        configurable: true
    });
    Font.prototype.GetActualHeight = function () {
        return Font._MeasureHeight(this);
    };
    Font.prototype._Descender = function () {
        return 0.0;
    };
    Font.prototype._Ascender = //most likely removable
    function () {
        return 0.0;
    };
    Font.prototype._PurgeCache = //most likely removable
    function () {
        this._CachedHeight = undefined;
        this._CachedTranslation = undefined;
    };
    Font.prototype.ToHtml5Object = function () {
        if(!this._CachedTranslation) {
            this._CachedTranslation = this._BuildTranslation();
        }
        return this._CachedTranslation;
    };
    Font.prototype._BuildTranslation = function () {
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
    };
    Font._MeasureHeight = function _MeasureHeight(font) {
        if(font._CachedHeight) {
            return font._CachedHeight;
        }
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
    };
    return Font;
})();
//@ sourceMappingURL=Font.js.map
