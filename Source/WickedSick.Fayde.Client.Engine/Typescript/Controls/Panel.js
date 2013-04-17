var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/FrameworkElement.ts" />
    /// CODE
    /// <reference path="../Core/DependencyObjectCollection.ts" />
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
            PanelChildrenNode.prototype.ResortByZIndex = function () {
                var zs = this._Nodes.slice(0);
                this._ZSorted = zs;
                if(zs.length > 1) {
                    zs.sort(zIndexComparer);
                }
            };
            PanelChildrenNode.prototype.GetVisualTreeEnumerator = function (direction) {
                switch(direction) {
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
        var PanelChildrenCollection = (function (_super) {
            __extends(PanelChildrenCollection, _super);
            function PanelChildrenCollection() {
                        _super.call(this, false);
            }
            PanelChildrenCollection.prototype.CreateNode = function () {
                return new PanelChildrenNode(this);
            };
            PanelChildrenCollection.prototype._RaiseItemAdded = function (value, index) {
                this.XamlNode.ParentNode._ElementAdded(value);
            };
            PanelChildrenCollection.prototype._RaiseItemRemoved = function (value, index) {
                this.XamlNode.ParentNode._ElementRemoved(value);
            };
            PanelChildrenCollection.prototype._RaiseItemReplaced = function (removed, added, index) {
                var panelNode = this.XamlNode.ParentNode;
                panelNode._ElementRemoved(removed);
                panelNode._ElementAdded(added);
            };
            return PanelChildrenCollection;
        })(Fayde.DependencyObjectCollection);        
        var PanelNode = (function (_super) {
            __extends(PanelNode, _super);
            function PanelNode(xobj) {
                        _super.call(this, xobj);
                var coll = new PanelChildrenCollection();
                Object.defineProperty(xobj, "Children", {
                    value: coll,
                    writable: false
                });
                this.SetSubtreeNode(coll.XamlNode);
            }
            PanelNode.prototype._ElementAdded = function (uie) {
                _super.prototype._ElementAdded.call(this, uie);
                this._InvalidateChildrenZIndices();
            };
            PanelNode.prototype._ElementRemoved = function (uie) {
                _super.prototype._ElementRemoved.call(this, uie);
                this._InvalidateChildrenZIndices();
            };
            PanelNode.prototype._InvalidateChildrenZIndices = function () {
                if(this.IsAttached) {
                }
            };
            PanelNode.prototype._ResortChildrenByZIndex = function () {
                (this.XObject.Children).XamlNode.ResortByZIndex();
            };
            return PanelNode;
        })(Fayde.FENode);
        Controls.PanelNode = PanelNode;        
        function zIndexPropertyChanged(dobj, args) {
            //if (dobj instanceof UIElement) {
            //  (<UIElement>dobj)._Invalidate();
            //}
            (dobj.XamlNode.ParentNode)._InvalidateChildrenZIndices();
        }
        var Panel = (function (_super) {
            __extends(Panel, _super);
            function Panel() {
                _super.apply(this, arguments);

            }
            Panel.BackgroundProperty = DependencyProperty.Register("Background", function () {
                return Fayde.Media.Brush;
            }, Panel);
            Panel.IsItemsHostProperty = DependencyProperty.Register("IsItemHost", function () {
                return Boolean;
            }, Panel, false);
            Panel.ZIndexProperty = DependencyProperty.RegisterAttached("ZIndex", function () {
                return Number;
            }, Panel, 0, zIndexPropertyChanged);
            Panel.ZProperty = DependencyProperty.RegisterAttached("Z", function () {
                return Number;
            }, Panel, NaN);
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
            Panel.prototype.CreateNode = function () {
                return new PanelNode(this);
            };
            return Panel;
        })(Fayde.FrameworkElement);
        Controls.Panel = Panel;        
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=Panel.js.map
