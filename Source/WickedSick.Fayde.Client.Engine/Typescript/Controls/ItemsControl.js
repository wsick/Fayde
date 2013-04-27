var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="Control.ts" />
    /// CODE
    /// <reference path="Panel.ts" />
    /// <reference path="ItemsPresenter.ts" />
    /// <reference path="ItemContainerGenerator.ts" />
    /// <reference path="ContentPresenter.ts" />
    (function (Controls) {
        var ItemsControl = (function (_super) {
            __extends(ItemsControl, _super);
            function ItemsControl() {
                        _super.call(this);
                var icg = new Controls.ItemContainerGenerator(this);
                Object.defineProperty(this, "ItemContainerGenerator", {
                    value: icg,
                    writable: false
                });
            }
            Object.defineProperty(ItemsControl.prototype, "Panel", {
                get: //TODO: Implement
                function () {
                    return this._Presenter.ElementRoot;
                },
                enumerable: true,
                configurable: true
            });
            ItemsControl.GetItemsOwner = function GetItemsOwner(uie) {
                if(!(uie instanceof Controls.Panel)) {
                    return null;
                }
                var panel = uie;
                if(!panel.IsItemsHost) {
                    return null;
                }
                var presenter = panel.TemplateOwner;
                if(!(presenter instanceof Controls.ItemsPresenter)) {
                    return null;
                }
                var ic = presenter.TemplateOwner;
                if(ic instanceof ItemsControl) {
                    return ic;
                }
                return null;
            };
            ItemsControl.prototype._SetItemsPresenter = function (presenter) {
                if(this._Presenter) {
                    this._Presenter.ElementRoot.Children.Clear();
                }
                this._Presenter = presenter;
                this.AddItemsToPresenter(-1, 1, this.Items.Count);
            };
            ItemsControl.prototype.AddItemsToPresenter = function (positionIndex, positionOffset, count) {
                //TODO: Implement
                            };
            ItemsControl.prototype.PrepareContainerForItem = function (container, item) {
                /*
                if (this.DisplayMemberPath != null && this.ItemTemplate != null)
                throw new InvalidOperationException("Cannot set 'DisplayMemberPath' and 'ItemTemplate' simultaenously");
                
                this.UpdateContentTemplateOnContainer(element, item);
                */
                            };
            ItemsControl.prototype.ClearContainerForItem = function (container, item) {
            };
            ItemsControl.prototype.GetContainerForItem = function () {
                return new Controls.ContentPresenter();
            };
            ItemsControl.prototype.IsItemItsOwnContainer = function (item) {
                return item instanceof Fayde.FrameworkElement;
            };
            return ItemsControl;
        })(Controls.Control);
        Controls.ItemsControl = ItemsControl;        
        Nullstone.RegisterType(ItemsControl, "ItemsControl");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ItemsControl.js.map
