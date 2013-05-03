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
/// <reference path="Providers/FrameworkProviderStore.ts" />
/// <reference path="Providers/FrameworkElementDynamicProvider.ts" />
/// <reference path="Providers/InheritedDataContextProvider.ts" />
/// <reference path="Providers/LocalStyleProvider.ts" />
/// <reference path="Providers/ImplicitStyleProvider.ts" />
var Fayde;
(function (Fayde) {
    var FENode = (function (_super) {
        __extends(FENode, _super);
        function FENode(xobj) {
                _super.call(this, xobj);
        }
        FENode.prototype.SetSubtreeNode = function (subtreeNode, error) {
            var error = new BError();
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
            var store = xobj._Store;
            if(!newIsLoaded) {
                store.ClearImplicitStyles(Fayde.Providers._StyleMask.VisualTree);
                //Raise unloaded event
                //TODO: Should we set is loaded on resources that are FrameworkElements?
                            } else {
                store.SetImplicitStyles(Fayde.Providers._StyleMask.All);
            }
            var enumerator = this.GetVisualTreeEnumerator();
            while(enumerator.MoveNext()) {
                (enumerator.Current).SetIsLoaded(newIsLoaded);
            }
            if(newIsLoaded) {
                //TODO: Should we set is loaded on resources that are FrameworkElements?
                //Raise loaded event
                this.InvokeLoaded();
                store.EmitDataContextChanged();
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
        FENode.prototype._ApplyTemplateWithError = function (error) {
            if(this.SubtreeNode) {
                return false;
            }
            var result = this._DoApplyTemplateWithError(error);
            if(result) {
                this.XObject.OnApplyTemplate();
            }
            return result;
        };
        FENode.prototype._DoApplyTemplateWithError = function (error) {
            var uie = this._GetDefaultTemplate();
            if(uie) {
                if(error.Message) {
                    return false;
                }
                this.AttachVisualChild(uie, error);
            }
            return error.Message == null && uie != null;
        };
        FENode.prototype._GetDefaultTemplate = function () {
            return undefined;
        };
        FENode.prototype._FindElementsInHostCoordinates = function (ctx, p, uinlist) {
            var lu = this.LayoutUpdater;
            if(!lu.TotalIsRenderVisible) {
                return;
            }
            if(!lu.TotalIsHitTestVisible) {
                return;
            }
            if(lu.SurfaceBoundsWithChildren.Height <= 0) {
                return;
            }
            if(!this._InsideClip(ctx, lu, p.X, p.Y)) {
                return;
            }
            ctx.Save();
            uinlist.unshift(this);
            var enumerator = this.GetVisualTreeEnumerator(Fayde.VisualTreeDirection.ZFoward);
            while(enumerator.MoveNext()) {
                (enumerator.Current)._FindElementsInHostCoordinates(ctx, p, uinlist);
            }
            if(this === uinlist[0]) {
                if(!this._CanFindElement() || !this._InsideObject(ctx, lu, p.X, p.Y)) {
                    uinlist.shift();
                }
            }
            ctx.Restore();
        };
        FENode.prototype._HitTestPoint = function (ctx, p, uinlist) {
            var lu = this.LayoutUpdater;
            if(!lu.TotalIsRenderVisible) {
                return;
            }
            if(!lu.TotalIsHitTestVisible) {
                return;
            }
            if(!this._InsideClip(ctx, lu, p.X, p.Y)) {
                return;
            }
            uinlist.unshift(this);
            var hit = false;
            var enumerator = this.GetVisualTreeEnumerator(Fayde.VisualTreeDirection.ZReverse);
            while(enumerator.MoveNext()) {
                var childNode = (enumerator.Current);
                childNode._HitTestPoint(ctx, p, uinlist);
                if(this !== uinlist[0]) {
                    hit = true;
                    break;
                }
            }
            if(!hit && !(this._CanFindElement() && this._InsideObject(ctx, lu, p.X, p.Y))) {
                //We're really trying to remove "this", is there a chance "this" is not at the head?
                if(uinlist.shift() !== this) {
                    throw new Exception("Look at my code! -> FENode._HitTestPoint");
                }
            }
        };
        FENode.prototype._CanFindElement = function () {
            return false;
        };
        FENode.prototype._InsideObject = function (ctx, lu, x, y) {
            var np = new Point(x, y);
            lu.TransformPoint(np);
            var fe = this.XObject;
            if(np.X < 0 || np.Y < 0 || np.X > fe.ActualWidth || np.Y > fe.ActualHeight) {
                return false;
            }
            if(!this._InsideLayoutClip(lu, x, y)) {
                return false;
            }
            return this._InsideClip(ctx, lu, x, y);
        };
        FENode.prototype._InsideLayoutClip = function (lu, x, y) {
            //TODO: Implement
            /*
            Geometry * composite_clip = LayoutInformation:: GetCompositeClip(this);
            bool inside = true;
            
            if (!composite_clip)
            return inside;
            
            var np = new Point();
            lu.TransformPoint(np);
            
            inside = composite_clip - > GetBounds().PointInside(x, y);
            composite_clip - > unref();
            
            return inside;
            */
            return true;
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
            Object.defineProperty(this, "Resources", {
                value: new Fayde.ResourceDictionary(),
                writable: false
            });
        }
        FrameworkElement.prototype.CreateStore = function () {
            var s = new Fayde.Providers.FrameworkProviderStore(this);
            s.SetProviders([
                null, 
                new Fayde.Providers.LocalValueProvider(), 
                new Fayde.Providers.FrameworkElementDynamicProvider(), 
                new Fayde.Providers.LocalStyleProvider(s), 
                new Fayde.Providers.ImplicitStyleProvider(s), 
                new Fayde.Providers.InheritedProvider(), 
                new Fayde.Providers.InheritedDataContextProvider(s), 
                new Fayde.Providers.DefaultValueProvider(), 
                new Fayde.Providers.AutoCreateProvider()
            ]);
            return s;
        };
        FrameworkElement.prototype.CreateNode = function () {
            return new FENode(this);
        };
        FrameworkElement.ActualHeightProperty = DependencyProperty.RegisterReadOnlyCore("ActualHeight", function () {
            return Number;
        }, FrameworkElement);
        FrameworkElement.ActualWidthProperty = DependencyProperty.RegisterReadOnlyCore("ActualWidth", function () {
            return Number;
        }, FrameworkElement);
        FrameworkElement.CursorProperty = DependencyProperty.RegisterFull("Cursor", function () {
            return new Enum(Fayde.CursorType);
        }, FrameworkElement, Fayde.CursorType.Default);
        FrameworkElement.FlowDirectionProperty = DependencyProperty.RegisterInheritable("FlowDirection", function () {
            return new Enum(Fayde.FlowDirection);
        }, FrameworkElement, Fayde.FlowDirection.LeftToRight, function (d, args) {
            return (d)._SizeChanged(args);
        }, undefined, Fayde.Providers._Inheritable.FlowDirection);
        FrameworkElement.HeightProperty = DependencyProperty.RegisterCore("Height", function () {
            return Number;
        }, FrameworkElement, NaN, function (d, args) {
            return (d)._HeightChanged(args);
        });
        FrameworkElement.HorizontalAlignmentProperty = DependencyProperty.RegisterCore("HorizontalAlignment", function () {
            return new Enum(Fayde.HorizontalAlignment);
        }, FrameworkElement, Fayde.HorizontalAlignment.Stretch, function (d, args) {
            return (d)._AlignmentChanged(args);
        });
        FrameworkElement.MarginProperty = DependencyProperty.RegisterCore("Margin", function () {
            return Thickness;
        }, FrameworkElement, undefined, function (d, args) {
            return (d)._SizeChanged(args);
        });
        FrameworkElement.MaxHeightProperty = DependencyProperty.RegisterCore("MaxHeight", function () {
            return Number;
        }, FrameworkElement, Number.POSITIVE_INFINITY, function (d, args) {
            return (d)._SizeChanged(args);
        });
        FrameworkElement.MaxWidthProperty = DependencyProperty.RegisterCore("MaxWidth", function () {
            return Number;
        }, FrameworkElement, Number.POSITIVE_INFINITY, function (d, args) {
            return (d)._SizeChanged(args);
        });
        FrameworkElement.MinHeightProperty = DependencyProperty.RegisterCore("MinHeight", function () {
            return Number;
        }, FrameworkElement, 0.0, function (d, args) {
            return (d)._SizeChanged(args);
        });
        FrameworkElement.MinWidthProperty = DependencyProperty.RegisterCore("MinWidth", function () {
            return Number;
        }, FrameworkElement, 0.0, function (d, args) {
            return (d)._SizeChanged(args);
        });
        FrameworkElement.StyleProperty = DependencyProperty.RegisterCore("Style", function () {
            return Fayde.Style;
        }, FrameworkElement, undefined, function (d, args) {
            return (d)._StyleChanged(args);
        });
        FrameworkElement.VerticalAlignmentProperty = DependencyProperty.RegisterCore("VerticalAlignment", function () {
            return new Enum(Fayde.VerticalAlignment);
        }, FrameworkElement, Fayde.VerticalAlignment.Stretch, function (d, args) {
            return (d)._AlignmentChanged(args);
        });
        FrameworkElement.WidthProperty = DependencyProperty.RegisterCore("Width", function () {
            return Number;
        }, FrameworkElement, NaN, function (d, args) {
            return (d)._WidthChanged(args);
        });
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
            availableSize = size.clone(availableSize);
            size.max(availableSize, desired);
            var enumerator = this.XamlNode.GetVisualTreeEnumerator();
            while(enumerator.MoveNext()) {
                var childNode = enumerator.Current;
                var childLu = childNode.LayoutUpdater;
                childLu._Measure(availableSize, error);
                desired = size.clone(childLu.DesiredSize);
            }
            size.min(desired, availableSize);
            return desired;
        };
        FrameworkElement.prototype._ArrangeOverride = function (finalSize, error) {
            var arranged = size.clone(finalSize);
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
            var error = new BError();
            this._Store.SetLocalStyle(args.NewValue, error);
            if(error.Message) {
                error.ThrowException();
            }
        };
        FrameworkElement.prototype._SizeChanged = function (args) {
            var node = this.XamlNode;
            var lu = node.LayoutUpdater;
            //LOOKS USELESS: this._PurgeSizeCache();
            //TODO: var p = this._GetRenderTransformOrigin();
            //this._FullInvalidate(p.X != 0.0 || p.Y != 0.0);
            lu.FullInvalidate(false);
            var vpNode = node.VisualParentNode;
            if(vpNode) {
                vpNode.LayoutUpdater.InvalidateMeasure();
            }
            lu.InvalidateMeasure();
            lu.InvalidateArrange();
            lu.UpdateBounds();
        };
        FrameworkElement.prototype._AlignmentChanged = function (args) {
            var lu = this.XamlNode.LayoutUpdater;
            lu.InvalidateArrange();
            lu.FullInvalidate(true);
        };
        FrameworkElement.prototype._WidthChanged = function (args) {
            this._SizeChanged(args);
        };
        FrameworkElement.prototype._HeightChanged = function (args) {
            this._SizeChanged(args);
        };
        return FrameworkElement;
    })(Fayde.UIElement);
    Fayde.FrameworkElement = FrameworkElement;    
    Nullstone.RegisterType(FrameworkElement, "FrameworkElement");
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=FrameworkElement.js.map
