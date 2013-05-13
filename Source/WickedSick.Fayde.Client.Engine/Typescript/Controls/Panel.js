var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/FrameworkElement.ts" />
    /// CODE
    /// <reference path="../Core/XamlObjectCollection.ts" />
    (function (Controls) {
        function zIndexComparer(uin1, uin2) {
            var zi1 = Fayde.Controls.Panel.GetZIndex(uin1.XObject);
            var zi2 = Fayde.Controls.Panel.GetZIndex(uin2.XObject);
            if(zi1 === zi2) {
                var z1 = Fayde.Controls.Panel.GetZ(uin1.XObject);
                var z2 = Fayde.Controls.Panel.GetZ(uin2.XObject);
                if(isNaN(z1) || isNaN(z2)) {
                    return 0;
                }
                return z1 > z2 ? 1 : (z1 < z2 ? -1 : 0);
            }
            return zi1 - zi2;
        }
        var PanelChildrenNode = (function (_super) {
            __extends(PanelChildrenNode, _super);
            function PanelChildrenNode() {
                _super.apply(this, arguments);

                this._Nodes = [];
                this._ZSorted = [];
            }
            PanelChildrenNode.prototype.AddNode = function (uin) {
                this._Nodes.push(uin);
            };
            PanelChildrenNode.prototype.RemoveNode = function (uin) {
                var nodes = this._Nodes;
                var index = nodes.indexOf(uin);
                if(index > -1) {
                    nodes.splice(index, 1);
                }
            };
            PanelChildrenNode.prototype.ResortByZIndex = function () {
                var zs = this._Nodes.slice(0);
                this._ZSorted = zs;
                if(zs.length > 1) {
                    zs.sort(zIndexComparer);
                }
            };
            PanelChildrenNode.prototype.GetVisualTreeEnumerator = function (direction) {
                switch(direction) {
                    default:
                    case Fayde.VisualTreeDirection.Logical:
                        return Fayde.ArrayEx.GetEnumerator(this._Nodes);
                    case Fayde.VisualTreeDirection.LogicalReverse:
                        return Fayde.ArrayEx.GetEnumerator(this._Nodes, true);
                    case Fayde.VisualTreeDirection.ZFoward:
                        if(this._ZSorted.length !== this._Nodes.length) {
                            this.ResortByZIndex();
                        }
                        return Fayde.ArrayEx.GetEnumerator(this._ZSorted);
                    case Fayde.VisualTreeDirection.ZReverse:
                        if(this._ZSorted.length !== this._Nodes.length) {
                            this.ResortByZIndex();
                        }
                        return Fayde.ArrayEx.GetEnumerator(this._ZSorted, true);
                }
            };
            return PanelChildrenNode;
        })(Fayde.XamlNode);        
        Nullstone.RegisterType(PanelChildrenNode, "PanelChildrenNode");
        var PanelChildrenCollection = (function (_super) {
            __extends(PanelChildrenCollection, _super);
            function PanelChildrenCollection() {
                _super.apply(this, arguments);

            }
            PanelChildrenCollection.prototype.CreateNode = function () {
                return new PanelChildrenNode(this);
            };
            PanelChildrenCollection.prototype.AddedToCollection = function (value, error) {
                var node = this.XamlNode;
                if(!node.ParentNode.AttachVisualChild(value, error)) {
                    return false;
                }
                node.AddNode(value.XamlNode);
                return _super.prototype.AddedToCollection.call(this, value, error);
            };
            PanelChildrenCollection.prototype.RemovedFromCollection = function (value, isValueSafe) {
                var node = this.XamlNode;
                node.ParentNode.DetachVisualChild(value, null);
                node.RemoveNode(value.XamlNode);
                _super.prototype.RemovedFromCollection.call(this, value, isValueSafe);
            };
            return PanelChildrenCollection;
        })(Fayde.XamlObjectCollection);        
        Nullstone.RegisterType(PanelChildrenCollection, "PanelChildrenCollection");
        var PanelNode = (function (_super) {
            __extends(PanelNode, _super);
            function PanelNode(xobj) {
                        _super.call(this, xobj);
                this.LayoutUpdater.SetContainerMode(true, true);
                var coll = new PanelChildrenCollection();
                Object.defineProperty(xobj, "Children", {
                    value: coll,
                    writable: false
                });
                var error = new BError();
                this.SetSubtreeNode(coll.XamlNode, error);
            }
            PanelNode.prototype.AttachVisualChild = function (uie, error) {
                this.OnVisualChildAttached(uie);
                uie.XamlNode.SetIsLoaded(this.IsLoaded);
                this._InvalidateChildrenZIndices();
                return true;
            };
            PanelNode.prototype.DetachVisualChild = function (uie, error) {
                this.OnVisualChildDetached(uie);
                uie.XamlNode.SetIsLoaded(false);
                this._InvalidateChildrenZIndices();
                return true;
            };
            PanelNode.prototype._InvalidateChildrenZIndices = function () {
                if(this.IsAttached) {
                }
            };
            PanelNode.prototype._ResortChildrenByZIndex = function () {
                (this.XObject.Children).XamlNode.ResortByZIndex();
            };
            PanelNode.prototype.OnIsAttachedChanged = function (newIsAttached) {
                this.SetSurfaceFromVisualParent();
                this.LayoutUpdater.OnIsAttachedChanged(newIsAttached, this.VisualParentNode);
                _super.prototype.OnIsAttachedChanged.call(this, newIsAttached);
            };
            PanelNode.prototype._CanFindElement = function () {
                return this.XObject.Background != null;
            };
            PanelNode.prototype._InsideObject = function (ctx, lu, x, y) {
                return (this.XObject.Background != null) && _super.prototype._InsideObject.call(this, ctx, lu, x, y);
            };
            PanelNode.prototype.ComputeBounds = function (baseComputer, lu) {
                rect.clear(lu.Extents);
                rect.clear(lu.ExtentsWithChildren);
                var enumerator = this.GetVisualTreeEnumerator(Fayde.VisualTreeDirection.Logical);
                while(enumerator.MoveNext()) {
                    var item = enumerator.Current;
                    var itemlu = item.LayoutUpdater;
                    if(itemlu.TotalIsRenderVisible) {
                        rect.union(lu.ExtentsWithChildren, itemlu.GlobalBoundsWithChildren);
                    }
                }
                if(this.XObject.Background) {
                    rect.set(lu.Extents, 0, 0, lu.ActualWidth, lu.ActualHeight);
                    rect.union(lu.ExtentsWithChildren, lu.Extents);
                }
                rect.copyGrowTransform(lu.Bounds, lu.Extents, lu.EffectPadding, lu.AbsoluteXform);
                rect.copyGrowTransform(lu.BoundsWithChildren, lu.ExtentsWithChildren, lu.EffectPadding, lu.AbsoluteXform);
                lu.ComputeGlobalBounds();
                lu.ComputeSurfaceBounds();
            };
            PanelNode.prototype.GetVisualTreeEnumerator = function (direction) {
                return this.XObject.Children.XamlNode.GetVisualTreeEnumerator(direction);
            };
            return PanelNode;
        })(Fayde.FENode);
        Controls.PanelNode = PanelNode;        
        Nullstone.RegisterType(PanelNode, "PanelNode");
        function zIndexPropertyChanged(dobj, args) {
            var xn = dobj.XamlNode;
            if(xn instanceof Fayde.UINode) {
                (xn).LayoutUpdater.Invalidate();
            }
            if(xn.IsAttached) {
                (xn.ParentNode)._InvalidateChildrenZIndices();
            }
        }
        var Panel = (function (_super) {
            __extends(Panel, _super);
            function Panel() {
                _super.apply(this, arguments);

            }
            Panel.prototype.CreateNode = function () {
                return new PanelNode(this);
            };
            Panel.ZIndexProperty = DependencyProperty.RegisterAttached("ZIndex", function () {
                return Number;
            }, Panel, 0, zIndexPropertyChanged);
            Panel.ZProperty = DependencyProperty.RegisterAttached("Z", function () {
                return Number;
            }, Panel, NaN);
            Panel.BackgroundProperty = DependencyProperty.Register("Background", function () {
                return Fayde.Media.Brush;
            }, Panel, undefined, function (d, args) {
                return (d)._BackgroundChanged(args);
            });
            Panel.IsItemsHostProperty = DependencyProperty.Register("IsItemHost", function () {
                return Boolean;
            }, Panel, false);
            Panel.Annotations = {
                ContentProperty: "Children"
            };
            Panel.GetZIndex = function GetZIndex(uie) {
                return uie.GetValue(Panel.ZIndexProperty);
            };
            Panel.SetZIndex = function SetZIndex(uie, value) {
                uie.SetValue(Panel.ZIndexProperty, value);
            };
            Panel.GetZ = function GetZ(uie) {
                return uie.GetValue(Panel.ZProperty);
            };
            Panel.SetZ = function SetZ(uie, value) {
                uie.SetValue(Panel.ZProperty, value);
            };
            Panel.prototype._BackgroundChanged = function (args) {
                var _this = this;
                var newBrush = args.NewValue;
                if(this._BackgroundListener) {
                    this._BackgroundListener.Detach();
                }
                this._BackgroundListener = null;
                if(newBrush) {
                    this._BackgroundListener = newBrush.Listen(function (brush) {
                        return _this.BrushChanged(brush);
                    });
                }
                this.BrushChanged(newBrush);
                var lu = this.XamlNode.LayoutUpdater;
                lu.UpdateBounds();
                lu.Invalidate();
            };
            Panel.prototype.BrushChanged = function (newBrush) {
                this.XamlNode.LayoutUpdater.Invalidate();
            };
            Panel.prototype._MeasureOverride = function (availableSize, error) {
                //Abstract Method
                return new size();
            };
            Panel.prototype.Render = function (ctx, lu, region) {
                var background = this.Background;
                if(!background) {
                    return;
                }
                var framework = lu.CoerceSize(size.fromRaw(this.ActualWidth, this.ActualHeight));
                if(framework.Width <= 0 || framework.Height <= 0) {
                    return;
                }
                var area = rect.fromSize(framework);
                ctx.Save();
                lu._RenderLayoutClip(ctx);
                ctx.FillRect(background, area);
                ctx.Restore();
            };
            return Panel;
        })(Fayde.FrameworkElement);
        Controls.Panel = Panel;        
        Nullstone.RegisterType(Panel, "Panel");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Panel.js.map
