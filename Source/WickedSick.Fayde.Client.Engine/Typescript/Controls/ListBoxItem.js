var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Fayde;
(function (Fayde) {
    /// <reference path="ContentControl.ts" />
    /// CODE
    /// <reference path="Primitives/Selector.ts" />
    (function (Controls) {
        var ListBoxItem = (function (_super) {
            __extends(ListBoxItem, _super);
            function ListBoxItem() {
                        _super.call(this);
                this.ParentSelectorChanged = new MulticastEvent();
                this.DefaultStyleKey = (this).constructor;
            }
            Object.defineProperty(ListBoxItem.prototype, "ParentSelector", {
                get: function () {
                    return this._ParentSelector;
                },
                set: function (value) {
                    if(this._ParentSelector === value) {
                        return;
                    }
                    this._ParentSelector = value;
                    this.ParentSelectorChanged.Raise(this, EventArgs.Empty);
                },
                enumerable: true,
                configurable: true
            });
            ListBoxItem.IsSelectedProperty = DependencyProperty.RegisterCore("IsSelected", function () {
                return Boolean;
            }, ListBoxItem, null, function (d, args) {
                return (d).OnIsSelectedChanged(args);
            });
            ListBoxItem.prototype.OnApplyTemplate = function () {
                _super.prototype.OnApplyTemplate.call(this);
                this.UpdateVisualState(false);
            };
            ListBoxItem.prototype.OnMouseLeftButtonDown = function (e) {
                if(e.Handled) {
                    return;
                }
                e.Handled = true;
                if(!this.XamlNode.Focus(true)) {
                    return;
                }
                if(this._ParentSelector != null) {
                    this._ParentSelector.NotifyListItemClicked(this);
                }
            };
            ListBoxItem.prototype.OnMouseEnter = function (e) {
                _super.prototype.OnMouseEnter.call(this, e);
                this.UpdateVisualState();
            };
            ListBoxItem.prototype.OnMouseLeave = function (e) {
                _super.prototype.OnMouseLeave.call(this, e);
                this.UpdateVisualState();
            };
            ListBoxItem.prototype.OnGotFocus = function (e) {
                _super.prototype.OnGotFocus.call(this, e);
                this.UpdateVisualState();
                if(this._ParentSelector != null) {
                    this._ParentSelector.NotifyListItemGotFocus(this);
                }
            };
            ListBoxItem.prototype.OnLostFocus = function (e) {
                _super.prototype.OnLostFocus.call(this, e);
                this.UpdateVisualState();
                if(this._ParentSelector != null) {
                    this._ParentSelector.NotifyListItemLostFocus(this);
                }
            };
            ListBoxItem.prototype.GetVisualStateNamesToActivate = function () {
                var arr = _super.prototype.GetVisualStateNamesToActivate.call(this);
                arr.push(this.GetVisualStateSelection());
                return arr;
            };
            ListBoxItem.prototype.GetVisualStateCommon = function () {
                if(!this.IsEnabled) {
                    return this.Content instanceof Controls.Control ? "Normal" : "Disabled";
                } else if(this.IsMouseOver) {
                    return "MouseOver";
                } else {
                    return "Normal";
                }
            };
            ListBoxItem.prototype.GetVisualStateSelection = function () {
                if(this.IsSelected) {
                    return this.IsFocused ? "Selected" : "SelectedUnfocused";
                } else {
                    return "Unselected";
                }
            };
            ListBoxItem.prototype.OnIsSelectedChanged = function (args) {
                this.UpdateVisualState();
            };
            return ListBoxItem;
        })(Controls.ContentControl);
        Controls.ListBoxItem = ListBoxItem;        
        Nullstone.RegisterType(ListBoxItem, "ListBoxItem");
    })(Fayde.Controls || (Fayde.Controls = {}));
    var Controls = Fayde.Controls;
})(Fayde || (Fayde = {}));
//@ sourceMappingURL=ListBoxItem.js.map
