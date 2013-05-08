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
        var TextBox = (function (_super) {
            __extends(TextBox, _super);
            function TextBox() {
                        _super.call(this, Controls.TextBoxEmitChangedType.TEXT | Controls.TextBoxEmitChangedType.SELECTION, TextBox.TextProperty, TextBox.SelectedTextProperty);
                this.SelectionChanged = new MulticastEvent();
                this.TextChanged = new MulticastEvent();
                this.DefaultStyleKey = (this).constructor;
            }
            TextBox.AcceptsReturnProperty = DependencyProperty.Register("AcceptsReturn", function () {
                return Boolean;
            }, TextBox, false, function (d, args) {
                return (d).$AcceptsReturn = (args.NewValue === true);
            });
            TextBox.CaretBrushProperty = DependencyProperty.RegisterCore("CaretBrush", function () {
                return Fayde.Media.Brush;
            }, TextBox);
            TextBox.MaxLengthProperty = DependencyProperty.RegisterFull("MaxLength", function () {
                return Number;
            }, TextBox, 0, function (d, args) {
                return (d).$MaxLength = args.NewValue;
            }, undefined, undefined, undefined, positiveIntValidator);
            TextBox.IsReadOnlyProperty = DependencyProperty.Register("IsReadOnly", function () {
                return Boolean;
            }, TextBox, undefined, function (d, args) {
                return (d)._IsReadOnlyChanged(args);
            });
            TextBox.SelectionForegroundProperty = DependencyProperty.RegisterCore("SelectionForeground", function () {
                return Fayde.Media.Brush;
            }, TextBox, undefined, function (d, args) {
                return (d)._SelectionForegroundChanged(args);
            });
            TextBox.SelectionBackgroundProperty = DependencyProperty.RegisterCore("SelectionBackground", function () {
                return Fayde.Media.Brush;
            }, TextBox, undefined, function (d, args) {
                return (d)._SelectionBackgroundChanged(args);
            });
            TextBox.BaselineOffsetProperty = DependencyProperty.Register("BaselineOffset", function () {
                return Number;
            }, TextBox);
            TextBox.SelectedTextProperty = DependencyProperty.RegisterFull("SelectedText", function () {
                return String;
            }, TextBox, "", function (d, args) {
                return (d)._SelectedTextChanged(args.NewValue);
            }, undefined, undefined, true);
            TextBox.SelectionLengthProperty = DependencyProperty.RegisterFull("SelectionLength", function () {
                return Number;
            }, TextBox, 0, function (d, args) {
                return (d)._SelectionLengthChanged(args.NewValue);
            }, undefined, undefined, true, positiveIntValidator);
            TextBox.SelectionStartProperty = DependencyProperty.RegisterFull("SelectionStart", function () {
                return Number;
            }, TextBox, 0, function (d, args) {
                return (d)._SelectionStartChanged(args.NewValue);
            }, undefined, undefined, true, positiveIntValidator);
            TextBox.TextProperty = DependencyProperty.Register("Text", function () {
                return String;
            }, TextBox, undefined, function (d, args) {
                return (d)._TextChanged(args.NewValue);
            });
            TextBox.TextAlignmentProperty = DependencyProperty.Register("TextAlignment", function () {
                return new Enum(Fayde.TextAlignment);
            }, TextBox, Fayde.TextAlignment.Left, function (d, args) {
                return (d)._TextAlignmentChanged(args);
            });
            TextBox.TextWrappingProperty = DependencyProperty.Register("TextWrapping", function () {
                return new Enum(Controls.TextWrapping);
            }, TextBox, Controls.TextWrapping.NoWrap, function (d, args) {
                return (d)._TextWrappingChanged(args);
            });
            TextBox.HorizontalScrollBarVisibilityProperty = DependencyProperty.Register("HorizontalScrollBarVisibility", function () {
                return new Enum(Controls.ScrollBarVisibility);
            }, TextBox, Controls.ScrollBarVisibility.Hidden, function (d, args) {
                return (d)._HorizontalScrollBarVisibilityChanged(args);
            });
            TextBox.VerticalScrollBarVisibilityProperty = DependencyProperty.Register("VerticalScrollBarVisibility", function () {
                return new Enum(Controls.ScrollBarVisibility);
            }, TextBox, Controls.ScrollBarVisibility.Hidden, function (d, args) {
                return (d)._VerticalScrollBarVisibilityChanged(args);
            });
            TextBox.prototype.OnApplyTemplate = function () {
                _super.prototype.OnApplyTemplate.call(this);
                var ce = this.$ContentElement;
                if(!ce) {
                    return;
                }
                var ceType = (ce).constructor;
                var propd = DependencyProperty.GetDependencyProperty(ceType, "VerticalScrollBarVisibility", true);
                if(propd) {
                    ce.SetValueInternal(propd, this.VerticalScrollBarVisibility);
                }
                propd = DependencyProperty.GetDependencyProperty(ceType, "HorizontalScrollBarVisibility", true);
                if(propd) {
                    var vis = (this.TextWrapping === Controls.TextWrapping.Wrap) ? Controls.ScrollBarVisibility.Disabled : this.HorizontalScrollBarVisibility;
                    ce.SetValueInternal(propd, vis);
                }
            };
            Object.defineProperty(TextBox.prototype, "DisplayText", {
                get: function () {
                    return this.Text;
                },
                enumerable: true,
                configurable: true
            });
            TextBox.prototype._EmitTextChanged = function () {
                this.TextChanged.RaiseAsync(this, EventArgs.Empty);
            };
            TextBox.prototype._EmitSelectionChanged = function () {
                //TextDebug("TextBox.SelectionChanged [" + this.SelectionStart + " -- " + this.SelectionLength + "]");
                this.SelectionChanged.RaiseAsync(this, new EventArgs());
            };
            TextBox.prototype._IsReadOnlyChanged = function (args) {
                this.$IsReadOnly = args.NewValue === true;
                if(this.$IsFocused) {
                    if(this.$IsReadOnly) {
                        this._ResetIMContext();
                        //TODO: this._IMCtx.FocusOut();
                                            } else {
                    }
                }
                if(this.$View) {
                    this.$View.SetEnableCursor(!this.$IsReadOnly);
                }
            };
            TextBox.prototype._FontChanged = function (args) {
                this._ModelChanged(Controls.TextBoxModelChangedType.Font, args.NewValue);
            };
            TextBox.prototype._SelectionBackgroundChanged = function (args) {
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
            TextBox.prototype._SelectionForegroundChanged = function (args) {
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
            TextBox.prototype._TextAlignmentChanged = function (args) {
                this._ModelChanged(Controls.TextBoxModelChangedType.TextAlignment, args.NewValue);
            };
            TextBox.prototype._TextWrappingChanged = function (args) {
                var ce = this.$ContentElement;
                if(ce) {
                    var ceType = (ce).constructor;
                    var propd = DependencyProperty.GetDependencyProperty(ceType, "HorizontalScrollBarVisibility", true);
                    if(propd) {
                        var vis = (args.NewValue === Controls.TextWrapping.Wrap) ? Controls.ScrollBarVisibility.Disabled : this.HorizontalScrollBarVisibility;
                        ce.SetValueInternal(propd, vis);
                    }
                }
                this._ModelChanged(Controls.TextBoxModelChangedType.TextWrapping, args.NewValue);
            };
            TextBox.prototype._HorizontalScrollBarVisibilityChanged = function (args) {
                var ce = this.$ContentElement;
                if(!ce) {
                    return;
                }
                var ceType = (ce).constructor;
                var propd = DependencyProperty.GetDependencyProperty(ceType, "HorizontalScrollBarVisibility");
                if(!propd) {
                    return;
                }
                var vis = (this.TextWrapping === Controls.TextWrapping.Wrap) ? Controls.ScrollBarVisibility.Disabled : args.NewValue;
                ce.SetValueInternal(propd, vis);
            };
            TextBox.prototype._VerticalScrollBarVisibilityChanged = function (args) {
                var ce = this.$ContentElement;
                if(!ce) {
                    return;
                }
                var ceType = (ce).constructor;
                var propd = DependencyProperty.GetDependencyProperty(ceType, "VerticalScrollBarVisibility");
                if(!propd) {
                    return;
                }
                ce.SetValueInternal(propd, args.NewValue);
            };
            TextBox.prototype.OnMouseEnter = function (e) {
                _super.prototype.OnMouseEnter.call(this, e);
                this.UpdateVisualState();
            };
            TextBox.prototype.OnMouseLeave = function (e) {
                _super.prototype.OnMouseLeave.call(this, e);
                this.UpdateVisualState();
            };
            TextBox.prototype.OnGotFocus = function (e) {
                _super.prototype.OnGotFocus.call(this, e);
                this.UpdateVisualState();
            };
            TextBox.prototype.OnLostFocus = function (e) {
                _super.prototype.OnLostFocus.call(this, e);
                this.UpdateVisualState();
            };
            TextBox.prototype.GetVisualStateCommon = function () {
                if(!this.IsEnabled) {
                    return "Disabled";
                } else if(this.IsReadOnly) {
                    return "ReadOnly";
                } else if(this.IsMouseOver) {
                    return "MouseOver";
                } else {
                    return "Normal";
                }
            };
            return TextBox;
        })(Controls.TextBoxBase);
        Controls.TextBox = TextBox;        
        Nullstone.RegisterType(TextBox, "TextBox");
        function positiveIntValidator(dobj, propd, value) {
            if(typeof value !== 'number') {
                return false;
            }
            return value >= 0;
        }
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=TextBox.js.map
