var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="TextBoxBase.ts" />
    /// CODE
    /// <reference path="Enums.ts" />
    (function (Controls) {
        var PasswordBox = (function (_super) {
            __extends(PasswordBox, _super);
            //Defined in TextBoxBase
            function PasswordBox() {
                        _super.call(this, Controls.TextBoxEmitChangedType.TEXT, PasswordBox.PasswordProperty);
                this.PasswordChangedEvent = new Fayde.RoutedEvent();
                this.DefaultStyleKey = (this).constructor;
            }
            PasswordBox.BaselineOffsetProperty = DependencyProperty.Register("BaselineOffset", function () {
                return Number;
            }, PasswordBox);
            PasswordBox.CaretBrushProperty = DependencyProperty.RegisterCore("CaretBrush", function () {
                return Fayde.Media.Brush;
            }, PasswordBox);
            PasswordBox.MaxLengthProperty = DependencyProperty.RegisterFull("MaxLength", function () {
                return Number;
            }, PasswordBox, 0, function (d, args) {
                return (d).$MaxLength = args.NewValue;
            }, undefined, undefined, positiveIntValidator);
            PasswordBox.PasswordCharProperty = DependencyProperty.Register("PasswordChar", function () {
                return String;
            }, PasswordBox, String.fromCharCode(9679), function (d, args) {
                return (d)._ModelChanged(Controls.TextBoxModelChangedType.Text, args.NewValue);
            });
            PasswordBox.PasswordProperty = DependencyProperty.Register("Password", function () {
                return String;
            }, PasswordBox, undefined, function (d, args) {
                return (d)._TextChanged(args.NewValue);
            });
            PasswordBox.SelectionForegroundProperty = DependencyProperty.RegisterCore("SelectionForeground", function () {
                return Fayde.Media.Brush;
            }, PasswordBox, undefined, function (d, args) {
                return (d)._SelectionForegroundChanged(args);
            });
            PasswordBox.SelectionBackgroundProperty = DependencyProperty.RegisterCore("SelectionBackground", function () {
                return Fayde.Media.Brush;
            }, PasswordBox, undefined, function (d, args) {
                return (d)._SelectionBackgroundChanged(args);
            });
            PasswordBox.DEFAULT_SELECTION_FOREGROUND = Fayde.Media.SolidColorBrush.FromColor(Color.FromRgba(255, 255, 255, 1.0));
            Object.defineProperty(PasswordBox.prototype, "SelectionForeground", {
                get: function () {
                    var b = this.GetValue(PasswordBox.SelectionForegroundProperty);
                    if(b) {
                        return b;
                    }
                    return PasswordBox.DEFAULT_SELECTION_FOREGROUND;
                },
                set: function (value) {
                    this.SetValue(PasswordBox.SelectionForegroundProperty, value);
                },
                enumerable: true,
                configurable: true
            });
            PasswordBox.DEFAULT_SELECTION_BACKGROUND = Fayde.Media.SolidColorBrush.FromColor(Color.FromRgba(68, 68, 68, 1.0));
            Object.defineProperty(PasswordBox.prototype, "SelectionBackground", {
                get: function () {
                    var b = this.GetValue(PasswordBox.SelectionBackgroundProperty);
                    if(b) {
                        return b;
                    }
                    return PasswordBox.DEFAULT_SELECTION_BACKGROUND;
                },
                set: function (value) {
                    this.SetValue(PasswordBox.SelectionBackgroundProperty, value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PasswordBox.prototype, "DisplayText", {
                get: function () {
                    var result = "";
                    var count = this._Buffer.length;
                    var pattern = this.PasswordChar;
                    while(count > 0) {
                        if(count & 1) {
                            result += pattern;
                        }
                        count >>= 1 , pattern += pattern;
                    }
                    return result;
                },
                enumerable: true,
                configurable: true
            });
            PasswordBox.prototype.CursorDown = function (cursor, isPage) {
                return this._Buffer.length;
            };
            PasswordBox.prototype.CursorUp = function (cursor, isPage) {
                return 0;
            };
            PasswordBox.prototype.CursorNextWord = function (cursor) {
                return this._Buffer.length;
            };
            PasswordBox.prototype.CursorPrevWord = function (cursor) {
                return 0;
            };
            PasswordBox.prototype.CursorLineBegin = function (cursor) {
                return 0;
            };
            PasswordBox.prototype.CursorLineEnd = function (cursor) {
                return this._Buffer.length;
            };
            PasswordBox.prototype._EmitTextChanged = function () {
                this.PasswordChangedEvent.RaiseAsync(this, EventArgs.Empty);
            };
            PasswordBox.prototype._SelectionBackgroundChanged = function (args) {
                var _this = this;
                var newBrush = args.NewValue;
                if(this._SelectionBackgroundListener) {
                    this._SelectionBackgroundListener.Detach();
                }
                this._SelectionBackgroundListener = null;
                if(newBrush) {
                    this._SelectionBackgroundListener = newBrush.Listen(function (brush) {
                        _this._ModelChanged(Controls.TextBoxModelChangedType.Brush, newBrush);
                        _this.XamlNode.LayoutUpdater.Invalidate();
                    });
                }
                this._ModelChanged(Controls.TextBoxModelChangedType.Brush, newBrush);
                this.XamlNode.LayoutUpdater.Invalidate();
            };
            PasswordBox.prototype._SelectionForegroundChanged = function (args) {
                var _this = this;
                var newBrush = args.NewValue;
                if(this._SelectionForegroundListener) {
                    this._SelectionForegroundListener.Detach();
                }
                this._SelectionForegroundListener = null;
                if(newBrush) {
                    this._SelectionForegroundListener = newBrush.Listen(function (brush) {
                        _this._ModelChanged(Controls.TextBoxModelChangedType.Brush, newBrush);
                        _this.XamlNode.LayoutUpdater.Invalidate();
                    });
                }
                this._ModelChanged(Controls.TextBoxModelChangedType.Brush, newBrush);
                this.XamlNode.LayoutUpdater.Invalidate();
            };
            return PasswordBox;
        })(Controls.TextBoxBase);
        Controls.PasswordBox = PasswordBox;        
        Nullstone.RegisterType(PasswordBox, "PasswordBox");
        function positiveIntValidator(dobj, propd, value) {
            if(typeof value !== 'number') {
                return false;
            }
            return value >= 0;
        }
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=PasswordBox.js.map
