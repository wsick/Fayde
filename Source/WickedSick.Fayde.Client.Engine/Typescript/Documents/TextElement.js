var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/DependencyObject.ts"/>
    /// <reference path="../Core/Providers/InheritedStore.ts"/>
    /// CODE
    /// <reference path="../Core/XamlObjectCollection.ts"/>
    /// <reference path="../Text/TextAttributes.ts"/>
    /// <reference path="../Runtime/Enum.ts"/>
    (function (Documents) {
        var TextElementNode = (function (_super) {
            __extends(TextElementNode, _super);
            function TextElementNode(xobj, inheritedWalkProperty) {
                        _super.call(this, xobj);
                this.InheritedWalkProperty = inheritedWalkProperty;
            }
            TextElementNode.prototype.GetInheritedEnumerator = function () {
                if(!this.InheritedWalkProperty) {
                    return Fayde.ArrayEx.EmptyEnumerator;
                }
                var coll = this.XObject[this.InheritedWalkProperty];
                if(coll) {
                    return coll.GetNodeEnumerator();
                }
            };
            return TextElementNode;
        })(Fayde.DONode);
        Documents.TextElementNode = TextElementNode;        
        Nullstone.RegisterType(TextElementNode, "TextElementNode");
        var TextElement = (function (_super) {
            __extends(TextElement, _super);
            function TextElement() {
                        _super.call(this);
                this._Font = new Font();
                this._UpdateFont(true);
            }
            TextElement.prototype.CreateNode = function () {
                return new TextElementNode(this, null);
            };
            TextElement.FontFamilyProperty = Fayde.InheritableOwner.FontFamilyProperty;
            TextElement.FontSizeProperty = Fayde.InheritableOwner.FontSizeProperty;
            TextElement.FontStretchProperty = Fayde.InheritableOwner.FontStretchProperty;
            TextElement.FontStyleProperty = Fayde.InheritableOwner.FontStyleProperty;
            TextElement.FontWeightProperty = Fayde.InheritableOwner.FontWeightProperty;
            TextElement.ForegroundProperty = Fayde.InheritableOwner.ForegroundProperty;
            TextElement.TextDecorationsProperty = Fayde.InheritableOwner.TextDecorationsProperty;
            TextElement.LanguageProperty = Fayde.InheritableOwner.LanguageProperty;
            TextElement.prototype._SerializeText = function () {
                return undefined;
            };
            TextElement.prototype._UpdateFont = function (force) {
                var f = this._Font;
                f.Family = this.FontFamily;
                f.Stretch = this.FontStretch;
                f.Style = this.FontStyle;
                f.Weight = this.FontWeight;
                f.Size = this.FontSize;
                return f.IsChanged || force;
            };
            Object.defineProperty(TextElement.prototype, "Background", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextElement.prototype, "SelectionBackground", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextElement.prototype, "SelectionForeground", {
                get: //DP: get Foreground(): Media.Brush { return this.Foreground; }
                function () {
                    return this.Foreground;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextElement.prototype, "Font", {
                get: function () {
                    return this._Font;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextElement.prototype, "Direction", {
                get: function () {
                    return Fayde.FlowDirection.LeftToRight;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextElement.prototype, "IsUnderlined", {
                get: function () {
                    return (this.TextDecorations & Fayde.TextDecorations.Underline) > 0;
                },
                enumerable: true,
                configurable: true
            });
            TextElement.prototype.Equals = function (te) {
                if(this.FontFamily !== te.FontFamily) {
                    return false;
                }
                if(this.FontSize !== te.FontSize) {
                    return false;
                }
                if(this.FontStyle !== te.FontStyle) {
                    return false;
                }
                if(this.FontWeight !== te.FontWeight) {
                    return false;
                }
                if(this.FontStretch !== te.FontStretch) {
                    return false;
                }
                if(this.TextDecorations !== te.TextDecorations) {
                    return false;
                }
                if(!Nullstone.Equals(this.Foreground, te.Foreground)) {
                    return false;
                }
                return true;
            };
            TextElement.prototype.FontChanged = function (args) {
                this._UpdateFont(false);
            };
            return TextElement;
        })(Fayde.DependencyObject);
        Documents.TextElement = TextElement;        
        Nullstone.RegisterType(TextElement, "TextElement");
    })(Fayde.Documents || (Fayde.Documents = {}));
    var Documents = Fayde.Documents;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=TextElement.js.map
