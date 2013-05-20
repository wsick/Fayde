var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="UIElement.ts" />
/// CODE
/// <reference path="../Runtime/Enumerable.ts" />
/// <reference path="../Primitives/size.ts" />
/// <reference path="ResourceDictionary.ts" />
/// <reference path="Providers/ActualSizeStore.ts" />
/// <reference path="Providers/LocalStyleBroker.ts" />
/// <reference path="Providers/ImplicitStyleBroker.ts" />
var Fayde;
(function (Fayde) {
    var FENode = (function (_super) {
        __extends(FENode, _super);
        function FENode(xobj) {
                _super.call(this, xobj);
        }
        FENode.prototype.SetSubtreeNode = function (subtreeNode, error) {
            var error = new BError();
            if(this.SubtreeNode) {
                this.SubtreeNode.Detach();
                this.SubtreeNode = null;
            }
            if(subtreeNode && !subtreeNode.AttachTo(this, error)) {
                return false;
            }
            this.SubtreeNode = subtreeNode;
            return true;
        };
        FENode.prototype.SetIsLoaded = function (value) {
            if(this.IsLoaded === value) {
                return;
            }
            this.IsLoaded = value;
            this.OnIsLoadedChanged(value);
        };
        FENode.prototype.OnIsLoadedChanged = function (newIsLoaded) {
            var xobj = this.XObject;
            var res = xobj.Resources;
            if(!newIsLoaded) {
                Fayde.Providers.ImplicitStyleBroker.Clear(xobj, Fayde.Providers.StyleMask.VisualTree);
                xobj.Unloaded.Raise(xobj, EventArgs.Empty);
                //TODO: Should we set is loaded on resources that are FrameworkElements?
                            } else {
                Fayde.Providers.ImplicitStyleBroker.Set(xobj, Fayde.Providers.StyleMask.All);
            }
            var enumerator = this.GetVisualTreeEnumerator();
            while(enumerator.MoveNext()) {
                (enumerator.Current).SetIsLoaded(newIsLoaded);
            }
            if(newIsLoaded) {
                //TODO: Should we set is loaded on resources that are FrameworkElements?
                xobj.Loaded.Raise(xobj, EventArgs.Empty);
                this.InvokeLoaded();
                //LOOKS USELESS:
                //Providers.DataContextStore.EmitDataContextChanged(xobj);
                            }
        };
        FENode.prototype.InvokeLoaded = function () {
        };
        FENode.prototype.AttachVisualChild = function (uie, error) {
            this.OnVisualChildAttached(uie);
            if(!this.SetSubtreeNode(uie.XamlNode, error)) {
                return false;
            }
            uie.XamlNode.SetIsLoaded(this.IsLoaded);
            return true;
        };
        FENode.prototype.DetachVisualChild = function (uie, error) {
            if(!this.SetSubtreeNode(null, error)) {
                return false;
            }
            this.OnVisualChildDetached(uie);
            uie.XamlNode.SetIsLoaded(false);
        };
        FENode.prototype.ApplyTemplateWithError = function (error) {
            if(this.SubtreeNode) {
                return false;
            }
            var result = this.DoApplyTemplateWithError(error);
            if(result) {
                this.XObject.OnApplyTemplate();
            }
            return result;
        };
        FENode.prototype.DoApplyTemplateWithError = function (error) {
            return false;
        };
        FENode.prototype.FinishApplyTemplateWithError = function (uie, error) {
            if(!uie || error.Message) {
                return false;
            }
            this.AttachVisualChild(uie, error);
            return error.Message == null;
        };
        FENode.prototype._HasFocus = function () {
            var curNode = this._Surface.FocusedNode;
            while(curNode) {
                if(curNode === this) {
                    return true;
                }
                curNode = curNode.VisualParentNode;
            }
            return false;
        };
        FENode.prototype.GetFocusedElement = function () {
            var node = this._Surface.FocusedNode;
            if(node) {
                return node.XObject;
            }
        };
        FENode.prototype.UpdateLayout = function () {
            var lu = this.LayoutUpdater;
            var error = new BError();
            if(this.IsAttached) {
                this._Surface._UpdateLayout(error);
            } else {
                var pass = {
                    MeasureList: [],
                    ArrangeList: [],
                    SizeList: [],
                    Count: 0,
                    Updated: true
                };
                lu.UpdateLayer(pass, error);
                if(pass.Updated) {
                    this.XObject.LayoutUpdated.Raise(this, EventArgs.Empty);
                }
            }
            if(error.Message) {
                error.ThrowException();
            }
        };
        FENode.prototype.GetVisualTreeEnumerator = function (direction) {
            if(this.SubtreeNode) {
                return Fayde.ArrayEx.GetEnumerator([
                    this.SubtreeNode
                ]);
            }
            return Fayde.ArrayEx.EmptyEnumerator;
        };
        FENode.prototype._SizeChanged = function (args) {
            var lu = this.LayoutUpdater;
            //LOOKS USELESS: this._PurgeSizeCache();
            //TODO: var p = this._GetRenderTransformOrigin();
            //this._FullInvalidate(p.X != 0.0 || p.Y != 0.0);
            lu.FullInvalidate(false);
            var vpNode = this.VisualParentNode;
            if(vpNode) {
                vpNode.LayoutUpdater.InvalidateMeasure();
            }
            lu.InvalidateMeasure();
            lu.InvalidateArrange();
            lu.UpdateBounds();
        };
        FENode.prototype._FlowDirectionChanged = function (args) {
            this._SizeChanged(args);
        };
        return FENode;
    })(Fayde.UINode);
    Fayde.FENode = FENode;    
    Nullstone.RegisterType(FENode, "FENode");
    var FrameworkElement = (function (_super) {
        __extends(FrameworkElement, _super);
        function FrameworkElement() {
                _super.call(this);
            this.SizeChanged = new Fayde.RoutedEvent();
            this.Loaded = new Fayde.RoutedEvent();
            this.Unloaded = new Fayde.RoutedEvent();
            this.LayoutUpdated = new MulticastEvent();
            var rd = new Fayde.ResourceDictionary();
            rd.AttachTo(this);
            Object.defineProperty(this, "Resources", {
                value: rd,
                writable: false
            });
        }
        FrameworkElement.prototype.CreateNode = function () {
            return new FENode(this);
        };
        FrameworkElement.ActualHeightProperty = DependencyProperty.RegisterReadOnly("ActualHeight", function () {
            return Number;
        }, FrameworkElement);
        FrameworkElement.ActualWidthProperty = DependencyProperty.RegisterReadOnly("ActualWidth", function () {
            return Number;
        }, FrameworkElement);
        FrameworkElement.CursorProperty = DependencyProperty.RegisterFull("Cursor", function () {
            return new Enum(Fayde.CursorType);
        }, FrameworkElement, Fayde.CursorType.Default);
        FrameworkElement.FlowDirectionProperty = Fayde.InheritableOwner.FlowDirectionProperty.ExtendTo(FrameworkElement);
        FrameworkElement.HeightProperty = DependencyProperty.Register("Height", function () {
            return Number;
        }, FrameworkElement, NaN, function (d, args) {
            return (d)._HeightChanged(args);
        });
        FrameworkElement.HorizontalAlignmentProperty = DependencyProperty.Register("HorizontalAlignment", function () {
            return new Enum(Fayde.HorizontalAlignment);
        }, FrameworkElement, Fayde.HorizontalAlignment.Stretch, function (d, args) {
            return (d)._AlignmentChanged(args);
        });
        FrameworkElement.LanguageProperty = Fayde.InheritableOwner.LanguageProperty.ExtendTo(FrameworkElement);
        FrameworkElement.MarginProperty = DependencyProperty.RegisterCore("Margin", function () {
            return Thickness;
        }, FrameworkElement, undefined, function (d, args) {
            return (d).XamlNode._SizeChanged(args);
        });
        FrameworkElement.MaxHeightProperty = DependencyProperty.Register("MaxHeight", function () {
            return Number;
        }, FrameworkElement, Number.POSITIVE_INFINITY, function (d, args) {
            return (d).XamlNode._SizeChanged(args);
        });
        FrameworkElement.MaxWidthProperty = DependencyProperty.Register("MaxWidth", function () {
            return Number;
        }, FrameworkElement, Number.POSITIVE_INFINITY, function (d, args) {
            return (d).XamlNode._SizeChanged(args);
        });
        FrameworkElement.MinHeightProperty = DependencyProperty.Register("MinHeight", function () {
            return Number;
        }, FrameworkElement, 0.0, function (d, args) {
            return (d).XamlNode._SizeChanged(args);
        });
        FrameworkElement.MinWidthProperty = DependencyProperty.Register("MinWidth", function () {
            return Number;
        }, FrameworkElement, 0.0, function (d, args) {
            return (d).XamlNode._SizeChanged(args);
        });
        FrameworkElement.StyleProperty = DependencyProperty.Register("Style", function () {
            return Fayde.Style;
        }, FrameworkElement, undefined, function (d, args) {
            return (d)._StyleChanged(args);
        });
        FrameworkElement.VerticalAlignmentProperty = DependencyProperty.Register("VerticalAlignment", function () {
            return new Enum(Fayde.VerticalAlignment);
        }, FrameworkElement, Fayde.VerticalAlignment.Stretch, function (d, args) {
            return (d)._AlignmentChanged(args);
        });
        FrameworkElement.WidthProperty = DependencyProperty.Register("Width", function () {
            return Number;
        }, FrameworkElement, NaN, function (d, args) {
            return (d)._WidthChanged(args);
        });
        FrameworkElement.prototype.IsInheritable = function (propd) {
            if(propd === FrameworkElement.FlowDirectionProperty) {
                return true;
            }
            if(propd === FrameworkElement.LanguageProperty) {
                return true;
            }
            return (_super.prototype).IsInheritable.call(this, propd);
        };
        FrameworkElement.prototype.OnApplyTemplate = function () {
        };
        FrameworkElement.prototype.FindName = function (name) {
            var n = this.XamlNode.FindName(name);
            if(n) {
                return n.XObject;
            }
        };
        FrameworkElement.prototype.UpdateLayout = function () {
            this.XamlNode.UpdateLayout();
        };
        FrameworkElement.prototype._MeasureOverride = function (availableSize, error) {
            var desired = new size();
            availableSize = size.copyTo(availableSize);
            size.max(availableSize, desired);
            var enumerator = this.XamlNode.GetVisualTreeEnumerator();
            while(enumerator.MoveNext()) {
                var childNode = enumerator.Current;
                var childLu = childNode.LayoutUpdater;
                childLu._Measure(availableSize, error);
                desired = size.copyTo(childLu.DesiredSize);
            }
            size.min(desired, availableSize);
            return desired;
        };
        FrameworkElement.prototype._ArrangeOverride = function (finalSize, error) {
            var arranged = size.copyTo(finalSize);
            var enumerator = this.XamlNode.GetVisualTreeEnumerator();
            while(enumerator.MoveNext()) {
                var childNode = enumerator.Current;
                var childRect = rect.fromSize(finalSize);
                childNode.LayoutUpdater._Arrange(childRect, error);
                size.max(arranged, finalSize);
            }
            return arranged;
        };
        FrameworkElement.prototype._StyleChanged = function (args) {
            Fayde.Providers.LocalStyleBroker.Set(this, args.NewValue);
        };
        FrameworkElement.prototype._AlignmentChanged = function (args) {
            var lu = this.XamlNode.LayoutUpdater;
            lu.InvalidateArrange();
            lu.FullInvalidate(true);
        };
        FrameworkElement.prototype._WidthChanged = function (args) {
            this.XamlNode._SizeChanged(args);
        };
        FrameworkElement.prototype._HeightChanged = function (args) {
            this.XamlNode._SizeChanged(args);
        };
        return FrameworkElement;
    })(Fayde.UIElement);
    Fayde.FrameworkElement = FrameworkElement;    
    Nullstone.RegisterType(FrameworkElement, "FrameworkElement");
    FrameworkElement.ActualWidthProperty.Store = Fayde.Providers.ActualSizeStore.Instance;
    FrameworkElement.ActualHeightProperty.Store = Fayde.Providers.ActualSizeStore.Instance;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=FrameworkElement.js.map
