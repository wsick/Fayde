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
    (function (Controls) {
        var ItemsControl = (function (_super) {
            __extends(ItemsControl, _super);
            function ItemsControl() {
                        _super.call(this);
                var icg = new Controls.ItemContainerGenerator();
                Object.defineProperty(this, "ItemContainerGenerator", {
                    value: icg,
                    writable: false
                });
            }
            ItemsControl.GetItemsOwner = //TODO: Implement
            function GetItemsOwner(uie) {
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
                    this._Presenter.XamlNode._ElementRoot.Children.Clear();
                }
                this._Presenter = presenter;
                this.AddItemsToPresenter(-1, 1, this.Items.Count);
            };
            ItemsControl.prototype.AddItemsToPresenter = function (positionIndex, positionOffset, count) {
                //TODO: Implement
                            };
            return ItemsControl;
        })(Controls.Control);
        Controls.ItemsControl = ItemsControl;        
        Nullstone.RegisterType(ItemsControl, "ItemsControl");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ItemsControl.js.map
