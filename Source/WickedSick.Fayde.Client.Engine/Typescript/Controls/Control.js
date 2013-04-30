var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/FrameworkElement.ts" />
    /// CODE
    /// <reference path="../Core/Providers/ControlProviderStore.ts" />
    /// <reference path="../Media/VSM/VisualStateManager.ts" />
    (function (Controls) {
        var ControlNode = (function (_super) {
            __extends(ControlNode, _super);
            function ControlNode(xobj) {
                        _super.call(this, xobj);
                this.IsFocused = false;
                this.LayoutUpdater.SetContainerMode(true);
            }
            ControlNode.prototype.TabTo = function () {
                var xobj = this.XObject;
                return xobj.IsEnabled && xobj.IsTabStop && this.Focus();
            };
            ControlNode.prototype._DoApplyTemplateWithError = function (error) {
                var xobj = this.XObject;
                var t = xobj.Template;
                if(!t) {
                    return _super.prototype._DoApplyTemplateWithError.call(this, error);
                }
                var root = t._GetVisualTreeWithError(xobj, error);
                if(root && !(root instanceof Fayde.UIElement)) {
                    Warn("Root element in template was not a UIElement.");
                    root = null;
                }
                if(!root) {
                    return _super.prototype._DoApplyTemplateWithError.call(this, error);
                }
                if(this.TemplateRoot && this.TemplateRoot !== root) {
                    this.DetachVisualChild(this.TemplateRoot, error);
                    this.TemplateRoot = null;
                }
                if(error.Message) {
                    return false;
                }
                this.TemplateRoot = root;
                this.AttachVisualChild(this.TemplateRoot, error);
                if(error.Message) {
                    return false;
                }
                //TODO: Deployment Loaded Event (Async)
                return true;
            };
            ControlNode.prototype.OnIsAttachedChanged = function (newIsAttached) {
                _super.prototype.OnIsAttachedChanged.call(this, newIsAttached);
                //TODO: Propagate IsEnabled DataSource
                if(!newIsAttached) {
                    Fayde.Media.VSM.VisualStateManager.DestroyStoryboards(this.XObject, this.TemplateRoot);
                }
            };
            ControlNode.prototype.OnIsEnabledChanged = function (newIsEnabled) {
                var surface = this._Surface;
                if(surface) {
                    surface._RemoveFocusFrom(this.LayoutUpdater);
                    Fayde.TabNavigationWalker.Focus(this, true);
                }
                this.ReleaseMouseCapture();
            };
            ControlNode.prototype._FindElementsInHostCoordinates = function (ctx, p, uinlist) {
                if(this.XObject.IsEnabled) {
                    _super.prototype._FindElementsInHostCoordinates.call(this, ctx, p, uinlist);
                }
            };
            ControlNode.prototype._HitTestPoint = function (ctx, p, uinlist) {
                if(this.XObject.IsEnabled) {
                    _super.prototype._HitTestPoint.call(this, ctx, p, uinlist);
                }
            };
            ControlNode.prototype._CanFindElement = function () {
                return this.XObject.IsEnabled;
            };
            ControlNode.prototype._InsideObject = function (ctx, lu, x, y) {
                return false;
            };
            ControlNode.prototype.Focus = function () {
                return this._Surface.Focus(this);
            };
            ControlNode.prototype.CanCaptureMouse = function () {
                return this.XObject.IsEnabled;
            };
            return ControlNode;
        })(Fayde.FENode);
        Controls.ControlNode = ControlNode;        
        Nullstone.RegisterType(ControlNode, "ControlNode");
        var Control = (function (_super) {
            __extends(Control, _super);
            function Control() {
                _super.apply(this, arguments);

                this._IsMouseOver = false;
                this.IsEnabledChanged = new MulticastEvent();
            }
            Control.prototype.CreateStore = function () {
                return new Fayde.Providers.ControlProviderStore(this);
            };
            Control.prototype.CreateNode = function () {
                return new ControlNode(this);
            };
            Control.BackgroundProperty = DependencyProperty.RegisterCore("Background", function () {
                return Fayde.Media.Brush;
            }, Control);
            Control.BorderBrushProperty = DependencyProperty.RegisterCore("BorderBrush", function () {
                return Fayde.Media.Brush;
            }, Control);
            Control.BorderThicknessProperty = DependencyProperty.RegisterCore("BorderThickness", function () {
                return Thickness;
            }, Control, undefined, function (d, args) {
                return (d)._BorderThicknessChanged(args);
            });
            Control.FontFamilyProperty = DependencyProperty.RegisterInheritable("FontFamily", function () {
                return String;
            }, Control, Font.DEFAULT_FAMILY, undefined, undefined, Fayde.Providers._Inheritable.FontFamily);
            Control.FontSizeProperty = DependencyProperty.RegisterInheritable("FontSize", function () {
                return Number;
            }, Control, Font.DEFAULT_SIZE, undefined, undefined, Fayde.Providers._Inheritable.FontSize);
            Control.FontStretchProperty = DependencyProperty.RegisterInheritable("FontStretch", function () {
                return String;
            }, Control, Font.DEFAULT_STRETCH, undefined, undefined, Fayde.Providers._Inheritable.FontStretch);
            Control.FontStyleProperty = DependencyProperty.RegisterInheritable("FontStyle", function () {
                return String;
            }, Control, Font.DEFAULT_STYLE, undefined, undefined, Fayde.Providers._Inheritable.FontStyle);
            Control.FontWeightProperty = DependencyProperty.RegisterInheritable("FontWeight", function () {
                return new Enum(Fayde.FontWeight);
            }, Control, Font.DEFAULT_WEIGHT, undefined, undefined, Fayde.Providers._Inheritable.FontWeight);
            Control.ForegroundProperty = DependencyProperty.RegisterInheritable("Foreground", function () {
                return Fayde.Media.Brush;
            }, Control, undefined, undefined, undefined, Fayde.Providers._Inheritable.Foreground);
            Control.HorizontalContentAlignmentProperty = DependencyProperty.RegisterCore("HorizontalContentAlignment", function () {
                return new Enum(Fayde.HorizontalAlignment);
            }, Control, Fayde.HorizontalAlignment.Center, function (d, args) {
                return (d)._ContentAlignmentChanged(args);
            });
            Control.IsEnabledProperty = DependencyProperty.RegisterCore("IsEnabled", function () {
                return Boolean;
            }, Control, true, function (d, args) {
                return (d)._IsEnabledChanged(args);
            });
            Control.IsTabStopProperty = DependencyProperty.Register("IsTabStop", function () {
                return Boolean;
            }, Control, true);
            Control.PaddingProperty = DependencyProperty.RegisterCore("Padding", function () {
                return Thickness;
            }, Control, undefined, function (d, args) {
                return (d)._BorderThicknessChanged(args);
            });
            Control.TabIndexProperty = DependencyProperty.Register("TabIndex", function () {
                return Number;
            }, Control);
            Control.TabNavigationProperty = DependencyProperty.Register("TabNavigation", function () {
                return new Enum(Fayde.Input.KeyboardNavigationMode);
            }, Control, Fayde.Input.KeyboardNavigationMode.Local);
            Control.TemplateProperty = DependencyProperty.RegisterCore("Template", function () {
                return Controls.ControlTemplate;
            }, Control, undefined, function (d, args) {
                return (d)._TemplateChanged(args);
            });
            Control.VerticalContentAlignmentProperty = DependencyProperty.RegisterCore("VerticalContentAlignment", function () {
                return new Enum(Fayde.VerticalAlignment);
            }, Control, Fayde.VerticalAlignment.Center, function (d, args) {
                return (d)._ContentAlignmentChanged(args);
            });
            Control.DefaultStyleKeyProperty = DependencyProperty.Register("DefaultStyleKey", function () {
                return Function;
            }, Control);
            Object.defineProperty(Control.prototype, "IsFocused", {
                get: //Defined in UIElement
                function () {
                    return this.XamlNode.IsFocused;
                },
                enumerable: true,
                configurable: true
            });
            Control.prototype.GetTemplateChild = function (childName) {
                var root = this.XamlNode.TemplateRoot;
                if(root) {
                    var n = root.XamlNode.FindName(name);
                    if(n) {
                        return n.XObject;
                    }
                }
            };
            Control.prototype.ApplyTemplate = function () {
                var error = new BError();
                var result = this.XamlNode._ApplyTemplateWithError(error);
                if(error.Message) {
                    error.ThrowException();
                }
                return result;
            };
            Control.prototype.GetDefaultStyle = function () {
                return undefined;
            };
            Control.prototype._IsEnabledChanged = function (args) {
                if(!args.NewValue) {
                    this._IsMouseOver = false;
                    this.XamlNode.OnIsEnabledChanged(args.NewValue);
                }
                this.OnIsEnabledChanged(args);
                this.IsEnabledChanged.RaiseAsync(this, EventArgs.Empty);
            };
            Control.prototype.OnIsEnabledChanged = function (e) {
            };
            Control.prototype.OnGotFocus = function (e) {
                this.XamlNode.IsFocused = true;
            };
            Control.prototype.OnLostFocus = function (e) {
                this.XamlNode.IsFocused = false;
            };
            Control.prototype.OnLostMouseCapture = function (e) {
            };
            Control.prototype.OnKeyDown = function (e) {
            };
            Control.prototype.OnKeyUp = function (e) {
            };
            Control.prototype.OnMouseEnter = function (e) {
            };
            Control.prototype.OnMouseLeave = function (e) {
            };
            Control.prototype.OnMouseLeftButtonDown = function (e) {
            };
            Control.prototype.OnMouseLeftButtonUp = function (e) {
            };
            Control.prototype.OnMouseMove = function (e) {
            };
            Control.prototype.OnMouseRightButtonDown = function (e) {
            };
            Control.prototype.OnMouseRightButtonUp = function (e) {
            };
            Control.prototype.OnMouseWheel = function (e) {
            };
            Control.prototype.UpdateVisualState = function (useTransitions) {
                useTransitions = useTransitions !== false;
                var states = this.GetVisualStateNamesToActivate();
                for(var i = 0; i < states.length; i++) {
                    Fayde.Media.VSM.VisualStateManager.GoToState(this, states[i], useTransitions);
                }
            };
            Control.prototype.GetVisualStateNamesToActivate = function () {
                var commonState = this.GetVisualStateCommon();
                var focusedState = this.GetVisualStateFocus();
                return [
                    commonState, 
                    focusedState
                ];
            };
            Control.prototype.GetVisualStateCommon = function () {
                if(!this.IsEnabled) {
                    return "Disabled";
                } else if(this.IsMouseOver) {
                    return "MouseOver";
                } else {
                    return "Normal";
                }
            };
            Control.prototype.GetVisualStateFocus = function () {
                if(this.IsFocused && this.IsEnabled) {
                    return "Focused";
                } else {
                    return "Unfocused";
                }
            };
            Control.prototype._TemplateChanged = function (args) {
                var node = this.XamlNode;
                var subtree = node.SubtreeNode;
                if(subtree) {
                    var error = new BError();
                    if(!node.DetachVisualChild(subtree.XObject, error)) {
                        error.ThrowException();
                    }
                }
                node.LayoutUpdater.InvalidateMeasure();
            };
            Control.prototype._PaddingChanged = function (args) {
                this.XamlNode.LayoutUpdater.InvalidateMeasure();
            };
            Control.prototype._BorderThicknessChanged = function (args) {
                this.XamlNode.LayoutUpdater.InvalidateMeasure();
            };
            Control.prototype._ContentAlignmentChanged = function (args) {
                this.XamlNode.LayoutUpdater.InvalidateArrange();
            };
            return Control;
        })(Fayde.FrameworkElement);
        Controls.Control = Control;        
        Nullstone.RegisterType(Control, "Control");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Control.js.map
