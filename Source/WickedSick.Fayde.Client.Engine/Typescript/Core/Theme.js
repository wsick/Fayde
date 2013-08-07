/// CODE
/// <reference path="ResourceDictionary.ts" />
/// <reference path="../Markup/JsonParser.ts" />
var Fayde;
(function (Fayde) {
    var Theme = (function () {
        function Theme(name, json) {
            this.Name = name;
            this.Json = json;
        }
        Object.defineProperty(Theme.prototype, "ResourceDictionary", {
            get: function () {
                if (!this._ResourceDictionary) {
                    this._ResourceDictionary = new Fayde.ResourceDictionary();
                    Fayde.JsonParser.ParseResourceDictionary(this._ResourceDictionary, this.Json);
                }
                return this._ResourceDictionary;
            },
            enumerable: true,
            configurable: true
        });
        return Theme;
    })();
    Fayde.Theme = Theme;
})(Fayde || (Fayde = {}));
//# sourceMappingURL=Theme.js.map
