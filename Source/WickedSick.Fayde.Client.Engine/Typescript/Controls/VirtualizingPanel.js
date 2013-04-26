var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Panel.ts" />
    /// CODE
    /// <reference path="ItemContainerGenerator.ts" />
    /// <reference path="ItemsControl.ts" />
    (function (Controls) {
        var VirtualizingPanel = (function (_super) {
            __extends(VirtualizingPanel, _super);
            function VirtualizingPanel() {
                _super.apply(this, arguments);

                this._ICG = null;
            }
            Object.defineProperty(VirtualizingPanel.prototype, "ItemContainerGenerator", {
                get: function () {
                    if(!this._ICG) {
                        var icOwner = Controls.ItemsControl.GetItemsOwner(this);
                        if(!icOwner) {
                            throw new InvalidOperationException("VirtualizingPanels must be in the Template of an ItemsControl in order to generate items");
                        }
                        var icg = icOwner.ItemContainerGenerator;
                        icg.Listen(this);
                    }
                    return this._ICG;
                },
                enumerable: true,
                configurable: true
            });
            VirtualizingPanel.prototype.AddInternalChild = function (child) {
                this.Children.Add(child);
            };
            VirtualizingPanel.prototype.InsertInternalChild = function (index, child) {
                this.Children.Insert(index, child);
            };
            VirtualizingPanel.prototype.RemoveInternalChildRange = function (index, range) {
                var children = this.Children;
                for(var i = 0; i < range; i++) {
                    children.RemoveAt(index);
                }
            };
            VirtualizingPanel.prototype.BringIndexIntoView = function (index) {
            };
            VirtualizingPanel.prototype.OnClearChildren = function () {
            };
            VirtualizingPanel.prototype.OnItemsChanged = function (action, itemCount, itemUICount, oldPosition, position) {
                this.XamlNode.LayoutUpdater.InvalidateMeasure();
                if(action === Controls.ItemsChangedAction.Reset) {
                    this.Children.Clear();
                    this.ItemContainerGenerator.RemoveAll();
                    this.OnClearChildren();
                }
            };
            return VirtualizingPanel;
        })(Controls.Panel);
        Controls.VirtualizingPanel = VirtualizingPanel;        
        Nullstone.RegisterType(VirtualizingPanel, "VirtualizingPanel");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=VirtualizingPanel.js.map
