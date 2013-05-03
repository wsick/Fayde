var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="../Core/FrameworkElement.ts" />
    /// CODE
    /// <reference path="StackPanel.ts" />
    /// <reference path="VirtualizingStackPanel.ts" />
    /// <reference path="ItemsControl.ts" />
    /// <reference path="ItemsPanelTemplate.ts" />
    /// <reference path="ListBox.ts" />
    (function (Controls) {
        var ItemsPresenterNode = (function (_super) {
            __extends(ItemsPresenterNode, _super);
            function ItemsPresenterNode(xobj) {
                        _super.call(this, xobj);
            }
            Object.defineProperty(ItemsPresenterNode.prototype, "ElementRoot", {
                get: function () {
                    if(!this._ElementRoot) {
                        var error = new BError();
                        this.DoApplyTemplateWithError(error);
                        if(error.Message) {
                            error.ThrowException();
                        }
                    }
                    return this._ElementRoot;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ItemsPresenterNode.prototype, "StackPanelFallbackTemplate", {
                get: function () {
                    var spft = this._SPFT;
                    if(!spft) {
                        this._SPFT = spft = new Controls.ItemsPanelTemplate({
                            ParseType: Controls.StackPanel
                        });
                    }
                    return spft;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ItemsPresenterNode.prototype, "VirtualizingStackPanelFallbackTemplate", {
                get: function () {
                    var vspft = this._VSPFT;
                    if(!vspft) {
                        this._VSPFT = vspft = new Controls.ItemsPanelTemplate({
                            ParseType: Controls.VirtualizingStackPanel
                        });
                    }
                    return vspft;
                },
                enumerable: true,
                configurable: true
            });
            ItemsPresenterNode.prototype.DoApplyTemplateWithError = function (error) {
                if(this._ElementRoot) {
                    return false;
                }
                var xobj = this.XObject;
                var ic = xobj.TemplateOwner;
                if(!(ic instanceof Controls.ItemsControl)) {
                    return false;
                }
                if(ic.ItemsPanel) {
                    this._ElementRoot = ic.ItemsPanel.GetVisualTree(xobj);
                }
                if(!this._ElementRoot) {
                    var template;
                    if(ic instanceof Controls.ListBox) {
                        template = this.VirtualizingStackPanelFallbackTemplate;
                    } else {
                        template = this.StackPanelFallbackTemplate;
                    }
                    this._ElementRoot = template.GetVisualTree(xobj);
                }
                this._ElementRoot.IsItemsHost = true;
                return this.FinishApplyTemplateWithError(this._ElementRoot, error);
            };
            return ItemsPresenterNode;
        })(Fayde.FENode);
        Controls.ItemsPresenterNode = ItemsPresenterNode;        
        Nullstone.RegisterType(ItemsPresenterNode, "ItemsPresenterNode");
        var ItemsPresenter = (function (_super) {
            __extends(ItemsPresenter, _super);
            function ItemsPresenter() {
                _super.apply(this, arguments);

            }
            ItemsPresenter.prototype.CreateNode = function () {
                return new ItemsPresenterNode(this);
            };
            Object.defineProperty(ItemsPresenter.prototype, "ElementRoot", {
                get: function () {
                    return this.XamlNode.ElementRoot;
                },
                enumerable: true,
                configurable: true
            });
            ItemsPresenter.prototype.OnApplyTemplate = function () {
                this.TemplateOwner.XamlNode._SetItemsPresenter(this);
                _super.prototype.OnApplyTemplate.call(this);
            };
            return ItemsPresenter;
        })(Fayde.FrameworkElement);
        Controls.ItemsPresenter = ItemsPresenter;        
        Nullstone.RegisterType(ItemsPresenter, "ItemsPresenter");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ItemsPresenter.js.map
