var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/DependencyObject.ts"/>
    /// CODE
    /// <reference path="../Core/XamlObjectCollection.ts"/>
    /// <reference path="../Core/Providers/InheritedProviderStore.ts"/>
    /// <reference path="../Core/Providers/InheritedProvider.ts"/>
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
                var coll = this.XObject.GetValue(this.InheritedWalkProperty);
                if(coll) {
                    return (coll).GetNodeEnumerator();
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
            TextElement.prototype.CreateStore = function () {
                var s = new Fayde.Providers.InheritedProviderStore(this);
                s.SetProviders([
                    null, 
                    new Fayde.Providers.LocalValueProvider(), 
                    null, 
                    null, 
                    null, 
                    new Fayde.Providers.InheritedProvider(), 
                    new Fayde.Providers.InheritedDataContextProvider(s), 
                    new Fayde.Providers.DefaultValueProvider(), 
                    new Fayde.Providers.AutoCreateProvider()
                ]);
                return s;
            };
            TextElement.prototype.CreateNode = function () {
                return new TextElementNode(this, null);
            };
            TextElement.ForegroundProperty = DependencyProperty.RegisterInheritable("Foreground", function () {
                return Fayde.Media.Brush;
            }, TextElement, undefined, function (d, args) {
                return (d)._UpdateFont(false);
            }, undefined, Fayde.Providers._Inheritable.Foreground);
            TextElement.FontFamilyProperty = DependencyProperty.RegisterInheritable("FontFamily", function () {
                return String;
            }, TextElement, Font.DEFAULT_FAMILY, function (d, args) {
                return (d)._UpdateFont(false);
            }, undefined, Fayde.Providers._Inheritable.FontFamily);
            TextElement.FontStretchProperty = DependencyProperty.RegisterInheritable("FontStretch", function () {
                return String;
            }, TextElement, Font.DEFAULT_STRETCH, function (d, args) {
                return (d)._UpdateFont(false);
            }, undefined, Fayde.Providers._Inheritable.FontStretch);
            TextElement.FontStyleProperty = DependencyProperty.RegisterInheritable("FontStyle", function () {
                return String;
            }, TextElement, Font.DEFAULT_STYLE, function (d, args) {
                return (d)._UpdateFont(false);
            }, undefined, Fayde.Providers._Inheritable.FontStyle);
            TextElement.FontWeightProperty = DependencyProperty.RegisterInheritable("FontWeight", function () {
                return new Enum(Fayde.FontWeight);
            }, TextElement, Font.DEFAULT_WEIGHT, function (d, args) {
                return (d)._UpdateFont(false);
            }, undefined, Fayde.Providers._Inheritable.FontWeight);
            TextElement.FontSizeProperty = DependencyProperty.RegisterInheritable("FontSize", function () {
                return Number;
            }, TextElement, Font.DEFAULT_SIZE, function (d, args) {
                return (d)._UpdateFont(false);
            }, undefined, Fayde.Providers._Inheritable.FontSize);
            TextElement.LanguageProperty = DependencyProperty.RegisterInheritable("Language", function () {
                return String;
            }, TextElement, undefined, function (d, args) {
                return (d)._UpdateFont(false);
            }, undefined, Fayde.Providers._Inheritable.Language);
            TextElement.TextDecorationsProperty = DependencyProperty.RegisterInheritable("TextDecorations", function () {
                return new Enum(Fayde.TextDecorations);
            }, TextElement, Fayde.TextDecorations.None, function (d, args) {
                return (d)._UpdateFont(false);
            }, undefined, Fayde.Providers._Inheritable.TextDecorations);
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
            return TextElement;
        })(Fayde.DependencyObject);
        Documents.TextElement = TextElement;        
        Nullstone.RegisterType(TextElement, "TextElement");
    })(Fayde.Documents || (Fayde.Documents = {}));
    var Documents = Fayde.Documents;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=TextElement.js.map
