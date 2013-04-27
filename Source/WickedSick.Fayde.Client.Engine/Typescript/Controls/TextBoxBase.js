var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Control.ts" />
    /// CODE
    /// <reference path="../Core/Enums.ts" />
    /// <reference path="Enums.ts" />
    (function (Controls) {
        (function (TextBoxModelChangedType) {
            TextBoxModelChangedType._map = [];
            TextBoxModelChangedType.Nothing = 0;
            TextBoxModelChangedType.TextAlignment = 1;
            TextBoxModelChangedType.TextWrapping = 2;
            TextBoxModelChangedType.Selection = 3;
            TextBoxModelChangedType.Brush = 4;
            TextBoxModelChangedType.Font = 5;
            TextBoxModelChangedType.Text = 6;
        })(Controls.TextBoxModelChangedType || (Controls.TextBoxModelChangedType = {}));
        var TextBoxModelChangedType = Controls.TextBoxModelChangedType;
        var TextBoxBase = (function (_super) {
            __extends(TextBoxBase, _super);
            function TextBoxBase() {
                _super.apply(this, arguments);

                this._SelectionCursor = 0;
                this._SelectionAnchor = 0;
            }
            Object.defineProperty(TextBoxBase.prototype, "SelectionCursor", {
                get: function () {
                    return this._SelectionCursor;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBoxBase.prototype, "HasSelectedText", {
                get: function () {
                    return this._SelectionCursor !== this._SelectionAnchor;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBoxBase.prototype, "CaretBrush", {
                get: function () {
                    return undefined;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBoxBase.prototype, "TextAlignment", {
                get: function () {
                    return undefined;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBoxBase.prototype, "TextWrapping", {
                get: function () {
                    return undefined;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBoxBase.prototype, "SelectionStart", {
                get: function () {
                    return undefined;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBoxBase.prototype, "SelectionLength", {
                get: function () {
                    return undefined;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextBoxBase.prototype, "DisplayText", {
                get: function () {
                    return undefined;
                },
                enumerable: true,
                configurable: true
            });
            TextBoxBase.prototype.Listen = function (listener) {
            };
            TextBoxBase.prototype.Unlisten = function (listener) {
            };
            TextBoxBase.prototype._EmitCursorPositionChanged = function (height, x, y) {
                //LOOKS USELESS
                            };
            return TextBoxBase;
        })(Controls.Control);
        Controls.TextBoxBase = TextBoxBase;        
        Nullstone.RegisterType(TextBoxBase, "TextBoxBase");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=TextBoxBase.js.map
