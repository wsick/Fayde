var Fayde;
(function (Fayde) {
    /// CODE
    /// <reference path="../Primitives/size.ts" />
    (function (Text) {
        var TextLayoutLine = (function () {
            function TextLayoutLine() { }
            return TextLayoutLine;
        })();
        Text.TextLayoutLine = TextLayoutLine;        
        var TextLayout = (function () {
            function TextLayout() {
                this.AvailableWidth = Number.POSITIVE_INFINITY;
            }
            Object.defineProperty(TextLayout.prototype, "ActualExtents", {
                get: function () {
                    return new size();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextLayout.prototype, "MaxWidth", {
                set: function (maxWidth) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextLayout.prototype, "TextAlignment", {
                set: function (align) {
                },
                enumerable: true,
                configurable: true
            });
            TextLayout.prototype.SetTextAlignment = function (align) {
                return undefined;
            };
            Object.defineProperty(TextLayout.prototype, "TextWrapping", {
                set: function (wrapping) {
                },
                enumerable: true,
                configurable: true
            });
            TextLayout.prototype.SetTextWrapping = function (wrapping) {
                return undefined;
            };
            Object.defineProperty(TextLayout.prototype, "TextAttributes", {
                get: function () {
                    return this._Attrs;
                },
                set: function (attrs) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextLayout.prototype, "Text", {
                set: function (text) {
                    var len = -1;
                    if(text) {
                        len = text.length;
                    }
                },
                enumerable: true,
                configurable: true
            });
            TextLayout.prototype.GetSelectionCursor = function (offset, pos) {
                return undefined;
            };
            TextLayout.prototype.GetBaselineOffset = function () {
                return undefined;
            };
            TextLayout.prototype.GetLineFromY = function (p, y) {
                return undefined;
            };
            TextLayout.prototype.GetLineFromIndex = function (index) {
                return undefined;
            };
            TextLayout.prototype.GetCursorFromXY = function (p, x, y) {
                return undefined;
            };
            TextLayout.prototype.Select = function (start, length) {
            };
            TextLayout.prototype.Layout = function () {
            };
            TextLayout.prototype.Render = function (ctx, origin, offset) {
                //if origin is null -> {0,0}
                //if offset is null -> {0,0}
                            };
            TextLayout.prototype.ResetState = function () {
            };
            return TextLayout;
        })();
        Text.TextLayout = TextLayout;        
    })(Fayde.Text || (Fayde.Text = {}));
    var Text = Fayde.Text;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=TextLayout.js.map
