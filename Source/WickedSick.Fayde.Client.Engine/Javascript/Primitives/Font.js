/// <reference path="../Runtime/Nullstone.js" />
/// CODE

(function (namespace) {
    var Font = Nullstone.Create("Font");

    Font.Instance.Init = function () {
        this._Family = Font.DEFAULT_FAMILY;
        this._Stretch = Font.DEFAULT_STRETCH;
        this._Style = Font.DEFAULT_STYLE;
        this._Weight = Font.DEFAULT_WEIGHT;
        this._Size = Font.DEFAULT_SIZE;
    };
    Nullstone.Property(Font, "Family", {
        get: function () { return this._Family; },
        set: function (value) {
            if (this._Family == value)
                return;
            this._Family = value;
            this._PurgeCache();
        }
    });
    Nullstone.Property(Font, "Stretch", {
        get: function () { return this._Stretch; },
        set: function (value) {
            if (this._Stretch == value)
                return;
            this._Stretch = value;
            this._PurgeCache();
        }
    });
    Nullstone.Property(Font, "Style", {
        get: function () { return this._Style; },
        set: function (value) {
            if (this._Style == value)
                return;
            this._Style = value;
            this._PurgeCache();
        }
    });
    Nullstone.Property(Font, "Weight", {
        get: function () { return this._Weight; },
        set: function (value) {
            if (this._Weight == value)
                return;
            this._Weight = value;
            this._PurgeCache();
        }
    });
    Nullstone.Property(Font, "Size", {
        get: function () { return this._Size; },
        set: function (value) {
            if (this._Size == value)
                return;
            this._Size = value;
            this._PurgeCache();
        }
    });
    Nullstone.Property(Font, "IsChanged", {
        get: function () {
            return this._CachedTranslation == null;
        }
    });

    Font.Instance.GetActualHeight = function () {
        return Surface._MeasureHeight(this);
    };

    Font.Instance._Descender = function () { return 0.0; }; //most likely removable
    Font.Instance._Ascender = function () { return 0.0; }; //most likely removable
    Font.Instance._PurgeCache = function () {
        delete this._CachedHeight;
        delete this._CachedTranslation;
    };

    Font.Instance.ToHtml5Object = function () {
        if (!this._CachedTranslation)
            this._CachedTranslation = this._BuildTranslation();
        return this._CachedTranslation;
    };
    Font.Instance._BuildTranslation = function () {
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

    Font.DEFAULT_FAMILY = "Segoe UI, Lucida Sans Unicode, Verdana";
    Font.DEFAULT_STRETCH = FontStretch.Normal;
    Font.DEFAULT_STYLE = FontStyle.Normal;
    Font.DEFAULT_WEIGHT = Fayde.FontWeight.Normal;
    Font.DEFAULT_SIZE = 14;

    namespace.Font = Nullstone.FinishCreate(Font);
})(window);