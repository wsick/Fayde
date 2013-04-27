var Fayde;
(function (Fayde) {
    /// CODE
    /// <reference path="../Core/Enums.ts" />
    /// <reference path="../Media/Brush.ts" />
    /// <reference path="../Primitives/Font.ts" />
    (function (Text) {
        var TextLayoutAttributes = (function () {
            function TextLayoutAttributes(source, start) {
                this._Source = source;
                this.Start = (start == null) ? 0 : start;
            }
            TextLayoutAttributes.prototype.GetBackground = function (selected) {
                if(selected) {
                    return this._Source.SelectionBackground;
                }
                return null;
            };
            TextLayoutAttributes.prototype.GetForeground = function (selected) {
                if(selected) {
                    return this._Source.SelectionForeground;
                }
                return this._Source.Foreground;
            };
            Object.defineProperty(TextLayoutAttributes.prototype, "Font", {
                get: function () {
                    return this._Source.GetFont();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextLayoutAttributes.prototype, "Direction", {
                get: function () {
                    return this._Source.GetDirection();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextLayoutAttributes.prototype, "IsUnderlined", {
                get: function () {
                    return (this._Source.TextDecorations & Fayde.TextDecorations.Underline) === Fayde.TextDecorations.Underline;
                },
                enumerable: true,
                configurable: true
            });
            return TextLayoutAttributes;
        })();
        Text.TextLayoutAttributes = TextLayoutAttributes;        
    })(Fayde.Text || (Fayde.Text = {}));
    var Text = Fayde.Text;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=TextAttributes.js.map
