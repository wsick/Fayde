var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/FrameworkElement.ts" />
    /// CODE
    /// <reference path="../Core/Providers/IsEnabledStore.ts" />
    /// <reference path="../Media/VSM/VisualStateManager.ts" />
    (function (Controls) {
        var ControlNode = (function (_super) {
            __extends(ControlNode, _super);
            function ControlNode(xobj) {
                        _super.call(this, xobj);
                this.IsFocused = false;
                this.LayoutUpdater.SetContainerMode(true);
                this.LayoutUpdater.IsNeverInsideObject = true;
            }
            ControlNode.prototype.TabTo = function () {
                var xobj = this.XObject;
                return xobj.IsEnabled && xobj.IsTabStop && this.Focus();
            };
            ControlNode.prototype.DoApplyTemplateWithError = function (error) {
                var xobj = this.XObject;
                var t = xobj.Template;
                var root;
                if(t) {
                    root = t.GetVisualTree(xobj);
                }
                if(!root && !(root = this.GetDefaultVisualTree())) {
                    return false;
                }
                if(this.TemplateRoot && this.TemplateRoot !== root) {
                    this.DetachVisualChild(this.TemplateRoot, error);
                }
                this.TemplateRoot = root;
                if(this.TemplateRoot) {
                    this.AttachVisualChild(this.TemplateRoot, error);
                }
                if(error.Message) {
                    return false;
                }
                //TODO: Deployment Loaded Event (Async)
                return true;
            };
            ControlNode.prototype.GetDefaultVisualTree = function () {
                return undefined;
            };
            ControlNode.prototype.OnIsAttachedChanged = function (newIsAttached) {
                _super.prototype.OnIsAttachedChanged.call(this, newIsAttached);
                if(!newIsAttached) {
                    Fayde.Media.VSM.VisualStateManager.DestroyStoryboards(this.XObject, this.TemplateRoot);
                }
            };
            ControlNode.prototype.OnParentChanged = function (oldParentNode, newParentNode) {
                _super.prototype.OnParentChanged.call(this, oldParentNode, newParentNode);
                this.IsEnabled = newParentNode ? newParentNode.IsEnabled : true;
            };
            Object.defineProperty(ControlNode.prototype, "IsEnabled", {
                get: function () {
                    return this.XObject.IsEnabled;
                },
                set: function (value) {
                    Fayde.Providers.IsEnabledStore.EmitInheritedChanged(this, value);
                    this.OnIsEnabledChanged(undefined, value);
                },
                enumerable: true,
                configurable: true
            });
            ControlNode.prototype.OnIsEnabledChanged = function (oldValue, newValue) {
                if(!newValue) {
                    this.IsMouseOver = false;
                    var surface = this._Surface;
                    if(surface) {
                        surface._RemoveFocusFrom(this.LayoutUpdater);
                        Fayde.TabNavigationWalker.Focus(this, true);
                    }
                    this.ReleaseMouseCapture();
                }
                _super.prototype.OnIsEnabledChanged.call(this, oldValue, newValue);
            };
            ControlNode.prototype.Focus = function (recurse) {
                return this._Surface.Focus(this, recurse);
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
            Control.FontFamilyProperty = Fayde.InheritableOwner.FontFamilyProperty.ExtendTo(Control);
            Control.FontSizeProperty = Fayde.InheritableOwner.FontSizeProperty.ExtendTo(Control);
            Control.FontStretchProperty = Fayde.InheritableOwner.FontStretchProperty.ExtendTo(Control);
            Control.FontStyleProperty = Fayde.InheritableOwner.FontStyleProperty.ExtendTo(Control);
            Control.FontWeightProperty = Fayde.InheritableOwner.FontWeightProperty.ExtendTo(Control);
            Control.ForegroundProperty = Fayde.InheritableOwner.ForegroundProperty.ExtendTo(Control);
            Control.HorizontalContentAlignmentProperty = DependencyProperty.Register("HorizontalContentAlignment", function () {
                return new Enum(Fayde.HorizontalAlignment);
            }, Control, Fayde.HorizontalAlignment.Center, function (d, args) {
                return (d)._ContentAlignmentChanged(args);
            });
            Control.IsEnabledProperty = DependencyProperty.Register("IsEnabled", function () {
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
            Control.VerticalContentAlignmentProperty = DependencyProperty.Register("VerticalContentAlignment", function () {
                return new Enum(Fayde.VerticalAlignment);
            }, Control, Fayde.VerticalAlignment.Center, function (d, args) {
                return (d)._ContentAlignmentChanged(args);
            });
            Control.DefaultStyleKeyProperty = DependencyProperty.Register("DefaultStyleKey", function () {
                return Function;
            }, Control);
            Control.prototype.IsInheritable = function (propd) {
                if(ControlInheritedProperties.indexOf(propd) > -1) {
                    return true;
                }
                return (_super.prototype).IsInheritable.call(this, propd);
            };
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
                    var n = root.XamlNode.FindName(childName);
                    if(n) {
                        return n.XObject;
                    }
                }
            };
            Control.prototype.ApplyTemplate = function () {
                var error = new BError();
                var result = this.XamlNode.ApplyTemplateWithError(error);
                if(error.Message) {
                    error.ThrowException();
                }
                return result;
            };
            Control.prototype.GetDefaultStyle = function () {
                return undefined;
            };
            Control.prototype._IsEnabledChanged = function (args) {
                var lu = this.XamlNode.LayoutUpdater;
                lu.ShouldSkipHitTest = args.NewValue === false;
                lu.CanHitElement = args.NewValue !== false;
                this.OnIsEnabledChanged(args);
                if(args.NewValue !== true) {
                    this.XamlNode.IsMouseOver = false;
                }
                this.UpdateVisualState();
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
        Control.IsEnabledProperty.Store = Fayde.Providers.IsEnabledStore.Instance;
        var ControlInheritedProperties = [
            Control.FontFamilyProperty, 
            Control.FontSizeProperty, 
            Control.FontStretchProperty, 
            Control.FontStyleProperty, 
            Control.FontWeightProperty, 
            Control.ForegroundProperty, 
            
        ];
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Control.js.map
